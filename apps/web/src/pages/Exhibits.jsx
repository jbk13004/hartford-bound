import { useState } from 'react'

const collections = [
  {
    title: 'The Great Migration',
    dates: '1915 — 1940',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD0x7_uQcZMtedP5cYXn76Au01BjPIlcoa6x6UKwF40hWFVsUt_7P4Je3WqYrhVT_xQb_d6IJYBCofSzg8IY8o7CQvFLRfDvp-wq388FHbmj19dQ3WKWP_v41IE4vI5ujPBoUgI4ni5d0hSrw-9Cx5XI5rtR4OX0xO72VU72zAfjh3nuflihR8A-S3XCxQStdiCT6mx0uQ56voX8GO9TIO6RnZWnL3UC0yqbm7CQGr-c4G3Qd6yoGKD4c7_QnKm2Zrg_mQJnpSb9iRi',
    active: true,
  },
  {
    title: 'Housing Justice',
    dates: '1945 — 1968',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiVpMCemYP8y7iQfR3Z8HUhpqCNKV5DfJpLuJ00UUpmRvEh9FnYQvfjYq0HRl4ms8L3CXlB4M-00GGAaHTvMzJdFb8WthFdx2ZYXMfbtcsqkY_GRvoxamPoDXn2qqUTto4ViIGqVje-079xz0f14GXdpw9v7Iz-MnsIWNQhcqI58NzEfIaJORdE_3Ky47ArTUBx9ybog0nhZKk7HoCoORI_3w4hWNJbzAibZH7WNIpXQXiwNaEetiDrqZOl87a6PUHu4RZ13_ORi3y',
    active: false,
  },
  {
    title: 'Urban Landscapes',
    dates: '1890 — 1920',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzoXkHcIQhckHs3_GjPxSxloBcNgSjVWof8zeI0mcQ_Jl9OPeqi0IdeCugCGxHssniKvKOrfqBL3-iIf5uGZ4HT3xL3pBSzNCie8nqxa9AD5dcvPEo1s8mOYqAWZ0a8IzapBmasVMCm7He7tEzVKrF7-h6pKAbYEv8PoFpLk5N1f-rYaq3K_ktxN1eyczQ-kSzw0KOuCogooitQX9Vhruh_oxhLx8XnGZMHrZujpRTCd2wTL4mVUzfTitv5ZyX2mD47-W77Si18Nkh',
    active: false,
  },
  {
    title: 'Labor & Industry',
    dates: '1900 — 1950',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4HNaNAtuACDsIlmFogQtnF3w--HtvJSQnkmHQvaZ169r1fJ3og5eK-SKrrbEsIJkft0D28IKEVGxamC7eAHtvsPsRITSHrHZFYujlhOVjP078AaWfaboVKaX4QOznp_t2Z-sKA9BtuzJ43eEgmfBtEtZCM9AgnOCz5RsZZEUuMjL_ofOTElRUhE_nHJIsKaK06hqIA26aigLP3Sy8azBOxZaLF7UA2DTK93HEIfr1ww53N9sYNOJufTMGy1hDmgFxNPlNecjFfBte',
    active: false,
  },
  {
    title: 'Schools & Segregation',
    dates: '1960 — 1980',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApPzKlbREXUjDhxBk-pmYmZXG1HokM16J-TEcHq7V3KrrHvjiJz38UzkZdLFc8ZFH5BXfvGjFEDRtAEF_SgZ9HR3aHEFEIuUKegMt2nB2NMB_lxPI8bGePceNe0B6fMCou4nJHUfWFOpoLygSRN-P8wqkiXP4ThxZxdJ_sZIlveuRVptvNma9pmHCEEZCP1LpArEr6-frYB7uAyPOC9erbmZl1PIKIoer_V6muGxrfgVqZ78Q7DmhwK3x6_OLdvUWORmF4pEHK7J-t',
    active: false,
  },
]

