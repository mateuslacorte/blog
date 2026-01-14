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
  // Add resource hints for performance
  alternates: {
    canonical: 'https://www.lacorte.dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${vt323.variable} ${vt323.className} no-animations`}>
      <head>
        {/* Critical CSS - Inline for immediate rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box}
            html,body{background:#383838;color:#0d0;font-size:1.4em;font-family:var(--font-vt323,'VT323',Courier,monospace);height:100%;margin:0;padding:0}
            .wrapper{animation:none;height:100%;margin:0;overflow:visible;padding:0}
            .content{animation:none;height:auto;overflow:visible;padding:40px;position:relative;width:95%}
            html.no-animations .wrapper:not(.animate),html.no-animations .content:not(.animate){animation:none!important;height:auto!important;overflow:visible!important}
          `
        }} />
      </head>
      <body>
        <Script
          id="resource-hints"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var d = document;
                var head = d.head || d.getElementsByTagName('head')[0];
                
                // DNS Prefetch
                ['https://www.lacorte.dev', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(function(url) {
                  var link = d.createElement('link');
                  link.rel = 'dns-prefetch';
                  link.href = url;
                  head.appendChild(link);
                });
                
                // Preconnect
                ['https://www.lacorte.dev', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(function(url) {
                  var link = d.createElement('link');
                  link.rel = 'preconnect';
                  link.href = url;
                  link.crossOrigin = 'anonymous';
                  head.appendChild(link);
                });
                
                // Defer non-critical CSS loading
                // This will be handled by Next.js automatically, but we ensure
                // CSS doesn't block rendering by using preload
                function preloadCSS() {
                  var links = head.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
                  links.forEach(function(link) {
                    // Mark as non-blocking by setting media to print temporarily
                    if (!link.hasAttribute('data-deferred')) {
                      link.setAttribute('data-deferred', 'true');
                      var originalMedia = link.media || 'all';
                      link.media = 'print';
                      link.onload = function() {
                        this.media = originalMedia;
                      };
                      // Fallback
                      setTimeout(function() {
                        if (link.media === 'print') {
                          link.media = originalMedia;
                        }
                      }, 100);
                    }
                  });
                }
                
                // Defer CSS after first paint
                if (d.readyState === 'loading') {
                  d.addEventListener('DOMContentLoaded', function() {
                    setTimeout(preloadCSS, 0);
                  });
                } else {
                  setTimeout(preloadCSS, 0);
                }
              })();
            `
          }}
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

