'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Building2, 
  ArrowRight, 
  Shield, 
  CheckCircle2,
  AlertTriangle,
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Users,
  Clock,
  Star,
  Phone,
  Plus,
  Trash2,
  Briefcase,
  Target,
  Zap,
  Award,
  ChevronRight,
  AlertCircle,
  Info,
  Scale,
  ExternalLink
} from 'lucide-react'
import { useState, useCallback } from 'react'

// Helper function for VND currency formatting
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value)
}

interface EmployerData {
  id: string
  name: string
  grossIncome: number
  pitWithheld: number
  monthsWorked: number
}

const initialEmployer: EmployerData = {
  id: '1',
  name: '',
  grossIncome: 0,
  pitWithheld: 0,
  monthsWorked: 12
}

// Tax Brackets for Personal Income Tax (PIT) in Vietnam (Monthly)
const TAX_BRACKETS = [
  { level: 1, minIncome: 0, maxIncome: 5000000, rate: 0.05, deduct: 0 },
  { level: 2, minIncome: 5000000, maxIncome: 10000000, rate: 0.10, deduct: 250000 },
  { level: 3, minIncome: 10000000, maxIncome: 18000000, rate: 0.15, deduct: 750000 },
  { level: 4, minIncome: 18000000, maxIncome: 32000000, rate: 0.20, deduct: 1650000 },
  { level: 5, minIncome: 32000000, maxIncome: 52000000, rate: 0.25, deduct: 3250000 },
  { level: 6, minIncome: 52000000, maxIncome: 80000000, rate: 0.30, deduct: 5850000 },
  { level: 7, minIncome: 80000000, maxIncome: Infinity, rate: 0.35, deduct: 9850000 },
]

const scenarios = [
  {
    icon: Briefcase,
    title: 'Changed Jobs During the Year',
    description: 'You switched employers one or more times within a single tax year, requiring consolidation of income and withholding.',
    color: 'text-[#1E3A8A]',
    bgColor: 'bg-[#1E3A8A]/10',
  },
  {
    icon: Building2,
    title: 'Multiple Concurrent Employers',
    description: 'You worked for multiple employers simultaneously, each withholding PIT separately without considering your total income.',
    color: 'text-[#40E0D0]',
    bgColor: 'bg-[#40E0D0]/10',
  },
  {
    icon: FileText,
    title: 'Freelance + Employment Income',
    description: 'You had both employment income (with PIT withheld) and freelance income requiring separate tax treatment.',
    color: 'text-[#1E3A8A]',
    bgColor: 'bg-[#1E3A8A]/10',
  },
  {
    icon: AlertTriangle,
    title: 'Inconsistent Withholding',
    description: 'Different employers applied different tax rates or made errors in withholding calculations.',
    color: 'text-[#40E0D0]',
    bgColor: 'bg-[#40E0D0]/10',
  },
  {
    icon: AlertTriangle,
    title: 'Incomplete or Missing Records',
    description: 'Some employers failed to provide proper PIT withholding certificates or documentation for your finalization.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
  },
]

const challenges = [
  {
    title: 'Income Aggregation',
    description: 'Combining income from multiple sources requires careful tracking and proper documentation.',
    icon: TrendingUp,
  },
  {
    title: 'Withholding Reconciliation',
    description: 'Each employer calculates withholding independently. Totals may not match actual liability.',
    icon: DollarSign,
  },
  {
    title: 'Progressive Tax Rate Issues',
    description: 'Combined income may push you into a higher tax bracket than individual employers anticipated.',
    icon: TrendingUp,
  },
  {
    title: 'Documentation Complexity',
    description: 'Gathering PIT withholding certificates from multiple employers can be time-consuming.',
    icon: FileText,
  },
  {
    title: 'Timing Discrepancies',
    description: 'Different employment periods may affect residency status calculations.',
    icon: Clock,
  },
  {
    title: 'Refund vs. Additional Tax',
    description: 'Determining whether you are owed a refund or owe additional tax requires precise calculations.',
    icon: Calculator,
  },
]

const benefits = [
  {
    title: 'Accurate Calculation',
    description: 'We ensure all income is properly aggregated and taxed at correct progressive rates.',
    icon: Target,
  },
  {
    title: 'Maximum Refund Recovery',
    description: 'Our experts identify all eligible deductions and ensure you receive any refund owed.',
    icon: TrendingDown,
  },
  {
    title: 'Compliance Assurance',
    description: 'Stay fully compliant with Vietnamese tax authorities and avoid penalties.',
    icon: Shield,
  },
  {
    title: 'Time Savings',
    description: 'Let us handle the complex calculations while you focus on your career.',
    icon: Zap,
  },
]

