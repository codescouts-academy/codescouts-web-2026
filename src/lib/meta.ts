import { Language, Languages } from "@/i18n";
import { BlogPost, getPostsFromLang } from "@/lib/blog";
import { Metadata } from "next";

export const baseUrl =
  process.env.SITE_URL?.replace(/\/$/, "") ?? "https://www.codescouts.academy";

const defaultSocialImage = {
  url: `${baseUrl}/images/avatar.png`,
  width: 1200,
  height: 630,
  alt: "CodeScouts — Technical coaching, consultoría y formación en Galicia",
};

/** Per-page OG image fallback for course/blog pages that don't have a custom one. */
const pageSocialImage = (name: string) => ({
  url: `${baseUrl}/images/avatar.png`,
  width: 1200,
  height: 630,
  alt: `${name} | CodeScouts`,
});

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

  // x-default must point to a page that actually exists. Prefer the default
  // locale, but fall back to the first available one (e.g. a post that only
  // has an English translation).
  const xDefaultLocale = languages.includes("es") ? "es" : languages[0];

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
        "x-default": pageUrl(xDefaultLocale, ...pathSegments),
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
  amenityFeature: [
    {
      "@type": "AdministrativeArea",
      name: "Galicia",
    },
    {
      "@type": "Country",
      name: "Spain",
    },
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
      "@id": `${baseUrl}/${locale}/courses/${slug}#course`,
      name: COURSES[slug].content[locale].name,
      url: pageUrl(locale, "courses", slug),
      provider: { "@id": `${baseUrl}/#organization` },
      inLanguage: localeLanguage(locale),
      educationalLevel: COURSES[slug].level[locale],
      timeRequired: `PT${COURSES[slug].durationHours.replace("-", "+")}H`,
      areaServed: [{ "@type": "Country", name: "Spain" }],
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        inLanguage: localeLanguage(locale),
        courseWorkload: `PT${COURSES[slug].durationHours.split("-").pop()}H`,
        courseSchedule: {
          "@type": "Schedule",
          repeatFrequency: "P1M",
          "startDate": new Date().toISOString().split("T")[0],
        },
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
    "@id": `${baseUrl}/${locale}/courses/${slug}#course`,
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
    title: `${content.metaTitle} | CodeScouts`,
    description: content.metaDescription,
    keywords: content.keywords,
    image: {
      url: `${baseUrl}/images/avatar.png`,
      width: 500,
      height: 500,
      alt: content.name,
    },
    other: {
      "og:see_also": [pageUrl(locale, "courses"), pageUrl(locale, "contact")].join(
        ",",
      ),
      "geo.region": "ES-GA",
      "geo.placename": "Santiago de Compostela, Galicia",
      "geo.position": "42.8782;-8.5448",
    },
  });
};

import { SERVICE_SLUGS, ServiceSlug, slugToTranslationKey } from "@/lib/services";
import { COURSES, courseSlugs, CourseSlug } from "@/lib/courses";
export { SERVICE_SLUGS, type ServiceSlug, slugToTranslationKey };

const serviceDetailMeta: Record<
  ServiceSlug,
  Record<Language, { title: string; description: string; keywords: string[] }>
> = {
  "technical-coaching": {
    es: {
      title: "CodeScouts | Technical Coaching para equipos de desarrollo",
      description:
        "Technical coaching para equipos de software. Mejora la calidad del codigo, aumenta la productividad y transfiere conocimiento con coaches expertos in-company.",
      keywords: [
        "technical coaching equipos",
        "coach tecnico empresas",
        "mejora calidad codigo",
        "transferencia conocimiento equipos",
        "pair programming coaching",
      ],
    },
    en: {
      title: "CodeScouts | Technical Coaching for software teams",
      description:
        "Technical coaching for software teams. Improve code quality, boost productivity and transfer knowledge with expert in-company coaches.",
      keywords: [
        "technical coaching teams",
        "software coach",
        "code quality improvement",
        "knowledge transfer teams",
        "pair programming coaching",
      ],
    },
  },
  "accelerated-program": {
    es: {
      title: "CodeScouts | Programa Acelerado para equipos de software",
      description:
        "Programa de formacion intensiva para equipos de desarrollo. Ramp up acelerado con planes personalizados y coaches con mas de 10 anos de experiencia.",
      keywords: [
        "programa acelerado desarrollo",
        "ramp up equipos software",
        "formacion intensiva programacion",
        "onboarding equipos tecnicos",
      ],
    },
    en: {
      title: "CodeScouts | Accelerated Program for software teams",
      description:
        "Intensive training program for development teams. Accelerated ramp-up with customized plans and coaches with 10+ years of experience.",
      keywords: [
        "accelerated program development",
        "team ramp up software",
        "intensive programming training",
        "technical team onboarding",
      ],
    },
  },
  "cto-as-service": {
    es: {
      title: "CodeScouts | CTO como Servicio para empresas tecnologicas",
      description:
        "CTO as a Service para empresas que necesitan definir su estrategia tecnologica, seleccionar tecnologias optimas y crecer de forma sostenible.",
      keywords: [
        "cto as a service espana",
        "director tecnologia outsourcing",
        "estrategia tecnologica empresas",
        "consultoria cto externalizado",
      ],
    },
    en: {
      title: "CodeScouts | CTO as a Service for tech companies",
      description:
        "CTO as a Service for companies that need to define their technology strategy, select optimal technologies and grow sustainably.",
      keywords: [
        "cto as a service spain",
        "fractional cto",
        "technology strategy consulting",
        "outsourced chief technology officer",
      ],
    },
  },
  "software-consulting": {
    es: {
      title: "CodeScouts | Consultoria de Software y mejora de producto",
      description:
        "Consultoria de software para identificar puntos de mejora en tu codigo y procesos. Plan iterativo para evolucionar tu producto con garantias.",
      keywords: [
        "consultoria software empresas",
        "mejora codigo legacy",
        "revision arquitectura software",
        "optimizacion producto digital",
        "asesoria tecnica desarrollo",
      ],
    },
    en: {
      title: "CodeScouts | Software Consulting and product improvement",
      description:
        "Software consulting to identify improvement points in your code and processes. Iterative plan to evolve your product with confidence.",
      keywords: [
        "software consulting companies",
        "legacy code improvement",
        "software architecture review",
        "digital product optimization",
        "technical development advisory",
      ],
    },
  },

  training: {
    es: {
      title: "CodeScouts | Formacion para equipos de desarrollo",
      description: "Formacion intensiva para equipos de desarrollo.",
      keywords: ["formacion equipos", "cursos programacion"],
    },
    en: {
      title: "CodeScouts | Training for software teams",
      description: "Intensive training for software development teams.",
      keywords: ["team training", "programming courses"],
    },
  },
};

