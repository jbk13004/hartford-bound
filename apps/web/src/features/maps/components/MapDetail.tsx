import { useParams, Link } from 'react-router-dom'
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

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Map + Article */}
        <div className="lg:col-span-9 space-y-8">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-sky mb-2">{map.title}</h1>
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-sky uppercase tracking-tighter">
                {map.tag}
              </span>
              <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                {map.decade}
              </span>
            </div>
            <div className="w-24 h-1.5 bg-mint rounded-full mt-3" />
          </header>

          {/* Map Image */}
          <div className="relative bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="aspect-[16/9] relative">
              <img
                alt={map.title}
                className="w-full h-full object-cover"
                src={map.image}
              />
              <div className="absolute top-6 left-6 flex flex-col space-y-3">
                <button className="w-11 h-11 bg-white shadow-lg rounded flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-100">
                  <span className="material-symbols-outlined text-slate-600">add</span>
                </button>
                <button className="w-11 h-11 bg-white shadow-lg rounded flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-100">
                  <span className="material-symbols-outlined text-slate-600">remove</span>
                </button>
              </div>
              <div className="absolute bottom-6 right-6">
                <button className="w-11 h-11 bg-white shadow-lg rounded flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-100">
                  <span className="material-symbols-outlined text-slate-600">fullscreen</span>
                </button>
              </div>
            </div>
          </div>

          {/* Article */}
          <article className="bg-white p-8 md:p-10 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Historical Context</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              This historical map layer is part of the Hartford Bound cartographic collection,
              documenting how race, policy, and community shaped the city&apos;s landscape over
              time. Explore related layers to trace how these patterns evolved across the decades.
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
                  <div className="aspect-[4/3] rounded overflow-hidden mb-3 border border-slate-100">
                    <img
                      alt={relMap.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={relMap.image}
                    />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900 group-hover:text-sky transition-colors">
                    {relMap.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
                    {relMap.tag} · {relMap.decade}
                  </p>
                </Link>
              ))}
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
