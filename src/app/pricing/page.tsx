'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Check,
  X,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Shield,
  FileText,
  CreditCard,
  RefreshCw,
  Users,
  MessageSquare,
  Languages,
  Lock,
  Sparkles,
} from 'lucide-react'

// Exchange rate (approximate)
const VND_TO_USD = 0.00004

// Pricing data
const pricingTiers = [
  {
    name: 'Standard Finalization',
    priceVND: 3500000,
    description: 'Perfect for straightforward tax cases with a single employer.',
    features: [
      { text: 'Single employer', included: true },
      { text: 'Standard residency case', included: true },
      { text: 'Basic document review', included: true },
      { text: 'Tax calculation', included: true },
      { text: 'Filing submission', included: true },
      { text: 'Email support', included: true },
      { text: 'Complex residency cases', included: false },
      { text: 'Tax optimization', included: false },
      { text: 'Departure clearance', included: false },
    ],
    popular: false,
    cta: 'Contact via ZALO',
  },
  {
    name: 'Comprehensive Finalization',
    priceVND: 5500000,
    description: 'Ideal for expats with multiple employers or complex situations.',
    features: [
      { text: 'Multiple employers', included: true },
      { text: 'Complex residency cases', included: true },
      { text: 'Full document review', included: true },
      { text: 'Tax optimization', included: true },
      { text: 'Filing + follow-up', included: true },
      { text: 'Priority support', included: true },
      { text: 'Departure clearance', included: true },
      { text: 'DTA/Treaty claims', included: false },
      { text: 'Dedicated account manager', included: false },
    ],
    popular: true,
    cta: 'Contact via ZALO',
  },
  {
    name: 'Complex Case',
    priceVND: null,
    description: 'Tailored solutions for unique or multi-year tax situations.',
    features: [
      { text: 'DTA/Treaty claims', included: true },
      { text: 'Multi-year filings', included: true },
      { text: 'Audit assistance', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Phone + video support', included: true },
      { text: 'Priority processing', included: true },
      { text: 'All Standard features', included: true },
      { text: 'All Comprehensive features', included: true },
      { text: 'Custom consultation', included: true },
    ],
    popular: false,
    cta: 'Contact Us',
  },
]

const includedFeatures = [
  {
    icon: FileText,
    title: 'Document Checklist Generation',
    description: 'Personalized checklist based on your specific tax situation and employment history.',
  },
  {
    icon: Shield,
    title: 'Official Source Citations',
    description: 'All calculations and procedures backed by Vietnamese government sources.',
  },
  {
    icon: Lock,
    title: 'Secure Document Handling',
    description: '256-bit encryption for all document transfers and secure storage.',
  },
  {
    icon: Languages,
    title: 'Bilingual Support',
    description: 'Communication in both English and Vietnamese throughout the process.',
  },
  {
    icon: Check,
    title: 'Filing Confirmation',
    description: 'Official confirmation and receipt of your tax filing submission.',
  },
]

const faqItems = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers (VND), international wire transfers, and major credit cards (Visa, Mastercard). Payment can be made in VND or USD equivalent. For corporate clients, we also offer invoicing with NET 15 payment terms.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a full refund if you cancel before we begin work on your case. Once document review has started, we offer a prorated refund based on work completed. If we cannot complete your filing due to issues on our end, you will receive a full refund.',
  },
  {
    question: 'How long does the process take?',
    answer: 'Standard cases are typically completed within 5-7 business days after receiving all required documents. Comprehensive cases may take 10-14 business days. Complex cases are estimated on a case-by-case basis. Rush processing is available for an additional fee.',
  },
  {
    question: 'What if I need more help after filing?',
    answer: 'All packages include post-filing support for 30 days. If you receive questions from tax authorities or need clarification on your filing, we will assist at no additional charge. Extended support packages are available for ongoing assistance.',
  },
]

