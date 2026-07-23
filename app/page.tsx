import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

const RECENT_POSTS = 3

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to Lacorte\'s blog — recent engineering notes, portfolio projects, and random rants about development and networking.',
  alternates: {
    canonical: '/',
  },
}

export default async function Home() {
  const allPosts = await getAllPosts()
  const posts = allPosts.slice(0, RECENT_POSTS)
  const hasMore = allPosts.length > RECENT_POSTS

  return (
    <>
      <h1>Recent Posts</h1>
      <p>
        Latest notes from the terminal. For the full archive, head to{' '}
        <Link href="/posts">All Posts</Link>.
      </p>

      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}

      {hasMore && (
        <nav className="pagination">
          <Link href="/posts">View all posts →</Link>
        </nav>
      )}
    </>
  )
}
