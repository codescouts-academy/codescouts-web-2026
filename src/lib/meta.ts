import { Language, Languages } from "@/i18n";
import { BlogPost, getPostsFromLang } from "@/lib/blog";
import { Metadata } from "next";

export const baseUrl =
  process.env.SITE_URL?.replace(/\/$/, "") ?? "https://www.codescouts.academy";

const BRAND = "CodeScouts";

/**
 * Absolute URL of a page, with the trailing slash that `trailingSlash: true`
 * serves. Next only normalises metadata URLs, not JSON-LD, so every URL we
 * emit (canonical, hreflang, schema) goes through here to stay identical.
 */
export const pageUrl = (locale: Language, ...segments: string[]) => {
  const path = segments.filter(Boolean).join("/");
  return `${baseUrl}/${locale}/${path ? `${path}/` : ""}`;
};

/** The page's 1200x630 social card (see src/lib/og.tsx). */
export const ogImageUrl = (locale: Language, ...segments: string[]) =>
  `${pageUrl(locale, ...segments)}og.png`.replace(`${baseUrl}/`, `${baseUrl}/og/`);

const feedUrl = (locale: Language) =>
  `${baseUrl}/${locale === "es" ? "feed.xml" : "feed-en.xml"}`;

const resolveAlternateLocales = (
  locales: Language[] = Languages as Language[],
  ...segments: string[]
) =>
  Object.fromEntries(locales.map((locale) => [locale, pageUrl(locale, ...segments)]));

const localeCode = (locale: Language) => (locale === "es" ? "es_ES" : "en_US");
const localeLanguage = (locale: Language) =>
  locale === "es" ? "es-ES" : "en-US";

const defaultRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

const buildMetadata = ({
  locale,
  pathSegments = [],
  title,
  description,
  openGraphType = "website",
  article,
  other,
  robots = defaultRobots,
  languages = Languages as Language[],
}: {
  locale: Language;
  pathSegments?: string[];
  /** Page title without the brand: " | CodeScouts" is appended here. */
  title: string;
  description: string;
  openGraphType?: "website" | "article";
  /** Rendered as `article:*` OpenGraph properties when type is "article". */
  article?: {
    publishedTime: string;
    modifiedTime: string;
    section?: string;
    tags?: string[];
  };
  other?: Record<string, string>;
  robots?: Metadata["robots"];
  languages?: Language[];
}): Metadata => {
  const canonical = pageUrl(locale, ...pathSegments);

  // x-default must point to a page that actually exists. Prefer the default
  // locale, but fall back to the first available one (e.g. a post that only
  // has an English translation).
  const xDefaultLocale = languages.includes("es") ? "es" : languages[0];
  const fullTitle = `${title} | ${BRAND}`;

  const image = {
    url: ogImageUrl(locale, ...pathSegments),
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description,
    authors: [{ name: BRAND, url: baseUrl }],
    creator: BRAND,
    publisher: BRAND,
    robots,
    alternates: {
      canonical,
      languages: {
        ...resolveAlternateLocales(languages, ...pathSegments),
        "x-default": pageUrl(xDefaultLocale, ...pathSegments),
      },
      types: { "application/rss+xml": feedUrl(locale) },
    },
    openGraph: {
      title: fullTitle,
      description,
      ...(openGraphType === "article" && article
        ? { type: "article", ...article }
        : { type: "website" }),
      url: canonical,
      siteName: BRAND,
      locale: localeCode(locale),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
      creator: "@code_scouts",
      site: "@code_scouts",
    },
    other,
  };
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${baseUrl}/#organization`,
  name: "CodeScouts",
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/images/avatar.png`,
    width: 500,
    height: 500,
  },
  image: `${baseUrl}/images/avatar.png`,
  description:
    "Technical coaching, consultoría de software y formación técnica para equipos de desarrollo en Galicia y España.",
  email: "hello@codescouts.academy",
  telephone: "+34-664-109-973",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+34-664-109-973",
    email: "hello@codescouts.academy",
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
    areaServed: { "@type": "Country", name: "Spain" },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago de Compostela",
    addressRegion: "Galicia",
    addressCountry: "ES",
  },
  sameAs: [
    "https://twitter.com/code_scouts",
    "https://www.linkedin.com/company/codescouts",
  ],
  knowsLanguage: ["es", "en"],
  foundingDate: "2020",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2, maxValue: 10 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
    validFrom: "2020",
  },
  priceRange: "€€",
  areaServed: [
    { "@type": "Country", name: "Spain" },
    { "@type": "AdministrativeArea", name: "Galicia" },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  url: baseUrl,
  name: "CodeScouts",
  publisher: { "@id": `${baseUrl}/#organization` },
  inLanguage: ["es-ES", "en-US"],
};

