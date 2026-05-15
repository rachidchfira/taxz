'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Building2, 
  Plus, 
  Trash2,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowRight,
  Shield
} from 'lucide-react'

interface Employer {
  id: number
  name: string
  grossIncome: string
  pitWithheld: string
  months: string
}

export function MultiEmployerSection() {
  const [employers, setEmployers] = useState<Employer[]>([
    { id: 1, name: '', grossIncome: '', pitWithheld: '', months: '' },
    { id: 2, name: '', grossIncome: '', pitWithheld: '', months: '' },
  ])
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    totalGross: number
    totalWithheld: number
    estimatedTax: number
    balance: number
    isRefund: boolean
  } | null>(null)

  const addEmployer = () => {
    setEmployers([
      ...employers,
      { id: Date.now(), name: '', grossIncome: '', pitWithheld: '', months: '' }
    ])
  }

  const removeEmployer = (id: number) => {
    if (employers.length > 2) {
      setEmployers(employers.filter(e => e.id !== id))
    }
  }

  const updateEmployer = (id: number, field: string, value: string) => {
    setEmployers(employers.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ))
  }

  const calculateMultiEmployer = () => {
    let totalGross = 0
    let totalWithheld = 0
    let totalMonths = 0

    employers.forEach(e => {
      totalGross += parseFloat(e.grossIncome) || 0
      totalWithheld += parseFloat(e.pitWithheld) || 0
      totalMonths += parseInt(e.months) || 0
    })

    // Simplified calculation - assume resident with standard deduction
    const monthlyDeduction = 11000000 // 2025
    const totalDeduction = monthlyDeduction * 12
    const taxableIncome = Math.max(0, totalGross - totalDeduction)

    // Progressive tax calculation (simplified)
    let estimatedTax = 0
    if (taxableIncome > 0) {
      // Use annual brackets
      const brackets = [
        { min: 0, max: 60000000, rate: 0.05 },
        { min: 60000000, max: 120000000, rate: 0.10 },
        { min: 120000000, max: 216000000, rate: 0.15 },
        { min: 216000000, max: 384000000, rate: 0.20 },
        { min: 384000000, max: 624000000, rate: 0.25 },
        { min: 624000000, max: 960000000, rate: 0.30 },
        { min: 960000000, max: Infinity, rate: 0.35 },
      ]

      let remaining = taxableIncome
      for (const bracket of brackets) {
        if (remaining <= 0) break
        const taxable = Math.min(remaining, bracket.max - bracket.min)
        estimatedTax += taxable * bracket.rate
        remaining -= taxable
      }
    }

    const balance = totalWithheld - estimatedTax

    setResults({
      totalGross,
      totalWithheld,
      estimatedTax,
      balance,
      isRefund: balance > 0
    })
    setShowResults(true)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <section id="multi-employer" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
            <Building2 className="w-3 h-3 mr-1" />
            Multi-Employer Tax Cases
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Worked for Multiple Employers?
          </h2>
          <p className="text-lg text-muted-foreground">
            If you changed jobs or worked for multiple employers during the tax year, 
            you must file an individual finalization return. We help you aggregate income 
            and reconcile withholding correctly.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#40E0D0]" />
                    Multi-Employer Calculator
                  </CardTitle>
                  <CardDescription>
                    Add all employers to estimate your tax position
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Alert */}
                  <Alert className="border-[#40E0D0]/30 bg-[#40E0D0]/5">
                    <Info className="w-4 h-4 text-[#40E0D0]" />
                    <AlertTitle>Individual Filing Required</AlertTitle>
                    <AlertDescription>
                      Under Circular 111, individuals with multiple employers must file their own 
                      finalization return. You cannot authorize an employer to file on your behalf.
                    </AlertDescription>
                  </Alert>

                  {/* Employer Cards */}
                  <div className="space-y-4">
                    {employers.map((employer, index) => (
                      <Card key={employer.id} className="border-border/50">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                              Employer {index + 1}
                            </CardTitle>
                            {employers.length > 2 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeEmployer(employer.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Employer Name</Label>
                            <Input
                              placeholder="Company name"
                              value={employer.name}
                              onChange={(e) => updateEmployer(employer.id, 'name', e.target.value)}
                            />
                          </div>
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Gross Income (VND)</Label>
                              <Input
                                type="number"
                                placeholder="Annual total"
                                value={employer.grossIncome}
                                onChange={(e) => updateEmployer(employer.id, 'grossIncome', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>PIT Withheld (VND)</Label>
                              <Input
                                type="number"
                                placeholder="Total withheld"
                                value={employer.pitWithheld}
                                onChange={(e) => updateEmployer(employer.id, 'pitWithheld', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Months Worked</Label>
                              <Input
                                type="number"
                                placeholder="Months"
                                value={employer.months}
                                onChange={(e) => updateEmployer(employer.id, 'months', e.target.value)}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Add Employer Button */}
                  <Button
                    variant="outline"
                    onClick={addEmployer}
                    className="w-full border-dashed border-2 border-[#40E0D0]/30 hover:border-[#40E0D0] hover:bg-[#40E0D0]/5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Employer
                  </Button>

                  {/* Calculate Button */}
                  <Button 
                    onClick={calculateMultiEmployer} 
                    className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                    size="lg"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Tax Position
                  </Button>

                  {/* Results */}
                  {showResults && results && (
                    <div className="space-y-4 pt-6 border-t">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">Total Gross Income</p>
                          <p className="text-xl font-bold">{formatCurrency(results.totalGross)}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">Total PIT Withheld</p>
                          <p className="text-xl font-bold">{formatCurrency(results.totalWithheld)}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">Estimated Annual Tax</p>
                          <p className="text-xl font-bold gradient-text">{formatCurrency(results.estimatedTax)}</p>
                        </div>
                        <div className={`p-4 rounded-lg ${
                          results.isRefund 
                            ? 'bg-[#40E0D0]/10 border border-[#40E0D0]/30' 
                            : 'bg-orange-500/10 border border-orange-500/30'
                        }`}>
                          <p className="text-xs text-muted-foreground mb-1">
                            {results.isRefund ? 'Potential Refund' : 'Additional Tax Due'}
                          </p>
                          <p className={`text-xl font-bold ${results.isRefund ? 'text-[#40E0D0]' : 'text-orange-500'}`}>
                            {formatCurrency(Math.abs(results.balance))}
                          </p>
                        </div>
                      </div>

                      <Alert>
                        <AlertTriangle className="w-4 h-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                          This is a simplified estimate. Multi-employer cases often require professional review 
                          to optimize deductions and ensure accurate filing.
                        </AlertDescription>
                      </Alert>

                      <Button asChild className="w-full bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]">
                        <a href="#contact">
                          Get Expert Review
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* When You Need This */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">When You Need This</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                    <span>Changed jobs during the year</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                    <span>Worked multiple jobs simultaneously</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                    <span>Freelanced while employed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                    <span>Short-term contracts</span>
                  </div>
                </CardContent>
              </Card>

              {/* Key Challenges */}
              <Card className="bg-[#1E3A8A] text-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Key Challenges</h3>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                      <span>Aggregating income across employers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                      <span>Reconciling withholding certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                      <span>Optimizing deductions across periods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#40E0D0] mt-0.5" />
                      <span>Correct form preparation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Legal Source */}
              <Card className="border-[#40E0D0]/30">
                <CardContent className="pt-6">
                  <div className="official-badge mb-3">
                    <Shield className="w-3 h-3" />
                    <span>Legal Source</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Circular 111/2013/TT-BTC
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Individuals with income from multiple employers must file finalization directly 
                    with the tax authority.
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
