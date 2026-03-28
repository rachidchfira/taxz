import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  fullName: string
  email: string
  phone?: string
  nationality?: string
  service?: string
  message?: string
  consent: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.fullName || !body.fullName.trim()) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      )
    }

    if (!body.email || !body.email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!body.consent) {
      return NextResponse.json(
        { error: 'You must agree to the privacy policy' },
        { status: 400 }
      )
    }

    // Get service label from value
    const serviceLabels: Record<string, string> = {
      'pit-finalization': 'PIT Finalization',
      'tax-residency': 'Tax Residency Assessment',
      'leaving-vietnam': 'Leaving Vietnam',
      'multi-employer': 'Multi-Employer',
      'tax-refund': 'Tax Refund',
      'consultation': 'Consultation',
      'not-sure': 'Not Sure',
    }

    // Log the contact form submission (in production, this would be saved to database)
    console.log('Contact Form Submission:', {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone || 'Not provided',
      nationality: body.nationality || 'Not provided',
      service: body.service ? serviceLabels[body.service] : 'Not specified',
      message: body.message || 'No message provided',
      submittedAt: new Date().toISOString(),
    })

    // In a production environment, you would:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    // 4. Possibly integrate with CRM

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your inquiry. We will contact you within 24 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
