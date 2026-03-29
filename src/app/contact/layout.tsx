import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact VietPIT — Get Tax Help Within 24 Hours',
  description: 'Contact VietPIT for expert Vietnam PIT help. Response within 24 hours. Available via ZALO, email, and consultation form.',
  keywords: ['contact Vietnam tax expert', 'Vietnam PIT help', 'expat tax consultation Vietnam', 'ZALO tax advisor Vietnam'],
  openGraph: {
    title: 'Contact VietPIT — 24-Hour Response',
    description: 'Get expert Vietnam PIT guidance. Contact us via ZALO or email — response within 24 hours.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
