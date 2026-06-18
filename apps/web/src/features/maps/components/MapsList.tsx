import { Link } from 'react-router-dom'
import { useMapCollections } from '../hooks/useMapCollections'
import type { MapColorScheme } from '../types/map'

interface ColorConfig {
  cardClass: string
  bgTint: string
  gradientFrom: string
  gradientVia: string
  titleColor: string
  subtitleColor: string
  linkColor: string
  linkHover: string
}

const colorConfig: Record<MapColorScheme, ColorConfig> = {
  green: {
    cardClass: 'story-card-green',
    bgTint: 'bg-mint/20',
    gradientFrom: 'from-mint/90',
    gradientVia: 'via-mint/20',
    titleColor: 'text-white',
    subtitleColor: 'text-white/80',
    linkColor: 'text-mint',
    linkHover: 'group-hover:text-slate-900',
  },
  blue: {
    cardClass: 'story-card-blue',
    bgTint: 'bg-sky/20',
    gradientFrom: 'from-sky/90',
    gradientVia: 'via-sky/20',
    titleColor: 'text-white',
    subtitleColor: 'text-white/80',
    linkColor: 'text-sky',
    linkHover: 'group-hover:text-slate-900',
  },
  yellow: {
    cardClass: 'story-card-yellow',
    bgTint: 'bg-primary/20',
    gradientFrom: 'from-primary/90',
    gradientVia: 'via-primary/20',
    titleColor: 'text-slate-900',
    subtitleColor: 'text-slate-800/80',
    linkColor: 'text-slate-900',
    linkHover: 'group-hover:text-sky',
  },
}

export function MapsList() {
  const { collections, isLoading, isError } = useMapCollections()

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-mint text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start gap-8">
            <div className="w-full">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[0.9] mb-8 drop-shadow-2xl flex flex-wrap items-baseline gap-x-4">
                <span className="uppercase tracking-tighter">HB</span>
                <span className="italic font-display text-primary text-6xl md:text-7xl lg:text-8xl">
                  Maps
                </span>
              </h1>
              <p className="text-base text-white/90 max-w-2xl border-l-4 border-primary pl-8 py-2 bg-white/5 backdrop-blur-sm shadow-sm">
                Visualizing the shifting boundaries of race, policy, and community through
                Hartford&apos;s historical cartographic record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* View All Maps CTA Card */}
          <article className="flex flex-col rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 justify-center items-center text-center bg-slate-50/50 dark:bg-slate-800/30">
            <div className="w-16 h-16 rounded-full bg-sky/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-sky text-3xl">map</span>
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase tracking-tight text-slate-800 dark:text-white mb-4">
              View All Maps
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-8 max-w-xs">
              Access the complete collection of Hartford Bound cartographic resources and
              interactive layers.
            </p>
            <Link
              to="/maps/atlas"
              className="px-8 py-3 bg-sky text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
            >
              Enter Atlas{' '}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </article>

          {/* Loading skeletons */}
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg overflow-hidden border border-slate-100">
                <div className="aspect-video bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-slate-200 rounded" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            ))}

          {/* Map Collection Cards */}
          {collections.map((card) => {
            const colors = colorConfig[card.colorScheme]
            return (
              <article
                key={card.id}
                className={`group flex flex-col rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colors.cardClass}`}
              >
                <div className={`relative aspect-video overflow-hidden ${colors.bgTint}`}>
                  <img
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105"
                    src={card.image}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${colors.gradientFrom} ${colors.gradientVia} to-transparent opacity-80`}
                  />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h2
                      className={`text-xl font-display font-extrabold uppercase tracking-tight ${colors.titleColor} drop-shadow-md`}
                    >
                      {card.title}
                    </h2>
                    <span
                      className={`text-[8px] font-bold ${colors.subtitleColor} tracking-[0.2em] uppercase`}
                    >
                      {card.subtitle}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-4 flex-grow leading-relaxed font-medium line-clamp-3">
                    {card.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 bg-white/50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/maps/atlas/${card.id}`}
                    className={`inline-flex items-center text-[9px] font-black uppercase tracking-[0.15em] ${colors.linkColor} ${colors.linkHover} transition-colors`}
                  >
                    Launch Collection
                    <span className="material-symbols-outlined ml-2 text-xs font-bold group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {isError && (
          <p className="mt-8 text-center text-slate-500 font-medium">
            Couldn&apos;t load map collections. Please try again later.
          </p>
        )}
      </main>
    </>
  )
}
