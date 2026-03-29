import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Multi-Employer PIT Finalization Vietnam | VietPIT',
  description: 'Specialized PIT finalization for foreigners who worked for multiple employers in Vietnam. We consolidate all income sources and maximize deductions.',
  keywords: ['multi employer tax Vietnam', 'two jobs tax Vietnam', 'multiple income sources Vietnam PIT', 'expat job change tax Vietnam'],
  openGraph: { title: 'Multi-Employer PIT Finalization — VietPIT', description: 'Specialized service for expats with multiple employers in Vietnam.' },
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
