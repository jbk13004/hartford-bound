import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

// TODO: Replace placeholder data with Google Sheets API fetch
const timelineEvents = [
  {
    id: 1,
    year: 1635,
    title: 'Hartford Founded',
    description:
      'Thomas Hooker leads a congregation from the Massachusetts Bay Colony to establish Hartford along the Connecticut River.',
    type: 'story',
    linkId: 'hartford-founded',
  },
  {
    id: 2,
    year: 1662,
    title: 'Charter Oak Map',
    description:
      'Early colonial survey map depicting Hartford boundaries established under the Royal Charter granted by King Charles II.',
    type: 'map',
    linkId: 'charter-oak',
  },
  {
    id: 3,
    year: 1790,
    title: 'First Federal Census',
    description:
      'Hartford records its first census data, revealing the presence of free and enslaved African Americans in the city.',
    type: 'story',
    linkId: 'first-census',
  },
  {
    id: 4,
    year: 1830,
    title: 'Talcott Street Congregational Church',
    description:
      'The first Black church in Hartford is established, becoming a center of abolitionist activity and community organizing.',
    type: 'story',
    linkId: 'talcott-street',
  },
  {
    id: 5,
    year: 1860,
    title: 'Employment Clusters Map',
    description:
      'Spatial distribution of domestic laborers in the Talcott Street neighborhood reveals patterns of racial occupational segregation.',
    type: 'map',
    linkId: 'employment-clusters',
  },
  {
    id: 6,
    year: 1868,
    title: 'Addie Brown in Hartford',
    description:
      "Domestic worker Addie Brown's correspondence with Rebecca Primus documents the lived experience of Black working-class women navigating Hartford's labor market.",
    type: 'story',
    linkId: 'addie-brown',
  },
  {
    id: 7,
    year: 1890,
    title: 'Sewerage System Map',
    description:
      "Detailed engineering survey of Hartford's sewer infrastructure reveals disparities in public investment between neighborhoods.",
    type: 'map',
    linkId: 'sewerage-1890',
  },
  {
    id: 8,
    year: 1910,
    title: 'Ward Boundaries Map',
    description:
      'Municipal ward map showing political district lines that would shape representation and resource allocation for decades.',
    type: 'map',
    linkId: 'ward-map-1910',
  },
  {
    id: 9,
    year: 1920,
    title: 'Great Migration Begins',
    description:
      'Thousands of Black Southerners begin relocating to Hartford, drawn by industrial jobs at Colt, Pratt & Whitney, and other manufacturers.',
    type: 'story',
    linkId: 'great-migration',
  },
  {
    id: 10,
    year: 1926,
    title: 'First Zoning Plan',
    description:
      "Hartford's inaugural zoning ordinance codifies land-use restrictions that effectively reinforce existing patterns of racial segregation.",
    type: 'map',
    linkId: 'zoning-1926',
  },
  {
    id: 11,
    year: 1936,
    title: 'Great Flood Inundation Map',
    description:
      'The Connecticut River floods devastate low-lying neighborhoods, disproportionately impacting communities of color along the riverfront.',
    type: 'map',
    linkId: 'flood-1936',
  },
  {
    id: 12,
    year: 1937,
    title: 'HOLC Redlining Map',
    description:
      "The Home Owners' Loan Corporation grades Hartford neighborhoods, institutionalizing discriminatory lending practices that devastate North End communities.",
    type: 'map',
    linkId: 'holc-redlining',
  },
  {
    id: 13,
    year: 1945,
    title: 'Post-War Housing Crisis',
    description:
      'Returning veterans and continued migration create severe housing shortages. Restrictive covenants confine Black families to overcrowded neighborhoods.',
    type: 'story',
    linkId: 'housing-crisis-1945',
  },
  {
    id: 14,
    year: 1950,
    title: 'Highway Construction Map',
    description:
      'Interstate highway planning routes I-84 and I-91 through the heart of established Black neighborhoods, displacing thousands of residents.',
    type: 'map',
    linkId: 'highways-1950',
  },
  {
    id: 15,
    year: 1954,
    title: 'James Mars Legacy',
    description:
      "Renewed scholarly attention to James Mars's autobiography highlights Hartford's complex relationship with slavery and emancipation.",
    type: 'story',
    linkId: 'james-mars',
  },
  {
    id: 16,
    year: 1960,
    title: 'Urban Renewal Begins',
    description:
      'Federal urban renewal programs demolish blocks of housing in the North End, displacing thousands under the promise of modernization.',
    type: 'story',
    linkId: 'urban-renewal',
  },
  {
    id: 17,
    year: 1962,
    title: 'Constitution Plaza Opens',
    description:
      "Hartford's flagship urban renewal project replaces a historic neighborhood with a modernist civic center, erasing decades of community history.",
    type: 'story',
    linkId: 'constitution-plaza',
  },
  {
    id: 18,
    year: 1968,
    title: 'Voices of Garden Street',
    description:
      'Oral histories capture the experiences of North End residents during the tumultuous summer of 1968 and the civil rights era in Hartford.',
    type: 'story',
    linkId: 'voices-garden-st',
  },
  {
    id: 19,
    year: 1970,
    title: 'Census Demographics Map',
    description:
      'Decennial census data visualized spatially reveals the dramatic racial transformation of Hartford neighborhoods over the preceding decades.',
    type: 'map',
    linkId: 'census-1970',
  },
  {
    id: 20,
    year: 1996,
    title: 'Sheff v. O\'Neill Decision',
    description:
      'Landmark Connecticut Supreme Court ruling finds that racial and economic segregation in Hartford schools violates the state constitution.',
    type: 'story',
    linkId: 'sheff-v-oneill',
  },
]