export const generateServiceDetailMeta = (
  slug: ServiceSlug,
  locale: Language,
): Metadata => {
  const meta = serviceDetailMeta[slug]?.[locale];
  const translationKey = slugToTranslationKey[slug];

  return buildMetadata({
    locale,
    pathSegments: ["services", slug],
    title: meta?.title ?? "CodeScouts",
    description: meta?.description ?? "",
    keywords: meta?.keywords,
    other: {
      "og:see_also": [
        pageUrl(locale, "services"),
        pageUrl(locale, "contact"),
      ].join(","),
    },
  });
};

export const singleServiceSchema = (
  slug: ServiceSlug,
  locale: Language,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${baseUrl}/${locale}/services/${slug}#service`,
  provider: { "@id": `${baseUrl}/#organization` },
  name:
    locale === "es"
      ? ({
          "technical-coaching": "Technical Coaching",
          "accelerated-program": "Programa Acelerado",
          "cto-as-service": "CTO como Servicio",
          "software-consulting": "Consultoria de Software",
          "training": "Formacion",
        } as Record<ServiceSlug, string>)[slug]
      : ({
          "technical-coaching": "Technical Coaching",
          "accelerated-program": "Accelerated Program",
          "cto-as-service": "CTO as a Service",
          "software-consulting": "Software Consulting",
          "training": "Training",
        } as Record<ServiceSlug, string>)[slug],
  description: serviceDetailMeta[slug]?.[locale]?.description ?? "",
  areaServed: { "@type": "Country", name: "Spain" },
  inLanguage: localeLanguage(locale),
  url: pageUrl(locale, "services", slug),
});

export const breadcrumbSchema = (
  locale: Language,
  segments: { name: string; url: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${baseUrl}/${locale}/#breadcrumb`,
  name: "Breadcrumb",
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
      item: segment.url,
    })),
  ],
});

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

