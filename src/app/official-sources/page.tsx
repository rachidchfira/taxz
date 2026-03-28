'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Search,
  ExternalLink,
  Calendar,
  Building2,
  Scale,
  BookOpen,
  Shield,
  Clock,
  Globe,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

// Official portal links
const officialPortals = [
  {
    name: 'vbpl.vn',
    url: 'https://vbpl.vn',
    description: 'National Legal Database',
  },
  {
    name: 'gdt.gov.vn',
    url: 'https://gdt.gov.vn',
    description: 'General Dept. of Taxation',
  },
  {
    name: 'chinhphu.vn',
    url: 'https://chinhphu.vn',
    description: 'Government Portal',
  },
  {
    name: 'thuenhanuoc.gov.vn',
    url: 'https://thuenhanuoc.gov.vn',
    description: 'Tax Authority Portal',
  },
]

// Source categories
type Category = 'all' | 'primary-law' | 'regulation' | 'guidance'

// Source data interface
interface SourceItem {
  id: string
  title: string
  citation: string
  description: string
  category: 'primary-law' | 'regulation' | 'guidance'
  effectiveDate: string
  lastUpdated: string
  tags: string[]
  officialUrl: string
}

// Legal sources data
const sources: SourceItem[] = [
  {
    id: 'pit-law',
    title: 'PIT Law (Consolidated)',
    citation: 'VBHN-VPQH',
    description: 'The primary legislation governing Personal Income Tax in Vietnam. This consolidated version includes all amendments and defines tax residency status, applicable tax rates for residents and non-residents, and calculation methodologies.',
    category: 'primary-law',
    effectiveDate: '2007-01-01',
    lastUpdated: '2024-07-01',
    tags: ['PIT Calculation', 'Tax Residency', 'Tax Rates'],
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-vanban.aspx?ItemID=34478',
  },
  {
    id: 'circular-111',
    title: 'Circular 111/2013/TT-BTC',
    citation: '111/2013/TT-BTC',
    description: 'Comprehensive implementing regulation for PIT. Covers registration procedures, tax finalization processes, refund mechanisms, employer withholding obligations, and documentation requirements for both residents and non-residents.',
    category: 'regulation',
    effectiveDate: '2014-01-01',
    lastUpdated: '2023-06-15',
    tags: ['PIT Finalization', 'Registration', 'Refund Process'],
    officialUrl: 'https://vbpl.vn/BTC/Pages/vbpq-vanban.aspx?ItemID=30410',
  },
  {
    id: 'social-insurance-law',
    title: 'Social Insurance Law',
    citation: 'Law No. 58/2014/QH13',
    description: 'Primary legislation establishing mandatory social insurance coverage. Defines contribution rates, eligibility criteria, and benefit entitlements for both Vietnamese nationals and foreign workers employed in Vietnam.',
    category: 'primary-law',
    effectiveDate: '2016-01-01',
    lastUpdated: '2024-01-01',
    tags: ['Social Insurance', 'Mandatory Contributions', 'Employee Benefits'],
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-vanban.aspx?ItemID=38539',
  },
  {
    id: 'health-insurance-law',
    title: 'Health Insurance Law',
    citation: 'Law No. 25/2008/QH12',
    description: 'Primary legislation governing health insurance requirements. Establishes mandatory health insurance coverage for all workers including foreign employees, with specific contribution rates and medical coverage provisions.',
    category: 'primary-law',
    effectiveDate: '2009-07-01',
    lastUpdated: '2023-12-31',
    tags: ['Health Insurance', 'Medical Coverage', 'Mandatory Contributions'],
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-vanban.aspx?ItemID=26484',
  },
  {
    id: 'family-deduction-guidance-2025',
    title: 'Family Deduction Guidance 2025',
    citation: 'Official Letter 2025/TCT-CS',
    description: 'Administrative guidance on family deduction procedures for the 2025 tax year. Provides clarification on personal deduction amounts, dependent registration processes, and documentation requirements for claiming family deductions.',
    category: 'guidance',
    effectiveDate: '2025-01-01',
    lastUpdated: '2025-01-15',
    tags: ['Family Deduction', 'Personal Allowance', 'Dependents'],
    officialUrl: 'https://gdt.gov.vn',
  },
  {
    id: 'family-deduction-resolution-2026',
    title: 'Family Deduction Resolution 2026',
    citation: 'Resolution 2026/NQ-UBTVQH15',
    description: 'Primary legislation updating family deduction thresholds effective from July 2024. Increases personal deduction to 11 million VND/month and dependent deduction to 4.4 million VND/month, significantly impacting PIT calculations.',
    category: 'primary-law',
    effectiveDate: '2024-07-01',
    lastUpdated: '2024-06-30',
    tags: ['Family Deduction', 'Tax Thresholds', '2024 Update'],
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-vanban.aspx?ItemID=49245',
  },
  {
    id: 'circular-205',
    title: 'Circular 205/2013/TT-BTC',
    citation: '205/2013/TT-BTC',
    description: 'DTA implementation guidance providing detailed procedures for claiming double taxation avoidance benefits. Essential for foreigners from countries with tax treaties with Vietnam, covering foreign tax credit mechanisms.',
    category: 'regulation',
    effectiveDate: '2014-01-01',
    lastUpdated: '2023-06-15',
    tags: ['DTA', 'Double Taxation', 'Foreign Tax Credit', 'Treaties'],
    officialUrl: 'https://vbpl.vn/BTC/Pages/vbpq-vanban.aspx?ItemID=30418',
  },
]

