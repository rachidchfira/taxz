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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Calculator as CalcIcon,
  AlertCircle,
  BadgePercent,
  Shield,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Info,
  TrendingUp,
  Users,
  Clock,
  ChevronRight,
  Sparkles,
  Scale
} from 'lucide-react'

// Tax Brackets for Personal Income Tax (PIT) in Vietnam 2025 (Monthly)
const TAX_BRACKETS_2025 = [
  { level: 1, minIncome: 0, maxIncome: 5000000, rate: 0.05, deduct: 0 },
  { level: 2, minIncome: 5000000, maxIncome: 10000000, rate: 0.10, deduct: 250000 },
  { level: 3, minIncome: 10000000, maxIncome: 18000000, rate: 0.15, deduct: 750000 },
  { level: 4, minIncome: 18000000, maxIncome: 32000000, rate: 0.20, deduct: 1650000 },
  { level: 5, minIncome: 32000000, maxIncome: 52000000, rate: 0.25, deduct: 3250000 },
  { level: 6, minIncome: 52000000, maxIncome: 80000000, rate: 0.30, deduct: 5850000 },
  { level: 7, minIncome: 80000000, maxIncome: Infinity, rate: 0.35, deduct: 9850000 },
]

// Family circumstance deductions
const DEDUCTIONS_2025 = {
  taxpayer: 11000000,
  dependant: 4400000,
}

const DEDUCTIONS_2026 = {
  taxpayer: 15500000,
  dependant: 6200000,
}

// Social Insurance rates
const SI_RATES = {
  socialInsurance: 0.08,
  healthInsurance: 0.015,
  unemploymentInsurance: 0.01,
}

// Base salary for insurance cap (2024)
const BASE_SALARY = 2340000
const MAX_SI_SALARY = 20 * BASE_SALARY // 46,800,000 VND

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

// Calculate progressive tax with bracket breakdown
function calculateProgressiveTax(taxableIncome: number, isMonthly: boolean) {
  const multiplier = isMonthly ? 1 : 12
  const breakdown: Array<{
    level: number
    bracket: string
    taxable: number
    tax: number
    rate: number
  }> = []

  let totalTax = 0
  let remainingIncome = taxableIncome

  for (const bracket of TAX_BRACKETS_2025) {
    if (remainingIncome <= 0) break

    const bracketWidth = bracket.maxIncome - bracket.minIncome
    const taxableInBracket = Math.min(remainingIncome, bracketWidth)

    if (taxableInBracket > 0) {
      const taxInBracket = taxableInBracket * bracket.rate
      totalTax += taxInBracket

      breakdown.push({
        level: bracket.level,
        bracket: bracket.level === 7
          ? `Over ${formatCurrency(bracket.minIncome)}`
          : `${formatCurrency(bracket.minIncome)} - ${formatCurrency(bracket.maxIncome)}`,
        taxable: taxableInBracket,
        tax: taxInBracket,
        rate: bracket.rate * 100,
      })
    }

    remainingIncome -= taxableInBracket
  }

  return { totalTax, breakdown }
}

