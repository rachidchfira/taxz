'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  BookOpen,
  HelpCircle,
  FileText,
  Users,
  Shield,
  Calculator,
  ArrowRight,
  ExternalLink,
  Search,
  MapPin,
  Percent,
  Wallet,
  Clock,
} from 'lucide-react'

// Category data
const categories = [
  {
    id: 'tax-residency',
    icon: MapPin,
    title: 'Tax Residency',
    description: 'Understanding the 183-day rule, regular residence criteria, and how tax residency status affects your obligations in Vietnam.',
    articleCount: 12,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    articles: [
      '183-Day Rule Explained',
      'Regular Residence Criteria',
      'Tax Resident vs Non-Resident',
      'Dual Residency Situations',
    ],
  },
  {
    id: 'tax-rates',
    icon: Percent,
    title: 'Tax Rates & Brackets',
    description: 'Progressive tax rates for residents, flat rates for non-residents, and how to calculate your effective tax burden.',
    articleCount: 8,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-950/30',
    articles: [
      'Progressive Tax Brackets 2025',
      'Flat Rate for Non-Residents',
      'Calculating Effective Tax Rate',
      'Year-End Tax Finalization',
    ],
  },
  {
    id: 'deductions',
    icon: Wallet,
    title: 'Deductions',
    description: 'Family circumstance deductions, personal deductions, insurance contributions, and charitable donations that reduce taxable income.',
    articleCount: 15,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    articles: [
      'Family Circumstance Deductions',
      'Personal Deduction Amounts',
      'Social Insurance Deductions',
      'Charitable Donation Deductions',
    ],
  },
  {
    id: 'filing-forms',
    icon: FileText,
    title: 'Filing & Forms',
    description: 'Tax finalization deadlines, required documentation, official forms, and step-by-step filing procedures.',
    articleCount: 10,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    articles: [
      'Annual Filing Deadlines',
      'Required Documents Checklist',
      'Form 02/CK-TNCN Guide',
      'Filing Procedures',
    ],
  },
]

// FAQ data with sources
const faqs = [
  {
    question: 'How do I know if I am a tax resident?',
    answer: 'You are considered a tax resident in Vietnam if you meet either of the following conditions: (1) You are present in Vietnam for 183 days or more within a calendar year, or within 12 consecutive months starting from your first arrival date; or (2) You have a regular residence in Vietnam, which includes having a registered permanent residence or a rented house with a lease of 183 days or more. Tax residents are subject to progressive tax rates on their worldwide income.',
    source: 'Personal Income Tax Law (Consolidated Document No. 12/VBHN-VPQH)',
    sourceUrl: 'https://vbpl.vn',
  },
  {
    question: 'What are family deduction amounts for 2025/2026?',
    answer: 'For the 2025/2026 tax year, the family circumstance deduction amounts are: (1) Personal deduction: 11,000,000 VND per month (132,000,000 VND per year) for the taxpayer; (2) Dependent deduction: 4,400,000 VND per month per qualifying dependent. Qualifying dependents include children under 18, children studying at university/college with income below 1,000,000 VND/month, and elderly/disabled parents with no income or income below 1,000,000 VND/month.',
    source: 'Tax Department Guidance (Official Letter on Family Deductions)',
    sourceUrl: 'https://gdt.gov.vn',
  },
  {
    question: 'Do I need to finalize if my employer withholds tax?',
    answer: 'If your employer has withheld tax correctly and you only have income from one employer during the tax year, you generally do not need to file a tax finalization. However, you MUST file a tax finalization if: (1) You had income from multiple employers; (2) You want to claim additional deductions; (3) The tax withheld was incorrect; or (4) You qualify for a tax refund due to over-withholding.',
    source: 'Circular 111/2013/TT-BTC (Article 27)',
    sourceUrl: 'https://vbpl.vn',
  },
  {
    question: 'Do I need to finalize before leaving Vietnam?',
    answer: 'Yes, foreign individuals who terminate their employment or leave Vietnam must file a tax finalization before departure. This is a mandatory requirement. The tax finalization should be filed with the local tax authority where you last worked. You will need to provide: (1) Tax finalization declaration form; (2) Proof of tax withheld by employer(s); (3) Documents proving deductions; and (4) Passport copies with entry/exit stamps.',
    source: 'Circular 111/2013/TT-BTC (Article 29)',
    sourceUrl: 'https://vbpl.vn',
  },
  {
    question: 'Are foreigners required to pay social insurance?',
    answer: 'Yes, foreign employees working in Vietnam with work permits, practicing certificates, or practicing licenses are subject to compulsory social insurance contributions. This includes: (1) Social insurance (8% employee contribution); (2) Health insurance (1.5% employee contribution); (3) Unemployment insurance (1% employee contribution). The employer also makes contributions. However, citizens of countries that have signed bilateral social insurance agreements with Vietnam may be exempt from certain contributions.',
    source: 'Law on Social Insurance (Law No. 58/2014/QH13)',
    sourceUrl: 'https://vbpl.vn',
  },
]

