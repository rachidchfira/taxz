'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  PlaneTakeoff,
  Calendar,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileCheck,
  ArrowRight,
  Download,
  Shield,
  AlertCircle,
  BookOpen,
  Building2,
  CreditCard,
  Timer,
  ChevronRight,
  ExternalLink,
  Gavel,
  FileWarning,
  Stamp,
  Send,
  Receipt,
  CheckCheck,
  Calculator,
  Phone
} from 'lucide-react'

const documentChecklist = [
  { id: 'passport', label: 'Passport (bio page and visa pages)', required: true, category: 'Identity' },
  { id: 'work_permit', label: 'Work Permit or Labor Contract', required: true, category: 'Employment' },
  { id: 'pit_withholding', label: 'PIT Withholding Certificates (all employers)', required: true, category: 'Tax' },
  { id: 'payslips', label: 'Payslips / Payroll Summaries', required: true, category: 'Income' },
  { id: 'residence_permit', label: 'Temporary Residence Card (if applicable)', required: false, category: 'Identity' },
  { id: 'dependant_docs', label: 'Dependant Documents (birth certificates, marriage cert)', required: false, category: 'Dependants' },
  { id: 'insurance_records', label: 'Social Insurance Contribution Records', required: false, category: 'Insurance' },
  { id: 'lease_agreement', label: 'Lease Agreement (for residency proof)', required: false, category: 'Residency' },
  { id: 'bank_statements', label: 'Bank Statements (for income verification)', required: false, category: 'Income' },
  { id: 'tax_regist', label: 'Tax Registration Certificate', required: false, category: 'Tax' },
]

const timelineSteps = [
  {
    step: 1,
    title: 'Document Collection',
    description: 'Gather all required income and residency documents from your employers and personal records.',
    days: '1-3 days',
    icon: FileText,
    details: ['PIT withholding certificates', 'Payslips and payroll records', 'Passport and visa copies']
  },
  {
    step: 2,
    title: 'Submit to Advisor',
    description: 'Upload documents through our secure portal for initial review and assessment.',
    days: '1 day',
    icon: Send,
    details: ['Secure document upload', 'Initial compliance check', 'Gap analysis report']
  },
  {
    step: 3,
    title: 'Tax Calculation',
    description: 'Our experts calculate your tax position, identify deductions, and optimize your finalization.',
    days: '2-5 days',
    icon: Calculator,
    details: ['Full year income analysis', 'Deduction optimization', 'Tax bracket calculation']
  },
  {
    step: 4,
    title: 'Review & Approval',
    description: 'Review the calculated tax position and approve the finalization for filing.',
    days: '1-2 days',
    icon: CheckCircle2,
    details: ['Detailed calculation report', 'Refund/payment summary', 'Your final approval']
  },
  {
    step: 5,
    title: 'File with Authority',
    description: 'Submit the finalization declaration to the local tax department on your behalf.',
    days: '1-2 days',
    icon: Stamp,
    details: ['Official submission', 'Tax department liaison', 'Filing confirmation']
  },
  {
    step: 6,
    title: 'Receive Clearance',
    description: 'Obtain tax clearance certificate and final confirmation of compliance.',
    days: '1-3 days',
    icon: Receipt,
    details: ['Tax clearance receipt', 'Filing acknowledgment', 'Complete documentation']
  },
]

