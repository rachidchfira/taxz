'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ClipboardCheck,
  Calculator,
  FileSearch,
  Send,
  ArrowRight,
  Clock,
  ChevronRight
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Submit Your Documents',
    description: 'Upload your payroll documents, withholding certificates, and residency evidence through our secure portal.',
    details: [
      'Passport & visa copies',
      'Employment contracts',
      'Payslips & withholding certificates',
    ],
  },
  {
    number: '02',
    icon: Calculator,
    title: 'We Find Hidden Deductions',
    description: 'Our experts review your data, determine residency status, and identify every deduction you qualify for — averaging 3.2M VND extra per client.',
    details: [
      'Residency determination',
      'Income aggregation',
      'Deduction optimization',
    ],
  },
  {
    number: '03',
    icon: FileSearch,
    title: 'Review & Approve',
    description: 'Receive a detailed breakdown of your tax position with clear explanations and official source references.',
    details: [
      'Transparent calculations',
      'Legal basis citations',
      'Refund/opportunity identification',
    ],
  },
  {
    number: '04',
    icon: Send,
    title: 'We File Your Return',
    description: 'Upon your approval, we prepare and submit your finalization return to the Vietnamese tax authorities.',
    details: [
      'Form preparation',
      'eTax or manual submission',
      'Receipt & confirmation',
    ],
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <Badge variant="outline" className="mb-4">
            Simple 4-Step Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Documents to Refund — 8 Days
          </h2>
          <p className="text-lg text-muted-foreground">
            You upload 3 documents. We handle all calculations, filings, and communications with the tax authority.
          </p>
        </div>

        {/* Timeline badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#40E0D0]/10 border border-[#40E0D0]/20 text-sm text-[#40E0D0]">
            <Clock className="w-4 h-4" />
            Average 8 days from documents to filed return
          </div>
        </div>

        {/* Security Callout */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="text-green-500">🔒</span> 256-bit SSL encryption</span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Documents deleted after filing</span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1"><span className="text-green-500">✓</span> PDP Decree compliant</span>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Step Card */}
                <div className={`bg-card rounded-xl border border-border/50 p-6 h-full hover:shadow-lg transition-shadow${step.number === '02' ? ' ring-2 ring-[#40E0D0]/30 shadow-lg shadow-[#40E0D0]/10' : ''}`}>
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {step.description}
                  </p>

                  {step.number === '02' && (
                    <div className="mt-3 px-3 py-2 rounded-lg bg-[#40E0D0]/10 border border-[#40E0D0]/20">
                      <p className="text-xs font-semibold text-[#40E0D0]">Avg. 3.2M VND extra recovered</p>
                      <p className="text-xs text-muted-foreground">vs. self-filing or employer filing</p>
                    </div>
                  )}

                  {/* Details */}
                  <ul className="space-y-1.5">
                    {step.details.map((detail) => (
                      <li key={detail} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow (between cards) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 h-8 bg-background border border-border rounded-full items-center justify-center -translate-y-1/2 z-20">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4 text-sm">You provide 3 documents — we handle the rest.</p>
          <Button asChild className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white px-8">
            <Link href="/contact">
              Upload Documents & Get Free Estimate <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
