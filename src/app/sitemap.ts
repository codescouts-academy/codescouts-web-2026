import { Languages, Language } from "@/i18n";
import { getPostsFromLang } from "@/lib/blog";
import { baseUrl } from "@/lib/meta";
import { MetadataRoute } from "next";

const pages = ["", "contact", "clients", "services", "courses", "blog"] as const;

// `trailingSlash: true` in next.config.ts means every page is served at a URL
// ending in "/". The sitemap MUST match the canonical exactly, otherwise every
// entry resolves through a 301 and Google stops trusting the sitemap.
const pageUrl = (locale: Language, slug?: string) =>
  `${baseUrl}/${locale}${slug ? `/${slug}` : ""}/`;

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = Languages.flatMap((locale) =>
    pages
      .filter((page) => page !== "blog" || getPostsFromLang(locale).length > 0)
      .map((page) => ({
        url: pageUrl(locale, page),
        lastModified: new Date(),
        changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: {
            es: pageUrl("es", page),
            en: pageUrl("en", page),
          },
        },
      })),
  );

  const blogPages = Languages.flatMap((locale) =>
    getPostsFromLang(locale).map((post) => {
      const allLanguages = Languages.filter((l) => {
        const slugExists = getPostsFromLang(l).some((p) => p.slug === post.slug);
        return slugExists;
      });

      return {
        url: pageUrl(locale, `blog/${post.slug}`),
        lastModified: new Date(post.date),
        changeFrequency: "weekly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            allLanguages.map((l) => [l, pageUrl(l, `blog/${post.slug}`)]),
          ),
        },
      };
    }),
  );

  return [...staticPages, ...blogPages];
}
