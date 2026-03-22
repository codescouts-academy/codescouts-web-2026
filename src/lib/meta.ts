import { Language } from "@/i18n";
import { BlogPost, getPostsFromLang } from "@/lib/blog";
import { testimonials } from "@/lib/testimonials";
import { Metadata } from "next";

const baseUrl = process.env.SITE_URL;

export const generateBlogPostMeta = (post: BlogPost, locale: Language, slug: string): Metadata => {
  const postUrl = `${baseUrl}/${locale}/blog/${slug}`;
  const imageUrl = `${baseUrl}${post.coverImage}`;
  const title = `CodeScouts | ${post.title}`;

  return {
    title: title,
    description: post.summary,
    authors: [{ name: "CodeScouts" }],
    keywords: post.tags?.join(","),

    openGraph: {
      title: title,
      description: post.summary,
      type: "article",
      url: postUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.date,
      section: "blog",
      locale: locale === "en" ? "en_US" : "es_ES",
      siteName: "CodeScouts",
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: post.summary,
      images: [imageUrl],
      creator: "@code_scouts",
      site: "@code_scouts",
    },

    alternates: {
      canonical: postUrl,
      languages: {
        en: `${baseUrl}/en/blog/${slug}`,
        es: `${baseUrl}/blog/${slug}`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    other: {
      "article:published_time": post.date,
      "article:modified_time": post.date,
      "article:section": "blog",
      "reading-time": post.readingTime ? `${post.readingTime} min` : "1 min",
    },
  };
}

export const generateBlogListMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";

  const blogUrl = `${baseUrl}/${locale}/blog`;
  const imageUrl = `${baseUrl}/images/avatar.png`;

  const title = isSpanish
    ? "CodeScouts | Artículos sobre desarrollo de software"
    : "CodeScouts | Software Development Articles";

  const description = isSpanish
    ? "Descubre artículos sobre buenas prácticas de programación, arquitectura de software, metodologías ágiles y coaching técnico. Aprende de la experiencia de nuestros expertos."
    : "Discover articles about programming best practices, software architecture, agile methodologies and technical coaching. Learn from our experts' experience.";

  const keywords = getPostsFromLang(locale).flatMap((post) => post.title);

  return {
    title,
    description,
    authors: [{ name: "CodeScouts" }],
    keywords: keywords.join(", "),

    openGraph: {
      title,
      description,
      type: "website",
      url: blogUrl,
      siteName: "CodeScouts",
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CodeScouts Blog",
        },
      ],
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
      canonical: blogUrl,
      languages: {
        en: `${baseUrl}/en/blog`,
        es: `${baseUrl}/blog`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    other: {
      "og:see_also": `${baseUrl}/${locale}/courses`,
    },
  };
};

export const generateClientsMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";

  const clientsUrl = `${baseUrl}/${locale}/clients`;
  const imageUrl = `${baseUrl}/images/avatar.png`;

  const title = isSpanish
    ? "CodeScouts | Empresas que confían en nosotros"
    : "CodeScouts | Companies that trust us";

  const description = isSpanish
    ? "Descubre las empresas y equipos que han mejorado su desarrollo de software con CodeScouts. Casos de éxito en technical coaching, consultoría y formación de equipos de desarrollo."
    : "Discover the companies and teams that have improved their software development with CodeScouts. Success stories in technical coaching, consulting and development team training.";

  const keywords = testimonials.reduce((acc, testimonial) => {
    const companyKeywords = isSpanish
      ? [
        `clientes codescouts ${testimonial.company}`,
        `testimonio ${testimonial.name}`,
        `opinión ${testimonial.name}`,
      ]
      : [
        `codescouts clients ${testimonial.company}`,
        `testimonial ${testimonial.name}`,
        `review ${testimonial.name}`,
      ];

    return [...acc, ...companyKeywords];
  }, [] as string[]);

  return {
    title,
    description,
    authors: [{ name: "CodeScouts" }],
    keywords: keywords.join(", "),

    openGraph: {
      title,
      description,
      type: "website",
      url: clientsUrl,
      siteName: "CodeScouts",
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CodeScouts Clients",
        },
      ],
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
      canonical: clientsUrl,
      languages: {
        en: `${baseUrl}/en/clients`,
        es: `${baseUrl}/clients`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    other: {
      "og:see_also": [
        `${baseUrl}/${locale}/services`,
        `${baseUrl}/${locale}/about`,
      ].join(","),
    },
  };
};

