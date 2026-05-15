'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  FileCheck, 
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  Calendar,
  Building2,
  CreditCard,
  Home,
  PlaneTakeoff,
  Printer
} from 'lucide-react'

const caseTypes = [
  { id: 'standard', label: 'Standard PIT Finalization', icon: FileText, description: 'Single employer, resident status' },
  { id: 'multi_employer', label: 'Multi-Employer Case', icon: Building2, description: 'Changed jobs or multiple employers' },
  { id: 'departure', label: 'Leaving Vietnam', icon: PlaneTakeoff, description: 'Exit finalization before departure' },
  { id: 'refund', label: 'Tax Refund Claim', icon: CreditCard, description: 'Claiming overpaid tax' },
  { id: 'dtc', label: 'DTA/Treaty Claim', icon: Users, description: 'Double taxation avoidance treaty' },
]

const baseDocuments = [
  { id: 'passport', label: 'Passport (bio page)', required: true, category: 'identity' },
  { id: 'visa', label: 'Valid Visa or TRC', required: true, category: 'identity' },
  { id: 'work_permit', label: 'Work Permit (if applicable)', required: false, category: 'identity' },
  { id: 'contract', label: 'Labor Contract(s)', required: true, category: 'employment' },
  { id: 'payslips', label: 'Payslips / Payroll Records', required: true, category: 'income' },
  { id: 'pit_cert', label: 'PIT Withholding Certificate(s)', required: true, category: 'tax' },
]

const additionalDocs: Record<string, Array<{ id: string; label: string; required: boolean; category: string }>> = {
  multi_employer: [
    { id: 'emp2_contract', label: 'Additional Employer Contract(s)', required: true, category: 'employment' },
    { id: 'emp2_payslips', label: 'Additional Employer Payslips', required: true, category: 'income' },
    { id: 'emp2_pit', label: 'Additional PIT Certificates', required: true, category: 'tax' },
  ],
  departure: [
    { id: 'exit_date', label: 'Confirmed Departure Date', required: true, category: 'departure' },
    { id: 'entry_exit_records', label: 'Entry/Exit Stamp Records', required: false, category: 'departure' },
    { id: 'lease_termination', label: 'Lease Termination Letter', required: false, category: 'departure' },
  ],
  refund: [
    { id: 'bank_info', label: 'Bank Account Details (for refund)', required: true, category: 'refund' },
    { id: 'overpayment_proof', label: 'Proof of Overpayment', required: false, category: 'refund' },
  ],
  dtc: [
    { id: 'residence_cert', label: 'Tax Residence Certificate (home country)', required: true, category: 'treaty' },
    { id: 'treaty_forms', label: 'DTA Claim Forms', required: true, category: 'treaty' },
    { id: 'home_tax_id', label: 'Home Country Tax ID', required: true, category: 'treaty' },
  ],
}

const dependantDocs = [
  { id: 'dep_birth_cert', label: 'Dependant Birth Certificate(s)', required: true, category: 'dependant' },
  { id: 'dep_marriage', label: 'Marriage Certificate (for spouse)', required: false, category: 'dependant' },
  { id: 'dep_id', label: 'Dependant ID Documents', required: true, category: 'dependant' },
]

