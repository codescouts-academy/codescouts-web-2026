import { Language } from "@/i18n";

/**
 * SEO course catalogue.
 *
 * WHY this file exists:
 * Google cannot rank a *card* inside the generic /courses/ index for a
 * transactional query like "curso de arquitectura frontend". It needs a
 * dedicated URL per course with its own title, H1, long content, FAQ and
 * Course structured data. This catalogue is the single source of truth for
 * those landing pages (both locales).
 *
 * SEO strategy (B2B: companies buying training for their dev teams):
 * - metaTitle: primary keyword first + "para equipos", ≤ 50 chars and
 *   WITHOUT the brand (" | CodeScouts" is appended by code).
 * - metaDescription: 140–158 chars, keyword + team/business benefit +
 *   modality + FUNDAE (es) + soft CTA.
 * - Every course is taught live-online for all of Spain AND onsite in
 *   Galicia (Santiago de Compostela, A Coruña, Vigo). Modality is mentioned
 *   in intros and FAQs but does not define the course, so it stays out of
 *   titles.
 * - All courses are FUNDAE-bonificable (key Spanish B2B training query).
 * - `keywords` are not emitted as a meta tag: they feed getRelatedCourses()
 *   (substring match against blog post tags), so keep topic terms there.
 */

export const COURSE_SLUGS = [
  "arquitectura-frontend",
  "codigo-legacy",
  "patrones-de-diseno",
  "clean-code",
  "curso-nextjs",
  "domain-driven-design",
  "test-driven-development",
  "react-typescript",
  "diseno-orientado-objetos",
] as const;

export type CourseSlug = (typeof COURSE_SLUGS)[number];

/** Legacy / retired English IDs (cards, old Hugo URLs) -> new SEO slugs. */
export const LEGACY_COURSE_SLUG_REDIRECTS: Record<string, CourseSlug> = {
  "frontend-architecture": "arquitectura-frontend",
  "legacy-code": "codigo-legacy",
  "design-patterns": "patrones-de-diseno",
  "clean-code": "clean-code",
  nextjs: "curso-nextjs",
  next: "curso-nextjs",
  ddd: "domain-driven-design",
  tdd: "test-driven-development",
  react: "react-typescript",
  oop: "diseno-orientado-objetos",
};

export type CourseSyllabusItem = { title: string; description: string };
export type CourseFaq = { question: string; answer: string };

export type CourseContent = {
  /** Card / nav label. */
  name: string;
  /** Page H1 (must contain the target keyword). */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** 2 paragraphs. Location + format MUST appear in the first ~100 words. */
  intro: string[];
  idealFor: string;
  syllabus: CourseSyllabusItem[];
  outcomes: string[];
  faqs: CourseFaq[];
};

export type CourseStatic = {
  slug: CourseSlug;
  /** Machine key shared with the /courses/ card grid. */
  cardId: string;
  durationHours: string;
  level: Record<Language, string>;
  tags: string[];
  /** Related blog post slugs (without locale) for internal linking. */
  relatedPosts: string[];
};

export type CourseDefinition = CourseStatic & {
  content: Record<Language, CourseContent>;
};

const FORMAT_ES =
  "Se imparte online en directo para toda España y de forma presencial en Galicia (Santiago de Compostela, A Coruña y Vigo).";
const FORMAT_EN =
  "Taught live online across Spain and onsite in Galicia (Santiago de Compostela, A Coruña and Vigo).";
const FUNDAE_ES =
  "Es bonificable por FUNDAE, por lo que las empresas en España pueden recuperar total o parcialmente su coste.";
const FUNDAE_EN =
  "It is eligible for FUNDAE subsidies, so companies in Spain can recover all or part of its cost.";

const localFaqs = (
  courseName: string,
  cityLine: string,
): CourseFaq[] => [
  {
    question: `¿El ${courseName} es online o presencial en nuestras oficinas?`,
    answer: `Ambos. ${FORMAT_ES} Somos de Santiago de Compostela y nos desplazamos a ${cityLine} para impartirlo en vuestras oficinas; para equipos en el resto de España lo impartimos online en directo con la misma carga práctica. Los grupos son reducidos (máximo 12 personas) para garantizar atención personalizada en cualquier formato.`,
  },
  {
    question: "¿El curso es bonificable por FUNDAE?",
    answer: `Sí. ${FUNDAE_ES} Os ayudamos con la gestión de la bonificación para que la empresa solo tenga que preocuparse de la formación.`,
  },
];

const localFaqsEn = (courseName: string): CourseFaq[] => [
  {
    question: `Is the ${courseName} online or onsite at our offices?`,
    answer: `Both. ${FORMAT_EN} We are based in Santiago de Compostela and travel to your offices in Galicia; teams elsewhere in Spain take it live online with the same amount of hands-on practice. Groups are small (max 12 people) to guarantee personal attention in either format.`,
  },
  {
    question: "Is the course eligible for FUNDAE subsidies?",
    answer: `Yes. ${FUNDAE_EN} We help you with the paperwork so the company only has to focus on the training.`,
  },
];

const durationFaq = (hours: string): CourseFaq => ({
  question: "¿Cuánto dura el curso y cómo se organizan las sesiones?",
  answer: `${hours} horas de formación en directo. Las fechas y el horario de las sesiones se acuerdan con la empresa para que encajen con la planificación del equipo y no frenen la entrega.`,
});

const durationFaqEn = (hours: string): CourseFaq => ({
  question: "How long is the course and how are sessions scheduled?",
  answer: `${hours} hours of live training. Dates and session times are agreed with your company so they fit the team's planning and don't stall delivery.`,
});

