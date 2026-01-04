import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const commentsDirectory = path.join(process.cwd(), 'data', 'comments')

if (!fs.existsSync(commentsDirectory)) {
  fs.mkdirSync(commentsDirectory, { recursive: true })
}

interface Comment {
  id: string
  postSlug: string
  name: string
  comment: string
  date: string
}

function getCommentsFilePath(postSlug: string): string {
  return path.join(commentsDirectory, `${postSlug}.json`)
}

function readComments(postSlug: string): Comment[] {
  const filePath = getCommentsFilePath(postSlug)
  if (!fs.existsSync(filePath)) {
    return []
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading comments:', error)
    return []
  }
}

function writeComments(postSlug: string, comments: Comment[]): void {
  const filePath = getCommentsFilePath(postSlug)
  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2))
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const postSlug = searchParams.get('postSlug')

  if (!postSlug) {
    return NextResponse.json(
      { error: 'postSlug is required' },
      { status: 400 }
    )
  }

  const comments = readComments(postSlug)
  return NextResponse.json(comments)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postSlug, name, comment } = body

    if (!postSlug || !name || !comment) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const comments = readComments(postSlug)
    const newComment: Comment = {
      id: Date.now().toString(),
      postSlug,
      name,
      comment,
      date: new Date().toISOString(),
    }

    comments.push(newComment)
    writeComments(postSlug, comments)

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error('Error processing comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