export const generateContactMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";

  const contactUrl = `${baseUrl}/${locale}/contact`;
  const imageUrl = `${baseUrl}/images/avatar.png`;

  const title = isSpanish
    ? "CodeScouts | Hablemos de tu proyecto"
    : "CodeScouts | Let's talk about your project";

  const description = isSpanish
    ? "¿Necesitas mejorar la calidad de tu software o acelerar tu equipo de desarrollo? Contáctanos y descubre cómo CodeScouts puede ayudarte con coaching técnico, consultoría y formación personalizada."
    : "Need to improve your software quality or accelerate your development team? Contact us and discover how CodeScouts can help you with technical coaching, consulting and personalized training.";

  const keywords = isSpanish
    ? [
      "contacto codescouts",
    ]
    : [
      "contact codescouts",
    ];

  return {
    title,
    description,
    authors: [{ name: "CodeScouts" }],
    keywords: keywords.join(", "),

    openGraph: {
      title,
      description,
      type: "website",
      url: contactUrl,
      siteName: "CodeScouts",
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Contact CodeScouts",
        },
      ],
      phoneNumbers: "+34 664 109 973",
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
      canonical: contactUrl,
      languages: {
        en: `${baseUrl}/en/contact`,
        es: `${baseUrl}/contact`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    other: {
      "og:see_also": [
        `${baseUrl}/${locale}/services`,
        `${baseUrl}/${locale}/courses`,
      ].join(","),
      "contact:phone_number": "+34664109973",
      "contact:email": "hello@codescouts.academy",
      "geo.region": "ES-GA",
      "geo.placename": "Santiago de Compostela",
      "geo.position": "42.8782;-8.5448",
    },
  };
};

export const generateCoursesMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";

  const coursesUrl = `${baseUrl}/${locale}/courses`;
  const imageUrl = `${baseUrl}/images/avatar.png`;

  const title = isSpanish
    ? "CodeScouts | Formación técnica para equipos de desarrollo"
    : "CodeScouts | Technical training for development teams";

  const description = isSpanish
    ? "Cursos y formación a medida para equipos de desarrollo. Aprende TDD, Clean Code, arquitectura de software, pair programming y extreme programming con expertos. Cursos bonificables por FUNDAE."
    : "Custom courses and training for development teams. Learn TDD, Clean Code, software architecture, pair programming and extreme programming with experts. FUNDAE subsidized courses.";

  const keywords = isSpanish
    ? [
      "cursos programación",
      "formación equipos desarrollo",
      "tdd curso",
      "clean code formación",
      "arquitectura software curso",
      "pair programming",
      "extreme programming",
      "cursos a medida",
      "formación técnica",
      "cursos bonificables fundae",
      "refactoring curso",
      "buenas prácticas programación",
      "formación desarrollo software",
    ]
    : [
      "programming courses",
      "development team training",
      "tdd course",
      "clean code training",
      "software architecture course",
      "pair programming",
      "extreme programming",
      "custom courses",
      "technical training",
      "fundae subsidized courses",
      "refactoring course",
      "programming best practices",
      "software development training",
    ];

  return {
    title,
    description,
    authors: [{ name: "CodeScouts" }],
    keywords: keywords.join(", "),

    openGraph: {
      title,
      description,
      type: "website",
      url: coursesUrl,
      siteName: "CodeScouts",
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CodeScouts Training Courses",
        },
      ],
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
      canonical: coursesUrl,
      languages: {
        en: `${baseUrl}/en/courses`,
        es: `${baseUrl}/courses`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    other: {
      "og:see_also": [
        `${baseUrl}/${locale}/services/technical-coaching`,
        `${baseUrl}/${locale}/contact`,
      ].join(","),
      "course:provider": "CodeScouts",
      "course:availability": "In-person and Online",
      "course:subsidy": "FUNDAE eligible",
    },
  };
};

