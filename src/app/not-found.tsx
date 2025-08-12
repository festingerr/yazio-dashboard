import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8 max-w-md">
        <div className="text-[#648772] mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#111714] mb-2">404 - Page Not Found</h2>
        <p className="text-[#648772] mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#648772] hover:bg-[#111714] text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