export default function PricingPage() {
  const [currency, setCurrency] = useState<'VND' | 'USD'>('VND')

  const formatPrice = (priceVND: number | null) => {
    if (priceVND === null) return 'Custom'
    if (currency === 'VND') {
      return new Intl.NumberFormat('vi-VN').format(priceVND) + ' VND'
    }
    return '$' + Math.round(priceVND * VND_TO_USD).toLocaleString() + ' USD*'
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A]/90 py-16 lg:py-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1.5 text-sm font-medium border-[#40E0D0]/30 bg-[#40E0D0]/10 text-[#40E0D0]"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                No Hidden Fees
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                Transparent Pricing
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Clear, upfront pricing for all our PIT finalization services. 
                What you see is what you pay — no surprise charges, no hidden costs.
              </p>

              {/* Currency Toggle */}
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full p-1 backdrop-blur-sm">
                <button
                  onClick={() => setCurrency('VND')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currency === 'VND'
                      ? 'bg-[#40E0D0] text-[#1E3A8A]'
                      : 'text-white hover:text-[#40E0D0]'
                  }`}
                >
                  VND
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currency === 'USD'
                      ? 'bg-[#40E0D0] text-[#1E3A8A]'
                      : 'text-white hover:text-[#40E0D0]'
                  }`}
                >
                  USD (approx.)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-16 lg:py-24 -mt-12 relative z-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`relative flex flex-col h-full ${
                    tier.popular
                      ? 'border-2 border-[#40E0D0] shadow-xl shadow-[#40E0D0]/10 scale-105 z-10'
                      : 'border-border'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#40E0D0] text-[#1E3A8A] px-4 py-1 font-semibold">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="text-center mb-6">
                      <div className="text-3xl lg:text-4xl font-bold text-foreground">
                        {formatPrice(tier.priceVND)}
                      </div>
                      {tier.priceVND && currency === 'USD' && (
                        <p className="text-xs text-muted-foreground mt-1">
                          *Approximate rate
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className={`flex items-center gap-3 text-sm ${
                            feature.included ? 'text-foreground' : 'text-muted-foreground/50'
                          }`}
                        >
                          {feature.included ? (
                            <Check className="w-4 h-4 text-[#40E0D0] flex-shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground/30 flex-shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'line-through'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-4">
                    <Button
                      asChild
                      className={`w-full ${
                        tier.popular
                          ? 'bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]'
                          : 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white'
                      }`}
                    >
                      <Link href="/contact">
                        {tier.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <Shield className="w-3 h-3 mr-1" />
                Included in All Packages
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What&apos;s Included
              </h2>
              <p className="text-lg text-muted-foreground">
                Every package comes with these essential services at no extra cost.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {includedFeatures.map((feature) => (
                <Card key={feature.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Not Employer's Service? */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <MessageSquare className="w-3 h-3 mr-1" />
                Common Question
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Why Not Just Use My Employer&apos;s Service?
              </h2>
              <p className="text-lg text-muted-foreground">
                Many companies offer tax assistance, but there are important differences to consider.
              </p>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-semibold">What Employers Often Miss</th>
                        <th className="text-left p-4 font-semibold">What VietPIT Provides</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-4 text-muted-foreground">Deduction optimization — most use standard amounts</td>
                        <td className="p-4 font-medium">Full deduction audit, avg. 3.2M VND extra identified</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Multi-employer income handling</td>
                        <td className="p-4 font-medium">Consolidated filing for all income sources</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">English explanations of calculations</td>
                        <td className="p-4 font-medium">100% English documentation and support</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Post-filing support</td>
                        <td className="p-4 font-medium">30-day support included, audit assistance available</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-muted-foreground">Departure clearance</td>
                        <td className="p-4 font-medium">Complete exit tax clearance services</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              Even if your employer provides tax assistance, you have the right to use an independent service. 
              Many clients choose VietPIT for personalized attention and deduction optimization.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <MessageSquare className="w-3 h-3 mr-1" />
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about our pricing and services.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left font-medium hover:text-[#40E0D0]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-[#1E3A8A]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Book a free consultation with our tax experts. We&apos;ll assess your situation 
                and recommend the best package for your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-medium px-8"
                >
                  <Link href="/contact">
                    Book Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E3A8A] px-8"
                >
                  <Link href="/tools/calculator">
                    Try Tax Calculator
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70">
                <a
                  href="mailto:contact@vietpit.vn"
                  className="flex items-center gap-2 hover:text-[#40E0D0] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>contact@vietpit.vn</span>
                </a>
                <span className="hidden sm:block text-white/30">|</span>
                <a
                  href="https://zalo.me/84703027485"
                  className="flex items-center gap-2 hover:text-[#40E0D0] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>ZALO: +84703027485</span>
                </a>
                <span className="hidden sm:block text-white/30">|</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Mon - Fri, 9AM - 6PM ICT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 border-t border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#40E0D0]" />
                <span className="text-sm">400+ Cases Finalized</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#40E0D0]" />
                <span className="text-sm">98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#40E0D0]" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#40E0D0]" />
                <span className="text-sm">30-Day Support</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
