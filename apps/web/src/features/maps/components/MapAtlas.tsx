import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAtlas, type AtlasSort } from '../hooks/useAtlas'

export function MapAtlas() {
  const { collectionId } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<AtlasSort>('chronological')

  const { items, title, isLoading, isError } = useAtlas({
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
                    placeholder="Search across 40+ historical map layers..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-black/10">
                  <span className="material-symbols-outlined text-lg">search</span>
                  Search
                </button>
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
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/maps/${item.id}`}
                className="bg-white border border-slate-200 rounded transition-all hover:shadow-md hover:border-mint/40 group cursor-pointer block"
              >
                <div className="aspect-square bg-slate-200 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-3">
                  <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-tight line-clamp-1 mb-1.5 group-hover:text-sky transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex gap-1.5">
                    <span className="text-[8px] font-black text-sky uppercase tracking-tighter">
                      {item.tag}
                    </span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                      {item.decade}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-20 flex flex-col items-center gap-6 border-t border-slate-200 pt-12">
          <div className="flex items-center space-x-2">
            <button
              className="w-10 h-10 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:border-mint hover:text-mint transition-all"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 flex items-center justify-center rounded font-bold text-xs transition-all ${
                  currentPage === page
                    ? 'bg-mint text-white shadow-md'
                    : 'border border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="w-10 h-10 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:border-mint hover:text-mint transition-all"
              onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            {items.length} historical map {items.length === 1 ? 'layer' : 'layers'}
          </p>
        </div>
      </main>
    </>
  )
}
