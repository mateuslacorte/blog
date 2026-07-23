import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'

export const runtime = 'edge'

export const alt = SITE_NAME
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '72px',
          background: '#0a1f0a',
          color: '#33ff33',
          fontFamily: 'Courier New, monospace',
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            opacity: 0.75,
            marginBottom: 24,
          }}
        >
          {'>'} BOOT SEQUENCE OK
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            opacity: 0.9,
            maxWidth: 1000,
            lineHeight: 1.35,
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size }
  )
}
