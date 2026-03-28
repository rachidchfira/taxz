'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  FileText, 
  ClipboardList, 
  CheckCircle2, 
  AlertCircle,
  Printer,
  Download,
  Send,
  UserCheck,
  Briefcase,
  DollarSign,
  Shield,
  FileCheck,
  Plane,
  Building2,
  RefreshCw,
  Globe,
  Users,
  IdCard,
  Info,
  ArrowRight,
  Star
} from 'lucide-react'

type CaseType = 'standard' | 'multi-employer' | 'leaving' | 'refund' | 'dta'

interface DocumentItem {
  id: string
  name: string
  description: string
  required: boolean
  category: string
  notes?: string
}

interface DocumentCategory {
  id: string
  name: string
  icon: React.ElementType
  description: string
  items: DocumentItem[]
}

const caseTypes = [
  {
    id: 'standard' as CaseType,
    name: 'Standard PIT Finalization',
    description: 'Regular annual tax finalization for employees with a single employer',
    icon: FileText
  },
  {
    id: 'multi-employer' as CaseType,
    name: 'Multi-Employer Case',
    description: 'Tax finalization when you worked for multiple employers in a tax year',
    icon: Building2
  },
  {
    id: 'leaving' as CaseType,
    name: 'Leaving Vietnam',
    description: 'Tax clearance when permanently departing Vietnam',
    icon: Plane
  },
  {
    id: 'refund' as CaseType,
    name: 'Tax Refund Claim',
    description: 'Claim overpaid taxes from previous years',
    icon: RefreshCw
  },
  {
    id: 'dta' as CaseType,
    name: 'DTA/Treaty Claim',
    description: 'Double Taxation Agreement benefits claim',
    icon: Globe
  }
]

const baseCategories: DocumentCategory[] = [
  {
    id: 'identity',
    name: 'Identity Documents',
    icon: IdCard,
    description: 'Personal identification and legal status documents',
    items: [
      { id: 'passport', name: 'Valid Passport', description: 'Original passport with at least 6 months validity', required: true, category: 'identity' },
      { id: 'passport-copy', name: 'Passport Copy', description: 'Notarized copy of passport (all pages)', required: true, category: 'identity' },
      { id: 'visa', name: 'Valid Visa', description: 'Current visa with appropriate work authorization', required: true, category: 'identity' },
      { id: 'visa-copy', name: 'Visa Copy', description: 'Notarized copy of visa', required: true, category: 'identity' },
      { id: 'work-permit', name: 'Work Permit', description: 'Valid work permit or exemption certificate', required: true, category: 'identity' },
      { id: 'work-permit-copy', name: 'Work Permit Copy', description: 'Notarized copy of work permit', required: true, category: 'identity' },
      { id: 'trc', name: 'Temporary Residence Card', description: 'TRC if applicable', required: false, category: 'identity', notes: 'Required if you hold a TRC instead of visa' }
    ]
  },
  {
    id: 'employment',
    name: 'Employment Documents',
    icon: Briefcase,
    description: 'Work-related documentation',
    items: [
      { id: 'contract', name: 'Employment Contract', description: 'Signed employment contract', required: true, category: 'employment' },
      { id: 'contract-appendix', name: 'Contract Amendments', description: 'Any amendments or addendums to the contract', required: false, category: 'employment' },
      { id: 'resignation', name: 'Resignation Letter', description: 'If applicable', required: false, category: 'employment' },
      { id: 'termination', name: 'Termination Letter', description: 'Official termination or end of contract letter', required: false, category: 'employment' }
    ]
  },
  {
    id: 'income',
    name: 'Income Records',
    icon: DollarSign,
    description: 'Proof of income and tax payments',
    items: [
      { id: 'payslips', name: 'Monthly Payslips', description: 'All payslips for the tax year', required: true, category: 'income' },
      { id: 'pit-cert', name: 'PIT Withholding Certificate', description: 'Form 05/MTH from employer', required: true, category: 'income' },
      { id: 'bank-statements', name: 'Bank Statements', description: 'Salary account statements', required: true, category: 'income' },
      { id: 'bonus-docs', name: 'Bonus Documentation', description: 'Any bonuses received', required: false, category: 'income' },
      { id: 'allowances', name: 'Allowance Records', description: 'Housing, transportation allowances', required: false, category: 'income' }
    ]
  },
  {
    id: 'insurance',
    name: 'Insurance Documents',
    icon: Shield,
    description: 'Social and health insurance records',
    items: [
      { id: 'si-book', name: 'Social Insurance Book', description: 'Vietnam Social Insurance book', required: true, category: 'insurance' },
      { id: 'hi-card', name: 'Health Insurance Card', description: 'Health insurance card', required: true, category: 'insurance' },
      { id: 'si-contributions', name: 'SI Contribution Records', description: 'Contribution history', required: false, category: 'insurance' }
    ]
  }
]