export const blogPostSchema = (
  post: BlogPost,
  locale: Language,
  slug: string,
  relatedCourseUrls: string[] = [],
  videoUrl?: string,
) => ({
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
  ...(relatedCourseUrls.length > 0 && {
    "seeAlso": relatedCourseUrls.join(","),
  }),
  ...(videoUrl ? { "og:video": videoUrl, "og:video:type": "text/html" } : {}),
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
        ? "CodeScouts | Coaching técnico, consultoría y formación en Galicia"
        : "CodeScouts | Technical coaching, consulting & training in Galicia",
    description:
      locale === "es"
        ? "CodeScouts ayuda a equipos de software a alcanzar la excelencia técnica. Ofrecemos technical coaching, consultoría de software, CTO as a Service y cursos bonificables por FUNDAE en Galicia y España: online en directo y presencial."
        : "CodeScouts helps software teams achieve technical excellence. We offer technical coaching, software consulting, CTO as a Service and FUNDAE-subsidized courses in Galicia and Spain: live online and onsite.",
    keywords:
      locale === "es"
        ? [
            "technical coaching equipos",
            "consultoria software empresas",
            "cto as a service",
            "formacion tecnica equipos",
            "cursos programacion galicia",
            "cursos bonificables fundae",
            "extreme programming",
            "clean code",
            "tdd",
            "arquitectura software",
            "pair programming",
            "mob programming",
            "calidad software",
            "formacion presencial galicia",
          ]
        : [
            "technical coaching teams",
            "software consulting companies",
            "cto as a service",
            "technical training teams",
            "programming courses galicia",
            "funded training spain",
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
            "geo.region": "ES-GA",
            "geo.placename": "Santiago de Compostela, Galicia",
            "geo.position": "42.8782;-8.5448",
          }
        : {
            "geo.region": "ES-GA",
            "geo.placename": "Santiago de Compostela, Galicia",
            "geo.position": "42.8782;-8.5448",
          },
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
        ? "Cursos para equipos de desarrollo en Galicia y España | Online y Presencial | CodeScouts"
        : "Training courses for development teams in Spain | Online & Onsite Galicia | CodeScouts",
    description:
      locale === "es"
        ? "Cursos a medida de TDD, Clean Code, arquitectura frontend, React y Next.js. Online en directo para toda España y presencial en Galicia. Bonificables por FUNDAE."
        : "Custom TDD, Clean Code, frontend architecture, React and Next.js courses. Live online across Spain and onsite in Galicia. FUNDAE subsidized.",
    keywords:
      locale === "es"
        ? [
            "cursos programacion equipos",
            "cursos programacion galicia",
            "formacion tecnica desarrollo software españa",
            "curso tdd",
            "curso clean code",
            "curso arquitectura frontend",
            "cursos bonificables fundae",
            "formacion presencial galicia",
            "curso react online",
          ]
        : [
            "team programming courses",
            "technical software development training spain",
            "tdd course",
            "clean code training",
            "frontend architecture course",
            "onsite training galicia",
          ],
    other: {
      "og:see_also": [pageUrl(locale, "services"), pageUrl(locale, "contact")].join(","),
      "geo.region": "ES-GA",
      "geo.placename": "Santiago de Compostela, Galicia",
      "geo.position": "42.8782;-8.5448",
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
    keywords:
      locale === "es"
        ? [
            "casos de exito technical coaching",
            "clientes consultoria software",
            "opiniones codescouts",
            "referencias equipos desarrollo",
          ]
        : [
            "technical coaching success stories",
            "software consulting clients",
            "codescouts reviews",
            "development team references",
          ],
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
    // Deduplicated topic tags only. Dumping every post title in here is
    // keyword stuffing and Google has ignored the keywords meta since 2009.
    keywords: [...new Set(posts.flatMap((post) => post.tags ?? []))].filter(Boolean),
    robots: hasPosts ? defaultRobots : noIndexRobots,
    languages: (Languages as Language[]).filter(
      (language) => getPostsFromLang(language).length > 0,
    ),
    other: {
      "og:see_also": pageUrl(locale, "courses"),
    },
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

export const videoObjectSchema = (
  postTitle: string,
  videoUrl: string,
): object => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: postTitle,
  description: `Video about ${postTitle} | CodeScouts`,
  thumbnailUrl: `${baseUrl}/images/avatar.png`,
  uploadDate: new Date().toISOString(),
  contentUrl: videoUrl,
  embedUrl: videoUrl,
  publisher: { "@id": `${baseUrl}/#organization` },
});

export const howToEnrollSchema = (locale: Language) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name:
    locale === "es"
      ? "Cómo inscribirse en un curso de CodeScouts"
      : "How to enroll in a CodeScouts course",
  description:
    locale === "es"
      ? "Solicita información, recibe una llamada y confirma tu plaza en el curso."
      : "Request information, receive a call, and confirm your seat in the course.",
  totalTime: "PT7D",
  step: [
    {
      "@type": "HowToStep",
      name:
        locale === "es" ? "Solicitar información" : "Request information",
      text:
        locale === "es"
          ? "Contacta con CodeScouts indicando el curso que te interesa y tu disponibilidad."
          : "Contact CodeScouts indicating the course that interests you and your availability.",
    },
    {
      "@type": "HowToStep",
      name:
        locale === "es" ? "Llamada de asesoría" : "Advisory call",
      text:
        locale === "es"
          ? "Recibe una llamada para resolver dudas y validar tu perfil."
          : "Receive a call to resolve doubts and validate your profile.",
    },
    {
      "@type": "HowToStep",
      name:
        locale === "es" ? "Confirmar y bonificar" : "Confirm and enroll",
      text:
        locale === "es"
          ? "Confirma tu plaza y gestionamos la bonificación por FUNDAE."
          : "Confirm your seat and we handle the FUNDAE subsidy.",
    },
  ],
});

export const generateBlogPostMeta = (
  post: BlogPost,
  locale: Language,
  slug: string,
  relatedCourseUrls: string[] = [],
  videoUrl?: string,
): Metadata => {
  const section = post.tags?.[0] ?? "blog";
  const related = [
    ...relatedCourseUrls,
    pageUrl(locale, "courses"),
  ];
  const other: Record<string, string> = {
    "article:published_time": post.date,
    "article:modified_time": post.date,
    "article:section": section,
    ...(post.author ? { "article:author": post.author } : {}),
    ...(post.readingTime ? { "reading-time": `${post.readingTime} min` } : {}),
    "og:see_also": related.join(","),
  };
  if (videoUrl) {
    other["og:video"] = videoUrl;
    other["og:video:type"] = "text/html";
  }
  return buildMetadata({
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
    languages: localesWithPost(slug),
    other,
  });
};
