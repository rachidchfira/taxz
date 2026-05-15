'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight } from 'lucide-react'

const faqs = [
  {
    q: 'Do I actually need to file a PIT return in Vietnam?',
    a: 'Yes — if you earned income in Vietnam and your employer withheld tax on your behalf, you must file an annual finalization return. There is no automatic assessment. Failure to file can result in penalties, and you may be leaving a refund unclaimed.',
  },
  {
    q: 'How do I know if I am a tax resident or non-resident?',
    a: 'You are a tax resident if you were present in Vietnam for 183 or more days in the calendar year, OR if you maintain a regular residence (registered lease or ownership). Residents pay progressive rates (5–35%); non-residents pay a flat 20%. The 183-day count is calendar-year, not 12 consecutive months.',
  },
  {
    q: 'My employer already withheld tax. Why do I still need to file?',
    a: 'Monthly withholding is an estimate. Your actual liability is calculated once per year based on total income, deductions, residency status, and dependants. Many expats overpay monthly withholding — the finalization is how you recover the difference.',
  },
  {
    q: 'I worked for two companies in 2024. Is my case more complicated?',
    a: 'Yes. Multi-employer cases require consolidating income from all sources and filing a single combined return. Each employer withholds independently, often leading to over-withholding. This is exactly the scenario where professional help recovers the most money.',
  },
  {
    q: 'I am leaving Vietnam soon. Do I have to file before I go?',
    a: 'Yes. Vietnam requires expats to complete PIT finalization before departure. The responsible party (you or your employer) must file a departure finalization return. We complete these in 5–8 days on average.',
  },
  {
    q: 'How much does it cost and how long does it take?',
    a: 'Simple cases start from 1,500,000 VND and take 5–8 business days. Complex cases (multi-employer, refund claims, non-standard residency) are higher — see our pricing page for details. We do not start work until you approve the quote.',
  },
  {
    q: 'How much does professional filing cost — and is it worth it?',
    a: 'Our standard filing starts from 1,500,000 VND. The average client recovers 3.2M VND in deductions they did not claim — more than double the service cost. For multi-employer cases, the average recovery is 4.5M VND. Even in simple cases, the time saved (20+ hours of research and forms) makes professional filing worthwhile.',
  },
  {
    q: 'What happens if the Tax Authority rejects my return?',
    a: 'We offer a full rejection guarantee: if your return is rejected due to an error on our part, we refile at no additional cost and cover any resulting penalties. In 7+ years of operation, our first-time acceptance rate is 98%. The 2% that require follow-up are handled entirely by our team — no extra work for you.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
            FAQ — Straight Answers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
            8 Questions Every Expat Asks Before Filing
          </h2>
          <p className="text-muted-foreground">
            No sales pitch. Just clear answers backed by official Vietnamese law — because you deserve to understand your own tax situation.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/40 transition-colors"
              >
                <span className="font-medium text-sm leading-snug">{faq.q}</span>
                <ChevronDown
                  className={[
                    'w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200',
                    open === i ? 'rotate-180' : '',
                  ].join(' ')}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Something specific to your situation?
          </p>
          <Button asChild variant="outline" className="border-[#40E0D0]/40 text-[#40E0D0] hover:bg-[#40E0D0]/10">
            <Link href="/contact">
              Ask a Free Question <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
