'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Shield,
  Search,
  ExternalLink,
  Scale,
  FileText,
  BookOpen,
  Calendar,
  Tag,
  AlertCircle,
  Building2,
  Globe,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react'

// Official portal links
const officialPortals = [
  {
    name: 'VBPL.vn',
    url: 'https://vbpl.vn',
    description: 'National Legal Database',
    icon: BookOpen,
  },
  {
    name: 'GDT.gov.vn',
    url: 'https://gdt.gov.vn',
    description: 'General Dept. of Taxation',
    icon: Building2,
  },
  {
    name: 'Chinhphu.vn',
    url: 'https://chinhphu.vn',
    description: 'Government Portal',
    icon: Globe,
  },
  {
    name: 'ThueNhaNuoc.gov.vn',
    url: 'https://thuenhanuoc.gov.vn',
    description: 'Tax Authority Portal',
    icon: Scale,
  },
]

// Source categories
type Category = 'all' | 'primary-law' | 'regulation' | 'guidance'

// Source data
interface SourceItem {
  id: string
  title: string
  citation: string
  description: string
  category: 'primary-law' | 'regulation' | 'guidance'
  effectiveDate: string
  tags: string[]
  officialUrl: string
  isConsolidated?: boolean
  isNew?: boolean
}

const sources: SourceItem[] = [
  {
    id: 'pit-law',
    title: 'PIT Law (Consolidated)',
    citation: 'VBHN-VPQH',
    description: 'The primary law governing Personal Income Tax in Vietnam. Consolidated version including all amendments up to present. Defines tax residents, non-residents, tax rates, and calculation methods.',
    category: 'primary-law',
    effectiveDate: '2007-01-01',
    tags: ['PIT', 'Tax Residency', 'Tax Rates', 'Primary Source'],
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-vanban.aspx?ItemID=34478',
    isConsolidated: true,
  },
  {
    id: 'circular-111',
    title: 'Circular 111/2013/TT-BTC',
    citation: '111/2013/TT-BTC',
    description: 'Guidelines for PIT registration, finalization, and refund procedures. Covers employer obligations, employee declarations, and documentation requirements.',
    category: 'regulation',
    effectiveDate: '2014-01-01',
    tags: ['PIT Registration', 'Finalization', 'Refund', 'Employer Duties'],
    officialUrl: 'https://vbpl.vn/BTC/Pages/vbpq-vanban.aspx?ItemID=30410',
  },
  {
    id: 'circular-205',
    title: 'Circular 205/2013/TT-BTC (DTA)',
    citation: '205/2013/TT-BTC',
    description: 'Guidelines on Double Taxation Avoidance agreements. Essential for foreigners from countries with DTA treaties with Vietnam.',
    category: 'regulation',
    effectiveDate: '2014-01-01',
    tags: ['DTA', 'Double Taxation', 'Treaties', 'Foreign Tax Credit'],
    officialUrl: 'https://vbpl.vn/BTC/Pages/vbpq-vanban.aspx?ItemID=30418',
  },
  {
    id: 'social-insurance-law',
    title: 'Social Insurance Law',
    citation: 'Law No. 58/2014/QH13',
    description: 'Comprehensive law on mandatory social insurance contributions. Defines contribution rates, eligibility, and benefits for Vietnamese and foreign workers.',
    category: 'primary-law',
    effectiveDate: '2016-01-01',
    tags: ['Social Insurance', 'SI', 'Mandatory Contributions', 'Benefits'],
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-vanban.aspx?ItemID=38539',
  },
  {
    id: 'health-insurance-law',
    title: 'Health Insurance Law',
    citation: 'Law No. 25/2008/QH12',
    description: 'Health insurance requirements and contribution rates. Amended to include foreign workers under mandatory coverage.',
    category: 'primary-law',
    effectiveDate: '2009-07-01',
    tags: ['Health Insurance', 'HI', 'Medical Coverage', 'Mandatory'],
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-vanban.aspx?ItemID=26484',
  },
  {
    id: 'decree-65',
    title: 'Decree 65/2013/ND-CP',
    citation: '65/2013/ND-CP',
    description: 'Detailed regulations on PIT implementation. Provides clarification on income types, exemptions, deductions, and administrative procedures.',
    category: 'regulation',
    effectiveDate: '2013-08-15',
    tags: ['PIT Implementation', 'Deductions', 'Exemptions', 'Procedures'],
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-vanban.aspx?ItemID=29376',
  },
  {
    id: 'family-deduction-resolution',
    title: 'Family Deduction Resolution 2026',
    citation: 'Resolution 2026/NQ-UBTVQH15',
    description: 'Updated family deduction thresholds effective from July 2024. Increases personal and dependent deductions for PIT calculations.',
    category: 'regulation',
    effectiveDate: '2024-07-01',
    tags: ['Family Deduction', 'Personal Allowance', 'Dependents', '2024 Update'],
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-vanban.aspx?ItemID=49245',
    isNew: true,
  },
  {
    id: 'tax-dept-letter-2025',
    title: 'Tax Dept Guidance Letter 2025',
    citation: 'Letter No. 1245/TCT-CS',
    description: 'Latest guidance from the Tax Department on PIT finalization procedures for foreign employees. Clarifies residency determination and multi-employer scenarios.',
    category: 'guidance',
    effectiveDate: '2025-02-01',
    tags: ['Guidance', 'Finalization', 'Foreign Employees', '2025'],
    officialUrl: 'https://gdt.gov.vn',
    isNew: true,
  },
]

