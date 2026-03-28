'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  PlaneTakeoff, 
  Calendar, 
  FileText, 
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Building2,
  FileCheck,
  ArrowRight,
  Download
} from 'lucide-react'

const documentChecklist = [
  { id: 'passport', label: 'Passport (bio page and visa pages)', required: true },
  { id: 'work_permit', label: 'Work Permit or Labor Contract', required: true },
  { id: 'pit_withholding', label: 'PIT Withholding Certificates (all employers)', required: true },
  { id: 'payslips', label: 'Payslips / Payroll Summaries', required: true },
  { id: 'residence_permit', label: 'Temporary Residence Card (if applicable)', required: false },
  { id: 'dependant_docs', label: 'Dependant Documents (birth certificates, marriage cert)', required: false },
  { id: 'insurance_records', label: 'Social Insurance Contribution Records', required: false },
  { id: 'lease_agreement', label: 'Lease Agreement (for residency proof)', required: false },
]

const timeline = [
  { step: 1, title: 'Gather Documents', description: 'Collect all income and residency documents', days: '1-3 days' },
  { step: 2, title: 'Submit to Advisor', description: 'Upload documents through secure portal', days: '1 day' },
  { step: 3, title: 'Calculation & Review', description: 'Tax position calculation and optimization', days: '2-5 days' },
  { step: 4, title: 'Final Approval', description: 'Review results and approve filing', days: '1 day' },
  { step: 5, title: 'File with Authority', description: 'Submit finalization to tax department', days: '1-2 days' },
  { step: 6, title: 'Receive Confirmation', description: 'Get filing receipt and clearance', days: '1 day' },
]

export function LeavingVietnamSection() {
  const [departureDate, setDepartureDate] = useState('')
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])
  const [showChecklist, setShowChecklist] = useState(false)

  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const completedDocs = checkedDocs.length
  const totalDocs = documentChecklist.length
  const progressPercent = (completedDocs / totalDocs) * 100

  const getDaysUntilDeparture = () => {
    if (!departureDate) return null
    const departure = new Date(departureDate)
    const today = new Date()
    const diff = Math.ceil((departure.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const daysUntil = getDaysUntilDeparture()

  return (
    <section id="leaving-vietnam" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
            <PlaneTakeoff className="w-3 h-3 mr-1" />
            Leaving Vietnam
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Departure Tax Finalization
          </h2>
          <p className="text-lg text-muted-foreground">
            Resident foreigners must finalize PIT before leaving Vietnam. 
            This is a mandatory requirement — we ensure you're compliant before you depart.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Alert Banner */}
          <Alert className="mb-8 border-orange-500/30 bg-orange-500/5">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <AlertTitle className="text-orange-600">Mandatory Requirement</AlertTitle>
            <AlertDescription>
              Under Circular 111/2013/TT-BTC, resident foreigners must finalize their PIT 
              <strong> before departure from Vietnam</strong>. Failure to do so may result in complications 
              with future visa applications or tax matters.
            </AlertDescription>
          </Alert>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#40E0D0]" />
                    Finalization Timeline
                  </CardTitle>
                  <CardDescription>
                    Typical process duration: 7-14 days before departure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                    
                    <div className="space-y-6">
                      {timeline.map((item, index) => (
                        <div key={item.step} className="relative flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-sm font-medium z-10">
                            {item.step}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{item.title}</h4>
                              <Badge variant="secondary" className="text-xs">{item.days}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-[#40E0D0]" />
                    Document Checklist
                  </CardTitle>
                  <CardDescription>
                    Documents needed for departure finalization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{completedDocs} of {totalDocs} documents</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>

                    {/* Checklist */}
                    <div className="space-y-3 pt-4">
                      {documentChecklist.map((doc) => (
                        <div key={doc.id} className="flex items-start gap-3">
                          <Checkbox
                            id={doc.id}
                            checked={checkedDocs.includes(doc.id)}
                            onCheckedChange={() => toggleDoc(doc.id)}
                          />
                          <div className="flex-1">
                            <Label 
                              htmlFor={doc.id} 
                              className={`font-normal cursor-pointer ${checkedDocs.includes(doc.id) ? 'line-through text-muted-foreground' : ''}`}
                            >
                              {doc.label}
                            </Label>
                            {doc.required && (
                              <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full mt-4 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
                      <a href="#contact">
                        <Download className="w-4 h-4 mr-2" />
                        Download Full Checklist PDF
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Departure Date Calculator */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#40E0D0]" />
                    Departure Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate">Your Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>

                  {daysUntil !== null && (
                    <div className={`p-4 rounded-lg ${
                      daysUntil < 7 
                        ? 'bg-red-500/10 border border-red-500/30' 
                        : daysUntil < 14 
                          ? 'bg-orange-500/10 border border-orange-500/30'
                          : 'bg-[#40E0D0]/10 border border-[#40E0D0]/30'
                    }`}>
                      <p className="text-2xl font-bold">
                        {daysUntil > 0 ? `${daysUntil} days` : 'Today/Passed'}
                      </p>
                      <p className="text-sm text-muted-foreground">until departure</p>
                      {daysUntil < 7 && daysUntil > 0 && (
                        <p className="text-xs text-red-600 mt-2">
                          ⚠️ Urgent: Start finalization immediately!
                        </p>
                      )}
                      {daysUntil >= 7 && daysUntil < 14 && (
                        <p className="text-xs text-orange-600 mt-2">
                          ⚠️ Recommended to start finalization now
                        </p>
                      )}
                    </div>
                  )}

                  <Button asChild className="w-full bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]">
                    <a href="#contact">
                      Start Urgent Finalization
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Key Requirements */}
              <Card className="bg-[#1E3A8A] text-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Key Requirements</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                      <span>Finalize before leaving Vietnam</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                      <span>Include all employers' income</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                      <span>Claim all eligible deductions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                      <span>Receive tax clearance receipt</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Legal Source */}
              <Card className="border-[#40E0D0]/30">
                <CardContent className="pt-6">
                  <div className="official-badge mb-3">
                    <FileText className="w-3 h-3" />
                    <span>Legal Source</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Circular 111/2013/TT-BTC, Article 26
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    "Resident foreigners who are leaving Vietnam must finalize their PIT before departure."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
