'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Calculator,
  Users,
  TrendingUp,
  Shield,
  CreditCard,
  Building2,
  PlaneTakeoff,
  FileCheck,
  AlertCircle,
  Phone,
  Star,
  ChevronRight,
  Receipt,
  PiggyBank,
  Award,
  Target,
  Zap,
  Globe,
  Calendar
} from 'lucide-react'

const refundReasons = [
  {
    icon: Building2,
    title: 'Over-Withholding',
    description: 'Your employer may have withheld more tax than necessary due to incorrect tax bracket application or improper calculation of progressive tax rates.',
    examples: ['Incorrect tax bracket applied', 'Monthly vs. annual calculation errors', 'Bonus income over-taxed'],
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  {
    icon: FileText,
    title: 'Deductions Not Claimed',
    description: 'Many foreigners miss out on legitimate deductions for dependents, insurance, and charitable contributions that could significantly reduce their tax liability.',
    examples: ['Dependent deductions', 'Personal insurance premiums', 'Charitable contributions', 'Education expenses'],
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800'
  },
  {
    icon: Globe,
    title: 'Treaty Benefits',
    description: 'Vietnam has tax treaties with many countries. You may be entitled to reduced rates or exemptions based on your country of residence.',
    examples: ['Double taxation relief', 'Reduced withholding rates', 'Exemption on specific income types'],
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  {
    icon: Calendar,
    title: 'Part-Year Residency',
    description: 'If you arrived or left Vietnam during the tax year, your residency status may affect your tax obligation and potential refund amount.',
    examples: ['Mid-year arrivals', 'Early departures', 'Residency status changes', 'Split-year treatment'],
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800'
  }
]

const processSteps = [
  {
    step: 1,
    title: 'Initial Assessment',
    description: 'We review your employment history, income records, and tax documents to identify potential refund opportunities.',
    duration: '1-2 days',
    icon: FileCheck
  },
  {
    step: 2,
    title: 'Document Collection',
    description: 'We help you gather all necessary documents including salary statements, tax withholding certificates, and supporting evidence.',
    duration: '3-5 days',
    icon: FileText
  },
  {
    step: 3,
    title: 'Refund Calculation',
    description: 'Our experts calculate your exact refund amount using official tax regulations and identify all eligible deductions.',
    duration: '2-3 days',
    icon: Calculator
  },
  {
    step: 4,
    title: 'Filing & Submission',
    description: 'We prepare and submit your refund claim to the Vietnamese tax authorities, handling all communications.',
    duration: '1-2 days',
    icon: Receipt
  },
  {
    step: 5,
    title: 'Refund Processing',
    description: 'We track your application status and follow up with authorities until your refund is processed.',
    duration: '30-90 days',
    icon: PiggyBank
  }
]

const services = [
  {
    icon: FileText,
    title: 'Document Review',
    description: 'Comprehensive analysis of your tax documents, employment contracts, and withholding records to identify discrepancies and refund opportunities.',
    features: ['Employment contract analysis', 'Withholding statement review', 'Income verification', 'Deduction identification']
  },
  {
    icon: Calculator,
    title: 'Refund Calculation',
    description: 'Precise calculation of your refund using official Vietnamese tax regulations, ensuring you receive every VND you are entitled to.',
    features: ['Progressive tax verification', 'Deduction maximization', 'Treaty benefit application', 'Interest calculation']
  },
  {
    icon: FileCheck,
    title: 'Claim Filing',
    description: 'Professional preparation and submission of your refund claim with all required documentation and proper formatting.',
    features: ['Form preparation', 'Document compilation', 'Authority submission', 'Status tracking']
  }
]

const successStats = [
  { value: '$2.5M+', label: 'Refunds Recovered', icon: DollarSign },
  { value: '1,200+', label: 'Successful Claims', icon: CheckCircle2 },
  { value: '95%', label: 'Success Rate', icon: Target },
  { value: '15+', label: 'Countries Served', icon: Globe }
]

const testimonials = [
  {
    name: 'Michael Chen',
    nationality: 'Singapore',
    role: 'Finance Director',
    refund: '$4,200',
    quote: 'I had no idea I was overpaying taxes. VietPIT identified treaty benefits I was entitled to and recovered over $4,000.',
    rating: 5
  },
  {
    name: 'Sarah Williams',
    nationality: 'United Kingdom',
    role: 'Marketing Manager',
    refund: '$3,800',
    quote: 'The process was seamless. They handled everything from document collection to final refund. Highly recommended!',
    rating: 5
  },
  {
    name: 'Takeshi Yamamoto',
    nationality: 'Japan',
    role: 'IT Consultant',
    refund: '$5,100',
    quote: 'Professional service that understands both Vietnamese tax law and the unique challenges foreigners face.',
    rating: 5
  }
]

const pricingPlans = [
  {
    name: 'Standard Refund',
    price: '15%',
    priceNote: 'of refund amount',
    description: 'For straightforward refund cases with clear documentation',
    features: [
      'Document review & verification',
      'Refund calculation',
      'Claim preparation & filing',
      'Status tracking',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Complex Case',
    price: '20%',
    priceNote: 'of refund amount',
    description: 'For multi-year claims, treaty applications, or residency issues',
    features: [
      'Everything in Standard',
      'Multi-year claim analysis',
      'Treaty benefit application',
      'Residency status review',
      'Priority processing',
      'Direct tax authority liaison'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'volume pricing available',
    description: 'For companies with multiple expatriate employees',
    features: [
      'Bulk refund processing',
      'Dedicated account manager',
      'Quarterly tax reviews',
      'Compliance reporting',
      'Training sessions',
      'Year-round support'
    ],
    popular: false
  }
]

export default function TaxRefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A]/95 to-[#1E3A8A]/90 py-20 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2340E0D0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-[#40E0D0]/20 text-[#40E0D0] border-[#40E0D0]/30 hover:bg-[#40E0D0]/30 transition-colors">
              <Receipt className="w-4 h-4 mr-2" />
              Tax Refund Recovery Services
            </Badge>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Recover Your{' '}
              <span className="text-[#40E0D0]">Overpaid Taxes</span>
              <br />
              in Vietnam
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Many foreign employees overpay taxes without realizing it. Our experts identify refund opportunities 
              and help you recover what is rightfully yours — often amounting to thousands of dollars.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button asChild size="lg" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-semibold px-8 py-6 text-lg group">
                <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact via ZALO
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#1E3A8A] px-8 py-6 text-lg font-semibold transition-all duration-300">
                <Link href="#process">
                  <Clock className="w-5 h-5 mr-2" />
                  See How It Works
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#40E0D0]" />
                <span>No Win, No Fee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                <span>95% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#40E0D0]" />
                <span>Avg. Refund: $3,500</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#40E0D0]/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#40E0D0]/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* When You're Entitled Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-[#40E0D0] border-[#40E0D0]/30">
              <AlertCircle className="w-3 h-3 mr-1" />
              Common Refund Scenarios
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              When You&apos;re Entitled to a Refund
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Foreign employees often overpay taxes due to various circumstances. 
              Here are the most common situations where you may be eligible for a refund.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {refundReasons.map((reason, index) => (
              <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border-2 ${reason.borderColor} ${reason.bgColor}/50 hover:${reason.bgColor}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${reason.bgColor}`}>
                      <reason.icon className={`w-6 h-6 ${reason.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{reason.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {reason.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {reason.examples.map((example, i) => (
                      <Badge key={i} variant="secondary" className="text-xs font-normal">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Alert Box */}
          <div className="mt-10 p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                <PiggyBank className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                  Average Refund: $2,500 - $5,000
                </h3>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                  Most of our clients recover between $2,500 and $5,000 in overpaid taxes. 
                  Some complex cases have resulted in refunds exceeding $10,000. 
                  <Link href="#contact" className="font-medium underline ml-1">
                    Get a free assessment to see your potential refund.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Process Timeline */}
      <section id="process" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-[#40E0D0] border-[#40E0D0]/30">
              <Clock className="w-3 h-3 mr-1" />
              Step-by-Step Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Refund Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From initial assessment to receiving your refund, here&apos;s what to expect throughout the process.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#40E0D0] via-[#1E3A8A] to-[#40E0D0] transform md:-translate-x-1/2" />
              
              {/* Timeline Items */}
              {processSteps.map((step, index) => (
                <div 
                  key={step.step}
                  className={`relative flex items-start gap-6 mb-8 md:mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className="hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#40E0D0]/10 rounded-lg">
                              <step.icon className="w-5 h-5 text-[#40E0D0]" />
                            </div>
                            <CardTitle className="text-lg">
                              Step {step.step}: {step.title}
                            </CardTitle>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {step.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#40E0D0] rounded-full border-4 border-background shadow-lg z-10" />
                </div>
              ))}
            </div>
            
            {/* Total Timeline Summary */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#1E3A8A]/5 to-[#40E0D0]/5 rounded-xl border border-[#40E0D0]/20">
              <div className="flex items-center justify-center gap-4 text-center">
                <Clock className="w-6 h-6 text-[#40E0D0]" />
                <div>
                  <p className="font-semibold">Total Estimated Time: 6-12 weeks</p>
                  <p className="text-sm text-muted-foreground">
                    Most refunds are processed within 30-90 days after submission
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-[#40E0D0] border-[#40E0D0]/30">
              <Shield className="w-3 h-3 mr-1" />
              Our Expertise
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive tax refund service covers every aspect of your claim, 
              from initial review to final payment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-[#40E0D0]/50">
                <CardHeader>
                  <div className="p-3 w-fit rounded-xl bg-gradient-to-br from-[#1E3A8A]/10 to-[#40E0D0]/10 mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-[#1E3A8A] dark:text-[#40E0D0]" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4" />
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[#40E0D0] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories & Stats */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A]/95">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {successStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#40E0D0]/20 mb-3">
                  <stat.icon className="w-6 h-6 text-[#40E0D0]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Testimonials */}
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-[#40E0D0]/20 text-[#40E0D0] border-[#40E0D0]/30">
              <Star className="w-3 h-3 mr-1" />
              Client Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Real Refunds, Real Results
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#40E0D0] text-[#40E0D0]" />
                    ))}
                  </div>
                  <blockquote className="text-white/90 mb-4 text-sm leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <Separator className="bg-white/20 mb-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs text-white/60">{testimonial.nationality} • {testimonial.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60">Refund</p>
                      <p className="font-bold text-[#40E0D0]">{testimonial.refund}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-[#40E0D0] border-[#40E0D0]/30">
              <CreditCard className="w-3 h-3 mr-1" />
              Simple Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              No Recovery, No Fee
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work on a success-based model. You pay nothing unless we successfully recover your refund.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-lg transition-all duration-300 ${
                  plan.popular 
                    ? 'border-2 border-[#40E0D0] shadow-lg scale-105' 
                    : 'hover:-translate-y-1'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#40E0D0] text-[#1E3A8A] font-semibold px-3">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <div className="py-4">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <p className="text-xs text-muted-foreground mt-1">{plan.priceNote}</p>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4" />
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#40E0D0] shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]' 
                        : 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white'
                    }`}
                    asChild
                  >
                    <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                      Contact via ZALO
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Trust Note */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              <Shield className="w-4 h-4 inline mr-1 text-[#40E0D0]" />
              All fees are transparent with no hidden costs. Full terms provided during consultation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-[#40E0D0]/10 via-background to-[#1E3A8A]/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#1E3A8A]/10 text-[#1E3A8A] dark:bg-[#40E0D0]/10 dark:text-[#40E0D0] border-0">
              <Zap className="w-4 h-4 mr-2" />
              Start Your Free Assessment
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Recover Your Overpaid Taxes?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step towards your tax refund today. Our experts will analyze your situation 
              and provide a free, no-obligation assessment of your potential refund.
            </p>
            
            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                { icon: Clock, text: 'Quick 5-min assessment' },
                { icon: Shield, text: 'No recovery, no fee' },
                { icon: CheckCircle2, text: '100% confidential' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-[#40E0D0]" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-premium gradient-primary text-white font-semibold px-8 py-6 text-lg group">
                <Link href="mailto:contact@vietpit.vn?subject=Tax Refund Assessment Request">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Free Assessment
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-2 hover:bg-accent">
                <Link href="https://zalo.me/84703027485">
                  <Phone className="w-5 h-5 mr-2" />
                  Call ZALO: +84703027485
                </Link>
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-10 p-6 bg-card rounded-xl border">
              <p className="text-sm text-muted-foreground mb-4">
                What to have ready for your assessment:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Salary statements', 'Tax withholding certificates', 'Employment contract', 'Passport copy'].map((doc, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    {doc}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
