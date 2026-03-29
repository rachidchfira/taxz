import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vietnam Salary Calculator 2025/2026 — Gross ↔ Net | VietPIT',
  description: 'Free Vietnam salary calculator. Compute Gross-to-Net or Net-to-Gross with full employee and employer breakdown: Social Insurance, Health Insurance, Unemployment Insurance, and PIT. Supports 2025 and 2026 rules.',
  keywords: ['Vietnam salary calculator', 'gross net calculator Vietnam', 'PIT calculator Vietnam', 'social insurance calculator Vietnam', 'expat salary Vietnam', 'Vietnam income tax 2026'],
  openGraph: {
    title: 'Vietnam Salary Calculator — Gross ↔ Net (2026 Rules)',
    description: 'Full employee + employer breakdown: insurance, PIT, net salary. Free tool for foreigners in Vietnam.',
  },
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
