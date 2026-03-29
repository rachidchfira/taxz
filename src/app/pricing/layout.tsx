import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Vietnam PIT Finalization Services | VietPIT',
  description: 'Transparent pricing for Vietnam PIT finalization. Plans from 1,500,000 VND. All-inclusive: calculation, filing, and follow-up. No hidden fees.',
  keywords: ['Vietnam PIT finalization price', 'tax service cost Vietnam', 'expat tax filing fee Vietnam', 'PIT filing fee'],
  openGraph: {
    title: 'VietPIT Pricing — Transparent Tax Service Fees',
    description: 'From 1,500,000 VND all-inclusive. See our plans for simple and complex PIT cases.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
