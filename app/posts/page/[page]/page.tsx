import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

interface PageProps {
  params: {
    page: string
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pageNumber = parseInt(params.page, 10)
  const title = `All Posts – Page ${pageNumber}`
  const description = `Page ${pageNumber} — more engineering notes, portfolio projects, and random rants.`

  return {
    title,
    description,
    alternates: {
      canonical: `/posts/page/${pageNumber}`,
    },
    // Paginated archives are thinner duplicates of /posts — keep crawlable but deprioritize.
    robots: pageNumber > 1 ? { index: true, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: `/posts/page/${pageNumber}`,
    },
  }
}

export default async function PostsPagePaginated({ params }: PageProps) {
  const pageNumber = parseInt(params.page, 10)

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }

  // Page 1 lives at /posts — avoid a duplicate URL.
  if (pageNumber === 1) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  if (pageNumber > totalPages) {
    notFound()
  }

  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const posts = allPosts.slice(startIndex, endIndex)

  return (
    <>
      <h2>All Posts - Page {pageNumber}</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))
      ) : (
        <p>No posts found.</p>
      )}

      <nav className="pagination">
        {pageNumber > 1 && (
          <Link href={pageNumber === 2 ? '/posts' : `/posts/page/${pageNumber - 1}`}>
            ← Previous
          </Link>
        )}
        {pageNumber < totalPages && (
          <Link href={`/posts/page/${pageNumber + 1}`}>Next →</Link>
        )}
      </nav>
    </>
  )
}
