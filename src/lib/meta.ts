import { Language, Languages } from "@/i18n";
import { BlogPost, getPostsFromLang } from "@/lib/blog";
import { testimonials } from "@/lib/testimonials";
import { Metadata } from "next";

export const baseUrl =
  process.env.SITE_URL?.replace(/\/$/, "") ?? "https://www.codescouts.academy";

const defaultSocialImage = {
  url: `${baseUrl}/images/avatar.png`,
  width: 400,
  height: 400,
  alt: "CodeScouts",
};

const localeSegment = (locale: Language) => `/${locale}`;

const pageUrl = (locale: Language, ...segments: string[]) => {
  const path = segments.filter(Boolean).join("/");
  return `${baseUrl}${localeSegment(locale)}${path ? `/${path}` : ""}`;
};

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
  keywords,
  openGraphType = "website",
  image = defaultSocialImage,
  other,
  robots = defaultRobots,
  languages = Languages as Language[],
}: {
  locale: Language;
  pathSegments?: string[];
  title: string;
  description: string;
  keywords?: string[];
  openGraphType?: "website" | "article";
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  other?: Record<string, string>;
  robots?: Metadata["robots"];
  languages?: Language[];
}): Metadata => {
  const canonical = pageUrl(locale, ...pathSegments);

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    authors: [{ name: "CodeScouts", url: baseUrl }],
    creator: "CodeScouts",
    publisher: "CodeScouts",
    keywords: keywords?.join(", "),
    robots,
    alternates: {
      canonical,
      languages: {
        ...resolveAlternateLocales(languages, ...pathSegments),
        "x-default": pageUrl("es", ...pathSegments),
      },
    },
    openGraph: {
      title,
      description,
      type: openGraphType,
      url: canonical,
      siteName: "CodeScouts",
      locale: localeCode(locale),
      images: [image],
    },
    twitter: {
      card: image.width && image.width >= 800 ? "summary_large_image" : "summary",
      title,
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
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "CodeScouts",
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/images/avatar.png`,
    width: 400,
    height: 400,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+34-664-109-973",
    email: "hello@codescouts.academy",
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
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
          "Technical Coaching",
          "Consultoria de Software",
          "CTO as a Service",
          "Formacion tecnica",
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
      ? "Cursos de TDD, Clean Code, arquitectura de software y mas, bonificables por FUNDAE."
      : "TDD, Clean Code, software architecture courses and more, FUNDAE subsidized.",
});

export const blogPostSchema = (post: BlogPost, locale: Language, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.summary,
  image: `${baseUrl}${post.coverImage ?? "/images/avatar.png"}`,
  url: pageUrl(locale, "blog", slug),
  datePublished: post.date,
  dateModified: post.date,
  author: {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "CodeScouts",
  },
  publisher: { "@id": `${baseUrl}/#organization` },
  inLanguage: localeLanguage(locale),
  keywords: post.tags?.join(", "),
  ...(post.readingTime && {
    timeRequired: `PT${post.readingTime}M`,
  }),
});

export const blogsSchema = (locale: Language) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: locale === "es" ? "Blog de CodeScouts" : "CodeScouts Blog",
  description:
    locale === "es"
      ? "Articulos sobre desarrollo de software, TDD, Clean Code, arquitectura de software y mas."
      : "Articles on software development, TDD, Clean Code, software architecture and more.",
  url: pageUrl(locale, "blog"),
  publisher: { "@id": `${baseUrl}/#organization` },
  inLanguage: localeLanguage(locale),
});

export const generateRootRedirectMeta = (): Metadata => ({
  metadataBase: new URL(baseUrl),
  title: "CodeScouts",
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

export const generateHomeMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    title:
      locale === "es"
        ? "CodeScouts | Technical coaching para equipos de alto rendimiento"
        : "CodeScouts | Technical coaching for high-performance teams",
    description:
      locale === "es"
        ? "Mejora la calidad de tu software y acelera tu equipo de desarrollo con CodeScouts. Ofrecemos technical coaching, consultoria especializada, CTO as a Service y formacion tecnica para empresas."
        : "Improve your software quality and accelerate your development team with CodeScouts. We offer technical coaching, specialized consulting, CTO as a Service and custom technical training for companies.",
    keywords:
      locale === "es"
        ? [
            "technical coaching equipos",
            "consultoria software empresas",
            "cto as a service",
            "formacion tecnica equipos",
            "extreme programming",
            "clean code",
            "tdd",
            "arquitectura software",
            "pair programming",
            "mob programming",
            "calidad software",
          ]
        : [
            "technical coaching teams",
            "software consulting companies",
            "cto as a service",
            "technical training teams",
            "extreme programming",
            "clean code",
            "tdd",
            "software architecture",
            "pair programming",
            "mob programming",
            "software quality",
          ],
    other:
      locale === "es"
        ? {
            "contact:phone_number": "+34664109973",
            "contact:email": "hello@codescouts.academy",
          }
        : undefined,
  });

