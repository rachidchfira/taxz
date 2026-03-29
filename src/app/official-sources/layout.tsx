import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vietnam Tax Official Sources — Legal Basis Library | VietPIT',
  description: 'All Vietnam PIT legal references: PIT Law, Decrees, Circulars, and General Department of Taxation guidance. Official citations for every rule.',
  keywords: ['Vietnam tax law', 'PIT law Vietnam', 'Vietnam tax regulations', 'General Department of Taxation', 'Vietnam tax legal basis'],
  openGraph: {
    title: 'Vietnam Tax Official Sources — VietPIT',
    description: 'Legal citations for all Vietnam PIT rules, straight from the official government sources.',
  },
}

export default function OfficialSourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}