const pricingPlans = [
  {
    name: 'Standard',
    description: '2 employers, straightforward cases',
    price: '3,500,000',
    features: [
      'Income aggregation for 2 employers',
      'PIT calculation and reconciliation',
      'Tax finalization declaration',
      'Standard processing (5-7 days)',
    ],
  },
  {
    name: 'Complex',
    description: '3-4 employers or mixed residency',
    price: '5,500,000',
    features: [
      'Income aggregation for 3-4 employers',
      'Residency status assessment',
      'PIT calculation and reconciliation',
      'Priority processing (3-5 days)',
      'Direct tax authority liaison',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    description: '5+ employers or special cases',
    price: 'Custom',
    features: [
      'Unlimited employer aggregation',
      'Complex residency scenarios',
      'Tax optimization strategies',
      'Expedited processing',
      'Dedicated account manager',
    ],
  },
]

export default function MultiEmployerPage() {
  const [employers, setEmployers] = useState<EmployerData[]>([initialEmployer])
  const [isResident, setIsResident] = useState(true)
  const [showResults, setShowResults] = useState(false)

  const addEmployer = useCallback(() => {
    const newId = String(Date.now())
    setEmployers(prev => [...prev, { ...initialEmployer, id: newId }])
  }, [])

  const removeEmployer = useCallback((id: string) => {
    if (employers.length > 1) {
      setEmployers(prev => prev.filter(e => e.id !== id))
    }
  }, [employers.length])

  const updateEmployer = useCallback((id: string, field: keyof EmployerData, value: string | number) => {
    setEmployers(prev => prev.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ))
  }, [])

  const calculateTax = useCallback((grossIncome: number, isResident: boolean): number => {
    if (!isResident) {
      // Non-residents are taxed at 20% flat rate
      return grossIncome * 0.20
    }

    // Progressive tax calculation for residents (monthly)
    let remaining = grossIncome
    let tax = 0
    let prevLimit = 0

    for (const bracket of TAX_BRACKETS) {
      if (remaining <= 0) break
      const taxableAmount = Math.min(remaining, bracket.maxIncome - prevLimit)
      tax += taxableAmount * bracket.rate
      remaining -= taxableAmount
      prevLimit = bracket.maxIncome
    }

    return tax
  }, [])

  const totalGross = employers.reduce((sum, e) => sum + (Number(e.grossIncome) || 0), 0)
  const totalWithheld = employers.reduce((sum, e) => sum + (Number(e.pitWithheld) || 0), 0)
  const totalMonths = employers.reduce((sum, e) => sum + (Number(e.monthsWorked) || 0), 0)
  const avgMonthlyGross = totalMonths > 0 ? totalGross / totalMonths : 0
  const estimatedTax = calculateTax(avgMonthlyGross, isResident) * totalMonths
  const balance = totalWithheld - estimatedTax

  const handleCalculate = () => {
    setShowResults(true)
  }

  const resetCalculator = () => {
    setEmployers([initialEmployer])
    setShowResults(false)
    setIsResident(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A]/95 to-[#1E3A8A]/90">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2340E0D0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-[#40E0D0]/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#40E0D0]/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Content */}
          <div className="relative z-10 py-20 md:py-28 lg:py-32">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-[#40E0D0]/20 text-[#40E0D0] border-[#40E0D0]/30">
                  <Building2 className="w-4 h-4 mr-2" />
                  Specialized Tax Service
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                  Multi-Employer Tax Cases
                  <span className="block text-[#40E0D0] mt-2">Simplified & Resolved</span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-10 text-white/80 max-w-3xl mx-auto">
                  When you work for multiple employers in Vietnam, tax finalization becomes complex. 
                  We aggregate income, reconcile withholdings, and ensure accurate tax settlement.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-semibold px-8 py-6 text-lg">
                    <a href="#calculator">
                      <Calculator className="w-5 h-5 mr-2" />
                      Try Calculator
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#1E3A8A] font-semibold px-8 py-6 text-lg transition-all duration-300">
                    <a href="#pricing">
                      View Pricing
                    </a>
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-8 mt-12">
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle2 className="w-5 h-5 text-[#40E0D0]" />
                    <span>500+ Cases Resolved</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Clock className="w-5 h-5 text-[#40E0D0]" />
                    <span>Avg. 5-Day Turnaround</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Shield className="w-5 h-5 text-[#40E0D0]" />
                    <span>100% Compliance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When You Need This Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <AlertCircle className="w-3 h-3 mr-1" />
                Common Scenarios
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                When You Need <span className="gradient-text">Individual Filing</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Multi-employer situations require individual tax finalization. 
                Employers cannot file on your behalf in these cases.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {scenarios.map((scenario, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-[#40E0D0]/50">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-lg ${scenario.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <scenario.icon className={`w-6 h-6 ${scenario.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
                        <p className="text-muted-foreground">{scenario.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Why employers can't file */}
            <div className="mt-12 max-w-4xl mx-auto">
              <Alert className="bg-[#1E3A8A]/5 border-[#1E3A8A]/20">
                <Info className="w-5 h-5 text-[#1E3A8A]" />
                <AlertTitle className="text-[#1E3A8A] font-semibold">
                  Why Employers Cannot File for You
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground mt-2">
                  Under Vietnamese tax regulations, employers can only file PIT finalization for employees 
                  who worked for them for the entire tax year. When you have multiple employers, 
                  each employer only has partial information about your total income and cannot 
                  accurately calculate your progressive tax liability. You must file individually to 
                  aggregate all income sources and reconcile total withholdings.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* Interactive Calculator Section */}
        <section id="calculator" className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <Calculator className="w-3 h-3 mr-1" />
                Free Estimation Tool
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Multi-Employer <span className="gradient-text">Tax Calculator</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Enter your employer details to estimate your tax position. 
                Add or remove employers dynamically to see your complete picture.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Calculator Card */}
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A]/80 text-white">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Calculator className="w-5 h-5" />
                        Tax Estimation Calculator
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        Add all employers you worked for during the tax year
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      {/* Residency Toggle */}
                      <div className="mb-6 p-4 rounded-lg bg-muted/50">
                        <Label className="text-base font-medium mb-3 block">Tax Residency Status</Label>
                        <div className="flex gap-4">
                          <Button
                            variant={isResident ? 'default' : 'outline'}
                            className={isResident ? 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90' : ''}
                            onClick={() => setIsResident(true)}
                          >
                            Resident (183+ days)
                          </Button>
                          <Button
                            variant={!isResident ? 'default' : 'outline'}
                            className={!isResident ? 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90' : ''}
                            onClick={() => setIsResident(false)}
                          >
                            Non-Resident
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {isResident 
                            ? 'Residents are taxed on worldwide income using progressive rates (5%-35%)' 
                            : 'Non-residents are taxed at 20% flat rate on Vietnam-sourced income'}
                        </p>
                      </div>

                      {/* Employer Cards */}
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {employers.map((employer, index) => (
                          <div key={employer.id} className="p-4 border rounded-lg relative bg-background">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-medium flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-[#40E0D0]" />
                                Employer {index + 1}
                              </h4>
                              {employers.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeEmployer(employer.id)}
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Remove
                                </Button>
                              )}
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div>
                                <Label htmlFor={`name-${employer.id}`} className="text-sm text-muted-foreground">
                                  Employer Name
                                </Label>
                                <Input
                                  id={`name-${employer.id}`}
                                  placeholder="Company name"
                                  value={employer.name}
                                  onChange={(e) => updateEmployer(employer.id, 'name', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`gross-${employer.id}`} className="text-sm text-muted-foreground">
                                  Gross Income (VND)
                                </Label>
                                <Input
                                  id={`gross-${employer.id}`}
                                  type="number"
                                  placeholder="0"
                                  value={employer.grossIncome || ''}
                                  onChange={(e) => updateEmployer(employer.id, 'grossIncome', Number(e.target.value))}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`withheld-${employer.id}`} className="text-sm text-muted-foreground">
                                  PIT Withheld (VND)
                                </Label>
                                <Input
                                  id={`withheld-${employer.id}`}
                                  type="number"
                                  placeholder="0"
                                  value={employer.pitWithheld || ''}
                                  onChange={(e) => updateEmployer(employer.id, 'pitWithheld', Number(e.target.value))}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`months-${employer.id}`} className="text-sm text-muted-foreground">
                                  Months Worked
                                </Label>
                                <Input
                                  id={`months-${employer.id}`}
                                  type="number"
                                  min="1"
                                  max="12"
                                  placeholder="12"
                                  value={employer.monthsWorked || ''}
                                  onChange={(e) => updateEmployer(employer.id, 'monthsWorked', Number(e.target.value))}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Employer Button */}
                      <Button
                        variant="outline"
                        onClick={addEmployer}
                        className="w-full mt-4 border-dashed border-2 py-6 text-muted-foreground hover:text-[#40E0D0] hover:border-[#40E0D0]"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Employer
                      </Button>

                      {/* Calculate Button */}
                      <div className="flex gap-4 mt-6">
                        <Button
                          onClick={handleCalculate}
                          className="flex-1 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white py-6"
                        >
                          <Calculator className="w-4 h-4 mr-2" />
                          Calculate Tax Position
                        </Button>
                        <Button
                          variant="outline"
                          onClick={resetCalculator}
                          className="py-6"
                        >
                          Reset
                        </Button>
                      </div>
                    </CardContent>

                    {/* Results */}
                    {showResults && (
                      <>
                        <Separator />
                        <CardFooter className="p-6 bg-muted/30">
                          <div className="w-full">
                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#40E0D0]" />
                              Calculation Results
                            </h4>
                            
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                              <div className="p-4 rounded-lg bg-background border">
                                <p className="text-sm text-muted-foreground">Total Gross Income</p>
                                <p className="text-xl font-bold gradient-text">
                                  {formatCurrency(totalGross)}
                                </p>
                              </div>
                              <div className="p-4 rounded-lg bg-background border">
                                <p className="text-sm text-muted-foreground">Total PIT Withheld</p>
                                <p className="text-xl font-bold">
                                  {formatCurrency(totalWithheld)}
                                </p>
                              </div>
                              <div className="p-4 rounded-lg bg-background border">
                                <p className="text-sm text-muted-foreground">Estimated Tax Due</p>
                                <p className="text-xl font-bold">
                                  {formatCurrency(estimatedTax)}
                                </p>
                              </div>
                              <div className={`p-4 rounded-lg border ${balance >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                                <p className="text-sm text-muted-foreground">
                                  {balance >= 0 ? 'Potential Refund' : 'Additional Tax Due'}
                                </p>
                                <p className={`text-xl font-bold ${balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {formatCurrency(Math.abs(balance))}
                                </p>
                              </div>
                            </div>

                            {/* Result Interpretation */}
                            <div className={`p-4 rounded-lg flex items-start gap-3 ${balance >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-amber-50 dark:bg-amber-900/20'}`}>
                              {balance >= 0 ? (
                                <>
                                  <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="font-medium text-emerald-800 dark:text-emerald-200">You may be eligible for a tax refund</p>
                                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                      Your employers withheld more tax than your estimated liability. We can help you claim this refund.
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="font-medium text-amber-800 dark:text-amber-200">Additional tax payment may be required</p>
                                    <p className="text-sm text-amber-700 dark:text-amber-300">
                                      Your withholdings are less than your estimated liability. We can help you settle this correctly.
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Disclaimer */}
                            <div className="mt-6 p-4 rounded-lg bg-[#1E3A8A]/5 border border-[#1E3A8A]/20">
                              <p className="text-sm text-muted-foreground flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#1E3A8A]" />
                                <span>
                                  <strong>Disclaimer:</strong> This is an estimate for planning purposes only. 
                                  Actual tax liability depends on various factors including deductions, allowances, 
                                  and specific circumstances. Contact us for a precise calculation.
                                </span>
                              </p>
                            </div>

                            <Button asChild className="w-full mt-4 bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]">
                              <Link href="#pricing">
                                Get Expert Review
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                </div>

                {/* Challenges Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-20">
                    <CardHeader className="bg-gradient-to-r from-[#40E0D0]/10 to-[#1E3A8A]/10">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-[#40E0D0]" />
                        Key Challenges
                      </CardTitle>
                      <CardDescription>
                        Why multi-employer cases are complex
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {challenges.map((challenge, index) => (
                          <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center flex-shrink-0">
                              <challenge.icon className="w-4 h-4 text-[#1E3A8A]" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{challenge.title}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">{challenge.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Professional Help Matters */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                  <Shield className="w-3 h-3 mr-1" />
                  Expert Assistance
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Professional <span className="gradient-text">Help Matters</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Multi-employer tax finalization involves complex calculations and documentation. 
                  Our expertise ensures you get the best outcome while staying fully compliant.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-[#40E0D0]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Card className="overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/5 to-[#40E0D0]/5"></div>
                  <CardContent className="relative p-8">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 rounded-full bg-[#40E0D0]/10 flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-[#40E0D0]" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Trusted Expertise</h3>
                      <p className="text-muted-foreground">Our track record speaks for itself</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-background border text-center">
                        <p className="text-3xl font-bold text-[#40E0D0]">500+</p>
                        <p className="text-sm text-muted-foreground">Cases Resolved</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background border text-center">
                        <p className="text-3xl font-bold text-[#40E0D0]">98%</p>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background border text-center">
                        <p className="text-3xl font-bold text-[#40E0D0]">5 Days</p>
                        <p className="text-sm text-muted-foreground">Avg. Turnaround</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background border text-center">
                        <p className="text-3xl font-bold text-[#40E0D0]">15+</p>
                        <p className="text-sm text-muted-foreground">Nationalities</p>
                      </div>
                    </div>

                    <Button asChild className="w-full mt-6 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
                      <Link href="#pricing">
                        View Our Pricing
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Basis Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <Badge variant="outline" className="mb-4 border-[#1E3A8A]/30 text-[#1E3A8A]">
                  <Scale className="w-3 h-3 mr-1" />
                  Legal Basis
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="gradient-text">Official Regulations</span>
                </h2>
                <p className="text-muted-foreground">
                  All calculations based on Vietnamese tax regulations
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-[#40E0D0]" />
                    Circular 111/2013/TT-BTC
                  </CardTitle>
                  <CardDescription>
                    Guidelines on Personal Income Tax
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Key Provisions for Multi-Employer Cases:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#40E0D0] flex-shrink-0 mt-0.5" />
                        <span>Article 17: Individuals with income from multiple sources must aggregate income for PIT calculation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#40E0D0] flex-shrink-0 mt-0.5" />
                        <span>Article 26: Income paying organizations only finalize PIT for employees working the full calendar year</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#40E0D0] flex-shrink-0 mt-0.5" />
                        <span>Article 27: Progressive tax rates apply to aggregate annual taxable income</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">View Official Document</p>
                      <p className="text-sm text-muted-foreground">Vietnam National Legal Database</p>
                    </div>
                    <Button variant="outline" asChild>
                      <a href="https://vbpl.vn" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        vbpl.vn
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
                <DollarSign className="w-3 h-3 mr-1" />
                Transparent Pricing
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pricing for <span className="gradient-text">Multi-Employer Cases</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Clear, upfront pricing based on case complexity. No hidden fees, no surprises.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-2 border-[#40E0D0] shadow-lg scale-105' : 'hover:-translate-y-1 hover:shadow-lg'} transition-all duration-300`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#40E0D0] text-[#1E3A8A] font-semibold px-3">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-4">
                    <div className="mb-4">
                      <span className="text-4xl font-bold gradient-text">
                        {plan.price === 'Custom' ? plan.price : formatCurrency(Number(plan.price.replace(/,/g, '')))}
                      </span>
                      {plan.price !== 'Custom' && (
                        <span className="text-muted-foreground text-sm"> / case</span>
                      )}
                    </div>
                    <ul className="space-y-3 text-left">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#40E0D0] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      asChild 
                      className={`w-full ${plan.popular ? 'bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]' : 'bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white'}`}
                    >
                      <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                        Contact via ZALO
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
              All prices are indicative and may vary based on specific case requirements. 
              Contact us for a detailed quote tailored to your situation.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A]/95">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Resolve Your <span className="text-[#40E0D0]">Multi-Employer Tax Case?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Don&apos;t let complex tax situations stress you out. Our experts are ready to help 
              you achieve the best possible outcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-semibold px-8 py-6 text-lg">
                <a href="https://zalo.me/84703027485" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact via ZALO
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 font-medium px-8 py-6 text-lg">
                <Link href="/tools/calculator">
                  <Calculator className="w-5 h-5 mr-2" />
                  Use PIT Calculator
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-white/60">
                <Shield className="w-5 h-5 text-[#40E0D0]" />
                <span>100% Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-5 h-5 text-[#40E0D0]" />
                <span>Quick Turnaround</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Users className="w-5 h-5 text-[#40E0D0]" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Star className="w-5 h-5 text-[#40E0D0]" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
