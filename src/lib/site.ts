export const SITE_NAME = 'TaxFinalization'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.taxfinalization.com'
).replace(/\/$/, '')

export const SITE_DESCRIPTION =
  'Vietnam Personal Income Tax finalization services for foreigners and expatriates. Get PIT filing, tax residency, refund, and departure clearance help backed by official Vietnamese tax sources.'

export const SITE_KEYWORDS = [
  'TaxFinalization',
  'Vietnam PIT finalization',
  'Vietnam personal income tax',
  'expat tax Vietnam',
  'foreigner tax Vietnam',
  'PIT refund Vietnam',
  'tax residency Vietnam',
  'leaving Vietnam tax clearance',
  'Vietnam salary calculator',
]

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL || 'contact@taxfinalizevn.com'

export const ZALO_NUMBER =
  process.env.NEXT_PUBLIC_ZALO_NUMBER || '+84703027485'

export const ZALO_URL =
  process.env.NEXT_PUBLIC_ZALO_LINK || 'https://zalo.me/84703027485'

export function absoluteUrl(path = '') {
  if (!path) {
    return SITE_URL
  }

  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}

export function baseStructuredData() {
  const organizationId = `${SITE_URL}/#organization`
  const websiteId = `${SITE_URL}/#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ProfessionalService', 'AccountingService'],
        '@id': organizationId,
        name: SITE_NAME,
        alternateName: [
          'TaxFinalization Vietnam',
          'Vietnam PIT Finalization Service',
        ],
        url: SITE_URL,
        logo: absoluteUrl('/logo.svg'),
        image: absoluteUrl('/logo.svg'),
        description: SITE_DESCRIPTION,
        email: CONTACT_EMAIL,
        telephone: ZALO_NUMBER,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: CONTACT_EMAIL,
            telephone: ZALO_NUMBER,
            url: ZALO_URL,
            availableLanguage: ['English', 'Vietnamese'],
            areaServed: 'VN',
          },
        ],
        areaServed: [
          { '@type': 'Country', name: 'Vietnam' },
          { '@type': 'City', name: 'Ho Chi Minh City' },
          { '@type': 'City', name: 'Hanoi' },
        ],
        knowsAbout: [
          'Vietnam Personal Income Tax',
          'PIT finalization for foreigners',
          'Vietnam tax residency',
          'Vietnam PIT refunds',
          'Departure tax clearance in Vietnam',
          'Multi-employer PIT finalization',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': organizationId },
      },
    ],
  }
}
