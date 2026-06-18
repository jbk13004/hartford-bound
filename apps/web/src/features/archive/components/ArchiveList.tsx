import { useState } from 'react'
import { FlickrImage } from '@/shared/components/FlickrImage'
import { DriveDownload } from '@/shared/components/DriveDownload'
import { useArchive } from '../hooks/useArchive'

export function ArchiveList() {
  // Ephemeral UI state: the three active filters.
  const [category, setCategory] = useState('all')
  const [tag, setTag] = useState('all')
  const [year, setYear] = useState('all')
  const { items, categories, tags, years, isLoading, isError } = useArchive({
    category,
    tag,
    year,
  })

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-4">Archive</h1>
          <p className="text-gray-600 max-w-2xl">
            Browse our collection of historical photographs, documents, maps, and oral
            histories that document Hartford&apos;s rich history.
          </p>
        </div>

        {/* Filters: category + tag + year */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  category === c
                    ? 'bg-sky text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex gap-3 md:ml-auto">
            <label className="sr-only" htmlFor="archive-tag">
              Filter by tag
            </label>
            <select
              id="archive-tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All tags' : t}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="archive-year">
              Filter by year
            </label>
            <select
              id="archive-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === 'all' ? 'All years' : y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-100 rounded-lg" />
                <div className="h-3 bg-gray-100 rounded mt-3 w-3/4" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">error</span>
            <p className="text-gray-600">Couldn&apos;t load the archive. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <FlickrImage
                      url={item.image_url}
                      size="c"
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="capitalize">{item.category}</span>
                      <span>
                        {item.dates_label ||
                          (item.year_start !== undefined ? item.year_start : '')}
                      </span>
                    </div>
                    {/* Download affordance: renders only when download_url is set. */}
                    <div className="mt-2">
                      <DriveDownload url={item.download_url} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {items.length === 0 && (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">
                  inventory_2
                </span>
                <p className="text-gray-600">No items found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
