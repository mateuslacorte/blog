import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteOgImage,
  absoluteUrl,
} from '@/lib/site'
import type { PostData } from '@/lib/markdown'

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_AUTHOR,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteOgImage(),
      },
    },
  }
}

export function blogPostingJsonLd(post: PostData) {
  const url = absoluteUrl(`/posts/${post.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || SITE_DESCRIPTION,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_AUTHOR,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteOgImage(),
      },
    },
    keywords: post.tags?.join(', '),
    image: [absoluteUrl(`/posts/${post.slug}/opengraph-image`)],
  }
}
