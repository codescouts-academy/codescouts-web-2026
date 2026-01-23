import { Languages } from '@/i18n';
import { getPostsFromLang } from '@/lib/blog';
import { MetadataRoute } from 'next'

const baseUrl = process.env.SITE_URL;

const pages = [
  "/",
  "/contact",
  "/clients",
  "/services",
  "/courses",
]

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = []
  const dynamicPages = []

  for (const locale of Languages) {
    for (const page of pages) {
      staticPages.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })
    }

    const posts = await getPostsFromLang(locale);

    for (const post of posts) {
      dynamicPages.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    }
  }

  return [...staticPages, ...dynamicPages]
}
