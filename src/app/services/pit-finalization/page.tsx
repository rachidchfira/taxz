import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  FileText,
  CheckCircle2,
  Clock,
  Users,
  Shield,
  ArrowRight,
  Phone,
  Calendar,
  ClipboardCheck,
  Search,
  FileSignature,
  Send,
  BadgeCheck,
  AlertCircle,
  Building2,
  PlaneTakeoff,
  Briefcase,
  UserCog,
  Calculator,
  BookOpen,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

const whoNeedsService = [
  {
    icon: Briefcase,
    title: 'Foreign Employees',
    description: 'Expats working in Vietnam under an employment contract who need to finalize their annual personal income tax.',
  },
  {
    icon: Building2,
    title: 'Multi-Employer Workers',
    description: 'Individuals who worked for multiple employers during the tax year and need consolidated tax filing.',
  },
  {
    icon: PlaneTakeoff,
    title: 'Leaving Vietnam',
    description: 'Foreign employees departing Vietnam who need to settle their tax obligations before exit.',
  },
  {
    icon: UserCog,
    title: 'Tax Residents',
    description: 'Those who meet the 183-day residency rule and need to file tax on worldwide income.',
  },
]

const whatIsIncluded = [
  {
    icon: Search,
    title: 'Document Review & Analysis',
    description: 'Thorough review of your income documents, tax deductions, and residency status assessment.',
  },
  {
    icon: Calculator,
    title: 'Tax Calculation & Optimization',
    description: 'Accurate PIT calculation with identification of all eligible deductions and tax treaty benefits.',
  },
  {
    icon: FileText,
    title: 'Form Preparation',
    description: 'Preparation of all required tax finalization forms including declarations and supporting documents.',
  },
  {
    icon: Shield,
    title: 'Compliance Verification',
    description: 'Full compliance check against Vietnamese tax regulations and official requirements.',
  },
  {
    icon: FileSignature,
    title: 'Submission Support',
    description: 'Assistance with e-filing or paper submission to the local tax authority.',
  },
  {
    icon: BadgeCheck,
    title: 'Post-Filing Support',
    description: 'Follow-up support for any queries from tax authorities and refund processing.',
  },
]

const processSteps = [
  {
    step: 1,
    title: 'Initial Consultation',
    duration: '1-2 days',
    description: 'Free consultation to assess your situation, gather documents, and determine your tax residency status.',
    icon: Phone,
  },
  {
    step: 2,
    title: 'Document Collection',
    duration: '3-5 days',
    description: 'We collect and review all necessary documents including income statements, contracts, and deduction proofs.',
    icon: ClipboardCheck,
  },
  {
    step: 3,
    title: 'Tax Calculation',
    duration: '2-3 days',
    description: 'Our experts calculate your tax liability, identify deductions, and optimize your tax position.',
    icon: Calculator,
  },
  {
    step: 4,
    title: 'Form Preparation',
    duration: '2-3 days',
    description: 'Preparation of all finalization forms and supporting documentation for your review.',
    icon: FileText,
  },
  {
    step: 5,
    title: 'Review & Approval',
    duration: '1-2 days',
    description: 'You review the prepared documents and approve before submission.',
    icon: CheckCircle2,
  },
  {
    step: 6,
    title: 'Submission',
    duration: '1 day',
    description: 'We submit your tax finalization to the tax authority and provide confirmation.',
    icon: Send,
  },
]

const pricingPlans = [
  {
    title: 'Standard PIT Finalization',
    description: 'For single employer cases',
    price: 'From $150',
    features: [
      'Single employer income',
      'Standard deductions',
      'Tax residency assessment',
      'Form preparation & filing',
      'Post-filing support',
    ],
    popular: false,
  },
  {
    title: 'Complex PIT Finalization',
    description: 'For multi-employer or complex cases',
    price: 'From $300',
    features: [
      'Multiple employer income',
      'Complex deductions',
      'Tax treaty analysis',
      'Form preparation & filing',
      'Priority support',
      'Tax authority liaison',
    ],
    popular: true,
  },
  {
    title: 'Expedited Service',
    description: 'For urgent departure cases',
    price: 'From $400',
    features: [
      'All Complex service features',
      '48-hour turnaround',
      'Emergency support',
      'Airport clearance assistance',
      'Full documentation package',
    ],
    popular: false,
  },
]

