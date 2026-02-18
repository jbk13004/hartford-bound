import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="py-20">
      <div className="container-custom text-center">
        <h1 className="font-display text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-sky text-white font-medium rounded hover:bg-sky/90 transition-colors"
        >
          <span className="material-symbols-outlined">home</span>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