export const serviceSchema = (locale: Language) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  provider: { "@id": `${baseUrl}/#organization` },
  serviceType:
    locale === "es"
      ? [
          "Technical coaching",
          "Consultoría de software",
          "CTO as a Service",
          "Formación técnica para equipos",
        ]
      : [
          "Technical Coaching",
          "Software Consulting",
          "CTO as a Service",
          "Technical Training",
        ],
  areaServed: { "@type": "Country", name: "Spain" },
  inLanguage: localeLanguage(locale),
  url: pageUrl(locale, "services"),
});

export const coursesSchema = (locale: Language) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: locale === "es" ? "Cursos de CodeScouts" : "CodeScouts Courses",
  url: pageUrl(locale, "courses"),
  provider: { "@id": `${baseUrl}/#organization` },
  inLanguage: localeLanguage(locale),
  description:
    locale === "es"
      ? "Cursos de TDD, Clean Code, arquitectura frontend y más en Galicia y España: online en directo y presencial. Bonificables por FUNDAE."
      : "TDD, Clean Code, frontend architecture courses and more in Spain: live online and onsite in Galicia. FUNDAE subsidized.",
  numberOfItems: courseSlugs().length,
  itemListElement: courseSlugs().map((slug, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: pageUrl(locale, "courses", slug),
    name: COURSES[slug].content[locale].name,
    item: {
      "@type": "Course",
      "@id": `${pageUrl(locale, "courses", slug)}#course`,
      name: COURSES[slug].content[locale].name,
      url: pageUrl(locale, "courses", slug),
      provider: { "@id": `${baseUrl}/#organization` },
      inLanguage: localeLanguage(locale),
      educationalLevel: COURSES[slug].level[locale],
      timeRequired: `PT${COURSES[slug].durationHours.replace("-", "+")}H`,
      areaServed: [{ "@type": "Country", name: "Spain" }],
      // Courses are scheduled on demand with each company, so there is no
      // real start date to publish (a build-time date would be false).
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        inLanguage: localeLanguage(locale),
        courseWorkload: `PT${COURSES[slug].durationHours.split("-").pop()}H`,
      },
    },
  })),
});

export const courseDetailSchema = (slug: CourseSlug, locale: Language) => {
  const course = COURSES[slug];
  const content = course.content[locale];
  // Duration can be a range ("16-20"): ISO 8601 needs a single value,
  // so schemas use the upper bound while the UI keeps showing the range.
  const maxHours = course.durationHours.split("-").pop();
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${pageUrl(locale, "courses", slug)}#course`,
    name: content.h1,
    description: content.metaDescription,
    url: pageUrl(locale, "courses", slug),
    provider: {
      "@id": `${baseUrl}/#organization`,
      "@type": "Organization",
      name: "CodeScouts",
      url: baseUrl,
    },
    inLanguage: localeLanguage(locale),
    educationalLevel: course.level[locale],
    timeRequired: `PT${maxHours}H`,
    teaches: content.outcomes,
    // Price is quoted per company (and often FUNDAE-subsidised), so only
    // the offer category is declared.
    offers: { "@type": "Offer", category: "Paid" },
    // Local SEO: the course is available everywhere in Spain (online)
    // and onsite in Galicia. Both must be explicit so Google can match
    // "curso X en Galicia" and "curso X España / online" queries.
    areaServed: [
      { "@type": "Country", name: "Spain" },
      {
        "@type": "AdministrativeArea",
        name: "Galicia",
        containedInPlace: { "@type": "Country", name: "Spain" },
      },
    ],
    locationCreated: {
      "@type": "Place",
      name: "Santiago de Compostela, Galicia, España",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago de Compostela",
        addressRegion: "Galicia",
        addressCountry: "ES",
      },
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: content.name,
        courseMode: "online",
        inLanguage: localeLanguage(locale),
        courseWorkload: `PT${maxHours}H`,
      },
      {
        "@type": "CourseInstance",
        name: content.name,
        courseMode: "onsite",
        inLanguage: localeLanguage(locale),
        courseWorkload: `PT${maxHours}H`,
        location: {
          "@type": "Place",
          name: "Galicia, España",
          address: {
            "@type": "PostalAddress",
            addressRegion: "Galicia",
            addressCountry: "ES",
          },
        },
      },
    ],
  };
};

