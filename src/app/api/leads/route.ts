import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  service: z.string().min(1),
  message: z.string().optional(),
  source: z.enum(['calculator', 'consultation_form', 'knowledge_base', 'homepage']).optional(),
  calculatorData: z.string().optional(), // JSON string of calculator results
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = LeadSchema.parse(body)

    // Create lead in database
    const lead = await db.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.nationality,
        interest: data.service,
        notes: data.message,
        source: data.source || 'consultation_form',
        calculatorData: data.calculatorData,
        status: 'new',
      },
    })

    // In production, you would also:
    // 1. Send notification email to admin
    // 2. Send confirmation email to lead
    // 3. Add to CRM system
    // 4. Log audit event

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Thank you for your inquiry. We will contact you within 24 hours.',
    })
  } catch (error) {
    console.error('Lead capture error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Admin endpoint to list leads (would be protected in production)
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
