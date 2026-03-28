export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  featured: boolean
  source: string
  content: string
  tableOfContents?: { title: string; anchor: string }[]
  lastUpdated: string
}

export const articles: Article[] = [
  {
    id: 1,
    slug: 'understanding-tax-residency-complete-guide-foreigners',
    title: 'Understanding Tax Residency: The Complete Guide for Foreigners',
    excerpt: 'Learn how the 183-day rule works, what constitutes regular residence, and how your residency status affects your tax obligations in Vietnam.',
    category: 'Tax Residency',
    readTime: '8 min read',
    featured: true,
    source: 'PIT Law (Consolidated) - Law No. 04/2012/QH13',
    lastUpdated: '2024-12-15',
    tableOfContents: [
      { title: 'What is Tax Residency?', anchor: 'what-is-tax-residency' },
      { title: 'The 183-Day Rule', anchor: '183-day-rule' },
      { title: 'Regular Residence Test', anchor: 'regular-residence' },
      { title: 'Tax Resident vs Non-Resident', anchor: 'resident-vs-non-resident' },
      { title: 'Changing Your Status', anchor: 'changing-status' },
      { title: 'DTA Impact on Residency', anchor: 'dta-impact' },
    ],
    content: `
## What is Tax Residency?

Tax residency determines how you are taxed in Vietnam. Your status as either a **tax resident** or **non-resident** significantly impacts:

- The tax rates applied to your income
- What income is subject to Vietnamese tax
- Your eligibility for deductions and treaties
- Your filing obligations

Under the Vietnamese Personal Income Tax Law (PIT Law), two main criteria determine your tax residency status.

---

## The 183-Day Rule {#183-day-rule}

The primary test for tax residency is the **183-day rule**. You are considered a tax resident if:

> **You are present in Vietnam for 183 days or more within either:**
> - A calendar year (January 1 – December 31), OR
> - 12 consecutive months starting from your first arrival date

### How Days Are Counted

- **Physical presence** in Vietnam counts as a day
- Days of **arrival and departure** both count
- **Partial days** count as full days
- Days spent in **transit** may or may not count depending on circumstances

### Example Scenarios

**Scenario 1: Calendar Year Test**
- You arrived on March 1, 2024
- By August 31, 2024, you have been in Vietnam for 184 days
- **Result:** You are a tax resident for 2024

**Scenario 2: 12-Month Rolling Period**
- You arrived on October 1, 2023
- By March 31, 2024 (within 12 months), you have 182 days
- In April 2024, you exceed 183 days
- **Result:** You become a tax resident in April 2024

---

## Regular Residence Test {#regular-residence}

If you don't meet the 183-day threshold, you may still qualify as a tax resident through the **regular residence test**:

> **You have a "regular residence" in Vietnam if:**
> - You have a registered permanent residence, OR
> - You rent a house with a lease term of **183 days or more** within a tax year

### What Qualifies as Regular Residence?

| Type | Requirements |
|------|-------------|
| Permanent Residence | Official registration with local authorities |
| Rented Accommodation | Lease agreement ≥ 183 days in tax year |
| Company-Provided Housing | Employment contract includes housing for ≥ 183 days |

### Important Notes

- Hotel stays typically **do not** qualify
- Short-term rentals under 183 days **do not** count
- You must have **actual presence** at the residence
- Documentation is required for verification

---

## Tax Resident vs Non-Resident {#resident-vs-non-resident}

Your residency status dramatically affects your tax obligations:

### Tax Residents

| Aspect | Treatment |
|--------|-----------|
| **Taxable Income** | Worldwide income |
| **Tax Rates** | Progressive (5% – 35%) |
| **Deductions** | Personal and dependant deductions available |
| **Filing** | Annual finalization required in most cases |

**Progressive Tax Brackets (2024/2025):**

| Monthly Taxable Income (VND) | Tax Rate |
|-----------------------------|----------|
| Up to 5,000,000 | 5% |
| 5,000,001 – 10,000,000 | 10% |
| 10,000,001 – 18,000,000 | 15% |
| 18,000,001 – 32,000,000 | 20% |
| 32,000,001 – 52,000,000 | 25% |
| 52,000,001 – 80,000,000 | 30% |
| Over 80,000,000 | 35% |

### Non-Residents

| Aspect | Treatment |
|--------|-----------|
| **Taxable Income** | Vietnam-source income only |
| **Tax Rates** | Flat 20% |
| **Deductions** | Not available |
| **Filing** | Generally withheld at source |

---

## Changing Your Status {#changing-status}

Your residency status can change during your stay in Vietnam. Here's what to expect:

### From Non-Resident to Resident

When you become a tax resident mid-year:

1. **Recalculation Required:** All income from the start of the year is recalculated as resident income
2. **Withholding Adjustment:** Previous non-resident withholding (20%) may be credited
3. **Deductions Applied:** Personal and dependant deductions become available
4. **Potential Refund:** Many foreigners receive refunds due to progressive rates being lower for mid-income levels

### From Resident to Non-Resident

If you leave Vietnam and your status changes:

1. **Final Return Required:** File finalization before departure
2. **Prorated Deductions:** Personal deductions are prorated by months of residency
3. **Final Settlement:** Any tax owed or refundable is calculated

---

## DTA Impact on Residency {#dta-impact}

Vietnam has Double Taxation Agreements (DTAs) with over **80 countries**. These treaties can override domestic residency rules:

### Tie-Breaker Rules

When you would be a resident of both countries under their domestic laws, DTAs use tie-breaker rules:

1. **Permanent Home** – Where do you have a permanent home available?
2. **Center of Vital Interests** – Where are your personal and economic ties stronger?
3. **Habitual Abode** – Where do you live most regularly?
4. **Nationality** – Which country's passport do you hold?

### Common DTA Countries

- United States
- United Kingdom
- Australia
- Japan
- South Korea
- Singapore
- Germany
- France
- Netherlands

### Claiming Treaty Benefits

To claim DTA benefits:

1. Obtain a **Tax Residency Certificate** from your home country
2. Submit Form **01/DTA** to Vietnamese tax authorities
3. Provide supporting documentation
4. Processing typically takes **30-45 days**

---

## Key Takeaways

1. **Track your days** – Maintain accurate records of your presence in Vietnam
2. **Understand both tests** – The 183-day rule and regular residence test can both apply
3. **Know the implications** – Residents and non-residents have vastly different tax obligations
4. **Check your DTA** – Treaty benefits may significantly reduce your tax burden
5. **Plan ahead** – Your residency status affects your departure requirements

---

## Need Help?

If you're unsure about your tax residency status or need help with PIT finalization, our team can provide a **free assessment** based on your specific circumstances.

**Contact us via ZALO: +84703027485**

---

*This article is based on the PIT Law (Consolidated) - Law No. 04/2012/QH13 and Circular 111/2013/TT-BTC. For the most current regulations, please verify with official sources at [vbpl.vn](https://vbpl.vn) or consult with a tax professional.*
    `,
  },
  {
    id: 2,
    slug: 'family-deduction-changes-2025-vs-2026',
    title: 'Family Deduction Changes: 2025 vs 2026',
    excerpt: 'Important changes to personal and dependant deduction amounts starting from tax year 2026. Understand how these changes affect your tax liability.',
    category: 'Deductions',
    readTime: '5 min read',
    featured: true,
    source: 'National Assembly Standing Committee Resolution',
    lastUpdated: '2024-11-20',
    tableOfContents: [
      { title: 'Current Deduction Amounts (2025)', anchor: 'current-2025' },
      { title: 'New Deduction Amounts (2026)', anchor: 'new-2026' },
      { title: 'Impact on Your Taxes', anchor: 'impact' },
      { title: 'Who Qualifies for Deductions', anchor: 'qualifications' },
      { title: 'How to Claim', anchor: 'how-to-claim' },
    ],
    content: `
## Current Deduction Amounts (2025) {#current-2025}

For the tax year 2025, the family circumstance deduction amounts remain:

| Deduction Type | Monthly Amount (VND) | Annual Amount (VND) |
|---------------|---------------------|---------------------|
| **Personal Deduction** | 11,000,000 | 132,000,000 |
| **Dependant Deduction** | 4,400,000 | 52,800,000 |

These amounts have been in effect since July 1, 2020, and continue through the 2025 tax year.

---

## New Deduction Amounts (2026) {#new-2026}

The National Assembly Standing Committee has approved **significant increases** effective from tax year 2026:

| Deduction Type | Monthly Amount (VND) | Annual Amount (VND) | Increase |
|---------------|---------------------|---------------------|----------|
| **Personal Deduction** | 15,500,000 | 186,000,000 | +41% |
| **Dependant Deduction** | 6,200,000 | 74,400,000 | +41% |

### Why the Increase?

The adjustment accounts for:
- Cumulative inflation since 2020
- Cost of living increases
- Economic growth and wage adjustments
- Social policy objectives

---

## Impact on Your Taxes {#impact}

### Example: Single Employee

**Monthly Salary:** 50,000,000 VND

| Tax Year | Monthly Taxable Income | Monthly Tax | Annual Tax |
|----------|----------------------|-------------|------------|
| 2025 | 39,000,000 VND | ~6,150,000 VND | ~73,800,000 VND |
| 2026 | 34,500,000 VND | ~4,975,000 VND | ~59,700,000 VND |
| **Savings** | - | **~1,175,000 VND/month** | **~14,100,000 VND/year** |

### Example: Married with 2 Children

**Monthly Salary:** 80,000,000 VND
**Deductions:** Personal + 2 dependants

| Tax Year | Monthly Deductions | Monthly Taxable | Monthly Tax |
|----------|-------------------|-----------------|-------------|
| 2025 | 19,800,000 VND | 60,200,000 VND | ~12,100,000 VND |
| 2026 | 27,900,000 VND | 52,100,000 VND | ~9,540,000 VND |
| **Savings** | - | - | **~2,560,000 VND/month** |

---

## Who Qualifies for Deductions {#qualifications}

### Personal Deduction

All **tax residents** with employment income qualify for the personal deduction. No registration required.

### Dependant Deduction

To claim dependant deductions, the dependant must meet specific criteria:

#### Qualifying Dependants

| Category | Conditions |
|----------|-----------|
| **Minor Children** | Under 18 years old |
| **Student Children** | 18-24 years, enrolled in accredited institution |
| **Elderly Parents** | Over 60 years (male) or 55 years (female), with no income or income below deduction threshold |
| **Disabled Family Members** | Certified disability with no or limited income |
| **Spouse** | Unemployed with income below deduction threshold |

#### Registration Requirements

1. Submit dependant registration to tax authority
2. Provide supporting documents:
   - Birth certificates for children
   - School enrollment letter for students
   - Disability certificate for disabled members
   - Proof of relationship
3. Each dependant can only be claimed by **one taxpayer**

---

## How to Claim {#how-to-claim}

### Step 1: Register Dependants

Before claiming deductions, register your dependants with the tax authority:

**Required Documents:**
- Form 02/MST (Dependant registration)
- Birth certificates (copies)
- School enrollment verification (for students)
- Other supporting documents as applicable

### Step 2: Provide to Employer

Your employer will calculate deductions in monthly withholding:
- Submit dependant list to HR/payroll
- Employer applies deductions from registration date
- Keep copies of all registration documents

### Step 3: Year-End Finalization

During annual finalization:
- Verify all deductions were correctly applied
- Update dependant information if changed
- Claim any deductions not accounted for in monthly withholding

---

## Important Notes for Foreigners

### Residency Requirement

**Only tax residents** can claim family deductions. Non-residents are not eligible.

### Foreign Dependents

Foreign family members can qualify as dependants if:
- They reside in Vietnam
- Proper documentation is provided (translated and notarized)
- They meet the qualifying criteria

### Cross-Border Situations

If your dependants live outside Vietnam:
- You may still claim them if they meet criteria
- Additional documentation may be required
- Some DTAs may affect eligibility

---

## Planning Tips

1. **Register early** – Don't wait until year-end to register dependants
2. **Keep records** – Maintain all supporting documents
3. **Update promptly** – Report changes in dependant status
4. **Coordinate with spouse** – Decide who claims each dependant for optimal tax outcome
5. **Review annually** – Verify dependant eligibility each year

---

## Need Help?

Our team can help you:
- Determine dependant eligibility
- Prepare and submit registration documents
- Optimize your deduction claims
- File your annual PIT finalization

**Contact us via ZALO: +84703027485**

---

*This article is based on the National Assembly Standing Committee Resolution on family circumstance deduction adjustments. For official information, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 3,
    slug: 'leaving-vietnam-tax-finalization-checklist',
    title: 'Leaving Vietnam: Your Tax Finalization Checklist',
    excerpt: 'Step-by-step guide for foreigners who are permanently departing Vietnam. Know what documents you need and the deadlines you must meet.',
    category: 'Special Cases',
    readTime: '10 min read',
    featured: true,
    source: 'Circular 111/2013/TT-BTC',
    lastUpdated: '2024-12-01',
    tableOfContents: [
      { title: 'Who Must Finalize Before Leaving', anchor: 'who-must-finalize' },
      { title: 'Deadline Requirements', anchor: 'deadlines' },
      { title: 'Required Documents', anchor: 'documents' },
      { title: 'Step-by-Step Process', anchor: 'process' },
      { title: 'Common Mistakes to Avoid', anchor: 'mistakes' },
      { title: 'What Happens If You Don\'t File', anchor: 'consequences' },
    ],
    content: `
## Who Must Finalize Before Leaving {#who-must-finalize}

Under Circular 111/2013/TT-BTC, **departure finalization is mandatory** for:

1. **Tax residents** who are permanently leaving Vietnam
2. **Foreign individuals** who have been tax residents during their stay
3. **Anyone** with tax obligations not yet settled

### Exceptions

You may NOT need to file departure finalization if:
- You were never a tax resident (183 days not met, no regular residence)
- All your taxes were fully withheld and finalized by employer
- You are leaving temporarily and will return within the same tax year

---

## Deadline Requirements {#deadlines}

### Standard Deadline

**File within 60 days** from your departure date.

However, this is the **maximum** allowed time. In practice:

| Situation | Recommended Timing |
|-----------|-------------------|
| Permanent departure | **Before leaving Vietnam** |
| Short notice departure | Within 60 days |
| Employer-handled finalization | Coordinate 2-3 weeks before departure |

### Why File Before Departure?

1. **Document Access** – Harder to obtain documents from abroad
2. **In-Person Requirements** – Some procedures require physical presence
3. **Bank Account Issues** – Vietnamese bank accounts may be closed
4. **Refund Processing** – Refunds are easier to process while in Vietnam

---

## Required Documents {#documents}

### Essential Documents

| Document | Source | Notes |
|----------|--------|-------|
| **Passport** | Your possession | Original and copy of visa pages |
| **Work Permit/Labor Contract** | Employer | All contracts during tax year |
| **Salary Statements** | Employer | Monthly withholding records |
| **Form 02/CK-TNCN** | Tax authority | Finalization form |
| **Tax Withholding Certificates** | Employer | Form 05/MST from each employer |

### Additional Documents (If Applicable)

- **Dependant registration certificates**
- **Charitable donation receipts** (for deductions)
- **Insurance premium receipts**
- **Previous year tax returns** (if filed)
- **Tax Residency Certificate** (for DTA claims)

### For Multi-Employer Situations

If you worked for multiple employers:
- Withholding certificates from **all employers**
- Labor contracts from **all periods**
- Documentation of gaps between employment

---

## Step-by-Step Process {#process}

### Step 1: Notify Your Employer (Week 1)

- Inform HR of your departure date
- Request all withholding certificates
- Ask if employer will handle finalization
- Obtain signed labor contract termination

### Step 2: Gather Documents (Week 1-2)

- Collect all required documents listed above
- Verify accuracy of withholding amounts
- Check for any missing periods or employers
- Translate foreign documents (if needed)

### Step 3: Calculate Tax Position (Week 2)

- Determine total annual income
- Calculate total withholding
- Estimate final tax liability or refund
- Identify potential issues

### Step 4: Prepare Finalization Form (Week 2-3)

- Complete Form 02/CK-TNCN
- Attach all supporting documents
- Calculate any refund or payment due
- Review for completeness

### Step 5: Submit to Tax Authority (Week 3-4)

- Submit in person at local tax department
- Or use online portal (if registered)
- Obtain receipt of submission
- Follow up on processing status

### Step 6: Resolve Outstanding Issues (Week 4+)

- Respond to any tax authority queries
- Provide additional documentation if requested
- Pay any tax due or receive refund
- Obtain tax clearance confirmation

---

## Common Mistakes to Avoid {#mistakes}

### 1. Missing the Deadline

> **Problem:** Filing after the 60-day window
> **Consequence:** Late filing penalties + interest on any tax due
> **Solution:** Start the process at least 1 month before departure

### 2. Incomplete Documentation

> **Problem:** Missing withholding certificates or contracts
> **Consequence:** Processing delays, inability to claim deductions
> **Solution:** Request all documents before leaving your employer

### 3. Forgetting Previous Employers

> **Problem:** Not including income from all employers during the year
> **Consequence:** Underreported income, potential audit, penalties
> **Solution:** Keep records of all employment during the year

### 4. Incorrect Residency Status

> **Problem:** Claiming resident deductions as non-resident
> **Consequence:** Rejected return, penalties, interest
> **Solution:** Verify your residency status before filing

### 5. Not Claiming Eligible Deductions

> **Problem:** Missing deductions you're entitled to claim
> **Consequence:** Overpaying taxes
> **Solution:** Review all available deductions with a tax professional

---

## What Happens If You Don't File {#consequences}

### Immediate Consequences

| Consequence | Details |
|-------------|---------|
| **Late Filing Penalty** | 500,000 – 1,500,000 VND for individuals |
| **Interest on Tax Due** | 0.03% per day on outstanding amounts |
| **Administrative Actions** | Travel restrictions may apply |

### Long-Term Consequences

- **Tax debt record** maintained in Vietnam's system
- **Future visa applications** may be affected
- **Employment verification** issues for future Vietnam work
- **Banking complications** if returning to Vietnam

### Travel Restrictions

In serious cases, tax authorities can request immigration to:
- Deny visa extensions
- Block departure (in extreme cases of tax evasion)
- Flag your record for future entries

---

## Getting Help

### What We Can Do

Our team specializes in departure finalization for foreigners:

1. **Document Preparation** – We compile and organize all required documents
2. **Tax Calculation** – Accurate calculation of your tax position
3. **Filing Services** – Submit on your behalf to tax authorities
4. **Refund Processing** – Handle refund claims efficiently
5. **Airport Clearance** – Provide documentation for smooth departure

### Our Process

- **Day 1-2:** Document collection and review
- **Day 3-5:** Tax calculation and form preparation
- **Day 6-8:** Submission to tax authority
- **Day 9-14:** Follow-up and resolution
- **Day 15+:** Final clearance and refund processing

### Average Timeline

| Service Level | Timeline |
|---------------|----------|
| Standard | 10-15 business days |
| Expedited | 5-7 business days |
| Emergency | 3-5 business days |

---

## Contact Us

Don't risk penalties or travel issues. Let us handle your departure finalization professionally.

**ZALO: +84703027485**

We respond within 24 hours with a clear assessment of your situation.

---

*This article is based on Circular 111/2013/TT-BTC and Tax Administration Law. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 4,
    slug: 'social-insurance-foreign-employees-who-must-pay',
    title: 'Social Insurance for Foreign Employees: Who Must Pay?',
    excerpt: 'Comprehensive guide to social insurance obligations for foreign workers, including exemption conditions and contribution rates.',
    category: 'Insurance',
    readTime: '7 min read',
    featured: false,
    source: 'Social Insurance Law & Decree 115/2015/ND-CP',
    lastUpdated: '2024-10-15',
    tableOfContents: [
      { title: 'Overview of Social Insurance in Vietnam', anchor: 'overview' },
      { title: 'Who Must Contribute', anchor: 'who-must-contribute' },
      { title: 'Exemption Conditions', anchor: 'exemptions' },
      { title: 'Contribution Rates', anchor: 'rates' },
      { title: 'Benefits and Claims', anchor: 'benefits' },
      { title: 'Special Cases', anchor: 'special-cases' },
    ],
    content: `
## Overview of Social Insurance in Vietnam {#overview}

Vietnam's social insurance system provides coverage for:

- **Retirement benefits** (pension)
- **Survivor benefits** (death benefits)
- **Sickness benefits** (sick leave)
- **Maternity benefits**
- **Work-related injury benefits**
- **Health insurance** (separate but related)

For foreign employees, understanding your obligations is crucial for compliance and benefits access.

---

## Who Must Contribute {#who-must-contribute}

### General Rule

Foreign employees working in Vietnam under **fixed-term labor contracts of 12 months or more** are subject to compulsory social insurance.

### Covered Employment Types

| Contract Type | Social Insurance Required |
|--------------|--------------------------|
| Fixed-term ≥ 12 months | ✅ Yes |
| Fixed-term < 12 months | ❌ No |
| Indefinite term | ✅ Yes |
| Seasonal work | ❌ No |

### Covered Nationalities

Most foreign employees are covered. The main considerations are:
- Valid work permit
- Labor contract meeting duration requirements
- Employment with Vietnamese entity or registered foreign entity

---

## Exemption Conditions {#exemptions}

### Automatic Exemptions

You are **exempt** from compulsory social insurance if:

1. **Intra-Company Transferee**
   - Working under WTO commitments
   - Transferred from overseas company to Vietnam branch
   - Specific treaty provisions apply

2. **Retirement Age at Contract Start**
   - Male: 60 years or older
   - Female: 55 years or older
   - At time of signing the labor contract

3. **Bilateral Social Security Agreement**
   - Your home country has a social security agreement with Vietnam
   - You provide Certificate of Coverage from home country

### Countries with Social Security Agreements

Vietnam currently has social security agreements with:
- South Korea
- Germany (pending implementation)
- More agreements under negotiation

### How to Claim Exemption

1. Determine which exemption applies
2. Gather supporting documentation
3. Submit to employer HR department
4. Employer applies exemption to contributions
5. Keep records for tax authority verification

---

## Contribution Rates {#rates}

### Current Contribution Structure

| Fund | Employer Rate | Employee Rate | Total |
|------|--------------|---------------|-------|
| **Retirement & Death** | 14% | 8% | 22% |
| **Sickness & Maternity** | 3% | 0% | 3% |
| **Work Injury** | 0.5% | 0% | 0.5% |
| **Health Insurance** | 3% | 1.5% | 4.5% |
| **Unemployment** | 1% | 1% | 2% |
| **TOTAL** | **21.5%** | **10.5%** | **32%** |

### Wage Base for Contributions

- **Capped at 20 times** the regional minimum wage
- Regional minimum wage varies by location:
  - Region I (HCMC, Hanoi): 4,960,000 VND
  - Region II: 4,410,000 VND
  - Region III: 3,860,000 VND
  - Region IV: 3,250,000 VND

**Maximum contribution base (Region I):** 99,200,000 VND/month

### Example Calculation

**Monthly Salary:** 60,000,000 VND (in HCMC)

| Component | Calculation | Amount |
|-----------|-------------|--------|
| Contribution Base | Capped at 20 × min wage | 99,200,000 VND |
| Employee Contribution | 10.5% × 60,000,000 | 6,300,000 VND |
| Employer Contribution | 21.5% × 60,000,000 | 12,900,000 VND |

---

## Benefits and Claims {#benefits}

### Retirement Benefits

Foreign employees can receive:
- **Lump-sum withdrawal** when leaving Vietnam permanently
- Proportional to contribution period
- Includes principal + interest

### Sickness Benefits

- Paid sick leave for verified illness
- Up to 180 days per occurrence
- 75% of salary (before social insurance)

### Maternity Benefits

- 6 months maternity leave
- 100% of salary for leave period
- Additional benefits for multiple births

### Health Insurance Benefits

- Access to public healthcare
- Reimbursement for approved treatments
- Emergency coverage

---

## Special Cases {#special-cases}

### Multiple Employers

If you have multiple employers simultaneously:
- **Primary employer** handles social insurance
- Other employers contribute to unemployment insurance only
- Coordinate with employers to avoid double contributions

### Contract Extension

When your contract is extended:
- Social insurance continues if extension ≥ 12 months
- If gaps between contracts, determine each period separately
- Contributions are cumulative

### Early Termination

If your contract ends early:
- Contributions stop at termination date
- You may claim lump-sum withdrawal
- Keep all contribution records

### Leaving Vietnam

When permanently departing:
- File for **lump-sum social insurance withdrawal**
- Required documents:
  - Passport with exit visa
  - Social insurance book
  - Application form
- Processing: 10-15 business days

---

## Frequently Asked Questions

### Q: Can I opt out of social insurance?

**A:** Only if you meet exemption criteria. You cannot voluntarily opt out otherwise.

### Q: What happens to my contributions when I leave Vietnam?

**A:** You can withdraw your contributions as a lump sum when permanently departing.

### Q: Do I need to continue paying after retirement age?

**A:** No, contributions stop when you reach retirement age (60 male, 55 female).

### Q: Can I receive a Vietnamese pension in my home country?

**A:** Generally, foreign employees take lump-sum withdrawal rather than pension. However, if you contribute for 20+ years, pension options may be available.

---

## Need Assistance?

Our team can help you:
- Determine your social insurance obligations
- Apply for exemptions if eligible
- Process withdrawal claims upon departure
- Coordinate with employers on contributions

**ZALO: +84703027485**

---

*This article is based on the Social Insurance Law (2014) and Decree 115/2015/ND-CP. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 5,
    slug: 'pit-withholding-vs-finalization-difference',
    title: 'PIT Withholding vs Finalization: What\'s the Difference?',
    excerpt: 'Understand when monthly withholding is sufficient and when you need to file a year-end finalization return.',
    category: 'Filing & Forms',
    readTime: '6 min read',
    featured: false,
    source: 'Circular 111/2013/TT-BTC',
    lastUpdated: '2024-11-01',
    tableOfContents: [
      { title: 'What is PIT Withholding', anchor: 'withholding' },
      { title: 'What is PIT Finalization', anchor: 'finalization' },
      { title: 'When Finalization is Required', anchor: 'when-required' },
      { title: 'When You Can Skip Finalization', anchor: 'skip-finalization' },
      { title: 'How They Work Together', anchor: 'how-they-work' },
    ],
    content: `
## What is PIT Withholding {#withholding}

PIT withholding is the **monthly deduction** of personal income tax by your employer from your salary.

### How It Works

1. Your employer calculates your monthly taxable income
2. Personal and dependant deductions are applied
3. Tax is calculated using progressive rates
4. Amount is deducted and paid to tax authority on your behalf

### Key Points

- **Automatic:** Your employer handles it
- **Estimated:** Based on monthly salary, not full-year position
- **Provisional:** May not reflect your actual annual tax liability

### Example

**Monthly Salary:** 40,000,000 VND
**Personal Deduction:** 11,000,000 VND

**Monthly Withholding Calculation:**
- Taxable income: 40,000,000 - 11,000,000 = 29,000,000 VND
- Tax: 5% on first 5M + 10% on next 5M + 15% on next 8M + 20% on remaining 11M
- **Monthly tax withheld:** ~3,700,000 VND

---

## What is PIT Finalization {#finalization}

PIT finalization is the **annual reconciliation** of your actual tax liability versus what was withheld throughout the year.

### Purpose

1. **True-up** your actual tax position
2. **Claim deductions** not reflected in monthly withholding
3. **Report all income** from all sources
4. **Settle** any difference (refund or payment)

### Filing Period

- **Standard deadline:** Within 90 days after year-end (by March 31)
- **Departure finalization:** Within 60 days of departure
- **Multi-employer:** Personal filing required

---

## When Finalization is Required {#when-required}

You **MUST** file PIT finalization if any of these apply:

### Mandatory Finalization Situations

| Situation | Why Finalization is Needed |
|-----------|---------------------------|
| **Multiple employers** during the year | Each employer calculates independently |
| **Changes in deductions** | Monthly withholding doesn't reflect changes |
| **Additional income sources** | Not captured in employer withholding |
| **Departure from Vietnam** | Required by law before/at departure |
| **Employer authorization** | Employer finalizes on your behalf |
| **Tax refund expected** | To claim overpaid tax |

### Detailed Scenarios

**1. Multiple Employers**
- You worked for Company A (Jan-Jun) and Company B (Jul-Dec)
- Each employer calculated tax independently
- Combined income may push you into higher bracket
- Personal deduction can only be claimed once

**2. Deduction Changes**
- You had a child during the year
- Started/ended dependant claims
- Your deduction eligibility changed

**3. Other Income**
- Income from overseas
- Investment income
- Rental income in Vietnam
- Freelance/consulting income

---

## When You Can Skip Finalization {#skip-finalization}

You **MAY NOT** need to file finalization if:

### Conditions Met (ALL must apply)

1. ✅ Single employer for entire year
2. ✅ No changes in deductions
3. ✅ No additional income sources
4. ✅ Employer authorized to finalize on your behalf
5. ✅ No tax refund expected

### Employer-Authorized Finalization

If you meet the conditions above, your employer can include you in their annual finalization filing.

**Requirements:**
- Sign authorization form to employer
- Confirm no other income sources
- Verify deduction information is correct

**Note:** Even if eligible, you may still want to file personally if:
- You suspect over-withholding
- You have deductions not accounted for
- You want more control over the process

---

## How They Work Together {#how-they-work}

### The Annual Cycle

\`\`\`
January ──────► December
   │              │
   │  Monthly     │  Annual
   │  Withholding │  Finalization
   │              │
   ▼              ▼
Provisional    Actual
Payments       Settlement
\`\`\`

### Example Scenario

**Your situation:**
- Monthly salary: 50,000,000 VND
- Worked Jan-Dec with one employer
- Had a baby in July (new dependant)

**Monthly withholding (Jan-Jun):**
- Taxable: 50,000,000 - 11,000,000 = 39,000,000 VND
- Monthly tax: ~5,850,000 VND
- Total withheld (6 months): 35,100,000 VND

**Monthly withholding (Jul-Dec):**
- New dependant deduction: +4,400,000 VND
- Taxable: 50,000,000 - 11,000,000 - 4,400,000 = 34,600,000 VND
- Monthly tax: ~4,780,000 VND
- Total withheld (6 months): 28,680,000 VND

**Annual total withheld:** 63,780,000 VND

**Finalization:**
- Annual income: 600,000,000 VND
- Annual personal deduction: 132,000,000 VND
- Annual dependant deduction (6 months): 26,400,000 VND
- Correct annual taxable: 441,600,000 VND
- Correct annual tax: ~57,840,000 VND

**Refund due:** 63,780,000 - 57,840,000 = **5,940,000 VND**

---

## Key Takeaways

1. **Withholding is provisional** – Monthly amounts are estimates
2. **Finalization is the true-up** – Reconciles actual position
3. **Multi-employer = Must file** – Personal finalization required
4. **Changes = File** – Deduction changes require finalization
5. **Don't miss refunds** – Many foreigners overpay without knowing

---

## Need Help?

Our team specializes in:
- Determining if you need to file
- Calculating your actual tax position
- Preparing and filing finalization returns
- Claiming refunds

**ZALO: +84703027485**

---

*This article is based on Circular 111/2013/TT-BTC. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 6,
    slug: 'double-taxation-agreements-claiming-treaty-benefits',
    title: 'Double Taxation Agreements: Claiming Treaty Benefits',
    excerpt: 'How to claim tax treaty benefits to avoid double taxation on your income. Includes step-by-step procedures for DTA applications.',
    category: 'Special Cases',
    readTime: '12 min read',
    featured: false,
    source: 'DTA between Vietnam and various countries',
    lastUpdated: '2024-09-20',
    tableOfContents: [
      { title: 'What are DTAs', anchor: 'what-are-dtas' },
      { title: 'Countries with DTAs', anchor: 'countries' },
      { title: 'Types of Treaty Benefits', anchor: 'benefit-types' },
      { title: 'Eligibility Requirements', anchor: 'eligibility' },
      { title: 'Application Process', anchor: 'process' },
      { title: 'Common Issues and Solutions', anchor: 'issues' },
    ],
    content: `
## What are DTAs {#what-are-dtas}

**Double Taxation Agreements (DTAs)** are bilateral treaties between Vietnam and other countries to prevent the same income from being taxed twice.

### Purpose

- Eliminate double taxation
- Allocate taxing rights between countries
- Provide certainty for taxpayers
- Promote cross-border economic activity

### Legal Framework

Vietnam's DTAs override domestic tax law when they provide more favorable treatment. This is enshrined in the PIT Law and Tax Administration Law.

---

## Countries with DTAs {#countries}

Vietnam has DTAs with **over 80 countries and territories**. Major partners include:

### Asia-Pacific

| Country | Status | Key Provisions |
|---------|--------|----------------|
| **Australia** | Active | 15% withholding on services |
| **China** | Active | Standard DTA terms |
| **India** | Active | Service fee provisions |
| **Indonesia** | Active | Standard DTA terms |
| **Japan** | Active | Technical service fees |
| **Malaysia** | Active | Standard DTA terms |
| **Singapore** | Active | 10% withholding cap |
| **South Korea** | Active | Social security agreement |
| **Thailand** | Active | Standard DTA terms |

### Europe

| Country | Status | Key Provisions |
|---------|--------|----------------|
| **Belgium** | Active | Favored for expats |
| **Czech Republic** | Active | Standard DTA terms |
| **Denmark** | Active | Standard DTA terms |
| **France** | Active | Teacher exemption possible |
| **Germany** | Active | Social security pending |
| **Italy** | Active | Standard DTA terms |
| **Netherlands** | Active | 10% withholding |
| **Poland** | Active | Standard DTA terms |
| **Russia** | Active | Standard DTA terms |
| **Spain** | Active | Standard DTA terms |
| **Sweden** | Active | Standard DTA terms |
| **Switzerland** | Active | Standard DTA terms |
| **United Kingdom** | Active | Standard DTA terms |

### Americas

| Country | Status | Key Provisions |
|---------|--------|----------------|
| **Canada** | Active | Standard DTA terms |
| **United States** | Active | Special provisions apply |

---

## Types of Treaty Benefits {#benefit-types}

### 1. Tax Exemptions

Some DTAs provide **complete exemption** for certain types of income:
- Teaching income (limited duration)
- Research grants
- Government service income

### 2. Reduced Withholding Rates

DTAs typically cap withholding tax on:
- Dividends: 5-15% (vs. 5% domestic)
- Interest: 5-10% (vs. 5% domestic)
- Royalties: 5-15% (vs. 10% domestic)
- Technical services: 5-15% (varies by DTA)

### 3. Tax Credits

When income is taxed in both countries:
- Credit for Vietnam tax paid in home country
- Credit for home country tax paid in Vietnam
- Prevents double taxation

### 4. Tie-Breaker Rules

When you're a resident of both countries:
- DTA determines which country has primary right
- Based on permanent home, center of interests, habitual abode, nationality

---

## Eligibility Requirements {#eligibility}

### Basic Requirements

To claim DTA benefits, you must:

1. **Be a tax resident** of the other DTA country
2. **Meet the specific conditions** of the DTA article you're claiming
3. **Provide documentation** to Vietnamese tax authority
4. **File timely application** before or with tax return

### Residency Requirement

You must be a **tax resident** of the treaty country for the relevant tax year. This typically means:
- Meeting that country's domestic residency test, OR
- Being deemed resident under the DTA tie-breaker rules

### Certificate of Coverage/Residency

Most DTAs require you to provide:
- **Tax Residency Certificate** from your home country's tax authority
- Issued for the specific tax year
- Must be original or certified copy
- May need translation/notarization

---

## Application Process {#process}

### Step 1: Obtain Tax Residency Certificate

**From your home country tax authority:**

| Country | Authority | Process Time |
|---------|-----------|--------------|
| USA | IRS | 2-4 weeks |
| UK | HMRC | 2-6 weeks |
| Australia | ATO | 2-3 weeks |
| Singapore | IRAS | 1-2 weeks |
| Japan | NTA | 2-4 weeks |
| South Korea | NTS | 2-3 weeks |

**Required Information:**
- Full legal name
- Tax identification number
- Period of residency
- Address in home country
- Purpose of certificate

### Step 2: Complete DTA Application Form

**Vietnam Form 01/DTA** requires:
- Personal information
- Income details
- Type of treaty benefit claimed
- Relevant DTA article
- Supporting documents list

### Step 3: Submit to Tax Authority

**Submission options:**
1. **In person** at local tax department
2. **Online** through tax portal (if registered)
3. **Via authorized representative**

**Required documents:**
- Form 01/DTA
- Tax Residency Certificate (original or certified copy)
- Labor contract
- Income statements
- Passport copy
- Work permit copy

### Step 4: Processing

**Timeline:** 30-45 business days

**Process:**
1. Tax authority reviews application
2. May request additional documents
3. Issues decision (approval or denial)
4. If approved, benefit applied to tax calculation

### Step 5: Receive Benefit

Once approved:
- Tax exemption or credit is applied
- Refund processed if applicable
- Future periods may have streamlined process

---

## Common Issues and Solutions {#issues}

### Issue 1: Certificate Not Available in Time

**Problem:** Tax Residency Certificate takes too long to obtain

**Solution:**
- Apply for certificate early (before year-end)
- Request expedited processing if available
- File extension request with tax return
- Provide certificate when available

### Issue 2: Vietnam Deems You Resident

**Problem:** Both countries claim you as resident

**Solution:**
- Apply DTA tie-breaker rules
- Document your permanent home location
- Show center of vital interests
- May need professional determination

### Issue 3: Wrong DTA Article Claimed

**Problem:** Applied under incorrect treaty provision

**Solution:**
- Review DTA text carefully
- Consult tax professional
- File amended application if needed
- Appeal if denied

### Issue 4: Documentation Issues

**Problem:** Documents rejected for form/content issues

**Solution:**
- Ensure proper translation and notarization
- Use certified translators
- Verify document authenticity
- Check specific DTA requirements

---

## Example: US Citizen Working in Vietnam

**Situation:**
- US citizen working in Vietnam
- Tax resident of Vietnam (183+ days)
- Still US tax resident (citizenship-based)

**US-Vietnam DTA Benefits:**

1. **Income Allocation:**
   - Employment income taxed where work performed
   - Vietnam has primary right to tax salary

2. **Foreign Earned Income Exclusion (US):**
   - US citizens can exclude ~$120,000 foreign earned income
   - Must meet physical presence or bona fide residence test

3. **Foreign Tax Credit (US):**
   - Credit for Vietnamese tax paid on same income
   - Prevents double taxation

**Process:**
1. File Vietnamese tax return as resident
2. Claim Vietnam-earned income on US return
3. Apply FEIE or FTC to eliminate US tax
4. No tax treaty claim needed in Vietnam (Vietnam has primary right)

---

## Need Help?

DTA claims are complex. Our team can:

- Determine which DTA provisions apply
- Obtain Tax Residency Certificates
- Prepare and file DTA applications
- Resolve disputes with tax authorities
- Optimize your cross-border tax position

**ZALO: +84703027485**

---

*This article provides general information about Double Taxation Agreements. For specific advice, please consult the relevant DTA text and a qualified tax professional. Official DTA texts are available at [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 7,
    slug: 'progressive-tax-brackets-explained',
    title: 'Progressive Tax Brackets: How Your Income is Taxed',
    excerpt: 'Detailed explanation of Vietnam\'s progressive tax brackets for residents, with examples and calculation methods.',
    category: 'Tax Rates & Brackets',
    readTime: '6 min read',
    featured: false,
    source: 'PIT Law (Consolidated) - Law No. 04/2012/QH13',
    lastUpdated: '2024-08-15',
    tableOfContents: [
      { title: 'Understanding Progressive Taxation', anchor: 'understanding' },
      { title: 'Current Tax Brackets', anchor: 'brackets' },
      { title: 'How to Calculate', anchor: 'calculate' },
      { title: 'Common Misconceptions', anchor: 'misconceptions' },
      { title: 'Effective Tax Rate', anchor: 'effective-rate' },
    ],
    content: `
## Understanding Progressive Taxation {#understanding}

Vietnam uses a **progressive tax system** for tax residents, meaning:
- Higher income portions are taxed at higher rates
- You don't pay the top rate on all your income
- Each bracket applies only to income within that range

This is different from a **flat tax** (like the 20% non-resident rate) where all income is taxed at one rate.

---

## Current Tax Brackets {#brackets}

### 2024/2025 Tax Brackets (Monthly)

| Bracket | Monthly Taxable Income (VND) | Tax Rate | Quick Calculation |
|---------|----------------------------|----------|-------------------|
| 1 | Up to 5,000,000 | 5% | Income × 5% |
| 2 | 5,000,001 – 10,000,000 | 10% | (Income - 5M) × 10% + 250,000 |
| 3 | 10,000,001 – 18,000,000 | 15% | (Income - 10M) × 15% + 750,000 |
| 4 | 18,000,001 – 32,000,000 | 20% | (Income - 18M) × 20% + 1,950,000 |
| 5 | 32,000,001 – 52,000,000 | 25% | (Income - 32M) × 25% + 4,750,000 |
| 6 | 52,000,001 – 80,000,000 | 30% | (Income - 52M) × 30% + 9,750,000 |
| 7 | Over 80,000,000 | 35% | (Income - 80M) × 35% + 18,150,000 |

### Annual Brackets (for Year-End Calculation)

| Bracket | Annual Taxable Income (VND) | Tax Rate |
|---------|----------------------------|----------|
| 1 | Up to 60,000,000 | 5% |
| 2 | 60,000,001 – 120,000,000 | 10% |
| 3 | 120,000,001 – 216,000,000 | 15% |
| 4 | 216,000,001 – 384,000,000 | 20% |
| 5 | 384,000,001 – 624,000,000 | 25% |
| 6 | 624,000,001 – 960,000,000 | 30% |
| 7 | Over 960,000,000 | 35% |

---

## How to Calculate {#calculate}

### Step-by-Step Method

1. **Determine taxable income** (gross salary minus deductions)
2. **Identify which brackets** your income falls into
3. **Calculate tax for each bracket**
4. **Sum the amounts** for total tax

### Example 1: Monthly Salary 25,000,000 VND

**After personal deduction:** 25,000,000 - 11,000,000 = 14,000,000 VND

| Bracket | Income in Bracket | Rate | Tax |
|---------|------------------|------|-----|
| 1 | 5,000,000 | 5% | 250,000 |
| 2 | 5,000,000 | 10% | 500,000 |
| 3 | 4,000,000 | 15% | 600,000 |
| **Total** | **14,000,000** | | **1,350,000** |

**Monthly tax:** 1,350,000 VND

### Example 2: Monthly Salary 70,000,000 VND

**After personal deduction:** 70,000,000 - 11,000,000 = 59,000,000 VND

| Bracket | Income in Bracket | Rate | Tax |
|---------|------------------|------|-----|
| 1 | 5,000,000 | 5% | 250,000 |
| 2 | 5,000,000 | 10% | 500,000 |
| 3 | 8,000,000 | 15% | 1,200,000 |
| 4 | 14,000,000 | 20% | 2,800,000 |
| 5 | 20,000,000 | 25% | 5,000,000 |
| 6 | 7,000,000 | 30% | 2,100,000 |
| **Total** | **59,000,000** | | **11,850,000** |

**Monthly tax:** 11,850,000 VND

---

## Common Misconceptions {#misconceptions}

### Myth 1: "If I earn more, I might net less"

**Truth:** This is impossible under a progressive system. Only income above the threshold is taxed at the higher rate.

**Example:**
- Earning 52M: Tax = 9,750,000, Net = 42,250,000
- Earning 52.1M: Tax = 9,775,000, Net = 42,325,000 ✅ Higher net

### Myth 2: "I should check my residency status"

**Truth:** You should, but it's often beneficial to be a resident.

For income under 80M VND/month, progressive rates often result in **lower tax** than the 20% non-resident flat rate.

### Myth 3: "Bonuses are taxed separately"

**Truth:** Bonuses are added to regular income for tax calculation. However, employers may use averaging methods for monthly withholding.

---

## Effective Tax Rate {#effective-rate}

Your **effective tax rate** is your total tax divided by total income (before deductions).

### Examples

| Monthly Gross | Monthly Tax | Effective Rate |
|--------------|-------------|----------------|
| 20,000,000 | 700,000 | 3.5% |
| 40,000,000 | 3,700,000 | 9.3% |
| 60,000,000 | 8,150,000 | 13.6% |
| 80,000,000 | 14,050,000 | 17.6% |
| 100,000,000 | 21,050,000 | 21.1% |

**Note:** Even high earners pay a lower effective rate than non-residents (20% flat) until income exceeds ~80M/month.

---

## Planning Tips

1. **Maximize deductions** – Every deduction reduces taxable income in your highest bracket
2. **Time income wisely** – If possible, spread bonuses across tax years
3. **Review residency status** – May be beneficial to qualify as resident
4. **Use our calculator** – Try our [PIT Calculator](/calculator) for accurate estimates

---

## Need Help?

Our team can help you:
- Calculate your exact tax liability
- Optimize your tax position
- File your annual finalization
- Plan for tax efficiency

**ZALO: +84703027485**

---

*This article is based on the PIT Law (Consolidated) - Law No. 04/2012/QH13. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 8,
    slug: 'non-resident-flat-tax-rate-guide',
    title: 'Non-Resident Tax: The 20% Flat Rate Explained',
    excerpt: 'Complete guide to taxation for non-residents in Vietnam, including what income is taxable and how the flat rate applies.',
    category: 'Tax Rates & Brackets',
    readTime: '5 min read',
    featured: false,
    source: 'Circular 111/2013/TT-BTC',
    lastUpdated: '2024-07-20',
    tableOfContents: [
      { title: 'Who is a Non-Resident', anchor: 'who-is-non-resident' },
      { title: 'The 20% Flat Rate', anchor: 'flat-rate' },
      { title: 'What Income is Taxable', anchor: 'taxable-income' },
      { title: 'No Deductions Available', anchor: 'no-deductions' },
      { title: 'Becoming a Resident', anchor: 'becoming-resident' },
    ],
    content: `
## Who is a Non-Resident {#who-is-non-resident}

You are a **non-resident** for Vietnamese tax purposes if you:

1. **Do not meet the 183-day rule** – Present in Vietnam for fewer than 183 days in a calendar year or 12-month period
2. **Do not have regular residence** – No permanent residence or rental of 183+ days

### Quick Test

| Question | Yes | No |
|----------|-----|-----|
| In Vietnam 183+ days this year? | → Resident | Continue |
| Have 183+ day rental or permanent residence? | → Resident | → **Non-Resident** |

---

## The 20% Flat Rate {#flat-rate}

Non-residents pay a **flat 20% tax** on Vietnam-source income.

### Key Characteristics

| Aspect | Treatment |
|--------|-----------|
| **Tax Rate** | 20% flat (no brackets) |
| **Taxable Income** | Vietnam-source only |
| **Deductions** | None available |
| **Worldwide Income** | Not taxed in Vietnam |

### Comparison: Resident vs Non-Resident

**Example:** 50,000,000 VND monthly salary

| Status | Calculation | Tax |
|--------|-------------|-----|
| **Non-Resident** | 50M × 20% | 10,000,000 |
| **Resident** | Progressive after 11M deduction | ~5,850,000 |
| **Difference** | | **4,150,000/month** |

**Annual difference:** ~50,000,000 VND

---

## What Income is Taxable {#taxable-income}

### Vietnam-Source Income (Taxable)

For non-residents, only **Vietnam-source income** is taxable:

| Income Type | Taxable? | Notes |
|-------------|----------|-------|
| Salary from Vietnam employer | ✅ Yes | Work performed in Vietnam |
| Vietnam rental income | ✅ Yes | Property located in Vietnam |
| Vietnam dividends | ✅ Yes | From Vietnamese companies |
| Vietnam interest | ✅ Yes | From Vietnamese banks |
| Vietnam business income | ✅ Yes | Business activities in Vietnam |

### Foreign-Source Income (Not Taxable)

| Income Type | Taxable? | Notes |
|-------------|----------|-------|
| Overseas salary | ❌ No | Work performed outside Vietnam |
| Foreign dividends | ❌ No | From foreign companies |
| Foreign rental | ❌ No | Property outside Vietnam |
| Overseas investments | ❌ No | Generally not taxed |

---

## No Deductions Available {#no-deductions}

### What You Cannot Claim

Unlike tax residents, non-residents **cannot claim**:

- ❌ Personal deduction (11M VND/month)
- ❌ Dependant deductions
- ❌ Charitable contribution deductions
- ❌ Insurance premium deductions
- ❌ Housing allowance deductions

### Impact on Tax

**Example:**
- Salary: 30,000,000 VND
- Non-resident tax: 30M × 20% = 6,000,000 VND
- Resident tax (after 11M deduction): ~2,200,000 VND
- **Extra cost of non-resident status:** 3,800,000 VND/month

---

## Becoming a Resident {#becoming-resident}

### Mid-Year Status Change

If you become a resident mid-year:

1. **Recalculation required**
2. All income from year start recalculated as resident income
3. Previous non-resident withholding credited
4. Deductions become available

### Potential Benefits

For many foreigners, becoming a resident **reduces tax**:

| Monthly Income | Non-Resident Tax | Resident Tax (after deduction) | Savings |
|---------------|------------------|------------------------------|---------|
| 20,000,000 | 4,000,000 | 700,000 | 3,300,000 |
| 40,000,000 | 8,000,000 | 3,700,000 | 4,300,000 |
| 60,000,000 | 12,000,000 | 8,150,000 | 3,850,000 |
| 80,000,000 | 16,000,000 | 14,050,000 | 1,950,000 |
| 100,000,000 | 20,000,000 | 21,050,000 | **-1,050,000** |

**Note:** For income above ~80M/month, non-resident status may actually be advantageous.

### Transition Steps

When transitioning from non-resident to resident:

1. Track your total days in Vietnam
2. Notify employer when you expect to cross 183 days
3. Update withholding method
4. File year-end finalization
5. Claim deductions for the full year

---

## Planning Strategies

### For Short-Term Visitors (< 183 days)

- Accept non-resident status
- Maximize foreign-source income
- Consider DTA benefits
- Track days carefully

### For Long-Term Workers (183+ days)

- Plan for resident status
- Register dependants early
- Track all deductions
- File annual finalization

---

## Need Help?

Our team can:
- Determine your residency status
- Calculate optimal tax position
- Assist with status transition
- File your returns

**ZALO: +84703027485**

---

*This article is based on Circular 111/2013/TT-BTC. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 9,
    slug: 'stock-options-equity-compensation-vietnam',
    title: 'Stock Options & Equity Compensation: Tax Treatment in Vietnam',
    excerpt: 'Complete guide to taxation of stock options, RSUs, and equity compensation for foreign employees working in Vietnam.',
    category: 'Income Types',
    readTime: '10 min read',
    featured: true,
    source: 'Circular 111/2013/TT-BTC & Official Letter 4555/TCT-CS',
    lastUpdated: '2024-12-10',
    tableOfContents: [
      { title: 'Types of Equity Compensation', anchor: 'types' },
      { title: 'When is Equity Income Taxed?', anchor: 'when-taxed' },
      { title: 'Tax Calculation Methods', anchor: 'calculation' },
      { title: 'RSU Taxation', anchor: 'rsu' },
      { title: 'Stock Options Taxation', anchor: 'stock-options' },
      { title: 'Reporting Requirements', anchor: 'reporting' },
    ],
    content: `
## Types of Equity Compensation {#types}

Foreign employees in Vietnam often receive equity compensation. Understanding the tax treatment is crucial:

### Common Types

| Type | Description | Tax Point |
|------|-------------|-----------|
| **Stock Options** | Right to buy shares at fixed price | Exercise date |
| **RSUs** | Restricted Stock Units - free shares | Vesting date |
| **Performance Shares** | Shares based on performance goals | Vesting date |
| **ESPP** | Employee Stock Purchase Plans | Purchase date |
| **Phantom Stock** | Cash bonus tied to stock price | Payment date |

---

## When is Equity Income Taxed? {#when-taxed}

### For Tax Residents

Equity income is taxable in Vietnam when:
- The **vesting condition is met** (for RSUs, performance shares)
- The **option is exercised** (for stock options)
- The **purchase is made** (for ESPP)

### Income Allocation

Vietnam taxes the portion of equity income related to work performed in Vietnam:

**Formula:**
> Vietnam-taxable portion = Total equity income × (Days working in Vietnam ÷ Total days in vesting period)

### Example

You receive 1,000 RSUs that vest after 3 years:
- Total vesting period: 1,095 days
- Days working in Vietnam: 700 days
- Fair market value at vesting: $50/share

**Calculation:**
- Total income: 1,000 × $50 = $50,000
- Vietnam portion: $50,000 × (700/1,095) = $31,963
- Taxable in Vietnam: **$31,963**

---

## Tax Calculation Methods {#calculation}

### Method 1: Average Tax Rate

For residents, equity income can be added to regular employment income and taxed at your average rate:

1. Add equity income to annual employment income
2. Calculate total tax using progressive brackets
3. Divide by total income to get average rate
4. Apply average rate to equity income

### Method 2: Separate Taxation

Equity income may be taxed separately at progressive rates (5-35%) on the taxable amount.

### Which Method Applies?

The method depends on:
- Type of equity compensation
- Your employer's arrangements
- Tax authority guidance

**Note:** Consult with a tax professional to determine the optimal method for your situation.

---

## RSU Taxation {#rsu}

### Tax Point

RSUs are taxed when they **vest** (become unconditional).

### Taxable Amount

**Taxable Income = Number of RSUs × Fair Market Value at Vesting**

### Example

**Scenario:**
- 500 RSUs vest on June 30, 2024
- FMV at vesting: $45/share
- You worked in Vietnam for 200 of 365 days in vesting year

**Calculation:**
- Gross income: 500 × $45 = $22,500
- Vietnam allocation: $22,500 × (200/365) = $12,329
- Convert to VND at official rate
- Apply progressive tax rates

### Withholding

Employers may be required to withhold tax on RSU income. If not:
- You must declare in annual finalization
- May need to make provisional payments

---

## Stock Options Taxation {#stock-options}

### Tax Point

Stock options are taxed when **exercised**, not when granted or vested.

### Taxable Amount

**Taxable Income = (FMV at Exercise - Exercise Price) × Number of Options**

### Example

**Scenario:**
- Granted option to buy 1,000 shares at $20
- Exercise price: $20/share
- FMV at exercise: $35/share
- Vietnam work days: 180 of 365 in exercise year

**Calculation:**
- Gain per share: $35 - $20 = $15
- Total gain: 1,000 × $15 = $15,000
- Vietnam portion: $15,000 × (180/365) = $7,397
- Tax at progressive rates on $7,397

### Qualifying vs Non-Qualifying Options

| Type | Tax Treatment |
|------|--------------|
| **Non-Qualified Stock Options (NQSO)** | Full gain taxed as ordinary income |
| **Incentive Stock Options (ISO)** | May receive different treatment (rare for Vietnam) |

---

## Reporting Requirements {#reporting}

### Annual Finalization

Equity income must be reported in your annual PIT finalization:

1. **Gather documents:**
   - Grant agreements
   - Exercise/vesting statements
   - Brokerage statements
   - FMV documentation

2. **Calculate Vietnam-taxable portion:**
   - Track days in Vietnam
   - Apply allocation formula
   - Convert to VND

3. **Include in Form 02/CK-TNCN:**
   - Report as "other income"
   - Attach supporting documentation

### Currency Conversion

Use the official exchange rate announced by the State Bank of Vietnam on the date income is recognized.

### Deadlines

- **Annual finalization:** By March 31 of following year
- **Departure:** Before leaving Vietnam

---

## Common Issues

### Issue 1: No Withholding by Employer

Many foreign employers don't withhold Vietnam tax on equity income.

**Solution:**
- Track your equity income
- Make voluntary provisional payments
- Include in annual finalization

### Issue 2: Missing Documentation

FMV documentation may be difficult to obtain.

**Solution:**
- Request statements from broker/employer
- Use official closing prices for public companies
- Keep all grant/exercise notices

### Issue 3: Currency Conversion

Determining correct exchange rate.

**Solution:**
- Use State Bank of Vietnam rates
- Document rate used
- Apply rate on recognition date

---

## DTA Considerations

If your home country also taxes equity income:

1. **Check your DTA** for income from employment articles
2. **Allocate income** between countries based on work days
3. **Claim foreign tax credit** in home country
4. **Obtain Tax Residency Certificate** if needed

---

## Need Help?

Equity compensation taxation is complex. Our team can:

- Calculate your Vietnam-taxable equity income
- Determine optimal allocation methods
- Prepare and file your returns
- Coordinate with DTA claims

**ZALO: +84703027485**

---

*This article is based on Circular 111/2013/TT-BTC and Official Letter 4555/TCT-CS. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 10,
    slug: 'housing-allowance-benefits-tax-treatment',
    title: 'Housing Allowance & Benefits-in-Kind: Tax Treatment Guide',
    excerpt: 'How housing allowances, car benefits, education allowances, and other benefits-in-kind are taxed for foreign employees in Vietnam.',
    category: 'Income Types',
    readTime: '8 min read',
    featured: true,
    source: 'Circular 111/2013/TT-BTC',
    lastUpdated: '2024-11-25',
    tableOfContents: [
      { title: 'What are Benefits-in-Kind?', anchor: 'what-are-bik' },
      { title: 'Housing Allowance', anchor: 'housing' },
      { title: 'Vehicle & Driver Benefits', anchor: 'vehicle' },
      { title: 'Education Allowance', anchor: 'education' },
      { title: 'Other Common Benefits', anchor: 'other-benefits' },
      { title: 'Tax Reporting', anchor: 'reporting' },
    ],
    content: `
## What are Benefits-in-Kind? {#what-are-bik}

**Benefits-in-kind (BIK)** are non-cash benefits provided by employers to employees. In Vietnam, most benefits-in-kind are taxable as employment income.

### General Rule

> **All benefits received in connection with employment are taxable**, unless specifically exempted.

### Types of Taxable Benefits

| Benefit | Tax Treatment |
|---------|--------------|
| Housing/rent | Taxable (with caps) |
| Vehicle + driver | Taxable |
| Education allowance | Taxable |
| Home leave flights | Taxable |
| Relocation allowance | Taxable |
| Cost of living allowance | Taxable |
| Club memberships | Taxable |

---

## Housing Allowance {#housing}

### Tax Treatment

Housing benefits provided by employers are taxable, but with **favorable calculation rules**.

### Calculation Methods

**Method 1: Actual Rent Paid (with cap)**

If employer pays rent directly:
- Taxable amount: **Actual rent × 15%** (capped)
- Maximum taxable: 15% of total taxable income before housing deduction

**Method 2: Housing Allowance**

If employer provides fixed housing allowance:
- Full allowance is taxable as salary
- No 15% calculation applies

### Example Calculation

**Scenario:**
- Monthly salary: 50,000,000 VND
- Monthly rent paid by employer: 20,000,000 VND

**Calculation:**
- 15% of salary: 50,000,000 × 15% = 7,500,000 VND
- Taxable housing benefit: **7,500,000 VND** (not 20,000,000)

**Total taxable income:** 50,000,000 + 7,500,000 = 57,500,000 VND

### Requirements

To claim the 15% calculation:
- Must have actual lease agreement
- Rent must be paid to landlord (not to employee)
- Documentation must be maintained

### Company-Provided Housing

If company owns the housing:
- Fair market rental value is taxable
- Apply 15% calculation

---

## Vehicle & Driver Benefits {#vehicle}

### Tax Treatment

Company car and driver benefits are taxable.

### Calculation

**Taxable Value = Total Expenses × Percentage for Personal Use**

| Type | Calculation |
|------|-------------|
| **Car only** | Depreciation + operating costs × personal use % |
| **Driver** | Driver salary × personal use % |
| **Fuel** | Actual fuel cost × personal use % |

### Safe Harbor Method

Some companies use a fixed percentage:
- **25-50%** of vehicle costs deemed personal use
- Must be reasonable and documented
- Acceptable to tax authority if consistent

### Example

**Scenario:**
- Car depreciation: 10,000,000 VND/month
- Operating costs: 5,000,000 VND/month
- Driver salary: 8,000,000 VND/month
- Personal use: 30%

**Taxable benefit:**
- (10M + 5M + 8M) × 30% = **6,900,000 VND/month**

### Fuel-Only Benefit

If only fuel is provided:
- Taxable at fair value of fuel for personal use
- Track business vs personal kilometers

---

## Education Allowance {#education}

### Tax Treatment

Education allowances for employee's children are **fully taxable**.

### No Exemption

Unlike some countries, Vietnam does not exempt education allowances:
- International school fees paid by employer: **Fully taxable**
- Education allowance paid to employee: **Fully taxable**

### Example

**Scenario:**
- Monthly salary: 80,000,000 VND
- School fees paid by employer: 25,000,000 VND/month

**Taxable income:** 80M + 25M = **105,000,000 VND**

### Planning Consideration

Some employers provide **"grossed-up"** compensation to offset the tax on education benefits:
- Calculate tax on total compensation
- Employer pays the additional tax
- Employee receives net benefit

---

## Other Common Benefits {#other-benefits}

### Home Leave Flights

| Treatment | Taxable Amount |
|-----------|---------------|
| Annual home leave flights | Fair market value |
| Flight class | Economy/Business/First |
| Family member flights | Also taxable |

**Example:** 2 return flights to home country × ticket value = taxable amount

### Relocation Allowance

| Treatment | Taxable Amount |
|-----------|---------------|
| Moving expenses | Generally taxable |
| Temporary housing | Taxable |
| Shipping goods | Taxable |

**Exception:** Some bona fide relocation costs may be non-taxable if properly structured

### Cost of Living Allowance (COLA)

| Treatment | Taxable Amount |
|-----------|---------------|
| Fixed COLA | Fully taxable as salary |
| Variable COLA | Fully taxable |

### Club Memberships

| Type | Tax Treatment |
|------|--------------|
| Golf club | Fully taxable |
| Gym/Fitness | Fully taxable |
| Social clubs | Fully taxable |

### Medical Insurance

| Type | Tax Treatment |
|------|--------------|
| Mandatory health insurance | Not taxable (part of SI) |
| Private medical insurance | Taxable benefit |
| Medical reimbursement | Taxable |

### Telephone & Internet

| Type | Tax Treatment |
|------|--------------|
| Business phone | May be exempt with documentation |
| Personal phone allowance | Taxable |
| Internet allowance | Taxable |

---

## Tax Reporting {#reporting}

### Monthly Withholding

Employers must include benefits-in-kind in monthly PIT withholding:

1. Calculate value of benefits
2. Add to cash salary
3. Apply deductions
4. Calculate and withhold tax

### Annual Finalization

Verify benefits treatment in annual return:

1. Review all benefits received
2. Confirm taxable values
3. Check calculation methods
4. Adjust if necessary

### Documentation

Maintain records of:
- Lease agreements
- Vehicle usage logs
- Benefit payment records
- Fair market value determinations

---

## Comparison Table

| Benefit | Taxable? | Calculation |
|---------|----------|-------------|
| Housing (rent paid) | Yes | Actual rent × 15% (capped) |
| Housing allowance | Yes | Full amount |
| Company car | Yes | Costs × personal use % |
| Driver | Yes | Salary × personal use % |
| Education allowance | Yes | Full amount |
| Home leave flights | Yes | Ticket value |
| Relocation allowance | Yes | Full amount |
| COLA | Yes | Full amount |
| Club memberships | Yes | Full amount |
| Private health insurance | Yes | Premium amount |
| Meal allowance | Yes | Full amount (unless in-kind meals) |

---

## Need Help?

Our team can:
- Calculate taxable value of your benefits
- Ensure proper reporting on tax returns
- Optimize benefit structures with employer
- Handle benefit-related tax disputes

**ZALO: +84703027485**

---

*This article is based on Circular 111/2013/TT-BTC. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 11,
    slug: 'tax-penalties-audit-guide-vietnam',
    title: 'Tax Penalties & Audit Guide: What Foreigners Need to Know',
    excerpt: 'Complete guide to tax penalties, audit triggers, dispute resolution, and how to handle tax authority inquiries in Vietnam.',
    category: 'Compliance',
    readTime: '12 min read',
    featured: true,
    source: 'Tax Administration Law & Decree 125/2020/ND-CP',
    lastUpdated: '2024-12-05',
    tableOfContents: [
      { title: 'Types of Penalties', anchor: 'penalty-types' },
      { title: 'Late Filing Penalties', anchor: 'late-filing' },
      { title: 'Late Payment Interest', anchor: 'late-interest' },
      { title: 'Understatement Penalties', anchor: 'understatement' },
      { title: 'Tax Audit Triggers', anchor: 'audit-triggers' },
      { title: 'Audit Process', anchor: 'audit-process' },
      { title: 'Dispute Resolution', anchor: 'dispute' },
    ],
    content: `
## Types of Penalties {#penalty-types}

Vietnam imposes several types of penalties for tax non-compliance:

### Penalty Categories

| Category | Type | Range |
|----------|------|-------|
| **Administrative** | Late filing | 500K - 150M VND |
| **Administrative** | Late payment | 0.03%/day interest |
| **Administrative** | Understatement | 1-3x tax owed |
| **Criminal** | Tax evasion | Fines + imprisonment |

### Who Can Be Penalized

- **Individuals** - Foreign employees with Vietnam tax obligations
- **Employers** - For withholding failures
- **Tax representatives** - For filing errors

---

## Late Filing Penalties {#late-filing}

### Penalty Amounts

| Violation | Penalty Range |
|-----------|--------------|
| Late filing (individual) | 500,000 - 1,500,000 VND |
| Late filing (business) | 5,000,000 - 15,000,000 VND |
| Failure to file | Higher penalties apply |

### How Penalties Are Calculated

The exact penalty depends on:
1. **Duration of delay** - Longer = higher penalty
2. **Nature of violation** - First-time vs repeat
3. **Cooperation level** - Voluntary disclosure helps
4. **Amount involved** - Larger amounts = higher penalties

### Mitigating Factors

Penalties may be reduced if:
- First-time violation
- Voluntary disclosure before audit
- Cooperation with authorities
- Reasonable cause documented

---

## Late Payment Interest {#late-interest}

### Interest Rate

**0.03% per day** (approximately 10.95% per year) on unpaid tax.

### Calculation

**Interest = Tax Due × 0.03% × Number of Days Late**

### Example

**Scenario:**
- Tax due: 20,000,000 VND
- Days late: 60 days

**Interest:** 20,000,000 × 0.03% × 60 = **360,000 VND**

### When Interest Starts

Interest accrues from:
- The original due date (for taxes not paid)
- The date of assessment (for additional taxes)

### Interest vs Penalty

| Type | Nature | Deductible? |
|------|--------|-------------|
| Late payment interest | Compensatory | No |
| Administrative penalty | Punitive | No |

---

## Understatement Penalties {#understatement}

### Penalty Rates

| Behavior | Penalty Rate |
|----------|-------------|
| **Honest mistake** | 1x the tax understated |
| **Negligence** | 1.5x the tax understated |
| **Intentional** | 2-3x the tax understated |

### Determination Factors

| Factor | Lighter Penalty | Heavier Penalty |
|--------|----------------|-----------------|
| Intent | Unintentional | Deliberate |
| Disclosure | Voluntary | Caught in audit |
| Cooperation | Full cooperation | Obstruction |
| History | First offense | Repeat offender |
| Amount | Small | Large |

### Example

**Scenario:**
- Tax correctly due: 50,000,000 VND
- Tax reported: 30,000,000 VND
- Understatement: 20,000,000 VND

**Penalty (if negligent):** 20,000,000 × 1.5 = **30,000,000 VND**

**Total payable:**
- Tax due: 20,000,000 VND
- Penalty: 30,000,000 VND
- Interest: varies by duration
- **Total: 50,000,000+ VND**

---

## Tax Audit Triggers {#audit-triggers}

### Common Audit Triggers

| Trigger | Risk Level |
|---------|-----------|
| High-income earner | Medium |
| Multiple employers | High |
| DTA claims | Medium-High |
| Large refund claims | High |
| Inconsistent filings | High |
| Employer audit | High |
| Random selection | Low |
| Third-party reports | Medium |

### Red Flags for Foreigners

1. **Discrepancy between reported income and lifestyle**
2. **Large foreign income claims**
3. **Aggressive DTA positions**
4. **Missing filing history**
5. **Complex multi-employer situations**
6. **Stock option income not reported**
7. **Benefits-in-kind not declared**

### How Audits Start

| Method | Description |
|--------|-------------|
| **Random selection** | Computerized risk-based selection |
| **Referral** | From other agencies or employers |
| **Information matching** | Discrepancy in reported data |
| **Complaint** | Third-party report |
| **Employer audit** | Extended to employees |

---

## Audit Process {#audit-process}

### Timeline

| Stage | Duration |
|-------|----------|
| **Notification** | 3 days before |
| **Field audit** | Up to 30 days (extendable) |
| **Assessment** | Within 10 days |
| **Appeal deadline** | 90 days from assessment |

### What to Expect

**Stage 1: Notification**
- Written notice of audit
- List of documents requested
- Proposed audit dates

**Stage 2: Document Review**
- Tax authorities review records
- May request additional documents
- May interview taxpayer

**Stage 3: Findings**
- Preliminary findings presented
- Opportunity to explain
- Final assessment issued

**Stage 4: Resolution**
- Pay assessed amounts
- Or file appeal
- Negotiate if appropriate

### Your Rights During Audit

1. **Right to representation** - Tax agent or lawyer
2. **Right to explanation** - Understand findings
3. **Right to appeal** - Contest decisions
4. **Right to confidentiality** - Information protected

### What Documents Are Requested

| Document Type | Purpose |
|--------------|---------|
| Labor contracts | Verify income |
| Salary statements | Verify withholding |
| Bank statements | Verify receipts |
| Travel records | Verify residency |
| Dependant documents | Verify deductions |
| Foreign tax returns | Cross-reference |

---

## Dispute Resolution {#dispute}

### Options

| Option | Timeline | Cost |
|--------|----------|------|
| **Administrative appeal** | 90 days | Low |
| **Lawsuit** | 1-2 years | High |
| **Negotiation** | Any time | Variable |

### Administrative Appeal Process

1. **File appeal** with tax authority (within 90 days)
2. **First-level review** by issuing authority
3. **Second-level appeal** to higher authority if rejected
4. **Final decision** within 60 days

### When to Appeal

Consider appealing if:
- Clear error in calculation
- Misinterpretation of law
- New evidence available
- Procedural errors occurred

### When to Negotiate

Consider negotiating if:
- Facts are disputed
- Interpretation is gray area
- Penalty reduction possible
- Payment plan needed

### Statute of Limitations

| Situation | Time Limit |
|-----------|-----------|
| Standard assessment | 10 years |
| Tax evasion | No limit |
| Refund claims | 3 years |

---

## Voluntary Disclosure

### Benefits

Coming forward before an audit can:
- Reduce or eliminate penalties
- Show good faith
- Resolve issues faster

### Process

1. Identify all unreported income/errors
2. Prepare corrected returns
3. Submit with explanation letter
4. Pay tax due + interest
5. Request penalty reduction

---

## Prevention Checklist

- [ ] File returns on time (March 31)
- [ ] Report all income sources
- [ ] Keep good records
- [ ] Document residency days
- [ ] Keep employment contracts
- [ ] Save all tax-related documents for 10 years
- [ ] Respond promptly to tax authority queries
- [ ] Get professional help for complex situations

---

## Need Help?

Our team can:
- Represent you in tax audits
- File appeals and disputes
- Negotiate with tax authorities
- Handle voluntary disclosures
- Reduce penalties where possible

**ZALO: +84703027485**

---

*This article is based on Tax Administration Law and Decree 125/2020/ND-CP. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 12,
    slug: 'new-arrival-tax-registration-guide',
    title: 'New Arrival Guide: Tax Registration for Foreign Employees',
    excerpt: 'Step-by-step guide for foreigners starting work in Vietnam - tax registration, TIN application, and first filing requirements.',
    category: 'Practical Guides',
    readTime: '8 min read',
    featured: true,
    source: 'Circular 105/2020/TT-BTC',
    lastUpdated: '2024-12-01',
    tableOfContents: [
      { title: 'Before You Arrive', anchor: 'before-arrival' },
      { title: 'Tax Registration Process', anchor: 'registration' },
      { title: 'Getting Your TIN', anchor: 'tin' },
      { title: 'First Month Requirements', anchor: 'first-month' },
      { title: 'Documents to Prepare', anchor: 'documents' },
      { title: 'Common Mistakes', anchor: 'mistakes' },
    ],
    content: `
## Before You Arrive {#before-arrival}

### Checklist

Before arriving in Vietnam, prepare these documents:

| Document | Required For |
|----------|-------------|
| Passport (valid 6+ months) | Visa, work permit |
| Work contract | Work permit, tax |
| University degree | Work permit |
| Criminal record check | Work permit |
| Health certificate | Work permit |
| Previous tax returns | DTA claims |

### Key Dates to Track

From day one in Vietnam, track:
- **Entry/exit dates** - For residency calculation
- **Accommodation details** - For regular residence test
- **Employment start date** - For tax obligations

### Residency Planning

Consider your expected stay:
- **< 183 days** - Likely non-resident
- **183+ days** - Will become resident
- **Multi-year** - Plan for resident status

---

## Tax Registration Process {#registration}

### Who Must Register

| Status | Registration Required |
|--------|----------------------|
| Tax resident | Yes |
| Non-resident with Vietnam income | Employer handles |
| Multiple income sources | Yes |

### Registration Methods

**Option 1: Through Employer**
- Most common for employees
- Employer registers on your behalf
- Provides TIN for withholding

**Option 2: Direct Registration**
- For self-registration cases
- At local tax department
- Using Form 01-MST

### Timeline

| Event | Deadline |
|-------|----------|
| Start working | Register within 10 days |
| TIN issuance | 3-5 working days |
| Provide TIN to employer | Immediately upon receipt |

---

## Getting Your TIN {#tin}

### What is a TIN?

**Tax Identification Number (Mã số thuế)** is your unique identifier for all Vietnam tax matters.

### TIN Format

For individuals: **10 digits**
- Format: XXXXXXXXXX
- Never changes, even if you leave and return

### How to Obtain

**Through Employer:**
1. Employer submits Form 01-MST
2. Tax authority processes (3-5 days)
3. Employer receives your TIN
4. Employer provides TIN to you

**Direct Application:**
1. Go to local tax department
2. Submit Form 01-MST with passport
3. Receive TIN same day or within 3 days

### Online Registration

Vietnam's e-tax system allows online registration:
1. Register at thuedientu.gdt.gov.vn
2. Create account with passport details
3. Submit online application
4. Receive TIN electronically

### What You'll Need

| Document | Purpose |
|----------|---------|
| Passport | Identity verification |
| Visa | Immigration status |
| Work permit | Employment authorization |
| Labor contract | Income source |
| Address in Vietnam | Contact details |

---

## First Month Requirements {#first-month}

### Week 1: Setup

- [ ] Obtain work permit (if required)
- [ ] Register with local police (temporary residence)
- [ ] Open bank account
- [ ] Submit TIN registration

### Week 2-4: Employment

- [ ] Submit bank account details to employer
- [ ] Provide TIN to payroll
- [ ] Register dependants (if applicable)
- [ ] Review first payslip for correct withholding

### First Tax Filing

Your first filing depends on when you arrived:

| Arrival Month | First Filing |
|--------------|--------------|
| January-March | Same year finalization |
| April-December | Next year by March 31 |
| Departure before year-end | Before leaving |

---

## Documents to Prepare {#documents}

### For Tax Registration

| Document | Original/Copy | Notes |
|----------|--------------|-------|
| Passport | Copy | Notarized translation |
| Visa | Copy | Valid visa |
| Work permit | Copy | If applicable |
| Labor contract | Copy | All pages |
| Temporary residence | Copy | Police registration |

### For Dependents (if claiming)

| Dependent | Documents Needed |
|-----------|-----------------|
| Children | Birth certificate, school enrollment |
| Spouse | Marriage certificate, income proof |
| Parents | Birth certificate (yours), income proof |

### Translation Requirements

| Document Origin | Translation Needed? |
|----------------|---------------------|
| Vietnam | No |
| Foreign country | Yes, notarized |
| Consularized documents | No additional translation |

### Notarization

For foreign documents:
1. Translate to Vietnamese
2. Notarize translation in Vietnam
3. Some documents need consularization from origin country

---

## Common Mistakes {#mistakes}

### Mistake 1: Not Registering

**Problem:** Assuming employer handles everything
**Consequence:** Delays, penalties, incorrect withholding
**Solution:** Confirm registration with employer within first month

### Mistake 2: Wrong Residency Status

**Problem:** Treated as non-resident when resident
**Consequence:** Higher tax (20% flat), no deductions
**Solution:** Monitor days and notify employer when crossing 183

### Mistake 3: Missing Dependant Registration

**Problem:** Not registering dependants
**Consequence:** Lose valuable deductions
**Solution:** Register dependants immediately upon arrival

### Mistake 4: Not Keeping Records

**Problem:** No documentation for future reference
**Consequence:** Difficult to prove residency, deductions
**Solution:** Keep all documents organized from day one

### Mistake 5: Wrong Tax Withholding

**Problem:** Employer using wrong rates or deductions
**Consequence:** Under/over withholding
**Solution:** Review first payslip carefully, raise issues immediately

---

## Timeline Summary

| Day | Action |
|-----|--------|
| 1 | Arrive in Vietnam, start tracking days |
| 1-7 | Register with local police |
| 1-14 | Submit TIN registration (through employer or direct) |
| 7-21 | Receive TIN |
| 14-30 | Register dependants |
| 30 | Review first month's withholding |
| 183 | Reassess residency status |
| Ongoing | Track all documents and dates |

---

## Need Help?

Our team can:
- Handle your tax registration
- Obtain your TIN quickly
- Register your dependants
- Ensure correct withholding from day one
- File your returns throughout your stay

**ZALO: +84703027485**

---

*This article is based on Circular 105/2020/TT-BTC. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 13,
    slug: 'health-insurance-claims-guide-foreigners',
    title: 'Health Insurance Claims: A Practical Guide for Foreign Employees',
    excerpt: 'How to use your mandatory health insurance in Vietnam - registration, finding providers, making claims, and getting reimbursed.',
    category: 'Insurance',
    readTime: '9 min read',
    featured: false,
    source: 'Law on Health Insurance & Circular 46/2018/TT-BYT',
    lastUpdated: '2024-11-15',
    tableOfContents: [
      { title: 'Health Insurance Card', anchor: 'card' },
      { title: 'Covered Services', anchor: 'coverage' },
      { title: 'Finding Providers', anchor: 'providers' },
      { title: 'Making a Claim', anchor: 'claims' },
      { title: 'Reimbursement Process', anchor: 'reimbursement' },
      { title: 'Common Issues', anchor: 'issues' },
    ],
    content: `
## Health Insurance Card {#card}

### What You'll Receive

After registering for health insurance, you'll receive:

| Item | Description |
|------|-------------|
| **Health Insurance Card** | Physical card with your details |
| **Card Number** | Your unique HI identifier |
| **Validity Period** | Usually matches your work permit |

### Getting Your Card

**Timeline:** 2-4 weeks after registration

**Process:**
1. Employer submits HI registration
2. Social insurance agency processes
3. Card mailed to employer
4. Employer provides card to you

### Card Information

Your card shows:
- Full name
- Date of birth
- Card number
- Valid from/to dates
- Initial healthcare facility

---

## Covered Services {#coverage}

### Coverage Levels

| Level | Benefit Rate | Facilities |
|-------|-------------|------------|
| **Level 1** | 100% | Central hospitals, specialized hospitals |
| **Level 2** | 100% | Provincial/general hospitals |
| **Level 3** | 100% | District hospitals |
| **Level 4** | 80-100% | Commune health stations |

### What's Covered

| Service | Coverage |
|---------|----------|
| Outpatient consultations | ✅ Yes |
| Inpatient treatment | ✅ Yes |
| Surgery | ✅ Yes |
| Maternity care | ✅ Yes |
| Emergency treatment | ✅ Yes |
| Prescription medicines | ✅ Yes (on list) |
| Medical tests | ✅ Yes |
| Rehabilitation | ✅ Yes (limited) |

### What's NOT Covered

| Service | Notes |
|---------|-------|
| Cosmetic surgery | Not covered |
| Dental (non-medical) | Not covered |
| Glasses/contacts | Not covered |
| Nutritional supplements | Not covered |
| Services at non-contracted facilities | Lower reimbursement |
| Private hospitals | Generally not covered |
| Medical evacuation | Not covered |

### Medicine Coverage

Only medicines on the **Health Insurance Drug List** are covered:
- Generic drugs: Covered
- Brand name drugs: Limited coverage
- Imported drugs: May require approval

---

## Finding Providers {#providers}

### Initial Registration Facility

You must register at a primary healthcare facility:

**Options:**
- District hospital near your residence
- Polyclinic in your area
- Some international clinics (limited)

### Changing Your Facility

You can change your registered facility:
- Once per year (automatic right)
- More often with valid reason
- Submit request through employer

### Hospital Levels

| Level | Examples | Wait Time | English Support |
|-------|----------|-----------|-----------------|
| **Central** | Cho Ray, Bach Mai | Long | Some |
| **Provincial** | District hospitals | Medium | Limited |
| **Private** | Family Medical, FMP | Short | Good |

### Recommended Facilities for Foreigners

**Ho Chi Minh City:**
- Family Medical Practice
- International SOS
- Columbia Asia (limited HI)
- FV Hospital (partial coverage)

**Hanoi:**
- Family Medical Practice
- International SOS
- Vinmec (partial coverage)

**Note:** Private facilities may have limited HI coverage. Check before visiting.

---

## Making a Claim {#claims}

### At Registered Facility

**Process:**
1. Present your health insurance card
2. Show passport/ID
3. Receive treatment
4. Pay only non-covered portion

**Tip:** Bring your card to every visit.

### At Non-Registered Facility

**Emergency Care:**
- Go to nearest facility
- Show HI card
- Get treatment
- May need to pay first, claim later

**Non-Emergency Care:**
- Lower coverage (80% vs 100%)
- May need referral
- Pre-approval may be required

### Required Documents

| Document | Purpose |
|----------|---------|
| HI card | Proof of coverage |
| Passport | ID verification |
| Referral letter | If seeing specialist |
| Previous records | Continuity of care |

---

## Reimbursement Process {#reimbursement}

### When You Need Reimbursement

- Treated at non-contracted facility
- Emergency without HI card
- HI system down
- Advance payment required

### Documents Required

| Document | Notes |
|----------|-------|
| Original receipts | Keep all |
| Medical records | Diagnosis, treatment |
| Prescription copies | If applicable |
| Bank account info | For refund |
| Claim form | From Social Insurance |

### Submission Process

1. **Gather documents** - Within 180 days of treatment
2. **Complete claim form** - Available at Social Insurance office
3. **Submit** - Through employer or directly
4. **Wait for processing** - 15-30 days
5. **Receive refund** - To bank account

### Reimbursement Rates

| Situation | Rate |
|-----------|------|
| Emergency at wrong facility | 80-100% |
| Non-emergency without referral | 0-80% |
| With referral, right facility | 100% |
| Private hospital | 0% (usually) |

---

## Common Issues {#issues}

### Issue 1: Card Not Ready

**Problem:** Need medical care before card arrives

**Solution:**
- Use private care initially
- Keep all receipts
- Claim reimbursement after card issued
- Card is valid from registration date, not issue date

### Issue 2: Language Barrier

**Problem:** Staff don't speak English

**Solution:**
- Bring Vietnamese colleague/friend
- Use translation apps
- Choose facilities with English support
- Consider private care for complex issues

### Issue 3: Long Wait Times

**Problem:** Public hospitals have long queues

**Solution:**
- Go early morning
- Make appointment if possible
- Use private care for non-covered items
- Be patient - system is improving

### Issue 4: Medicine Not Covered

**Problem:** Doctor prescribes non-listed medicine

**Solution:**
- Ask for generic alternative
- Check if similar drug on list
- May need to pay out-of-pocket
- Some medicines require special approval

### Issue 5: Wrong Facility

**Problem:** Went to non-registered facility

**Solution:**
- Get referral if possible
- Keep all documents
- Submit reimbursement claim
- Expect lower coverage rate

---

## Private Health Insurance

### Should You Get Additional Coverage?

Many foreigners supplement mandatory HI with private insurance:

| Factor | Mandatory HI | Private HI |
|--------|-------------|------------|
| Cost | 1.5% of salary | $1,000-5,000/year |
| Facilities | Public hospitals | Private clinics |
| Wait times | Long | Short |
| English support | Limited | Good |
| Coverage | Basic | Comprehensive |
| Overseas | No | Often yes |

### Tax Treatment

- Private health insurance premiums paid by employer: **Taxable benefit**
- Private health insurance premiums paid by you: **Not deductible**

---

## Quick Reference

| Need | Action |
|------|--------|
| Get card | Employer registers you |
| Find doctor | Go to registered facility |
| Emergency | Nearest hospital, show card |
| Reimbursement | Submit within 180 days |
| Change facility | Through employer, once/year |
| Lost card | Report and apply for replacement |

---

## Need Help?

Our team can:
- Assist with health insurance registration
- Guide you on facility selection
- Help with claim submissions
- Advise on private insurance options

**ZALO: +84703027485**

---

*This article is based on Law on Health Insurance and Circular 46/2018/TT-BYT. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 14,
    slug: 'remote-work-tax-obligations-vietnam',
    title: 'Remote Work Tax Guide: Living in Vietnam, Working for Foreign Companies',
    excerpt: 'Tax obligations for digital nomads, remote workers, and those employed by foreign companies while living in Vietnam.',
    category: 'Special Cases',
    readTime: '10 min read',
    featured: false,
    source: 'PIT Law & Circular 111/2013/TT-BTC',
    lastUpdated: '2024-11-10',
    tableOfContents: [
      { title: 'Remote Work Scenarios', anchor: 'scenarios' },
      { title: 'Tax Residency for Remote Workers', anchor: 'residency' },
      { title: 'Income Tax Obligations', anchor: 'income-tax' },
      { title: 'Employer Withholding', anchor: 'withholding' },
      { title: 'Social Insurance', anchor: 'social-insurance' },
      { title: 'Practical Considerations', anchor: 'practical' },
    ],
    content: `
## Remote Work Scenarios {#scenarios}

### Common Situations

| Scenario | Description |
|----------|-------------|
| **Digital Nomad** | No fixed employer, multiple clients |
| **Remote Employee** | Employed by foreign company, live in Vietnam |
| **Freelancer** | Self-employed, Vietnamese and foreign clients |
| **Hybrid** | Split time between Vietnam and home country |

### Key Questions

1. Where is your employer based?
2. Where is the work performed?
3. How long will you stay in Vietnam?
4. Do you have a work permit?
5. Does your home country have a DTA with Vietnam?

---

## Tax Residency for Remote Workers {#residency}

### The 183-Day Rule Applies

If you're in Vietnam for 183+ days in a year:
- **You are a tax resident**
- Taxed on worldwide income
- Progressive tax rates (5-35%)
- Personal deductions available

### Counting Days

For remote workers, every day physically in Vietnam counts:
- Work days: Yes
- Weekends: Yes
- Vacation days in Vietnam: Yes
- Business trips outside Vietnam: No

### Example

**Scenario:**
- Arrive in Vietnam: March 1
- Work remotely for US company
- Leave Vietnam: November 30
- Total days: ~270 days

**Result:** Tax resident of Vietnam for that year

### Regular Residence Test

If under 183 days, you may still be a resident if:
- You have a rental lease for 183+ days
- You have permanent residence registration

---

## Income Tax Obligations {#income-tax}

### For Tax Residents

| Income Type | Taxable in Vietnam? |
|-------------|-------------------|
| Salary from foreign employer | ✅ Yes |
| Freelance income | ✅ Yes |
| Investment income | ✅ Yes |
| Foreign rental income | ✅ Yes |

### For Non-Residents

| Income Type | Taxable in Vietnam? |
|-------------|-------------------|
| Salary for work performed in Vietnam | ✅ Yes |
| Salary for work outside Vietnam | ❌ No |
| Freelance income (Vietnam clients) | ✅ Yes |
| Freelance income (foreign clients) | Depends |

### Tax Rates

| Status | Rate |
|--------|------|
| Resident | Progressive 5-35% |
| Non-resident | Flat 20% |

### Example: Remote Employee

**Scenario:**
- US company employee
- Live in Vietnam 250 days/year
- Salary: $5,000/month
- No Vietnam work permit

**Tax Treatment:**
- Tax resident (250 > 183 days)
- All salary taxable in Vietnam
- Progressive rates apply
- May also be taxable in US
- Use DTA to avoid double tax

---

## Employer Withholding {#withholding}

### Foreign Employers

If your employer is foreign and has **no Vietnam presence**:
- They cannot withhold Vietnam tax
- You must file and pay yourself
- Register directly with tax authority

### Vietnam Establishment

If your foreign employer has a Vietnam branch/office:
- They should withhold tax
- Register you with tax authority
- Provide withholding certificates

### Self-Filing Process

For remote workers without Vietnam employer:

1. **Register for TIN**
   - At local tax department
   - Form 01-MST
   - Required for all taxpayers

2. **Make Provisional Payments** (if applicable)
   - Quarterly if tax due expected
   - By 30th of following month

3. **File Annual Return**
   - Form 02/CK-TNCN
   - By March 31 of following year
   - Declare all income

4. **Pay Any Balance Due**
   - With annual return
   - Interest if late

---

## Social Insurance {#social-insurance}

### Are Remote Workers Covered?

| Situation | Social Insurance Required? |
|-----------|---------------------------|
| Foreign employer, no Vietnam entity | ❌ No |
| Foreign employer with Vietnam entity | ✅ Yes (if contract ≥ 12 months) |
| Self-employed/freelancer | ❌ No (voluntary only) |

### Practical Effect

Most remote workers for foreign companies:
- **Don't contribute** to Vietnam social insurance
- **No Vietnamese pension benefits**
- **No Vietnamese health insurance** through SI
- Should arrange private health insurance

### Health Insurance Consideration

Without social insurance:
- No mandatory health insurance
- Must arrange private coverage
- Consider international health insurance
- Emergency evacuation coverage recommended

---

## Practical Considerations {#practical}

### Work Permit Requirements

**Do you need a work permit?**

| Situation | Work Permit Required? |
|-----------|----------------------|
| Employed by Vietnam company | ✅ Yes |
| Employed by foreign company, no Vietnam presence | ❌ No* |
| Self-employed/freelancer | ❌ No* |

*\*But visa restrictions may apply. Many use tourist or business visas, which have specific limitations.*

### Visa Options

| Visa Type | Duration | Work Allowed? |
|-----------|----------|---------------|
| Tourist | 30-90 days | ❌ No |
| Business | 30-90 days | Limited |
| Work permit visa | 1-2 years | ✅ Yes |
| Investor visa | 1-5 years | ✅ Yes (for own company) |

### Banking

**Receiving Salary:**
- Can receive foreign transfers
- Bank may ask for source of funds
- Report for tax purposes
- Keep all transfer records

### Record Keeping

Maintain records of:
- All income received
- Entry/exit dates
- Work locations
- Client contracts
- Payment receipts
- Tax filings

---

## DTA Considerations

### Double Taxation Risk

Remote workers often face:
- Taxation in Vietnam (residence)
- Taxation in home country (source/citizenship)

### Common DTA Provisions

| Income Type | Typically Taxed Where |
|-------------|----------------------|
| Employment income | Where work is performed |
| Director's fees | Where company is resident |
| Business income | Where PE is located |

### US Citizens Special Case

US citizens are taxed on worldwide income regardless of residence:
- Must file US tax return
- Can claim Foreign Earned Income Exclusion
- Can claim Foreign Tax Credit for Vietnam tax

---

## Checklist for Remote Workers

### Before Arriving

- [ ] Check visa requirements
- [ ] Understand work permit rules
- [ ] Arrange health insurance
- [ ] Plan your residency period
- [ ] Research DTA between countries

### After Arriving

- [ ] Track your days in Vietnam
- [ ] Register for TIN (if tax resident)
- [ ] Open bank account
- [ ] Keep all income records
- [ ] Make quarterly payments if needed

### Year-End

- [ ] Calculate total days in Vietnam
- [ ] Determine residency status
- [ ] File annual return by March 31
- [ ] Claim DTA benefits if applicable
- [ ] Keep records for 10 years

---

## Need Help?

Remote work taxation is complex. Our team can:

- Determine your tax residency
- Register you with tax authorities
- File your Vietnam tax returns
- Coordinate DTA claims
- Optimize your tax position

**ZALO: +84703027485**

---

*This article is based on PIT Law and Circular 111/2013/TT-BTC. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
  {
    id: 15,
    slug: 'investment-income-taxation-dividends-interest-capital-gains',
    title: 'Investment Income: Taxation of Dividends, Interest & Capital Gains',
    excerpt: 'How investment income is taxed in Vietnam for foreign individuals - dividends, interest, capital gains, and reporting requirements.',
    category: 'Income Types',
    readTime: '7 min read',
    featured: false,
    source: 'PIT Law & Circular 111/2013/TT-BTC',
    lastUpdated: '2024-10-25',
    tableOfContents: [
      { title: 'Investment Income Types', anchor: 'types' },
      { title: 'Dividend Taxation', anchor: 'dividends' },
      { title: 'Interest Income', anchor: 'interest' },
      { title: 'Capital Gains', anchor: 'capital-gains' },
      { title: 'Securities Trading', anchor: 'securities' },
      { title: 'Reporting Requirements', anchor: 'reporting' },
    ],
    content: `
## Investment Income Types {#types}

For tax residents in Vietnam, investment income is taxable. Here's how different types are treated:

### Overview

| Income Type | Tax Rate | Withholding |
|-------------|----------|-------------|
| Dividends (Vietnam) | 5% | Yes |
| Interest (Vietnam bank) | 5% | Yes |
| Capital gains (securities) | 0.1% on sale price | Yes |
| Capital gains (other) | 20% | May apply |
| Foreign investment income | Progressive rates | Self-report |

---

## Dividend Taxation {#dividends}

### Vietnam Dividends

Dividends from Vietnamese companies are subject to:

**Tax Rate:** 5% withholding tax

**Calculation:**
> Tax = Dividend Amount × 5%

### Example

**Scenario:**
- You receive 100,000,000 VND in dividends
- Withholding tax: 100M × 5% = 5,000,000 VND
- Net received: 95,000,000 VND

### No Further Tax

For non-residents, the 5% withholding is final.
For residents, this is usually the final tax on dividends.

### Foreign Dividends

If you're a tax resident and receive dividends from foreign companies:
- Taxable as worldwide income
- Declare in annual return
- May be able to claim foreign tax credit
- DTA may apply

---

## Interest Income {#interest}

### Bank Deposit Interest

**From Vietnamese Banks:**
- Tax rate: 5% withholding
- Bank deducts automatically
- No further reporting needed

### Example

**Scenario:**
- Bank deposit: 1,000,000,000 VND
- Interest rate: 6% per year
- Annual interest: 60,000,000 VND
- Tax withheld: 60M × 5% = 3,000,000 VND
- Net interest: 57,000,000 VND

### Bond Interest

Interest from Vietnamese bonds:
- Similar 5% withholding
- Paid through paying agent
- Final tax for individuals

### Foreign Interest

Interest from foreign banks/investments:
- Taxable for residents
- Must declare in annual return
- Foreign tax credit may apply

### Exemptions

Some interest is exempt:
- Government bond interest (certain types)
- Educational savings accounts (limited)

---

## Capital Gains {#capital-gains}

### Securities (Stocks, Bonds)

**Special Rate:** 0.1% of transfer value (not gain)

This is a deemed tax that doesn't consider actual gain or loss.

### Example

**Scenario:**
- Buy shares for: 100,000,000 VND
- Sell shares for: 120,000,000 VND
- Actual gain: 20,000,000 VND

**Tax:** 120M × 0.1% = 120,000 VND (not based on 20M gain)

### Non-Securities Capital Gains

For other assets (real estate, business interests):

**Tax Rate:** 20% of actual gain

**Calculation:**
> Tax = (Selling Price - Cost) × 20%

### Real Estate

Special rules apply to real estate:
- 2% of transfer value (similar to securities)
- Or 25% of gain for certain properties
- Exemptions for primary residence

---

## Securities Trading {#securities}

### Vietnamese Stock Market

For individuals trading on Vietnamese exchanges:

| Activity | Tax Treatment |
|----------|--------------|
| Buying stocks | No tax |
| Selling stocks | 0.1% of sale value |
| Dividends | 5% withholding |
| Stock rights | No tax on allocation |

### Example Trading Year

**Activity:**
- Total sales: 2,000,000,000 VND
- Total purchases: 1,500,000,000 VND
- Actual gain: 500,000,000 VND
- Dividends received: 50,000,000 VND

**Tax:**
- Securities transfer tax: 2B × 0.1% = 2,000,000 VND
- Dividend tax: 50M × 5% = 2,500,000 VND
- **Total:** 4,500,000 VND

### Foreign Stocks

Trading on foreign exchanges:
- Taxable for residents
- Report gains in annual return
- Progressive rates may apply
- DTA may affect treatment

---

## Reporting Requirements {#reporting}

### Annual Declaration

For investment income, you may need to:

1. **Declare foreign investment income** (if resident)
2. **Report capital gains** (if not already taxed)
3. **Claim foreign tax credits** (if eligible)

### Required Documents

| Document | Purpose |
|----------|---------|
| Brokerage statements | Track transactions |
| Dividend statements | Verify income |
| Bank interest certificates | Confirm interest |
| Foreign tax receipts | Claim credits |

### Form 02/CK-TNCN

Include investment income in your annual PIT finalization:
- Line for dividends
- Line for interest
- Line for capital gains
- Attach supporting documents

### Deadlines

| Filing | Deadline |
|--------|----------|
| Annual finalization | March 31 |
| Departure | Before leaving |

---

## Comparison Table

| Income Type | Vietnam Source | Foreign Source (Resident) |
|-------------|---------------|--------------------------|
| Dividends | 5% WH (final) | Progressive rates |
| Bank interest | 5% WH (final) | Progressive rates |
| Securities gains | 0.1% of sale (final) | Progressive rates |
| Other capital gains | 20% of gain | Progressive rates |
| Rental income | Varies | Progressive rates |

---

## Planning Tips

1. **Track all transactions** - Keep detailed records
2. **Understand withholding** - Many items are final tax
3. **Check DTAs** - May reduce foreign tax
4. **Time sales strategically** - 0.1% rate ignores timing
5. **Use tax-advantaged accounts** - If available in home country

---

## Need Help?

Our team can:
- Calculate tax on your investment income
- Prepare your investment income declarations
- Claim foreign tax credits
- Optimize your investment tax position

**ZALO: +84703027485**

---

*This article is based on PIT Law and Circular 111/2013/TT-BTC. For official regulations, please refer to [vbpl.vn](https://vbpl.vn).*
    `,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category)
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured)
}

export function getAllArticleSlugs(): string[] {
  return articles.map(article => article.slug)
}
