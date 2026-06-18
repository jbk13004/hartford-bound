import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { useTimeline } from '../hooks/useTimeline'
import type { TimelineEventType } from '../types/timelineEvent'

const typeOptions: { value: TimelineEventType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'story', label: 'Stories' },
  { value: 'map', label: 'Maps' },
]

export function TimelineView() {
  const [typeFilter, setTypeFilter] = useState<TimelineEventType | 'all'>('all')
  const [centuryFilter, setCenturyFilter] = useState<number | 'all'>('all')
  const { events, centuries, isLoading, isError } = useTimeline({
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
              <div className="flex bg-slate-100 p-1 rounded-lg">
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
              {events.length} event{events.length !== 1 ? 's' : ''}
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
          ) : events.length === 0 ? (
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
              {events.map((event) => {
                const isMap = event.type === 'map'
                const iconBg = isMap ? '#509EC8' : '#72B591'
                const linkPath = isMap ? `/maps/${event.linkId}` : `/stories/${event.linkId}`
                const tagColor = isMap ? 'bg-sky/10 text-sky' : 'bg-mint/10 text-mint'

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
                      <span className="text-sm font-bold text-primary">{event.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{event.title}</h3>
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
