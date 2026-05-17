import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vietnam PIT Refund Service for Foreigners | TaxFinalization',
  description:
    'Recover overpaid Vietnam Personal Income Tax. TaxFinalization reviews over-withholding, missed deductions, residency treatment, and treaty benefits for foreigners.',
  keywords: [
    'Vietnam PIT refund',
    'tax refund Vietnam foreigners',
    'overpaid PIT Vietnam',
    'expat tax refund Vietnam',
  ],
  alternates: { canonical: '/services/tax-refund' },
  openGraph: {
    title: 'Vietnam PIT Refund Service | TaxFinalization',
    description:
      'Tax refund review for foreigners in Vietnam: over-withholding, deductions, residency, and treaty benefits.',
  },
}

export default function TaxRefundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
