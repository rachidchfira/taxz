import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vietnam PIT Document Checklist for Foreigners | TaxFinalization',
  description:
    'Interactive document checklist for Vietnam PIT finalization, multi-employer cases, tax refunds, departure clearance, and DTA claims.',
  keywords: [
    'Vietnam PIT documents',
    'PIT finalization checklist Vietnam',
    'Vietnam tax documents foreigners',
    'tax refund documents Vietnam',
  ],
  alternates: { canonical: '/tools/document-checklist' },
  openGraph: {
    title: 'Vietnam PIT Document Checklist | TaxFinalization',
    description:
      'Build the right document checklist for your Vietnam PIT finalization case.',
  },
}

export default function DocumentChecklistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