// Extract unique decades for filtering
const decades = [
  ...new Set(timelineEvents.map((e) => Math.floor(e.year / 100) * 100)),
].sort()

const decadeLabels = decades.map((d) => ({
  value: d,
  label: `${d}s`,
}))

function Timeline() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [centuryFilter, setCenturyFilter] = useState('all')

  const filteredEvents = useMemo(() => {
    return timelineEvents.filter((event) => {
      const matchesType =
        typeFilter === 'all' || event.type === typeFilter
      const matchesCentury =
        centuryFilter === 'all' ||
        Math.floor(event.year / 100) * 100 === Number(centuryFilter)
      return matchesType && matchesCentury
    })
  }, [typeFilter, centuryFilter])

  return (
    <>
      {/* Hero */}
      <section className="bg-sky text-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-3">
            HB{' '}
            <span className="text-primary italic">Timeline</span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto font-light text-base">
            Journey through Hartford's history. Key moments of race, migration,
            and mobility mapped across four centuries.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Show:
              </span>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'story', label: 'Stories' },
                  { value: 'map', label: 'Maps' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTypeFilter(opt.value)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                      typeFilter === opt.value
                        ? 'bg-sky text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Century Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Century:
              </span>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setCenturyFilter('all')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                    centuryFilter === 'all'
                      ? 'bg-sky text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                {decadeLabels.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setCenturyFilter(String(d.value))}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                      centuryFilter === String(d.value)
                        ? 'bg-sky text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {filteredEvents.length} event
              {filteredEvents.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <main className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">
                event_busy
              </span>
              <p className="text-lg text-slate-500 font-medium">
                No events match the current filters.
              </p>
              <button
                onClick={() => {
                  setTypeFilter('all')
                  setCenturyFilter('all')
                }}
                className="mt-4 text-sky text-sm font-bold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <VerticalTimeline lineColor="#e2e8f0">
              {filteredEvents.map((event) => {
                const isMap = event.type === 'map'
                const iconBg = isMap ? '#509EC8' : '#72B591'
                const iconName = isMap ? 'map' : 'auto_stories'
                const linkPath = isMap
                  ? `/maps/${event.linkId}`
                  : `/stories/${event.linkId}`
                const tagColor = isMap
                  ? 'bg-sky/10 text-sky'
                  : 'bg-mint/10 text-mint'

                return (
                  <VerticalTimelineElement
                    key={event.id}
                    date={String(event.year)}
                    dateClassName="timeline-date"
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      padding: '1.5rem 2rem',
                    }}
                    contentArrowStyle={{}}
                    iconStyle={{
                      background: iconBg,
                      width: '16px',
                      height: '16px',
                      marginLeft: '-8px',
                      boxShadow: `0 0 0 3px #fff, 0 0 0 4px ${iconBg}50`,
                    }}
                    iconClassName="timeline-dot"
                    icon={null}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${tagColor}`}
                      >
                        {event.type}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <Link
                      to={linkPath}
                      className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.15em] text-sky hover:text-mint transition-colors"
                    >
                      View {isMap ? 'Map' : 'Story'}
                      <span className="material-symbols-outlined ml-1.5 text-sm">
                        arrow_forward
                      </span>
                    </Link>
                  </VerticalTimelineElement>
                )
              })}
            </VerticalTimeline>
          )}
        </div>
      </main>
    </>
  )
}

export default Timeline