export const COURSES: Record<CourseSlug, CourseDefinition> = {
  "arquitectura-frontend": {
    slug: "arquitectura-frontend",
    cardId: "frontend-architecture",
    durationHours: "16-20",
    level: { es: "Intermedio", en: "Intermediate" },
    tags: ["React", "Arquitectura", "Escalabilidad"],
    relatedPosts: ["clean-architecture-en-frontend"],
    content: {
      es: {
        name: "Arquitectura Frontend",
        h1: "Curso de Arquitectura Frontend para equipos de desarrollo",
        metaTitle: "Curso de Arquitectura Frontend para equipos",
        metaDescription:
          "Curso de arquitectura frontend para equipos React: un frontend escalable, testeable y fácil de evolucionar. Online o presencial. FUNDAE. Pide tu propuesta.",
        keywords: [
          "curso de arquitectura frontend",
          "curso arquitectura frontend online",
          "arquitectura frontend",
          "arquitectura react",
          "clean architecture",
          "formación frontend para empresas",
          "escalabilidad",
        ],
        intro: [
          `Cuando un frontend crece, cada nueva funcionalidad cuesta más, el equipo teme refactorizar y la velocidad de entrega cae. Este curso de arquitectura frontend enseña a tu equipo a diseñar una arquitectura React sostenible, escalable y testeable, aplicada a vuestro propio producto. ${FORMAT_ES}`,
          `Es un curso 100% práctico: más del 70% del tiempo programando sobre casos reales, con pair y mob programming. El equipo termina con criterios compartidos sobre dónde va cada pieza de código y con un plan de migración gradual desde vuestra arquitectura actual, sin reescribir desde cero. ${FUNDAE_ES}`,
        ],
        idealFor:
          "CTOs y tech leads de empresas con productos React medianos o grandes cuyo equipo sufre acoplamiento, miedo a refactorizar o una velocidad de entrega que no deja de bajar. Pensado para escalar el frontend, y el número de equipos que trabajan en él, sin reescribirlo cada dos años.",
        syllabus: [
          {
            title: "Fundamentos de arquitectura frontend",
            description:
              "Separación de responsabilidades, dependency rule y por qué el framework no es tu arquitectura. Mapa de capas de una app React real.",
          },
          {
            title: "Clean Architecture aplicada a React",
            description:
              "Entidades, casos de uso, adaptadores e infraestructura. Dónde vive cada cosa y cómo se comunican las capas sin acoplarse.",
          },
          {
            title: "Estado y datos a escala",
            description:
              "Estrategias de gestión de estado, fetching, caché y sincronización. Cuándo usar estado local, servidor o global sin sobreingeniería.",
          },
          {
            title: "Modularización y escalado por equipos",
            description:
              "Feature folders, módulos, boundaries y contratos entre equipos. Cómo varios equipos pueden evolucionar el mismo frontend sin pisarse.",
          },
          {
            title: "Testing de la arquitectura",
            description:
              "Tests unitarios por capa, tests de integración y cómo la arquitectura hace el testing barato en lugar de doloroso.",
          },
        ],
        outcomes: [
          "Arquitectura React sostenible documentada para tu contexto",
          "Capas desacopladas fáciles de testear y evolucionar",
          "Criterios claros de dónde poner cada pieza de código",
          "Estrategia de estado y datos sin sobreingeniería",
          "Contratos para escalar con varios equipos",
          "Plan de migración gradual desde tu arquitectura actual",
        ],
        faqs: [
          {
            question: "¿Qué nivel de React necesita el equipo?",
            answer:
              "Nivel intermedio: componentes, hooks y consumo de APIs. No hace falta experiencia previa en arquitectura; el curso parte de código realista y lo evoluciona paso a paso.",
          },
          {
            question: "¿Se adapta el curso al código de nuestro equipo?",
            answer:
              "Sí, es lo recomendado. Analizamos vuestro frontend actual y aplicamos los patrones del curso sobre él, para que el equipo salga con mejoras reales ya implementadas, no solo teoría.",
          },
          durationFaq("Entre 16 y 20"),
          ...localFaqs(
            "curso de arquitectura frontend",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Frontend Architecture",
        h1: "Frontend Architecture course for development teams",
        metaTitle: "Frontend Architecture Course for Teams",
        metaDescription:
          "Frontend architecture course for React teams: a scalable, testable frontend that is easy to evolve. Live online or onsite, FUNDAE-eligible. Get in touch.",
        keywords: [
          "frontend architecture course",
          "frontend architecture",
          "react architecture",
          "clean architecture",
          "scalability",
        ],
        intro: [
          `As a frontend grows, every new feature costs more, the team is afraid to refactor and delivery speed drops. This frontend architecture course teaches your team to design a sustainable, scalable and testable React architecture, applied to your own product. ${FORMAT_EN}`,
          `It is a 100% hands-on course: 70%+ of the time coding on realistic cases with pair and mob programming. The team leaves with shared criteria on where every piece of code belongs and a gradual migration plan from your current architecture, with no rewrite from scratch. ${FUNDAE_EN}`,
        ],
        idealFor:
          "CTOs and tech leads at companies with medium or large React products whose team suffers from coupling, fear of refactoring or steadily declining delivery speed. Built to scale the frontend, and the number of teams working on it, without rewriting it every two years.",
        syllabus: [
          {
            title: "Frontend architecture fundamentals",
            description:
              "Separation of concerns, the dependency rule, and why the framework is not your architecture.",
          },
          {
            title: "Clean Architecture in React",
            description:
              "Entities, use cases, adapters and infrastructure: where everything lives and how layers communicate.",
          },
          {
            title: "State and data at scale",
            description:
              "State management strategies, fetching, caching and sync without over-engineering.",
          },
          {
            title: "Modularization for multiple teams",
            description:
              "Feature folders, modules, boundaries and contracts so several teams can evolve one frontend.",
          },
          {
            title: "Testing the architecture",
            description:
              "Unit tests per layer and integration tests that stay cheap thanks to the architecture.",
          },
        ],
        outcomes: [
          "Documented sustainable React architecture for your context",
          "Decoupled, testable layers",
          "Clear placement criteria for every piece of code",
          "State and data strategy without over-engineering",
          "Contracts to scale with multiple teams",
          "Gradual migration plan from your current architecture",
        ],
        faqs: [
          {
            question: "What React level does the team need?",
            answer:
              "Intermediate: components, hooks and API consumption. No prior architecture experience required; the course starts from realistic code and evolves it step by step.",
          },
          {
            question: "Can the course be adapted to our team's codebase?",
            answer:
              "Yes, and we recommend it. We analyze your current frontend and apply the course patterns to it, so the team leaves with real improvements already in place, not just theory.",
          },
          durationFaqEn("16 to 20"),
          ...localFaqsEn("frontend architecture course"),
        ],
      },
    },
  },

  "codigo-legacy": {
    slug: "codigo-legacy",
    cardId: "legacy-code",
    durationHours: "20",
    level: { es: "Avanzado", en: "Advanced" },
    tags: ["Refactoring", "Testing", "SOLID"],
    relatedPosts: ["test-driven-development", "solid"],
    content: {
      es: {
        name: "Código Legacy",
        h1: "Curso de Código Legacy y refactoring para equipos",
        metaTitle: "Curso de Código Legacy y Refactoring para equipos",
        metaDescription:
          "Curso de código legacy y refactoring para equipos: tests de caracterización y modernización sin reescribir. Online o presencial. FUNDAE. Pide tu propuesta.",
        keywords: [
          "curso de código legacy",
          "curso de refactoring",
          "código legacy",
          "legacy code",
          "refactoring",
          "deuda técnica",
          "formación código legacy para empresas",
        ],
        intro: [
          `Si añadir funcionalidades o actualizar dependencias se ha convertido en un riesgo para el negocio, tu equipo necesita técnicas específicas para trabajar con código legacy. Este curso enseña a crear una red de seguridad con tests y a romper el acoplamiento que impide evolucionar el producto. ${FORMAT_ES}`,
          `Practicamos sobre código legacy realista (o sobre el vuestro) con las técnicas de Michael Feathers, refactoring y SOLID, y terminamos con un plan de modernización iterativo que no obliga a parar el negocio. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Empresas con productos de varios años de vida cuyo equipo ha perdido la confianza para tocar el código heredado: cada cambio rompe algo, las estimaciones se disparan y nadie quiere actualizar dependencias. El objetivo es volver a entregar con seguridad sin una reescritura big-bang.",
        syllabus: [
          {
            title: "Anatomía del código legacy",
            description:
              "Qué es realmente el legacy, deuda técnica y cómo priorizar por riesgo e impacto en negocio.",
          },
          {
            title: "Red de seguridad con tests",
            description:
              "Characterization tests, golden master y seams: cómo testear código que no fue diseñado para ser testeado.",
          },
          {
            title: "Técnicas de refactoring",
            description:
              "Sprout, wrap, extract y otras técnicas para cambiar comportamiento con seguridad en código acoplado.",
          },
          {
            title: "Romper dependencias",
            description:
              "Inversión de dependencias, puertos y adaptadores para aislar lo difícil de testear.",
          },
          {
            title: "Estrategia de modernización",
            description:
              "Strangler fig, branch by abstraction y plan iterativo para modernizar sin big-bang.",
          },
        ],
        outcomes: [
          "Red de tests de caracterización sobre código sin tests",
          "Técnicas de refactoring seguro en código acoplado",
          "Dependencias rotas y módulos aislados",
          "Criterios para priorizar deuda técnica",
          "Plan de modernización iterativo sin parar el negocio",
          "Equipo con confianza para tocar el legacy",
        ],
        faqs: [
          {
            question: "¿Necesitamos tests previos para hacer el curso?",
            answer:
              "No, al contrario: el curso empieza precisamente por cómo añadir tests a código que no los tiene. Si ya tenéis tests, los aprovechamos como base.",
          },
          {
            question: "¿Se adapta al lenguaje y al código de nuestro equipo?",
            answer:
              "Sí. Las técnicas son agnósticas (las practicamos en TypeScript/JavaScript y son trasladables a Java, C#, PHP...). Adaptamos los ejercicios a vuestro stack y, si lo preferís, trabajamos sobre fragmentos de vuestro propio código legacy.",
          },
          durationFaq("20"),
          ...localFaqs(
            "curso de código legacy",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Legacy Code",
        h1: "Legacy Code and refactoring course for teams",
        metaTitle: "Legacy Code & Refactoring Course for Teams",
        metaDescription:
          "Legacy code and refactoring course for teams: characterization tests, breaking dependencies and modernizing without a rewrite. Online or onsite. Get in touch.",
        keywords: [
          "legacy code course",
          "refactoring course",
          "working with legacy code",
          "refactoring",
          "technical debt",
        ],
        intro: [
          `If adding features or updating dependencies has become a business risk, your team needs specific techniques for working with legacy code. This course teaches how to build a test safety net and break the coupling that blocks the product from evolving. ${FORMAT_EN}`,
          `We practice on realistic legacy code (or yours) with Michael Feathers' techniques, refactoring and SOLID, and finish with an iterative modernization plan that doesn't require stopping the business. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Companies with products several years old whose team has lost the confidence to touch inherited code: every change breaks something, estimates explode and nobody wants to update dependencies. The goal is to ship safely again without a big-bang rewrite.",
        syllabus: [
          {
            title: "Anatomy of legacy code",
            description:
              "What legacy really is, technical debt, and risk-based prioritization.",
          },
          {
            title: "Safety net with tests",
            description:
              "Characterization tests, golden master and seams for untestable code.",
          },
          {
            title: "Refactoring techniques",
            description:
              "Sprout, wrap, extract and more to change behavior safely.",
          },
          {
            title: "Breaking dependencies",
            description:
              "Dependency inversion, ports and adapters to isolate hard-to-test code.",
          },
          {
            title: "Modernization strategy",
            description:
              "Strangler fig, branch by abstraction and iterative plans without big-bang rewrites.",
          },
        ],
        outcomes: [
          "Characterization test suite over untested code",
          "Safe refactoring techniques for coupled code",
          "Isolated modules with broken dependencies",
          "Debt prioritization criteria",
          "Iterative modernization plan",
          "Confident team",
        ],
        faqs: [
          {
            question: "Do we need existing tests to take the course?",
            answer:
              "No, quite the opposite: the course starts precisely with how to add tests to code that has none. If you already have tests, we use them as a starting point.",
          },
          {
            question: "Can it be adapted to our team's language and code?",
            answer:
              "Yes. The techniques are language-agnostic (we practice in TypeScript/JavaScript and they transfer to Java, C#, PHP...). We adapt the exercises to your stack and, if you prefer, work on excerpts of your own legacy code.",
          },
          durationFaqEn("20"),
          ...localFaqsEn("legacy code course"),
        ],
      },
    },
  },

  "patrones-de-diseno": {
    slug: "patrones-de-diseno",
    cardId: "design-patterns",
    durationHours: "16",
    level: { es: "Intermedio", en: "Intermediate" },
    tags: ["GoF Patterns", "OOP", "Diseño"],
    relatedPosts: ["patrones-de-disenio", "grasp", "solid"],
    content: {
      es: {
        name: "Patrones de Diseño",
        h1: "Curso de Patrones de Diseño para equipos",
        metaTitle: "Curso de Patrones de Diseño para equipos",
        metaDescription:
          "Curso de patrones de diseño para equipos: patrones GoF con práctica intensiva y un vocabulario técnico común. Online o presencial. FUNDAE. Pide tu propuesta.",
        keywords: [
          "curso de patrones de diseño",
          "patrones de diseño",
          "curso design patterns",
          "patrones gof",
          "gang of four",
          "formación patrones de diseño para empresas",
        ],
        intro: [
          `Cuando cada desarrollador resuelve los mismos problemas a su manera, el código se vuelve difícil de revisar y de evolucionar. Los patrones de diseño dan al equipo un vocabulario compartido para crear software que evoluciona con esfuerzo razonable. Este curso de patrones de diseño los enseña con práctica intensiva, no con diagramas UML memorizados. ${FORMAT_ES}`,
          `Cada patrón se implementa, se testea y se discute cuándo NO usarlo, para evitar tanto el código acoplado como el sobrediseño. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos con base de programación orientada a objetos que quieren diseñar con criterio, hablar el mismo idioma técnico en las code reviews y dejar de reinventar soluciones en cada proyecto.",
        syllabus: [
          {
            title: "Principios detrás de los patrones",
            description:
              "SOLID y GRASP como fundamento: los patrones son consecuencias de buenos principios, no recetas.",
          },
          {
            title: "Patrones creacionales",
            description:
              "Factory, Builder, Singleton bien entendido y cuándo cada uno simplifica o complica.",
          },
          {
            title: "Patrones estructurales",
            description:
              "Adapter, Decorator, Composite, Facade: componer comportamiento sin herencia frágil.",
          },
          {
            title: "Patrones de comportamiento",
            description:
              "Strategy, Observer, Command, Template Method: separar lo que cambia de lo estable.",
          },
          {
            title: "Antipatrones y sobrediseño",
            description:
              "Cuándo un patrón es la solución equivocada. YAGNI, KISS y revisión de diseños reales del equipo.",
          },
        ],
        outcomes: [
          "Vocabulario de diseño compartido en el equipo",
          "Uso correcto de los patrones GoF esenciales",
          "Diseños revisados con criterio (code review de diseño)",
          "Menos acoplamiento y herencia frágil",
          "Criterio para evitar el sobrediseño",
          "Catálogo de ejemplos aplicado a vuestro dominio",
        ],
        faqs: [
          {
            question: "¿Es un curso teórico?",
            answer:
              "No. Cada patrón se programa en katas y ejercicios, se testea y se refactoriza. La teoría ocupa menos del 30% del tiempo.",
          },
          {
            question: "¿Qué conocimientos previos necesita el equipo?",
            answer:
              "Base de programación orientada a objetos. Si el equipo aún no la tiene consolidada, recomendamos empezar por el curso de Diseño Orientado a Objetos.",
          },
          durationFaq("16"),
          ...localFaqs(
            "curso de patrones de diseño",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Design Patterns",
        h1: "Design Patterns course for teams",
        metaTitle: "Design Patterns Course for Teams",
        metaDescription:
          "Design patterns course for teams: GoF patterns through intensive practice and a shared technical vocabulary. Live online or onsite. Ask us for a proposal.",
        keywords: [
          "design patterns course",
          "design patterns",
          "gof patterns",
          "gang of four",
        ],
        intro: [
          `When every developer solves the same problems their own way, code becomes hard to review and evolve. Design patterns give the team a shared vocabulary for building software that evolves with reasonable effort. This design patterns course teaches them through intensive practice, not memorized UML. ${FORMAT_EN}`,
          `Every pattern is implemented, tested and debated, including when NOT to use it, to avoid both coupled code and overdesign. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Teams with an object-oriented background that want principled design, a shared technical language in code reviews and to stop reinventing solutions on every project.",
        syllabus: [
          {
            title: "Principles behind patterns",
            description: "SOLID and GRASP as the foundation of every pattern.",
          },
          {
            title: "Creational patterns",
            description: "Factory, Builder and Singleton — properly understood.",
          },
          {
            title: "Structural patterns",
            description: "Adapter, Decorator, Composite, Facade.",
          },
          {
            title: "Behavioral patterns",
            description: "Strategy, Observer, Command, Template Method.",
          },
          {
            title: "Antipatterns and overdesign",
            description: "When a pattern is the wrong solution. YAGNI and KISS.",
          },
        ],
        outcomes: [
          "Shared design vocabulary",
          "Correct use of essential GoF patterns",
          "Design-level code reviews",
          "Less coupling and fragile inheritance",
          "Overdesign avoidance criteria",
          "Example catalog in your domain",
        ],
        faqs: [
          {
            question: "Is it a theoretical course?",
            answer:
              "No. Every pattern is coded in katas and exercises, tested and refactored. Theory takes up less than 30% of the time.",
          },
          {
            question: "What prior knowledge does the team need?",
            answer:
              "A foundation in object-oriented programming. If the team doesn't have it yet, we recommend starting with the Object-Oriented Design course.",
          },
          durationFaqEn("16"),
          ...localFaqsEn("design patterns course"),
        ],
      },
    },
  },

  "clean-code": {
    slug: "clean-code",
    cardId: "clean-code",
    durationHours: "16",
    level: { es: "Básico", en: "Beginner" },
    tags: ["Best Practices", "Legibilidad", "Mantenibilidad"],
    relatedPosts: ["clean-code", "4-reglas-del-disenio-simple"],
    content: {
      es: {
        name: "Clean Code",
        h1: "Curso de Clean Code para equipos de desarrollo",
        metaTitle: "Curso de Clean Code para equipos de desarrollo",
        metaDescription:
          "Curso de clean code para equipos: código legible y fácil de mantener, code smells y code reviews eficaces. Online o presencial, bonificable FUNDAE. Infórmate.",
        keywords: [
          "curso de clean code",
          "clean code",
          "clean-code",
          "código limpio",
          "code smells",
          "formación clean code para empresas",
        ],
        intro: [
          `El código se lee diez veces más de lo que se escribe, y el código difícil de leer se paga en bugs, onboarding lento y code reviews interminables. Este curso de clean code enseña a tu equipo a escribir código claro, autoexplicativo y fácil de mantener, con un altísimo volumen de práctica desde el primer minuto. ${FORMAT_ES}`,
          `Refactorizamos código real del equipo aplicando nombres expresivos, funciones pequeñas, las 4 reglas del diseño simple y la detección de code smells, y acordamos una guía de estilo viva para el día a día. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Cualquier equipo de desarrollo, de junior a senior: es la base sobre la que se construyen TDD, refactoring y arquitectura. Perfecto como primer curso del plan de formación técnica de la empresa.",
        syllabus: [
          {
            title: "Nombres y expresividad",
            description:
              "Nombres que revelan intención, evitan comentarios y hacen el código autoexplicativo.",
          },
          {
            title: "Funciones y clases pequeñas",
            description:
              "Single Responsibility, niveles de abstracción y las 4 reglas del diseño simple.",
          },
          {
            title: "Code smells",
            description:
              "Detectar duplicación, métodos largos, envidia de características y obsesión primitiva.",
          },
          {
            title: "Refactoring higiénico",
            description:
              "Boy Scout Rule aplicada a diario: dejar el código mejor de lo que lo encontramos.",
          },
          {
            title: "Code review efectivo",
            description:
              "Checklists de legibilidad y cómo dar feedback de código que el equipo acepta.",
          },
        ],
        outcomes: [
          "Código legible y autoexplicativo",
          "Funciones y clases con una sola responsabilidad",
          "Detección sistemática de code smells",
          "Hábito de refactoring continuo",
          "Code reviews centrados en legibilidad",
          "Guía de estilo viva del equipo",
        ],
        faqs: [
          {
            question: "¿Vale para programadores junior?",
            answer:
              "Es el curso ideal para juniors y también recicla a seniors: todo el mundo escribe código a diario y la legibilidad impacta en todo lo demás (TDD, reviews, onboarding).",
          },
          {
            question: "¿Trabajamos con código de nuestro propio proyecto?",
            answer:
              "Sí. Además de katas, refactorizamos fragmentos de código real del equipo, para que lo aprendido se aplique desde el primer día y no se quede en ejemplos de libro.",
          },
          durationFaq("16"),
          ...localFaqs(
            "curso de clean code",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Clean Code",
        h1: "Clean Code course for development teams",
        metaTitle: "Clean Code Course for Development Teams",
        metaDescription:
          "Clean code course for development teams: readable, maintainable code, code smells and effective code reviews. Live online or onsite. Ask us for a proposal.",
        keywords: ["clean code course", "clean code", "clean-code", "code smells"],
        intro: [
          `Code is read ten times more than it is written, and hard-to-read code is paid for in bugs, slow onboarding and endless code reviews. This clean code course teaches your team to write clear, self-explanatory, maintainable code, with a very high volume of practice from minute one. ${FORMAT_EN}`,
          `We refactor the team's real code applying expressive names, small functions, the 4 rules of simple design and code smell detection, and agree on a living style guide for day-to-day work. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Any development team, junior to senior: it is the foundation for TDD, refactoring and architecture. A perfect first course in a company's technical training plan.",
        syllabus: [
          {
            title: "Names and expressiveness",
            description: "Intention-revealing names and self-explanatory code.",
          },
          {
            title: "Small functions and classes",
            description: "Single Responsibility and the 4 rules of simple design.",
          },
          {
            title: "Code smells",
            description: "Duplication, long methods, feature envy, primitive obsession.",
          },
          {
            title: "Hygienic refactoring",
            description: "The Boy Scout Rule applied daily.",
          },
          {
            title: "Effective code review",
            description: "Readability checklists and feedback teams accept.",
          },
        ],
        outcomes: [
          "Readable, self-explanatory code",
          "Single-responsibility functions and classes",
          "Systematic smell detection",
          "Continuous refactoring habit",
          "Readability-focused reviews",
          "Living team style guide",
        ],
        faqs: [
          {
            question: "Is it suitable for junior developers?",
            answer:
              "It is the ideal course for juniors and a great refresher for seniors: everyone writes code daily and readability impacts everything else (TDD, reviews, onboarding).",
          },
          {
            question: "Do we work with code from our own project?",
            answer:
              "Yes. Besides katas, we refactor excerpts of the team's real code so what they learn applies from day one instead of staying in textbook examples.",
          },
          durationFaqEn("16"),
          ...localFaqsEn("clean code course"),
        ],
      },
    },
  },

  "curso-nextjs": {
    slug: "curso-nextjs",
    cardId: "nextjs",
    durationHours: "16",
    level: { es: "Intermedio", en: "Intermediate" },
    tags: ["Next.js", "SSR", "Vercel"],
    relatedPosts: [
      "reactjs-18-novedades",
      "reactjs-in-azure-cdn-vs-azure-app-service",
    ],
    content: {
      es: {
        name: "Next.js",
        h1: "Curso de Next.js para equipos de desarrollo",
        metaTitle: "Curso de Next.js para equipos de desarrollo",
        metaDescription:
          "Curso de Next.js para equipos: App Router, Server Components, caché y despliegue en producción con criterio. Online o presencial. FUNDAE. Pide tu propuesta.",
        keywords: [
          "curso de next.js",
          "curso nextjs",
          "next.js",
          "nextjs",
          "server components",
          "app router",
          "formación next.js para empresas",
        ],
        intro: [
          `Next.js es el framework React con la mejor experiencia de desarrollo y todo lo necesario para producción: SSR, SSG, streaming y despliegues automáticos. Pero usarlo sin criterio sale caro en rendimiento y mantenimiento. Este curso de Next.js lleva a tu equipo de React a producción con Next.js con criterio arquitectónico. ${FORMAT_ES}`,
          `Construimos una aplicación real de principio a fin: routing, data fetching, caché, formularios y despliegue. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos con base de React que van a adoptar Next.js, o que ya lo usan y quieren hacerlo bien: App Router, Server Components y caché sin sorpresas en producción.",
        syllabus: [
          {
            title: "App Router a fondo",
            description:
              "Layouts, rutas anidadas, loading, error boundaries y convenciones que escalan.",
          },
          {
            title: "Server vs Client Components",
            description:
              "El modelo mental clave: qué se renderiza dónde, cuándo usar cada uno y cómo componerlos.",
          },
          {
            title: "Data fetching y caché",
            description:
              "Fetch, request memoization, caché por ruta y revalidación. Datos frescos sin waterfall.",
          },
          {
            title: "Formularios y mutaciones",
            description: "Server Actions, validación, estados pendientes y UX optimista.",
          },
          {
            title: "Producción y despliegue",
            description:
              "Rendimiento, SEO técnico, metadata y despliegue con Vercel o infraestructura propia.",
          },
        ],
        outcomes: [
          "App Next.js en producción como proyecto de curso",
          "Modelo Server/Client Components dominado",
          "Estrategia de fetching y caché definida",
          "Formularios robustos con Server Actions",
          "SEO técnico y rendimiento medidos",
          "Pipeline de despliegue funcionando",
        ],
        faqs: [
          {
            question: "¿Necesitamos saber React antes?",
            answer:
              "Sí, nivel intermedio de React (componentes, hooks, props). Si el equipo aún no domina React, recomendamos empezar por el curso de React con TypeScript.",
          },
          {
            question: "¿Cubre el App Router y los Server Components?",
            answer:
              "Sí, es el eje del curso: layouts y rutas con App Router, Server y Client Components, data fetching y caché, Server Actions y despliegue en producción con Vercel o infraestructura propia.",
          },
          durationFaq("16"),
          ...localFaqs(
            "curso de Next.js",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Next.js",
        h1: "Next.js course for development teams",
        metaTitle: "Next.js Course for Development Teams",
        metaDescription:
          "Next.js course for teams: App Router, Server Components, caching and production deployment done right. Live online or onsite in Galicia. Ask for a proposal.",
        keywords: [
          "next.js course",
          "nextjs course",
          "server components",
          "app router",
        ],
        intro: [
          `Next.js gives you the best React development experience and everything production needs: SSR, SSG, streaming and automatic deployments. But using it without clear criteria is costly in performance and maintenance. This Next.js course takes your team from React to production Next.js with sound architectural judgment. ${FORMAT_EN}`,
          `We build a real application end to end: routing, data fetching, caching, forms and deployment. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Teams with React foundations about to adopt Next.js, or already using it and wanting to do it right: App Router, Server Components and caching with no surprises in production.",
        syllabus: [
          {
            title: "App Router in depth",
            description: "Layouts, nested routes, loading and error boundaries.",
          },
          {
            title: "Server vs Client Components",
            description: "The key mental model: what renders where.",
          },
          {
            title: "Data fetching and caching",
            description: "Caching per route and revalidation without waterfalls.",
          },
          {
            title: "Forms and mutations",
            description: "Server Actions, validation and optimistic UX.",
          },
          {
            title: "Production and deployment",
            description: "Performance, technical SEO, metadata and deployment.",
          },
        ],
        outcomes: [
          "Production Next.js app as course project",
          "Server/Client component mastery",
          "Fetching and caching strategy",
          "Robust Server Action forms",
          "Measured technical SEO and performance",
          "Working deployment pipeline",
        ],
        faqs: [
          {
            question: "Does the team need to know React first?",
            answer:
              "Yes, intermediate React (components, hooks, props). If the team isn't comfortable with React yet, we recommend starting with the React with TypeScript course.",
          },
          {
            question: "Does it cover the App Router and Server Components?",
            answer:
              "Yes, they are the core of the course: App Router layouts and routes, Server and Client Components, data fetching and caching, Server Actions and production deployment on Vercel or your own infrastructure.",
          },
          durationFaqEn("16"),
          ...localFaqsEn("Next.js course"),
        ],
      },
    },
  },

  "domain-driven-design": {
    slug: "domain-driven-design",
    cardId: "ddd",
    durationHours: "16",
    level: { es: "Avanzado", en: "Advanced" },
    tags: ["Domain", "Bounded Context", "Aggregates"],
    relatedPosts: ["grasp", "object-calisthenics"],
    content: {
      es: {
        name: "Domain Driven Design",
        h1: "Curso de Domain Driven Design (DDD) para equipos",
        metaTitle: "Curso de DDD (Domain Driven Design) para equipos",
        metaDescription:
          "Curso de Domain Driven Design para equipos: bounded contexts, agregados y código que refleja el negocio y es fácil de testear. Online o presencial. FUNDAE.",
        keywords: [
          "curso de ddd",
          "curso de domain driven design",
          "ddd",
          "domain driven design",
          "bounded context",
          "event storming",
        ],
        intro: [
          `Cuando el código no refleja el negocio, cada cambio de requisitos cuesta más de lo que debería y los tests unitarios aportan poco. Domain Driven Design alinea el código con el dominio y lo hace expresivo, modular y fácil de testear. Este curso de DDD enseña lenguaje ubicuo, bounded contexts, agregados y eventos de dominio con práctica sobre vuestro propio dominio. ${FORMAT_ES}`,
          `Empezamos con event storming para entender el negocio y bajamos al DDD táctico en código: value objects, repositorios, servicios de dominio y CQRS pragmático solo donde aporta. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Empresas con dominios complejos (finanzas, logística, salud, e-commerce) donde el modelo de dominio es ventaja competitiva y el equipo técnico necesita hablar el mismo idioma que negocio.",
        syllabus: [
          {
            title: "Lenguaje ubicuo y descubrimiento",
            description:
              "Event storming y domain storytelling para extraer conocimiento de negocio.",
          },
          {
            title: "Bounded contexts y context mapping",
            description:
              "Delimitar contextos, relaciones entre ellos y anticorruption layers.",
          },
          {
            title: "Agregados y entidades",
            description:
              "Invariantes, raíces de agregado y diseño de modelos que protegen las reglas de negocio.",
          },
          {
            title: "Eventos de dominio",
            description:
              "Desacoplar con eventos, eventual consistency y comunicación entre contextos.",
          },
          {
            title: "DDD táctico en código",
            description:
              "Value objects, repositorios, servicios de dominio y CQRS pragmático donde aporta.",
          },
        ],
        outcomes: [
          "Mapa de contextos de vuestro dominio",
          "Lenguaje ubicuo documentado",
          "Agregados con invariantes protegidas",
          "Estrategia de eventos entre contextos",
          "Código expresivo y testeable",
          "Hoja de ruta de adopción gradual",
        ],
        faqs: [
          {
            question: "¿DDD no es demasiado para nuestro proyecto?",
            answer:
              "Lo analizamos el primer día: DDD brilla en dominios complejos. Si vuestro dominio es más CRUD, os diremos qué partes (value objects, lenguaje ubicuo) aportan sin sobrediseñar.",
          },
          {
            question: "¿Qué nivel necesita el equipo?",
            answer:
              "Es un curso avanzado: conviene que el equipo tenga base de diseño orientado a objetos y testing. Si no es así, recomendamos empezar por los cursos de Diseño Orientado a Objetos o TDD.",
          },
          durationFaq("16"),
          ...localFaqs(
            "curso de Domain Driven Design",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Domain Driven Design",
        h1: "Domain Driven Design (DDD) course for teams",
        metaTitle: "Domain Driven Design (DDD) Course for Teams",
        metaDescription:
          "Domain Driven Design course for teams: bounded contexts, aggregates and code that mirrors the business and is easy to test. Online or onsite. Get in touch.",
        keywords: [
          "ddd course",
          "domain driven design course",
          "bounded contexts",
          "event storming",
        ],
        intro: [
          `When code doesn't reflect the business, every requirement change costs more than it should and unit tests add little value. Domain Driven Design aligns code with the domain and makes it expressive, modular and easy to test. This DDD course teaches ubiquitous language, bounded contexts, aggregates and domain events, practicing on your own domain. ${FORMAT_EN}`,
          `We start with event storming to understand the business and move down to tactical DDD in code: value objects, repositories, domain services and pragmatic CQRS only where it pays off. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Companies with complex domains (finance, logistics, healthcare, e-commerce) where the domain model is a competitive advantage and the tech team needs to speak the same language as the business.",
        syllabus: [
          {
            title: "Ubiquitous language and discovery",
            description: "Event storming and domain storytelling.",
          },
          {
            title: "Bounded contexts and mapping",
            description: "Delimiting contexts and anticorruption layers.",
          },
          {
            title: "Aggregates and entities",
            description: "Invariants and aggregate roots.",
          },
          {
            title: "Domain events",
            description: "Decoupling with events and eventual consistency.",
          },
          {
            title: "Tactical DDD in code",
            description: "Value objects, repositories and pragmatic CQRS.",
          },
        ],
        outcomes: [
          "Context map of your domain",
          "Documented ubiquitous language",
          "Protected aggregate invariants",
          "Inter-context event strategy",
          "Expressive testable code",
          "Gradual adoption roadmap",
        ],
        faqs: [
          {
            question: "Isn't DDD overkill for our project?",
            answer:
              "We assess it on day one: DDD shines in complex domains. If your domain is mostly CRUD, we'll tell you which parts (value objects, ubiquitous language) add value without overdesigning.",
          },
          {
            question: "What level does the team need?",
            answer:
              "It is an advanced course: the team should have a foundation in object-oriented design and testing. If not, we recommend starting with the Object-Oriented Design or TDD courses.",
          },
          durationFaqEn("16"),
          ...localFaqsEn("Domain Driven Design course"),
        ],
      },
    },
  },

  "test-driven-development": {
    slug: "test-driven-development",
    cardId: "tdd",
    durationHours: "16",
    level: { es: "Intermedio", en: "Intermediate" },
    tags: ["Testing", "Red-Green-Refactor", "Unit Tests"],
    relatedPosts: [
      "test-driven-development",
      "test-commit-or-revert",
      "fakes-spies-mocks-stubs-dummies",
      "tipos-de-tests",
    ],
    content: {
      es: {
        name: "Test-Driven Development",
        h1: "Curso de TDD (Test-Driven Development) para equipos",
        metaTitle: "Curso de TDD para equipos: Test-Driven Development",
        metaDescription:
          "Curso de TDD para equipos: Red-Green-Refactor, dobles de prueba y tests que guían el diseño para reducir bugs en producción. Online o presencial. FUNDAE.",
        keywords: [
          "curso de tdd",
          "curso test driven development",
          "tdd",
          "test driven development",
          "testing",
          "tests unitarios",
          "dobles de prueba",
          "tcr",
        ],
        intro: [
          `TDD consiste en escribir primero los tests, después el código que los hace pasar y, por último, refactorizar. Este curso de TDD convierte esa disciplina en un hábito del equipo con katas, pair programming, las variantes clásicas (inside-out, outside-in) y TCR. ${FORMAT_ES}`,
          `El equipo sale escribiendo tests útiles que guían el diseño y reducen los bugs en producción, no tests frágiles que lastran cada cambio. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Empresas que quieren reducir bugs en producción, refactorizar con confianza y tener documentación viva en forma de tests. Es el curso con mayor retorno para equipos de producto que entregan a menudo.",
        syllabus: [
          {
            title: "El ciclo Red-Green-Refactor",
            description:
              "Disciplina del ciclo, baby steps y qué significa realmente 'rojo' antes de 'verde'.",
          },
          {
            title: "Diseño guiado por tests",
            description:
              "Escuchar a los tests: acoplamiento, nombres y diseño emergente sin big design up front.",
          },
          {
            title: "Dobles de prueba",
            description:
              "Dummies, stubs, spies, mocks y fakes: cuál usar, cuándo y cómo no abusar de los mocks.",
          },
          {
            title: "Outside-in y TCR",
            description:
              "Desarrollo desde el exterior con tests de aceptación y la variante test-commit-revert.",
          },
          {
            title: "TDD en código real",
            description:
              "Aplicar TDD en legacy, estrategias de testeo y qué NO testear.",
          },
        ],
        outcomes: [
          "Hábito Red-Green-Refactor instalado",
          "Tests que guían el diseño",
          "Uso correcto de dobles de prueba",
          "Reducción de bugs en producción",
          "Refactoring con red de seguridad",
          "Estrategia de testing del equipo",
        ],
        faqs: [
          {
            question: "¿TDD ralentiza el desarrollo?",
            answer:
              "Al principio, un poco; a partir de la segunda semana el equipo recupera velocidad con menos bugs y menos miedo a cambiar. Medimos el progreso durante el curso para demostrarlo con datos.",
          },
          {
            question: "¿Sirve si nuestro código actual no tiene tests?",
            answer:
              "Sí. El último bloque trata cómo aplicar TDD en código legacy y qué no testear. Si el problema principal es el código heredado, el curso de Código Legacy lo aborda en profundidad.",
          },
          durationFaq("16"),
          ...localFaqs(
            "curso de TDD",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Test-Driven Development",
        h1: "TDD (Test-Driven Development) course for teams",
        metaTitle: "TDD Course for Teams: Test-Driven Development",
        metaDescription:
          "TDD course for teams: Red-Green-Refactor, test doubles and tests that guide design to cut production bugs. Live online or onsite. Ask us for a proposal.",
        keywords: [
          "tdd course",
          "test driven development course",
          "unit testing",
          "test doubles",
          "test-commit-revert",
        ],
        intro: [
          `TDD means writing tests first, then the code that makes them pass, and finally refactoring. This TDD course turns that discipline into a team habit with katas, pair programming, the classic styles (inside-out, outside-in) and TCR. ${FORMAT_EN}`,
          `The team leaves writing useful tests that guide design and reduce production bugs, not brittle tests that slow down every change. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Companies that want fewer production bugs, confident refactoring and living documentation in the form of tests. It is the highest-return course for product teams that ship often.",
        syllabus: [
          {
            title: "The Red-Green-Refactor cycle",
            description: "Cycle discipline and baby steps.",
          },
          {
            title: "Test-guided design",
            description: "Listening to tests: coupling, naming, emergent design.",
          },
          {
            title: "Test doubles",
            description: "Dummies, stubs, spies, mocks and fakes — used correctly.",
          },
          {
            title: "Outside-in and TCR",
            description: "Acceptance-test-driven development and test-commit-revert.",
          },
          {
            title: "TDD in real code",
            description: "TDD in legacy code and what NOT to test.",
          },
        ],
        outcomes: [
          "Red-Green-Refactor habit",
          "Design-guiding tests",
          "Correct test-double usage",
          "Fewer production bugs",
          "Safe refactoring",
          "Team testing strategy",
        ],
        faqs: [
          {
            question: "Does TDD slow development down?",
            answer:
              "A little at first; from the second week the team regains speed with fewer bugs and less fear of change. We measure progress during the course to show it with data.",
          },
          {
            question: "Is it useful if our current code has no tests?",
            answer:
              "Yes. The last block covers applying TDD to legacy code and what not to test. If inherited code is the main problem, the Legacy Code course covers it in depth.",
          },
          durationFaqEn("16"),
          ...localFaqsEn("TDD course"),
        ],
      },
    },
  },

  "react-typescript": {
    slug: "react-typescript",
    cardId: "react",
    durationHours: "16",
    level: { es: "Básico a Intermedio", en: "Beginner to Intermediate" },
    tags: ["React", "TypeScript", "Hooks"],
    relatedPosts: ["reactjs-18-novedades"],
    content: {
      es: {
        name: "React con TypeScript",
        h1: "Curso de React con TypeScript para equipos",
        metaTitle: "Curso de React con TypeScript para equipos",
        metaDescription:
          "Curso de React con TypeScript para equipos: hooks, tipado que evita bugs, testing y una estructura que escala. Online o presencial. FUNDAE. Pide tu propuesta.",
        keywords: [
          "curso de react",
          "curso react typescript",
          "react",
          "typescript",
          "hooks",
          "formación react para empresas",
        ],
        intro: [
          `React es la librería frontend más usada del mundo, pero sin buenas prácticas compartidas cada desarrollador la usa a su manera y la calidad del producto lo acusa. Este curso de React con TypeScript asegura que tu equipo adquiera las competencias profesionales para construir software de alta calidad: componentes, hooks, composición, tipado y testing. ${FORMAT_ES}`,
          `Es la base ideal antes de los cursos de Arquitectura Frontend o Next.js. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Empresas que adoptan React o quieren profesionalizar su uso en el equipo, incluidas las migraciones desde otras librerías y los equipos con perfiles mixtos.",
        syllabus: [
          {
            title: "Fundamentos sólidos",
            description:
              "Componentes, props, composición frente a herencia y pensamiento en React.",
          },
          {
            title: "Hooks en profundidad",
            description:
              "useState, useEffect sin dolores, hooks personalizados y reglas de los hooks.",
          },
          {
            title: "TypeScript aplicado",
            description:
              "Tipado de props, estados y eventos. Discriminated unions y tipos que evitan bugs.",
          },
          {
            title: "Datos y efectos",
            description:
              "Fetching, loading y error states. Formularios controlados y validación.",
          },
          {
            title: "Calidad y testing",
            description:
              "Testing Library, tests de componentes y estructura de proyecto que escala.",
          },
        ],
        outcomes: [
          "Base profesional de React + TypeScript",
          "Hooks dominados sin antipatrones",
          "Tipado que previene bugs reales",
          "Componentes testeados",
          "Estructura de proyecto escalable",
          "Equipo listo para Arquitectura Frontend o Next.js",
        ],
        faqs: [
          {
            question: "¿Necesitamos saber TypeScript antes?",
            answer:
              "No es imprescindible: incluimos los fundamentos de TypeScript aplicados a React. Con base de JavaScript es suficiente.",
          },
          {
            question: "¿Sirve para un equipo que ya usa React?",
            answer:
              "Sí. El curso va de nivel básico a intermedio: con equipos que ya trabajan con React nos centramos en hooks, tipado y testing para corregir antipatrones y unificar la forma de trabajar.",
          },
          durationFaq("16"),
          ...localFaqs(
            "curso de React con TypeScript",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "React with TypeScript",
        h1: "React with TypeScript course for teams",
        metaTitle: "React with TypeScript Course for Teams",
        metaDescription:
          "React with TypeScript course for teams: hooks, types that prevent bugs, testing and a project structure that scales. Live online or onsite. Get in touch.",
        keywords: [
          "react course",
          "react typescript course",
          "react hooks",
          "typescript",
        ],
        intro: [
          `React is the world's most used frontend library, but without shared good practices every developer uses it their own way and product quality suffers. This React with TypeScript course gives your team the professional skills to build high-quality software: components, hooks, composition, typing and testing. ${FORMAT_EN}`,
          `It is the ideal foundation before the Frontend Architecture or Next.js courses. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Companies adopting React or professionalizing its use across the team, including migrations from other libraries and teams with mixed backgrounds.",
        syllabus: [
          {
            title: "Solid foundations",
            description: "Components, props and thinking in React.",
          },
          {
            title: "Hooks in depth",
            description: "State, effects and custom hooks.",
          },
          {
            title: "Applied TypeScript",
            description: "Typing props, state and events.",
          },
          {
            title: "Data and effects",
            description: "Fetching, loading/error states and forms.",
          },
          {
            title: "Quality and testing",
            description: "Testing Library and scalable project structure.",
          },
        ],
        outcomes: [
          "Professional React + TypeScript base",
          "Hooks without antipatterns",
          "Bug-preventing types",
          "Tested components",
          "Scalable structure",
          "Ready for advanced courses",
        ],
        faqs: [
          {
            question: "Does the team need to know TypeScript first?",
            answer:
              "It isn't essential: we include TypeScript fundamentals applied to React. A JavaScript foundation is enough.",
          },
          {
            question: "Is it useful for a team that already uses React?",
            answer:
              "Yes. The course goes from beginner to intermediate: with teams already working in React we focus on hooks, typing and testing to fix antipatterns and align how everyone works.",
          },
          durationFaqEn("16"),
          ...localFaqsEn("React with TypeScript course"),
        ],
      },
    },
  },

  "diseno-orientado-objetos": {
    slug: "diseno-orientado-objetos",
    cardId: "oop",
    durationHours: "16",
    level: { es: "Básico", en: "Beginner" },
    tags: ["OOP", "SOLID", "Abstracción"],
    relatedPosts: ["solid", "object-calisthenics", "principios-de-la-buena-programacion"],
    content: {
      es: {
        name: "Diseño Orientado a Objetos",
        h1: "Curso de Diseño Orientado a Objetos para equipos",
        metaTitle: "Curso de Diseño Orientado a Objetos y SOLID",
        metaDescription:
          "Curso de diseño orientado a objetos y SOLID para equipos: encapsulación, composición y GRASP con mucha práctica. Online o presencial. FUNDAE. Infórmate.",
        keywords: [
          "curso de diseño orientado a objetos",
          "curso de programación orientada a objetos",
          "curso poo",
          "curso solid",
          "principios solid",
          "grasp",
          "object calisthenics",
        ],
        intro: [
          `Dominar la programación orientada a objetos es la base de todo lo demás: patrones, SOLID, DDD y arquitectura. Sin ella, el código del equipo acaba lleno de herencia frágil y clases que hacen demasiado. Este curso de diseño orientado a objetos explica de forma clara y con muchísima práctica cómo diseñar con objetos: encapsulación, polimorfismo, composición y los principios SOLID y GRASP. ${FORMAT_ES}`,
          `Trabajamos con ejemplos y contraejemplos sobre código real del equipo y terminamos con Object Calisthenics para fijar hábitos de buen diseño. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos con desarrolladores junior o perfiles que vienen de otros paradigmas y necesitan una base sólida de diseño orientado a objetos antes de avanzar a patrones, TDD o DDD.",
        syllabus: [
          {
            title: "Los 4 pilares",
            description:
              "Abstracción, encapsulación, herencia y polimorfismo bien entendidos (y cuándo evitar la herencia).",
          },
          {
            title: "Principios SOLID",
            description:
              "Los 5 principios con ejemplos y contraejemplos en código real del equipo.",
          },
          {
            title: "Principios GRASP",
            description:
              "Asignar responsabilidades: experto, creador, bajo acoplamiento y alta cohesión.",
          },
          {
            title: "Composición sobre herencia",
            description:
              "Diseñar con composición, inyección de dependencias y objetos pequeños.",
          },
          {
            title: "Object Calisthenics",
            description:
              "Reglas de estilo que fuerzan buen diseño mediante restricción deliberada.",
          },
        ],
        outcomes: [
          "Diseño OO con criterio",
          "SOLID y GRASP aplicados",
          "Menos herencia frágil",
          "Objetos pequeños y cohesivos",
          "Base para patrones y DDD",
          "Lenguaje de diseño compartido",
        ],
        faqs: [
          {
            question: "¿En qué lenguaje se imparte?",
            answer:
              "Normalmente TypeScript, adaptable a Java, C# o PHP según vuestro stack. Los principios son los mismos.",
          },
          {
            question: "¿Qué nivel necesita el equipo?",
            answer:
              "Es un curso de nivel básico: basta con que el equipo programe con soltura en algún lenguaje. Es la base recomendada antes de los cursos de Patrones de Diseño, TDD o DDD.",
          },
          durationFaq("16"),
          ...localFaqs(
            "curso de diseño orientado a objetos",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Object-Oriented Design",
        h1: "Object-Oriented Design course for teams",
        metaTitle: "Object-Oriented Design & SOLID Course for Teams",
        metaDescription:
          "Object-oriented design and SOLID course for teams: encapsulation, composition and GRASP with heavy hands-on practice. Live online or onsite. Get in touch.",
        keywords: [
          "object-oriented design course",
          "oop course",
          "solid principles",
          "grasp",
          "object calisthenics",
        ],
        intro: [
          `Mastering object-oriented programming is the foundation of everything else: patterns, SOLID, DDD and architecture. Without it, the team's code ends up full of fragile inheritance and classes that do too much. This object-oriented design course explains clearly, with lots of practice, how to design with objects: encapsulation, polymorphism, composition and the SOLID and GRASP principles. ${FORMAT_EN}`,
          `We work through examples and counterexamples on the team's real code and finish with Object Calisthenics to lock in good design habits. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Teams with junior developers or people coming from other paradigms who need solid object-oriented design foundations before moving on to patterns, TDD or DDD.",
        syllabus: [
          {
            title: "The 4 pillars",
            description: "Abstraction, encapsulation, inheritance, polymorphism.",
          },
          {
            title: "SOLID principles",
            description: "All five with real-code examples.",
          },
          {
            title: "GRASP principles",
            description: "Assigning responsibilities correctly.",
          },
          {
            title: "Composition over inheritance",
            description: "DI and small objects.",
          },
          {
            title: "Object Calisthenics",
            description: "Constraint-driven good design.",
          },
        ],
        outcomes: [
          "Principled OO design",
          "Applied SOLID and GRASP",
          "Less fragile inheritance",
          "Small cohesive objects",
          "Foundation for patterns and DDD",
          "Shared design language",
        ],
        faqs: [
          {
            question: "Which programming language is it taught in?",
            answer:
              "Usually TypeScript, adaptable to Java, C# or PHP depending on your stack. The principles are the same.",
          },
          {
            question: "What level does the team need?",
            answer:
              "It is a beginner-level course: the team just needs to program fluently in some language. It is the recommended foundation before the Design Patterns, TDD or DDD courses.",
          },
          durationFaqEn("16"),
          ...localFaqsEn("object-oriented design course"),
        ],
      },
    },
  },
};

export const courseSlugs = (): CourseSlug[] =>
  COURSE_SLUGS.filter((slug) => Boolean(COURSES[slug]));

export const getCourse = (slug: string): CourseDefinition | undefined =>
  (COURSES as Record<string, CourseDefinition>)[slug];