const getAdditionalDocuments = (caseType: CaseType, hasDependants: boolean, hasMultipleWorkPermits: boolean): DocumentItem[] => {
  const additional: DocumentItem[] = []
  
  switch (caseType) {
    case 'multi-employer':
      additional.push(
        { id: 'pit-all-employers', name: 'PIT Certificates from All Employers', description: 'PIT withholding certificates (Form 05/MTH) from each employer', required: true, category: 'income' },
        { id: 'contracts-all', name: 'All Employment Contracts', description: 'Contracts from all employers in the tax year', required: true, category: 'employment' },
        { id: 'termination-all', name: 'Termination Letters', description: 'From each employer', required: false, category: 'employment' }
      )
      break
    case 'leaving':
      additional.push(
        { id: 'tax-clearance', name: 'Tax Clearance Certificate', description: 'Tax clearance from tax authority', required: true, category: 'additional' },
        { id: 'departure-form', name: 'Departure Form', description: 'Official departure notification form', required: true, category: 'additional' },
        { id: 'flight-ticket', name: 'Flight Ticket Copy', description: 'Outbound flight ticket', required: true, category: 'additional' },
        { id: 'handover-docs', name: 'Handover Documents', description: 'Proof of residence handover', required: false, category: 'additional' }
      )
      break
    case 'refund':
      additional.push(
        { id: 'refund-application', name: 'Refund Application Form', description: 'Official tax refund application', required: true, category: 'additional' },
        { id: 'overpayment-proof', name: 'Overpayment Proof', description: 'Evidence of tax overpayment', required: true, category: 'additional' },
        { id: 'bank-refund', name: 'Bank Account for Refund', description: 'Account for receiving refund', required: true, category: 'additional' },
        { id: 'original-receipts', name: 'Original Tax Receipts', description: 'Original tax payment receipts', required: true, category: 'additional' }
      )
      break
    case 'dta':
      additional.push(
        { id: 'tax-residency-cert', name: 'Tax Residency Certificate', description: 'From home country tax authority', required: true, category: 'additional' },
        { id: 'dta-form', name: 'DTA Claim Form', description: 'Double taxation agreement form', required: true, category: 'additional' },
        { id: 'home-country-tax-return', name: 'Home Country Tax Return', description: 'Tax return from home country', required: true, category: 'additional' },
        { id: 'income-split', name: 'Income Split Documentation', description: 'Showing income allocation', required: true, category: 'additional' }
      )
      break
  }
  
  if (hasDependants) {
    additional.push(
      { id: 'dependant-passports', name: 'Dependant Passports', description: 'Notarized copies for each dependant', required: true, category: 'identity' },
      { id: 'dependant-visas', name: 'Dependant Visas', description: 'Notarized copies for each dependant', required: true, category: 'identity' },
      { id: 'marriage-cert', name: 'Marriage Certificate', description: 'If claiming spouse deductions', required: true, category: 'identity' },
      { id: 'birth-certs', name: 'Birth Certificates', description: 'For dependent children', required: true, category: 'identity' },
      { id: 'dependant-reg', name: 'Dependant Registration', description: 'With local authorities', required: true, category: 'identity' }
    )
  }
  
  if (hasMultipleWorkPermits) {
    additional.push(
      { id: 'prev-work-permits', name: 'Previous Work Permits', description: 'All work permits from year', required: true, category: 'identity' },
      { id: 'work-history', name: 'Work Permit History', description: 'Complete history', required: true, category: 'identity' }
    )
  }
  
  return additional
}

