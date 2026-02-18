import { useState } from 'react'
import { Link } from 'react-router-dom'

const stories = [
  {
    id: 'addie-brown',
    title: 'Addie Brown',
    dates: '1841 \u2014 1870',
    excerpt:
      'Domestic worker whose letters provide rare insight into the economic restrictions and intimate friendships of Black women in the 19th century.',
    tags: ['#LABOR', '#GENDER'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALHj5OqtPEhRWPC3TFYr8mRvvVYUUTkVkJBSqaNp2eC7pwx-9Chka2uICQKn6_HBg3YZOWSfNoQkQxH3A6EaeFtizARVNmV0w0Q6qXzOg2tpDTFH3-TmU5IPDXA_bODUKZieaVIw6TYPAVRRRx8tlFF7ze22eWGckPJ87ZDMPVWm_YwduwBOZ3EHqvOm60-HodIP702T6wwgz16yM3qbt5D7bAqVJFudZ_a8hQWZlmSaFHDrKE-cv7QLzlk5cK6G4Pv9dGesPYqhyF',
    alt: 'Portrait of Addie Brown',
    variant: 'blue',
  },
  {
    id: 'james-mars',
    title: 'James Mars',
    dates: '1790 \u2014 1880',
    excerpt:
      'Emancipated slave and religious leader who advocated for civil rights and suffrage. His autobiography is a cornerstone of history.',
    tags: ['#ACTIVISM', '#LEADERSHIP'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zOn763t5gEHDR2aMBOuAODM29NbWUEhRxhB46ECF9ljvhHVZdlUn78BxWceqYVOzxPEJw2jADPc-_XFv4Cbg4HJ8BXBP3VRGtzSFBt_c_DVxPtT0zIdXrTcIeLB-gq-pO0VbWynxw-dLb_TeNt2dfZE4T3-qodN9rxzPLMUFt8iyF4DqlVBvei5mbhUhZRJPvUZV9oFpRSNFfniai78upjqi4uF_RTqTk3IV4lyN1fdHPTTOGQ1XBy-idjW5CfWCQxig6--778yy',
    alt: 'Portrait of James Mars',
    variant: 'yellow',
  },
  {
    id: 'catharine-freebody',
    title: 'Freebody',
    dates: 'Circa 1850',
    excerpt:
      "Philanthropist and benefactor dedicated to Hartford's vulnerable communities. Her estate established critical social infrastructure.",
    tags: ['#COMMUNITY', '#BENEFACTOR'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxTvoUk2qT0EciTe4RhfGmFDTEbe0XXYXOKW4xje4TleU_SJY5MrN5xEjO3-XZ--QWvWOJhi2Uc2FpGBd3pbB8yj4A6d6XmQSHhKeQ83BmaTvNgjzzXqItNLAiQ59EAe4JoaPcSTAtkUKhQJuky06BJRU9H_gyrL8o6fk3G0wQEhBim3WIYTIU1TpxBt1k1GSF3pRbpDx1o6Gmt0GsgJ-jYyMS5KoA2oqFlfzTAYGEO7eJ-3aQ50e7BRMtzilmfmMPdzxYwAvqBvjp',
    alt: 'Portrait of Catharine Freebody',
    variant: 'green',
  },
  {
    id: 'brown-archive',
    title: 'Brown Archive',
    dates: 'Correspondence',
    excerpt:
      'An exploration of the social networks between Hartford and New York through the lens of early African American epistolary culture.',
    tags: ['#MIGRATION', '#CULTURE'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALHj5OqtPEhRWPC3TFYr8mRvvVYUUTkVkJBSqaNp2eC7pwx-9Chka2uICQKn6_HBg3YZOWSfNoQkQxH3A6EaeFtizARVNmV0w0Q6qXzOg2tpDTFH3-TmU5IPDXA_bODUKZieaVIw6TYPAVRRRx8tlFF7ze22eWGckPJ87ZDMPVWm_YwduwBOZ3EHqvOm60-HodIP702T6wwgz16yM3qbt5D7bAqVJFudZ_a8hQWZlmSaFHDrKE-cv7QLzlk5cK6G4Pv9dGesPYqhyF',
    alt: 'Archive document',
    variant: 'blue',
  },
  {
    id: 'mars-legacy',
    title: 'Mars Legacy',
    dates: 'Civil Rights',
    excerpt:
      "The ongoing influence of Mars' advocacy on the legislative history of voting rights within the New England region during the 1800s.",
    tags: ['#VOTING', '#HISTORY'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zOn763t5gEHDR2aMBOuAODM29NbWUEhRxhB46ECF9ljvhHVZdlUn78BxWceqYVOzxPEJw2jADPc-_XFv4Cbg4HJ8BXBP3VRGtzSFBt_c_DVxPtT0zIdXrTcIeLB-gq-pO0VbWynxw-dLb_TeNt2dfZE4T3-qodN9rxzPLMUFt8iyF4DqlVBvei5mbhUhZRJPvUZV9oFpRSNFfniai78upjqi4uF_RTqTk3IV4lyN1fdHPTTOGQ1XBy-idjW5CfWCQxig6--778yy',
    alt: 'Civil rights documents',
    variant: 'yellow',
  },
  {
    id: 'urban-mapping',
    title: 'Urban Mapping',
    dates: 'Space & Place',
    excerpt:
      "Mapping the physical locations of Freebody's philanthropic institutions and their impact on neighborhood stability in early Hartford.",
    tags: ['#MAPPING', '#URBAN'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxTvoUk2qT0EciTe4RhfGmFDTEbe0XXYXOKW4xje4TleU_SJY5MrN5xEjO3-XZ--QWvWOJhi2Uc2FpGBd3pbB8yj4A6d6XmQSHhKeQ83BmaTvNgjzzXqItNLAiQ59EAe4JoaPcSTAtkUKhQJuky06BJRU9H_gyrL8o6fk3G0wQEhBim3WIYTIU1TpxBt1k1GSF3pRbpDx1o6Gmt0GsgJ-jYyMS5KoA2oqFlfzTAYGEO7eJ-3aQ50e7BRMtzilmfmMPdzxYwAvqBvjp',
    alt: 'Map archival illustration',
    variant: 'green',
  },
]

const variantStyles = {
  blue: {
    cardClass: 'story-card-blue',
    bgOverlay: 'bg-sky/20',
    gradientOverlay: 'bg-gradient-to-t from-sky/90 via-sky/20 to-transparent',
    titleText: 'text-white drop-shadow-md',
    dateText: 'text-white/80',
    linkText: 'text-sky group-hover:text-slate-900',
  },
  yellow: {
    cardClass: 'story-card-yellow',
    bgOverlay: 'bg-primary/20',
    gradientOverlay:
      'bg-gradient-to-t from-primary/90 via-primary/20 to-transparent',
    titleText: 'text-slate-900 drop-shadow-sm',
    dateText: 'text-slate-800/80',
    linkText: 'text-slate-900 group-hover:text-sky',
  },
  green: {
    cardClass: 'story-card-green',
    bgOverlay: 'bg-mint/20',
    gradientOverlay:
      'bg-gradient-to-t from-mint/90 via-mint/20 to-transparent',
    titleText: 'text-white drop-shadow-md',
    dateText: 'text-white/80',
    linkText: 'text-mint group-hover:text-slate-900',
  },
}

function Stories() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-sky text-white border-b border-white/5">

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start gap-8">
            <div className="w-full">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[0.9] mb-8 drop-shadow-2xl flex flex-wrap items-baseline gap-x-4">
                <span className="uppercase tracking-tighter">
                  HB
                </span>
                <span className="italic font-display text-primary text-6xl md:text-7xl lg:text-8xl">
                  Stories
                </span>
              </h1>
              <p className="text-base text-blue-50 max-w-2xl border-l-4 border-primary pl-8 py-2 bg-white/5 backdrop-blur-sm shadow-sm">
                Tracing the lived experiences of individuals who shaped
                Hartford&apos;s landscape through migration, labor, and
                community building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter/Search Bar */}
      <section className="bg-white py-6 sticky top-20 z-40 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-grow max-w-md">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  search
                </span>
                <input
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border-slate-200 bg-slate-50 focus:ring-2 focus:ring-sky focus:border-sky transition-all text-xs"
                  placeholder="Search stories..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

            </div>

            {/* View Toggle */}
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
                <button
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-sky'
                      : 'text-slate-500 hover:text-sky'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  <span className="material-symbols-outlined text-sm">
                    grid_view
                  </span>
                  <span>Grid View</span>
                </button>
                <button
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                    viewMode === 'map'
                      ? 'bg-white shadow-sm text-sky'
                      : 'text-slate-500 hover:text-sky'
                  }`}
                  onClick={() => setViewMode('map')}
                >
                  <span className="material-symbols-outlined text-sm">
                    map
                  </span>
                  <span>Map View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => {
            const styles = variantStyles[story.variant]
            return (
              <article
                key={story.id}
                className={`group flex flex-col rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${styles.cardClass}`}
              >
                <div
                  className={`relative aspect-video overflow-hidden ${styles.bgOverlay}`}
                >
                  <img
                    alt={story.alt}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105"
                    src={story.image}
                  />
                  <div
                    className={`absolute inset-0 ${styles.gradientOverlay} opacity-80`}
                  />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h2
                      className={`text-xl font-display font-extrabold uppercase tracking-tight ${styles.titleText}`}
                    >
                      {story.title}
                    </h2>
                    <span
                      className={`text-[8px] font-bold tracking-[0.2em] uppercase ${styles.dateText}`}
                    >
                      {story.dates}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-xs text-slate-700 mb-4 flex-grow leading-relaxed font-medium line-clamp-3">
                    {story.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 bg-white/50 text-slate-600 rounded border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/stories/${story.id}`}
                    className={`inline-flex items-center text-[9px] font-black uppercase tracking-[0.15em] transition-colors ${styles.linkText}`}
                  >
                    Read Story
                    <span className="material-symbols-outlined ml-2 text-xs font-bold group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default Stories
