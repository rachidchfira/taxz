import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About TaxFinalization — Expert Tax Team for Foreigners in Vietnam',
  description: 'Meet the TaxFinalization team: licensed tax specialists with deep expertise in Vietnam PIT law for expatriates. 400+ cases, 98% success rate, English-only service.',
  keywords: ['Vietnam tax specialist', 'expat tax expert Vietnam', 'TaxFinalization team', 'foreigner tax Vietnam', 'PIT finalization expert'],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About TaxFinalization — Expert Tax Help for Foreigners',
    description: '400+ cases finalized. 98% first-submission acceptance. Meet the licensed tax specialists behind TaxFinalization.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
