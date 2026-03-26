import { Language } from "@/i18n";
import { BlogPost, getPostsFromLang } from "@/lib/blog";
import { testimonials } from "@/lib/testimonials";
import { Metadata } from "next";

const baseUrl = process.env.SITE_URL ?? "https://www.codescouts.academy";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Canonical URL helper — keeps Spanish at root, English under /en */
const pageUrl = (locale: Language, ...segments: string[]) => {
  const path = segments.filter(Boolean).join("/");
  return locale === "es"
    ? `${baseUrl}${path ? `/${path}` : ""}`
    : `${baseUrl}/en${path ? `/${path}` : ""}`;
};

/** hreflang alternates — always provide both languages */
const langAlternates = (...segments: string[]) => ({
  en: pageUrl("en", ...segments),
  es: pageUrl("es", ...segments),
  "x-default": pageUrl("es", ...segments), // default to Spanish (main market)
});

/** Default robots config — reuse everywhere */
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

// ─────────────────────────────────────────────
// JSON-LD Schemas
// ─────────────────────────────────────────────

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
  inLanguage: ["es", "en"]
};

export const serviceSchema = (locale: Language) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  provider: { "@id": `${baseUrl}/#organization` },
  serviceType:
    locale === "es"
      ? ["Technical Coaching", "Consultoría de Software", "CTO as a Service", "Formación técnica"]
      : ["Technical Coaching", "Software Consulting", "CTO as a Service", "Technical Training"],
  areaServed: { "@type": "Country", name: "Spain" },
  url: pageUrl(locale, "services"),
});

export const coursesSchema = (locale: Language) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: locale === "es" ? "Cursos de CodeScouts" : "CodeScouts Courses",
  url: pageUrl(locale, "courses"),
  provider: { "@id": `${baseUrl}/#organization` },
  description:
    locale === "es"
      ? "Cursos de TDD, Clean Code, arquitectura de software y más, bonificables por FUNDAE."
      : "TDD, Clean Code, software architecture courses and more, FUNDAE subsidized.",
});

export const blogPostSchema = (post: BlogPost, locale: Language, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.summary,
  image: `${baseUrl}${post.coverImage}`,
  url: pageUrl(locale, "blog", slug),
  datePublished: post.date,
  dateModified: post.date,
  author: {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "CodeScouts",
  },
  publisher: { "@id": `${baseUrl}/#organization` },
  inLanguage: locale === "en" ? "en-US" : "es-ES",
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
      ? "Artículos sobre desarrollo de software, TDD, Clean Code, arquitectura de software y más."
      : "Articles on software development, TDD, Clean Code, software architecture and more.",
  url: pageUrl(locale, "blog"),
  publisher: { "@id": `${baseUrl}/#organization` },
  inLanguage: locale === "en" ? "en-US" : "es-ES",
});

// ─────────────────────────────────────────────
// Page metadata generators
// ─────────────────────────────────────────────

export const generateHomeMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";
  const url = pageUrl(locale);
  const imageUrl = `${baseUrl}/images/og/home.png`;

  const title = isSpanish
    ? "CodeScouts | Technical coaching para equipos de alto rendimiento"
    : "CodeScouts | Technical coaching for high-performance teams";

  const description = isSpanish
    ? "Mejora la calidad de tu software y acelera tu equipo de desarrollo con CodeScouts. Ofrecemos technical coaching, consultoría especializada, CTO as a Service, programa acelerado y formación técnica a medida para empresas."
    : "Improve your software quality and accelerate your development team with CodeScouts. We offer technical coaching, specialized consulting, CTO as a Service, accelerated program and custom technical training for companies.";

  const keywords = isSpanish
    ? [
      "technical coaching equipos",
      "consultoría software empresas",
      "cto as a service",
      "programa acelerado desarrollo software",
      "formación técnica equipos",
      "extreme programming",
      "clean code",
      "tdd test driven development",
      "arquitectura software",
      "pair programming",
      "mob programming",
      "refactoring código legacy",
      "mejora continua equipos desarrollo",
      "calidad software",
      "buenas prácticas programación",
      "codescouts",
    ]
    : [
      "technical coaching teams",
      "software consulting companies",
      "cto as a service",
      "accelerated software development program",
      "technical training teams",
      "extreme programming",
      "clean code",
      "tdd test driven development",
      "software architecture",
      "pair programming",
      "mob programming",
      "legacy code refactoring",
      "continuous improvement development teams",
      "software quality",
      "programming best practices",
      "codescouts",
    ];

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    authors: [{ name: "CodeScouts", url: baseUrl }],
    keywords: keywords.join(", "),
    creator: "CodeScouts",
    publisher: "CodeScouts",

    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "CodeScouts",
      locale: isSpanish ? "es_ES" : "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      phoneNumbers: "+34664109973",
      emails: "hello@codescouts.academy",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@code_scouts",
      site: "@code_scouts",
    },

    alternates: {
      canonical: url,
      languages: langAlternates(),
    },

    robots: defaultRobots,
  };
};

