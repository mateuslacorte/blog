import PostCard from '@/components/PostCard'
import { getPostsByTag } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Portfolio projects and case studies — backends, SDKs, networking tools, and other things I actually shipped.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio',
    description:
      'Portfolio projects and case studies — backends, SDKs, networking tools, and other things I actually shipped.',
    url: '/portfolio',
  },
}

export default async function PortfolioPage() {
  const portfolioPosts = await getPostsByTag('portfolio')

  return (
    <>
      <h2>Portfolio & Case Studies</h2>

      {portfolioPosts.length > 0 ? (
        portfolioPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))
      ) : (
        <p>No portfolio projects found.</p>
      )}
    </>
  )
}
