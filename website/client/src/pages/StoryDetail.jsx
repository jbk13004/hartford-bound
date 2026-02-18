import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function StoryDetail() {
  const { storyId } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace placeholder data with Google Sheets API fetch using storyId URL parameter
    // e.g., fetch from Google Sheets where row matches storyId
    const fetchStory = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // TODO: All fields below will be populated from Google Sheets data
      setStory({
        // --- Hero Section ---
        title: 'Addie Brown',
        subtitle:
          'Domestic worker whose peripatetic lifestyle reflects the restrictive nature of employment for African American women in 19th-century Hartford.',
        dates: '1841 \u2013 1870',
        tags: [
          { label: 'Migration', className: 'bg-mint text-white' },
          { label: 'Working Class', className: 'bg-white/20 text-white' },
        ],
        portraitImage:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAYaetG2eCPzfnf5dtcjP7-iuhOJTQDojjq9V1xT06l4f9vgRyrfTOZopTLQ3EK-0F-nKxioHvYXkHmfUcNLShfe60uiLWsUq2QEyc8N793-z9AbgoYstH_EnymcG1P5JX1eghiCUurc7WMkyntazRH6ujfterDOZE0b1cReaZR-NN1Gzhr4OS6ebrE3vH7DpwrMdCI2RAOWTce1lvyUZPu0hO0AlTrzG38qNoR-nJ6_srMBnDwBH-SN_4kWgaNytCFk1WpCb0Bw9lC',

        // --- Article Content Section 1 ---
        mainHeading: 'A Life in Motion',
        mainContent: [
          "Addie Brown\u2019s story is one of resilience and constant movement. Born in the mid-19th century, her life in Hartford, Connecticut, provides a window into the lived experiences of African American women who navigated a landscape defined by both opportunity and severe structural limitations.",
          'Through her extensive correspondence with Rebecca Primus, Addie documented the challenges of domestic labor. She moved frequently between households, seeking better wages and treatment, illustrating the \u201Cperipatetic\u201D nature of survival for Black working-class women during this era. Her mobility wasn\u2019t just physical movement across the city, but a strategic negotiation for dignity and independence.',
        ],
        blockquote:
          '\u201CI am tired of living this way, Addie wrote. I want a home of my own, where I can be free to do as I please.\u201D',
        subHeading: 'The Hartford Context',
        subContent:
          "Hartford in the 1860s was a city of stark contrasts. As one of America\u2019s wealthiest cities at the end of the Civil War, its prosperity was built on industries that often excluded the very people who kept the city running. Addie\u2019s narrative intersects with the broader story of migration and community formation in Hartford\u2019s North End.",
        contextImage:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDtQ_Spo98Pi3kaOre0y3ev5IK9kgFgPosTm9bqoPMIM_I5vRf95r5fTHk6WKsQLQinnkY0EXly8j-KaeUF02Vi5crFctY7RHaZ9QXLtCw8PGjd6EXmIE5qvYy_cOHgd0LtXgu05pUX0_dmnNIezs2rgpKD1DXmvqsbJrMxpmG8CLLC6pgxwqDA6ruuSUOlcyO2ktyfStaWCFzWm7dGRwFHNMeaoN09T3agdHp87hBGOAnOjge-iqYOvIXwSeFBOLusCDHlVvY-Rwvv',
        contextImageAlt: 'Historical Sketch of Hartford',
        contextTitle: 'Historical Context',
        contextCaption:
          "Sketch showing the urban development of Hartford during Addie Brown\u2019s residence, highlighting the proximity between affluent neighborhoods and the servant quarters.",

        // --- Sidebar ---
        relatedMaps: [
          {
            title: 'Employment Clusters (1860)',
            description:
              'Spatial distribution of domestic laborers in the Talcott Street neighborhood.',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAcL1QP5xYqX5wyRMgkWHBj7CS5x96bRXnpkOV5IIXnUE5TM1RHkTvKl-uS_jtddc3o8gnZWzLntoK_JKC78Z8DRX1e7WVCWjA-16MiNLMqvUIxsa2YJX2NAVT91sF_LxpS5B83C9GGKQAD8-rUbVYRXhySvYGeVdk_2ZEJf1-7KvnfdkTGE7VOqRBZwimBBxGvB8UxFyfcs3aRr51M87gKCgyQJrqkk6_uJN377__N_wCw9ps0UNwGxyIii4Vdpo4CoR6vrw_K109D',
          },
          {
            title: 'Internal Migration Paths',
            description:
              "Tracking Addie\u2019s movements between Hartford and New York City.",
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCXVW4Jh-rH5J2xHbzVlhsxvaevGnE8Ol0g-zndHEi-mdamSdbYD-LbZ31B2Lui29F6Nd9m6jEGcur5WIOf46vDH7f4rfNuo6rOAKE5zLj0VnyZOFCitxsYReBb-1uwc4Rszmv0mA-NjO7KNY_2I4v47zvD5l7QpVdITYoJDAHkCpI_ZqSahRk1iIC9mPX15AKroqraF2PUI01A_s04_j40U3ORrNWaYUqEyPV_HwPXh1bVA8H-eni7oNyBc_xW379nsx4HZxvQEce5',
          },
        ],
        // TODO: Related stories from Google Sheets
        relatedStories: [
          {
            id: 'james-mars',
            title: 'James Mars',
            description: 'Emancipated slave and religious leader who advocated for civil rights.',
          },
          {
            id: 'catharine-freebody',
            title: 'Catharine Freebody',
            description: 'Philanthropist dedicated to Hartford\u2019s vulnerable communities.',
          },
        ],

        // --- ArcGIS Story Map Section ---
        // TODO: ArcGIS Story Map embed URL from Google Sheets
        arcgisUrl: '',
        arcgisTitle: "Interactive Narrative: Addie Brown\u2019s Journey",
        arcgisDescription:
          "Use the interactive map above to trace Addie\u2019s movements through Hartford\u2019s wards. Each point represents a documented residence or place of employment mentioned in her correspondence, illustrating the spatial constraints of the 19th-century domestic labor market.",

        // --- Article Content Section 2 ---
        additionalContent: [
          'Her story is not just one of struggle, but of a vibrant social network. Her relationship with the Primus family and other members of the Black elite and working class in Hartford created a safety net that allowed her to navigate a system designed to keep her stationary.',
          "The letters between Addie and Rebecca provide an unparalleled intimate look into the emotional world of Black women during Reconstruction. They reveal how domestic space and mobility were sites of both surveillance and resistance. Through this digital mapping project, we honor Addie\u2019s footsteps as she walked the streets of Hartford, claiming space in a city that often tried to render her invisible.",
        ],
        relatedThemes: [
          '#19thCenturyHartford',
          '#BlackHistory',
          '#DomesticLabor',
          '#Migration',
          '#WomenInHistory',
        ],
      })
      setLoading(false)
    }

    fetchStory()
  }, [storyId])

  if (loading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-slate-200 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="py-12">
        <div className="container-custom text-center">
          <h1 className="font-display text-2xl font-bold mb-4">
            Story Not Found
          </h1>
          <Link to="/stories" className="text-sky hover:underline">
            Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-sky overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 opacity-10 sketch-bg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Portrait Image */}
            {/* TODO: Portrait image URL from Google Sheets */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                <div className="absolute -top-4 -left-4 w-full h-full bg-primary rounded-3xl rotate-3 opacity-50"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
                  <img
                    alt={`${story.title} Profile`}
                    className="w-full h-full object-cover grayscale contrast-125"
                    src={story.portraitImage}
                  />
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="w-full lg:w-2/3 text-center lg:text-left text-white">
              {/* Breadcrumb */}
              <nav className="flex mb-4 justify-center lg:justify-start">
                <ol className="flex items-center space-x-2 text-white/80 text-sm">
                  <li>
                    <Link className="hover:text-white" to="/stories">
                      Stories
                    </Link>
                  </li>
                  <li className="material-symbols-outlined text-xs">
                    chevron_right
                  </li>
                  {/* TODO: Title from Google Sheets */}
                  <li>{story.title}</li>
                </ol>
              </nav>

              {/* TODO: Title from Google Sheets */}
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
                {story.title}
              </h1>

              {/* TODO: Subtitle/bio from Google Sheets */}
              <p className="text-xl text-white/90 font-light max-w-2xl leading-relaxed">
                {story.subtitle}
              </p>

              {/* TODO: Date range and tags from Google Sheets */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="px-4 py-1.5 bg-primary text-slate-900 rounded-full text-sm font-semibold">
                  {story.dates}
                </span>
                {story.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold ${tag.className}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article */}
          <article className="lg:col-span-8">
            {/* TODO: All article body content from Google Sheets */}
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-sky prose-p:leading-relaxed prose-p:text-slate-700">
              <h2 className="text-3xl font-display mb-6">
                {story.mainHeading}
              </h2>
              {story.mainContent.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              {/* TODO: Blockquote from Google Sheets */}
              <blockquote className="border-l-4 border-primary bg-primary/5 p-6 italic my-8 rounded-r-lg">
                {story.blockquote}
              </blockquote>

              <h3 className="text-2xl font-display mb-4">
                {story.subHeading}
              </h3>
              <p>{story.subContent}</p>

              {/* Context Image Card */}
              {/* TODO: Context image, title, and caption from Google Sheets */}
              <div className="my-8 p-6 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3">
                  <img
                    alt={story.contextImageAlt}
                    className="rounded-xl shadow-lg border-2 border-white w-full"
                    src={story.contextImage}
                  />
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-xl font-display text-mint mb-2">
                    {story.contextTitle}
                  </h4>
                  <p className="text-sm italic">{story.contextCaption}</p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Related Maps */}
            {/* TODO: Related maps from Google Sheets */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <span className="material-symbols-outlined text-primary">
                  map
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Related Maps
                </h2>
              </div>
              <div className="space-y-8">
                {story.relatedMaps.map((relMap, i) => (
                  <Link
                    key={i}
                    to="/maps"
                    className="group cursor-pointer block"
                  >
                    <div className="aspect-[4/3] rounded overflow-hidden mb-3 border border-slate-100">
                      <img
                        alt={relMap.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={relMap.image}
                      />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900 group-hover:text-sky transition-colors">
                      {relMap.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-slate-500 mt-1">
                      {relMap.description}
                    </p>
                  </Link>
                ))}
              </div>
              <Link
                to="/maps/atlas"
                className="block w-full mt-8 py-3 px-4 border-2 border-primary text-slate-800 rounded text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all text-center"
              >
                Explore Atlas
              </Link>
            </div>

            {/* Related Stories */}
            {/* TODO: Related stories from Google Sheets */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <span className="material-symbols-outlined text-mint">
                  auto_stories
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Related Stories
                </h2>
              </div>
              <div className="space-y-3">
                {story.relatedStories.map((relStory) => (
                  <Link
                    key={relStory.id}
                    to={`/stories/${relStory.id}`}
                    className="block p-4 rounded-lg bg-slate-50 hover:bg-mint/5 transition-colors border border-slate-100 hover:border-mint/30"
                  >
                    <h3 className="text-sm font-bold text-sky mb-1">
                      {relStory.title}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {relStory.description}
                    </p>
                  </Link>
                ))}
              </div>
              <Link
                to="/stories"
                className="block w-full mt-6 py-3 px-4 bg-primary/10 text-slate-800 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-primary/20 transition-all text-center"
              >
                Read All Stories
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* ArcGIS Story Map Section */}
      {/* TODO: ArcGIS iframe URL and descriptive text from Google Sheets */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-display font-bold mb-8 text-sky flex items-center justify-center gap-4">
            <span className="material-symbols-outlined text-5xl">
              map_search
            </span>
            {story.arcgisTitle}
          </h3>
          <div className="arcgis-full-width rounded-3xl shadow-2xl overflow-hidden relative border-8 border-white">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100">
              <span className="material-symbols-outlined text-8xl text-slate-300 mb-6">
                explore
              </span>
              <p className="text-2xl text-slate-500 font-medium">
                ArcGIS Story Map Integration
              </p>
              <p className="text-sm text-slate-400 mt-2 uppercase tracking-[0.2em]">
                Interactive Spatial Narrative Component
              </p>
            </div>
            {/* TODO: Replace src with ArcGIS Story Map URL from Google Sheets */}
            <iframe
              className="absolute inset-0 z-10 w-full h-full bg-transparent"
              frameBorder="0"
              scrolling="no"
              src={story.arcgisUrl}
              title={story.arcgisTitle}
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <p className="mt-8 text-lg text-slate-600 italic max-w-4xl leading-relaxed mx-auto text-center">
            {story.arcgisDescription}
          </p>
        </div>
      </section>

    </>
  )
}

export default StoryDetail
