import { useExhibits } from '../hooks/useExhibits'

// The single featured panel is editorial showcase copy (not list data), so it
// stays in the view. The collection strip below is data-driven.
const panel = {
  label: 'Part 1: The Arrival',
  title: 'North End Arrivals',
  body: "Between 1910 and 1970, the demographic landscape of Hartford shifted dramatically. This panel explores the initial waves of the Great Migration, focusing on the development of vibrant community centers along Main Street and Albany Avenue. Archival photographs capture the resilience and entrepreneurship of new residents establishing roots in the capital city.",
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAB8A24cDy185ZQNCZ-u1b-NV-KT0kVllb4VDDXTUkC6QwnrHLAaE0D0nU-i73GEyvbJxDKzLegRDi_k6wL4fm95ySP7PAKvowM46RtjnYciIbIrpwoghYnauJeKL--M5nB1XAuNzxLWjcSbw9Xyg8n2dJu7Q6lJyN5l2vOcY1Xh__Puo4L4VhwJMMIPVAidb1eO05oJPFrbBsmQE4PPnh69PEjl58aOrjqP18mtN4lRs3-F9ItaBolUcejrpGZgfDnuxy9qxvgPIvV',
  panelNumber: 4,
  totalPanels: 12,
}

export function ExhibitsView() {
  const { collections } = useExhibits()

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
            The Great Migration to the North End
          </h2>
          <div className="w-20 h-1.5 bg-sky mx-auto" />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Panel */}
        <section className="relative mb-20 flex flex-col items-center">
          <div className="w-full flex items-center justify-center gap-4 md:gap-12 max-w-6xl relative">
            <button className="z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-sky hover:bg-sky hover:text-white transition-all transform hover:scale-110">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <div className="exhibit-panel-ratio w-full max-w-[480px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm border-[12px] border-white relative overflow-hidden group z-10">
              <div className="absolute inset-0 bg-slate-50 flex flex-col">
                <div className="relative h-3/5 bg-slate-200 overflow-hidden">
                  <img
                    alt={panel.title}
                    className="w-full h-full object-cover grayscale sepia-[0.1]"
                    src={panel.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-8 right-8 text-white">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-2 block">
                      {panel.label}
                    </span>
                    <h2 className="text-3xl font-display font-bold leading-tight">{panel.title}</h2>
                  </div>
                </div>
                <div className="p-8 flex-1 bg-white">
                  <div className="w-12 h-1 bg-mint mb-6" />
                  <p className="text-slate-700 leading-relaxed text-sm font-light">{panel.body}</p>
                  <div className="mt-8 flex justify-between items-end">
                    <div className="text-[10px] text-slate-400 font-mono tracking-widest">
                      PANEL {String(panel.panelNumber).padStart(2, '0')} / {panel.totalPanels}
                    </div>
                    <span className="material-symbols-outlined text-slate-300">museum</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>

            <button className="z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-sky hover:bg-sky hover:text-white transition-all transform hover:scale-110">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Intro Text */}
        <section className="mb-20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-base text-slate-600 leading-relaxed font-light mx-auto">
              During the mid-20th century, thousands of Black Southerners relocated to Hartford in
              search of industrial opportunity and social refuge. This exhibit explores the specific
              geographic and cultural shifts that defined the North End as a cornerstone of the
              city&apos;s African American life, examining both the vibrancy of the community and the
              structural challenges of segregation.
            </p>
          </div>
        </section>

        {/* Collection Selector */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                Exhibit Selector
              </h3>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-xs text-slate-400">
                {collections.length} Exhibits Available
              </span>
            </div>
            <div className="flex gap-6">
              <div className="flex gap-2">
                <button className="p-1 text-slate-300 hover:text-sky">
                  <span className="material-symbols-outlined text-lg">west</span>
                </button>
                <button className="p-1 text-slate-300 hover:text-sky">
                  <span className="material-symbols-outlined text-lg">east</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x">
            {collections.map((col) => (
              <div key={col.id} className="min-w-[260px] snap-start group cursor-pointer">
                <div
                  className={`relative aspect-[16/10] rounded-lg overflow-hidden shadow-sm mb-3 transition-all ${
                    col.active
                      ? 'border-4 border-sky shadow-md'
                      : 'border border-slate-100 hover:border-mint'
                  }`}
                >
                  <img
                    className={`w-full h-full object-cover transition-all ${
                      col.active
                        ? ''
                        : 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100'
                    }`}
                    src={col.image}
                    alt={col.title}
                  />
                  {col.active && (
                    <div className="absolute inset-0 bg-sky/10 group-hover:bg-transparent transition-colors" />
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-sky transition-colors">
                  {col.title}
                </h4>
                <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">
                  {col.dates}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