export const generateServicesMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";
  const url = pageUrl(locale, "services");
  const imageUrl = `${baseUrl}/images/og/services.png`;

  const title = isSpanish
    ? "CodeScouts | Technical coaching, consultoría de software y CTO as a Service"
    : "CodeScouts | Technical coaching, software consulting and CTO as a Service";

  const description = isSpanish
    ? "Servicios de technical coaching, consultoría de software y CTO as a Service para equipos de desarrollo. Mejora la calidad de tu código y acelera tus entregas con nuestros expertos."
    : "Technical coaching, software consulting and CTO as a Service for development teams. Improve your code quality and accelerate your deliveries with our experts.";

  const keywords = isSpanish
    ? [
      "technical coaching equipos desarrollo",
      "consultoría software",
      "cto as a service españa",
      "programa acelerado desarrollo software",
      "asesoría técnica empresas",
      "coaching programadores",
      "mejora calidad código",
      "acompañamiento técnico equipo",
    ]
    : [
      "technical coaching development teams",
      "software consulting",
      "cto as a service spain",
      "accelerated development program",
      "technical advisory companies",
      "developer coaching",
      "code quality improvement",
      "technical team mentoring",
    ];

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    authors: [{ name: "CodeScouts", url: baseUrl }],
    keywords: keywords.join(", "),
    creator: "CodeScouts",
    publisher: "CodeScouts",

    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "CodeScouts",
      locale: isSpanish ? "es_ES" : "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@code_scouts",
      site: "@code_scouts",
    },

    alternates: {
      canonical: url,
      languages: langAlternates("services"),
    },

    robots: defaultRobots,

    other: {
      "og:see_also": [pageUrl(locale, "clients"), pageUrl(locale, "contact")].join(","),
    },
  };
};

export const generateCoursesMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";
  const url = pageUrl(locale, "courses");
  const imageUrl = `${baseUrl}/images/og/courses.png`;

  const title = isSpanish
    ? "CodeScouts | Formación técnica para equipos de desarrollo"
    : "CodeScouts | Technical training for development teams";

  const description = isSpanish
    ? "Cursos a medida de TDD, Clean Code, arquitectura de software, pair programming y extreme programming para equipos. Formación presencial y online. Bonificable por FUNDAE."
    : "Custom TDD, Clean Code, software architecture, pair programming and extreme programming courses for teams. In-person and online training. FUNDAE subsidized.";

  const keywords = isSpanish
    ? [
      "cursos programación equipos",
      "formación técnica desarrollo software",
      "curso tdd test driven development",
      "curso clean code",
      "arquitectura software curso",
      "pair programming curso",
      "extreme programming formación",
      "cursos a medida empresa",
      "formación bonificada fundae",
      "refactoring curso",
      "buenas prácticas programación curso",
      "mob programming taller",
      "curso clean architecture",
      "domain driven design formación",
    ]
    : [
      "team programming courses",
      "technical software development training",
      "tdd test driven development course",
      "clean code training",
      "software architecture course",
      "pair programming course",
      "extreme programming training",
      "custom company courses",
      "fundae subsidized training",
      "refactoring course",
      "programming best practices course",
      "mob programming workshop",
      "clean architecture course",
      "domain driven design training",
    ];

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    authors: [{ name: "CodeScouts", url: baseUrl }],
    keywords: keywords.join(", "),
    creator: "CodeScouts",
    publisher: "CodeScouts",

    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "CodeScouts",
      locale: isSpanish ? "es_ES" : "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@code_scouts",
      site: "@code_scouts",
    },

    alternates: {
      canonical: url,
      languages: langAlternates("courses"),
    },

    robots: defaultRobots,

    other: {
      "og:see_also": [
        pageUrl(locale, "services/technical-coaching"),
        pageUrl(locale, "contact"),
      ].join(","),
    },
  };
};

export const generateClientsMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";
  const url = pageUrl(locale, "clients");
  const imageUrl = `${baseUrl}/images/og/clients.png`;

  const title = isSpanish
    ? "CodeScouts | Empresas que confían en nosotros"
    : "CodeScouts | Companies that trust us";

  const description = isSpanish
    ? "Descubre las empresas y equipos que han mejorado su desarrollo de software con CodeScouts. Casos de éxito en technical coaching, consultoría y formación de equipos de desarrollo."
    : "Discover the companies and teams that have improved their software development with CodeScouts. Success stories in technical coaching, consulting and development team training.";

  const keywords = testimonials.flatMap((t) =>
    isSpanish
      ? [`testimonio ${t.name}`, `opinión ${t.company}`, `caso de éxito ${t.company}`]
      : [`testimonial ${t.name}`, `review ${t.company}`, `success story ${t.company}`]
  );

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    authors: [{ name: "CodeScouts", url: baseUrl }],
    keywords: keywords.join(", "),
    creator: "CodeScouts",
    publisher: "CodeScouts",

    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "CodeScouts",
      locale: isSpanish ? "es_ES" : "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@code_scouts",
      site: "@code_scouts",
    },

    alternates: {
      canonical: url,
      languages: langAlternates("clients"),
    },

    robots: defaultRobots,

    other: {
      "og:see_also": [pageUrl(locale, "services"), pageUrl(locale, "about")].join(","),
    },
  };
};

