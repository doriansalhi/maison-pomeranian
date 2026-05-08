import { MetadataRoute } from 'next';
import { JOURNAL } from '@/lib/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://maison-pomeranian.com';
  const now = new Date();

  const articleUrls = JOURNAL.map((article) => ({
    url: `${base}/journal/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/collections`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/heritage`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/journal`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/livraison`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/retours`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/cgv`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/mentions`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...articleUrls,
  ];
}