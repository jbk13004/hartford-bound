import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MapDetail() {
  const { mapId } = useParams()
  const [mapData, setMapData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace placeholder data with Google Sheets API fetch using mapId URL parameter
    const fetchMapData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // TODO: All fields below will be populated from Google Sheets data
      setMapData({
        // --- Header ---
        title: 'Redlining and Residential Patterns, 1937',

        // --- Map Image ---
        // TODO: Map image URL from Google Sheets
        mapImage:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDAzfMINXTofqy_HEiIpLs_sczwMV1oddtCHaM71b1Vxi4pADJTJsTBGa35zb8vjaOow0g3zL9oax7NDMSiC5IQv52N1cpw_bGquxDAtYQKRbwOTr7x8KVdDdWznp3N8DYZd00FyYgI1jh6vJbkVMFXDoI8Nl4gGvnCnOhopVFKRzZcianoK5yGkkFQZ7qfcKEc9eqZdUcYtzP7xoyHC_ha_WHaxrTYv1CWyskl_gUzg0vb5FvtsErhCeZb_fvE_R6RR3Lwz45BxXA-',

        // --- Article ---
        // TODO: Historical context text from Google Sheets
        contextHeading: 'Historical Context',
        contextBody:
          "This 1937 map illustrates the residential security ratings established by the Home Owners\u2019 Loan Corporation (HOLC). These maps, widely known as redlining maps, institutionalized discriminatory lending practices by categorizing neighborhoods based on perceived risk\u2014often correlated directly with the racial and ethnic composition of the area. In Hartford, this resulted in systematic disinvestment in North End communities, the effects of which are still visible in the city\u2019s urban fabric today.",

        // TODO: Citations from Google Sheets
        citations: [
          'National Archives and Records Administration (NARA), Record Group 195: Records of the Federal Home Loan Bank Board, 1932\u20131989.',
          'Mapping Inequality Project, University of Richmond Digital Scholarship Lab.',
        ],

        // --- Sidebar: Related Maps ---
        // TODO: Related maps from Google Sheets
        relatedMaps: [
          {
            title: 'Employment Clusters (1860)',
            description:
              'Spatial distribution of domestic laborers in the Talcott Street neighborhood.',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDAzfMINXTofqy_HEiIpLs_sczwMV1oddtCHaM71b1Vxi4pADJTJsTBGa35zb8vjaOow0g3zL9oax7NDMSiC5IQv52N1cpw_bGquxDAtYQKRbwOTr7x8KVdDdWznp3N8DYZd00FyYgI1jh6vJbkVMFXDoI8Nl4gGvnCnOhopVFKRzZcianoK5yGkkFQZ7qfcKEc9eqZdUcYtzP7xoyHC_ha_WHaxrTYv1CWyskl_gUzg0vb5FvtsErhCeZb_fvE_R6RR3Lwz45BxXA-',
          },
          {
            title: 'Internal Migration Paths',
            description:
              "Tracking Addie\u2019s movements between Hartford and New York City.",
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAMJ2hdpfiYgfWoEyfz55o3pCR_Q7dR8Syai28uIpLYTsllCzFH4OrR2Faw4RMjso_SnT2QKU6KGPkKdmlN73ijVqxhXaaBE17Teh1BC5eJHOFdEEoRq8n4wuYNiUEWuUT59Gk4KMymRaCH3Y6CAqQYThufl2N36W7U7C69LyXCBSvhcNqc3wI_YORjrstinAsM45MbTq2cMePWzI6GbDv2XsaDhL3MX2u5IeZk1djKJCNJxeCTFChX_xcvO-ZyobxZVSMPYipRWYnm',
          },
        ],

        // --- Sidebar: Related Stories ---
        // TODO: Related stories from Google Sheets
        relatedStories: [
          {
            id: 'north-end-divide',
            title: 'The North End Divide',
            description: 'Barriers created by urban renewal.',
          },
          {
            id: 'voices-garden-st',
            title: 'Voices of Garden St.',
            description: 'Oral histories from 1968.',
          },
        ],
      })
      setLoading(false)
    }

    fetchMapData()
  }, [mapId])

  if (loading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-slate-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!mapData) {
    return (
      <div className="py-12">
        <div className="container-custom text-center">
          <h1 className="font-display text-2xl font-bold mb-4">
            Map Not Found
          </h1>
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
          {/* Header */}
          {/* TODO: Title from Google Sheets */}
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-sky mb-2">
              {mapData.title}
            </h1>
            <div className="w-24 h-1.5 bg-mint rounded-full"></div>
          </header>

          {/* Map Image Container */}
          {/* TODO: Map image from Google Sheets */}
          <div className="relative bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="aspect-[16/9] relative">
              <img
                alt="Historical Map of Hartford"
                className="w-full h-full object-cover"
                src={mapData.mapImage}
              />
              {/* Zoom Controls */}
              <div className="absolute top-6 left-6 flex flex-col space-y-3">
                <button className="w-11 h-11 bg-white shadow-lg rounded flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-100">
                  <span className="material-symbols-outlined text-slate-600">
                    add
                  </span>
                </button>
                <button className="w-11 h-11 bg-white shadow-lg rounded flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-100">
                  <span className="material-symbols-outlined text-slate-600">
                    remove
                  </span>
                </button>
              </div>
              {/* Fullscreen */}
              <div className="absolute bottom-6 right-6">
                <button className="w-11 h-11 bg-white shadow-lg rounded flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-100">
                  <span className="material-symbols-outlined text-slate-600">
                    fullscreen
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Article Card */}
          <article className="bg-white p-8 md:p-10 rounded-xl border border-slate-200">
            {/* TODO: Context heading and body from Google Sheets */}
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {mapData.contextHeading}
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-8">
              {mapData.contextBody}
            </p>

            {/* Citations */}
            {/* TODO: Citations from Google Sheets */}
            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-xs font-bold text-mint uppercase tracking-widest mb-4">
                Citations & Sources
              </h3>
              <ul className="space-y-4 text-sm text-slate-500">
                {mapData.citations.map((citation, i) => (
                  <li key={i} className="flex items-start">
                    <span className="material-symbols-outlined text-lg mr-3 mt-0.5 text-sky">
                      link
                    </span>
                    <span className="italic font-light">{citation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Related Maps */}
          {/* TODO: Related maps from Google Sheets */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="material-symbols-outlined text-primary">
                map
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Related Maps
              </h2>
            </div>
            <div className="space-y-8">
              {mapData.relatedMaps.map((relMap, i) => (
                <Link
                  key={i}
                  to="/maps"
                  className="group cursor-pointer block"
                >
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
                    {relMap.description}
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

          {/* Related Stories */}
          {/* TODO: Related stories from Google Sheets */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="material-symbols-outlined text-mint">
                auto_stories
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Related Stories
              </h2>
            </div>
            <div className="space-y-3">
              {mapData.relatedStories.map((story) => (
                <Link
                  key={story.id}
                  to={`/stories/${story.id}`}
                  className="block p-4 rounded-lg bg-slate-50 hover:bg-mint/5 transition-colors border border-slate-100 hover:border-mint/30"
                >
                  <h3 className="text-sm font-bold text-sky mb-1">
                    {story.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {story.description}
                  </p>
                </Link>
              ))}
            </div>
            <Link
              to="/stories"
              className="block w-full mt-6 py-3 px-4 bg-primary/10 text-slate-800 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-primary/20 transition-all text-center"
            >
              Read All Stories
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default MapDetail