const panels = [
  {
    label: 'Part 1: The Arrival',
    title: 'North End Arrivals',
    body: "Between 1910 and 1970, the demographic landscape of Hartford shifted dramatically. This panel explores the initial waves of the Great Migration, focusing on the development of vibrant community centers along Main Street and Albany Avenue. Archival photographs capture the resilience and entrepreneurship of new residents establishing roots in the capital city.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB8A24cDy185ZQNCZ-u1b-NV-KT0kVllb4VDDXTUkC6QwnrHLAaE0D0nU-i73GEyvbJxDKzLegRDi_k6wL4fm95ySP7PAKvowM46RtjnYciIbIrpwoghYnauJeKL--M5nB1XAuNzxLWjcSbw9Xyg8n2dJu7Q6lJyN5l2vOcY1Xh__Puo4L4VhwJMMIPVAidb1eO05oJPFrbBsmQE4PPnh69PEjl58aOrjqP18mtN4lRs3-F9ItaBolUcejrpGZgfDnuxy9qxvgPIvV',
    prevImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiVpMCemYP8y7iQfR3Z8HUhpqCNKV5DfJpLuJ00UUpmRvEh9FnYQvfjYq0HRl4ms8L3CXlB4M-00GGAaHTvMzJdFb8WthFdx2ZYXMfbtcsqkY_GRvoxamPoDXn2qqUTto4ViIGqVje-079xz0f14GXdpw9v7Iz-MnsIWNQhcqI58NzEfIaJORdE_3Ky47ArTUBx9ybog0nhZKk7HoCoORI_3w4hWNJbzAibZH7WNIpXQXiwNaEetiDrqZOl87a6PUHu4RZ13_ORi3y',
    nextImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzoXkHcIQhckHs3_GjPxSxloBcNgSjVWof8zeI0mcQ_Jl9OPeqi0IdeCugCGxHssniKvKOrfqBL3-iIf5uGZ4HT3xL3pBSzNCie8nqxa9AD5dcvPEo1s8mOYqAWZ0a8IzapBmasVMCm7He7tEzVKrF7-h6pKAbYEv8PoFpLk5N1f-rYaq3K_ktxN1eyczQ-kSzw0KOuCogooitQX9Vhruh_oxhLx8XnGZMHrZujpRTCd2wTL4mVUzfTitv5ZyX2mD47-W77Si18Nkh',
    panelNumber: 4,
    totalPanels: 12,
  },
]
//TODO animate with externa library, make sure will work with github pages
function Exhibits() {
  const [currentPanel] = useState(0)
  const panel = panels[currentPanel]

  return (
    <>
      {/* Hero Header */}
      <header className="bg-sky text-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              HB{' '}
              <span className="text-primary italic">Exhibits</span>
            </h1>
            <p className="mt-4 text-white/90 max-w-2xl font-light italic text-lg">
              Step through the digital corridors of Hartford's past. Explore
              curated visual narratives documenting the evolution of our city.
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
          <div className="w-20 h-1.5 bg-sky mx-auto"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Panel Carousel */}
        <section className="relative mb-20 flex flex-col items-center">
          <div className="w-full flex items-center justify-center gap-4 md:gap-12 max-w-6xl relative">
            {/* Previous Panel Ghost */}
            <div className="hidden lg:block absolute left-0 w-32 exhibit-panel-ratio opacity-40 grayscale blur-[1px] rounded overflow-hidden border border-slate-200 shadow-sm pointer-events-none">
              <img
                alt="Previous Panel"
                className="w-full h-full object-cover"
                src={panel.prevImage}
              />
            </div>

            {/* Left Arrow */}
            <button className="z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-sky hover:bg-sky hover:text-white transition-all transform hover:scale-110">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {/* Main Panel */}
            <div className="exhibit-panel-ratio w-full max-w-[480px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm border-[12px] border-white relative overflow-hidden group z-10">
              <div className="absolute inset-0 bg-slate-50 flex flex-col">
                <div className="relative h-3/5 bg-slate-200 overflow-hidden">
                  <img
                    alt="Historical Map"
                    className="w-full h-full object-cover grayscale sepia-[0.1]"
                    src={panel.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-8 right-8 text-white">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-2 block">
                      {panel.label}
                    </span>
                    <h2 className="text-3xl font-display font-bold leading-tight">
                      {panel.title}
                    </h2>
                  </div>
                </div>
                <div className="p-8 flex-1 bg-white">
                  <div className="w-12 h-1 bg-mint mb-6"></div>
                  <p className="text-slate-700 leading-relaxed text-sm font-light">
                    {panel.body}
                  </p>
                  <div className="mt-8 flex justify-between items-end">
                    <div className="text-[10px] text-slate-400 font-mono tracking-widest">
                      PANEL {String(panel.panelNumber).padStart(2, '0')} /{' '}
                      {panel.totalPanels}
                    </div>
                    <span className="material-symbols-outlined text-slate-300">
                      museum
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
            </div>

            {/* Right Arrow */}
            <button className="z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-sky hover:bg-sky hover:text-white transition-all transform hover:scale-110">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>

            {/* Next Panel Ghost */}
            <div className="hidden lg:block absolute right-0 w-32 exhibit-panel-ratio opacity-40 grayscale blur-[1px] rounded overflow-hidden border border-slate-200 shadow-sm pointer-events-none">
              <img
                alt="Next Panel"
                className="w-full h-full object-cover"
                src={panel.nextImage}
              />
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex gap-2 mt-10">
            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            <span className="w-8 h-2 rounded-full bg-sky"></span>
            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
          </div>
        </section>

        {/* Intro Text */}
        <section className="mb-20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-base text-slate-600 leading-relaxed font-light mx-auto">
              During the mid-20th century, thousands of Black Southerners
              relocated to Hartford in search of industrial opportunity and
              social refuge. This exhibit explores the specific geographic and
              cultural shifts that defined the North End as a cornerstone of the
              city's African American life, examining both the vibrancy of the
              community and the structural challenges of segregation.
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
              <span className="h-4 w-px bg-slate-200"></span>
              <span className="text-xs text-slate-400">
                {collections.length} Exhibits Available
              </span>
            </div>
            <div className="flex gap-6">
              <div className="flex gap-2">
                <button className="p-1 text-slate-300 hover:text-sky">
                  <span className="material-symbols-outlined text-lg">
                    west
                  </span>
                </button>
                <button className="p-1 text-slate-300 hover:text-sky">
                  <span className="material-symbols-outlined text-lg">
                    east
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x">
            {collections.map((col, i) => (
              <div
                key={i}
                className="min-w-[260px] snap-start group cursor-pointer"
              >
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
                    <div className="absolute inset-0 bg-sky/10 group-hover:bg-transparent transition-colors"></div>
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

export default Exhibits
