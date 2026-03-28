'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import {
  BookOpen,
  Search,
  Users,
  Calculator,
  Shield,
  FileText,
  Heart,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Clock,
  TrendingUp,
  Star,
  Phone,
  ChevronRight,
  HelpCircle,
  Globe,
  FileCheck,
} from 'lucide-react'
import { articles as allArticles } from '@/lib/articles'

// Get unique categories from articles with counts
const articleCategories = allArticles.reduce((acc, article) => {
  const existing = acc.find(c => c.title === article.category)
  if (existing) {
    existing.count++
  } else {
    acc.push({ title: article.category, count: 1 })
  }
  return acc
}, [] as { title: string; count: number }[])

// Use this for the category cards below (keeping icons/colors for visual appeal)
const categories = [
  {
    icon: Users,
    title: 'Tax Residency',
    count: 5,
    description: 'Understanding the 183-day rule and regular residence criteria for foreigners',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    articles: [
      '183-Day Rule Explained',
      'Regular Residence Test',
      'Tax Residency for Expats',
      'Changing Residency Status',
      'DTA Impact on Residency',
    ],
  },
  {
    icon: Calculator,
    title: 'Tax Rates & Brackets',
    count: 4,
    description: 'Progressive tax rates for residents and flat rates for non-residents',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    articles: [
      'Progressive Tax Brackets',
      'Non-Resident Flat Rate',
      'Tax Calculation Methods',
      'Year-End Tax Finalization',
    ],
  },
  {
    icon: Heart,
    title: 'Deductions',
    count: 6,
    description: 'Family circumstance deductions, personal allowances, and insurance deductions',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    articles: [
      'Personal Deduction (2025/2026)',
      'Dependant Deductions',
      'Charitable Contributions',
      'Insurance Premiums',
      'Housing Allowances',
      'Education Expenses',
    ],
  },
  {
    icon: FileText,
    title: 'Filing & Forms',
    count: 8,
    description: 'Official forms, deadlines, and step-by-step submission procedures',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    articles: [
      'Form 02/CK-TNCN Guide',
      'Filing Deadlines 2025',
      'Online Filing Portal',
      'Document Requirements',
      'Amended Returns',
      'Employer Responsibilities',
      'Self-Filing Process',
      'Tax Authority Submission',
    ],
  },
  {
    icon: Shield,
    title: 'Insurance',
    count: 5,
    description: 'Social insurance, health insurance requirements and exemptions for foreigners',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-950/30',
    articles: [
      'Social Insurance Obligations',
      'Health Insurance Coverage',
      'Exemption Conditions',
      'Contribution Rates',
      'Treaty Overrides',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Special Cases',
    count: 4,
    description: 'Multi-employer income, departure finalization, refunds, and DTA claims',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    articles: [
      'Leaving Vietnam Finalization',
      'Multi-Employer Income',
      'Tax Refund Claims',
      'Double Taxation Treaties',
    ],
  },
]

// Use articles from the centralized data file
const featuredArticles = allArticles

const faqs = [
  {
    question: 'How do I know if I am a tax resident in Vietnam?',
    answer: 'You are considered a tax resident if you meet either of two criteria: (1) You are present in Vietnam for 183 days or more within a calendar year or within 12 consecutive months starting from your first arrival date, OR (2) You have "regular residence" in Vietnam, which means you have a permanent residence or a rented house with a lease term of 183 days or more in a tax year. Tax residents are taxed on worldwide income at progressive rates (5-35%), while non-residents are taxed only on Vietnam-source income at a flat 20% rate.',
    source: 'PIT Law (Consolidated) - Law No. 04/2012/QH13',
    category: 'Tax Residency',
  },
  {
    question: 'What are the family deduction amounts for 2025 and 2026?',
    answer: 'For tax year 2025: Personal deduction is 11,000,000 VND/month, and dependant deduction is 4,400,000 VND/month per qualifying dependant. From tax year 2026 onwards: Personal deduction increases to 15,500,000 VND/month, and dependant deduction increases to 6,200,000 VND/month. These increases were approved by the National Assembly Standing Committee to account for inflation and cost of living adjustments.',
    source: 'National Assembly Standing Committee Resolution',
    category: 'Deductions',
  },
  {
    question: 'Do I need to finalize PIT if my employer already withholds tax?',
    answer: 'Possibly. If you have only one employer throughout the year and authorize them to finalize on your behalf, you may not need to file separately. However, you MUST file finalization if: (1) You worked for multiple employers during the year, (2) Your deductions changed during the year, (3) You want to claim additional deductions not accounted for in withholding, (4) Your actual tax liability differs from the amount withheld. Many foreigners are unaware that multi-employer situations require personal finalization.',
    source: 'Circular 111/2013/TT-BTC',
    category: 'Filing & Forms',
  },
  {
    question: 'I am leaving Vietnam permanently. Do I need to finalize before leaving?',
    answer: 'Yes, this is mandatory. Under Circular 111/2013/TT-BTC, foreign individuals who are tax residents and are leaving Vietnam permanently must finalize their personal income tax before departure. You need to file within 60 days from your departure date, but ideally you should complete the process before leaving as it requires documentation that may be difficult to obtain from abroad. The finalization covers income from January 1st of the tax year until your departure date.',
    source: 'Circular 111/2013/TT-BTC, Article 28',
    category: 'Special Cases',
  },
  {
    question: 'Are foreigners required to pay social insurance in Vietnam?',
    answer: 'Yes, but with conditions. Foreign employees working in Vietnam under fixed-term labor contracts of 12 months or more are subject to compulsory social insurance. Employee contribution is 8% of salary for retirement and death funds. However, exemptions apply if: (1) You are an intra-company transferee under WTO commitments, (2) You have reached retirement age at the time of signing the contract, or (3) A bilateral social security agreement between Vietnam and your home country provides exemption. Health insurance follows similar rules with a 1.5% employee contribution.',
    source: 'Social Insurance Law & Decree 115/2015/ND-CP',
    category: 'Insurance',
  },
  {
    question: 'What happens if I file my tax return late?',
    answer: 'Late filing incurs penalties under the Tax Administration Law. Penalties include: (1) A fine of 500,000 - 1,500,000 VND for late filing (for individuals), (2) Interest on late payment at 0.03% per day on any tax owed, (3) Additional penalties if the delay results in tax arrears. The interest compounds daily, so it is important to file promptly even if you cannot pay the full amount immediately. If you have reasonable grounds for delay, you can apply for an extension before the deadline.',
    source: 'Tax Administration Law',
    category: 'Filing & Forms',
  },
  {
    question: 'How do I claim dependant deductions for my family members?',
    answer: 'To claim dependant deductions, you must: (1) Have qualifying dependants (children under 18, or children 18-24 studying, or parents over 60 with no income, or disabled family members), (2) Register dependants with the tax authority using the prescribed form, (3) Submit supporting documents (birth certificates, school enrollment letters, medical certificates for disabled dependants), (4) Ensure each dependant is claimed by only one taxpayer. For 2025, each dependant provides a 4,400,000 VND/month deduction. For 2026, this increases to 6,200,000 VND/month.',
    source: 'Circular 111/2013/TT-BTC & Tax Dept. Guidance',
    category: 'Deductions',
  },
  {
    question: 'Can I claim double taxation treaty benefits for income earned in Vietnam?',
    answer: 'Yes, if Vietnam has a Double Taxation Agreement (DTA) with your home country. To claim benefits: (1) Obtain a Tax Residency Certificate from your home country tax authority, (2) Submit the certificate with Form 01/DTA to the Vietnamese tax authority, (3) Apply for exemption or tax credit based on the specific DTA provisions. Vietnam has DTAs with over 80 countries including the US, UK, Australia, Japan, South Korea, and most EU countries. The process typically takes 30-45 days and can significantly reduce your tax burden.',
    source: 'DTA Agreements & Circular 205/2014/TT-BTC',
    category: 'Special Cases',
  },
]

const officialSources = [
  {
    name: 'vbpl.vn',
    url: 'https://vbpl.vn',
    description: 'Vietnam National Legal Database - Official repository of all Vietnamese laws and regulations',
  },
  {
    name: 'gdt.gov.vn',
    url: 'https://gdt.gov.vn',
    description: 'General Department of Taxation - Tax regulations, forms, and official guidance',
  },
  {
    name: 'chinhphu.vn',
    url: 'https://chinhphu.vn',
    description: 'Government Portal - Official government announcements and decrees',
  },
]

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFaqs = useMemo(() => {
    let result = faqs
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      )
    }
    if (selectedCategory) {
      result = result.filter(faq => faq.category === selectedCategory)
    }
    return result
  }, [searchQuery, selectedCategory])

  const filteredArticles = useMemo(() => {
    let result = featuredArticles
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
      )
    }
    if (selectedCategory) {
      result = result.filter(article => article.category === selectedCategory)
    }
    return result
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 hero-gradient overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#40E0D0]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-[#40E0D0]/50 text-[#40E0D0]">
              <BookOpen className="w-4 h-4 mr-2" />
              Knowledge Base
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Expert Tax Guidance</span>
              <br />
              <span className="text-foreground">You Can Trust</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive articles and FAQs on Vietnamese Personal Income Tax, all sourced from 
              official government publications. No guesswork, just compliance-ready information.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles, FAQs, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-card border-2 focus:border-[#40E0D0] focus:ring-[#40E0D0]/20 shadow-lg"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#40E0D0]" />
                <span className="font-semibold">32+ Articles</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#40E0D0]" />
                <span className="font-semibold">50+ FAQs</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#40E0D0]" />
                <span className="font-semibold">8 Legal Sources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Articles with Category Filter */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter Pills */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">All Articles</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedCategory === null 
                    ? 'bg-[#1E3A8A] text-white shadow-md' 
                    : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                All ({allArticles.length})
              </button>
              {articleCategories.map((category) => (
                <button
                  key={category.title}
                  onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedCategory === category.title 
                      ? 'bg-[#1E3A8A] text-white shadow-md' 
                      : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.title} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      {article.featured && (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                          <Star className="w-3 h-3 mr-1 fill-amber-500" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-[#1E3A8A] dark:group-hover:text-[#40E0D0] transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3 mb-4">
                      {article.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </div>
                      <span className="text-sm font-medium text-[#40E0D0] group-hover:text-[#7FFFD4] transition-colors flex items-center gap-1">
                        Read Article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                    <Separator className="my-3" />
                    <div className="official-badge text-xs">
                      <FileCheck className="w-3 h-3" />
                      <span className="truncate">{article.source}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No articles found matching your search.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                }}
                className="text-[#40E0D0] mt-2"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4">
                <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
                FAQ
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to the most common questions about Vietnamese Personal Income Tax 
                for foreigners. All answers cite official government sources.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedCategory === null 
                    ? 'bg-[#1E3A8A] text-white shadow-md' 
                    : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                All Questions
              </button>
              {categories.map((category) => (
                <button
                  key={category.title}
                  onClick={() => setSelectedCategory(category.title)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedCategory === category.title 
                      ? 'bg-[#1E3A8A] text-white shadow-md' 
                      : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card rounded-lg border px-6 shadow-sm"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-start gap-3 text-left">
                      <div className="w-8 h-8 rounded-full bg-[#1E3A8A]/10 dark:bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HelpCircle className="w-4 h-4 text-[#1E3A8A] dark:text-[#40E0D0]" />
                      </div>
                      <div>
                        <span className="font-medium">{faq.question}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-11 pb-4">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                    <div className="official-badge">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Source: {faq.source}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 bg-card rounded-lg border">
                <HelpCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No FAQs found matching your search criteria.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                  }}
                  className="text-[#40E0D0] mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Official Sources Bar */}
      <section className="py-10 border-y bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileCheck className="w-5 h-5 text-[#40E0D0]" />
              <h3 className="text-lg font-semibold">Official Government Sources</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              All information in our knowledge base is sourced from official Vietnamese government portals
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {officialSources.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-[#1E3A8A] dark:text-[#40E0D0] mb-1">
                  {source.name}
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  {source.description}
                </span>
                <ExternalLink className="w-4 h-4 text-muted-foreground mt-2 group-hover:text-[#40E0D0] transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 gradient-primary relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#40E0D0]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
              Expert Support
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Our team of tax specialists is here to help you navigate the complexities of 
              Vietnamese Personal Income Tax. Get personalized guidance for your specific situation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button
                size="lg"
                className="bg-white text-[#1E3A8A] hover:bg-white/90 px-8 h-12"
                asChild
              >
                <Link href="#contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/50 text-white hover:bg-white/10 px-8 h-12"
                asChild
              >
                <Link href="#calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  Try PIT Calculator
                </Link>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <span>100% Compliance Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24h Response Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>500+ Foreigners Helped</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
