import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'
import { postsCollectionJsonLd } from '@/lib/seo'

const POSTS_PER_PAGE = 5

export const metadata: Metadata = {
  title: 'All Posts',
  description:
    'Full post archive — every engineering note, portfolio write-up, and rant published on this blog.',
  alternates: {
    canonical: '/posts',
  },
  openGraph: {
    title: 'All Posts',
    description:
      'Full post archive — every engineering note, portfolio write-up, and rant published on this blog.',
    url: '/posts',
  },
}

export default async function PostsPage() {
  const allPosts = await getAllPosts()
  const posts = allPosts.slice(0, POSTS_PER_PAGE)
  const hasMore = allPosts.length > POSTS_PER_PAGE
  const jsonLd = postsCollectionJsonLd(allPosts)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>All Posts</h1>
      <p>
        Complete archive of posts on this blog. Browse by date or jump in from
        the latest entry.
      </p>

      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))
      ) : (
        <p>No posts found.</p>
      )}

      {hasMore && (
        <nav className="pagination">
          <Link href="/posts/page/2">Next →</Link>
        </nav>
      )}
    </>
  )
}
