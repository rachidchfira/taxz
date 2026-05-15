'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import {
  MapPin,
  Calendar,
  Home,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Clock,
  FileText,
  Users,
  Globe,
  Calculator,
  TrendingUp,
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Scale,
  Building2,
  UserCheck,
  Percent,
  Wallet,
  RefreshCw
} from 'lucide-react'

interface ResidencyResult {
  status: 'resident' | 'non_resident' | 'uncertain'
  daysInVietnam: number
  method: string
  recommendations: string[]
  nextSteps: string[]
}

export default function TaxResidencyPage() {
  const [step, setStep] = useState(1)
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [daysInVietnam, setDaysInVietnam] = useState('')
  const [hasRegularResidence, setHasRegularResidence] = useState(false)
  const [residenceType, setResidenceType] = useState('')
  const [leaseStartDate, setLeaseStartDate] = useState('')
  const [leaseEndDate, setLeaseEndDate] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<ResidencyResult | null>(null)

  const calculateDays = () => {
    if (arrivalDate && departureDate) {
      const arrival = new Date(arrivalDate)
      const departure = new Date(departureDate)
      const diffTime = Math.abs(departure.getTime() - arrival.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      setDaysInVietnam(diffDays.toString())
    }
  }

  const assessResidency = () => {
    const days = parseInt(daysInVietnam) || 0
    let status: 'resident' | 'non_resident' | 'uncertain' = 'uncertain'
    let method = ''
    const recommendations: string[] = []
    const nextSteps: string[] = []

    if (days >= 183) {
      status = 'resident'
      method = `183-day rule: ${days} days in Vietnam (≥183 days)`
      recommendations.push('You qualify as a tax resident under the 183-day rule.')
      recommendations.push('You are taxable on worldwide income at progressive rates (5-35%).')
      recommendations.push('You are eligible for family circumstance deductions.')
      recommendations.push('You must file annual PIT finalization.')
    } else if (hasRegularResidence && residenceType) {
      status = 'resident'
      method = 'Regular residence in Vietnam'
      recommendations.push('You qualify as a tax resident through regular residence.')
      recommendations.push('Your leased/owned property establishes tax residency.')
      recommendations.push('You are taxable on worldwide income at progressive rates.')
    } else {
      status = 'non_resident'
      method = `Did not meet 183-day rule (${days} days) and no regular residence`
      recommendations.push('You are classified as a non-resident for tax purposes.')
      recommendations.push('You are taxed only on Vietnam-source income at 20% flat rate.')
      recommendations.push('No family circumstance deductions are available.')
      recommendations.push('PIT is typically withheld at source by your employer.')
    }

    if (status === 'resident') {
      nextSteps.push('Gather all income documents from Vietnam employers')
      nextSteps.push('Collect proof of days in Vietnam (entry/exit stamps, flight records)')
      nextSteps.push('Prepare dependant documentation if applicable')
      nextSteps.push('Calculate your tax liability using our PIT Calculator')
      nextSteps.push('Schedule a consultation for professional tax finalization')
    } else {
      nextSteps.push('Verify your days count with passport stamps')
      nextSteps.push('Check if you have regular residence that could qualify you')
      nextSteps.push('Review your Vietnam-source income for proper withholding')
      nextSteps.push('Consider tax implications for your specific situation')
    }

    setResult({ status, daysInVietnam: days, method, recommendations, nextSteps })
    setShowResult(true)
    setStep(3)
  }

  const reset = () => {
    setStep(1)
    setArrivalDate('')
    setDepartureDate('')
    setDaysInVietnam('')
    setHasRegularResidence(false)
    setResidenceType('')
    setLeaseStartDate('')
    setLeaseEndDate('')
    setShowResult(false)
    setResult(null)
  }

  const progressValue = step === 1 ? 33 : step === 2 ? 66 : 100

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_1px_1px,rgba(30,58,138,0.15)_1px,transparent_0)] bg-[size:40px_40px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">Tax Residency Assessment</span>
            </div>

            <Badge variant="outline" className="mb-6 border-[#40E0D0]/30 text-[#40E0D0] text-sm px-4 py-1">
              <MapPin className="w-4 h-4 mr-2" />
              Professional Assessment Service
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Tax Residency</span> Assessment
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Your tax residency status determines your tax rates, deductions, and filing obligations in Vietnam. 
              Use our interactive assessment tool to understand your status and plan accordingly.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-[#40E0D0]" />
                <span>5-minute assessment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-[#40E0D0]" />
                <span>Based on official regulations</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4 text-[#40E0D0]" />
                <span>Instant results</span>
              </div>
            </div>

            <Button asChild size="lg" className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
              <a href="#assessment">
                Start Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Residency Matters Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-[#1E3A8A]/30 text-[#1E3A8A]">
              <AlertCircle className="w-3 h-3 mr-1" />
              Important
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Why Tax Residency Matters
            </h2>
            <p className="text-lg text-muted-foreground">
              Your residency status has significant implications on your tax obligations in Vietnam
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="card-hover border-[#40E0D0]/20">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#40E0D0]/10 flex items-center justify-center mx-auto mb-4">
                  <Percent className="w-6 h-6 text-[#40E0D0]" />
                </div>
                <h3 className="font-semibold mb-2">Tax Rates</h3>
                <p className="text-sm text-muted-foreground">
                  Residents: 5-35% progressive rates<br/>
                  Non-residents: 20% flat rate
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-[#40E0D0]/20">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#40E0D0]/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-[#40E0D0]" />
                </div>
                <h3 className="font-semibold mb-2">Income Scope</h3>
                <p className="text-sm text-muted-foreground">
                  Residents: Worldwide income<br/>
                  Non-residents: Vietnam-source only
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-[#40E0D0]/20">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#40E0D0]/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#40E0D0]" />
                </div>
                <h3 className="font-semibold mb-2">Deductions</h3>
                <p className="text-sm text-muted-foreground">
                  Residents: Family deductions apply<br/>
                  Non-residents: No deductions
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-[#40E0D0]/20">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#40E0D0]/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-[#40E0D0]" />
                </div>
                <h3 className="font-semibold mb-2">Filing Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  Residents: Annual finalization<br/>
                  Non-residents: Withheld at source
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Assessment Section */}
      <section id="assessment" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              <Calculator className="w-3 h-3 mr-1" />
              Interactive Tool
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Residency Assessment Wizard
            </h2>
            <p className="text-lg text-muted-foreground">
              Answer a few questions to determine your tax residency status in Vietnam
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Assessment Card */}
              <div className="lg:col-span-2">
                <Card className="border-[#1E3A8A]/20">
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-[#40E0D0]" />
                          Assessment Tool
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Step {step} of 3 - {step === 1 ? '183-Day Rule Check' : step === 2 ? 'Regular Residence' : 'Results'}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="font-mono">
                        {Math.round(progressValue)}%
                      </Badge>
                    </div>
                    <Progress value={progressValue} className="h-2 mt-4" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Step 1: Days in Vietnam */}
                    {step === 1 && !showResult && (
                      <div className="space-y-6">
                        <Alert className="border-[#40E0D0]/30 bg-[#40E0D0]/5">
                          <Calendar className="w-4 h-4 text-[#40E0D0]" />
                          <AlertTitle className="text-[#1E3A8A]">183-Day Rule</AlertTitle>
                          <AlertDescription>
                            If you spend 183 or more days in Vietnam within a calendar year or 12 consecutive months 
                            from first arrival, you are considered a tax resident under Vietnamese law.
                          </AlertDescription>
                        </Alert>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="arrivalDate" className="text-sm font-medium">
                              First Arrival Date in Vietnam
                            </Label>
                            <Input
                              id="arrivalDate"
                              type="date"
                              value={arrivalDate}
                              onChange={(e) => {
                                setArrivalDate(e.target.value)
                                calculateDays()
                              }}
                              className="border-[#1E3A8A]/20"
                            />
                            <p className="text-xs text-muted-foreground">Your first entry date into Vietnam</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="departureDate" className="text-sm font-medium">
                              Last Date in Period
                            </Label>
                            <Input
                              id="departureDate"
                              type="date"
                              value={departureDate}
                              onChange={(e) => {
                                setDepartureDate(e.target.value)
                                calculateDays()
                              }}
                              className="border-[#1E3A8A]/20"
                            />
                            <p className="text-xs text-muted-foreground">End of assessment period</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="daysInVietnam" className="text-sm font-medium">
                            Total Days in Vietnam
                          </Label>
                          <Input
                            id="daysInVietnam"
                            type="number"
                            placeholder="Enter total days count"
                            value={daysInVietnam}
                            onChange={(e) => setDaysInVietnam(e.target.value)}
                            className="border-[#1E3A8A]/20"
                          />
                          <p className="text-xs text-muted-foreground">
                            Count all days physically present in Vietnam, including arrival and departure days.
                            Check your passport stamps for accurate count.
                          </p>
                        </div>

                        {daysInVietnam && parseInt(daysInVietnam) >= 183 && (
                          <Alert className="border-green-500/30 bg-green-500/5">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <AlertTitle className="text-green-700 dark:text-green-400">183-Day Threshold Met</AlertTitle>
                            <AlertDescription>
                              Based on {daysInVietnam} days, you meet the 183-day rule for tax residency.
                            </AlertDescription>
                          </Alert>
                        )}

                        <Button 
                          onClick={() => setStep(2)} 
                          className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white"
                          disabled={!daysInVietnam}
                        >
                          Continue to Step 2
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}

                    {/* Step 2: Regular Residence */}
                    {step === 2 && !showResult && (
                      <div className="space-y-6">
                        <Alert className="border-[#40E0D0]/30 bg-[#40E0D0]/5">
                          <Home className="w-4 h-4 text-[#40E0D0]" />
                          <AlertTitle className="text-[#1E3A8A]">Regular Residence Test</AlertTitle>
                          <AlertDescription>
                            Even if you don't meet the 183-day threshold, having "regular residence" 
                            (permanent residence or a leased property with 183+ days term) can qualify you as a tax resident.
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-3 p-4 rounded-lg border border-[#1E3A8A]/10 hover:border-[#40E0D0]/30 transition-colors">
                            <Checkbox
                              id="hasResidence"
                              checked={hasRegularResidence}
                              onCheckedChange={(checked) => setHasRegularResidence(checked as boolean)}
                              className="mt-1"
                            />
                            <div className="space-y-1">
                              <Label htmlFor="hasResidence" className="font-medium cursor-pointer">
                                I have regular residence in Vietnam
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                This includes rented property with lease term of 183+ days, or owned property as permanent residence
                              </p>
                            </div>
                          </div>

                          {hasRegularResidence && (
                            <div className="space-y-4 pl-6 border-l-2 border-[#40E0D0] ml-2">
                              <div className="space-y-3">
                                <Label className="text-sm font-medium">Residence Type</Label>
                                <RadioGroup value={residenceType} onValueChange={setResidenceType}>
                                  <div className="flex items-start space-x-3 p-3 rounded-lg border border-[#1E3A8A]/10 hover:border-[#40E0D0]/30 transition-colors">
                                    <RadioGroupItem value="rented" id="rented" className="mt-0.5" />
                                    <div className="space-y-1">
                                      <Label htmlFor="rented" className="font-medium cursor-pointer">
                                        Rented Property
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        Lease agreement with term of 183 days or more
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-3 p-3 rounded-lg border border-[#1E3A8A]/10 hover:border-[#40E0D0]/30 transition-colors">
                                    <RadioGroupItem value="owned" id="owned" className="mt-0.5" />
                                    <div className="space-y-1">
                                      <Label htmlFor="owned" className="font-medium cursor-pointer">
                                        Owned Property
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        Permanent residence registered in Vietnam
                                      </p>
                                    </div>
                                  </div>
                                </RadioGroup>
                              </div>

                              {residenceType === 'rented' && (
                                <div className="grid sm:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="leaseStart" className="text-sm font-medium">
                                      Lease Start Date
                                    </Label>
                                    <Input
                                      id="leaseStart"
                                      type="date"
                                      value={leaseStartDate}
                                      onChange={(e) => setLeaseStartDate(e.target.value)}
                                      className="border-[#1E3A8A]/20"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="leaseEnd" className="text-sm font-medium">
                                      Lease End Date
                                    </Label>
                                    <Input
                                      id="leaseEnd"
                                      type="date"
                                      value={leaseEndDate}
                                      onChange={(e) => setLeaseEndDate(e.target.value)}
                                      className="border-[#1E3A8A]/20"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-4">
                          <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                          </Button>
                          <Button 
                            onClick={assessResidency} 
                            className="flex-1 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white"
                          >
                            Get Assessment
                            <CheckCircle2 className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Results */}
                    {step === 3 && showResult && result && (
                      <div className="space-y-6">
                        {/* Status Badge */}
                        <div className={`p-6 rounded-xl ${
                          result.status === 'resident' 
                            ? 'bg-gradient-to-r from-[#40E0D0]/10 to-[#40E0D0]/5 border border-[#40E0D0]/30' 
                            : 'bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/30'
                        }`}>
                          <div className="flex items-center gap-4">
                            {result.status === 'resident' ? (
                              <div className="w-16 h-16 rounded-full bg-[#40E0D0]/20 flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-[#40E0D0]" />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                                <XCircle className="w-8 h-8 text-orange-500" />
                              </div>
                            )}
                            <div>
                              <Badge className={`mb-2 ${result.status === 'resident' ? 'bg-[#40E0D0] text-[#1E3A8A]' : 'bg-orange-500 text-white'}`}>
                                {result.status === 'resident' ? 'TAX RESIDENT' : 'NON-RESIDENT'}
                              </Badge>
                              <h3 className="text-xl font-bold">
                                {result.status === 'resident' 
                                  ? 'You qualify as a Vietnam tax resident' 
                                  : 'You are classified as a non-resident'}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{result.method}</p>
                            </div>
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div className="space-y-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[#40E0D0]" />
                            What This Means
                          </h4>
                          <div className="space-y-2">
                            {result.recommendations.map((rec, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Next Steps */}
                        <div className="space-y-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#40E0D0]" />
                            Recommended Next Steps
                          </h4>
                          <div className="space-y-2">
                            {result.nextSteps.map((nextStep, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-[#1E3A8A]/10">
                                <ArrowRight className="w-4 h-4 text-[#1E3A8A] mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{nextStep}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Legal Basis */}
                        <Alert className="border-[#1E3A8A]/20 bg-[#1E3A8A]/5">
                          <Scale className="w-4 h-4 text-[#1E3A8A]" />
                          <AlertTitle>Legal Basis</AlertTitle>
                          <AlertDescription>
                            Residency determination is based on the PIT Law (Consolidated Law No. 04/2012/QH13) 
                            and Circular 111/2013/TT-BTC. Source: 
                            <a href="https://vbpl.vn" target="_blank" rel="noopener noreferrer" className="text-[#40E0D0] hover:underline ml-1">
                              vbpl.vn <ExternalLink className="w-3 h-3 inline" />
                            </a>
                          </AlertDescription>
                        </Alert>

                        <div className="flex gap-4">
                          <Button variant="outline" onClick={reset} className="flex-1">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Start Over
                          </Button>
                          <Button asChild className="flex-1 bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]">
                            <a href="#contact">
                              Get Expert Review
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Info Panel */}
              <div className="space-y-6">
                {/* Quick Facts */}
                <Card className="gradient-primary text-white border-0">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Residency Quick Facts
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-[#40E0D0]" />
                        </div>
                        <div>
                          <p className="font-medium">183-Day Rule</p>
                          <p className="text-white/70">Present in Vietnam for 183+ days in a calendar year or 12-month period</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <Home className="w-4 h-4 text-[#40E0D0]" />
                        </div>
                        <div>
                          <p className="font-medium">Regular Residence</p>
                          <p className="text-white/70">Permanent residence or leased property with 183+ day term</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <UserCheck className="w-4 h-4 text-[#40E0D0]" />
                        </div>
                        <div>
                          <p className="font-medium">Why It Matters</p>
                          <p className="text-white/70">Affects tax rates, deductions, and worldwide income taxation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison */}
                <Card className="border-[#1E3A8A]/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#40E0D0]" />
                      Resident vs Non-Resident
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-lg bg-[#40E0D0]/10 border border-[#40E0D0]/20">
                        <p className="font-semibold text-[#40E0D0]">Resident</p>
                        <p className="text-xs text-muted-foreground mt-1">5-35% progressive rates</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted border">
                        <p className="font-semibold">Non-Resident</p>
                        <p className="text-xs text-muted-foreground mt-1">20% flat rate</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-[#40E0D0]" />
                        <span>Residents: Worldwide income taxed</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-[#40E0D0]" />
                        <span>Residents: Family deductions apply</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <XCircle className="w-3 h-3 text-orange-500" />
                        <span>Non-residents: Vietnam income only</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <XCircle className="w-3 h-3 text-orange-500" />
                        <span>Non-residents: No deductions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Need Help */}
                <Card className="border-[#40E0D0]/20 bg-[#40E0D0]/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Wallet className="w-10 h-10 text-[#40E0D0] mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Need Expert Help?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our tax specialists can provide detailed analysis and filing assistance
                      </p>
                      <Button asChild className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
                        <a href="#contact">
                          Book Consultation
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-[#1E3A8A]/30 text-[#1E3A8A]">
              <Scale className="w-3 h-3 mr-1" />
              Detailed Comparison
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Resident vs Non-Resident Implications
            </h2>
            <p className="text-lg text-muted-foreground">
              Understanding the key differences in tax treatment between residents and non-residents
            </p>
          </div>

          <Card className="max-w-5xl mx-auto overflow-hidden border-[#1E3A8A]/20">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-semibold">Aspect</th>
                    <th className="text-center p-4 font-semibold">
                      <Badge className="bg-[#40E0D0] text-[#1E3A8A]">Tax Resident</Badge>
                    </th>
                    <th className="text-center p-4 font-semibold">
                      <Badge variant="secondary">Non-Resident</Badge>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">Tax Rate</td>
                    <td className="p-4 text-center">Progressive (5% - 35%)</td>
                    <td className="p-4 text-center">Flat 20%</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">Taxable Income Scope</td>
                    <td className="p-4 text-center">Worldwide income</td>
                    <td className="p-4 text-center">Vietnam-source only</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">Family Deductions</td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <XCircle className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">Dependant Deductions</td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <XCircle className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">Insurance Deductions</td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <XCircle className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">Tax Finalization Required</td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <XCircle className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">Tax Withheld at Source</td>
                    <td className="p-4 text-center">Partial (monthly)</td>
                    <td className="p-4 text-center">Full (final tax)</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">Filing Deadline</td>
                    <td className="p-4 text-center">Within 90 days after year-end</td>
                    <td className="p-4 text-center">N/A (withheld at source)</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">DTA Treaty Benefits</td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-[#40E0D0] mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Legal Basis Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
              <FileText className="w-3 h-3 mr-1" />
              Legal References
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Legal Basis for Tax Residency
            </h2>
            <p className="text-lg text-muted-foreground">
              All assessments are based on official Vietnamese tax legislation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="card-hover border-[#1E3A8A]/20">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">PIT Law (Consolidated)</CardTitle>
                    <CardDescription>Law No. 04/2012/QH13</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The primary legislation governing Personal Income Tax in Vietnam. Article 1, Clause 2 
                  defines tax residency based on the 183-day rule and regular residence criteria.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://vbpl.vn" target="_blank" rel="noopener noreferrer">
                    View on vbpl.vn
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover border-[#1E3A8A]/20">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Circular 111/2013/TT-BTC</CardTitle>
                    <CardDescription>Ministry of Finance Guidance</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Provides detailed guidance on PIT administration, including residency determination 
                  procedures, day counting methods, and documentation requirements.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://vbpl.vn" target="_blank" rel="noopener noreferrer">
                    View on vbpl.vn
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover border-[#1E3A8A]/20">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Decree 65/2013/ND-CP</CardTitle>
                    <CardDescription>Implementation Guidance</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Provides implementing regulations for the PIT Law, including detailed rules on 
                  residency determination, tax registration, and filing procedures.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://vbpl.vn" target="_blank" rel="noopener noreferrer">
                    View on vbpl.vn
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover border-[#1E3A8A]/20">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Double Taxation Agreements</CardTitle>
                    <CardDescription>Bilateral Tax Treaties</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Vietnam has DTA treaties with 80+ countries. These can affect residency determination 
                  and provide relief from double taxation for eligible individuals.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://gdt.gov.vn" target="_blank" rel="noopener noreferrer">
                    View on gdt.gov.vn
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 lg:py-24 gradient-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">
              <Users className="w-3 h-3 mr-1" />
              Expert Assistance
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help With Your Tax Residency Status?
            </h2>

            <p className="text-lg text-white/80 mb-8">
              Our team of tax specialists can provide detailed analysis, documentation review, 
              and professional guidance for your specific situation. Don't risk incorrect tax filings 
              - get expert help today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90">
                <a href="#contact">
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#1E3A8A] font-semibold transition-all duration-300">
                <a href="#calculator">
                  Calculate Your PIT
                  <Calculator className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                <span>Expert Tax Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                <span>Official Source Backed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                <span>Confidential Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
