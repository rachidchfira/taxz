import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leaving Vietnam Tax Clearance — Departure PIT Finalization | VietPIT',
  description: 'Mandatory PIT finalization before leaving Vietnam. Fast-track clearance in 5–8 days. Includes departure tax assessment and potential refund recovery.',
  keywords: ['leaving Vietnam tax', 'Vietnam departure tax clearance', 'expat exit tax Vietnam', 'PIT before leaving Vietnam'],
  openGraph: { title: 'Leaving Vietnam Tax Clearance — VietPIT', description: 'Mandatory tax finalization before you leave Vietnam. Fast-track in 5–8 days.' },
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
