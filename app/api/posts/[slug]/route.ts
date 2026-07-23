import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/posts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404, headers: corsHeaders }
      )
    }

    return NextResponse.json(post, { headers: corsHeaders })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}
