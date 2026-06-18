import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FlickrImage } from '@/shared/components/FlickrImage'
import { decadeOf } from '@/shared/relationships'
import { useAtlas, type AtlasSort } from '../hooks/useAtlas'

export function MapAtlas() {
  const { collectionId } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [sortBy, setSortBy] = useState<AtlasSort>('chronological')

  const { maps, title, isLoading, isError } = useAtlas({
    collectionId,
    query: searchQuery,
    sort: sortBy,
  })

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary border-b border-black/10 py-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="flex-grow max-w-3xl">
              <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-800/60 mb-4">
                <Link to="/maps" className="hover:text-slate-900">
                  Maps
                </Link>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span className="text-slate-900">{title}</span>
              </nav>

              <h1 className="text-5xl font-display font-extrabold text-slate-900 mb-8 leading-tight">
                {title}
              </h1>

              <div className="flex gap-3">
                <div className="relative flex-grow group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    search
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-white/90 border-transparent rounded-lg focus:ring-2 focus:ring-sky focus:bg-white text-slate-900 text-sm transition-all shadow-sm"
                    placeholder="Search across historical map scans..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-6">
              <div className="flex bg-black/5 p-1 rounded-lg backdrop-blur-sm border border-black/5">
                <button
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                    viewMode === 'grid' ? 'bg-sky text-white shadow-sm' : 'text-slate-700 hover:bg-black/5'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  Grid View
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                    viewMode === 'map' ? 'bg-sky text-white shadow-sm' : 'text-slate-700 hover:bg-black/5'
                  }`}
                  onClick={() => setViewMode('map')}
                >
                  <span className="material-symbols-outlined text-sm">map</span>
                  Map View
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Triple Line Divider */}
      <div className="triple-line">
        <div />
        <div />
        <div />
      </div>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            Displaying Archive Results
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Sort by:</span>
            <select
              className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest p-0 pr-8 focus:ring-0 cursor-pointer text-slate-900"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as AtlasSort)}
            >
              <option value="chronological">Chronological</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>

        {isError ? (
          <p className="text-center py-20 text-slate-500 font-medium">
            Couldn&apos;t load the atlas. Please try again later.
          </p>
        ) : isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white border border-slate-200 rounded">
                <div className="aspect-square bg-slate-200" />
                <div className="p-3 space-y-2">
                  <div className="h-2 bg-slate-200 rounded" />
                  <div className="h-2 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-4">
            {maps.map((map) => {
              const decade = decadeOf(map.year_start)
              return (
                <Link
                  key={map.id}
                  to={`/maps/${map.id}`}
                  className="bg-white border border-slate-200 rounded transition-all hover:shadow-md hover:border-mint/40 group cursor-pointer block"
                >
                  <div className="aspect-square bg-slate-200 overflow-hidden relative">
                    <FlickrImage
                      url={map.image_url}
                      size="w"
                      alt={map.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-tight line-clamp-1 mb-1.5 group-hover:text-sky transition-colors">
                      {map.title}
                    </h3>
                    <div className="flex gap-1.5">
                      {map.tags[0] && (
                        <span className="text-[8px] font-black text-sky uppercase tracking-tighter">
                          {map.tags[0]}
                        </span>
                      )}
                      {decade !== undefined && (
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                          {decade}s
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        <div className="mt-20 flex flex-col items-center gap-6 border-t border-slate-200 pt-12">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            {maps.length} historical map {maps.length === 1 ? 'scan' : 'scans'}
          </p>
        </div>
      </main>
    </>
  )
}
