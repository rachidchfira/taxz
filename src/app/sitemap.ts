import type { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'
import { absoluteUrl, SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: absoluteUrl('/calculator'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/services/pit-finalization'), lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: absoluteUrl('/services/tax-residency'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/services/leaving-vietnam'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/services/multi-employer'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/services/tax-refund'), lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: absoluteUrl('/pricing'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/knowledge-base'), lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: absoluteUrl('/official-sources'), lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: absoluteUrl('/tools/document-checklist'), lastModified: now, changeFrequency: 'monthly', priority: 0.55 },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/data-protection'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ...articles.map((article) => ({
      url: absoluteUrl(`/articles/${article.slug}`),
      lastModified: new Date(article.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: article.featured ? 0.65 : 0.5,
    })),
  ]

  return routes
}
