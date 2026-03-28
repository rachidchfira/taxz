'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator as CalcIcon, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  ArrowRight,
  Shield,
  RefreshCcw,
  BadgePercent,
  FileText,
  DollarSign
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Tax Brackets for Personal Income Tax (PIT) in Vietnam
const TAX_BRACKETS_2025 = [
  { level: 1, incomeMonthly: 5000000, incomeYearly: 60000000, rate: 0.05, deduct: 0 },
  { level: 2, incomeMonthly: 10000000, incomeYearly: 120000000, rate: 0.10, deduct: 250000 },
  { level: 3, incomeMonthly: 18000000, incomeYearly: 216000000, rate: 0.15, deduct: 750000 },
  { level: 4, incomeMonthly: 32000000, incomeYearly: 384000000, rate: 0.20, deduct: 1650000 },
  { level: 5, incomeMonthly: 52000000, incomeYearly: 624000000, rate: 0.25, deduct: 3250000 },
  { level: 6, incomeMonthly: 80000000, incomeYearly: 960000000, rate: 0.30, deduct: 5850000 },
  { level: 7, incomeMonthly: Infinity, incomeYearly: Infinity, rate: 0.35, deduct: 9850000 },
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
const MAX_SI_SALARY = 20 * BASE_SALARY

function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}

// Get tax bracket based on income
function getTaxBracket(income: number, isMonthly: boolean) {
  const key = isMonthly ? 'incomeMonthly' : 'incomeYearly'
  for (const bracket of TAX_BRACKETS_2025) {
    if (income <= bracket[key]) {
      return bracket
    }
  }
  return TAX_BRACKETS_2025[TAX_BRACKETS_2025.length - 1]
}

// Calculate progressive tax
function calculateProgressiveTax(taxableIncome: number, isMonthly: boolean) {
  const bracket = getTaxBracket(taxableIncome, isMonthly)
  return taxableIncome * bracket.rate - bracket.deduct
}