export const generateServicesMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";

  const servicesUrl = `${baseUrl}/${locale}/services`;
  const imageUrl = `${baseUrl}/images/services/index.png`;

  const title = isSpanish
    ? "CodeScouts | Servicio de Technical coaching, consultoría de software y CTO as a Service"
    : "CodeScouts | Technical coaching, software consulting and CTO as a Service";

  const description = isSpanish
    ? "Servicios de consultoría de software, technical coaching, CTO as a Service y programa acelerado para equipos de desarrollo. Mejora la calidad de tu software y acelera tu proceso de desarrollo con expertos."
    : "Software consulting services, technical coaching, CTO as a Service and accelerated program for development teams. Improve your software quality and accelerate your development process with experts.";

  const keywords = isSpanish
    ? [
      "consultoría software",
      "technical coaching",
      "cto as a service",
      "programa acelerado desarrollo",
      "asesoría técnica",
    ]
    : [
      "software consulting",
      "technical coaching",
      "cto as a service",
      "accelerated development program",
    ];

  return {
    title,
    description,
    authors: [{ name: "CodeScouts" }],
    keywords: keywords.join(", "),

    openGraph: {
      title,
      description,
      type: "website",
      url: servicesUrl,
      siteName: "CodeScouts",
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CodeScouts Services",
        },
      ],
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
      canonical: servicesUrl,
      languages: {
        en: `${baseUrl}/en/services`,
        es: `${baseUrl}/services`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    other: {
      "og:see_also": [
        `${baseUrl}/${locale}/clients`,
        `${baseUrl}/${locale}/contact`,
      ].join(","),
      "service:provider": "CodeScouts",
      "service:type": "Technical Consulting",
    },
  };
};

export const generateHomeMeta = (locale: Language): Metadata => {
  const isSpanish = locale === "es";

  const homeUrl = `${baseUrl}/${locale === "es" ? "" : locale}`;
  const imageUrl = `${baseUrl}/images/avatar.png`;

  const title = isSpanish
    ? "CodeScouts | Technical coaching para equipos de alto rendimiento"
    : "CodeScouts | Technical coaching for high-performance teams";

  const description = isSpanish
    ? "Mejora la calidad de tu software y acelera tu equipo de desarrollo con CodeScouts. Ofrecemos technical coaching, consultoría especializada, CTO as a Service, programa acelerado y formación técnica a medida para empresas."
    : "Improve your software quality and accelerate your development team with CodeScouts. We offer technical coaching, specialized consulting, CTO as a Service, accelerated program and custom technical training for companies.";

  const keywords = isSpanish
    ? [
      "codescouts",
      "technical coaching",
      "consultoría software",
      "cto as a service",
      "programa acelerado desarrollo",
      "formación técnica",
      "extreme programming",
      "clean code",
      "tdd",
      "arquitectura software",
      "pair programming",
      "mob programming",
      "refactoring",
      "código legacy",
      "mejora continua",
      "equipos desarrollo",
      "calidad software",
      "buenas prácticas programación",
    ]
    : [
      "codescouts",
      "technical coaching",
      "software consulting",
      "cto as a service",
      "accelerated development program",
      "technical training",
      "extreme programming",
      "clean code",
      "tdd",
      "software architecture",
      "pair programming",
      "mob programming",
      "refactoring",
      "legacy code",
      "continuous improvement",
      "development teams",
      "software quality",
      "programming best practices",
    ];

  return {
    title,
    description,
    authors: [{ name: "CodeScouts" }],
    keywords: keywords.join(", "),

    openGraph: {
      title,
      description,
      type: "website",
      url: homeUrl,
      siteName: "CodeScouts",
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CodeScouts - Technical coaching and software consulting",
        },
      ],
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
      canonical: homeUrl,
      languages: {
        en: `${baseUrl}/en`,
        es: baseUrl,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};
