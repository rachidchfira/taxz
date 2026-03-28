import { db } from '../src/lib/db'

async function main() {
  console.log('Seeding database...')

  // Create legal sources
  const sources = await Promise.all([
    db.legalSource.create({
      data: {
        name: 'PIT Law (Consolidated)',
        citation: 'VBHN-VPQH',
        sourceUrl: 'https://vbpl.vn',
        sourceDomain: 'vbpl.vn',
        category: 'primary_legislation',
        description: 'Consolidated Personal Income Tax Law - defines taxpayer scope, residency, and tax rates',
      },
    }),
    db.legalSource.create({
      data: {
        name: 'Circular 111/2013/TT-BTC',
        citation: '111/2013/TT-BTC',
        sourceUrl: 'https://vbpl.vn',
        sourceDomain: 'vbpl.vn',
        category: 'implementing_regulation',
        description: 'Guidance on PIT withholding, finalization, and procedures',
      },
    }),
    db.legalSource.create({
      data: {
        name: 'Social Insurance Law',
        citation: 'Law on Social Insurance',
        sourceUrl: 'https://vbpl.vn',
        sourceDomain: 'vbpl.vn',
        category: 'primary_legislation',
        description: 'Defines social insurance obligations including foreign employees',
      },
    }),
    db.legalSource.create({
      data: {
        name: 'Health Insurance Law',
        citation: 'Law on Health Insurance',
        sourceUrl: 'https://vbpl.vn',
        sourceDomain: 'vbpl.vn',
        category: 'primary_legislation',
        description: 'Defines health insurance coverage for foreign employees',
      },
    }),
    db.legalSource.create({
      data: {
        name: 'Tax Department Guidance 2025',
        citation: 'Guidance Letter 2026',
        sourceUrl: 'https://chinhphu.vn',
        sourceDomain: 'chinhphu.vn',
        category: 'administrative_guidance',
        description: 'Family deduction amounts for tax period 2025',
      },
    }),
    db.legalSource.create({
      data: {
        name: 'National Assembly Resolution',
        citation: 'Resolution on Family Deductions',
        sourceUrl: 'https://chinhphu.vn',
        sourceDomain: 'chinhphu.vn',
        category: 'primary_legislation',
        description: 'New family deduction amounts effective from tax period 2026',
      },
    }),
  ])

  console.log(`Created ${sources.length} legal sources`)

  // Create knowledge base articles
  const articles = await Promise.all([
    db.knowledgeArticle.create({
      data: {
        slug: 'tax-residency-vietnam',
        title: 'Am I a Tax Resident in Vietnam?',
        shortAnswer: 'You are a tax resident if you spend 183+ days in Vietnam in a calendar year (or 12 consecutive months from first arrival), OR have regular residence in Vietnam.',
        content: `## Understanding Tax Residency in Vietnam

Tax residency is the most important determination for your Personal Income Tax obligations in Vietnam. It affects your tax rates, deductions, and scope of taxation.

### The 183-Day Rule

You are considered a **tax resident** if you meet either:

1. **Calendar Year Test**: Present in Vietnam for 183 days or more within a single calendar year (January 1 - December 31)
2. **12-Month Rolling Test**: Present in Vietnam for 183 days or more within 12 consecutive months starting from your first arrival date

### Regular Residence

Even if you don't meet the 183-day threshold, you may still be considered a resident if you have "regular residence" in Vietnam, which includes:

- Permanent residence registration in Vietnam
- A rented house under a lease agreement with a term

### Consequences of Residency Status

**Residents:**
- Taxed on worldwide income
- Progressive tax rates (5% - 35%)
- Eligible for family circumstance deductions

**Non-Residents:**
- Taxed only on Vietnam-source income
- Flat 20% rate on employment income
- No family deductions

### How to Count Days

Days of presence include:
- Full days in Vietnam
- Day of arrival and departure both count

### Source
- PIT Law (Consolidated) - VBHN-VPQH
- Circular 111/2013/TT-BTC`,
        category: 'residency',
        audience: 'employee',
        legalBasis: 'PIT Law (Consolidated), Circular 111/2013/TT-BTC',
        sourceUrl: 'https://vbpl.vn',
        sourceName: 'National Legal Database',
        effectiveDate: new Date('2009-01-01'),
        metaTitle: 'Vietnam Tax Residency for Foreigners | 183-Day Rule Explained',
        metaDescription: 'Understand Vietnam tax residency rules for foreigners. The 183-day rule, regular residence, and how it affects your tax obligations.',
        sortOrder: 1,
      },
    }),
    db.knowledgeArticle.create({
      data: {
        slug: 'resident-vs-non-resident-tax-rates',
        title: 'Resident vs Non-Resident Tax Rates',
        shortAnswer: 'Residents pay progressive rates from 5% to 35% based on income brackets. Non-residents pay a flat 20% on Vietnam-source employment income.',
        content: `## Tax Rates: Resident vs Non-Resident

### Resident Progressive Tax Rates

Tax residents are taxed on employment income using a progressive rate structure:

| Monthly Taxable Income (VND) | Tax Rate |
|------------------------------|----------|
| Up to 5,000,000 | 5% |
| 5,000,001 - 10,000,000 | 10% |
| 10,000,001 - 18,000,000 | 15% |
| 18,000,001 - 32,000,000 | 20% |
| 32,000,001 - 52,000,000 | 25% |
| 52,000,001 - 80,000,000 | 30% |
| Over 80,000,000 | 35% |

The same brackets apply on an annualized basis (multiply thresholds by 12).

### Non-Resident Flat Rate

Non-residents are taxed at a **flat 20%** on Vietnam-source employment income.

**Key differences:**
- No progressive brackets
- No family circumstance deductions
- No insurance contribution deductions from the tax base

### Source
- PIT Law (Consolidated), Articles 25-26
- Circular 111/2013/TT-BTC`,
        category: 'rates',
        audience: 'employee',
        legalBasis: 'PIT Law (Consolidated), Articles 25-26',
        sourceUrl: 'https://vbpl.vn',
        sourceName: 'National Legal Database',
        effectiveDate: new Date('2009-01-01'),
        metaTitle: 'Vietnam PIT Tax Rates | Resident vs Non-Resident',
        metaDescription: 'Compare Vietnam Personal Income Tax rates for residents (progressive 5-35%) and non-residents (flat 20%). Official brackets explained.',
        sortOrder: 2,
      },
    }),
    db.knowledgeArticle.create({
      data: {
        slug: 'family-deductions-2025-2026',
        title: 'Family Circumstance Deductions (2025 vs 2026)',
        shortAnswer: 'For tax period 2025: taxpayer deduction is 11,000,000 VND/month, dependant is 4,400,000 VND/month. From 2026: taxpayer increases to 15,500,000 VND/month, dependant to 6,200,000 VND/month.',
        content: `## Family Circumstance Deductions

Family circumstance deductions reduce your taxable income before calculating PIT. These amounts have been significantly increased starting from tax period 2026.

### Tax Period 2025

| Deduction Type | Monthly Amount (VND) | Annual Amount (VND) |
|----------------|---------------------|---------------------|
| Taxpayer | 11,000,000 | 132,000,000 |
| Per Dependant | 4,400,000 | 52,800,000 |

### Tax Period 2026 and Beyond

| Deduction Type | Monthly Amount (VND) | Annual Amount (VND) |
|----------------|---------------------|---------------------|
| Taxpayer | 15,500,000 | 186,000,000 |
| Per Dependant | 6,200,000 | 74,400,000 |

### Who Qualifies as a Dependant?

- **Spouse** who is not earning income
- **Children** under 18 years old
- **Children** 18-22 years old in full-time education
- **Children** with disabilities regardless of age
- **Parents** who are unable to work

### Important Notes

1. Deductions apply only to **tax residents**
2. You must register dependants with the tax authority
3. Supporting documents are required (birth certificates, marriage certificates, etc.)
4. Each dependant can only be deducted by one taxpayer

### Source
- Tax Department Guidance Letter (published on Government Portal)
- National Assembly Standing Committee Resolution`,
        category: 'deductions',
        audience: 'employee',
        legalBasis: 'Tax Department Guidance Letter; NASC Resolution',
        sourceUrl: 'https://chinhphu.vn',
        sourceName: 'Government Portal',
        effectiveDate: new Date('2026-01-01'),
        metaTitle: 'Vietnam Family Deductions 2025-2026 | Official Amounts',
        metaDescription: 'Official family circumstance deduction amounts for Vietnam PIT. Compare 2025 (11M/4.4M) and 2026 (15.5M/6.2M) rates with legal sources.',
        sortOrder: 3,
      },
    }),
    db.knowledgeArticle.create({
      data: {
        slug: 'leaving-vietnam-tax-finalization',
        title: 'PIT Finalization Before Leaving Vietnam',
        shortAnswer: 'Resident foreigners must finalize their Personal Income Tax before leaving Vietnam. This is mandatory and must be completed before your departure date.',
        content: `## Mandatory Exit Finalization

If you are a **tax resident** leaving Vietnam, you are legally required to finalize your PIT before departure.

### Who Must Finalize Before Exit?

All foreign individuals who:
- Meet the criteria for tax residency in Vietnam
- Are leaving Vietnam permanently or for an extended period
- Have received income from employment in Vietnam

### Timeline

Finalization must be completed **before your departure date**. Plan to start the process at least 2-4 weeks before you leave.

### Documents Required

1. Passport and visa/residence permit copies
2. Employment contracts for the tax year
3. PIT withholding certificates from all employers
4. Payroll summaries showing gross income and tax withheld
5. Insurance contribution records
6. Dependant documents (if applicable)

### The Process

1. **Gather Documents** - Collect all income and withholding evidence
2. **Submit to Advisor** - We review and calculate your position
3. **Review Results** - Confirm calculations and identify refund/opportunity
4. **File Return** - Submit finalization return to tax authority
5. **Receive Confirmation** - Get filing receipt for your records

### Source
- Circular 111/2013/TT-BTC, Article 26
- PIT Law (Consolidated)`,
        category: 'filing',
        audience: 'leaving_vn',
        legalBasis: 'Circular 111/2013/TT-BTC, Article 26',
        sourceUrl: 'https://vbpl.vn',
        sourceName: 'National Legal Database',
        effectiveDate: new Date('2014-01-01'),
        metaTitle: 'Leaving Vietnam Tax Finalization | Mandatory Exit Requirements',
        metaDescription: 'Resident foreigners must finalize PIT before leaving Vietnam. Learn the requirements, timeline, and documents needed for exit finalization.',
        sortOrder: 4,
      },
    }),
    db.knowledgeArticle.create({
      data: {
        slug: 'insurance-foreign-employees',
        title: 'Social & Health Insurance for Foreign Employees',
        shortAnswer: 'Foreign employees with fixed-term contracts of 12+ months are subject to compulsory social insurance (8% employee) and health insurance (1.5% employee), with specific exemptions.',
        content: `## Insurance Obligations for Foreign Employees

### Compulsory Social Insurance

Foreign employees are subject to compulsory social insurance if:

- Working under a **fixed-term labor contract of 12 months or more**
- AND not falling under exemption categories

### Exemptions

You are **NOT** subject to compulsory social insurance if:

1. **Intra-company transferee** - Moving within the same multinational company
2. **Retirement age** - Already at retirement age when signing the contract
3. **Treaty override** - An international treaty to which Vietnam is a party provides otherwise

### Contribution Rates

| Fund | Employee Rate | Employer Rate |
|------|---------------|---------------|
| Retirement & Death | 8% | 14% |
| Sickness & Maternity | 0% | 3% |
| Occupational Accident | 0% | 0.5% (or 0.3% if approved) |
| **Total SI** | **8%** | **17.5%** |

### Health Insurance

Foreign employees with 12+ month contracts are also subject to health insurance:

| Total Rate | Employer Share | Employee Share |
|------------|----------------|----------------|
| 4.5% | 3.0% (2/3) | 1.5% (1/3) |

### Salary Base Cap

- Minimum: Reference level (base salary)
- Maximum: 20 × Reference level

### Unemployment Insurance

Foreign employees are **NOT** subject to unemployment insurance under current Vietnamese law.

### Source
- Social Insurance Law
- Health Insurance Law
- Decree on Occupational Accident Fund`,
        category: 'insurance',
        audience: 'employee',
        legalBasis: 'Social Insurance Law; Health Insurance Law',
        sourceUrl: 'https://vbpl.vn',
        sourceName: 'National Legal Database',
        effectiveDate: new Date('2018-01-01'),
        metaTitle: 'Vietnam Insurance for Foreign Employees | SI & HI Rates',
        metaDescription: 'Complete guide to social insurance (8%) and health insurance (1.5%) for foreign employees in Vietnam. Exemptions, rates, and official sources.',
        sortOrder: 5,
      },
    }),
  ])

  console.log(`Created ${articles.length} knowledge articles`)

  // Create testimonials
  const testimonials = await Promise.all([
    db.testimonial.create({
      data: {
        clientName: 'Michael T.',
        clientTitle: 'Software Engineer',
        clientCompany: 'Tech Company, HCMC',
        content: 'After three years of confusion about my tax obligations, VietPIT finally gave me clarity. They identified a refund I didn\'t know I was entitled to. Professional, thorough, and worth every dong.',
        rating: 5,
        isVerified: true,
        isPublished: true,
      },
    }),
    db.testimonial.create({
      data: {
        clientName: 'Emma L.',
        clientTitle: 'English Teacher',
        clientCompany: 'International School, Hanoi',
        content: 'Leaving Vietnam was stressful enough without worrying about tax finalization. They handled everything efficiently, explained the process clearly, and gave me peace of mind before my departure.',
        rating: 5,
        isVerified: true,
        isPublished: true,
      },
    }),
    db.testimonial.create({
      data: {
        clientName: 'Hans M.',
        clientTitle: 'Engineering Manager',
        clientCompany: 'Manufacturing Company, Binh Duong',
        content: 'Working with multiple employers during the year made my tax situation complex. VietPIT aggregated everything correctly and found deductions I would have missed. Very professional service.',
        rating: 5,
        isVerified: true,
        isPublished: true,
      },
    }),
    db.testimonial.create({
      data: {
        clientName: 'Sarah K.',
        clientTitle: 'Marketing Director',
        clientCompany: 'Agency, HCMC',
        content: 'The calculator gave me a rough estimate, but the actual service went much deeper. They caught issues with my residency determination that would have caused problems. Highly recommend.',
        rating: 5,
        isVerified: true,
        isPublished: true,
      },
    }),
    db.testimonial.create({
      data: {
        clientName: 'Takeshi N.',
        clientTitle: 'Finance Manager',
        clientCompany: 'Trading Company, HCMC',
        content: 'Finally, tax guidance in English that I can understand. The team was patient with my questions and provided clear explanations with legal citations. True professionals.',
        rating: 5,
        isVerified: true,
        isPublished: true,
      },
    }),
    db.testimonial.create({
      data: {
        clientName: 'Marie-Claire D.',
        clientTitle: 'NGO Coordinator',
        clientCompany: 'International NGO, Hanoi',
        content: 'I was unsure about my tax residency status after splitting time between Vietnam and home. The assessment was thorough and gave me confidence in my filing. Excellent communication throughout.',
        rating: 5,
        isVerified: true,
        isPublished: true,
      },
    }),
  ])

  console.log(`Created ${testimonials.length} testimonials`)

  // Create pricing tiers
  const pricingTiers = await Promise.all([
    db.pricingTier.create({
      data: {
        name: 'Consultation',
        slug: 'consultation',
        description: 'Expert guidance for your specific situation',
        priceVND: 0,
        priceUSD: 0,
        features: JSON.stringify([
          '30-60 minute consultation',
          'Written guidance summary',
          'Action plan for your case',
          'Email follow-up support',
          'Source citations provided',
        ]),
        isPopular: false,
        isActive: true,
        sortOrder: 1,
      },
    }),
    db.pricingTier.create({
      data: {
        name: 'Standard Finalization',
        slug: 'standard',
        description: 'Complete PIT finalization for straightforward cases',
        priceVND: 3000000,
        priceUSD: 125,
        features: JSON.stringify([
          'Single employer case',
          'Full document review',
          'Residency determination',
          'Tax calculation & reconciliation',
          'Form preparation & filing',
          'Submission confirmation',
          '30-day post-filing support',
        ]),
        isPopular: true,
        isActive: true,
        sortOrder: 2,
      },
    }),
    db.pricingTier.create({
      data: {
        name: 'Complex Case',
        slug: 'complex',
        description: 'Multi-employer, leaving Vietnam, or optimization review',
        priceVND: 5000000,
        priceUSD: 210,
        features: JSON.stringify([
          'Multiple employers supported',
          'Exit finalization procedures',
          'Refund optimization review',
          'Dependant deduction optimization',
          'Priority processing',
          'Dedicated case manager',
          '60-day post-filing support',
        ]),
        isPopular: false,
        isActive: true,
        sortOrder: 3,
      },
    }),
    db.pricingTier.create({
      data: {
        name: 'Executive Service',
        slug: 'executive',
        description: 'Premium service for senior professionals',
        priceVND: 0,
        priceUSD: 0,
        features: JSON.stringify([
          'Complex compensation packages',
          'Allowance optimization',
          'Tax treaty analysis',
          'Multi-year planning',
          'Priority support',
          'In-person meetings available',
          'Quarterly check-ins',
          'Year-round advisory',
        ]),
        isPopular: false,
        isActive: true,
        sortOrder: 4,
      },
    }),
  ])

  console.log(`Created ${pricingTiers.length} pricing tiers`)

  // Create rulesets for versioning
  const rulesets = await Promise.all([
    db.ruleset.create({
      data: {
        name: 'PIT Rules 2025',
        effectiveFrom: new Date('2025-01-01'),
        effectiveTo: new Date('2025-12-31'),
        sourceCitation: 'Tax Department Guidance Letter 2025',
        description: 'Tax rules and deduction amounts for tax period 2025',
      },
    }),
    db.ruleset.create({
      data: {
        name: 'PIT Rules 2026',
        effectiveFrom: new Date('2026-01-01'),
        effectiveTo: null,
        sourceCitation: 'NASC Resolution + New PIT Law (effective 01/07/2026)',
        description: 'Tax rules and deduction amounts for tax period 2026 onwards',
      },
    }),
  ])

  console.log(`Created ${rulesets.length} rulesets`)

  // Create rate tables
  await Promise.all([
    db.rateTable.create({
      data: {
        rulesetId: rulesets[0].id,
        type: 'pit_brackets',
        data: JSON.stringify([
          { min: 0, max: 5000000, rate: 0.05 },
          { min: 5000000, max: 10000000, rate: 0.10 },
          { min: 10000000, max: 18000000, rate: 0.15 },
          { min: 18000000, max: 32000000, rate: 0.20 },
          { min: 32000000, max: 52000000, rate: 0.25 },
          { min: 52000000, max: 80000000, rate: 0.30 },
          { min: 80000000, max: null, rate: 0.35 },
        ]),
      },
    }),
    db.rateTable.create({
      data: {
        rulesetId: rulesets[0].id,
        type: 'deductions',
        data: JSON.stringify({
          taxpayer: 11000000,
          dependant: 4400000,
        }),
      },
    }),
    db.rateTable.create({
      data: {
        rulesetId: rulesets[1].id,
        type: 'deductions',
        data: JSON.stringify({
          taxpayer: 15500000,
          dependant: 6200000,
        }),
      },
    }),
  ])

  console.log('Created rate tables')

  console.log('\n✅ Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