export function CalculatorSection() {
  // State for PIT Calculator
  const [taxYear, setTaxYear] = useState('2025')
  const [calculationPeriod, setCalculationPeriod] = useState('monthly')
  const [taxResidency, setTaxResidency] = useState('resident')
  const [contractType, setContractType] = useState('longTerm')
  const [monthlyGross, setMonthlyGross] = useState('')
  const [monthsWorked, setMonthsWorked] = useState('12')
  const [dependants, setDependants] = useState('0')
  const [includeInsurance, setIncludeInsurance] = useState(true)
  const [showResults, setShowResults] = useState(false)
  
  // State for Insurance Calculator
  const [salaryBase, setSalaryBase] = useState('')
  const [insuranceResults, setInsuranceResults] = useState<{
    socialInsurance: number
    healthInsurance: number
    unemploymentInsurance: number
    total: number
  } | null>(null)
  
  // Results
  const [results, setResults] = useState<{
    grossIncome: number
    totalDeductions: number
    taxableIncome: number
    annualPIT: number
    netIncome: number
    effectiveRate: number
    breakdown: Array<{
      bracket: string
      taxable: number
      tax: number
      rate: number
    }>
  } | null>(null)

  const handleCalculatePIT = () => {
    const gross = parseFloat(monthlyGross) || 0
    const months = parseInt(monthsWorked) || 12
    const deps = parseInt(dependants) || 0
    const isMonthly = calculationPeriod === 'monthly'

    if (gross <= 0) return

    const deductions = taxYear === '2025' ? DEDUCTIONS_2025 : DEDUCTIONS_2026
    
    // Calculate based on contract type and residency
    if (contractType === 'shortTerm') {
      // Short-term contract (< 3 months)
      const income = isMonthly ? gross * months : gross
      if (income < 2000000) {
        setResults({
          grossIncome: income,
          totalDeductions: 0,
          taxableIncome: income,
          annualPIT: 0,
          netIncome: income,
          effectiveRate: 0,
          breakdown: [],
        })
        setShowResults(true)
        return
      }
      
      const taxPayable = income * 0.1
      setResults({
        grossIncome: income,
        totalDeductions: 0,
        taxableIncome: income,
        annualPIT: taxPayable,
        netIncome: income - taxPayable,
        effectiveRate: 10,
        breakdown: [],
      })
      setShowResults(true)
      return
    }

    // Non-resident
    if (taxResidency === 'non-resident') {
      const income = isMonthly ? gross * months : gross
      const taxPayable = income * 0.2
      
      setResults({
        grossIncome: income,
        totalDeductions: 0,
        taxableIncome: income,
        annualPIT: taxPayable,
        netIncome: income - taxPayable,
        effectiveRate: 20,
        breakdown: [],
      })
      setShowResults(true)
      return
    }

    // Resident with long-term contract
    const annualGross = isMonthly ? gross * months : gross
    const personalRelief = deductions.taxpayer * months
    const dependantRelief = deps * deductions.dependant * months
    
    // Insurance deductions
    let insuranceDeductions = 0
    if (includeInsurance) {
      const cappedSalary = Math.min(gross, MAX_SI_SALARY)
      const monthlyInsurance = cappedSalary * (SI_RATES.socialInsurance + SI_RATES.healthInsurance)
      insuranceDeductions = monthlyInsurance * months
    }

    const totalDeductions = personalRelief + dependantRelief + insuranceDeductions
    let taxableIncome = Math.max(0, annualGross - totalDeductions)
    
    // Calculate tax
    let annualPIT = 0
    const breakdown: Array<{ bracket: string; taxable: number; tax: number; rate: number }> = []
    
    if (taxableIncome > 0) {
      annualPIT = calculateProgressiveTax(taxableIncome, false)
      
      // Generate breakdown
      let remaining = taxableIncome
      for (const bracket of TAX_BRACKETS_2025) {
        if (remaining <= 0) break
        const annualMax = bracket.incomeYearly
        const annualMin = bracket.level === 1 ? 0 : TAX_BRACKETS_2025[bracket.level - 2].incomeYearly
        const taxableInBracket = Math.min(remaining, annualMax - annualMin)
        
        if (taxableInBracket > 0) {
          breakdown.push({
            bracket: bracket.level === 7 
              ? `Over ${formatCurrency(annualMin)}`
              : `${formatCurrency(annualMin)} - ${formatCurrency(annualMax)}`,
            taxable: taxableInBracket,
            tax: taxableInBracket * bracket.rate,
            rate: bracket.rate * 100,
          })
        }
        remaining -= taxableInBracket
      }
    }

    const netIncome = annualGross - annualPIT
    const effectiveRate = annualGross > 0 ? (annualPIT / annualGross) * 100 : 0

    setResults({
      grossIncome: annualGross,
      totalDeductions,
      taxableIncome,
      annualPIT,
      netIncome,
      effectiveRate,
      breakdown,
    })
    setShowResults(true)
  }

  const handleCalculateInsurance = () => {
    const salary = parseFloat(salaryBase) || 0
    if (salary <= 0) return

    const cappedSalary = Math.min(salary, MAX_SI_SALARY)
    const socialInsurance = cappedSalary * SI_RATES.socialInsurance
    const healthInsurance = cappedSalary * SI_RATES.healthInsurance
    const unemploymentInsurance = cappedSalary * SI_RATES.unemploymentInsurance
    const total = socialInsurance + healthInsurance + unemploymentInsurance

    setInsuranceResults({
      socialInsurance,
      healthInsurance,
      unemploymentInsurance,
      total,
    })
  }

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
            <CalcIcon className="w-3 h-3 mr-1" />
            Interactive Calculators
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Calculate Your Tax & Insurance
          </h2>
          <p className="text-lg text-muted-foreground">
            Use our calculators to estimate your Personal Income Tax and insurance contributions 
            based on official Vietnamese regulations.
          </p>
        </div>

        {/* Calculator Tabs */}
        <Tabs defaultValue="pit" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="pit" className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4" />
              PIT Calculator
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Insurance Calculator
            </TabsTrigger>
          </TabsList>

          {/* PIT Calculator Tab */}
          <TabsContent value="pit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BadgePercent className="w-5 h-5 text-[#40E0D0]" />
                  Personal Income Tax Calculator
                </CardTitle>
                <CardDescription>
                  Estimate your annual PIT based on residency status and income
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Row 1: Period & Residency */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Calculation Period</Label>
                    <RadioGroup value={calculationPeriod} onValueChange={setCalculationPeriod} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="font-normal">Monthly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yearly" id="yearly" />
                        <Label htmlFor="yearly" className="font-normal">Yearly</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tax Residency</Label>
                    <RadioGroup value={taxResidency} onValueChange={setTaxResidency} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="resident" id="resident" />
                        <Label htmlFor="resident" className="font-normal">Resident</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-resident" id="non-resident" />
                        <Label htmlFor="non-resident" className="font-normal">Non-Res.</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Contract Type</Label>
                    <Select value={contractType} onValueChange={setContractType}>
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

                {/* Row 2: Income & Tax Year */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grossIncome">
                      {calculationPeriod === 'monthly' ? 'Monthly' : 'Annual'} Gross Income (VND)
                    </Label>
                    <Input
                      id="grossIncome"
                      type="number"
                      placeholder="e.g., 50000000"
                      value={monthlyGross}
                      onChange={(e) => setMonthlyGross(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monthsWorked">Months Worked</Label>
                    <Select value={monthsWorked} onValueChange={setMonthsWorked}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} months
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tax Year</Label>
                    <Select value={taxYear} onValueChange={setTaxYear}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 3: Dependants & Insurance */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dependants">Number of Dependants</Label>
                    <Select value={dependants} onValueChange={setDependants}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(10)].map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} dependants
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Deduction: {formatCurrency(taxYear === '2025' ? DEDUCTIONS_2025.dependant : DEDUCTIONS_2026.dependant)}/month each
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Include Insurance Deductions</Label>
                      <Switch
                        checked={includeInsurance}
                        onCheckedChange={setIncludeInsurance}
                        disabled={taxResidency === 'non-resident'}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Social Insurance (8%) + Health Insurance (1.5%)
                    </p>
                  </div>
                </div>

                {/* Calculate Button */}
                <Button onClick={handleCalculatePIT} className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" size="lg">
                  <CalcIcon className="w-4 h-4 mr-2" />
                  Calculate Tax Estimate
                </Button>

                {/* Results */}
                {showResults && results && (
                  <div className="space-y-6 pt-6 border-t">
                    <div className="grid sm:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Annual Gross Income</p>
                        <p className="text-xl font-bold gradient-text">{formatCurrency(results.grossIncome)}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Total Deductions</p>
                        <p className="text-xl font-bold">{formatCurrency(results.totalDeductions)}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#40E0D0]/10 border border-[#40E0D0]/30">
                        <p className="text-xs text-muted-foreground mb-1">Annual PIT</p>
                        <p className="text-xl font-bold text-[#40E0D0]">{formatCurrency(results.annualPIT)}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Effective Rate</p>
                        <p className="text-xl font-bold">{results.effectiveRate.toFixed(2)}%</p>
                      </div>
                    </div>

                    {/* Bracket Breakdown */}
                    {results.breakdown.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Tax Bracket Breakdown</h4>
                        <div className="space-y-2">
                          {results.breakdown.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm p-2 rounded bg-muted/30">
                              <span className="text-muted-foreground">{item.bracket}</span>
                              <div className="flex gap-4">
                                <span>Taxable: {formatCurrency(item.taxable)}</span>
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
                        This is a preliminary estimate only. Actual tax liability depends on your complete income structure. 
                        Contact us for expert finalization services.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Calculator Tab */}
          <TabsContent value="insurance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#40E0D0]" />
                  Insurance Contribution Calculator
                </CardTitle>
                <CardDescription>
                  Calculate your monthly social insurance contributions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="salaryBase">Salary Base for Insurance (VND)</Label>
                  <Input
                    id="salaryBase"
                    type="number"
                    placeholder="e.g., 50000000"
                    value={salaryBase}
                    onChange={(e) => setSalaryBase(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum cap: {formatCurrency(MAX_SI_SALARY)} (20 × Base Salary)
                  </p>
                </div>

                <Button onClick={handleCalculateInsurance} className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90" size="lg">
                  <CalcIcon className="w-4 h-4 mr-2" />
                  Calculate Insurance
                </Button>

                {insuranceResults && (
                  <div className="space-y-4 pt-6 border-t">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Social Insurance (8%)</p>
                        <p className="text-lg font-bold">{formatCurrency(insuranceResults.socialInsurance)}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Health Insurance (1.5%)</p>
                        <p className="text-lg font-bold">{formatCurrency(insuranceResults.healthInsurance)}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Unemployment Insurance (1%)</p>
                        <p className="text-lg font-bold">{formatCurrency(insuranceResults.unemploymentInsurance)}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#40E0D0]/10 border border-[#40E0D0]/30">
                        <p className="text-xs text-muted-foreground mb-1">Total Monthly Contribution</p>
                        <p className="text-lg font-bold text-[#40E0D0]">{formatCurrency(insuranceResults.total)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Official Sources */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All calculations based on official Vietnamese government sources
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['vbpl.vn', 'gdt.gov.vn', 'chinhphu.vn'].map((source) => (
              <div key={source} className="official-badge">
                <Shield className="w-3 h-3" />
                <span>{source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
