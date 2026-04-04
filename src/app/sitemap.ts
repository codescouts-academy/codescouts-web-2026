import { Languages, Language } from "@/i18n";
import { getPostsFromLang } from "@/lib/blog";
import { baseUrl } from "@/lib/meta";
import { MetadataRoute } from "next";

const pages = ["", "contact", "clients", "services", "courses", "blog"] as const;

const pageUrl = (locale: Language, slug?: string) =>
  `${baseUrl}/${locale}${slug ? `/${slug}` : ""}`;

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
          languages:
            page === "blog"
              ? { [locale]: pageUrl(locale, page) }
              : {
                  es: pageUrl("es", page),
                  en: pageUrl("en", page),
                },
        },
      })),
  );

  const blogPages = Languages.flatMap((locale) =>
    getPostsFromLang(locale).map((post) => ({
      url: pageUrl(locale, `blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  );

  return [...staticPages, ...blogPages];
}
