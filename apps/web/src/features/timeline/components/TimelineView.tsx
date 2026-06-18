import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { useDerivedTimeline, type TimelineTypeFilter } from '../hooks/useDerivedTimeline'

const typeOptions: { value: TimelineTypeFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'story', label: 'Stories' },
  { value: 'map', label: 'Maps' },
  { value: 'exhibit', label: 'Exhibits' },
  { value: 'archive', label: 'Archive' },
  { value: 'event', label: 'Events' },
]

// Per asset type: dot color and the "View …" verb. Context events (no type)
// fall back to the neutral entry; they carry no link.
const TYPE_META: Record<string, { color: string; chip: string; verb: string }> = {
  story: { color: '#72B591', chip: 'bg-mint/10 text-mint', verb: 'Story' },
  map: { color: '#509EC8', chip: 'bg-sky/10 text-sky', verb: 'Map' },
  exhibit: { color: '#C26B5A', chip: 'bg-[#C26B5A]/10 text-[#C26B5A]', verb: 'Exhibit' },
  archive: { color: '#D1D35E', chip: 'bg-primary/10 text-primary', verb: 'Item' },
  event: { color: '#94a3b8', chip: 'bg-slate-100 text-slate-500', verb: '' },
}

export function TimelineView() {
  const [typeFilter, setTypeFilter] = useState<TimelineTypeFilter>('all')
  const [centuryFilter, setCenturyFilter] = useState<number | 'all'>('all')
  const { entries, centuries, isLoading, isError } = useDerivedTimeline({
    type: typeFilter,
    century: centuryFilter,
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-sky text-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-3">
            HB <span className="text-primary italic">Timeline</span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto font-light text-base">
            Journey through Hartford&apos;s history. Key moments of race, migration,
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
              <div className="flex flex-wrap bg-slate-100 p-1 rounded-lg">
                {typeOptions.map((opt) => (
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
                {centuries.map((century) => (
                  <button
                    key={century}
                    onClick={() => setCenturyFilter(century)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                      centuryFilter === century
                        ? 'bg-sky text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {century}s
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {entries.length} event{entries.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <main className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <p className="text-center py-20 text-slate-500 font-medium">Loading timeline…</p>
          ) : isError ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">
                error
              </span>
              <p className="text-lg text-slate-500 font-medium">
                Couldn&apos;t load the timeline. Please try again later.
              </p>
            </div>
          ) : entries.length === 0 ? (
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
              {entries.map((entry) => {
                const kind = entry.type ?? 'event'
                const meta = TYPE_META[kind] ?? TYPE_META.event

                return (
                  <VerticalTimelineElement
                    key={`${kind}-${entry.id}`}
                    date={String(entry.year)}
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
                      background: meta.color,
                      width: '16px',
                      height: '16px',
                      marginLeft: '-8px',
                      boxShadow: `0 0 0 3px #fff, 0 0 0 4px ${meta.color}50`,
                    }}
                    iconClassName="timeline-dot"
                    icon={null}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${meta.chip}`}
                      >
                        {kind}
                      </span>
                      <span className="text-sm font-bold text-primary">{entry.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{entry.title}</h3>
                    {entry.href && (
                      <Link
                        to={entry.href}
                        className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.15em] text-sky hover:text-mint transition-colors"
                      >
                        View {meta.verb}
                        <span className="material-symbols-outlined ml-1.5 text-sm">
                          arrow_forward
                        </span>
                      </Link>
                    )}
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
