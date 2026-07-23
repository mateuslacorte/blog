import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Want to reach me about a project, collaboration, or a random rant? Send a message.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact',
    description:
      'Want to reach me about a project, collaboration, or a random rant? Send a message.',
    url: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
