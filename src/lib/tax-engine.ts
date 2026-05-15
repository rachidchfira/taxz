/**
 * Vietnam Salary Tax Engine
 * Supports 2025 (7-bracket) and 2026 (5-bracket) PIT profiles.
 * Adecco-style: Gross↔Net, employee + employer breakdown, zone-based UI cap.
 */

export type Zone = 1 | 2 | 3 | 4
export type Nationality = 'VIETNAMESE' | 'EXPAT'
export type InsuranceType = 'FULL_SALARY' | 'OTHER'
export type PitMethod = 'PROGRESSIVE' | 'FIXED_10'
export type TaxProfile = '2025' | '2026'

// ─── Insurance caps ────────────────────────────────────────────────────────────
export const SI_CAP_BASE  = 46_800_000   // 20 × 2,340,000 basic wage
export const HI_CAP_BASE  = 46_800_000
export const TU_CAP_BASE  = 46_800_000

// UI cap = 20 × regional minimum wage (2026 rates)
export const UI_CAP_BY_ZONE: Record<Zone, number> = {
  1: 106_200_000,
  2:  94_600_000,
  3:  82_800_000,
  4:  74_000_000,
}

export const ZONE_MIN_WAGES: Record<Zone, number> = {
  1: 5_310_000,
  2: 4_730_000,
  3: 4_140_000,
  4: 3_700_000,
}

// ─── Insurance rates ───────────────────────────────────────────────────────────
export const EMPLOYEE_RATES = { si: 0.08, hi: 0.015, ui: 0.01 }
export const EMPLOYER_RATES = { si: 0.175, hi: 0.03, ui: 0.01, tu: 0.02 }

// ─── Tax profiles ──────────────────────────────────────────────────────────────
interface TaxBracket { min: number; max: number; rate: number }

interface ProfileConfig {
  personalDeduction: number
  dependantDeduction: number
  brackets: TaxBracket[]
}

export const PROFILES: Record<TaxProfile, ProfileConfig> = {
  '2025': {
    personalDeduction: 11_000_000,
    dependantDeduction:  4_400_000,
    brackets: [
      { min:          0, max:  5_000_000, rate: 0.05 },
      { min:  5_000_000, max: 10_000_000, rate: 0.10 },
      { min: 10_000_000, max: 18_000_000, rate: 0.15 },
      { min: 18_000_000, max: 32_000_000, rate: 0.20 },
      { min: 32_000_000, max: 52_000_000, rate: 0.25 },
      { min: 52_000_000, max: 80_000_000, rate: 0.30 },
      { min: 80_000_000, max: Infinity,   rate: 0.35 },
    ],
  },
  '2026': {
    personalDeduction: 15_500_000,
    dependantDeduction:  6_200_000,
    brackets: [
      { min:           0, max:  10_000_000, rate: 0.05 },
      { min:  10_000_000, max:  30_000_000, rate: 0.10 },
      { min:  30_000_000, max:  60_000_000, rate: 0.20 },
      { min:  60_000_000, max: 100_000_000, rate: 0.30 },
      { min: 100_000_000, max: Infinity,    rate: 0.35 },
    ],
  },
}

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface CalcInput {
  grossSalary: number
  insuranceType: InsuranceType
  customInsuranceSalary: number
  pitMethod: PitMethod
  zone: Zone
  dependants: number
  nationality: Nationality
  profile: TaxProfile
}

export interface PitBracketDetail {
  bracket: string
  taxable: number
  tax: number
  rate: number
}

export interface EmployeeBreakdown {
  grossSalary: number
  employeeSI: number
  employeeHI: number
  employeeUI: number
  totalInsurance: number
  salaryBeforeTax: number
  personalDeduction: number
  dependantDeduction: number
  taxableSalary: number
  pit: number
  netSalary: number
  effectiveRate: number
}

export interface EmployerBreakdown {
  grossSalary: number
  employerSI: number
  employerHI: number
  employerUI: number
  tradeUnion: number
  totalEmployerCost: number
}

export interface CalcResult {
  employee: EmployeeBreakdown
  employer: EmployerBreakdown
  pitBrackets: PitBracketDetail[]
}

// ─── Core functions ────────────────────────────────────────────────────────────

