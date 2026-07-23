import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/posts'
import { SITE_NAME } from '@/lib/site'

export const alt = SITE_NAME
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

interface Props {
  params: { slug: string }
}

export default async function PostOpenGraphImage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  const title = post?.title || SITE_NAME
  const excerpt = post?.excerpt || 'Another engineering note / random rant'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: '#0a1f0a',
          color: '#33ff33',
          fontFamily: 'Courier New, monospace',
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 3, opacity: 0.7 }}>
          {SITE_NAME}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            maxWidth: 1040,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, opacity: 0.85, lineHeight: 1.35 }}>
            {excerpt.length > 160 ? `${excerpt.slice(0, 157)}...` : excerpt}
          </div>
        </div>
        <div style={{ fontSize: 22, opacity: 0.65 }}>{SITE_NAME}</div>
      </div>
    ),
    { ...size }
  )
}
