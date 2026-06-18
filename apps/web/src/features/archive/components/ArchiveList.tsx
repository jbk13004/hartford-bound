import { useState } from 'react'
import { useArchive } from '../hooks/useArchive'

export function ArchiveList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { items, categories, isLoading, isError } = useArchive({
    query: searchQuery,
    category: selectedCategory,
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

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-sky text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
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
                <button
                  key={item.id}
                  className="group text-left bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1 group-hover:text-sky transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="capitalize">{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </button>
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
