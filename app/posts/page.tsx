import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'All blog posts from LACORTE Systems',
}

export default async function PostsPage() {
  const allPosts = await getAllPosts()

  return (
    <>
      <h2>All Posts</h2>

      {allPosts.length > 0 ? (
        allPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </>
  )
}