// Category badge styles
const categoryStyles = {
  'primary-law': {
    label: 'Primary Law',
    className: 'bg-[#1E3A8A] text-white border-[#1E3A8A]',
  },
  'regulation': {
    label: 'Regulation',
    className: 'bg-teal-600 text-white border-teal-600',
  },
  'guidance': {
    label: 'Guidance',
    className: 'bg-amber-600 text-white border-amber-600',
  },
}

// Filter sources based on search, category, and tags
function useFilteredSources(
  searchQuery: string,
  category: Category,
  tagFilter: string
) {
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

      // Tag filter
      if (tagFilter && !source.tags.includes(tagFilter)) {
        return false
      }

      return true
    })
  }, [searchQuery, category, tagFilter])
}

// Get all unique tags
const getAllTags = () => {
  const tags = new Set<string>()
  sources.forEach((source) => {
    source.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export default function OfficialSourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')
  const [tagFilter, setTagFilter] = useState('')

  const filteredSources = useFilteredSources(searchQuery, category, tagFilter)
  const allTags = useMemo(() => getAllTags(), [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#1E3A8A] to-[#1E3A8A]/90 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 px-4 py-2 text-sm border-[#40E0D0]/30 bg-[#40E0D0]/10 text-[#40E0D0]">
                <Shield className="w-4 h-4 mr-2" />
                Legal Authority
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Official Sources Library
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-4">
                All guidance and calculations on VietPIT are based on official Vietnamese government sources.
                This library provides direct citations and links to primary legal documents.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
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
                  <span>Direct Links to Government Portals</span>
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
                    <portal.icon className="w-4 h-4 text-[#1E3A8A]" />
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
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Search Input */}
              <div className="relative flex-1 w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search sources by title, citation, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-card"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value as Category)}
                >
                  <SelectTrigger className="w-[160px] bg-white dark:bg-card">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="primary-law">Primary Law</SelectItem>
                    <SelectItem value="regulation">Regulation</SelectItem>
                    <SelectItem value="guidance">Guidance</SelectItem>
                  </SelectContent>
                </Select>

                {/* Tag Filter */}
                <Select
                  value={tagFilter}
                  onValueChange={(value) => setTagFilter(value)}
                >
                  <SelectTrigger className="w-[160px] bg-white dark:bg-card">
                    <SelectValue placeholder="All Topics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Topics</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Clear Filters */}
                {(searchQuery || category !== 'all' || tagFilter) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('')
                      setCategory('all')
                      setTagFilter('')
                    }}
                    className="text-muted-foreground"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredSources.length} of {sources.length} sources
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
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge className={categoryStyles[source.category].className}>
                            {categoryStyles[source.category].label}
                          </Badge>
                          {source.isConsolidated && (
                            <Badge
                              variant="outline"
                              className="border-purple-500 text-purple-600 dark:text-purple-400"
                            >
                              Consolidated
                            </Badge>
                          )}
                          {source.isNew && (
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-600 dark:text-green-400"
                            >
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <h3 className="text-xl font-semibold group-hover:text-[#1E3A8A] dark:group-hover:text-[#40E0D0] transition-colors">
                          {source.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-mono mt-1">
                          {source.citation}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {source.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Effective:{' '}
                          {new Date(source.effectiveDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground mr-1" />
                        {source.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs cursor-pointer hover:bg-[#40E0D0]/20 hover:text-[#40E0D0]"
                            onClick={() => setTagFilter(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        asChild
                        className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white"
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
                    </CardFooter>
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
                  Try adjusting your filters or search query.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setCategory('all')
                    setTagFilter('')
                  }}
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
                <FileText className="w-8 h-8 text-[#40E0D0]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need a Specific Source?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Can&apos;t find the legal document you&apos;re looking for? Our team can research
                and provide official citations for any Vietnamese tax-related regulation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A] font-medium"
                >
                  <a href="/company/contact">
                    Request Source Research
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <a href="/resources/knowledge">
                    Browse Knowledge Base
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
                    official Vietnamese government sources, this library is for informational purposes
                    only. For official legal advice, please consult with a licensed Vietnamese tax
                    professional or the relevant government authorities. Laws and regulations may
                    change; always verify with primary sources.
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