export const generateContactMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";
  const url = pageUrl(locale, "contact");
  const imageUrl = `${baseUrl}/images/og/contact.png`;

  const title = isSpanish
    ? "CodeScouts | Hablemos de tu proyecto"
    : "CodeScouts | Let's talk about your project";

  const description = isSpanish
    ? "¿Necesitas mejorar la calidad de tu software o acelerar tu equipo de desarrollo? Contáctanos y descubre cómo CodeScouts puede ayudarte con coaching técnico, consultoría y formación personalizada."
    : "Need to improve your software quality or accelerate your development team? Contact us and discover how CodeScouts can help you with technical coaching, consulting and personalized training.";

  const keywords = isSpanish
    ? [
      "contactar codescouts",
      "contratar technical coaching",
      "presupuesto consultoría software",
      "consulta gratuita coaching técnico",
      "formación equipos desarrollo contacto",
    ]
    : [
      "contact codescouts",
      "hire technical coaching",
      "software consulting quote",
      "free technical coaching consultation",
      "development team training contact",
    ];

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    authors: [{ name: "CodeScouts", url: baseUrl }],
    keywords: keywords.join(", "),
    creator: "CodeScouts",
    publisher: "CodeScouts",

    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "CodeScouts",
      locale: isSpanish ? "es_ES" : "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      phoneNumbers: "+34664109973",
      emails: "hello@codescouts.academy",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@code_scouts",
      site: "@code_scouts",
    },

    alternates: {
      canonical: url,
      languages: langAlternates("contact"),
    },

    robots: defaultRobots,

    other: {
      "og:see_also": [pageUrl(locale, "services"), pageUrl(locale, "courses")].join(","),
      "contact:phone_number": "+34664109973",
      "contact:email": "hello@codescouts.academy",
      "geo.region": "ES-GA",
      "geo.placename": "Santiago de Compostela",
      "geo.position": "42.8782;-8.5448",
    },
  };
};

export const generateBlogListMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";
  const url = pageUrl(locale, "blog");
  const imageUrl = `${baseUrl}/images/og/blog.png`;

  const title = isSpanish
    ? "CodeScouts | Artículos sobre desarrollo de software"
    : "CodeScouts | Software Development Articles";

  const description = isSpanish
    ? "Artículos sobre TDD, Clean Code, arquitectura de software, metodologías ágiles y coaching técnico escritos por nuestros expertos. Aprende y mejora tu práctica de desarrollo."
    : "Articles on TDD, Clean Code, software architecture, agile methodologies and technical coaching written by our experts. Learn and improve your development practice.";

  // Use post titles as long-tail keywords
  const keywords = getPostsFromLang(locale)
    .flatMap((post) => [post.title, ...(post.tags ?? [])])
    .filter(Boolean);

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    authors: [{ name: "CodeScouts", url: baseUrl }],
    keywords: keywords.join(", "),
    creator: "CodeScouts",
    publisher: "CodeScouts",

    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "CodeScouts",
      locale: isSpanish ? "es_ES" : "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@code_scouts",
      site: "@code_scouts",
    },

    alternates: {
      canonical: url,
      languages: langAlternates("blog"),
    },

    robots: defaultRobots,

    other: {
      "og:see_also": pageUrl(locale, "courses"),
    },
  };
};

export const generateBlogPostMeta = (
  post: BlogPost,
  locale: Language,
  slug: string
): Metadata => {
  const url = pageUrl(locale, "blog", slug);
  const imageUrl = `${baseUrl}${post.coverImage}`;
  const title = `${post.title} | CodeScouts`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description: post.summary,
    authors: [{ name: "CodeScouts", url: baseUrl }],
    keywords: post.tags?.join(", "),
    creator: "CodeScouts",
    publisher: "CodeScouts",

    openGraph: {
      title,
      description: post.summary,
      type: "article",
      url,
      siteName: "CodeScouts",
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      // Use updatedAt when available — important for freshness signals
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [`${baseUrl}/about`],
      section: "blog",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: post.summary,
      images: [imageUrl],
      creator: "@code_scouts",
      site: "@code_scouts",
    },

    alternates: {
      canonical: url,
      languages: langAlternates("blog", slug),
    },

    robots: defaultRobots,

    other: {
      "article:published_time": post.date,
      "article:modified_time": post.date,
      "article:section": "blog",
      ...(post.readingTime && { "reading-time": `${post.readingTime} min` }),
    },
  };
};