// Category configuration
const categoryConfig = {
  'primary-law': {
    label: 'Primary Law',
    description: 'Fundamental legislation passed by National Assembly',
    badgeClass: 'bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90',
  },
  'regulation': {
    label: 'Regulation',
    description: 'Implementing regulations and circulars',
    badgeClass: 'bg-teal-600 text-white hover:bg-teal-600/90',
  },
  'guidance': {
    label: 'Guidance',
    description: 'Administrative guidance and official letters',
    badgeClass: 'bg-amber-600 text-white hover:bg-amber-600/90',
  },
}

// Filter sources based on search and category
function useFilteredSources(searchQuery: string, category: Category) {
  return useMemo(() => {
    return sources.filter((source) => {
      // Category filter
      if (category !== 'all' && source.category !== category) {
        return false
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = source.title.toLowerCase().includes(query)
        const matchesCitation = source.citation.toLowerCase().includes(query)
        const matchesDescription = source.description.toLowerCase().includes(query)
        const matchesTags = source.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        )
        if (!matchesTitle && !matchesCitation && !matchesDescription && !matchesTags) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, category])
}

export default function OfficialSourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')

  const filteredSources = useFilteredSources(searchQuery, category)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A]/95 py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge 
                variant="outline" 
                className="mb-4 px-4 py-2 text-sm border-[#40E0D0]/30 bg-[#40E0D0]/10 text-[#40E0D0]"
              >
                <Shield className="w-4 h-4 mr-2" />
                Legal Authority
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Legal Basis for Our Guidance
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-6 max-w-3xl mx-auto">
                All guidance and calculations provided by VietPIT are based on official Vietnamese 
                government sources. We maintain direct links to primary legal documents to ensure 
                transparency and accuracy.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#40E0D0]" />
                  <span>Verified Official Sources</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#40E0D0]" />
                  <span>Regularly Updated</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#40E0D0]" />
                  <span>Direct Government Links</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official Portals Bar */}
        <section className="bg-muted/50 border-b">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Globe className="w-5 h-5" />
                <span>Official Government Portals:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {officialPortals.map((portal) => (
                  <a
                    key={portal.name}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-card rounded-lg border hover:border-[#40E0D0] hover:shadow-sm transition-all text-sm"
                  >
                    <Building2 className="w-4 h-4 text-[#1E3A8A]" />
                    <span className="font-medium">{portal.name}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-muted/30 border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Search Input */}
              <div className="relative flex-1 w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title, citation, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-card h-11"
                />
              </div>

              {/* Category Tabs */}
              <Tabs value={category} onValueChange={(value) => setCategory(value as Category)} className="w-auto">
                <TabsList className="bg-white dark:bg-card">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#1E3A8A] data-[state=active]:text-white">
                    All Sources
                  </TabsTrigger>
                  <TabsTrigger value="primary-law" className="data-[state=active]:bg-[#1E3A8A] data-[state=active]:text-white">
                    Primary Law
                  </TabsTrigger>
                  <TabsTrigger value="regulation" className="data-[state=active]:bg-[#1E3A8A] data-[state=active]:text-white">
                    Regulations
                  </TabsTrigger>
                  <TabsTrigger value="guidance" className="data-[state=active]:bg-[#1E3A8A] data-[state=active]:text-white">
                    Guidance
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredSources.length}</span> of{' '}
              <span className="font-medium text-foreground">{sources.length}</span> sources
              {category !== 'all' && (
                <span> in <Badge className={categoryConfig[category].badgeClass + ' ml-1'}>
                  {categoryConfig[category].label}
                </Badge></span>
              )}
            </div>
          </div>
        </section>

        {/* Sources Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {filteredSources.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {filteredSources.map((source) => (
                  <Card
                    key={source.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border-l-4 border-l-[#1E3A8A]"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={categoryConfig[source.category].badgeClass}>
                          {categoryConfig[source.category].label}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-[#1E3A8A] dark:group-hover:text-[#40E0D0] transition-colors">
                        {source.title}
                      </CardTitle>
                      <CardDescription className="font-mono text-sm">
                        {source.citation}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {source.description}
                      </p>
                      
                      {/* Dates */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Effective: {new Date(source.effectiveDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Updated: {new Date(source.lastUpdated).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {source.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs cursor-pointer hover:bg-[#40E0D0]/20 hover:text-[#40E0D0] transition-colors"
                            onClick={() => setSearchQuery(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Link Button */}
                      <Button
                        asChild
                        className="w-full mt-4 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white"
                      >
                        <a
                          href={source.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Official Source
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // No Results State
              <div className="max-w-lg mx-auto text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Sources Found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn&apos;t find any sources matching your search criteria.
                  Try adjusting your search or filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setCategory('all')
                  }}
                  className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Request Research CTA */}
        <section className="py-16 bg-gradient-to-r from-[#1E3A8A] to-[#0F2860]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-[#40E0D0]/20 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-[#40E0D0]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Can&apos;t Find What You Need?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                If you can&apos;t find a specific legal document or need clarification on any regulation, 
                our team can research and provide official citations for Vietnamese tax-related matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-semibold"
                >
                  <a href="#contact">
                    Request Source Research
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-[#1E3A8A] font-semibold transition-all duration-300"
                >
                  <a href="mailto:contact@vietpit.vn">
                    Contact Our Team
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-8 bg-muted/30 border-t">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-[#1E3A8A] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Legal Disclaimer</p>
                  <p>
                    While VietPIT strives to provide accurate and up-to-date information based on 
                    official Vietnamese government sources, this library is for informational purposes only. 
                    For official legal advice, please consult with a licensed Vietnamese tax professional 
                    or the relevant government authorities. Laws and regulations may change; always verify 
                    with primary sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
