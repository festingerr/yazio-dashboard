import type { Metadata } from 'next'
import '@/app/styles/index.css'

export const metadata: Metadata = {
  title: 'NutriTrack - Nutrition Dashboard',
  description: 'Professional nutrition tracking dashboard for Yazio data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
