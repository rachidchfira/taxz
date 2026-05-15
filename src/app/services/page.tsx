'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  MapPin,
  PlaneTakeoff,
  Building2,
  RefreshCw,
  Globe,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Shield,
  Phone,
  Calendar,
  Sparkles,
} from 'lucide-react'

const services = [
  {
    id: 'pit-finalization',
    icon: FileText,
    title: 'PIT Finalization',
    description: 'Comprehensive Personal Income Tax finalization services for foreign employees in Vietnam. We handle document review, tax calculation, form preparation, and submission to ensure full compliance.',
    badge: 'Standard Service',
    badgeVariant: 'default' as const,
    features: [
      'Annual tax reconciliation',
      'Document review & analysis',
      'Tax calculation & optimization',
      'Form preparation & filing',
      'Post-filing support',
    ],
    href: '/services/pit-finalization',
    popular: true,
  },
  {
    id: 'tax-residency',
    icon: MapPin,
    title: 'Tax Residency Assessment',
    description: 'Determine your tax residency status in Vietnam. Our experts analyze your stay duration, income sources, and treaty eligibility to establish your tax obligations.',
    badge: 'Assessment',
    badgeVariant: 'outline' as const,
    features: [
      '183-day rule analysis',
      'Permanent home assessment',
      'Tax treaty eligibility',
      'Residency status certificate',
      'Tax planning guidance',
    ],
    href: '/services/tax-residency',
    popular: false,
  },
  {
    id: 'leaving-vietnam',
    icon: PlaneTakeoff,
    title: 'Leaving Vietnam Finalization',
    description: 'Expedited tax finalization for foreigners departing Vietnam. We ensure all tax obligations are settled before your departure to avoid exit complications.',
    badge: 'Expedited',
    badgeVariant: 'outline' as const,
    features: [
      'Pre-departure tax clearance',
      'Fast-track processing',
      'Exit documentation support',
      'Refund processing',
      'Airport clearance assistance',
    ],
    href: '/services/leaving-vietnam',
    popular: false,
  },
  {
    id: 'multi-employer',
    icon: Building2,
    title: 'Multi-Employer Tax Cases',
    description: 'Specialized handling for individuals who worked with multiple employers during the tax year. We consolidate income sources and optimize your tax position.',
    badge: 'Complex Case',
    badgeVariant: 'outline' as const,
    features: [
      'Multi-source income consolidation',
      'Duplicate deduction prevention',
      'Tax bracket optimization',
      'Employer coordination',
      'Consolidated filing',
    ],
    href: '/services/multi-employer',
    popular: false,
  },
  {
    id: 'tax-refund',
    icon: RefreshCw,
    title: 'Tax Refund/Reconciliation',
    description: 'Recover overpaid taxes through our refund services. We identify refund opportunities and handle the entire reconciliation process with tax authorities.',
    badge: 'Recovery',
    badgeVariant: 'outline' as const,
    features: [
      'Overpayment identification',
      'Refund eligibility check',
      'Documentation preparation',
      'Authority liaison',
      'Expedited processing',
    ],
    href: '/services/tax-refund',
    popular: false,
  },
  {
    id: 'dta-treaty',
    icon: Globe,
    title: 'DTA/Treaty Claims',
    description: 'Maximize tax benefits through Double Taxation Agreements. We help foreigners claim treaty benefits and avoid double taxation on their income.',
    badge: 'International',
    badgeVariant: 'outline' as const,
    features: [
      'Treaty eligibility assessment',
      'Tax exemption applications',
      'Foreign tax credit claims',
      'Treaty benefit documentation',
      'Cross-border tax planning',
    ],
    href: '/services/dta-treaty',
    popular: false,
  },
]

const whyChooseUs = [
  {
    icon: Shield,
    title: '100% Compliance',
    description: 'All filings verified against official Vietnamese tax regulations.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Standard cases completed within 5-7 business days.',
  },
  {
    icon: Users,
    title: '500+ Cases',
    description: 'Trusted by hundreds of expatriates across Vietnam.',
  },
  {
    icon: Sparkles,
    title: 'Expert Team',
    description: 'Licensed tax professionals with international experience.',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 hero-gradient overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#40E0D0]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Badge variant="outline" className="mb-6 border-[#40E0D0]/30 text-[#40E0D0] bg-[#40E0D0]/5">
              <Shield className="w-3 h-3 mr-1" />
              Professional Tax Services
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Our Services</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive Personal Income Tax services designed specifically for foreigners 
              working and living in Vietnam. From standard PIT finalization to complex 
              multi-employer cases, we have you covered.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white px-8 py-6 text-lg group">
                <Link href="#contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white dark:border-[#40E0D0] dark:text-[#40E0D0] dark:hover:bg-[#40E0D0] dark:hover:text-[#1E3A8A] px-8 py-6 text-lg">
                <Link href="#services">
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-secondary flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#1E3A8A]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              What We Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Professional Tax Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end PIT services tailored for expatriates. Each service includes 
              personalized support from our expert team.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`relative border-border/50 transition-all duration-300 hover:-translate-y-1 card-hover group ${
                  service.popular ? 'border-[#40E0D0]/50 shadow-lg shadow-[#40E0D0]/10' : 'hover:border-[#40E0D0]/30'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="gradient-secondary text-[#1E3A8A] font-medium">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <service.icon className="w-7 h-7 text-[#1E3A8A]" />
                    </div>
                    <Badge variant={service.badgeVariant} className={
                      service.badgeVariant === 'default' 
                        ? 'gradient-primary text-white' 
                        : 'border-[#40E0D0]/30 text-[#40E0D0]'
                    }>
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[#40E0D0] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Learn More Button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group/btn border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white dark:border-[#40E0D0] dark:text-[#40E0D0] dark:hover:bg-[#40E0D0] dark:hover:text-[#1E3A8A]"
                  >
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-[#1E3A8A]/30 text-[#1E3A8A] dark:text-[#40E0D0]">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">How It Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started is easy. Our streamlined process ensures minimal effort on your part.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: 1, title: 'Contact Us', description: 'Reach out via phone, email, or our contact form for a free initial consultation.' },
              { step: 2, title: 'Document Submission', description: 'Provide your income documents and we will review your tax situation.' },
              { step: 3, title: 'Expert Processing', description: 'Our licensed professionals handle calculations and form preparation.' },
              { step: 4, title: 'Complete & Filed', description: 'Review, approve, and we submit everything to the tax authorities.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 md:py-28 gradient-primary relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/10 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Calendar className="w-3 h-3 mr-1" />
              Free Consultation
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Need Help With Your PIT?
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Contact our expert team today for a free consultation. We will assess your 
              situation and provide a clear path forward for your tax matters in Vietnam.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E3A8A] hover:bg-white/90 font-medium px-8 py-6 text-lg group btn-premium"
              >
                <Link href="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Link href="https://zalo.me/84703027485">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Link>
              </Button>
            </div>

            {/* Trust Elements */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                <span>No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                <span>Expert Advice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
