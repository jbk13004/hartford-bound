import { useState } from 'react'
import { Link } from 'react-router-dom'
//TODO card images should have photos or map scans
//TODO maps and stories should both get information, simple splash screen with an explanation and image, similar to spash screens before entering maps on american panorama
const mapCards = [
  {
    id: 'routes-and-roots',
    title: 'Routes and Roots',
    subtitle: 'Migration Patterns',
    description:
      'Tracking the pathways of the Great Migration and international arrivals that defined Hartford\'s demographic shifts.',
    tags: ['#MIGRATION', '#ROOTS'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxTvoUk2qT0EciTe4RhfGmFDTEbe0XXYXOKW4xje4TleU_SJY5MrN5xEjO3-XZ--QWvWOJhi2Uc2FpGBd3pbB8yj4A6d6XmQSHhKeQ83BmaTvNgjzzXqItNLAiQ59EAe4JoaPcSTAtkUKhQJuky06BJRU9H_gyrL8o6fk3G0wQEhBim3WIYTIU1TpxBt1k1GSF3pRbpDx1o6Gmt0GsgJ-jYyMS5KoA2oqFlfzTAYGEO7eJ-3aQ50e7BRMtzilmfmMPdzxYwAvqBvjp',
    colorScheme: 'green',
  },
  {
    id: 'hartford-through-time',
    title: 'Hartford Through Time',
    subtitle: 'Historical Chronology',
    description:
      'A comparative spatial analysis of the city\'s urban development from the colonial era to the post-industrial age.',
    tags: ['#CHRONOLOGY', '#EVOLUTION'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALHj5OqtPEhRWPC3TFYr8mRvvVYUUTkVkJBSqaNp2eC7pwx-9Chka2uICQKn6_HBg3YZOWSfNoQkQxH3A6EaeFtizARVNmV0w0Q6qXzOg2tpDTFH3-TmU5IPDXA_bODUKZieaVIw6TYPAVRRRx8tlFF7ze22eWGckPJ87ZDMPVWm_YwduwBOZ3EHqvOm60-HodIP702T6wwgz16yM3qbt5D7bAqVJFudZ_a8hQWZlmSaFHDrKE-cv7QLzlk5cK6G4Pv9dGesPYqhyF',
    colorScheme: 'blue',
  },
  {
    id: 'housing',
    title: 'Housing',
    subtitle: 'Redlining & Policy',
    description:
      'Visualizing the impact of HOLC redlining, restrictive covenants, and public housing projects on residential segregation.',
    tags: ['#POLICY', '#RESIDENCE'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zOn763t5gEHDR2aMBOuAODM29NbWUEhRxhB46ECF9ljvhHVZdlUn78BxWceqYVOzxPEJw2jADPc-_XFv4Cbg4HJ8BXBP3VRGtzSFBt_c_DVxPtT0zIdXrTcIeLB-gq-pO0VbWynxw-dLb_TeNt2dfZE4T3-qodN9rxzPLMUFt8iyF4DqlVBvei5mbhUhZRJPvUZV9oFpRSNFfniai78upjqi4uF_RTqTk3IV4lyN1fdHPTTOGQ1XBy-idjW5CfWCQxig6--778yy',
    colorScheme: 'yellow',
  },
  {
    id: 'flooding',
    title: 'Flooding',
    subtitle: 'Environmental Justice',
    description:
      'Historical flood lines and their intersection with socioeconomic vulnerability in Hartford\'s river-adjacent neighborhoods.',
    tags: ['#ENVIRONMENT', '#RIVER'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxTvoUk2qT0EciTe4RhfGmFDTEbe0XXYXOKW4xje4TleU_SJY5MrN5xEjO3-XZ--QWvWOJhi2Uc2FpGBd3pbB8yj4A6d6XmQSHhKeQ83BmaTvNgjzzXqItNLAiQ59EAe4JoaPcSTAtkUKhQJuky06BJRU9H_gyrL8o6fk3G0wQEhBim3WIYTIU1TpxBt1k1GSF3pRbpDx1o6Gmt0GsgJ-jYyMS5KoA2oqFlfzTAYGEO7eJ-3aQ50e7BRMtzilmfmMPdzxYwAvqBvjp',
    colorScheme: 'blue',
  },
]

const colorConfig = {
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

const quickFilters = ['#Housing', '#Redlining', '#Topography']

function Maps() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-mint text-white border-b border-white/5">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start gap-8">
            <div className="w-full">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[0.9] mb-8 drop-shadow-2xl flex flex-wrap items-baseline gap-x-4">
                <span className="uppercase tracking-tighter">
                  HB
                </span>
                <span className="italic font-display text-primary text-6xl md:text-7xl lg:text-8xl">
                  Maps
                </span>
              </h1>
              <p className="text-base text-white/90 max-w-2xl border-l-4 border-primary pl-8 py-2 bg-white/5 backdrop-blur-sm shadow-sm">
                Visualizing the shifting boundaries of race, policy, and
                community through Hartford's historical cartographic record.
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
              <span className="material-symbols-outlined text-sky text-3xl">
                map
              </span>
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase tracking-tight text-slate-800 dark:text-white mb-4">
              View All Maps
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-8 max-w-xs">
              Access the complete collection of Hartford Bound cartographic
              resources and interactive layers.
            </p>
            <Link
              to="/maps/atlas"
              className="px-8 py-3 bg-sky text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
            >
              Enter Atlas{' '}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </article>

          {/* Map Cards */}
          {mapCards.map((card) => {
            const colors = colorConfig[card.colorScheme]
            return (
              <article
                key={card.id}
                className={`group flex flex-col rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colors.cardClass}`}
              >
                <div
                  className={`relative aspect-video overflow-hidden ${colors.bgTint}`}
                >
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

      </main>
    </>
  )
}

export default Maps
