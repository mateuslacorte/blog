import type { Metadata } from 'next'
import Script from 'next/script'
import { VT323 } from 'next/font/google'
import '../styles/globals.css'
import Layout from '@/components/Layout'
import AnimationController from '@/components/AnimationController'
import { websiteJsonLd } from '@/lib/seo'
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteOgImage,
  absoluteUrl,
} from '@/lib/site'

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'blog',
    'engineering notes',
    'portfolio',
    'NestJS',
    'Node.js',
    'TypeScript',
    'backend',
    'networking',
    'Mateus',
    'Lacorte',
  ],
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  alternates: {
    canonical: absoluteUrl('/'),
    types: {
      'application/rss+xml': absoluteUrl('/feed.xml'),
    },
  },
  icons: {
    icon: DEFAULT_OG_IMAGE_PATH,
    apple: DEFAULT_OG_IMAGE_PATH,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: absoluteOgImage(),
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [absoluteOgImage()],
  },
  robots: {
    index: true,
    follow: true,
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
  const jsonLd = websiteJsonLd()

  return (
    <html lang="en" className={`${vt323.variable} ${vt323.className} no-animations`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="disable-animations-inline"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Store reference to injected style for removal later
                var injectedStyle = null;
                
                // Ensure content is visible immediately
                injectedStyle = document.createElement('style');
                injectedStyle.id = 'no-animations-style';
                injectedStyle.textContent = '.wrapper:not(.animate), .content:not(.animate) { animation: none !important; height: auto !important; overflow: visible !important; }';
                document.head.appendChild(injectedStyle);
                
                function enableAnimations() {
                  // Wait for content to render, then enable animations
                  requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                      setTimeout(function() {
                        var wrapper = document.querySelector('.wrapper');
                        var content = document.querySelector('.content');
                        
                        // Remove injected style
                        var styleToRemove = document.getElementById('no-animations-style');
                        if (styleToRemove) {
                          styleToRemove.remove();
                        }
                        
                        if (wrapper) {
                          wrapper.style.height = '';
                          wrapper.style.overflow = '';
                          wrapper.style.animation = '';
                          wrapper.classList.add('animate');
                          // Restore scroll after animation completes
                          wrapper.addEventListener('animationend', function() {
                            wrapper.style.overflow = '';
                            wrapper.classList.remove('animate');
                          }, { once: true });
                        }
                        if (content) {
                          content.style.height = '';
                          content.style.overflow = '';
                          content.style.animation = '';
                          content.classList.add('animate');
                          // Restore scroll after animation completes
                          content.addEventListener('animationend', function() {
                            content.style.overflow = '';
                            content.classList.remove('animate');
                          }, { once: true });
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
