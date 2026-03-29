import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PIT Finalization Service for Foreigners in Vietnam | VietPIT',
  description: 'Expert annual PIT finalization for expatriates in Vietnam. We calculate your liability, identify deductions, and file on your behalf. From 1,500,000 VND.',
  keywords: ['PIT finalization Vietnam', 'annual tax return Vietnam', 'expat tax filing Vietnam', 'Vietnam 02/QTT-TNCN form'],
  openGraph: { title: 'PIT Finalization — VietPIT', description: 'Full annual PIT finalization service for foreigners. We handle everything.' },
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
