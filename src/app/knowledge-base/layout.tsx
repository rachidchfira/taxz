import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vietnam Tax Knowledge Base — PIT Guides for Foreigners | VietPIT',
  description: 'Clear answers to Vietnam PIT questions for expats: tax residency rules, PIT brackets, deductions, insurance, filing deadlines, and refund process.',
  keywords: ['Vietnam tax guide', 'Vietnam PIT FAQ', 'expat tax Vietnam guide', 'tax residency Vietnam', 'PIT brackets Vietnam 2026'],
  openGraph: {
    title: 'Vietnam Tax Knowledge Base — VietPIT',
    description: 'Official-source-backed answers to all Vietnam PIT questions for foreigners.',
  },
}

export default function KnowledgeBaseLayout({ children }: { children: React.ReactNode }) {
  return children
}
