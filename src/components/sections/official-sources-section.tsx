'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Search, 
  ExternalLink,
  Calendar,
  Building2,
  Scale,
  BookOpen,
  Shield,
  Clock
} from 'lucide-react'

const legalSources = [
  {
    category: 'primary_legislation',
    title: 'PIT Law (Consolidated)',
    citation: 'VBHN-VPQH',
    description: 'The foundational law governing Personal Income Tax in Vietnam. Defines taxpayer scope, residency rules, taxable income categories, and tax rates.',
    sourceUrl: 'https://vbpl.vn',
    sourceName: 'vbpl.vn',
    effectiveDate: '2009-01-01',
    lastUpdated: '2024-01-01',
    relevance: ['Tax residency determination', 'Tax rates and brackets', 'Deduction eligibility', 'Taxable income scope'],
  },
  {
    category: 'implementing_regulation',
    title: 'Circular 111/2013/TT-BTC',
    citation: '111/2013/TT-BTC',
    description: 'Key implementing regulation for PIT. Details withholding procedures, finalization requirements, employer authorization rules, and exit finalization for departing foreigners.',
    sourceUrl: 'https://vbpl.vn',
    sourceName: 'vbpl.vn',
    effectiveDate: '2013-07-01',
    lastUpdated: '2013-07-01',
    relevance: ['Finalization procedures', 'Withholding rules', 'Exit requirements', 'Form requirements'],
  },
  {
    category: 'primary_legislation',
    title: 'Social Insurance Law',
    citation: 'Law on Social Insurance',
    description: 'Defines compulsory social insurance obligations including coverage for foreign employees with 12+ month contracts.',
    sourceUrl: 'https://vbpl.vn',
    sourceName: 'vbpl.vn',
    effectiveDate: '2014-01-01',
    lastUpdated: '2024-01-01',
    relevance: ['Social insurance rates', 'Foreign employee coverage', 'Contribution calculations', 'Exemption criteria'],
  },
  {
    category: 'primary_legislation',
    title: 'Health Insurance Law',
    citation: 'Law on Health Insurance',
    description: 'Governs health insurance obligations for foreign employees with qualifying labor contracts.',
    sourceUrl: 'https://vbpl.vn',
    sourceName: 'vbpl.vn',
    effectiveDate: '2008-11-01',
    lastUpdated: '2014-11-01',
    relevance: ['Health insurance rates', 'Employee/employer split', 'Coverage requirements'],
  },
  {
    category: 'administrative_guidance',
    title: 'Family Deduction Guidance 2025',
    citation: 'Tax Dept. Guidance Letter',
    description: 'Official guidance confirming family circumstance deduction amounts for tax period 2025: 11M VND/month taxpayer, 4.4M VND/month dependant.',
    sourceUrl: 'https://chinhphu.vn',
    sourceName: 'chinhphu.vn',
    effectiveDate: '2025-01-01',
    lastUpdated: '2025-01-01',
    relevance: ['Deduction amounts', 'Tax period 2025', 'Dependant qualifications'],
  },
  {
    category: 'primary_legislation',
    title: 'Family Deduction Resolution 2026',
    citation: 'NASC Resolution',
    description: 'Resolution increasing family circumstance deductions from 2026: 15.5M VND/month taxpayer, 6.2M VND/month dependant.',
    sourceUrl: 'https://chinhphu.vn',
    sourceName: 'chinhphu.vn',
    effectiveDate: '2026-01-01',
    lastUpdated: '2026-01-01',
    relevance: ['New deduction amounts', 'Tax period 2026+', 'Significant increase'],
  },
  {
    category: 'implementing_regulation',
    title: 'Circular 205/2013/TT-BTC',
    citation: '205/2013/TT-BTC',
    description: 'Guidance on double taxation avoidance (DTA) agreements. Covers residence certificates and treaty claim procedures.',
    sourceUrl: 'https://vbpl.vn',
    sourceName: 'vbpl.vn',
    effectiveDate: '2013-07-01',
    lastUpdated: '2013-07-01',
    relevance: ['DTA claims', 'Residence certificates', 'Treaty benefits'],
  },
]

const categories = [
  { value: 'all', label: 'All Sources', icon: BookOpen },
  { value: 'primary_legislation', label: 'Primary Law', icon: Scale },
  { value: 'implementing_regulation', label: 'Regulations', icon: FileText },
  { value: 'administrative_guidance', label: 'Guidance', icon: Building2 },
]

const officialPortals = [
  { name: 'vbpl.vn', url: 'https://vbpl.vn', description: 'National Legal Database' },
  { name: 'gdt.gov.vn', url: 'https://gdt.gov.vn', description: 'General Department of Taxation' },
  { name: 'chinhphu.vn', url: 'https://chinhphu.vn', description: 'Government Portal' },
  { name: 'thuenhanuoc.gov.vn', url: 'https://thuenhanuoc.gov.vn', description: 'Tax Authority Portal' },
]

export function OfficialSourcesSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredSources = legalSources.filter(source => {
    const matchesSearch = 
      source.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.relevance.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || source.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'primary_legislation':
        return Scale
      case 'implementing_regulation':
        return FileText
      case 'administrative_guidance':
        return Building2
      default:
        return BookOpen
    }
  }

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category)
    return cat?.label || category
  }

  return (
    <section id="official-sources" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 border-[#40E0D0]/30 text-[#40E0D0]">
            <Shield className="w-3 h-3 mr-1" />
            Official Sources Library
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Legal Basis for Our Guidance
          </h2>
          <p className="text-lg text-muted-foreground">
            Every calculation, recommendation, and procedure on this platform is backed by 
            official Vietnamese government sources. No guesswork, no unofficial interpretations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Official Portals */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {officialPortals.map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-accent transition-colors text-sm"
              >
                <ExternalLink className="w-3 h-3" />
                <span className="font-medium">{portal.name}</span>
                <span className="text-muted-foreground">— {portal.description}</span>
              </a>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sources, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                {categories.map((cat) => (
                  <TabsTrigger key={cat.value} value={cat.value} className="flex items-center gap-1.5">
                    <cat.icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{cat.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Sources Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSources.map((source, index) => {
              const CategoryIcon = getCategoryIcon(source.category)
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#40E0D0]/10 flex items-center justify-center">
                          <CategoryIcon className="w-4 h-4 text-[#40E0D0]" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {getCategoryLabel(source.category)}
                          </Badge>
                        </div>
                      </div>
                      <div className="official-badge text-xs">
                        <Shield className="w-3 h-3" />
                        <span>{source.sourceName}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-3">{source.title}</CardTitle>
                    <CardDescription className="text-xs font-mono text-[#40E0D0]">
                      {source.citation}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {source.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Effective: {source.effectiveDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Updated: {source.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium">Relevant For:</p>
                      <div className="flex flex-wrap gap-1">
                        {source.relevance.map((item, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={source.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        View Official Source
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* No Results */}
          {filteredSources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No sources found matching your search.</p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Card className="inline-block">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Need a specific regulation or guidance not listed here?
                </p>
                <Button asChild className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-[#1E3A8A]">
                  <a href="#contact">
                    Request Source Research
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
