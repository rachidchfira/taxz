'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  Calculator as CalcIcon,
  AlertCircle,
  Shield,
  BadgePercent,
  ArrowRight,
  ChevronRight,
  Globe,
} from 'lucide-react'
import {
  calcGrossToNet,
  type Zone,
  type Nationality,
  type CalcResult,
} from '@/lib/tax-engine'

function fmtVND(v: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v)
}

export function CalculatorSection() {
  const [grossInput, setGrossInput]   = useState('')
  const [dependants, setDependants]   = useState('0')
  const [nationality, setNationality] = useState<Nationality>('VIETNAMESE')
  const [zone, setZone]               = useState<Zone>(1)
  const [result, setResult]           = useState<CalcResult | null>(null)
  const [error, setError]             = useState('')

  const profile = '2026'

  const handleCalculate = () => {
    setError('')
    const gross = parseFloat(grossInput) || 0
    if (gross <= 0) {
      setError('Please enter a valid gross salary.')
      return
    }
    const r = calcGrossToNet({
      grossSalary: gross,
      insuranceType: 'FULL_SALARY',
      customInsuranceSalary: 0,
      pitMethod: 'PROGRESSIVE',
      zone,
      dependants: parseInt(dependants) || 0,
      nationality,
      profile,
    })
    setResult(r)
  }

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0] bg-[#40E0D0]/5">
            <CalcIcon className="w-3 h-3 mr-1" />
            Quick Salary Calculator
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Estimate Your Take-Home Pay
          </h2>
          <p className="text-lg text-muted-foreground">
            Instant Gross → Net calculation using 2026 Vietnam PIT rules.
            For full options — Gross↔Net, zones, USD display — use the{' '}
            <Link href="/calculator" className="text-[#40E0D0] hover:underline">advanced calculator</Link>.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#40E0D0]" />
            <CardHeader className="bg-gradient-to-r from-[#1E3A8A]/5 to-[#40E0D0]/5">
              <CardTitle className="flex items-center gap-2">
                <BadgePercent className="w-5 h-5 text-[#40E0D0]" />
                Gross → Net (2026 Rules)
              </CardTitle>
              <CardDescription>
                Social Insurance + Health Insurance + PIT — instant breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">

              {/* Gross salary */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Monthly Gross Salary (VND)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 50,000,000"
                  value={grossInput}
                  onChange={(e) => setGrossInput(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Options row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Nationality
                  </Label>
                  <Select value={nationality} onValueChange={(v) => setNationality(v as Nationality)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VIETNAMESE">Vietnamese</SelectItem>
                      <SelectItem value="EXPAT">Expat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Zone</Label>
                  <Select value={zone.toString()} onValueChange={(v) => setZone(parseInt(v) as Zone)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Zone 1</SelectItem>
                      <SelectItem value="2">Zone 2</SelectItem>
                      <SelectItem value="3">Zone 3</SelectItem>
                      <SelectItem value="4">Zone 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Dependants</Label>
                  <Select value={dependants} onValueChange={setDependants}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(6)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription className="text-xs">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleCalculate}
                className="w-full h-11 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-semibold"
              >
                <CalcIcon className="w-4 h-4 mr-2" />
                Calculate
              </Button>

              {/* Results */}
              {result && (
                <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <Separator />
                  <div className="space-y-1">
                    <Row label="Gross Salary" value={fmtVND(result.employee.grossSalary)} bold />
                    <Row label="Social Insurance (8%)" value={`− ${fmtVND(result.employee.employeeSI)}`} indent negative />
                    <Row label="Health Insurance (1.5%)" value={`− ${fmtVND(result.employee.employeeHI)}`} indent negative />
                    {nationality === 'VIETNAMESE' && (
                      <Row label="Unemployment Ins. (1%)" value={`− ${fmtVND(result.employee.employeeUI)}`} indent negative />
                    )}
                    <Row label="Salary Before Tax" value={fmtVND(result.employee.salaryBeforeTax)} />
                    <Row label="Personal Deduction" value={`− ${fmtVND(result.employee.personalDeduction)}`} indent negative />
                    {result.employee.dependantDeduction > 0 && (
                      <Row label="Dependant Deduction" value={`− ${fmtVND(result.employee.dependantDeduction)}`} indent negative />
                    )}
                    <Row label="Taxable Salary" value={fmtVND(result.employee.taxableSalary)} />
                    <Row label="Personal Income Tax" value={`− ${fmtVND(result.employee.pit)}`} negative />
                    <Separator className="my-1" />
                    <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-[#1E3A8A]/8 border border-[#1E3A8A]/15">
                      <span className="font-bold">Net Salary</span>
                      <span className="font-bold text-lg text-[#1E3A8A] dark:text-[#60a5fa]">
                        {fmtVND(result.employee.netSalary)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground text-right px-1">
                      Effective PIT rate: {result.employee.effectiveRate.toFixed(2)}%
                      {' '}• Employer cost: {fmtVND(result.employer.totalEmployerCost)}
                    </p>
                  </div>

                  <Alert className="py-2 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <AlertDescription className="text-xs text-amber-700 dark:text-amber-300">
                      Estimates only — not a tax submission.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="text-center">
                <Button asChild variant="outline" size="sm" className="text-xs gap-1 border-[#40E0D0]/40 text-[#40E0D0]">
                  <Link href="/calculator">
                    Full calculator (Gross↔Net, USD, zones)
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Official Sources */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-3">Based on official Vietnamese government regulations</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['vbpl.vn', 'gdt.gov.vn', 'chinhphu.vn'].map((source) => (
              <div key={source} className="flex items-center gap-1 text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-muted">
                <Shield className="w-3 h-3" />
                {source}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Helper row ────────────────────────────────────────────────────────────────

function Row({ label, value, bold, indent, negative }: {
  label: string; value: string; bold?: boolean; indent?: boolean; negative?: boolean
}) {
  return (
    <div className={['flex justify-between items-center py-1.5 px-2 rounded text-sm', indent ? 'ml-3' : ''].join(' ')}>
      <span className={bold ? 'font-semibold' : 'text-muted-foreground'}>{label}</span>
      <span className={[
        'tabular-nums',
        bold ? 'font-semibold' : '',
        negative ? 'text-red-600 dark:text-red-400' : '',
      ].join(' ')}>{value}</span>
    </div>
  )
}