export const generateCourseDetailMeta = (
  slug: CourseSlug,
  locale: Language,
): Metadata => {
  const course = COURSES[slug];
  const content = course.content[locale];
  return buildMetadata({
    locale,
    pathSegments: ["courses", slug],
    title: content.metaTitle,
    description: content.metaDescription,
    other: {
      "geo.region": "ES-GA",
      "geo.placename": "Santiago de Compostela, Galicia",
      "geo.position": "42.8782;-8.5448",
    },
  });
};

import { SERVICE_SLUGS, ServiceSlug, slugToTranslationKey } from "@/lib/services";
import { COURSES, courseSlugs, CourseSlug } from "@/lib/courses";
export { SERVICE_SLUGS, type ServiceSlug, slugToTranslationKey };

/** Services that render their own page (`training` redirects to /courses/). */
export const SERVICE_PAGE_SLUGS = SERVICE_SLUGS.filter(
  (slug): slug is Exclude<ServiceSlug, "training"> => slug !== "training",
);

type ServicePageSlug = (typeof SERVICE_PAGE_SLUGS)[number];

const serviceDetailMeta: Record<
  ServicePageSlug,
  Record<Language, { name: string; title: string; description: string }>
> = {
  "technical-coaching": {
    es: {
      name: "Technical coaching",
      title: "Technical coaching para equipos de desarrollo",
      description:
        "Technical coaching para equipos de software: un coach trabaja con tu equipo sobre vuestro producto real para mejorar la calidad del código y entregar más rápido.",
    },
    en: {
      name: "Technical coaching",
      title: "Technical coaching for software teams",
      description:
        "Technical coaching for software teams: a coach works with your team on your real product to improve code quality, reduce technical debt and ship faster.",
    },
  },
  "accelerated-program": {
    es: {
      name: "Programa acelerado",
      title: "Programa acelerado de onboarding para equipos",
      description:
        "Programa acelerado para que las nuevas incorporaciones de tu equipo de desarrollo sean productivas antes: plan a medida y coaches con más de 10 años de experiencia.",
    },
    en: {
      name: "Accelerated program",
      title: "Accelerated onboarding program for software teams",
      description:
        "Accelerated program to get new developers productive sooner: a custom ramp-up plan and hands-on coaching from engineers with 10+ years of experience.",
    },
  },
  "cto-as-service": {
    es: {
      name: "CTO as a Service",
      title: "CTO as a Service (CTO externo) para empresas",
      description:
        "CTO as a Service para empresas: un CTO externo que define vuestra estrategia tecnológica, elige las tecnologías adecuadas y ayuda a crecer de forma sostenible.",
    },
    en: {
      name: "CTO as a Service",
      title: "CTO as a Service (fractional CTO) for companies",
      description:
        "CTO as a Service for companies: a fractional CTO who defines your technology strategy, picks the right technologies and helps your team grow sustainably.",
    },
  },
  "software-consulting": {
    es: {
      name: "Consultoría de software",
      title: "Consultoría de software para empresas",
      description:
        "Consultoría de software para empresas: detectamos los puntos de mejora de tu código y procesos y definimos un plan iterativo para evolucionar tu producto.",
    },
    en: {
      name: "Software consulting",
      title: "Software consulting for companies",
      description:
        "Software consulting for companies: we find the improvement points in your code and processes and build an iterative plan to evolve your product safely.",
    },
  },
};

