import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vietnam PIT Services for Foreigners | VietPIT',
  description: 'Complete Vietnam Personal Income Tax services for expatriates: PIT finalization, tax residency assessment, departure clearance, and multi-employer cases.',
  keywords: ['Vietnam PIT service', 'expat tax Vietnam', 'PIT finalization Vietnam', 'tax residency Vietnam', 'foreigner tax service'],
  openGraph: {
    title: 'Vietnam PIT Services — VietPIT',
    description: 'Expert PIT finalization, tax residency checks, and departure clearance for foreigners in Vietnam.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
