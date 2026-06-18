import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FlickrImage } from '@/shared/components/FlickrImage'
import { formatDates } from '@/shared/lib/dates'
import { useExhibits } from '../hooks/useExhibits'

export function ExhibitsView() {
  // Ephemeral UI state: which exhibit is selected and which panel is showing.
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [panelIndex, setPanelIndex] = useState(0)
  const { exhibits, selected, panels, linkedStories, linkedMaps } = useExhibits(selectedId)

  // Total panel count is DERIVED by counting this exhibit's panel rows — never typed.
  const total = panels.length
  // Clamp during render rather than resetting via an effect: switching exhibits
  // changes `total`, and a stale index would otherwise point past the new list.
  const safeIndex = total ? Math.min(panelIndex, total - 1) : 0
  const current = panels[safeIndex]
  const prev = () => setPanelIndex((i) => (total ? (i - 1 + total) % total : 0))
  const next = () => setPanelIndex((i) => (total ? (i + 1) % total : 0))

  // Selecting a different exhibit restarts its slideshow at the first panel.
  const selectExhibit = (id: string) => {
    setSelectedId(id)
    setPanelIndex(0)
  }

  return (
    <>
      {/* Hero Header */}
      <header className="bg-sky text-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              HB <span className="text-primary italic">Exhibits</span>
            </h1>
            <p className="mt-4 text-white/90 max-w-2xl font-light italic text-lg">
              Step through the digital corridors of Hartford&apos;s past. Explore curated visual
              narratives documenting the evolution of our city.
            </p>
          </div>
        </div>
      </header>

      {/* Exhibit Title */}
      <section className="bg-white pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4 uppercase tracking-tight">
            {selected?.title}
          </h2>
          <div className="w-20 h-1.5 bg-sky mx-auto" />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Panel slideshow — driven by `panels` (filtered + ordered by sort_order). */}
        <section className="relative mb-20 flex flex-col items-center">
          <div className="w-full flex items-center justify-center gap-4 md:gap-12 max-w-6xl relative">
            <button
              type="button"
              aria-label="Previous panel"
              onClick={prev}
              className="z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-sky hover:bg-sky hover:text-white transition-all transform hover:scale-110"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {/* IMPLEMENTOR: preserve the framed-panel look from the prior design
                (border, shadow, gradient overlay). Drive content from `current`. */}
            <div className="exhibit-panel-ratio w-full max-w-[480px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm border-[12px] border-white relative overflow-hidden group z-10">
              <div className="absolute inset-0 bg-slate-50 flex flex-col">
                <div className="relative h-3/5 bg-slate-200 overflow-hidden">
                  <FlickrImage
                    url={current?.image_url ?? ''}
                    size="b"
                    alt={current?.title ?? selected?.title ?? 'Exhibit panel'}
                    className="w-full h-full object-cover grayscale sepia-[0.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-8 right-8 text-white">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-2 block">
                      {current?.label}
                    </span>
                    <h2 className="text-3xl font-display font-bold leading-tight">
                      {current?.title}
                    </h2>
                  </div>
                </div>
                <div className="p-8 flex-1 bg-white">
                  <div className="w-12 h-1 bg-mint mb-6" />
                  <p className="text-slate-700 leading-relaxed text-sm font-light">
                    {current?.body}
                  </p>
                  <div className="mt-8 flex justify-between items-end">
                    <div className="text-[10px] text-slate-400 font-mono tracking-widest">
                      PANEL {String(total ? safeIndex + 1 : 0).padStart(2, '0')} / {total}
                    </div>
                    <span className="material-symbols-outlined text-slate-300">museum</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>

            <button
              type="button"
              aria-label="Next panel"
              onClick={next}
              className="z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-sky hover:bg-sky hover:text-white transition-all transform hover:scale-110"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Intro Text — the exhibit subtitle doubles as the intro line. */}
        {selected?.subtitle && (
          <section className="mb-20">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-base text-slate-600 leading-relaxed font-light mx-auto">
                {selected.subtitle}
              </p>
            </div>
          </section>
        )}

        {/* Linked stories / maps rails (resolved from story_ids / map_ids). */}
        {/* IMPLEMENTOR: style these rails; render nothing when the list is empty. */}
        {linkedStories.length > 0 && (
          <section className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
              Featured Stories
            </h3>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {linkedStories.map((story) => (
                <Link key={story.id} to={`/stories/${story.id}`} className="min-w-[200px] group">
                  <div className="aspect-[4/3] rounded overflow-hidden mb-2 bg-slate-100">
                    <FlickrImage
                      url={story.hero_image_url}
                      size="w"
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky">
                    {story.title}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        )}

        {linkedMaps.length > 0 && (
          <section className="mb-20">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
              Featured Maps
            </h3>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {linkedMaps.map((map) => (
                <Link key={map.id} to={`/maps/${map.id}`} className="min-w-[200px] group">
                  <div className="aspect-[4/3] rounded overflow-hidden mb-2 bg-slate-100">
                    <FlickrImage
                      url={map.image_url}
                      size="w"
                      alt={map.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky">
                    {map.title}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Exhibit Selector strip — active exhibit highlighted; click to select. */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                Exhibit Selector
              </h3>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-xs text-slate-400">{exhibits.length} Exhibits Available</span>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x">
            {exhibits.map((exhibit) => {
              const isSelected = exhibit.id === selected?.id
              return (
                <button
                  type="button"
                  key={exhibit.id}
                  onClick={() => selectExhibit(exhibit.id)}
                  className="min-w-[260px] snap-start group cursor-pointer text-left"
                >
                  <div
                    className={`relative aspect-[16/10] rounded-lg overflow-hidden shadow-sm mb-3 transition-all ${
                      exhibit.active
                        ? 'border-4 border-sky shadow-md'
                        : 'border border-slate-100 hover:border-mint'
                    } ${isSelected ? 'ring-2 ring-sky ring-offset-2' : ''}`}
                  >
                    <FlickrImage
                      url={exhibit.cover_image_url}
                      size="z"
                      alt={exhibit.title}
                      className={`w-full h-full object-cover transition-all ${
                        exhibit.active
                          ? ''
                          : 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100'
                      }`}
                    />
                    {exhibit.active && (
                      <div className="absolute inset-0 bg-sky/10 group-hover:bg-transparent transition-colors" />
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-sky transition-colors">
                    {exhibit.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">
                    {formatDates(exhibit.dates_label, exhibit.year_start, exhibit.year_end)}
                  </p>
                </button>
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}
