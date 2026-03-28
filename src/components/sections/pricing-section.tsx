'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle2, 
  HelpCircle,
  ArrowRight,
  Zap,
  Star,
  Shield,
  Phone
} from 'lucide-react'

const pricingTiers = [
  {
    name: 'Consultation',
    description: 'Expert guidance for your specific situation',
    price: 'Contact',
    priceNote: 'Per session',
    features: [
      '30-60 minute consultation',
      'Written guidance summary',
      'Action plan for your case',
      'Email follow-up support',
      'Source citations provided',
    ],
    cta: 'Contact via ZALO',
    popular: false,
    icon: HelpCircle,
  },
  {
    name: 'Standard Finalization',
    description: 'Complete PIT finalization for straightforward cases',
    price: 'From 3,000,000',
    priceNote: 'VND per tax year',
    features: [
      'Single employer case',
      'Full document review',
      'Residency determination',
      'Tax calculation & reconciliation',
      'Form preparation & filing',
      'Submission confirmation',
      '30-day post-filing support',
    ],
    cta: 'Contact via ZALO',
    popular: true,
    icon: Star,
  },
  {
    name: 'Complex Case',
    description: 'Multi-employer, leaving Vietnam, or optimization review',
    price: 'From 5,000,000',
    priceNote: 'VND per tax year',
    features: [
      'Multiple employers supported',
      'Exit finalization procedures',
      'Refund optimization review',
      'Dependant deduction optimization',
      'Priority processing',
      'Dedicated case manager',
      '60-day post-filing support',
    ],
    cta: 'Contact via ZALO',
    popular: false,
    icon: Shield,
  },
  {
    name: 'Executive Service',
    description: 'Premium service for senior professionals',
    price: 'Contact',
    priceNote: 'Custom pricing',
    features: [
      'Complex compensation packages',
      'Allowance optimization',
      'Tax treaty analysis',
      'Multi-year planning',
      'Priority support',
      'In-person meetings available',
      'Quarterly check-ins',
      'Year-round advisory',
    ],
    cta: 'Contact via ZALO',
    popular: false,
    icon: Zap,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent, Professional Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Fair pricing for expert service. No hidden fees, no surprises. 
            Every case receives the same meticulous attention to detail.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name}
              className={`relative flex flex-col ${
                tier.popular 
                  ? 'border-primary/50 ring-1 ring-primary/20 shadow-lg' 
                  : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    tier.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/5'
                  }`}>
                    <tier.icon className={`w-5 h-5 ${tier.popular ? '' : 'text-primary'}`} />
                  </div>
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-4">
                  <div className="text-2xl font-bold">
                    {tier.price.includes('Contact') ? tier.price : tier.price + ' VND'}
                  </div>
                  <p className="text-xs text-muted-foreground">{tier.priceNote}</p>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  asChild 
                  className={`w-full ${tier.popular ? 'bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]' : 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white'}`}
                >
                  <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4 mr-2" />
                    {tier.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-muted/50 border-0">
            <CardContent className="pt-6 text-center">
              <p className="font-semibold mb-1">Free Assessment</p>
              <p className="text-sm text-muted-foreground">
                Not sure what you need? Start with our free calculator.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-0">
            <CardContent className="pt-6 text-center">
              <p className="font-semibold mb-1">No Hidden Fees</p>
              <p className="text-sm text-muted-foreground">
                Quote provided upfront. Price doesn't change midway.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 border-0">
            <CardContent className="pt-6 text-center">
              <p className="font-semibold mb-1">Satisfaction Guaranteed</p>
              <p className="text-sm text-muted-foreground">
                If we can't help, you don't pay. Simple as that.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
