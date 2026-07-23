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
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All required fields are required' },
        { status: 400, headers: corsHeaders }
      )
    }

    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
    })

    // TODO: Integrar com serviço de email
    // Exemplo com Resend:
    // await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: 'your-email@example.com',
    //   subject: subject,
    //   html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
    // })

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}

