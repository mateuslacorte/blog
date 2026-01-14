import type { Metadata } from 'next'
import Script from 'next/script'
import { VT323 } from 'next/font/google'
import '../styles/globals.css'
import Layout from '@/components/Layout'
import AnimationController from '@/components/AnimationController'

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
  other: {
    'disable-animations': 'true',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${vt323.variable} ${vt323.className} no-animations`}>
      <body>
        <Script
          id="disable-animations-inline"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Ensure content is visible immediately
                var style = document.createElement('style');
                style.textContent = '.wrapper, .content { animation: none !important; height: auto !important; overflow: visible !important; }';
                document.head.appendChild(style);
                
                function enableAnimations() {
                  // Wait for content to render, then enable animations
                  requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                      setTimeout(function() {
                        var wrapper = document.querySelector('.wrapper');
                        var content = document.querySelector('.content');
                        if (wrapper) {
                          wrapper.style.height = '';
                          wrapper.style.overflow = '';
                          wrapper.classList.add('animate');
                        }
                        if (content) {
                          content.style.height = '';
                          content.style.overflow = '';
                          content.classList.add('animate');
                        }
                        document.documentElement.classList.remove('no-animations');
                      }, 0.5);
                    });
                  });
                }
                
                if (document.readyState === 'complete') {
                  enableAnimations();
                } else if (document.readyState === 'interactive') {
                  enableAnimations();
                } else {
                  document.addEventListener('DOMContentLoaded', enableAnimations, { once: true });
                  window.addEventListener('load', enableAnimations, { once: true });
                }
              })();
            `,
          }}
        />
        <AnimationController />
        <div className="overlay"></div>
        <div className="scanline"></div>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

