import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#519EC8] text-white py-8 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-6">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <img
                alt="Hartford Bound Logo"
                className="h-10 w-auto brightness-0 invert"
                src={`${import.meta.env.BASE_URL}HB_LOGO_UPDATE.png`}
              />
              <span className="font-display text-2xl font-bold">Hartford Bound</span>
            </div>
            <p className="text-white/70 max-w-md leading-relaxed text-sm">
              A digital humanities collaboration dedicated to uncovering and visualizing the complex histories of migration and race in Hartford, Connecticut.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-bold mb-4 text-primary">Explore</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link to="/stories" className="hover:text-white transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link to="/maps" className="hover:text-white transition-colors">
                  Maps
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-white transition-colors">
                  Timelines
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-white transition-colors">
                  Archive
                </Link>
              </li>
              <li>
                <Link to="/exhibits" className="hover:text-white transition-colors">
                  Exhibits
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-bold mb-4 text-primary">Connect</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About the Project
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Partners
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-white/20 text-white/50 text-sm flex flex-col md:flex-row justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Hartford Bound. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