function progressivePit(
  taxable: number,
  brackets: TaxBracket[]
): { total: number; details: PitBracketDetail[] } {
  let total = 0
  let remaining = taxable
  const details: PitBracketDetail[] = []

  for (const b of brackets) {
    if (remaining <= 0) break
    const width = b.max === Infinity ? remaining : b.max - b.min
    const inBracket = Math.min(remaining, width)
    if (inBracket <= 0) continue

    const taxInBracket = inBracket * b.rate
    total += taxInBracket

    const label =
      b.max === Infinity
        ? `Over ${(b.min / 1_000_000).toFixed(0)}M VND`
        : `${(b.min / 1_000_000).toFixed(0)}M – ${(b.max / 1_000_000).toFixed(0)}M VND`

    details.push({
      bracket: label,
      taxable: Math.round(inBracket),
      tax: Math.round(taxInBracket),
      rate: b.rate * 100,
    })
    remaining -= inBracket
  }

  return { total: Math.round(total), details }
}

export function calcGrossToNet(input: CalcInput): CalcResult {
  const { grossSalary, insuranceType, customInsuranceSalary, pitMethod, zone, dependants, nationality, profile } = input
  const cfg = PROFILES[profile]

  const insuranceBase = Math.max(
    0,
    Math.min(grossSalary, insuranceType === 'FULL_SALARY' ? grossSalary : customInsuranceSalary)
  )

  const uiCap = UI_CAP_BY_ZONE[zone]

  // Employee insurance
  const employeeSI = Math.round(Math.min(insuranceBase, SI_CAP_BASE) * EMPLOYEE_RATES.si)
  const employeeHI = Math.round(Math.min(insuranceBase, HI_CAP_BASE) * EMPLOYEE_RATES.hi)
  const employeeUI = nationality === 'EXPAT' ? 0 : Math.round(Math.min(insuranceBase, uiCap) * EMPLOYEE_RATES.ui)
  const totalInsurance = employeeSI + employeeHI + employeeUI

  const salaryBeforeTax = grossSalary - totalInsurance
  const personalDeduction = cfg.personalDeduction
  const dependantDeduction = dependants * cfg.dependantDeduction
  const taxableSalary = Math.max(0, salaryBeforeTax - personalDeduction - dependantDeduction)

  let pit: number
  let pitBrackets: PitBracketDetail[]

  if (pitMethod === 'PROGRESSIVE') {
    const { total, details } = progressivePit(taxableSalary, cfg.brackets)
    pit = total
    pitBrackets = details
  } else {
    pit = Math.round(salaryBeforeTax * 0.10)
    pitBrackets = [{
      bracket: 'Fixed 10% (assumed — verify against source)',
      taxable: Math.round(salaryBeforeTax),
      tax: pit,
      rate: 10,
    }]
  }

  const netSalary = grossSalary - totalInsurance - pit
  const effectiveRate = grossSalary > 0 ? (pit / grossSalary) * 100 : 0

  // Employer
  const employerSI    = Math.round(Math.min(insuranceBase, SI_CAP_BASE) * EMPLOYER_RATES.si)
  const employerHI    = Math.round(Math.min(insuranceBase, HI_CAP_BASE) * EMPLOYER_RATES.hi)
  const employerUI    = nationality === 'EXPAT' ? 0 : Math.round(Math.min(insuranceBase, uiCap) * EMPLOYER_RATES.ui)
  const tradeUnion    = Math.round(Math.min(insuranceBase, TU_CAP_BASE) * EMPLOYER_RATES.tu)
  const totalEmployerCost = grossSalary + employerSI + employerHI + employerUI + tradeUnion

  return {
    employee: {
      grossSalary: Math.round(grossSalary),
      employeeSI,
      employeeHI,
      employeeUI,
      totalInsurance,
      salaryBeforeTax: Math.round(salaryBeforeTax),
      personalDeduction,
      dependantDeduction,
      taxableSalary: Math.round(taxableSalary),
      pit,
      netSalary: Math.round(netSalary),
      effectiveRate,
    },
    employer: {
      grossSalary: Math.round(grossSalary),
      employerSI,
      employerHI,
      employerUI,
      tradeUnion,
      totalEmployerCost: Math.round(totalEmployerCost),
    },
    pitBrackets,
  }
}

export function calcNetToGross(
  targetNet: number,
  options: Omit<CalcInput, 'grossSalary'>
): { gross: number; result: CalcResult } {
  const netOf = (g: number) =>
    calcGrossToNet({ ...options, grossSalary: g }).employee.netSalary

  let low = targetNet
  let high = targetNet * 2 + 50_000_000

  while (netOf(high) < targetNet) high *= 1.5

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2
    if (netOf(mid) < targetNet) low = mid
    else high = mid
  }

  const gross = Math.round(high)
  return { gross, result: calcGrossToNet({ ...options, grossSalary: gross }) }
}
