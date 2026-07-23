import { getPostBySlug, getAllPostSlugs } from '@/lib/posts'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Comments from '@/components/Comments'
import type { Metadata } from 'next'
import { blogPostingJsonLd } from '@/lib/seo'
import {
  SITE_AUTHOR,
  SITE_NAME,
  absoluteUrl,
} from '@/lib/site'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    }
  }

  const url = absoluteUrl(`/posts/${post.slug}`)
  const description =
    post.excerpt ||
    `${post.title} — a post on ${SITE_NAME}.`
  const ogImage = absoluteUrl(`/posts/${post.slug}/opengraph-image`)

  return {
    title: post.title,
    description,
    keywords: post.tags,
    authors: [{ name: SITE_AUTHOR }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url,
      siteName: SITE_NAME,
      publishedTime: post.date,
      modifiedTime: post.date,
      tags: post.tags,
      authors: [SITE_AUTHOR],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = post.date
    ? format(new Date(post.date), 'MMMM dd, yyyy')
    : ''

  const jsonLd = blogPostingJsonLd(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p>
        <Link href="/posts">← All posts</Link>
      </p>
      <h1>{post.title}</h1>
      {formattedDate && <p>{formattedDate}</p>}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {post.tags && post.tags.length > 0 && (
        <p>
          Tags:{' '}
          {post.tags.map((tag, index) => (
            <span key={tag}>
              [ {tag} ]{index < post.tags.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      )}

      <h3>Comments</h3>
      <Comments postSlug={params.slug} />
    </>
  )
}
