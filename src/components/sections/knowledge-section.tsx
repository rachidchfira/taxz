'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Users, 
  Shield,
  Calculator,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

const knowledgeCategories = [
  {
    icon: Users,
    title: 'Tax Residency',
    count: 5,
    description: 'Understanding the 183-day rule and regular residence',
  },
  {
    icon: Calculator,
    title: 'Tax Rates & Brackets',
    count: 4,
    description: 'Progressive rates for residents, flat rates for non-residents',
  },
  {
    icon: Shield,
    title: 'Deductions',
    count: 6,
    description: 'Family circumstance deductions and allowances',
  },
  {
    icon: FileText,
    title: 'Filing & Forms',
    count: 8,
    description: 'Official forms, deadlines, and submission procedures',
  },
]

const faqs = [
  {
    question: 'How do I know if I am a tax resident in Vietnam?',
    answer: 'You are considered a tax resident if you meet either: (1) 183 days or more in Vietnam within a calendar year or 12 consecutive months from first arrival, OR (2) have "regular residence" in Vietnam (permanent residence or rented house under a lease). Residents are taxed on worldwide income at progressive rates; non-residents are taxed only on Vietnam-source income at 20% flat rate.',
    source: 'PIT Law (Consolidated)',
  },
  {
    question: 'What are the family deduction amounts for 2025 and 2026?',
    answer: 'For tax period 2025: taxpayer deduction is 11,000,000 VND/month, dependant deduction is 4,400,000 VND/month. From tax period 2026 onwards: taxpayer deduction increases to 15,500,000 VND/month, dependant deduction increases to 6,200,000 VND/month. These amounts are per the National Assembly Standing Committee resolution.',
    source: 'Tax Dept. Guidance Letter',
  },
  {
    question: 'Do I need to finalize PIT if my employer already withholds tax?',
    answer: 'Yes, finalization is often still required. If you worked for multiple employers, had changes in deductions, or your actual tax liability differs from withholding, you must file a finalization return. Single-employer cases may be eligible for employer-authorized finalization under certain conditions.',
    source: 'Circular 111/2013/TT-BTC',
  },
  {
    question: 'I am leaving Vietnam permanently. Do I need to finalize before leaving?',
    answer: 'Yes. Resident foreigners who are leaving Vietnam must finalize their PIT before departure. This is a mandatory requirement. The finalization should cover income from the beginning of the tax year until your departure date.',
    source: 'Circular 111/2013/TT-BTC',
  },
  {
    question: 'Are foreigners required to pay social insurance in Vietnam?',
    answer: 'Foreign employees with fixed-term labor contracts of 12 months or more are subject to compulsory social insurance, unless exempted (intra-company transferee, already at retirement age at signing, or treaty override). Employee contribution is 8% for retirement/death fund. Health insurance also applies under similar conditions.',
    source: 'Social Insurance Law',
  },
]

export function KnowledgeSection() {
  return (
    <section id="knowledge" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">
            <BookOpen className="w-3 h-3 mr-1" />
            Knowledge Base
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expert Guidance, Official Sources
          </h2>
          <p className="text-lg text-muted-foreground">
            Every article cites official Vietnamese government sources. No guesswork, 
            no unofficial interpretations — just accurate, compliance-ready information.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {knowledgeCategories.map((category) => (
            <Card key={category.title} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count} articles
                  </Badge>
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
            <Button variant="outline" asChild>
              <Link href="#faq">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border px-6"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-start gap-3 text-left">
                    <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                    <div className="flex items-center gap-2">
                      <div className="official-badge">
                        <Shield className="w-3 h-3" />
                        <span>Source: {faq.source}</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Official Sources */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All information sourced from official Vietnamese government portals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['vbpl.vn', 'gdt.gov.vn', 'chinhphu.vn'].map((source) => (
              <a
                key={source}
                href={`https://${source}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-accent transition-colors text-sm"
              >
                <ExternalLink className="w-3 h-3" />
                {source}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
