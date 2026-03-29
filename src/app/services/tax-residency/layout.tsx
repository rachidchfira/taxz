import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Residency Assessment Vietnam — 183-Day Rule | VietPIT',
  description: 'Determine your Vietnam tax residency status using the 183-day and regular residence criteria. Official-source analysis for expats.',
  keywords: ['Vietnam tax residency', '183 day rule Vietnam', 'foreigner tax residency Vietnam', 'Vietnam resident vs non-resident'],
  openGraph: { title: 'Tax Residency Assessment — VietPIT', description: 'Official 183-day rule analysis for expats in Vietnam.' },
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