export function DocumentChecklistSection() {
  const [caseType, setCaseType] = useState('standard')
  const [hasDependants, setHasDependants] = useState(false)
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const getAllDocuments = () => {
    let docs = [...baseDocuments]
    
    if (additionalDocs[caseType]) {
      docs = [...docs, ...additionalDocs[caseType]]
    }
    
    if (hasDependants) {
      docs = [...docs, ...dependantDocs]
    }
    
    return docs
  }

  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const allDocs = getAllDocuments()
  const requiredDocs = allDocs.filter(d => d.required)
  const completedRequired = checkedDocs.filter(id => requiredDocs.some(d => d.id === id)).length
  const progressPercent = (completedRequired / requiredDocs.length) * 100

  const generateChecklist = () => {
    setShowResults(true)
  }

  const reset = () => {
    setCaseType('standard')
    setHasDependants(false)
    setCheckedDocs([])
    setShowResults(false)
  }

  return (
    <section id="document-checklist" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
            <FileCheck className="w-3 h-3 mr-1" />
            Document Checklist Generator
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Know Exactly What Documents You Need
          </h2>
          <p className="text-lg text-muted-foreground">
            Generate a personalized document checklist based on your specific tax situation. 
            No more guessing what paperwork is required.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#40E0D0]" />
                Document Checklist Generator
              </CardTitle>
              <CardDescription>
                Select your case type and we'll generate a complete checklist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Case Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">What type of case do you have?</Label>
                <RadioGroup value={caseType} onValueChange={setCaseType} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {caseTypes.map((type) => (
                    <div key={type.id} className="relative">
                      <RadioGroupItem
                        value={type.id}
                        id={type.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={type.id}
                        className="flex flex-col gap-2 p-4 rounded-lg border-2 cursor-pointer peer-data-[state=checked]:border-[#40E0D0] peer-data-[state=checked]:bg-[#40E0D0]/5 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <type.icon className="w-5 h-5 text-[#40E0D0]" />
                          <span className="font-medium">{type.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{type.description}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Dependants */}
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
                <Checkbox
                  id="hasDependants"
                  checked={hasDependants}
                  onCheckedChange={(checked) => setHasDependants(checked as boolean)}
                />
                <div>
                  <Label htmlFor="hasDependants" className="font-medium cursor-pointer">
                    I have dependants to claim for deductions
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Spouse, children, or parents that qualify as dependants
                  </p>
                </div>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={generateChecklist} 
                className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                size="lg"
              >
                <FileCheck className="w-4 h-4 mr-2" />
                Generate My Checklist
              </Button>

              {/* Results */}
              {showResults && (
                <div className="space-y-6 pt-6 border-t">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Required Documents Collected</span>
                      <span className="font-medium">{completedRequired} of {requiredDocs.length}</span>
                    </div>
                    <Progress value={progressPercent} className="h-3" />
                    {progressPercent === 100 && (
                      <p className="text-sm text-[#40E0D0] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        All required documents ready!
                      </p>
                    )}
                  </div>

                  {/* Checklist by Category */}
                  <div className="space-y-6">
                    {['identity', 'employment', 'income', 'tax', 'departure', 'refund', 'treaty', 'dependant']
                      .filter(cat => allDocs.some(d => d.category === cat))
                      .map((category) => {
                        const categoryDocs = allDocs.filter(d => d.category === category)
                        const categoryLabel = {
                          identity: 'Identity Documents',
                          employment: 'Employment Documents',
                          income: 'Income Records',
                          tax: 'Tax Documents',
                          departure: 'Departure Documents',
                          refund: 'Refund Documents',
                          treaty: 'Treaty/DTA Documents',
                          dependant: 'Dependant Documents',
                        }[category]

                        return (
                          <div key={category} className="space-y-3">
                            <h4 className="font-semibold text-sm text-muted-foreground">{categoryLabel}</h4>
                            <div className="space-y-2">
                              {categoryDocs.map((doc) => (
                                <div 
                                  key={doc.id}
                                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                >
                                  <Checkbox
                                    id={doc.id}
                                    checked={checkedDocs.includes(doc.id)}
                                    onCheckedChange={() => toggleDoc(doc.id)}
                                  />
                                  <Label 
                                    htmlFor={doc.id}
                                    className={`flex-1 cursor-pointer ${checkedDocs.includes(doc.id) ? 'line-through text-muted-foreground' : ''}`}
                                  >
                                    {doc.label}
                                  </Label>
                                  {doc.required ? (
                                    <Badge variant="default" className="text-xs">Required</Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-xs">Optional</Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                  </div>

                  {/* Alert for missing docs */}
                  {completedRequired < requiredDocs.length && (
                    <Alert className="border-orange-500/30 bg-orange-500/5">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <AlertTitle>Missing Required Documents</AlertTitle>
                      <AlertDescription>
                        You still need {requiredDocs.length - completedRequired} required document(s) 
                        to proceed with your tax finalization.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={reset} className="flex-1">
                      Start Over
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Checklist
                    </Button>
                    <Button asChild className="flex-1 bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]">
                      <a href="#contact">
                        <Download className="w-4 h-4 mr-2" />
                        Submit Documents
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
