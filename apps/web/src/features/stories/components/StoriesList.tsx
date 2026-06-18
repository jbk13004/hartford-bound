import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FlickrImage } from '@/shared/components/FlickrImage'
import { usePrimaryTag } from '@/features/tags'
import { formatDates } from '@/shared/lib/dates'
import { useStoriesList } from '../hooks/useStoriesList'

export function StoriesList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const { stories, isLoading, isError } = useStoriesList(searchQuery)
  const { colorFor } = usePrimaryTag()

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-sky text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start gap-8">
            <div className="w-full">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[0.9] mb-8 drop-shadow-2xl flex flex-wrap items-baseline gap-x-4">
                <span className="uppercase tracking-tighter">HB</span>
                <span className="italic font-display text-primary text-6xl md:text-7xl lg:text-8xl">
                  Stories
                </span>
              </h1>
              <p className="text-base text-blue-50 max-w-2xl border-l-4 border-primary pl-8 py-2 bg-white/5 backdrop-blur-sm shadow-sm">
                Tracing the lived experiences of individuals who shaped
                Hartford&apos;s landscape through migration, labor, and community
                building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter/Search Bar */}
      <section className="bg-white py-6 sticky top-20 z-40 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  search
                </span>
                <input
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border-slate-200 bg-slate-50 focus:ring-2 focus:ring-sky focus:border-sky transition-all text-xs"
                  placeholder="Search stories..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
                <button
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-sky'
                      : 'text-slate-500 hover:text-sky'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  <span>Grid View</span>
                </button>
                <button
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                    viewMode === 'map'
                      ? 'bg-white shadow-sm text-sky'
                      : 'text-slate-500 hover:text-sky'
                  }`}
                  onClick={() => setViewMode('map')}
                >
                  <span className="material-symbols-outlined text-sm">map</span>
                  <span>Map View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg overflow-hidden border border-slate-100"
              >
                <div className="aspect-video bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-slate-200 rounded" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">
              error
            </span>
            <p className="text-lg text-slate-500 font-medium">
              Couldn&apos;t load stories. Please try again later.
            </p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">
              search_off
            </span>
            <p className="text-lg text-slate-500 font-medium">
              No stories match your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => {
              const accent = colorFor(story.tags)
              return (
                <article
                  key={story.id}
                  className="group flex flex-col rounded-lg overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ borderTopColor: accent, borderTopWidth: 4 }}
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <FlickrImage
                      url={story.hero_image_url}
                      size="z"
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h2 className="text-xl font-display font-extrabold uppercase tracking-tight text-white drop-shadow-md">
                        {story.title}
                      </h2>
                      <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/80">
                        {formatDates(story.dates_label, story.year_start, story.year_end)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs text-slate-700 mb-4 flex-grow leading-relaxed font-medium line-clamp-3">
                      {story.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 bg-white/50 text-slate-600 rounded border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/stories/${story.id}`}
                      className="inline-flex items-center text-[9px] font-black uppercase tracking-[0.15em] transition-colors"
                      style={{ color: accent }}
                    >
                      Read Story
                      <span className="material-symbols-outlined ml-2 text-xs font-bold group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
