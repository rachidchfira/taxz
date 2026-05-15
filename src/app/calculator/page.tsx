'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Calculator as CalcIcon,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  RefreshCcw,
  BadgePercent,
  Users,
  MapPin,
  Globe,
  TrendingUp,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import {
  calcGrossToNet,
  calcNetToGross,
  PROFILES,
  UI_CAP_BY_ZONE,
  ZONE_MIN_WAGES,
  SI_CAP_BASE,
  HI_CAP_BASE,
  TU_CAP_BASE,
  type CalcInput,
  type CalcResult,
  type Zone,
  type Nationality,
  type InsuranceType,
  type PitMethod,
  type TaxProfile,
} from '@/lib/tax-engine'

// ─── Helpers ───────────────────────────────────────────────────────────────────

function fmtVND(v: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v)
}

function fmtUSD(v: number, rate: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(v / rate)
}

function fmtMoney(v: number, currency: 'VND' | 'USD', rate: number) {
  return currency === 'VND' ? fmtVND(v) : fmtUSD(v, rate)
}

function pct(v: number) {
  return v.toFixed(2) + '%'
}

// ─── Row component for breakdown tables ────────────────────────────────────────

function Row({
  label,
  value,
  sub,
  highlight,
  bold,
  indent,
  negative,
  color,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
  bold?: boolean
  indent?: boolean
  negative?: boolean
  color?: string
}) {
  return (
    <div
      className={[
        'flex items-center justify-between py-2.5 px-3 rounded-lg',
        highlight ? 'bg-[#1E3A8A]/8 border border-[#1E3A8A]/15' : 'hover:bg-muted/40',
        indent ? 'ml-4' : '',
      ].join(' ')}
    >
      <div>
        <span className={['text-sm', bold ? 'font-semibold' : 'text-muted-foreground'].join(' ')}>
          {label}
        </span>
        {sub && <span className="ml-2 text-xs text-muted-foreground/70">{sub}</span>}
      </div>
      <span
        className={[
          'text-sm font-medium tabular-nums',
          bold ? 'text-base font-bold' : '',
          negative ? 'text-red-600 dark:text-red-400' : '',
          color || '',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function CalculatorPage() {
  // Direction
  const [direction, setDirection] = useState<'GROSS_TO_NET' | 'NET_TO_GROSS'>('GROSS_TO_NET')

  // Inputs
  const [salaryInput, setSalaryInput] = useState('')
  const [currency, setCurrency]       = useState<'VND' | 'USD'>('VND')
  const [exchangeRate, setExchangeRate] = useState('25000')
  const [nationality, setNationality]   = useState<Nationality>('VIETNAMESE')
  const [insuranceType, setInsuranceType] = useState<InsuranceType>('FULL_SALARY')
  const [customInsurance, setCustomInsurance] = useState('')
  const [pitMethod, setPitMethod]     = useState<PitMethod>('PROGRESSIVE')
  const [zone, setZone]               = useState<Zone>(1)
  const [dependants, setDependants]   = useState('0')
  const [profile, setProfile]         = useState<TaxProfile>('2026')

  // Results
  const [result, setResult] = useState<CalcResult | null>(null)
  const [computedGross, setComputedGross] = useState<number | null>(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    setError('')
    setResult(null)
    setComputedGross(null)

    const rate = parseFloat(exchangeRate) || 25000
    const rawAmount = parseFloat(salaryInput) || 0
    if (rawAmount <= 0) {
      setError('Please enter a valid salary amount.')
      return
    }
    const amountVND = currency === 'VND' ? rawAmount : rawAmount * rate

    const customInsuranceVND = currency === 'VND'
      ? (parseFloat(customInsurance) || 0)
      : (parseFloat(customInsurance) || 0) * rate

    const input: CalcInput = {
      grossSalary: amountVND,
      insuranceType,
      customInsuranceSalary: customInsuranceVND,
      pitMethod,
      zone,
      dependants: parseInt(dependants) || 0,
      nationality,
      profile,
    }

    if (direction === 'GROSS_TO_NET') {
      setResult(calcGrossToNet(input))
    } else {
      const { gross, result: r } = calcNetToGross(amountVND, {
        insuranceType,
        customInsuranceSalary: customInsuranceVND,
        pitMethod,
        zone,
        dependants: parseInt(dependants) || 0,
        nationality,
        profile,
      })
      setComputedGross(gross)
      setResult(r)
    }
  }

  const handleReset = () => {
    setSalaryInput('')
    setResult(null)
    setComputedGross(null)
    setError('')
  }

  const rate = parseFloat(exchangeRate) || 25000
  const cfg = PROFILES[profile]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative py-10 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/6 via-background to-[#40E0D0]/6 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#40E0D0]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 border-[#40E0D0]/40 text-[#40E0D0] bg-[#40E0D0]/5 px-3 py-1">
                <CalcIcon className="w-3.5 h-3.5 mr-1.5" />
                Vietnam Salary Calculator 2025 / 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                <span className="gradient-text">Gross ↔ Net</span> Salary Calculator
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Full employee &amp; employer breakdown — Social Insurance, Health Insurance,
                Unemployment Insurance, Trade Union, and Personal Income Tax.
              </p>
            </div>
          </div>
        </section>

        {/* ── Main Calculator ── */}
        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">

            <Card className="shadow-xl border-0 overflow-hidden">
              {/* Card header gradient bar */}
              <div className="h-1 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#40E0D0]" />

              <CardHeader className="bg-gradient-to-r from-[#1E3A8A]/5 to-[#40E0D0]/5 pb-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BadgePercent className="w-5 h-5 text-[#40E0D0]" />
                    Salary Calculator
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Profile selector */}
                    <Select value={profile} onValueChange={(v) => { setProfile(v as TaxProfile); setResult(null) }}>
                      <SelectTrigger className="w-36 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">Rules: 2025 (7-bracket)</SelectItem>
                        <SelectItem value="2026">Rules: 2026 (5-bracket)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={handleReset} className="h-8 text-xs gap-1">
                      <RefreshCcw className="w-3.5 h-3.5" />Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 lg:p-7 space-y-6">

                {/* ── Direction toggle ── */}
                <div className="flex rounded-xl border overflow-hidden">
                  <button
                    onClick={() => { setDirection('GROSS_TO_NET'); setResult(null) }}
                    className={[
                      'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors',
                      direction === 'GROSS_TO_NET'
                        ? 'bg-[#1E3A8A] text-white'
                        : 'hover:bg-muted/60 text-muted-foreground',
                    ].join(' ')}
                  >
                    <ArrowRight className="w-4 h-4" />
                    Gross → Net
                  </button>
                  <button
                    onClick={() => { setDirection('NET_TO_GROSS'); setResult(null) }}
                    className={[
                      'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors',
                      direction === 'NET_TO_GROSS'
                        ? 'bg-[#1E3A8A] text-white'
                        : 'hover:bg-muted/60 text-muted-foreground',
                    ].join(' ')}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Net → Gross
                  </button>
                </div>

                {/* ── Salary input ── */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-sm font-medium">
                      {direction === 'GROSS_TO_NET' ? 'Gross' : 'Net (Desired)'} Salary
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder={currency === 'VND' ? 'e.g. 50000000' : 'e.g. 2000'}
                        value={salaryInput}
                        onChange={(e) => setSalaryInput(e.target.value)}
                        className="h-11"
                      />
                      <Select value={currency} onValueChange={(v) => setCurrency(v as 'VND' | 'USD')}>
                        <SelectTrigger className="w-24 h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VND">VND</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {currency === 'VND' && salaryInput && parseFloat(salaryInput) > 0 && (
                      <p className="text-xs text-muted-foreground">
                        ≈ {fmtUSD(parseFloat(salaryInput), rate)} at {parseInt(exchangeRate).toLocaleString()} VND/USD
                      </p>
                    )}
                  </div>
                  {currency === 'USD' && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Exchange Rate (VND/USD)</Label>
                      <Input
                        type="number"
                        value={exchangeRate}
                        onChange={(e) => setExchangeRate(e.target.value)}
                        className="h-11"
                      />
                    </div>
                  )}
                </div>

                <Separator />

                {/* ── Options grid ── */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                  {/* Nationality */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                      Nationality
                    </Label>
                    <Select value={nationality} onValueChange={(v) => setNationality(v as Nationality)}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VIETNAMESE">Vietnamese</SelectItem>
                        <SelectItem value="EXPAT">Expat / Foreign</SelectItem>
                      </SelectContent>
                    </Select>
                    {nationality === 'EXPAT' && (
                      <p className="text-xs text-[#40E0D0]">Unemployment Insurance waived for expats</p>
                    )}
                  </div>

                  {/* PIT Method */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <BadgePercent className="w-3.5 h-3.5 text-muted-foreground" />
                      PIT Method
                    </Label>
                    <Select value={pitMethod} onValueChange={(v) => setPitMethod(v as PitMethod)}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PROGRESSIVE">Progressive (standard)</SelectItem>
                        <SelectItem value="FIXED_10">Fixed 10% (withholding)</SelectItem>
                      </SelectContent>
                    </Select>
                    {pitMethod === 'FIXED_10' && (
                      <p className="text-xs text-amber-600 dark:text-amber-400">⚠ Assumed logic — verify with employer</p>
                    )}
                  </div>

                  {/* Zone */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      Employer Zone
                    </Label>
                    <Select value={zone.toString()} onValueChange={(v) => setZone(parseInt(v) as Zone)}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Zone 1 — HCM/Hanoi (5,310,000)</SelectItem>
                        <SelectItem value="2">Zone 2 — Provincial cities (4,730,000)</SelectItem>
                        <SelectItem value="3">Zone 3 — Districts (4,140,000)</SelectItem>
                        <SelectItem value="4">Zone 4 — Rural areas (3,700,000)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      UI cap: {fmtVND(UI_CAP_BY_ZONE[zone])}
                    </p>
                  </div>

                  {/* Dependants */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      Dependants
                    </Label>
                    <Select value={dependants} onValueChange={setDependants}>
                      <SelectTrigger className="h-10">
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
                    <p className="text-xs text-muted-foreground">
                      {fmtVND(cfg.dependantDeduction)}/person/month
                    </p>
                  </div>

                  {/* Insurance basis */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                      Insurance Basis
                    </Label>
                    <Select value={insuranceType} onValueChange={(v) => setInsuranceType(v as InsuranceType)}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FULL_SALARY">Full Salary</SelectItem>
                        <SelectItem value="OTHER">Other (custom)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom insurance salary */}
                  {insuranceType === 'OTHER' && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Insurance Salary Base ({currency})</Label>
                      <Input
                        type="number"
                        placeholder={currency === 'VND' ? 'e.g. 30000000' : 'e.g. 1200'}
                        value={customInsurance}
                        onChange={(e) => setCustomInsurance(e.target.value)}
                        className="h-10"
                      />
                    </div>
                  )}

                </div>

                {/* Info alert */}
                <Alert className="bg-[#1E3A8A]/5 border-[#1E3A8A]/20 py-3">
                  <Info className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                  <AlertDescription className="text-xs text-muted-foreground">
                    <strong className="text-foreground">{profile === '2026' ? '2026 rules' : '2025 rules'}:</strong>{' '}
                    Personal deduction {fmtVND(cfg.personalDeduction)}/month
                    {' '}+{' '}
                    {fmtVND(cfg.dependantDeduction)}/dependant/month
                    {profile === '2026' && (
                      <span className="ml-1 text-[#40E0D0]">• 5-bracket PIT (updated Jan 2026)</span>
                    )}
                  </AlertDescription>
                </Alert>

                {error && (
                  <Alert variant="destructive" className="py-3">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* ── Calculate button ── */}
                <Button
                  onClick={handleCalculate}
                  className="w-full h-12 text-base bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-semibold"
                  size="lg"
                >
                  <CalcIcon className="w-5 h-5 mr-2" />
                  Calculate
                </Button>

                {/* ── Results ── */}
                {result && (
                  <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-300">

                    {/* Summary bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {direction === 'NET_TO_GROSS' && computedGross != null && (
                        <div className="p-4 rounded-xl bg-[#1E3A8A]/8 border border-[#1E3A8A]/15 text-center col-span-2 sm:col-span-4">
                          <p className="text-xs text-muted-foreground mb-1">Required Gross Salary</p>
                          <p className="text-2xl font-bold gradient-text">{fmtMoney(computedGross, currency, rate)}</p>
                          {currency === 'USD' && (
                            <p className="text-xs text-muted-foreground mt-0.5">{fmtVND(computedGross)}</p>
                          )}
                        </div>
                      )}
                      <SummaryCard
                        label="Gross Salary"
                        value={fmtMoney(result.employee.grossSalary, currency, rate)}
                        sub={currency === 'USD' ? fmtVND(result.employee.grossSalary) : undefined}
                      />
                      <SummaryCard
                        label="Net Salary"
                        value={fmtMoney(result.employee.netSalary, currency, rate)}
                        sub={currency === 'USD' ? fmtVND(result.employee.netSalary) : undefined}
                        highlight
                      />
                      <SummaryCard
                        label="Total PIT"
                        value={fmtMoney(result.employee.pit, currency, rate)}
                        sub={`${pct(result.employee.effectiveRate)} effective`}
                      />
                      <SummaryCard
                        label="Employer Cost"
                        value={fmtMoney(result.employer.totalEmployerCost, currency, rate)}
                        sub={currency === 'USD' ? fmtVND(result.employer.totalEmployerCost) : undefined}
                      />
                    </div>

                    {/* Detailed breakdowns */}
                    <Tabs defaultValue="employee" className="w-full">
                      <TabsList className="grid grid-cols-3 w-full mb-4">
                        <TabsTrigger value="employee" className="text-xs sm:text-sm">
                          Employee Breakdown
                        </TabsTrigger>
                        <TabsTrigger value="employer" className="text-xs sm:text-sm">
                          Employer Cost
                        </TabsTrigger>
                        <TabsTrigger value="pit" className="text-xs sm:text-sm">
                          PIT Detail
                        </TabsTrigger>
                      </TabsList>

                      {/* Employee breakdown */}
                      <TabsContent value="employee">
                        <Card className="border shadow-sm">
                          <CardContent className="p-4 space-y-0.5">
                            <Row label="Gross Salary" value={fmtMoney(result.employee.grossSalary, currency, rate)} bold />
                            <Separator className="my-2" />
                            <Row
                              label="Social Insurance (8%)"
                              value={`− ${fmtMoney(result.employee.employeeSI, currency, rate)}`}
                              sub={`cap ${fmtVND(SI_CAP_BASE)}`}
                              indent negative
                            />
                            <Row
                              label="Health Insurance (1.5%)"
                              value={`− ${fmtMoney(result.employee.employeeHI, currency, rate)}`}
                              sub={`cap ${fmtVND(HI_CAP_BASE)}`}
                              indent negative
                            />
                            <Row
                              label={`Unemployment Insurance ${nationality === 'EXPAT' ? '(waived)' : '(1%)'}`}
                              value={nationality === 'EXPAT' ? '—' : `− ${fmtMoney(result.employee.employeeUI, currency, rate)}`}
                              sub={nationality === 'EXPAT' ? undefined : `cap ${fmtVND(UI_CAP_BY_ZONE[zone])}`}
                              indent negative={nationality !== 'EXPAT'}
                            />
                            <Separator className="my-2" />
                            <Row
                              label="Salary Before Tax"
                              value={fmtMoney(result.employee.salaryBeforeTax, currency, rate)}
                              bold
                            />
                            <Separator className="my-2" />
                            <Row
                              label="Personal Deduction"
                              value={`− ${fmtMoney(result.employee.personalDeduction, currency, rate)}`}
                              indent negative
                            />
                            {result.employee.dependantDeduction > 0 && (
                              <Row
                                label={`Dependant Deduction (×${dependants})`}
                                value={`− ${fmtMoney(result.employee.dependantDeduction, currency, rate)}`}
                                indent negative
                              />
                            )}
                            <Separator className="my-2" />
                            <Row
                              label="Taxable Salary"
                              value={fmtMoney(result.employee.taxableSalary, currency, rate)}
                              bold
                            />
                            <Row
                              label={`Personal Income Tax ${pitMethod === 'FIXED_10' ? '(10% fixed)' : '(progressive)'}`}
                              value={`− ${fmtMoney(result.employee.pit, currency, rate)}`}
                              negative bold={false}
                            />
                            <Separator className="my-2" />
                            <Row
                              label="Net Salary"
                              value={fmtMoney(result.employee.netSalary, currency, rate)}
                              bold highlight
                              color="text-[#1E3A8A] dark:text-[#60a5fa]"
                            />
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Employer cost */}
                      <TabsContent value="employer">
                        <Card className="border shadow-sm">
                          <CardContent className="p-4 space-y-0.5">
                            <Row label="Gross Salary" value={fmtMoney(result.employer.grossSalary, currency, rate)} bold />
                            <Separator className="my-2" />
                            <Row
                              label="Social Insurance (17.5%)"
                              value={`+ ${fmtMoney(result.employer.employerSI, currency, rate)}`}
                              sub={`cap ${fmtVND(SI_CAP_BASE)}`}
                              indent
                            />
                            <Row
                              label="Health Insurance (3%)"
                              value={`+ ${fmtMoney(result.employer.employerHI, currency, rate)}`}
                              sub={`cap ${fmtVND(HI_CAP_BASE)}`}
                              indent
                            />
                            <Row
                              label={`Unemployment Insurance ${nationality === 'EXPAT' ? '(waived)' : '(1%)'}`}
                              value={nationality === 'EXPAT' ? '—' : `+ ${fmtMoney(result.employer.employerUI, currency, rate)}`}
                              sub={nationality === 'EXPAT' ? undefined : `cap ${fmtVND(UI_CAP_BY_ZONE[zone])}`}
                              indent
                            />
                            <Row
                              label="Trade Union (2%)"
                              value={`+ ${fmtMoney(result.employer.tradeUnion, currency, rate)}`}
                              sub={`cap ${fmtVND(TU_CAP_BASE)}`}
                              indent
                            />
                            <Separator className="my-2" />
                            <Row
                              label="Total Employer Cost"
                              value={fmtMoney(result.employer.totalEmployerCost, currency, rate)}
                              bold highlight
                              color="text-[#1E3A8A] dark:text-[#60a5fa]"
                            />
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* PIT detail */}
                      <TabsContent value="pit">
                        <Card className="border shadow-sm">
                          <CardContent className="p-4">
                            {result.pitBrackets.length === 0 ? (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                Taxable salary is zero — no PIT applies.
                              </p>
                            ) : (
                              <div className="space-y-1">
                                <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground font-medium px-3 pb-1">
                                  <span className="col-span-2">Bracket</span>
                                  <span className="text-right">Taxable</span>
                                  <span className="text-right">Tax</span>
                                </div>
                                {result.pitBrackets.map((b, i) => (
                                  <div key={i} className="grid grid-cols-4 gap-2 text-sm py-2 px-3 rounded-lg hover:bg-muted/40">
                                    <span className="col-span-2 text-muted-foreground">
                                      {b.bracket}
                                      <Badge variant="outline" className="ml-2 text-xs py-0">{b.rate}%</Badge>
                                    </span>
                                    <span className="text-right tabular-nums text-xs">{fmtVND(b.taxable)}</span>
                                    <span className="text-right tabular-nums text-xs font-medium text-[#1E3A8A] dark:text-[#60a5fa]">
                                      {fmtVND(b.tax)}
                                    </span>
                                  </div>
                                ))}
                                <Separator className="my-2" />
                                <div className="grid grid-cols-4 gap-2 text-sm py-2 px-3 rounded-lg bg-[#1E3A8A]/8 border border-[#1E3A8A]/15">
                                  <span className="col-span-2 font-semibold">Total PIT</span>
                                  <span className="text-right tabular-nums text-xs">{fmtVND(result.employee.taxableSalary)}</span>
                                  <span className="text-right tabular-nums text-sm font-bold text-[#1E3A8A] dark:text-[#60a5fa]">
                                    {fmtVND(result.employee.pit)}
                                  </span>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>

                    {/* Disclaimer */}
                    <Alert className="py-3 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <AlertDescription className="text-xs text-amber-700 dark:text-amber-300">
                        Estimates only. Actual amounts depend on your complete income structure, employer agreements,
                        and tax authority assessments. Consult a qualified tax professional for finalisation.
                      </AlertDescription>
                    </Alert>

                  </div>
                )}

              </CardContent>
            </Card>

            {/* ── Reference Tables ── */}
            <div className="mt-10 grid md:grid-cols-2 gap-6">

              {/* PIT brackets */}
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#40E0D0]" />
                    PIT Brackets — {profile === '2026' ? '2026 (5-bracket)' : '2025 (7-bracket)'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-1">
                    <div className="grid grid-cols-3 text-xs text-muted-foreground font-medium px-2 pb-1">
                      <span>Monthly Income</span>
                      <span className="text-right">Rate</span>
                      <span className="text-right">Tax on Bracket</span>
                    </div>
                    {cfg.brackets.map((b, i) => {
                      const from = b.min / 1_000_000
                      const to   = b.max === Infinity ? '∞' : (b.max / 1_000_000).toFixed(0)
                      const width = b.max === Infinity ? null : b.max - b.min
                      return (
                        <div key={i} className="grid grid-cols-3 text-xs py-2 px-2 rounded hover:bg-muted/40">
                          <span className="text-muted-foreground">
                            {from === 0 ? '0' : `${from}M`} – {to === '∞' ? '∞' : `${to}M`}
                          </span>
                          <span className="text-right font-medium">{(b.rate * 100).toFixed(0)}%</span>
                          <span className="text-right text-muted-foreground">
                            {width ? fmtVND(width * b.rate) : '35% on excess'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Insurance rates */}
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#40E0D0]" />
                    Insurance Rates &amp; Caps
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Employee</p>
                    <div className="space-y-1">
                      {[
                        { label: 'Social Insurance', rate: '8%', cap: fmtVND(SI_CAP_BASE) },
                        { label: 'Health Insurance', rate: '1.5%', cap: fmtVND(HI_CAP_BASE) },
                        { label: 'Unemployment Ins.', rate: '1%', cap: 'Zone min wage × 20' },
                      ].map((r) => (
                        <div key={r.label} className="grid grid-cols-3 text-xs py-1.5 px-2 rounded hover:bg-muted/40">
                          <span className="text-muted-foreground">{r.label}</span>
                          <span className="text-right font-medium">{r.rate}</span>
                          <span className="text-right text-muted-foreground truncate">{r.cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Employer</p>
                    <div className="space-y-1">
                      {[
                        { label: 'Social Insurance', rate: '17.5%', cap: fmtVND(SI_CAP_BASE) },
                        { label: 'Health Insurance', rate: '3%', cap: fmtVND(HI_CAP_BASE) },
                        { label: 'Unemployment Ins.', rate: '1%', cap: 'Zone min wage × 20' },
                        { label: 'Trade Union', rate: '2%', cap: fmtVND(TU_CAP_BASE) },
                      ].map((r) => (
                        <div key={r.label} className="grid grid-cols-3 text-xs py-1.5 px-2 rounded hover:bg-muted/40">
                          <span className="text-muted-foreground">{r.label}</span>
                          <span className="text-right font-medium">{r.rate}</span>
                          <span className="text-right text-muted-foreground truncate">{r.cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">UI Cap by Zone (2026)</p>
                    <div className="space-y-1">
                      {([1, 2, 3, 4] as Zone[]).map((z) => (
                        <div key={z} className="grid grid-cols-3 text-xs py-1.5 px-2 rounded hover:bg-muted/40">
                          <span className="text-muted-foreground">Zone {z}</span>
                          <span className="text-right font-medium">{fmtVND(ZONE_MIN_WAGES[z])}</span>
                          <span className="text-right text-muted-foreground">Cap {fmtVND(UI_CAP_BY_ZONE[z])}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A]/80 p-8 text-white text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-[#40E0D0]" />
              <h3 className="text-xl font-bold mb-2">Need official PIT finalization?</h3>
              <p className="text-white/80 mb-5 max-w-md mx-auto text-sm">
                Estimates are not submissions. Let our experts handle your official annual PIT
                finalization — ensuring compliance and maximizing any refund you are owed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-[#40E0D0] text-[#1E3A8A] hover:bg-[#40E0D0]/90 font-semibold">
                  <Link href="/contact">
                    Get Expert Help <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
                  <Link href="/services">View Services</Link>
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

// ─── Summary card ──────────────────────────────────────────────────────────────

function SummaryCard({ label, value, sub, highlight }: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <div className={[
      'p-4 rounded-xl text-center',
      highlight
        ? 'bg-[#1E3A8A]/10 border border-[#1E3A8A]/20'
        : 'bg-muted/50',
    ].join(' ')}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={['font-bold tabular-nums', highlight ? 'text-lg text-[#1E3A8A] dark:text-[#60a5fa]' : 'text-base'].join(' ')}>
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  )
}
