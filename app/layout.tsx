import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'
import '../styles/globals.css'
import Layout from '@/components/Layout'

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['Courier', 'monospace'],
  adjustFontFallback: true,
  variable: '--font-vt323',
})

export const metadata: Metadata = {
  title: {
    default: 'LACORTE Systems',
    template: '%s | LACORTE Systems',
  },
  description: 'Fallout Terminal Inspired Blog - LACORTE Systems (tm)',
  keywords: ['blog', 'fallout', 'terminal', 'react', 'next.js'],
  authors: [{ name: 'LACORTE Industries' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.lacorte.dev',
    siteName: 'LACORTE Systems',
    title: 'LACORTE Systems',
    description: 'Fallout Terminal Inspired Blog',
  },
  twitter: {
    card: 'summary',
    title: 'LACORTE Systems',
    description: 'Fallout Terminal Inspired Blog',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${vt323.variable} ${vt323.className}`}>
      <body>
        <div className="overlay"></div>
        <div className="scanline"></div>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

