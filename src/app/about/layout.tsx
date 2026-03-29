import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About VietPIT — Expert Tax Team for Foreigners in Vietnam',
  description: 'Meet the VietPIT team: licensed tax specialists with deep expertise in Vietnam PIT law for expatriates. 400+ cases, 98% success rate, English-only service.',
  keywords: ['Vietnam tax specialist', 'expat tax expert Vietnam', 'VietPIT team', 'foreigner tax Vietnam', 'PIT finalization expert'],
  openGraph: {
    title: 'About VietPIT — Expert Tax Help for Foreigners',
    description: '400+ cases finalized. 98% first-submission acceptance. Meet the licensed tax specialists behind VietPIT.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
