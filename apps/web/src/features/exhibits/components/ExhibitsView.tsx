import { useState } from 'react'
import { FlickrImage } from '@/shared/components/FlickrImage'
import { formatDates } from '@/shared/lib/dates'
import { useExhibits } from '../hooks/useExhibits'

export function ExhibitsView() {
  // Ephemeral UI state: which exhibit is selected and which panel is showing.
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [panelIndex, setPanelIndex] = useState(0)
  const { exhibits, selected, panels } = useExhibits(selectedId)

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
        {/* Viewer — image-focused: a large framed canvas with prev/next controls,
            driven by `current`. The caption block beneath stays short (no full body). */}
        <section className="mb-12 flex flex-col items-center">
          <div className="w-full max-w-4xl flex items-center gap-3 md:gap-6">
            <button
              type="button"
              aria-label="Previous panel"
              onClick={prev}
              className="shrink-0 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-sky hover:bg-sky hover:text-white transition-all transform hover:scale-110"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <figure className="flex-1 min-w-0">
              <div className="aspect-[4/3] w-full bg-slate-100 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                <FlickrImage
                  url={current?.image_url ?? ''}
                  size="b"
                  alt={current?.title ?? selected?.title ?? 'Exhibit canvas'}
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>

            <button
              type="button"
              aria-label="Next panel"
              onClick={next}
              className="shrink-0 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-sky hover:bg-sky hover:text-white transition-all transform hover:scale-110"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Filmstrip — thumbnails of the selected exhibit's panels, sitting
              directly under the canvas. Click to jump; the derived
              `PANEL nn / total` counter lives here. */}
          <div className="w-full max-w-4xl mt-6">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                Canvases
              </h3>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest">
                PANEL {String(total ? safeIndex + 1 : 0).padStart(2, '0')} / {total}
              </span>
            </div>

            <div className="flex justify-center gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
              {panels.map((panel, i) => {
                const isActive = i === safeIndex
                return (
                  <button
                    type="button"
                    key={`${panel.exhibit_id}-${panel.sort_order}`}
                    aria-label={panel.title}
                    aria-current={isActive ? true : undefined}
                    onClick={() => setPanelIndex(i)}
                    className={`shrink-0 snap-start w-28 aspect-[4/3] rounded-md overflow-hidden bg-slate-100 transition-all ${
                      isActive
                        ? 'ring-2 ring-sky ring-offset-2'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <FlickrImage
                      url={panel.image_url}
                      size="q"
                      alt={panel.title}
                      linkToSource={false}
                      className={`w-full h-full object-cover transition-all ${
                        isActive ? '' : 'grayscale'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Caption block: eyebrow + title + a single short caption line. */}
          <div className="w-full max-w-3xl mt-8 text-center">
            {current?.label && (
              <span className="block text-[11px] uppercase tracking-widest font-bold text-sky mb-2">
                {current.label}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 leading-tight">
              {current?.title}
            </h3>
            {(current?.caption || current?.body) && (
              <p className="mt-3 text-sm text-slate-500 font-light italic max-w-2xl mx-auto">
                {current?.caption || current?.body}
              </p>
            )}
          </div>
        </section>

        {/* Exhibit Selector strip — active exhibit highlighted; click to select. */}
        <section className="mt-8">
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
                      linkToSource={false}
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
