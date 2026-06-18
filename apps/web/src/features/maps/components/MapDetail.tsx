import { useParams, Link } from 'react-router-dom'
import { FlickrImage } from '@/shared/components/FlickrImage'
import { decadeOf } from '@/shared/relationships'
import { formatDates } from '@/shared/lib/dates'
import { useMapDetail } from '../hooks/useMapDetail'

export function MapDetail() {
  const { mapId } = useParams()
  const { map, related, isLoading, isError } = useMapDetail(mapId ?? '')

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-4" />
            <div className="h-96 bg-slate-200 rounded mb-6" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !map) {
    return (
      <div className="py-12">
        <div className="container-custom text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Map Not Found</h1>
          <Link to="/maps" className="text-sky hover:underline">
            Back to Maps
          </Link>
        </div>
      </div>
    )
  }

  const decade = decadeOf(map.year_start)

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Map + Article */}
        <div className="lg:col-span-9 space-y-8">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-sky mb-2">{map.title}</h1>
            {map.subtitle && <p className="text-slate-500 mb-2">{map.subtitle}</p>}
            <div className="flex items-center gap-3">
              {map.tags[0] && (
                <span className="text-xs font-black text-sky uppercase tracking-tighter">
                  {map.tags[0]}
                </span>
              )}
              {decade !== undefined && (
                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                  {decade}s
                </span>
              )}
              <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                {formatDates(map.dates_label, map.year_start, map.year_end)}
              </span>
            </div>
            <div className="w-24 h-1.5 bg-mint rounded-full mt-3" />
          </header>

          {/* Map Scan */}
          <div className="relative bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="aspect-[16/9] relative bg-slate-100">
              <FlickrImage
                url={map.image_url}
                size="b"
                alt={map.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Article */}
          <article className="bg-white p-8 md:p-10 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Historical Context</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {map.description ||
                'This historical map scan is part of the Hartford Bound cartographic collection.'}
            </p>
          </article>
        </div>

        {/* Right Column: Related Maps */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="material-symbols-outlined text-primary">map</span>
              <h2 className="text-lg font-bold text-slate-900">Related Maps</h2>
            </div>
            <div className="space-y-8">
              {related.map((relMap) => (
                <Link key={relMap.id} to={`/maps/${relMap.id}`} className="group cursor-pointer block">
                  <div className="aspect-[4/3] rounded overflow-hidden mb-3 border border-slate-100 bg-slate-100">
                    <FlickrImage
                      url={relMap.image_url}
                      size="w"
                      alt={relMap.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900 group-hover:text-sky transition-colors">
                    {relMap.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
                    {relMap.tags[0] ?? ''}
                    {decadeOf(relMap.year_start) !== undefined
                      ? ` · ${decadeOf(relMap.year_start)}s`
                      : ''}
                  </p>
                </Link>
              ))}
              {related.length === 0 && (
                <p className="text-[11px] text-slate-400">No related maps yet.</p>
              )}
            </div>
            <Link
              to="/maps/atlas"
              className="block w-full mt-8 py-3 px-4 border-2 border-primary text-slate-800 rounded text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all text-center"
            >
              Explore Atlas
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