export const generateServicesMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    pathSegments: ["services"],
    title:
      locale === "es"
        ? "CodeScouts | Technical coaching, consultoria de software y CTO as a Service"
        : "CodeScouts | Technical coaching, software consulting and CTO as a Service",
    description:
      locale === "es"
        ? "Servicios de technical coaching, consultoria de software y CTO as a Service para equipos de desarrollo."
        : "Technical coaching, software consulting and CTO as a Service for development teams.",
    keywords:
      locale === "es"
        ? [
            "technical coaching equipos desarrollo",
            "consultoria software",
            "cto as a service espana",
            "asesoria tecnica empresas",
            "mejora calidad codigo",
          ]
        : [
            "technical coaching development teams",
            "software consulting",
            "cto as a service spain",
            "technical advisory companies",
            "code quality improvement",
          ],
    other: {
      "og:see_also": [pageUrl(locale, "clients"), pageUrl(locale, "contact")].join(","),
    },
  });

export const generateCoursesMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    pathSegments: ["courses"],
    title:
      locale === "es"
        ? "CodeScouts | Formacion tecnica para equipos de desarrollo"
        : "CodeScouts | Technical training for development teams",
    description:
      locale === "es"
        ? "Cursos a medida de TDD, Clean Code, arquitectura de software, pair programming y extreme programming para equipos."
        : "Custom TDD, Clean Code, software architecture, pair programming and extreme programming courses for teams.",
    keywords:
      locale === "es"
        ? [
            "cursos programacion equipos",
            "formacion tecnica desarrollo software",
            "curso tdd",
            "curso clean code",
            "arquitectura software curso",
            "pair programming curso",
          ]
        : [
            "team programming courses",
            "technical software development training",
            "tdd course",
            "clean code training",
            "software architecture course",
            "pair programming course",
          ],
    other: {
      "og:see_also": [pageUrl(locale, "services"), pageUrl(locale, "contact")].join(","),
    },
  });

export const generateClientsMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    pathSegments: ["clients"],
    title:
      locale === "es"
        ? "CodeScouts | Empresas que confian en nosotros"
        : "CodeScouts | Companies that trust us",
    description:
      locale === "es"
        ? "Descubre las empresas y equipos que han mejorado su desarrollo de software con CodeScouts."
        : "Discover the companies and teams that have improved their software development with CodeScouts.",
    keywords: testimonials.flatMap((testimonial) =>
      locale === "es"
        ? [
            `testimonio ${testimonial.name}`,
            `opinion ${testimonial.company}`,
            `caso de exito ${testimonial.company}`,
          ]
        : [
            `testimonial ${testimonial.name}`,
            `review ${testimonial.company}`,
            `success story ${testimonial.company}`,
          ],
    ),
    other: {
      "og:see_also": [pageUrl(locale, "services"), pageUrl(locale, "courses")].join(","),
    },
  });

export const generateContactMeta = (locale: Language): Metadata =>
  buildMetadata({
    locale,
    pathSegments: ["contact"],
    title:
      locale === "es"
        ? "CodeScouts | Hablemos de tu proyecto"
        : "CodeScouts | Let's talk about your project",
    description:
      locale === "es"
        ? "Contacta con CodeScouts para mejorar la calidad de tu software o acelerar tu equipo de desarrollo."
        : "Contact CodeScouts to improve your software quality or accelerate your development team.",
    keywords:
      locale === "es"
        ? [
            "contactar codescouts",
            "contratar technical coaching",
            "presupuesto consultoria software",
            "consulta coaching tecnico",
          ]
        : [
            "contact codescouts",
            "hire technical coaching",
            "software consulting quote",
            "technical coaching consultation",
          ],
    other: {
      "og:see_also": [pageUrl(locale, "services"), pageUrl(locale, "courses")].join(","),
      "contact:phone_number": "+34664109973",
      "contact:email": "hello@codescouts.academy",
      "geo.region": "ES-GA",
      "geo.placename": "Santiago de Compostela",
      "geo.position": "42.8782;-8.5448",
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
        ? "CodeScouts | Articulos sobre desarrollo de software"
        : "CodeScouts | Software Development Articles",
    description:
      locale === "es"
        ? "Articulos sobre TDD, Clean Code, arquitectura de software, metodologias agiles y coaching tecnico."
        : "Articles on TDD, Clean Code, software architecture, agile methodologies and technical coaching.",
    keywords: posts.flatMap((post) => [post.title, ...(post.tags ?? [])]).filter(Boolean),
    robots: hasPosts ? defaultRobots : noIndexRobots,
    languages: hasPosts ? [locale] : [locale],
    other: {
      "og:see_also": pageUrl(locale, "courses"),
    },
  });
};

export const generateBlogPostMeta = (
  post: BlogPost,
  locale: Language,
  slug: string,
): Metadata =>
  buildMetadata({
    locale,
    pathSegments: ["blog", slug],
    title: `${post.title} | CodeScouts`,
    description: post.summary,
    keywords: post.tags,
    openGraphType: "article",
    image: {
      url: `${baseUrl}${post.coverImage ?? "/images/avatar.png"}`,
      width: 1200,
      height: 630,
      alt: post.title,
    },
    languages: [locale],
    other: {
      "article:published_time": post.date,
      "article:modified_time": post.date,
      "article:section": "blog",
      ...(post.readingTime ? { "reading-time": `${post.readingTime} min` } : {}),
    },
  });
