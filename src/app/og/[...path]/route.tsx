import { Language, Languages } from "@/i18n";
import { getBlogPost, getPostsFromLang } from "@/lib/blog";
import { COURSE_SLUGS, COURSES, CourseSlug } from "@/lib/courses";
import { SERVICE_PAGE_SLUGS, serviceName } from "@/lib/meta";
import { OG_FILE, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

type Card = { eyebrow?: string; title: string; subtitle?: string };

const staticCards: Record<string, Record<Language, Card>> = {
  "": {
    es: {
      eyebrow: "Technical coaching · Consultoría · Cursos",
      title: "Mejoramos equipos de desarrollo de software",
      subtitle: "Para empresas en España y Galicia",
    },
    en: {
      eyebrow: "Technical coaching · Consulting · Courses",
      title: "We level up software development teams",
      subtitle: "For companies in Spain and Galicia",
    },
  },
  services: {
    es: {
      eyebrow: "Servicios",
      title: "Technical coaching, consultoría y CTO as a Service",
      subtitle: "Trabajamos con tu equipo sobre tu producto real",
    },
    en: {
      eyebrow: "Services",
      title: "Technical coaching, consulting & CTO as a Service",
      subtitle: "We work with your team on your real product",
    },
  },
  courses: {
    es: {
      eyebrow: "Cursos para empresas",
      title: "Cursos para equipos de desarrollo",
      subtitle: "Online o presencial en Galicia · Bonificables FUNDAE",
    },
    en: {
      eyebrow: "Company training",
      title: "Courses for software development teams",
      subtitle: "Live online or onsite in Galicia · FUNDAE subsidised",
    },
  },
  clients: {
    es: { eyebrow: "Clientes", title: "Empresas que confían en CodeScouts" },
    en: { eyebrow: "Clients", title: "Companies that trust CodeScouts" },
  },
  contact: {
    es: { eyebrow: "Contacto", title: "Hablemos de tu equipo", subtitle: "hello@codescouts.academy" },
    en: { eyebrow: "Contact", title: "Let's talk about your team", subtitle: "hello@codescouts.academy" },
  },
  blog: {
    es: {
      eyebrow: "Blog",
      title: "Artículos sobre desarrollo de software",
      subtitle: "TDD · Clean Code · Arquitectura",
    },
    en: {
      eyebrow: "Blog",
      title: "Software development articles",
      subtitle: "TDD · Clean Code · Architecture",
    },
  },
};

const cardFor = (locale: Language, segments: string[]): Card | undefined => {
  const [section, slug] = segments;
  const es = locale === "es";

  if (!slug) return staticCards[section ?? ""]?.[locale];

  if (section === "courses" && (COURSE_SLUGS as readonly string[]).includes(slug)) {
    const course = COURSES[slug as CourseSlug];
    return {
      eyebrow: es ? "Curso para equipos" : "Team course",
      title: course.content[locale].h1,
      subtitle: es
        ? `${course.durationHours} h · ${course.level.es} · Bonificable FUNDAE`
        : `${course.durationHours} h · ${course.level.en} · FUNDAE subsidised`,
    };
  }

  if (section === "services") {
    const service = SERVICE_PAGE_SLUGS.find((s) => s === slug);
    if (!service) return undefined;
    return {
      eyebrow: es ? "Servicio para empresas" : "Service for companies",
      title: serviceName(service, locale),
      subtitle: es ? "Para equipos de desarrollo de software" : "For software development teams",
    };
  }

  if (section === "blog") {
    const post = getBlogPost(slug, locale);
    if (!post) return undefined;
    return { eyebrow: "Blog", title: post.title, subtitle: post.tags?.slice(0, 3).join(" · ") };
  }

  return undefined;
};

/** Every page that has a card: [locale, ...segments, OG_FILE]. */
export function generateStaticParams() {
  return Languages.flatMap((locale) => [
    ...Object.keys(staticCards).map((page) => [page]),
    ...COURSE_SLUGS.map((slug) => ["courses", slug]),
    ...SERVICE_PAGE_SLUGS.map((slug) => ["services", slug]),
    ...getPostsFromLang(locale).map((post) => ["blog", post.slug]),
  ].map((segments) => ({ path: [locale, ...segments.filter(Boolean), OG_FILE] })));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const [locale, ...rest] = path;
  const card =
    rest.at(-1) === OG_FILE && (Languages as string[]).includes(locale)
      ? cardFor(locale as Language, rest.slice(0, -1))
      : undefined;

  if (!card) return new Response("Not found", { status: 404 });

  return renderOgImage(card);
}
