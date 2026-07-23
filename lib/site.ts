/** Canonical site origin — override with NEXT_PUBLIC_SITE_URL in deploy. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lacorte.dev'
).replace(/\/$/, '')

export const SITE_NAME = 'Lacorte\'s blog'
export const SITE_TAGLINE =
  'Engineering notes, portfolio projects, and random rants — Development, networking, and more.'

export const SITE_DESCRIPTION =
  'My engineering notes, portfolio projects, and random rants — development, networking, and whatever else I ship or break along the way.'

export const SITE_AUTHOR = 'Mateus M. Côrtes'

/** Default social / Open Graph image (absolute path under /public). */
export const DEFAULT_OG_IMAGE_PATH = '/assets/images/logo.webp'

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') {
    return SITE_URL
  }
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function absoluteOgImage(path: string = DEFAULT_OG_IMAGE_PATH): string {
  return absoluteUrl(path)
}
