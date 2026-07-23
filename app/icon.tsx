import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a1f0a',
          color: '#33ff33',
          fontSize: 20,
          fontFamily: 'Courier New, monospace',
          fontWeight: 700,
        }}
      >
        L
      </div>
    ),
    { ...size }
  )
}
