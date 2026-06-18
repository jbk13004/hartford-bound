import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
//TODO edit logo, clip in original people on new background, maybe blur background a little bit?
//TODO add super transparent version of the 1850 map to the white background, make it static while the features scroll on top of it
//TODO add historical photographs as icon images to map theme categories or storie categories
//TODO use housing exhibit and HB exhibit for ideas on how to stylize headers
//TODO add thematic backgrounds to each page
//TODO make header styles and sizes consistent?

mapboxgl.accessToken = 'pk.eyJ1Ijoicmxha2ViZXJnIiwiYSI6ImNscHN1bWNmZDA2MG4ycXJvMGpiczgwZjYifQ.ZDnlJxUpiXZLDhjANfq1Iw'

function Homepage() {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    if (mapRef.current) return
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [-72.6823, 41.7658],
      zoom: 12,
      //pitch: 45,
      interactive: !showSplash,
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  const handleExplore = () => {
    setShowSplash(false)
    if (mapRef.current) {
      mapRef.current.scrollZoom.enable()
      mapRef.current.boxZoom.enable()
      mapRef.current.dragRotate.enable()
      mapRef.current.dragPan.enable()
      mapRef.current.keyboard.enable()
      mapRef.current.doubleClickZoom.enable()
      mapRef.current.touchZoomRotate.enable()
    }
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}background.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
        }}
      />

      {/* Decorative Migration Paths SVG */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg
          className="w-full h-full min-h-[2500px]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 2500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-none stroke-[#D1D35E] stroke-[3]"
            style={{ strokeDasharray: '8 12', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
            d="M720,400 C720,550 1200,600 1200,850 C1200,1100 240,1050 240,1300 C240,1550 1200,1650 1200,1950 C1200,2250 240,2300 240,2500"
          />
           <path
            className="fill-none stroke-[#72B591] stroke-[3] opacity-80"
            style={{filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
            d="M705,400 C705,535 1180,585 1180,835 C1180,1085 220,1035 220,1285 C220,1535 1180,1635 1180,1935 C1180,2235 220,2285 220,2485"
          />
          <path
            className="fill-none stroke-[#72B591] stroke-[3] opacity-80"
            style={{filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
            d="M735,400 C735,565 1220,615 1220,865 C1220,1115 260,1065 260,1315 C260,1565 1220,1665 1220,1965 C1220,2265 260,2315 260,2515"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <header className="relative">
        <div className="relative w-full h-auto overflow-hidden">
          <img
            alt="Hartford Bound Banner"
            className="w-full h-auto object-cover object-bottom"
            src={`${import.meta.env.BASE_URL}banner_v3.png`}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-start text-center p-4 pt-[8vh] md:pt-[10vh]">
            <div className="max-w-5xl mx-auto">
              <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                {/* HARTFORD with yellow outline offset up and right */}
                <span className="relative inline-block">
                  <span className="text-black">HARTFORD</span>
                  <span
                    className="absolute inset-0 text-transparent"
                    style={{
                      top: '-4px',
                      left: '4px',
                      WebkitTextStroke: '1px #D1D35E',
                    }}
                    aria-hidden="true"
                  >
                    HARTFORD
                  </span>
                </span>
                {' '}
                {/* BOUND with yellow outline offset down and right */}
                <span className="relative inline-block">
                  <span className="text-black">BOUND</span>
                  <span
                    className="absolute inset-0 text-transparent"
                    style={{
                      top: '4px',
                      left: '4px',
                      WebkitTextStroke: '1px #D1D35E',
                    }}
                    aria-hidden="true"
                  >
                    BOUND
                  </span>
                </span>
              </h1>
              <p className="text-black font-medium text-base md:text-xl leading-relaxed max-w-4xl mx-auto opacity-90">
                Mapping Stories of{' '}
                <span className="relative inline-block">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,6 L100,0 L100,92 L0,100 Z" fill="#D1D35E" />
                  </svg>
                  <span className="relative px-2">Race</span>
                </span>
                ,{' '}
                <span className="relative inline-block">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 L100,5 L100,100 L0,93 Z" fill="#72B591" />
                  </svg>
                  <span className="relative px-2">Migration</span>
                </span>
                , and{' '}
                <span className="relative inline-block">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,3 L100,0 L100,97 L0,100 Z" fill="#509EC8" />
                  </svg>
                  <span className="relative px-2">Mobility</span>
                </span>
                {' '}in Hartford, Connecticut
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20">
        {/* Interactive Map Section */}
        <section className="py-24 md:py-32 bg-transparent" id="maps">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 bg-[#d1d35e] p-8 rounded-3xl inline-block w-full shadow-2xl">
              <h2 className="font-display text-4xl font-bold mb-4 text-black max-w-3xl mx-auto">Mapping Stories of Race, Migration, and Mobility in Hartford, Connecticut</h2>
              <p className="text-lg text-black max-w-5xl mx-auto">
                Hartford, Connecticut attracted three waves of internal and transnational migrations of African American, Puerto Rican, and West Indian communities that transformed the city's racial and ethnic landscape. These monumental shifts in mobilities unfolded in many other metropolitan areas in the United States like Chicago and Philadelphia, Harlem and San Francisco in the twentieth century. This project explores the history of migration, housing, settlement, community formation, and succession through the lens of Hartford, one of America's wealthiest cities at the end of the Civil War.
              </p>
            </div>

            {/* Map Container */}
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-[#000000] h-[700px]">
              <div ref={mapContainerRef} className="w-full h-full" />

              {/* Splash Overlay */}
              {showSplash && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="text-center text-white max-w-xl px-6">
                    <h3 className="font-display text-4xl font-bold mb-4">Interactive History</h3>
                    <p className="text-lg mb-8 opacity-90">
                      Explore Hartford's historical landscape through an interactive map. Discover pivotal moments, landmarks, and individuals that shaped the city's trajectory.
                    </p>
                    <button
                      onClick={handleExplore}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-[#d1d35e] text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg cursor-pointer"
                    >
                      <span className="material-symbols-outlined">explore</span>
                      Begin Exploring
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Continue the Journey Section */}
        <section className="pb-32 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-md p-12 rounded-[2.5rem] border border-slate-100 shadow-xl">
              <h3 className="font-display text-3xl font-bold mb-6">Continue the Journey</h3>
              <p className="text-slate-600 mb-10 text-lg">
                Dive deeper into the archives or follow the thematic paths that connect our shared history.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  to="/stories"
                  className="inline-flex items-center justify-center px-8 py-4 bg-sky text-white rounded-full font-bold hover:shadow-lg transition-all gap-2 group"
                >
                  Read Stories
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">auto_stories</span>
                </Link>
                <Link
                  to="/maps"
                  className="inline-flex items-center justify-center px-8 py-4 bg-mint text-white rounded-full font-bold hover:shadow-lg transition-all gap-2 group"
                >
                  Explore Maps
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">map</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Homepage