const faqs = [
  {
    question: 'What is PIT Finalization?',
    answer: 'PIT Finalization (Personal Income Tax Finalization) is the annual process of reconciling your total tax liability with the tax withheld by your employer(s) throughout the year. In Vietnam, this is mandatory for all tax residents and must be filed by the last day of the third month after the tax year ends (March 31st for most taxpayers).',
  },
  {
    question: 'Who is required to file PIT Finalization in Vietnam?',
    answer: 'You are required to file if you: (1) Are a tax resident (183+ days in Vietnam), (2) Had income from multiple employers, (3) Had income exceeding the standard deduction threshold, or (4) Are leaving Vietnam permanently. Even if your employer has withheld taxes correctly, you may still need to file for finalization.',
  },
  {
    question: 'What documents do I need for PIT Finalization?',
    answer: 'Required documents include: (1) Valid passport and visa copies, (2) Work permit or exemption certificate, (3) Employment contracts, (4) Salary statements from all employers (Form 02/TNCN), (5) Proof of tax withholdings, (6) Documents for deductions (insurance, charity, dependents), and (7) Bank account details for refunds.',
  },
  {
    question: 'What is the deadline for PIT Finalization?',
    answer: 'The standard deadline is March 31st of the following year. For individuals leaving Vietnam permanently, the deadline is 30 days before departure. Employers must file by March 31st for their employees, but individuals with multiple income sources must file personally.',
  },
  {
    question: 'Can I get a tax refund through finalization?',
    answer: 'Yes, if your employer withheld more tax than your actual liability, you may receive a refund. Common reasons for refunds include: unused personal deductions, over-withholding due to incorrect tax brackets, or eligible deductions for dependents and charitable contributions. Refunds are typically processed within 30-60 days after filing.',
  },
  {
    question: 'What happens if I miss the PIT Finalization deadline?',
    answer: 'Late filing may result in penalties including: (1) Administrative fines ranging from 500,000 VND to several million VND, (2) Interest charges on any unpaid taxes (0.03% per day), and (3) Potential issues with future visa or work permit applications. We recommend filing on time or requesting an extension if needed.',
  },
  {
    question: 'Do I need to file if I only worked for one employer?',
    answer: 'If you worked for a single employer and your total taxable income was properly withheld, your employer should handle the finalization on your behalf. However, if you had additional income sources, claimed deductions for dependents, or your employer did not properly withhold taxes, you must file individually.',
  },
  {
    question: 'How does tax residency affect PIT Finalization?',
    answer: 'Tax residents (183+ days in Vietnam) are taxed on worldwide income and can claim all personal deductions. Non-residents are taxed only on Vietnam-sourced income at a flat 20% rate. Your residency status directly impacts your tax liability and the deductions you can claim during finalization.',
  },
]

const officialSources = [
  { name: 'Law on PIT No. 04/2007/QH12', url: 'https://vbpl.vn' },
  { name: 'Decree No. 65/2013/ND-CP', url: 'https://vbpl.vn' },
  { name: 'Circular No. 111/2013/TT-BTC', url: 'https://vbpl.vn' },
]