export const serviceName = (slug: ServicePageSlug, locale: Language) =>
  serviceDetailMeta[slug][locale].name;

export const generateServiceDetailMeta = (
  slug: ServicePageSlug,
  locale: Language,
): Metadata => {
  const meta = serviceDetailMeta[slug][locale];

  return buildMetadata({
    locale,
    pathSegments: ["services", slug],
    title: meta.title,
    description: meta.description,
  });
};

export const singleServiceSchema = (
  slug: ServicePageSlug,
  locale: Language,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl(locale, "services", slug)}#service`,
  provider: { "@id": `${baseUrl}/#organization` },
  name: serviceDetailMeta[slug][locale].name,
  description: serviceDetailMeta[slug][locale].description,
  areaServed: { "@type": "Country", name: "Spain" },
  inLanguage: localeLanguage(locale),
  url: pageUrl(locale, "services", slug),
});

/**
 * Segments are page paths under the locale (e.g. ["courses", slug]), so the
 * items are always absolute, trailing-slashed URLs and the `@id` is unique
 * per page.
 */
export const breadcrumbSchema = (
  locale: Language,
  segments: { name: string; path: string[] }[],
) => {
  const last = segments.at(-1);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl(locale, ...(last?.path ?? []))}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "es" ? "Inicio" : "Home",
        item: pageUrl(locale),
      },
      ...segments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: segment.name,
        item: pageUrl(locale, ...segment.path),
      })),
    ],
  };
};

export const faqSchema = (
  questions: { question: string; answer: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer,
    },
  })),
});

export const blogPostSchema = (post: BlogPost, locale: Language, slug: string) => {
  const url = pageUrl(locale, "blog", slug);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.summary,
    image: ogImageUrl(locale, "blog", slug),
    url,
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: BRAND,
    },
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage: localeLanguage(locale),
    keywords: post.tags?.join(", "),
    ...(post.readingTime && {
      timeRequired: `PT${post.readingTime}M`,
    }),
  };
};

export const blogsSchema = (locale: Language) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${pageUrl(locale, "blog")}#blog`,
  name: locale === "es" ? "Blog de CodeScouts" : "CodeScouts Blog",
  description:
    locale === "es"
      ? "Artículos sobre desarrollo de software, TDD, Clean Code, arquitectura de software y más."
      : "Articles on software development, TDD, Clean Code, software architecture and more.",
  url: pageUrl(locale, "blog"),
  publisher: { "@id": `${baseUrl}/#organization` },
  inLanguage: localeLanguage(locale),
});

export const generateRootRedirectMeta = (): Metadata => ({
  metadataBase: new URL(baseUrl),
  title: BRAND,
  description:
    "Technical coaching, software consulting and custom training for development teams.",
  robots: noIndexRobots,
  alternates: {
    canonical: pageUrl("es"),
    languages: {
      es: pageUrl("es"),
      en: pageUrl("en"),
      "x-default": pageUrl("es"),
    },
  },
});

const geoMeta = {
  "geo.region": "ES-GA",
  "geo.placename": "Santiago de Compostela, Galicia",
  "geo.position": "42.8782;-8.5448",
};

export const generateHomeMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    title:
      locale === "es"
        ? "Technical coaching y cursos para equipos de desarrollo"
        : "Technical coaching and training for software teams",
    description:
      locale === "es"
        ? "Ayudamos a empresas a mejorar sus equipos de software: technical coaching, consultoría, CTO as a Service y cursos bonificables por FUNDAE. Online y en Galicia."
        : "We help companies level up their software teams: technical coaching, consulting, CTO as a Service and FUNDAE-subsidised courses. Online and onsite in Galicia.",
    other:
      locale === "es"
        ? {
            "contact:phone_number": "+34664109973",
            "contact:email": "hello@codescouts.academy",
            ...geoMeta,
          }
        : geoMeta,
  });

export const generateServicesMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    pathSegments: ["services"],
    title:
      locale === "es"
        ? "Technical coaching, consultoría y CTO as a Service"
        : "Technical coaching, software consulting & CTO as a Service",
    description:
      locale === "es"
        ? "Servicios para empresas con equipos de software: technical coaching, consultoría de software, CTO as a Service y programa acelerado de onboarding."
        : "Services for companies with software teams: technical coaching, software consulting, CTO as a Service and an accelerated onboarding program.",
  });

