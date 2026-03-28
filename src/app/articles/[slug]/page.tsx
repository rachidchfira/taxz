'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  FileCheck, 
  ChevronRight,
  Share2,
  Printer,
  Calendar,
  ArrowRight
} from 'lucide-react'
import { getArticleBySlug, articles } from '@/lib/articles'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3)

  // Get other featured articles
  const otherArticles = articles
    .filter(a => a.id !== article.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/resources/knowledge" className="hover:text-foreground transition-colors">
              Knowledge Base
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
            {/* Main Content */}
            <article>
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="outline" className="border-[#40E0D0]/30 text-[#40E0D0]">
                    {article.category}
                  </Badge>
                  {article.featured && (
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                      <BookOpen className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                  {article.title}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Updated: {article.lastUpdated}</span>
                  </div>
                  <div className="official-badge">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{article.source}</span>
                  </div>
                </div>

                <Separator className="mt-6" />
              </header>

              {/* Table of Contents */}
              {article.tableOfContents && article.tableOfContents.length > 0 && (
                <Card className="mb-8 bg-muted/30 border-0">
                  <CardContent className="p-6">
                    <h2 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#40E0D0]" />
                      Table of Contents
                    </h2>
                    <nav className="space-y-2">
                      {article.tableOfContents.map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.anchor}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-[#40E0D0] transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                          <span>{item.title}</span>
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              )}

              {/* Article Content */}
              <div className="article-content">
                <div dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }} />
              </div>

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="official-badge text-sm">
                    <FileCheck className="w-4 h-4" />
                    <span>Source: {article.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Printer className="w-4 h-4" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </footer>

              {/* Back to Knowledge Base */}
              <div className="mt-8">
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <Link href="/resources/knowledge">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Knowledge Base
                  </Link>
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA Card */}
              <Card className="gradient-primary text-white border-0 overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <h3 className="font-bold text-lg mb-2">Need Personal Help?</h3>
                    <p className="text-sm text-white/80 mb-4">
                      Our tax specialists can help with your specific situation.
                    </p>
                    <Button asChild className="bg-white text-[#1E3A8A] hover:bg-white/90 w-full">
                      <Link href="/contact">
                        Free Consultation
                      </Link>
                    </Button>
                    <div className="mt-4 text-center text-sm text-white/70">
                      ZALO: +84703027485
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedArticles.map((related) => (
                        <Link
                          key={related.id}
                          href={`/articles/${related.slug}`}
                          className="block group"
                        >
                          <h4 className="font-medium text-sm group-hover:text-[#40E0D0] transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {related.readTime}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* More Articles */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">More Articles</h3>
                  <div className="space-y-4">
                    {otherArticles.map((other) => (
                      <Link
                        key={other.id}
                        href={`/articles/${other.slug}`}
                        className="block group"
                      >
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="text-xs shrink-0">
                            {other.category}
                          </Badge>
                          <div>
                            <h4 className="font-medium text-sm group-hover:text-[#40E0D0] transition-colors line-clamp-2">
                              {other.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {other.readTime}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/resources/knowledge">
                      View All Articles
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-muted/30 border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link
                      href="/calculator"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#40E0D0] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      PIT Calculator
                    </Link>
                    <Link
                      href="/services"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#40E0D0] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Our Services
                    </Link>
                    <Link
                      href="/pricing"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#40E0D0] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Pricing
                    </Link>
                    <Link
                      href="/resources/official-sources"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#40E0D0] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Official Sources
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