export default function PITFinalizationPage() {
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
              Professional Tax Service
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">PIT Finalization</span>
              <br />
              <span className="text-foreground">for Foreigners in Vietnam</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive Personal Income Tax finalization services tailored for expatriates.
              We handle everything from document review to tax authority submission,
              ensuring full compliance with Vietnamese regulations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] px-8 py-6 text-lg group">
                <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact via ZALO
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-[#40E0D0] text-[#40E0D0] hover:bg-[#40E0D0]/10">
                <Link href="#pricing">
                  View Pricing
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                <span>100% Compliance Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#40E0D0]" />
                <span>5-Day Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#40E0D0]" />
                <span>500+ Cases Handled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-[#1E3A8A]/30 text-[#1E3A8A] dark:text-[#40E0D0]">
                Overview
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Understanding PIT Finalization</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Personal Income Tax (PIT) finalization is a mandatory annual process in Vietnam
                where taxpayers reconcile their total tax liability against taxes already withheld
                by employers. For foreigners, this process involves additional considerations
                including tax residency determination and potential tax treaty applications.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                According to the Law on Personal Income Tax (No. 04/2007/QH12) and its implementing
                regulations, all individuals with taxable income in Vietnam must ensure proper tax
                finalization. This process determines whether you owe additional taxes or are
                eligible for a refund.
              </p>

              {/* Official Sources */}
              <div className="bg-card border border-border/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm font-medium mb-3">
                  <BookOpen className="w-4 h-4 text-[#40E0D0]" />
                  <span>Official Legal Sources</span>
                </div>
                <div className="space-y-2">
                  {officialSources.map((source) => (
                    <a
                      key={source.name}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#40E0D0] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {source.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Points Card */}
            <div className="space-y-4">
              <Card className="border-border/50 hover:border-[#40E0D0]/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center mb-3">
                    <Clock className="w-6 h-6 text-[#1E3A8A]" />
                  </div>
                  <CardTitle>Annual Deadline</CardTitle>
                  <CardDescription>
                    PIT finalization must be completed by March 31st of the following year.
                    Late submissions may result in penalties.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border/50 hover:border-[#40E0D0]/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center mb-3">
                    <FileText className="w-6 h-6 text-[#1E3A8A]" />
                  </div>
                  <CardTitle>Required Filing</CardTitle>
                  <CardDescription>
                    Mandatory for tax residents and those with multiple income sources.
                    Also required when leaving Vietnam permanently.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border/50 hover:border-[#40E0D0]/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center mb-3">
                    <BadgeCheck className="w-6 h-6 text-[#1E3A8A]" />
                  </div>
                  <CardTitle>Professional Handling</CardTitle>
                  <CardDescription>
                    Our experts ensure accurate calculations, proper documentation,
                    and timely submission to avoid penalties.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs This Service Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              Target Audience
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Who Needs PIT Finalization?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our PIT finalization services are designed for the following categories of foreign individuals in Vietnam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoNeedsService.map((item, index) => (
              <Card
                key={item.title}
                className="border-border/50 hover:border-[#40E0D0]/30 transition-all duration-300 hover:-translate-y-1 card-hover"
              >
                <CardHeader className="text-center">
                  <div className="w-14 h-14 rounded-xl gradient-secondary flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-[#1E3A8A]" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Alert Box */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="border-[#40E0D0]/30 bg-[#40E0D0]/5">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-[#40E0D0] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-2">Special Case: Leaving Vietnam</h4>
                    <p className="text-sm text-muted-foreground">
                      If you are departing Vietnam permanently, PIT finalization is required
                      <strong> before your exit</strong>. We offer expedited services for departing
                      employees to ensure all tax matters are settled before your departure date.
                      Contact us at least 30 days before your planned exit.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-[#1E3A8A]/30 text-[#1E3A8A] dark:text-[#40E0D0]">
              Service Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">What&apos;s Included</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive PIT finalization service covers every aspect of your tax settlement needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatIsIncluded.map((item) => (
              <Card
                key={item.title}
                className="border-border/50 hover:border-[#40E0D0]/30 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#1E3A8A]/10 dark:bg-[#40E0D0]/10 flex items-center justify-center mb-4 group-hover:gradient-secondary transition-all">
                    <item.icon className="w-6 h-6 text-[#1E3A8A] dark:text-[#40E0D0] group-hover:text-[#1E3A8A]" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50">
              <CheckCircle2 className="w-5 h-5 text-[#40E0D0] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Bilingual Support</h4>
                <p className="text-sm text-muted-foreground">
                  Full support in both English and Vietnamese throughout the process.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50">
              <CheckCircle2 className="w-5 h-5 text-[#40E0D0] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Document Storage</h4>
                <p className="text-sm text-muted-foreground">
                  Secure digital storage of all your tax documents for 5 years.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50">
              <CheckCircle2 className="w-5 h-5 text-[#40E0D0] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Audit Support</h4>
                <p className="text-sm text-muted-foreground">
                  Representation and support in case of tax authority audits or inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process/Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              Our Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">How It Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A streamlined 6-step process designed to minimize your effort while ensuring complete accuracy.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

              {/* Steps */}
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <div
                    key={step.step}
                    className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <Card className="border-border/50 hover:border-[#40E0D0]/30 transition-colors inline-block w-full md:w-auto">
                        <CardHeader>
                          <div className={`flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                            <Badge className="gradient-secondary text-[#1E3A8A]">
                              Step {step.step}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {step.duration}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {step.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </div>

                    {/* Icon Circle */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-lg z-10">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>

            {/* Total Time */}
            <div className="mt-12 text-center">
              <Card className="inline-block border-[#40E0D0]/30 bg-[#40E0D0]/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-[#40E0D0]" />
                    <div className="text-left">
                      <p className="font-semibold">Standard Processing Time</p>
                      <p className="text-sm text-muted-foreground">7-10 business days from document submission</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-[#1E3A8A]/30 text-[#1E3A8A] dark:text-[#40E0D0]">
              Transparent Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Pricing Plans</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Clear, upfront pricing with no hidden fees. Final quote provided after initial consultation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.title}
                className={`relative border-border/50 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-[#40E0D0]/50 shadow-lg shadow-[#40E0D0]/10'
                    : 'hover:border-[#40E0D0]/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-secondary text-[#1E3A8A] font-medium">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl mb-1">{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#40E0D0] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full mt-6 ${
                      plan.popular
                        ? 'gradient-primary text-white btn-premium'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <Link href="#contact">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Note */}
          <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
            * Final pricing depends on complexity of your case, number of employers, and additional
            services required. All prices include government filing fees. Contact us for a personalized quote.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common questions about PIT finalization for foreigners in Vietnam.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border/50 px-4"
                >
                  <AccordionTrigger className="text-left hover:text-[#40E0D0] transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* More Questions */}
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">
              Still have questions? We&apos;re here to help.
            </p>
            <Button asChild variant="outline" className="gap-2">
              <Link href="#contact">
                <Phone className="w-4 h-4" />
                Contact Our Team
              </Link>
            </Button>
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
              Ready to Finalize Your PIT?
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Let our experts handle your PIT finalization with precision and care.
              Book a free consultation today and ensure your tax matters are in perfect order.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E3A8A] hover:bg-white/90 font-medium px-8 py-6 text-lg group btn-premium"
              >
                <Link href="mailto:contact@vietpit.vn">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#1E3A8A] px-8 py-6 text-lg font-semibold transition-all duration-300"
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
