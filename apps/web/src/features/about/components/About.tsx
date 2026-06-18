// TODO add city scape to background

export function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-mint/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            ABOUT <span className="text-sky">HARTFORD BOUND</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mx-auto mb-10 rounded-full" />
          <p className="text-xl text-slate-600 leading-relaxed font-light">
            Hartford Bound is a digital humanities project dedicated to mapping the intricate stories
            of{' '}
            <span className="font-medium text-slate-800">race, migration, and mobility</span> within
            Hartford, Connecticut. By integrating spatial data with historical narratives, we aim to
            visualize how policy, community, and movement have shaped the urban landscape over
            generations, providing a platform for critical inquiry and public scholarship.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Team</h2>
          <div className="w-16 h-1 bg-mint mx-auto mb-12 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Co-PI 1 */}
            <div className="bg-white p-8 rounded-xl border border-mint/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center md:items-start md:flex-row md:space-x-6">
                <div>
                  <h3 className="text-2xl font-bold text-sky mb-1">Dr. Elena Rodriguez</h3>
                  <p className="text-mint font-medium mb-4">Co-Principal Investigator</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A historian specializing in 20th-century urban migration patterns, Dr. Rodriguez
                    has spent over a decade documenting the diaspora communities of New England. Her
                    research focuses on the intersection of housing policy and racial identity in
                    mid-sized industrial cities.
                  </p>
                </div>
              </div>
            </div>
            {/* Co-PI 2 */}
            <div className="bg-white p-8 rounded-xl border border-mint/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center md:items-start md:flex-row md:space-x-6">
                <div>
                  <h3 className="text-2xl font-bold text-sky mb-1">Dr. Marcus Thorne</h3>
                  <p className="text-mint font-medium mb-4">Co-Principal Investigator</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Dr. Thorne is a Digital Humanities expert with a focus on Geographic Information
                    Systems (GIS). He leads the technical mapping and spatial analysis components of
                    Hartford Bound, ensuring historical data is translated into accessible visual
                    media for public engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-6 bg-white-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Partners &amp; Collaborators</h2>
          <div className="w-16 h-1 bg-sky mx-auto mb-12 rounded-full" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: 'account_balance', label: 'University Library' },
              { icon: 'history_edu', label: 'Historical Society' },
              { icon: 'public', label: 'GIS Foundation' },
              { icon: 'museum', label: 'City Heritage Council' },
            ].map((partner) => (
              <div
                key={partner.label}
                className="group bg-white p-6 rounded-lg border border-slate-200 flex items-center justify-center transition-all hover:border-sky/50 grayscale hover:grayscale-0"
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-sky transition-colors">
                    {partner.icon}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-tighter text-slate-500 group-hover:text-slate-900">
                    {partner.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
