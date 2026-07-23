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

export function postsCollectionJsonLd(posts: PostData[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Posts',
    description:
      'Full post archive — every engineering note, portfolio write-up, and rant published on this blog.',
    url: absoluteUrl('/posts'),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/posts/${post.slug}`),
        name: post.title,
      })),
    },
  }
}
