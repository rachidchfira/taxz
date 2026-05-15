import { db } from '../src/lib/db'

async function main() {
  console.log('Adding more knowledge base articles...')

  // Add more comprehensive knowledge base articles
  const articles = await Promise.all([
    db.knowledgeArticle.create({
      data: {
        slug: 'dtc-treaty-claims-vietnam',
        title: 'Double Taxation Avoidance: Treaty Claims for Foreigners',
        shortAnswer: 'Vietnam has DTAs with 80+ countries. If you are a tax resident of a treaty country, you may claim relief from double taxation under the applicable treaty provisions.',
        content: `## Double Taxation Avoidance in Vietnam

Vietnam has signed Double Taxation Avoidance Agreements (DTAs) with over 80 countries. These treaties prevent the same income from being taxed in both Vietnam and your home country.

### Who Can Claim Treaty Benefits?

To claim DTA benefits, you must:
1. Be a tax resident of a country that has a DTA with Vietnam
2. Obtain a Tax Residence Certificate from your home country's tax authority
3. File the appropriate forms with the Vietnamese tax authority

### Common Treaty Provisions

**Employment Income**
- Most treaties provide that employment income is taxable only in the country where the employment is exercised
- Some treaties have special provisions for short-term assignments (typically <183 days)

**Independent Personal Services**
- Often taxable only in the residence country unless you have a fixed base in Vietnam

**Pensions**
- Generally taxable only in the residence country (varies by treaty)

### How to Claim DTA Benefits

1. **Obtain Residence Certificate**
   - Request from your home country's tax authority
   - Must cover the relevant tax year

2. **Prepare Documentation**
   - Tax Residence Certificate (original or certified copy)
   - Proof of income in Vietnam
   - Treaty claim form (as prescribed by Vietnamese tax authority)

3. **File with Tax Return**
   - Submit with your annual PIT return
   - Include all supporting documentation

### Countries with DTAs

Major countries with DTAs include:
- United States
- United Kingdom
- Australia
- Japan
- South Korea
- Singapore
- Germany
- France
- Netherlands
- And 70+ more countries

### Source
- Circular 205/2013/TT-BTC
- Relevant bilateral tax treaties`,
        category: 'dtc',
        audience: 'employee',
        legalBasis: 'Circular 205/2013/TT-BTC; Bilateral Tax Treaties',
        sourceUrl: 'https://vbpl.vn',
        sourceName: 'National Legal Database',
        effectiveDate: new Date('2013-07-01'),
        metaTitle: 'Vietnam Double Taxation Treaty Claims | DTA Guide for Expats',
        metaDescription: 'How to claim double taxation relief in Vietnam. DTA treaty benefits, residence certificates, and filing procedures for foreigners.',
        sortOrder: 10,
      },
    }),
    db.knowledgeArticle.create({
      data: {
        slug: 'pit-withholding-vs-finalization',
        title: 'PIT Withholding vs Finalization: What\'s the Difference?',
        shortAnswer: 'Withholding is the monthly tax deduction by your employer. Finalization is the annual reconciliation to determine your actual tax liability, which may result in a refund or additional payment.',
        content: `## Understanding PIT Withholding vs Finalization

### What is PIT Withholding?

PIT withholding is the monthly deduction of Personal Income Tax from your salary by your employer. Your employer:
- Calculates tax based on your monthly gross income
- Applies personal and dependant deductions
- Deducts the tax from your salary
- Remits it to the tax authority on your behalf

**Key Points:**
- Withholding is mandatory for employers
- It's an estimate based on monthly income
- May not reflect your actual annual tax liability

### What is PIT Finalization?

PIT finalization is the annual reconciliation process where you:
- Calculate your actual tax liability for the full year
- Compare it with total tax withheld
- Determine if you owe additional tax or are due a refund

**When Finalization is Required:**
- You had multiple employers during the year
- Your employer was not authorized to finalize on your behalf
- You are a resident foreigner leaving Vietnam
- You want to claim deductions not accounted for in withholding

### When Can Employer Finalize?

Your employer can finalize on your behalf if:
1. You had only one employer during the year
2. You authorize your employer to finalize (Form 02-1/BK-QTT-TNCN)
3. Your employer agrees to take on this responsibility

### When Must You File Individually?

You must file your own finalization return if:
- You worked for multiple employers
- Your employer is not authorized to finalize
- You are leaving Vietnam permanently
- You have additional income not subject to withholding

### Source
- Circular 111/2013/TT-BTC, Articles 25-27`,
        category: 'filing',
        audience: 'employee',
        legalBasis: 'Circular 111/2013/TT-BTC',
        sourceUrl: 'https://vbpl.vn',
        sourceName: 'National Legal Database',
        effectiveDate: new Date('2014-01-01'),
        metaTitle: 'Vietnam PIT Withholding vs Finalization | Complete Guide',
        metaDescription: 'Understand the difference between PIT withholding and finalization. When to file your own return, employer authorization, and refund claims.',
        sortOrder: 11,
      },
    }),
    db.knowledgeArticle.create({
      data: {
        slug: 'insurance-exemptions-foreign-employees',
        title: 'Insurance Exemptions: Who Doesn\'t Need to Pay?',
        shortAnswer: 'Foreign employees may be exempt from compulsory insurance if they are intra-company transferees, at retirement age when signing, or covered by an international treaty.',
        content: `## Insurance Exemptions for Foreign Employees

### Who Is Subject to Compulsory Insurance?

Foreign employees are subject to compulsory social and health insurance if:
- Working under a fixed-term labor contract of **12 months or more**
- Not falling under any exemption category

### Exemption Categories

**1. Intra-Company Transferees**
Foreign employees transferred within the same multinational company group may be exempt if:
- They remain on the home country payroll
- They continue to pay social insurance in their home country
- The transfer meets specific duration requirements

**2. Retirement Age at Contract Signing**
If you are already at retirement age when signing your labor contract:
- Male: 60 years old
- Female: 55 years old
- You are exempt from compulsory insurance

**3. International Treaty Override**
If an international treaty to which Vietnam is a party provides otherwise:
- The treaty provisions prevail
- Common for certain diplomatic and consular staff

### Partial Coverage

Some foreign employees may be subject to only certain types of insurance:
- **Social Insurance Only**: Applies to most standard employment
- **Health Insurance Only**: May apply in specific contract arrangements
- **No Insurance**: Only if fully exempt under above categories

### Contribution Rates

| Insurance Type | Employee Rate | Employer Rate |
|---------------|---------------|---------------|
| Social Insurance | 8% | 17.5% |
| Health Insurance | 1.5% | 3% |
| **Total** | **9.5%** | **20.5%** |

### Salary Base Cap

- Maximum: 20 × Base Salary (currently 20 × 2,340,000 VND = 46,800,000 VND)
- Any income above this cap is not subject to insurance contributions

### Claiming Your Contributions

When you leave Vietnam permanently:
- You may claim a one-time payment of your social insurance contributions
- Must meet minimum contribution period requirements
- File through your employer or directly with social insurance office

### Source
- Social Insurance Law
- Health Insurance Law
- Decree 115/2015/ND-CP`,
        category: 'insurance',
        audience: 'employee',
        legalBasis: 'Social Insurance Law; Health Insurance Law',
        sourceUrl: 'https://vbpl.vn',
        sourceName: 'National Legal Database',
        effectiveDate: new Date('2018-01-01'),
        metaTitle: 'Vietnam Insurance Exemptions for Foreigners | Complete Guide',
        metaDescription: 'Who is exempt from compulsory insurance in Vietnam? Intra-company transferees, retirement age, treaty provisions explained.',
        sortOrder: 12,
      },
    }),
    db.knowledgeArticle.create({
      data: {
        slug: 'common-pit-mistakes-foreigners',
        title: 'Common PIT Mistakes Foreigners Make in Vietnam',
        shortAnswer: 'Common mistakes include: not understanding residency rules, missing deductions, failing to file after multiple employers, ignoring departure requirements, and incorrect tax year calculations.',
        content: `## Common PIT Mistakes Foreigners Make

### 1. Not Understanding Residency Rules

**The Mistake:**
- Assuming you're a non-resident just because you're foreign
- Not tracking days in Vietnam
- Missing the 183-day threshold

**The Fix:**
- Keep track of your days in Vietnam
- Understand that residency affects your entire tax position
- Document your arrival/departure dates

### 2. Missing Dependant Deductions

**The Mistake:**
- Not claiming eligible dependants
- Missing documentation for dependants
- Not understanding who qualifies

**The Fix:**
- Register dependants with tax authority
- Gather birth certificates, marriage certificates
- Keep translation of foreign documents

### 3. Ignoring Multiple Employer Obligations

**The Mistake:**
- Assuming employers handle everything
- Not collecting withholding certificates
- Missing the individual filing requirement

**The Fix:**
- Get PIT withholding certificates from all employers
- File individual finalization if you had 2+ employers
- Aggregate income correctly

### 4. Failing to Finalize Before Departure

**The Mistake:**
- Leaving Vietnam without finalizing
- Not knowing the mandatory requirement
- Assuming you can file from abroad

**The Fix:**
- Start finalization at least 2 weeks before departure
- Gather all documents early
- Get tax clearance before you leave

### 5. Wrong Tax Year Calculations

**The Mistake:**
- Confusing calendar year vs contract year
- Not accounting for partial year work
- Applying wrong deduction amounts

**The Fix:**
- Tax year in Vietnam is calendar year (Jan 1 - Dec 31)
- Use correct deduction amounts for each tax year
- 2025: 11M/4.4M VND | 2026+: 15.5M/6.2M VND

### 6. Not Claiming Refunds

**The Mistake:**
- Not filing when entitled to a refund
- Assuming withholding is always correct
- Leaving money on the table

**The Fix:**
- File finalization to claim refunds
- Review withholding vs actual liability
- Common refund situations: partial year work, multiple deductions

### 7. Incorrect Insurance Treatment

**The Mistake:**
- Not knowing your insurance obligations
- Missing exemption opportunities
- Not claiming contributions when leaving

**The Fix:**
- Check if you're exempt (intra-company transfer, retirement age)
- Understand the 12-month contract threshold
- Claim one-time payment when departing

### Source
- Circular 111/2013/TT-BTC
- PIT Law (Consolidated)`,
        category: 'filing',
        audience: 'employee',
        legalBasis: 'Circular 111/2013/TT-BTC; PIT Law',
        sourceUrl: 'https://vbpl.vn',
        sourceName: 'National Legal Database',
        effectiveDate: new Date('2014-01-01'),
        metaTitle: '7 Common PIT Mistakes Foreigners Make in Vietnam | Tax Guide',
        metaDescription: 'Avoid these common tax mistakes: residency errors, missed deductions, multiple employer issues, departure requirements, and more.',
        sortOrder: 13,
      },
    }),
    db.knowledgeArticle.create({
      data: {
        slug: 'pit-filing-deadlines-vietnam',
        title: 'PIT Filing Deadlines and Important Dates',
        shortAnswer: 'The annual PIT finalization deadline is typically the last day of March or April of the following year. For departure cases, finalization must be completed before leaving Vietnam.',
        content: `## PIT Filing Deadlines in Vietnam

### Annual Finalization Deadline

The deadline for PIT finalization is typically:
- **Last day of March or April** of the year following the tax year
- Exact date announced annually by the Tax Department
- For tax year 2025: Expected deadline around **March 31, 2026** or **April 30, 2026**

### Who Must File by the Deadline?

1. **Individuals with multiple employers**
   - Must file individual finalization return
   
2. **Individuals whose employer didn't finalize**
   - Employer authorization not granted
   
3. **Individuals with additional income**
   - Income not subject to withholding

### Departure Finalization

**Deadline:** BEFORE leaving Vietnam

- No specific date - must be completed before your departure
- Recommend starting 2-4 weeks before your planned exit
- Failure to finalize may cause issues with future visa applications

### Monthly Withholding

**Deadline:** By the 20th of the following month

- Employer's responsibility
- Deducted from your monthly salary
- Remitted to tax authority

### Important Tax Dates

| Event | Typical Date |
|-------|-------------|
| Tax Year Start | January 1 |
| Tax Year End | December 31 |
| Annual Finalization | March 31 - April 30 (following year) |
| Monthly Withholding | By 20th of following month |
| Departure Finalization | Before leaving Vietnam |

### Late Filing Penalties

- Interest charges on unpaid tax
- Administrative penalties
- Potential issues with tax clearance

### Pro Tips

1. **Don't wait until the deadline**
   - Gather documents early
   - Allow time for corrections

2. **Set calendar reminders**
   - Monthly withholding verification
   - Annual finalization preparation

3. **Departure planning**
   - Start finalization 2-4 weeks before leaving
   - Don't schedule departure too close to deadline

### Source
- Circular 111/2013/TT-BTC
- Annual Tax Department guidance letters`,
        category: 'deadlines',
        audience: 'employee',
        legalBasis: 'Circular 111/2013/TT-BTC',
        sourceUrl: 'https://gdt.gov.vn',
        sourceName: 'General Department of Taxation',
        effectiveDate: new Date('2014-01-01'),
        metaTitle: 'Vietnam PIT Filing Deadlines | Important Tax Dates',
        metaDescription: 'Know your PIT filing deadlines in Vietnam. Annual finalization, departure requirements, monthly withholding, and penalty information.',
        sortOrder: 14,
      },
    }),
  ])

  console.log(`Added ${articles.length} more knowledge base articles`)

  // Add more legal sources
  const sources = await Promise.all([
    db.legalSource.create({
      data: {
        name: 'Decree 65/2013/ND-CP',
        citation: '65/2013/ND-CP',
        sourceUrl: 'https://vbpl.vn',
        sourceDomain: 'vbpl.vn',
        category: 'implementing_regulation',
        description: 'Government decree providing detailed guidance on PIT Law implementation',
      },
    }),
    db.legalSource.create({
      data: {
        name: 'Decree 115/2015/ND-CP',
        citation: '115/2015/ND-CP',
        sourceUrl: 'https://vbpl.vn',
        sourceDomain: 'vbpl.vn',
        category: 'implementing_regulation',
        description: 'Decree on compulsory social insurance for foreign employees',
      },
    }),
  ])

  console.log(`Added ${sources.length} more legal sources`)

  console.log('\n✅ Knowledge base enhancement completed!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