export default function DocumentChecklistPage() {
  const [caseType, setCaseType] = useState<CaseType>('standard')
  const [hasDependants, setHasDependants] = useState(false)
  const [hasMultipleWorkPermits, setHasMultipleWorkPermits] = useState(false)
  const [showChecklist, setShowChecklist] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [isGenerating, setIsGenerating] = useState(false)

  const categories = useMemo(() => {
    const additionalDocs = getAdditionalDocuments(caseType, hasDependants, hasMultipleWorkPermits)
    const additionalCategoryDocs = additionalDocs.filter(doc => doc.category === 'additional')
    
    const baseWithAdditional = baseCategories.map(cat => {
      const additionalItems = additionalDocs.filter(doc => doc.category === cat.id)
      return {
        ...cat,
        items: [...cat.items, ...additionalItems]
      }
    })
    
    if (additionalCategoryDocs.length > 0) {
      baseWithAdditional.push({
        id: 'additional',
        name: 'Additional Documents',
        icon: FileText,
        description: 'Case-specific requirements',
        items: additionalCategoryDocs
      })
    }
    
    return baseWithAdditional
  }, [caseType, hasDependants, hasMultipleWorkPermits])

  const allItems = useMemo(() => 
    categories.flatMap(cat => cat.items),
    [categories])

  const requiredItems = useMemo(() => 
    allItems.filter(item => item.required),
    [allItems])
    
  const optionalItems = useMemo(() => 
    allItems.filter(item => !item.required),
    [allItems])
    
  const progress = useMemo(() => {
    if (allItems.length === 0) return 0
    return Math.round((checkedItems.size / allItems.length) * 100)
  }, [checkedItems, allItems])

  const handleCheck = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setShowChecklist(true)
    setIsGenerating(false)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const caseTypeName = caseTypes.find(c => c.id === caseType)?.name || 'Document Checklist'
    let content = `VietPIT Document Checklist\n`
    content += `Case Type: ${caseTypeName}\n`
    content += `Generated: ${new Date().toLocaleDateString()}\n`
    content += `Has Dependants: ${hasDependants ? 'Yes' : 'No'}\n`
    content += `Multiple Work Permits: ${hasMultipleWorkPermits ? 'Yes' : 'No'}\n\n`
    
    categories.forEach(cat => {
      content += `\n${cat.name}\n`
      content += '-'.repeat(cat.name.length) + '\n'
      cat.items.forEach(item => {
        const checked = checkedItems.has(item.id) ? '[x]' : '[ ]'
        const required = item.required ? ' (Required)' : ' (Optional)'
        content += `${checked} ${item.name}${required}\n`
      })
    })
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `vietpit-checklist-${caseType}-${Date.now()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 hero-gradient">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <FileCheck className="w-4 h-4" />
                <span className="text-sm font-medium">Document Preparation Tool</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Document Checklist <span className="gradient-text">Generator</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get a personalized document checklist based on your specific tax situation. 
                Select your case type and options to see exactly what documents you need for PIT finalization.
              </p>
              
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>Official Requirements</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>Case-Specific</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>Downloadable</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Generator Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    Configure Your Checklist
                  </CardTitle>
                  <CardDescription>
                    Select your case type and any applicable options to generate your personalized document checklist
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Case Type Selection */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Case Type</Label>
                    <RadioGroup
                      value={caseType}
                      onValueChange={(value) => setCaseType(value as CaseType)}
                      className="grid gap-3"
                    >
                      {caseTypes.map((ct) => {
                        const Icon = ct.icon
                        return (
                          <div
                            key={ct.id}
                            className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                              caseType === ct.id 
                                ? 'bg-primary/5 border-primary ring-1 ring-primary/20' 
                                : 'bg-card hover:bg-accent/50 border-border'
                            }`}
                            onClick={() => setCaseType(ct.id)}
                          >
                            <RadioGroupItem value={ct.id} id={ct.id} className="mt-0.5" />
                            <label htmlFor={ct.id} className="cursor-pointer flex-1">
                              <div className="flex items-center gap-2 font-medium">
                                <Icon className="w-4 h-4 text-muted-foreground" />
                                {ct.name}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {ct.description}
                              </p>
                            </label>
                          </div>
                        )
                      })}
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Additional Options */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Additional Options</Label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div 
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          hasDependants 
                            ? 'bg-primary/5 border-primary' 
                            : 'bg-card hover:bg-accent/50 border-border'
                        }`}
                        onClick={() => setHasDependants(!hasDependants)}
                      >
                        <Checkbox
                          id="dependants"
                          checked={hasDependants}
                          onCheckedChange={(checked) => setHasDependants(checked as boolean)}
                        />
                        <label htmlFor="dependants" className="cursor-pointer flex items-center gap-2 font-medium">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          Has dependants (spouse/children)
                        </label>
                      </div>
                      
                      <div 
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          hasMultipleWorkPermits 
                            ? 'bg-primary/5 border-primary' 
                            : 'bg-card hover:bg-accent/50 border-border'
                        }`}
                        onClick={() => setHasMultipleWorkPermits(!hasMultipleWorkPermits)}
                      >
                        <Checkbox
                          id="multiple-permits"
                          checked={hasMultipleWorkPermits}
                          onCheckedChange={(checked) => setHasMultipleWorkPermits(checked as boolean)}
                        />
                        <label htmlFor="multiple-permits" className="cursor-pointer flex items-center gap-2 font-medium">
                          <IdCard className="w-4 h-4 text-muted-foreground" />
                          Has multiple work permits in tax year
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full sm:w-auto gradient-primary text-white btn-premium text-base py-6"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Generating Checklist...
                      </>
                    ) : (
                      <>
                        <ClipboardList className="w-5 h-5" />
                        Generate Document Checklist
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Checklist Display */}
        {showChecklist && (
          <section className="py-12 animate-fade-in-up">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Progress Card */}
                <Card className="border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-primary" />
                      Document Collection Progress
                    </CardTitle>
                    <CardDescription>
                      Track your document collection progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-2xl font-bold text-primary">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{requiredItems.length}</span>
                        <span className="text-sm text-muted-foreground">required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-muted-foreground">{optionalItems.length}</span>
                        <span className="text-sm text-muted-foreground">optional</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Categories */}
                {categories.map((category) => (
                  <Card key={category.id} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <category.icon className="w-5 h-5 text-primary" />
                        {category.name}
                        <Badge variant="outline" className="ml-2">
                          {category.items.filter((i) => checkedItems.has(i.id)).length}/{category.items.length}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                            checkedItems.has(item.id) 
                              ? 'bg-primary/5 border-primary/30' 
                              : 'bg-card hover:bg-accent/50 border-border'
                          }`}
                          onClick={() => handleCheck(item.id)}
                        >
                          <Checkbox
                            id={item.id}
                            checked={checkedItems.has(item.id)}
                            onCheckedChange={() => handleCheck(item.id)}
                            className="mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <label 
                                htmlFor={item.id}
                                className={`font-medium cursor-pointer ${
                                  checkedItems.has(item.id) ? 'line-through text-muted-foreground' : ''
                                }`}
                              >
                                {item.name}
                              </label>
                              {item.required ? (
                                <Badge className="text-[10px]">Required</Badge>
                              ) : (
                                <Badge variant="secondary" className="text-[10px]">Optional</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            {item.notes && (
                              <p className="text-xs text-teal-600 flex items-center gap-1 mt-1">
                                <Info className="w-3 h-3" />
                                {item.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
                
                {/* Action Buttons */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={handlePrint}
                        className="flex-1 gap-2"
                      >
                        <Printer className="w-4 h-4" />
                        Print Checklist
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleDownload}
                        className="flex-1 gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                      <Button className="flex-1 gradient-primary text-white btn-premium gap-2">
                        <Send className="w-4 h-4" />
                        Submit Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Legal Requirements Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">
                Legal Requirements
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                Understanding your obligations under Vietnamese tax law
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      PIT Filing Deadline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Annual PIT finalization must be completed by <strong className="text-foreground">June 30th</strong> of the following year.
                    </p>
                    <Alert>
                      <AlertCircle className="w-4 h-4" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription>
                        Late submissions may result in penalties.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      Required Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      All documents must be <strong className="text-foreground">notarized or certified</strong> by authorized bodies in Vietnam.
                    </p>
                    <Alert>
                      <AlertCircle className="w-4 h-4" />
                      <AlertTitle>Note</AlertTitle>
                      <AlertDescription>
                        Foreign documents require consular legalization.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5 text-primary" />
                      Record Keeping
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Maintain copies of all submitted documents for <strong className="text-foreground">minimum 10 years</strong> as required by law.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5 text-primary" />
                      Tax Residency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Your residency status affects your tax obligations. We help determine your status.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Alert className="mt-8 bg-primary/5 border-primary/20">
                <AlertCircle className="w-5 h-5 text-primary" />
                <AlertTitle className="text-primary">Need Help?</AlertTitle>
                <AlertDescription>
                  Our team can assist with document preparation and verification. Contact us for a consultation.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6">
                <Star className="w-4 h-4 fill-teal-300 text-teal-300" />
                <span className="text-sm font-medium">Professional Tax Services</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Submit Your Documents?
              </h2>
              
              <p className="text-white/80 mb-8 text-lg">
                Our experienced team can review your documents, ensure compliance, and handle your PIT finalization from start to finish.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gradient-secondary text-navy font-semibold gap-2"
                >
                  <UserCheck className="w-5 h-5" />
                  Book Free Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 gap-2"
                >
                  View Pricing
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
