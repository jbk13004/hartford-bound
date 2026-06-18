import { useParams, Link } from 'react-router-dom'
import { useStory } from '../hooks/useStory'

export function StoryDetail() {
  const { storyId } = useParams()
  const { story, related, isLoading, isError } = useStory(storyId ?? '')

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-4" />
            <div className="h-64 bg-slate-200 rounded mb-6" />
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !story) {
    return (
      <div className="py-12">
        <div className="container-custom text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Story Not Found</h1>
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
        <div className="absolute inset-0 opacity-10 sketch-bg" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Portrait Image */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                <div className="absolute -top-4 -left-4 w-full h-full bg-primary rounded-3xl rotate-3 opacity-50" />
                <div className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
                  <img
                    alt={`${story.title} Profile`}
                    className="w-full h-full object-cover grayscale contrast-125"
                    src={story.image}
                  />
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="w-full lg:w-2/3 text-center lg:text-left text-white">
              <nav className="flex mb-4 justify-center lg:justify-start">
                <ol className="flex items-center space-x-2 text-white/80 text-sm">
                  <li>
                    <Link className="hover:text-white" to="/stories">
                      Stories
                    </Link>
                  </li>
                  <li className="material-symbols-outlined text-xs">chevron_right</li>
                  <li>{story.title}</li>
                </ol>
              </nav>

              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
                {story.title}
              </h1>

              {story.subtitle && (
                <p className="text-xl text-white/90 font-light max-w-2xl leading-relaxed">
                  {story.subtitle}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="px-4 py-1.5 bg-primary text-slate-900 rounded-full text-sm font-semibold">
                  {story.dates}
                </span>
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/20 text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article */}
          <article className="lg:col-span-8">
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-sky prose-p:leading-relaxed prose-p:text-slate-700">
              {story.body.length > 0 ? (
                story.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)
              ) : (
                <p>{story.excerpt}</p>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <span className="material-symbols-outlined text-mint">auto_stories</span>
                <h2 className="text-lg font-bold text-slate-900">Related Stories</h2>
              </div>
              <div className="space-y-3">
                {related.map((relStory) => (
                  <Link
                    key={relStory.id}
                    to={`/stories/${relStory.id}`}
                    className="block p-4 rounded-lg bg-slate-50 hover:bg-mint/5 transition-colors border border-slate-100 hover:border-mint/30"
                  >
                    <h3 className="text-sm font-bold text-sky mb-1">{relStory.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {relStory.excerpt}
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
    </>
  )
}
