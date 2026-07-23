import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400, headers: corsHeaders }
      )
    }

    console.log('Newsletter subscription:', email)

    // TODO: Integrar com serviço de email marketing
    // Exemplo com Mailchimp, ConvertKit, etc.

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('Error processing newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}