export const generateCoursesMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    pathSegments: ["courses"],
    title:
      locale === "es"
        ? "Cursos para equipos de desarrollo bonificables FUNDAE"
        : "Training courses for software development teams",
    description:
      locale === "es"
        ? "Cursos para empresas de TDD, Clean Code, arquitectura frontend, DDD, React y Next.js. Adaptados a tu equipo, online o presencial en Galicia. Bonificables FUNDAE."
        : "Company training in TDD, Clean Code, frontend architecture, DDD, React and Next.js, tailored to your team. Live online or onsite in Galicia. FUNDAE subsidised.",
    other: geoMeta,
  });

export const generateClientsMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    pathSegments: ["clients"],
    title:
      locale === "es"
        ? "Empresas que confían en nosotros"
        : "Companies that trust us",
    description:
      locale === "es"
        ? "Descubre las empresas y equipos que han mejorado su desarrollo de software con el technical coaching, la consultoría y los cursos de CodeScouts."
        : "Discover the companies and teams that have improved their software development with CodeScouts technical coaching, consulting and training.",
  });

export const generateContactMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    pathSegments: ["contact"],
    title:
      locale === "es" ? "Contacto: hablemos de tu equipo" : "Contact: let's talk about your team",
    description:
      locale === "es"
        ? "Cuéntanos qué necesita tu equipo de desarrollo: un curso adaptado, technical coaching, consultoría de software o un CTO externo. Hablemos de tu proyecto."
        : "Tell us what your development team needs: a tailored course, technical coaching, software consulting or a fractional CTO. Let's talk about your project.",
    other: {
      "contact:phone_number": "+34664109973",
      "contact:email": "hello@codescouts.academy",
      ...geoMeta,
    },
  });

export const generateBlogListMeta = (locale: Language): Metadata => {
  const posts = getPostsFromLang(locale);
  const hasPosts = posts.length > 0;

  return buildMetadata({
    locale,
    pathSegments: ["blog"],
    title:
      locale === "es"
        ? "Blog: artículos sobre desarrollo de software"
        : "Blog: software development articles",
    description:
      locale === "es"
        ? "Artículos sobre TDD, Clean Code, arquitectura de software, metodologías ágiles y technical coaching para equipos de desarrollo."
        : "Articles on TDD, Clean Code, software architecture, agile methodologies and technical coaching for development teams.",
    robots: hasPosts ? defaultRobots : noIndexRobots,
    languages: (Languages as Language[]).filter(
      (language) => getPostsFromLang(language).length > 0,
    ),
  });
};

/**
 * Locales that actually contain a translation of this slug.
 * hreflang must be RECIPROCAL: if /es/blog/solid/ does not point to
 * /en/blog/solid/ (and vice versa), Google discards the whole cluster and
 * treats both pages as competing duplicates.
 */
const localesWithPost = (slug: string): Language[] =>
  (Languages as Language[]).filter((language) =>
    getPostsFromLang(language).some((post) => post.slug === slug),
  );

export const videoObjectSchema = (post: BlogPost, videoId: string): object => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: post.title,
  description: post.summary,
  thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  // The video's real upload date isn't stored; the post date is the closest
  // stable value (never the build date, which changes on every deploy).
  uploadDate: post.date,
  contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
  embedUrl: `https://www.youtube.com/embed/${videoId}`,
  publisher: { "@id": `${baseUrl}/#organization` },
});

export const generateBlogPostMeta = (
  post: BlogPost,
  locale: Language,
  slug: string,
  videoId?: string,
): Metadata => {
  const other: Record<string, string> = {};
  if (videoId) {
    other["og:video"] = `https://www.youtube.com/embed/${videoId}`;
    other["og:video:type"] = "text/html";
  }
  return buildMetadata({
    locale,
    pathSegments: ["blog", slug],
    title: post.title,
    description: post.summary,
    openGraphType: "article",
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      section: post.tags?.[0] ?? "blog",
      tags: post.tags,
    },
    languages: localesWithPost(slug),
    other,
  });
};
