import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Tax brackets for progressive PIT (monthly)
const TAX_BRACKETS = [
  { min: 0, max: 5_000_000, rate: 0.05 },
  { min: 5_000_000, max: 10_000_000, rate: 0.10 },
  { min: 10_000_000, max: 18_000_000, rate: 0.15 },
  { min: 18_000_000, max: 32_000_000, rate: 0.20 },
  { min: 32_000_000, max: 52_000_000, rate: 0.25 },
  { min: 52_000_000, max: 80_000_000, rate: 0.30 },
  { min: 80_000_000, max: Infinity, rate: 0.35 },
]

// Family circumstance deductions by tax year (monthly)
const DEDUCTIONS = {
  2025: { taxpayer: 11_000_000, dependant: 4_400_000 },
  2026: { taxpayer: 15_500_000, dependant: 6_200_000 },
}

// Calculate progressive tax on annual taxable income
function calculateProgressiveTax(annualTaxableIncome: number): number {
  // Use annualized brackets (monthly thresholds × 12)
  let totalTax = 0
  let remaining = annualTaxableIncome

  for (const bracket of TAX_BRACKETS) {
    if (remaining <= 0) break
    const annualMax = bracket.max === Infinity ? Infinity : bracket.max * 12
    const annualMin = bracket.min * 12
    const taxableInBracket = Math.min(remaining, annualMax - annualMin)
    totalTax += taxableInBracket * bracket.rate
    remaining -= taxableInBracket
  }

  return totalTax
}

const CalculatorSchema = z.object({
  taxYear: z.enum(['2025', '2026']),
  monthlyGross: z.number().min(0),
  monthsWorked: z.number().min(1).max(12),
  residency: z.enum(['resident', 'non-resident']),
  dependants: z.number().min(0).max(20),
  employeeSI: z.number().min(0),
  employeeHI: z.number().min(0),
  pitWithheld: z.number().min(0),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = CalculatorSchema.parse(body)

    const deductions = DEDUCTIONS[parseInt(data.taxYear) as keyof typeof DEDUCTIONS]
    
    // Annual calculations
    const annualGross = data.monthlyGross * data.monthsWorked
    const totalSI = data.employeeSI * data.monthsWorked
    const totalHI = data.employeeHI * data.monthsWorked
    const totalDeduction = (deductions.taxpayer + (data.dependants * deductions.dependant)) * data.monthsWorked
    
    let annualPIT = 0
    let taxableIncome = 0
    let totalDeductions = 0

    if (data.residency === 'resident') {
      // Resident: progressive rates with deductions
      totalDeductions = totalSI + totalHI + totalDeduction
      taxableIncome = Math.max(0, annualGross - totalDeductions)
      annualPIT = calculateProgressiveTax(taxableIncome)
    } else {
      // Non-resident: 20% flat rate, no family deductions
      totalDeductions = totalSI + totalHI
      taxableIncome = annualGross - totalDeductions
      annualPIT = taxableIncome * 0.20
    }

    const balance = data.pitWithheld - annualPIT
    const effectiveRate = annualGross > 0 ? (annualPIT / annualGross) * 100 : 0

    // Generate bracket breakdown for explainability
    const bracketBreakdown: Array<{
      bracket: string
      taxable: number
      tax: number
      rate: number
    }> = []

    if (data.residency === 'resident' && taxableIncome > 0) {
      let remaining = taxableIncome
      for (const bracket of TAX_BRACKETS) {
        if (remaining <= 0) break
        const annualMax = bracket.max === Infinity ? Infinity : bracket.max * 12
        const annualMin = bracket.min * 12
        const taxableInBracket = Math.min(remaining, annualMax - annualMin)
        const taxInBracket = taxableInBracket * bracket.rate
        
        if (taxableInBracket > 0) {
          bracketBreakdown.push({
            bracket: bracket.max === Infinity 
              ? `Over ${(bracket.min / 1_000_000).toFixed(0)}M`
              : `${(bracket.min / 1_000_000).toFixed(0)}M - ${(bracket.max / 1_000_000).toFixed(0)}M`,
            taxable: taxableInBracket,
            tax: taxInBracket,
            rate: bracket.rate * 100,
          })
        }
        remaining -= taxableInBracket
      }
    }

    return NextResponse.json({
      success: true,
      result: {
        grossIncome: annualGross,
        totalDeductions,
        taxableIncome,
        annualPIT,
        pitWithheld: data.pitWithheld,
        balance,
        effectiveRate,
        bracketBreakdown,
        isRefund: balance > 0,
        legalBasis: {
          source: data.residency === 'resident' 
            ? 'PIT Law (Progressive Rates) & Circular 111/2013/TT-BTC'
            : 'PIT Law (Non-Resident Rate)',
          deductionSource: `Tax Department Guidance Letter (${data.taxYear})`,
        },
      },
    })
  } catch (error) {
    console.error('Calculator error:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid input data' },
      { status: 400 }
    )
  }
}
