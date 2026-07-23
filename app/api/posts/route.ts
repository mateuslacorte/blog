import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const tag = searchParams.get('tag')
    const page = Math.max(1, Number(searchParams.get('page') || '1') || 1)
    const limit = Math.min(
      50,
      Math.max(1, Number(searchParams.get('limit') || '5') || 5)
    )

    let posts = await getAllPosts()

    if (tag) {
      posts = posts.filter((post) => post.tags.includes(tag))
    }

    const total = posts.length
    const start = (page - 1) * limit
    const items = posts.slice(start, start + limit).map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      tags: post.tags,
    }))

    return NextResponse.json(
      {
        items,
        total,
        page,
        limit,
        hasMore: start + limit < total,
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}