// Official sources
const officialSources = [
  {
    name: 'vbpl.vn',
    url: 'https://vbpl.vn',
    description: 'Vietnam National Legal Database',
    icon: FileText,
  },
  {
    name: 'gdt.gov.vn',
    url: 'https://gdt.gov.vn',
    description: 'General Department of Taxation',
    icon: Calculator,
  },
  {
    name: 'chinhphu.vn',
    url: 'https://chinhphu.vn',
    description: 'Government of Vietnam Portal',
    icon: Shield,
  },
]

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter categories based on search
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      searchQuery === '' ||
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.articles.some((article) =>
        article.toLowerCase().includes(searchQuery.toLowerCase())
      )
    const matchesCategory = selectedCategory === null || category.id === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter((faq) => {
    return (
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1E3A8A] to-[#1E293B] py-16 md:py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-30"></div>
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge
                variant="outline"
                className="mb-4 px-3 py-1 text-xs font-medium border-[#40E0D0]/30 bg-[#40E0D0]/5 text-[#40E0D0]"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Knowledge Center
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Vietnam PIT Knowledge Base
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Your comprehensive guide to Personal Income Tax in Vietnam. All information sourced from official Vietnamese government regulations.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles, FAQs, and guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-white dark:bg-card shadow-lg border-0 rounded-xl"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <Button
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={
                    selectedCategory === null
                      ? 'bg-[#40E0D0] text-[#1E3A8A] hover:bg-[#40E0D0]/90'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={
                      selectedCategory === category.id
                        ? 'bg-[#40E0D0] text-[#1E3A8A] hover:bg-[#40E0D0]/90'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }
                  >
                    {category.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category Cards Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
                Browse by Category
              </h2>
              <p className="text-muted-foreground">
                Explore our knowledge base organized by topic
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <Card
                  key={category.id}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <CardHeader className="pb-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center mb-3`}
                    >
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <CardTitle className="text-lg group-hover:text-[#40E0D0] transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {category.articleCount} articles
                      </Badge>
                    </div>
                    <div className="space-y-1.5">
                      {category.articles.slice(0, 3).map((article, index) => (
                        <div
                          key={index}
                          className="text-xs text-muted-foreground flex items-center gap-2 py-1"
                        >
                          <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                          <span className="truncate">{article}</span>
                        </div>
                      ))}
                      {category.articles.length > 3 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-2 h-8 text-xs text-[#40E0D0] hover:text-[#40E0D0] hover:bg-[#40E0D0]/10"
                        >
                          View all {category.articleCount} articles
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <Badge
                  variant="outline"
                  className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]"
                >
                  <HelpCircle className="w-3 h-3 mr-1" />
                  Frequently Asked Questions
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
                  Common Questions Answered
                </h2>
                <p className="text-muted-foreground">
                  Official source-backed answers to frequently asked questions
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card border rounded-lg px-6 data-[state=open]:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left py-4 hover:no-underline">
                      <div className="flex items-start gap-3 pr-4">
                        <div className="w-6 h-6 rounded-full bg-[#1E3A8A]/10 dark:bg-[#40E0D0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-[#1E3A8A] dark:text-[#40E0D0]">
                            Q
                          </span>
                        </div>
                        <span className="font-medium">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="pl-9 space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Shield className="w-4 h-4 text-[#40E0D0]" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Source:
                          </span>
                          <a
                            href={faq.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#40E0D0] hover:underline flex items-center gap-1"
                          >
                            {faq.source}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No FAQs found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Official Sources Footer Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Badge
                  variant="outline"
                  className="mb-4 border-[#40E0D0]/30 bg-[#40E0D0]/5 text-[#40E0D0]"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Official Sources
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
                  Government-Backed Information
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  All information in our knowledge base is sourced directly from official Vietnamese government websites and legal databases.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {officialSources.map((source) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-[#40E0D0]/30">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/5 dark:bg-[#40E0D0]/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1E3A8A]/10 dark:group-hover:bg-[#40E0D0]/10 transition-colors">
                          <source.icon className="w-7 h-7 text-[#1E3A8A] dark:text-[#40E0D0]" />
                        </div>
                        <h3 className="font-semibold mb-1 group-hover:text-[#40E0D0] transition-colors">
                          {source.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          {source.description}
                        </p>
                        <div className="flex items-center justify-center gap-1 text-xs text-[#40E0D0]">
                          Visit Website
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>

              {/* Compliance Badge */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#1E3A8A]/5 dark:bg-[#40E0D0]/5 border border-[#1E3A8A]/10 dark:border-[#40E0D0]/20">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#40E0D0]" />
                    <span className="font-semibold text-sm">
                      Official Source Compliant
                    </span>
                  </div>
                  <div className="w-px h-5 bg-border" />
                  <span className="text-xs text-muted-foreground">
                    All content verified against vbpl.vn, gdt.gov.vn, chinhphu.vn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-16 bg-[#1E3A8A]">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Need Personal Assistance?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Our tax experts are ready to help you navigate your specific situation. Book a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-medium px-8"
              >
                <Users className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E3A8A] px-8"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Try Tax Calculator
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
