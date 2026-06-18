import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  // Key the page subtree by pathname so navigating remounts it and the
  // `.page-enter` entrance animation replays on every route change.
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