const pricingTiers = [
  {
    name: 'Standard Departure',
    price: '3,500,000',
    priceNote: 'VND',
    description: 'Single employer, straightforward case',
    features: [
      'Single employer income',
      'Standard deductions',
      'Basic document review',
      'Tax filing submission',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Comprehensive',
    price: '5,500,000',
    priceNote: 'VND',
    description: 'Multiple employers or complex income',
    features: [
      'Multiple employer income',
      'Full deduction optimization',
      'Priority processing',
      'Tax filing submission',
      'Phone & email support',
      'Post-filing assistance'
    ],
    popular: true
  },
  {
    name: 'Urgent Service',
    price: '8,500,000',
    priceNote: 'VND',
    description: 'Expedited processing for imminent departure',
    features: [
      'Same-day document review',
      'Express tax calculation',
      '24-hour processing priority',
      'Direct tax office liaison',
      'Dedicated support line',
      'Airport document delivery'
    ],
    popular: false
  }
]

const whyMandatory = [
  {
    icon: Gavel,
    title: 'Legal Requirement',
    description: 'Circular 111/2013/TT-BTC mandates that all resident foreigners must finalize their PIT before departing Vietnam.',
    citation: 'Article 26, Circular 111/2013/TT-BTC'
  },
  {
    icon: FileWarning,
    title: 'Visa & Entry Impact',
    description: 'Non-compliance may affect future visa applications, work permits, or re-entry to Vietnam.',
    citation: 'Tax clearance may be required for future immigration'
  },
  {
    icon: Shield,
    title: 'Financial Penalties',
    description: 'Late filing or non-compliance can result in administrative penalties and interest charges.',
    citation: 'Up to 3x the tax amount in penalties'
  },
  {
    icon: CheckCheck,
    title: 'Clean Record',
    description: 'Proper finalization ensures a clean tax record and smooth departure from Vietnam.',
    citation: 'Required for tax residency clearance'
  }
]

export default function LeavingVietnamPage() {
  const [departureDate, setDepartureDate] = useState('')
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])

  const daysUntil = useMemo(() => {
    if (!departureDate) return null
    const departure = new Date(departureDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    departure.setHours(0, 0, 0, 0)
    return Math.ceil((departure.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }, [departureDate])

  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const requiredDocs = documentChecklist.filter(d => d.required)
  const completedRequired = checkedDocs.filter(id => documentChecklist.find(d => d.id === id && d.required)).length
  const totalRequired = requiredDocs.length
  const progressPercent = (completedRequired / totalRequired) * 100

  const getUrgencyLevel = () => {
    if (daysUntil === null) return null
    if (daysUntil < 7) return 'critical'
    if (daysUntil < 14) return 'urgent'
    if (daysUntil < 30) return 'moderate'
    return 'normal'
  }

  const urgencyLevel = getUrgencyLevel()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Urgency Messaging */}
      <section className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A] to-[#4169E1] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 rounded-full px-4 py-2 mb-6">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-200">Mandatory Requirement — Do Not Depart Without It</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Leaving Vietnam Tax Finalization
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Complete your mandatory PIT finalization before departure. 
              <span className="text-[#40E0D0] font-semibold"> Fast, compliant, stress-free.</span>
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-[#40E0D0]">7-14</div>
                <div className="text-sm text-blue-200">Days Process</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-[#40E0D0]">100%</div>
                <div className="text-sm text-blue-200">Compliance</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-[#40E0D0]">500+</div>
                <div className="text-sm text-blue-200">Cases Handled</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-semibold px-8 py-6 text-lg btn-premium">
                <a href="#calculator">
                  <Timer className="w-5 h-5 mr-2" />
                  Check Your Deadline
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#1E3A8A] px-8 py-6 text-lg font-semibold transition-all duration-300">
                <a href="#pricing">
                  <CreditCard className="w-5 h-5 mr-2" />
                  View Pricing
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="py-6 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <Alert className="border-orange-500/50 bg-orange-50 dark:bg-orange-950/20 max-w-4xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <AlertTitle className="text-orange-700 dark:text-orange-400 text-lg">Legal Requirement Notice</AlertTitle>
            <AlertDescription className="text-orange-600 dark:text-orange-300">
              Under <strong>Circular 111/2013/TT-BTC</strong>, resident foreigners must finalize their Personal Income Tax 
              <strong className="text-orange-700 dark:text-orange-400"> before departure from Vietnam</strong>. 
              Failure to do so may result in complications with future visa applications, work permits, or re-entry to Vietnam, 
              and may incur administrative penalties.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Why This Is Mandatory Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              <Gavel className="w-3 h-3 mr-1" />
              Legal Basis
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Why Finalization Is Mandatory
            </h2>
            <p className="text-lg text-muted-foreground">
              Vietnamese tax law requires all resident foreigners to complete PIT finalization 
              before leaving the country. Here&apos;s what you need to know.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyMandatory.map((item, index) => (
              <Card key={index} className="relative overflow-hidden card-hover">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-[#1E3A8A]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="text-xs text-[#40E0D0] font-medium bg-[#40E0D0]/10 px-2 py-1 rounded">
                    {item.citation}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Legal Source Citation */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="border-[#40E0D0]/30 bg-gradient-to-r from-[#40E0D0]/5 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="official-badge mb-2">
                      <FileText className="w-3 h-3" />
                      <span>Official Legal Source</span>
                    </div>
                    <h4 className="font-semibold mb-2">Circular 111/2013/TT-BTC, Article 26</h4>
                    <p className="text-sm text-muted-foreground italic">
                      &ldquo;For resident foreigners who terminate their employment contract and leave Vietnam, 
                      the finalization of personal income tax shall be carried out before their departure.&rdquo;
                    </p>
                    <a 
                      href="https://vbpl.vn" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#40E0D0] hover:underline mt-3"
                    >
                      View on vbpl.vn
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline/Process Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              <Clock className="w-3 h-3 mr-1" />
              Step-by-Step Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Your Finalization Timeline
            </h2>
            <p className="text-lg text-muted-foreground">
              Complete your tax finalization in 6 simple steps. Typical process takes 7-14 days before departure.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#40E0D0] via-[#1E3A8A] to-[#40E0D0] hidden md:block" />
              
              <div className="space-y-6 md:space-y-8">
                {timelineSteps.map((item, index) => (
                  <div key={item.step} className="relative flex flex-col md:flex-row gap-4 md:gap-8">
                    {/* Step Number */}
                    <div className="flex md:flex-col items-center gap-4 md:gap-2 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#4169E1] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {item.step}
                      </div>
                      <Badge variant="secondary" className="md:self-center whitespace-nowrap">
                        {item.days}
                      </Badge>
                    </div>
                    
                    {/* Content Card */}
                    <Card className="flex-1 card-hover">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-5 h-5 text-[#40E0D0]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {item.details.map((detail, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {detail}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Document Checklist & Departure Calculator */}
      <section id="calculator" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              <FileCheck className="w-3 h-3 mr-1" />
              Preparation Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Prepare Your Finalization
            </h2>
            <p className="text-lg text-muted-foreground">
              Check your departure timeline and track your document collection progress.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Departure Date Calculator */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#40E0D0]" />
                    Departure Timeline Calculator
                  </CardTitle>
                  <CardDescription>
                    Enter your departure date to see how much time you have
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate" className="font-medium">Your Planned Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="text-base"
                    />
                  </div>

                  {daysUntil !== null && (
                    <div className={`p-6 rounded-xl transition-all ${
                      urgencyLevel === 'critical' 
                        ? 'bg-red-50 dark:bg-red-950/30 border-2 border-red-500' 
                        : urgencyLevel === 'urgent'
                          ? 'bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-500'
                          : urgencyLevel === 'moderate'
                            ? 'bg-yellow-50 dark:bg-yellow-950/30 border-2 border-yellow-500'
                            : 'bg-[#40E0D0]/10 border-2 border-[#40E0D0]'
                    }`}>
                      <div className="text-center">
                        <p className={`text-5xl font-bold ${
                          urgencyLevel === 'critical' 
                            ? 'text-red-600' 
                            : urgencyLevel === 'urgent'
                              ? 'text-orange-600'
                              : urgencyLevel === 'moderate'
                                ? 'text-yellow-600'
                                : 'text-[#1E3A8A]'
                        }`}>
                          {daysUntil > 0 ? daysUntil : 0}
                        </p>
                        <p className="text-muted-foreground text-lg">days until departure</p>
                      </div>
                      
                      {urgencyLevel === 'critical' && daysUntil > 0 && (
                        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
                          <p className="text-red-700 dark:text-red-300 text-sm font-medium flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Critical: Start finalization immediately!
                          </p>
                          <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                            You need urgent processing to complete before departure.
                          </p>
                        </div>
                      )}
                      
                      {urgencyLevel === 'urgent' && (
                        <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                          <p className="text-orange-700 dark:text-orange-300 text-sm font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Urgent: Start finalization this week
                          </p>
                        </div>
                      )}
                      
                      {urgencyLevel === 'moderate' && (
                        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                          <p className="text-yellow-700 dark:text-yellow-300 text-sm font-medium flex items-center gap-2">
                            <Timer className="w-4 h-4" />
                            Recommended: Begin process soon
                          </p>
                        </div>
                      )}
                      
                      {urgencyLevel === 'normal' && (
                        <div className="mt-4 p-3 bg-[#40E0D0]/20 rounded-lg">
                          <p className="text-[#1E3A8A] dark:text-[#40E0D0] text-sm font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Good timeframe for standard processing
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <Button 
                    asChild 
                    className={`w-full font-semibold ${
                      urgencyLevel === 'critical' || urgencyLevel === 'urgent'
                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                        : 'bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]'
                    }`}
                  >
                    <a href="#contact">
                      {urgencyLevel === 'critical' || urgencyLevel === 'urgent' 
                        ? 'Start Urgent Finalization' 
                        : 'Start Standard Finalization'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-[#1E3A8A] text-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#40E0D0]" />
                    Key Requirements
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mt-0.5 flex-shrink-0" />
                      <span>Finalize PIT before leaving Vietnam</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mt-0.5 flex-shrink-0" />
                      <span>Include all employers&apos; income</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mt-0.5 flex-shrink-0" />
                      <span>Claim all eligible deductions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mt-0.5 flex-shrink-0" />
                      <span>Receive official tax clearance receipt</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Document Checklist */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-[#40E0D0]" />
                    Document Checklist
                  </CardTitle>
                  <CardDescription>
                    Track your document collection progress. Required documents must be submitted.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Required Documents Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {completedRequired} of {totalRequired} completed
                      </span>
                    </div>
                    <Progress 
                      value={progressPercent} 
                      className={`h-3 ${
                        progressPercent === 100 ? '[&>div]:bg-green-500' : '[&>div]:bg-[#40E0D0]'
                      }`}
                    />
                    {progressPercent === 100 && (
                      <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        All required documents ready!
                      </p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  {/* Checklist by Category */}
                  <div className="space-y-6">
                    {['Identity', 'Employment', 'Income', 'Tax', 'Residency', 'Dependants', 'Insurance'].map(category => {
                      const categoryDocs = documentChecklist.filter(d => d.category === category)
                      if (categoryDocs.length === 0) return null
                      
                      return (
                        <div key={category}>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">{category}</h4>
                          <div className="space-y-3">
                            {categoryDocs.map((doc) => (
                              <div 
                                key={doc.id} 
                                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                                  checkedDocs.includes(doc.id) 
                                    ? 'bg-green-50 dark:bg-green-950/20' 
                                    : 'bg-muted/50'
                                }`}
                              >
                                <Checkbox
                                  id={doc.id}
                                  checked={checkedDocs.includes(doc.id)}
                                  onCheckedChange={() => toggleDoc(doc.id)}
                                  className="mt-0.5"
                                />
                                <Label 
                                  htmlFor={doc.id} 
                                  className={`font-normal cursor-pointer flex-1 ${
                                    checkedDocs.includes(doc.id) 
                                      ? 'line-through text-muted-foreground' 
                                      : ''
                                  }`}
                                >
                                  {doc.label}
                                </Label>
                                {doc.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    Required
                                  </Badge>
                                )}
                                {!doc.required && (
                                  <Badge variant="outline" className="text-xs">
                                    Optional
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button asChild className="flex-1 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
                      <a href="#contact">
                        <Download className="w-4 h-4 mr-2" />
                        Download Full Checklist PDF
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 border-[#40E0D0] text-[#40E0D0] hover:bg-[#40E0D0]/10">
                      <a href="#contact">
                        Submit Documents
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              <CreditCard className="w-3 h-3 mr-1" />
              Transparent Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Departure Finalization Packages
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the package that fits your situation. All packages include full compliance guarantee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden card-hover ${
                  tier.popular 
                    ? 'border-2 border-[#40E0D0] shadow-lg shadow-[#40E0D0]/20' 
                    : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-[#40E0D0] text-[#1E3A8A] text-xs font-bold text-center py-1">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader className={tier.popular ? 'pt-8' : ''}>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                    <span className="text-muted-foreground ml-1">{tier.priceNote}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]' 
                        : 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white'
                    }`}
                  >
                    <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                      Contact via ZALO
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Need a custom solution? We handle complex multi-year cases, DTA claims, and refund situations.
            </p>
            <Button asChild variant="outline" className="border-[#40E0D0] text-[#40E0D0] hover:bg-[#40E0D0]/10">
              <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                Request Custom Quote
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Urgency CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A] to-[#4169E1] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 rounded-full px-4 py-2 mb-6">
              <Timer className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-200">Don&apos;t Wait Until It&apos;s Too Late</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Start Your Finalization Today
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              The earlier you start, the smoother your departure. Our team is ready to help you 
              complete your mandatory PIT finalization before you leave Vietnam.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-[#40E0D0]" />
                  <span className="font-medium">Call Us</span>
                </div>
                <p className="text-sm text-blue-200">ZALO: +84703027485</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-[#40E0D0]" />
                  <span className="font-medium">Email</span>
                </div>
                <p className="text-sm text-blue-200">tax@vietpit.vn</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-[#40E0D0]" />
                  <span className="font-medium">Office</span>
                </div>
                <p className="text-sm text-blue-200">HCMC & Hanoi</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-semibold px-8 py-6 text-lg btn-premium">
                <Link href="/#contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                <a href="https://zalo.me/84703027485">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: ZALO: +84703027485
                </a>
              </Button>
            </div>

            <p className="text-sm text-blue-200 mt-8">
              Average response time: &lt; 2 hours during business hours
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
