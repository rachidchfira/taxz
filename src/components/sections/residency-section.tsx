'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Calendar, 
  MapPin, 
  Home, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Clock,
  FileText,
  Users
} from 'lucide-react'

interface ResidencyResult {
  status: 'resident' | 'non_resident' | 'uncertain'
  daysInVietnam: number
  method: string
  recommendations: string[]
  nextSteps: string[]
}

export function ResidencySection() {
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
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysInVietnam(diffDays.toString())
    }
  }

  const assessResidency = () => {
    const days = parseInt(daysInVietnam) || 0
    let status: 'resident' | 'non_resident' | 'uncertain' = 'uncertain'
    let method = ''
    const recommendations: string[] = []
    const nextSteps: string[] = []

    // 183-day test
    if (days >= 183) {
      status = 'resident'
      method = `183-day rule: ${days} days in Vietnam (≥183 days)`
      recommendations.push('You qualify as a tax resident under the 183-day rule.')
      recommendations.push('You are taxable on worldwide income at progressive rates.')
      recommendations.push('You are eligible for family circumstance deductions.')
    } else if (hasRegularResidence && residenceType) {
      status = 'resident'
      method = 'Regular residence in Vietnam'
      recommendations.push('You qualify as a tax resident through regular residence.')
      recommendations.push('Your leased property establishes tax residency.')
    } else {
      status = 'non_resident'
      method = `Did not meet 183-day rule (${days} days) and no regular residence`
      recommendations.push('You are classified as a non-resident for tax purposes.')
      recommendations.push('You are taxed only on Vietnam-source income at 20% flat rate.')
      recommendations.push('No family deductions are available.')
    }

    // Next steps
    if (status === 'resident') {
      nextSteps.push('Gather all income documents from Vietnam employers')
      nextSteps.push('Collect proof of days in Vietnam (entry/exit stamps, flight records)')
      nextSteps.push('Prepare dependant documentation if applicable')
      nextSteps.push('Schedule a consultation for tax finalization')
    } else {
      nextSteps.push('Verify your days count with passport stamps')
      nextSteps.push('Check if you have regular residence that could qualify you')
      nextSteps.push('Consider tax implications for your specific situation')
    }

    setResult({ status, daysInVietnam: days, method, recommendations, nextSteps })
    setShowResult(true)
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

  return (
    <section id="residency" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
            <MapPin className="w-3 h-3 mr-1" />
            Tax Residency Assessment
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Determine Your Tax Residency Status
          </h2>
          <p className="text-lg text-muted-foreground">
            Your tax residency determines your tax rates, deductions, and filing obligations. 
            Use our assessment tool to understand your status.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Assessment Card */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#40E0D0]" />
                    Residency Assessment Wizard
                  </CardTitle>
                  <CardDescription>
                    Step {step} of 3 - {step === 1 ? 'Days in Vietnam' : step === 2 ? 'Regular Residence' : 'Results'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showResult ? (
                    <div className="space-y-6">
                      {/* Step 1: Days in Vietnam */}
                      {step === 1 && (
                        <div className="space-y-4">
                          <Alert className="border-[#40E0D0]/30 bg-[#40E0D0]/5">
                            <AlertCircle className="w-4 h-4 text-[#40E0D0]" />
                            <AlertTitle>183-Day Rule</AlertTitle>
                            <AlertDescription>
                              If you spend 183 or more days in Vietnam within a calendar year or 12 consecutive months 
                              from first arrival, you are considered a tax resident.
                            </AlertDescription>
                          </Alert>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="arrivalDate">First Arrival Date in Vietnam</Label>
                              <Input
                                id="arrivalDate"
                                type="date"
                                value={arrivalDate}
                                onChange={(e) => {
                                  setArrivalDate(e.target.value)
                                  calculateDays()
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="departureDate">Last Date in Period</Label>
                              <Input
                                id="departureDate"
                                type="date"
                                value={departureDate}
                                onChange={(e) => {
                                  setDepartureDate(e.target.value)
                                  calculateDays()
                                }}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="daysInVietnam">Total Days in Vietnam</Label>
                            <Input
                              id="daysInVietnam"
                              type="number"
                              placeholder="Enter days count"
                              value={daysInVietnam}
                              onChange={(e) => setDaysInVietnam(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              Count all days present in Vietnam, including arrival and departure days.
                            </p>
                          </div>

                          <Button onClick={() => setStep(2)} className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
                            Continue
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}

                      {/* Step 2: Regular Residence */}
                      {step === 2 && (
                        <div className="space-y-4">
                          <Alert className="border-[#40E0D0]/30 bg-[#40E0D0]/5">
                            <Home className="w-4 h-4 text-[#40E0D0]" />
                            <AlertTitle>Regular Residence</AlertTitle>
                            <AlertDescription>
                              Even if you don't meet the 183-day threshold, having "regular residence" 
                              (permanent residence or a leased property) can qualify you as a tax resident.
                            </AlertDescription>
                          </Alert>

                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="hasResidence"
                                checked={hasRegularResidence}
                                onCheckedChange={(checked) => setHasRegularResidence(checked as boolean)}
                              />
                              <Label htmlFor="hasResidence" className="font-normal">
                                I have regular residence in Vietnam (rented or owned property)
                              </Label>
                            </div>

                            {hasRegularResidence && (
                              <div className="space-y-4 pl-6 border-l-2 border-[#40E0D0]/30">
                                <div className="space-y-2">
                                  <Label>Residence Type</Label>
                                  <RadioGroup value={residenceType} onValueChange={setResidenceType}>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="rented" id="rented" />
                                      <Label htmlFor="rented" className="font-normal">Rented property (lease ≥ 183 days)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="owned" id="owned" />
                                      <Label htmlFor="owned" className="font-normal">Owned property (permanent residence)</Label>
                                    </div>
                                  </RadioGroup>
                                </div>

                                {residenceType === 'rented' && (
                                  <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="leaseStart">Lease Start Date</Label>
                                      <Input
                                        id="leaseStart"
                                        type="date"
                                        value={leaseStartDate}
                                        onChange={(e) => setLeaseStartDate(e.target.value)}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="leaseEnd">Lease End Date</Label>
                                      <Input
                                        id="leaseEnd"
                                        type="date"
                                        value={leaseEndDate}
                                        onChange={(e) => setLeaseEndDate(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                              Back
                            </Button>
                            <Button onClick={assessResidency} className="flex-1 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
                              Get Assessment
                              <CheckCircle2 className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Results */
                    <div className="space-y-6">
                      {/* Status Badge */}
                      <div className={`p-6 rounded-lg ${
                        result?.status === 'resident' 
                          ? 'bg-[#40E0D0]/10 border border-[#40E0D0]/30' 
                          : 'bg-orange-500/10 border border-orange-500/30'
                      }`}>
                        <div className="flex items-center gap-3 mb-4">
                          {result?.status === 'resident' ? (
                            <CheckCircle2 className="w-8 h-8 text-[#40E0D0]" />
                          ) : (
                            <XCircle className="w-8 h-8 text-orange-500" />
                          )}
                          <div>
                            <h3 className="text-xl font-bold">
                              {result?.status === 'resident' ? 'Tax Resident' : 'Non-Resident'}
                            </h3>
                            <p className="text-sm text-muted-foreground">{result?.method}</p>
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">What This Means</h4>
                        <ul className="space-y-2">
                          {result?.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Next Steps */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Recommended Next Steps</h4>
                        <ul className="space-y-2">
                          {result?.nextSteps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ArrowRight className="w-4 h-4 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Legal Basis */}
                      <Alert>
                        <FileText className="w-4 h-4" />
                        <AlertTitle>Legal Basis</AlertTitle>
                        <AlertDescription>
                          Residency determination is based on the PIT Law (Consolidated) and Circular 111/2013/TT-BTC. 
                          Source: <span className="text-[#40E0D0]">vbpl.vn</span>
                        </AlertDescription>
                      </Alert>

                      <div className="flex gap-4">
                        <Button variant="outline" onClick={reset} className="flex-1">
                          Start Over
                        </Button>
                        <Button asChild className="flex-1 bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]">
                          <a href="#contact">
                            Get Expert Review
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
              <Card className="bg-[#1E3A8A] text-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Residency Quick Facts</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#40E0D0]" />
                      <div>
                        <p className="font-medium">183-Day Rule</p>
                        <p className="text-white/70">Present in Vietnam for 183+ days in a calendar year or 12-month period</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-[#40E0D0]" />
                      <div>
                        <p className="font-medium">Regular Residence</p>
                        <p className="text-white/70">Permanent residence or leased property with term</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-[#40E0D0]" />
                      <div>
                        <p className="font-medium">Why It Matters</p>
                        <p className="text-white/70">Affects tax rates, deductions, and worldwide income taxation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparison */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Resident vs Non-Resident</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded bg-[#40E0D0]/10">
                      <p className="font-medium text-[#40E0D0]">Resident</p>
                      <p className="text-xs text-muted-foreground mt-1">5-35% progressive</p>
                    </div>
                    <div className="p-2 rounded bg-muted">
                      <p className="font-medium">Non-Resident</p>
                      <p className="text-xs text-muted-foreground mt-1">20% flat rate</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>✓ Residents: Worldwide income taxed</p>
                    <p>✓ Residents: Family deductions apply</p>
                    <p>✗ Non-residents: Vietnam income only</p>
                    <p>✗ Non-residents: No deductions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