export default function CalculatorPage() {
  // State for PIT Calculator
  const [calculationPeriod, setCalculationPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [taxResidency, setTaxResidency] = useState<'resident' | 'non-resident'>('resident')
  const [contractType, setContractType] = useState<'longTerm' | 'shortTerm'>('longTerm')
  const [grossIncome, setGrossIncome] = useState('')
  const [monthsWorked, setMonthsWorked] = useState('12')
  const [taxYear, setTaxYear] = useState<'2025' | '2026'>('2025')
  const [dependants, setDependants] = useState('0')
  const [includeInsurance, setIncludeInsurance] = useState(true)
  const [showResults, setShowResults] = useState(false)

  // State for Insurance Calculator
  const [salaryBase, setSalaryBase] = useState('')
  const [showInsuranceResults, setShowInsuranceResults] = useState(false)

  // PIT Results
  const [pitResults, setPitResults] = useState<{
    grossIncome: number
    totalDeductions: number
    insuranceDeduction: number
    personalRelief: number
    dependantRelief: number
    taxableIncome: number
    annualPIT: number
    effectiveRate: number
    breakdown: Array<{
      level: number
      bracket: string
      taxable: number
      tax: number
      rate: number
    }>
  } | null>(null)

  // Insurance Results (computed)
  const insuranceResults = useMemo(() => {
    const salary = parseFloat(salaryBase) || 0
    if (salary <= 0) return null

    const cappedSalary = Math.min(salary, MAX_SI_SALARY)
    const socialInsurance = cappedSalary * SI_RATES.socialInsurance
    const healthInsurance = cappedSalary * SI_RATES.healthInsurance
    const unemploymentInsurance = cappedSalary * SI_RATES.unemploymentInsurance
    const total = socialInsurance + healthInsurance + unemploymentInsurance

    return {
      salary,
      cappedSalary,
      socialInsurance,
      healthInsurance,
      unemploymentInsurance,
      total,
      isCapped: salary > MAX_SI_SALARY,
    }
  }, [salaryBase])

  const handleCalculatePIT = () => {
    const gross = parseFloat(grossIncome) || 0
    const months = parseInt(monthsWorked) || 12
    const deps = parseInt(dependants) || 0
    const isMonthly = calculationPeriod === 'monthly'

    if (gross <= 0) return

    const deductions = taxYear === '2025' ? DEDUCTIONS_2025 : DEDUCTIONS_2026

    // Calculate based on contract type and residency
    if (contractType === 'shortTerm') {
      // Short-term contract (< 3 months) - flat 10% rate
      const income = isMonthly ? gross * months : gross
      if (income < 2000000) {
        // No tax for income under 2M
        setPitResults({
          grossIncome: income,
          totalDeductions: 0,
          insuranceDeduction: 0,
          personalRelief: 0,
          dependantRelief: 0,
          taxableIncome: income,
          annualPIT: 0,
          effectiveRate: 0,
          breakdown: [],
        })
        setShowResults(true)
        return
      }

      const taxPayable = income * 0.1
      setPitResults({
        grossIncome: income,
        totalDeductions: 0,
        insuranceDeduction: 0,
        personalRelief: 0,
        dependantRelief: 0,
        taxableIncome: income,
        annualPIT: taxPayable,
        effectiveRate: 10,
        breakdown: [{
          level: 1,
          bracket: 'Flat rate for short-term contracts',
          taxable: income,
          tax: taxPayable,
          rate: 10,
        }],
      })
      setShowResults(true)
      return
    }

    // Non-resident - flat 20% rate
    if (taxResidency === 'non-resident') {
      const income = isMonthly ? gross * months : gross
      const taxPayable = income * 0.2

      setPitResults({
        grossIncome: income,
        totalDeductions: 0,
        insuranceDeduction: 0,
        personalRelief: 0,
        dependantRelief: 0,
        taxableIncome: income,
        annualPIT: taxPayable,
        effectiveRate: 20,
        breakdown: [{
          level: 1,
          bracket: 'Flat rate for non-residents',
          taxable: income,
          tax: taxPayable,
          rate: 20,
        }],
      })
      setShowResults(true)
      return
    }

    // Resident with long-term contract - progressive tax
    const annualGross = isMonthly ? gross * months : gross
    const personalRelief = deductions.taxpayer * months
    const dependantRelief = deps * deductions.dependant * months

    // Insurance deductions
    let insuranceDeductions = 0
    if (includeInsurance) {
      const monthlyGross = isMonthly ? gross : gross / months
      const cappedSalary = Math.min(monthlyGross, MAX_SI_SALARY)
      const monthlyInsurance = cappedSalary * (SI_RATES.socialInsurance + SI_RATES.healthInsurance)
      insuranceDeductions = monthlyInsurance * months
    }

    const totalDeductions = personalRelief + dependantRelief + insuranceDeductions
    const taxableIncome = Math.max(0, annualGross - totalDeductions)

    // Calculate tax with breakdown
    const { totalTax, breakdown } = calculateProgressiveTax(taxableIncome, false)
    const effectiveRate = annualGross > 0 ? (totalTax / annualGross) * 100 : 0

    setPitResults({
      grossIncome: annualGross,
      totalDeductions,
      insuranceDeduction: insuranceDeductions,
      personalRelief,
      dependantRelief,
      taxableIncome,
      annualPIT: totalTax,
      effectiveRate,
      breakdown,
    })
    setShowResults(true)
  }

  const handleCalculateInsurance = () => {
    if (insuranceResults) {
      setShowInsuranceResults(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/5 via-background to-[#40E0D0]/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#40E0D0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-[#40E0D0]/30 text-[#40E0D0] bg-[#40E0D0]/5">
                <CalcIcon className="w-3 h-3 mr-1" />
                Free Online Tools
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">PIT & Insurance</span>
                <br />
                Calculator
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Estimate your Personal Income Tax and Social Insurance contributions in Vietnam.
                Based on official regulations from the General Department of Taxation.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  { label: 'Tax Years', value: '2025-2026', icon: Clock },
                  { label: 'Tax Brackets', value: '7 Levels', icon: TrendingUp },
                  { label: 'Deductions', value: 'Family + Insurance', icon: Users },
                  { label: 'Accuracy', value: 'Official Rates', icon: CheckCircle2 },
                ].map((stat, i) => (
                  <Card key={i} className="p-4 bg-background/50 backdrop-blur-sm">
                    <stat.icon className="w-5 h-5 text-[#40E0D0] mb-2 mx-auto" />
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-semibold">{stat.value}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="pit" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                <TabsTrigger value="pit" className="flex items-center gap-2 text-base">
                  <BadgePercent className="w-5 h-5" />
                  PIT Calculator
                </TabsTrigger>
                <TabsTrigger value="insurance" className="flex items-center gap-2 text-base">
                  <Shield className="w-5 h-5" />
                  Insurance Calculator
                </TabsTrigger>
              </TabsList>

              {/* PIT Calculator Tab */}
              <TabsContent value="pit">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-[#1E3A8A]/5 to-[#40E0D0]/5 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <BadgePercent className="w-6 h-6 text-[#40E0D0]" />
                      Personal Income Tax Calculator
                    </CardTitle>
                    <CardDescription className="text-base">
                      Calculate your PIT based on income, residency status, and applicable deductions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Row 1: Period, Residency, Contract */}
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Calculation Period</Label>
                        <RadioGroup
                          value={calculationPeriod}
                          onValueChange={(v) => setCalculationPeriod(v as 'monthly' | 'yearly')}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="monthly" id="monthly" />
                            <Label htmlFor="monthly" className="font-normal cursor-pointer">Monthly</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yearly" id="yearly" />
                            <Label htmlFor="yearly" className="font-normal cursor-pointer">Yearly</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Tax Residency</Label>
                        <RadioGroup
                          value={taxResidency}
                          onValueChange={(v) => setTaxResidency(v as 'resident' | 'non-resident')}
                          className="flex gap-4"
                          disabled={contractType === 'shortTerm'}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="resident" id="resident" />
                            <Label htmlFor="resident" className="font-normal cursor-pointer">Resident</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="non-resident" id="non-resident" />
                            <Label htmlFor="non-resident" className="font-normal cursor-pointer">Non-Res.</Label>
                          </div>
                        </RadioGroup>
                        {contractType === 'shortTerm' && (
                          <p className="text-xs text-muted-foreground">Short-term contracts use flat rate</p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Contract Type</Label>
                        <Select value={contractType} onValueChange={(v) => setContractType(v as 'longTerm' | 'shortTerm')}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="longTerm">Long-term (≥3 months)</SelectItem>
                            <SelectItem value="shortTerm">Short-term (&lt;3 months)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    {/* Row 2: Income, Months, Tax Year */}
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="grossIncome" className="text-sm font-medium">
                          {calculationPeriod === 'monthly' ? 'Monthly' : 'Annual'} Gross Income (VND)
                        </Label>
                        <Input
                          id="grossIncome"
                          type="number"
                          placeholder="e.g., 50000000"
                          value={grossIncome}
                          onChange={(e) => setGrossIncome(e.target.value)}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="monthsWorked" className="text-sm font-medium">Months Worked</Label>
                        <Select value={monthsWorked} onValueChange={setMonthsWorked}>
                          <SelectTrigger className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(12)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1} {i === 0 ? 'month' : 'months'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Tax Year</Label>
                        <Select value={taxYear} onValueChange={(v) => setTaxYear(v as '2025' | '2026')}>
                          <SelectTrigger className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    {/* Row 3: Dependants & Insurance */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="dependants" className="text-sm font-medium">Number of Dependants</Label>
                        <Select value={dependants} onValueChange={setDependants}>
                          <SelectTrigger className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i} {i === 1 ? 'dependant' : 'dependants'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Deduction: {formatCurrency(taxYear === '2025' ? DEDUCTIONS_2025.dependant : DEDUCTIONS_2026.dependant)}/month
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Include Insurance Deductions</Label>
                          <Switch
                            checked={includeInsurance}
                            onCheckedChange={setIncludeInsurance}
                            disabled={taxResidency === 'non-resident' || contractType === 'shortTerm'}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Social Insurance (8%) + Health Insurance (1.5%)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Max cap: {formatCurrency(MAX_SI_SALARY)}
                        </p>
                      </div>
                    </div>

                    {/* Tax Year Info */}
                    <Alert className="bg-[#1E3A8A]/5 border-[#1E3A8A]/20">
                      <Info className="w-4 h-4 text-[#1E3A8A]" />
                      <AlertTitle className="text-[#1E3A8A]">Tax Year {taxYear} Deductions</AlertTitle>
                      <AlertDescription className="text-sm">
                        Personal deduction: {formatCurrency(taxYear === '2025' ? DEDUCTIONS_2025.taxpayer : DEDUCTIONS_2026.taxpayer)}/month
                        <span className="mx-2">•</span>
                        Dependant: {formatCurrency(taxYear === '2025' ? DEDUCTIONS_2025.dependant : DEDUCTIONS_2026.dependant)}/month
                      </AlertDescription>
                    </Alert>

                    {/* Calculate Button */}
                    <Button
                      onClick={handleCalculatePIT}
                      className="w-full h-12 text-base bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                      size="lg"
                    >
                      <CalcIcon className="w-5 h-5 mr-2" />
                      Calculate Tax Estimate
                    </Button>

                    {/* Results */}
                    {showResults && pitResults && (
                      <div className="space-y-6 pt-6 border-t">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-[#40E0D0]" />
                          Calculation Results
                        </h3>

                        {/* Summary Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">
                              {calculationPeriod === 'monthly' ? 'Annual' : ''} Gross Income
                            </p>
                            <p className="text-xl font-bold gradient-text">{formatCurrency(pitResults.grossIncome)}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">Total Deductions</p>
                            <p className="text-xl font-bold">{formatCurrency(pitResults.totalDeductions)}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-[#40E0D0]/10 border border-[#40E0D0]/30">
                            <p className="text-xs text-muted-foreground mb-1">Annual PIT</p>
                            <p className="text-xl font-bold text-[#40E0D0]">{formatCurrency(pitResults.annualPIT)}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">Effective Rate</p>
                            <p className="text-xl font-bold">{pitResults.effectiveRate.toFixed(2)}%</p>
                          </div>
                        </div>

                        {/* Deduction Breakdown */}
                        {pitResults.personalRelief > 0 && (
                          <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                            <h4 className="font-medium text-sm">Deduction Breakdown</h4>
                            <div className="grid sm:grid-cols-3 gap-4 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Personal Relief:</span>
                                <span className="font-medium">{formatCurrency(pitResults.personalRelief)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Dependant Relief:</span>
                                <span className="font-medium">{formatCurrency(pitResults.dependantRelief)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Insurance:</span>
                                <span className="font-medium">{formatCurrency(pitResults.insuranceDeduction)}</span>
                              </div>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Taxable Income:</span>
                              <span className="font-bold">{formatCurrency(pitResults.taxableIncome)}</span>
                            </div>
                          </div>
                        )}

                        {/* Tax Bracket Breakdown */}
                        {pitResults.breakdown.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-[#40E0D0]" />
                              Tax Bracket Breakdown
                            </h4>
                            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                              {pitResults.breakdown.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                                      {item.level}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">{item.bracket}</span>
                                  </div>
                                  <div className="flex gap-6 text-sm pl-9 sm:pl-0">
                                    <span className="text-muted-foreground">Rate: <span className="font-medium text-foreground">{item.rate}%</span></span>
                                    <span className="text-muted-foreground">Taxable: <span className="font-medium text-foreground">{formatCurrency(item.taxable)}</span></span>
                                    <span className="font-medium text-[#40E0D0]">Tax: {formatCurrency(item.tax)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Alert>
                          <AlertCircle className="w-4 h-4" />
                          <AlertTitle>Disclaimer</AlertTitle>
                          <AlertDescription>
                            This is a preliminary estimate only. Actual tax liability depends on your complete income structure,
                            applicable tax treaties, and other factors. Contact us for expert finalization services.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Insurance Calculator Tab */}
              <TabsContent value="insurance">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-[#40E0D0]/5 to-[#1E3A8A]/5 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Shield className="w-6 h-6 text-[#40E0D0]" />
                      Insurance Contribution Calculator
                    </CardTitle>
                    <CardDescription className="text-base">
                      Calculate your monthly mandatory social insurance contributions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="salaryBase" className="text-sm font-medium">
                          Salary Base for Insurance (VND)
                        </Label>
                        <Input
                          id="salaryBase"
                          type="number"
                          placeholder="e.g., 50000000"
                          value={salaryBase}
                          onChange={(e) => {
                            setSalaryBase(e.target.value)
                            setShowInsuranceResults(false)
                          }}
                          className="h-11"
                        />
                        <p className="text-xs text-muted-foreground">
                          Maximum cap: {formatCurrency(MAX_SI_SALARY)} (20 × {formatCurrency(BASE_SALARY)})
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Insurance Rates</Label>
                        <div className="space-y-2 p-4 rounded-lg bg-muted/50">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Social Insurance</span>
                            <span className="font-medium">8%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Health Insurance</span>
                            <span className="font-medium">1.5%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Unemployment Insurance</span>
                            <span className="font-medium">1%</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between text-sm font-medium">
                            <span>Total Employee Contribution</span>
                            <span className="text-[#40E0D0]">10.5%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calculate Button */}
                    <Button
                      onClick={handleCalculateInsurance}
                      className="w-full h-12 text-base bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                      size="lg"
                      disabled={!insuranceResults}
                    >
                      <CalcIcon className="w-5 h-5 mr-2" />
                      Calculate Insurance
                    </Button>

                    {/* Results */}
                    {showInsuranceResults && insuranceResults && (
                      <div className="space-y-6 pt-6 border-t">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-[#40E0D0]" />
                          Monthly Insurance Contributions
                        </h3>

                        {insuranceResults.isCapped && (
                          <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
                            <Info className="w-4 h-4 text-amber-600" />
                            <AlertTitle className="text-amber-800 dark:text-amber-200">Salary Capped</AlertTitle>
                            <AlertDescription className="text-sm text-amber-700 dark:text-amber-300">
                              Your salary exceeds the maximum cap. Insurance is calculated on {formatCurrency(MAX_SI_SALARY)} instead of {formatCurrency(insuranceResults.salary)}.
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">Social Insurance (8%)</p>
                            <p className="text-xl font-bold">{formatCurrency(insuranceResults.socialInsurance)}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">Health Insurance (1.5%)</p>
                            <p className="text-xl font-bold">{formatCurrency(insuranceResults.healthInsurance)}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">Unemployment Insurance (1%)</p>
                            <p className="text-xl font-bold">{formatCurrency(insuranceResults.unemploymentInsurance)}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-[#40E0D0]/10 border border-[#40E0D0]/30">
                            <p className="text-xs text-muted-foreground mb-1">Total Monthly Contribution</p>
                            <p className="text-xl font-bold text-[#40E0D0]">{formatCurrency(insuranceResults.total)}</p>
                          </div>
                        </div>

                        {/* Annual Summary */}
                        <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                          <h4 className="font-medium text-sm">Annual Summary</h4>
                          <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monthly Contribution:</span>
                              <span className="font-medium">{formatCurrency(insuranceResults.total)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Annual (12 months):</span>
                              <span className="font-bold text-[#40E0D0]">{formatCurrency(insuranceResults.total * 12)}</span>
                            </div>
                          </div>
                        </div>

                        <Alert>
                          <AlertCircle className="w-4 h-4" />
                          <AlertTitle>Important Note</AlertTitle>
                          <AlertDescription>
                            These are employee contributions. Employers also contribute additional amounts
                            (Social: 17%, Health: 3%, Unemployment: 1%). Foreign employees may have different
                            requirements based on work permit duration.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Tax Brackets Reference */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <Badge variant="outline" className="mb-4 border-[#1E3A8A]/30 text-[#1E3A8A]">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Reference
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                  Tax Brackets 2025 (Monthly)
                </h2>
                <p className="text-muted-foreground">
                  Progressive Personal Income Tax rates for tax residents
                </p>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#1E3A8A] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-medium">Level</th>
                        <th className="px-6 py-4 text-left font-medium">Monthly Income Range</th>
                        <th className="px-6 py-4 text-center font-medium">Tax Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {TAX_BRACKETS_2025.map((bracket, i) => (
                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                              {bracket.level}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            {bracket.maxIncome === Infinity
                              ? `Over ${formatCurrency(bracket.minIncome)}`
                              : `${formatCurrency(bracket.minIncome)} - ${formatCurrency(bracket.maxIncome)}`}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="font-bold text-[#40E0D0]">{(bracket.rate * 100).toFixed(0)}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Legal Basis Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <Badge variant="outline" className="mb-4 border-[#1E3A8A]/30 text-[#1E3A8A]">
                  <Scale className="w-3 h-3 mr-1" />
                  Legal Basis
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                  Official Sources & Regulations
                </h2>
                <p className="text-muted-foreground">
                  All calculations based on official Vietnamese government regulations
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <FileText className="w-8 h-8 text-[#40E0D0] mb-4" />
                  <h3 className="font-semibold mb-2">PIT Law (Consolidated)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Law No. 04/2012/QH13 - Personal Income Tax Law as amended
                  </p>
                  <a
                    href="https://vbpl.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1E3A8A] hover:underline flex items-center gap-1"
                  >
                    View on vbpl.vn <ExternalLink className="w-3 h-3" />
                  </a>
                </Card>

                <Card className="p-6">
                  <FileText className="w-8 h-8 text-[#40E0D0] mb-4" />
                  <h3 className="font-semibold mb-2">Circular 111/2013/TT-BTC</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Guidance on PIT law implementation and calculation methods
                  </p>
                  <a
                    href="https://thuenhanuoc.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1E3A8A] hover:underline flex items-center gap-1"
                  >
                    View on thuenhanuoc.vn <ExternalLink className="w-3 h-3" />
                  </a>
                </Card>

                <Card className="p-6">
                  <FileText className="w-8 h-8 text-[#40E0D0] mb-4" />
                  <h3 className="font-semibold mb-2">Decree 65/2013/ND-CP</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Detailed regulations on PIT Law implementation
                  </p>
                  <a
                    href="https://gdt.gov.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1E3A8A] hover:underline flex items-center gap-1"
                  >
                    View on gdt.gov.vn <ExternalLink className="w-3 h-3" />
                  </a>
                </Card>

                <Card className="p-6">
                  <FileText className="w-8 h-8 text-[#40E0D0] mb-4" />
                  <h3 className="font-semibold mb-2">Social Insurance Law</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Law on Social Insurance and Health Insurance for employees
                  </p>
                  <a
                    href="https://chinhphu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1E3A8A] hover:underline flex items-center gap-1"
                  >
                    View on chinhphu.vn <ExternalLink className="w-3 h-3" />
                  </a>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <AlertTitle className="text-amber-800 dark:text-amber-200 text-lg font-semibold">
                  Important Disclaimer
                </AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-300 space-y-3 mt-2">
                  <p>
                    The calculations provided by this tool are <strong>estimates only</strong> and should not be
                    considered as official tax advice or final tax liability.
                  </p>
                  <p>
                    Actual tax obligations may vary based on factors including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Multiple income sources and employer changes</li>
                    <li>Applicable Double Taxation Agreements (DTA)</li>
                    <li>Specific deductions and exemptions</li>
                    <li>Changes in tax regulations</li>
                    <li>Individual circumstances not captured by this calculator</li>
                  </ul>
                  <p className="font-medium">
                    For accurate tax finalization and compliance, please consult with our licensed tax professionals.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-[#1E3A8A] to-[#4169E1] text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-white/30 text-white bg-white/10">
                <Sparkles className="w-3 h-3 mr-1" />
                Expert Review
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need Expert Tax Review?
              </h2>

              <p className="text-lg text-white/80 mb-8">
                Our licensed tax professionals can help ensure accurate PIT finalization,
                maximize deductions, and ensure full compliance with Vietnamese tax regulations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1E3A8A] hover:bg-white/90 h-12 px-8"
                >
                  <Link href="/#contact">
                    Book Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#1E3A8A] font-semibold h-12 px-8 transition-all duration-300"
                >
                  <Link href="/#pricing">
                    View Pricing
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#40E0D0]" />
                  <span>Licensed Tax Advisors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#40E0D0]" />
                  <span>500+ Cases Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#40E0D0]" />
                  <span>100% Compliance Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
