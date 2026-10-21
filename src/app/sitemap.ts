import { Languages } from "@/i18n";
import { getPostsFromLang } from "@/lib/blog";
import { COURSE_SLUGS } from "@/lib/courses";
import { pageUrl, SERVICE_PAGE_SLUGS } from "@/lib/meta";
import { MetadataRoute } from "next";

const pages = ["", "contact", "clients", "services", "courses", "blog"] as const;

export const dynamic = "force-static";

// URLs come from `pageUrl`, the same helper that builds canonicals, so they
// always carry the trailing slash `trailingSlash: true` serves. A mismatch
// would make every entry resolve through a redirect.
//
// `lastModified` is only set where we know the real date (blog posts).
// Stamping static pages with the build date tells Google everything changes
// on every deploy, and it learns to ignore the field.
const bothLanguages = (...segments: string[]) => ({
  languages: Object.fromEntries(
    Languages.map((locale) => [locale, pageUrl(locale, ...segments)]),
  ),
});

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = Languages.flatMap((locale) =>
    pages
      .filter((page) => page !== "blog" || getPostsFromLang(locale).length > 0)
      .map((page) => ({
        url: pageUrl(locale, page),
        changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
        priority: page === "" ? 1 : 0.8,
        alternates: bothLanguages(page),
      })),
  );

  // Course and service landings are the money pages for transactional
  // queries ("curso de X", "consultoría de software").
  const coursePages = Languages.flatMap((locale) =>
    COURSE_SLUGS.map((slug) => ({
      url: pageUrl(locale, "courses", slug),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: bothLanguages("courses", slug),
    })),
  );

  const servicePages = Languages.flatMap((locale) =>
    SERVICE_PAGE_SLUGS.map((slug) => ({
      url: pageUrl(locale, "services", slug),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: bothLanguages("services", slug),
    })),
  );

  const blogPages = Languages.flatMap((locale) =>
    getPostsFromLang(locale).map((post) => {
      const allLanguages = Languages.filter((l) =>
        getPostsFromLang(l).some((p) => p.slug === post.slug),
      );

      return {
        url: pageUrl(locale, "blog", post.slug),
        lastModified: new Date(post.updated),
        changeFrequency: "yearly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            allLanguages.map((l) => [l, pageUrl(l, "blog", post.slug)]),
          ),
        },
      };
    }),
  );

  return [...staticPages, ...coursePages, ...servicePages, ...blogPages];
}
