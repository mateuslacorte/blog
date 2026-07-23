import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'
import fs from 'fs'
import path from 'path'

const POSTS_PER_PAGE = 5

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL
  const postsDirectory = path.join(process.cwd(), 'content', 'posts')

  const posts = await getAllPosts()

  const postUrls = posts.map((post) => {
    const filePath = path.join(postsDirectory, `${post.slug}.md`)
    let lastModified = post.date ? new Date(post.date) : new Date()

    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        lastModified = stats.mtime
      }
    } catch {
      // keep post.date / now fallback
    }

    return {
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  })

  const newestPostDate =
    posts.length > 0 && posts[0].date ? new Date(posts[0].date) : new Date()

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const paginationUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/posts`,
      lastModified: newestPostDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  for (let page = 2; page <= totalPages; page++) {
    paginationUrls.push({
      url: `${baseUrl}/posts/page/${page}`,
      lastModified: newestPostDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    })
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: newestPostDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: newestPostDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: newestPostDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: newestPostDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/lore`,
      lastModified: newestPostDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  return [...staticPages, ...paginationUrls, ...postUrls]
}
