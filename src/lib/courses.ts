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
 * Local-SEO strategy (Online + Presencial Galicia):
 * - Every course is taught live-online for all of Spain AND onsite in
 *   Galicia (Santiago de Compostela, A Coruña, Vigo).
 * - That wording is repeated in meta titles/descriptions, intros and FAQs
 *   so pages can surface for "curso X en Galicia", "curso X España" and
 *   "curso X online".
 * - All courses are FUNDAE-bonificable (key Spanish B2B training query).
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
    question: `¿El ${courseName} es online o presencial?`,
    answer: `Ambos. ${FORMAT_ES} Los grupos son reducidos (máximo 12 personas) para garantizar atención personalizada en cualquier formato.`,
  },
  {
    question: `¿Busco un ${courseName} en Galicia, tenéis convocatoria cerca?`,
    answer: `Sí. Somos de Santiago de Compostela y nos desplazamos a ${cityLine} para impartirlo en tus oficinas. También lo impartimos online en directo con la misma carga práctica. Escríbenos y organizamos fechas.`,
  },
  {
    question: "¿El curso es bonificable por FUNDAE?",
    answer: `Sí. ${FUNDAE_ES} Te ayudamos con la gestión de la bonificación.`,
  },
];

const localFaqsEn = (
  courseName: string,
): CourseFaq[] => [
  {
    question: `Is the ${courseName} online or onsite?`,
    answer: `Both. ${FORMAT_EN} Groups are small (max 12 people) to guarantee personal attention in either format.`,
  },
  {
    question: "Is the course eligible for FUNDAE subsidies?",
    answer: `Yes. ${FUNDAE_EN} We help you with the paperwork.`,
  },
];

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
        h1: "Curso de Arquitectura Frontend para equipos",
        metaTitle:
          "Curso de Arquitectura Frontend en Galicia y España | Online y Presencial",
        metaDescription:
          "Curso de arquitectura frontend con React: arquitectura sostenible, escalabilidad y testing. Online para España y presencial en Galicia. Bonificable FUNDAE.",
        keywords: [
          "curso arquitectura frontend",
          "curso arquitectura frontend galicia",
          "curso arquitectura frontend españa",
          "curso arquitectura frontend online",
          "curso react arquitectura",
          "formacion frontend empresas",
          "curso frontend santiago compostela",
          "clean architecture frontend curso",
        ],
        intro: [
          `Cuando el proyecto frontend crece, añadir funcionalidades sin romper lo existente se vuelve un desafío. Este curso de arquitectura frontend enseña a tu equipo a diseñar una arquitectura React sostenible, escalable y testeable. ${FORMAT_ES}`,
          `Es un curso 100% práctico: más del 70% del tiempo programando sobre casos reales, con pair y mob programming. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos que trabajan con React en proyectos medianos o grandes y sufren acoplamiento, miedo a refactorizar o velocidad de entrega decreciente. Ideal para empresas en Galicia y España que quieren escalar su frontend sin reescribirlo cada dos años.",
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
            question: "¿Trabajamos sobre nuestro propio código?",
            answer:
              "Sí, es lo recomendado. Analizamos tu frontend actual y aplicamos los patrones del curso sobre él, para que el equipo salga con mejoras reales ya implementadas, no solo teoría.",
          },
          ...localFaqs(
            "curso de arquitectura frontend",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Frontend Architecture",
        h1: "Frontend Architecture course for teams",
        metaTitle:
          "Frontend Architecture Course (React) | Online Spain & Onsite Galicia",
        metaDescription:
          "Frontend architecture course with React: sustainable architecture, scalability and testing. Live online across Spain and onsite in Galicia.",
        keywords: [
          "frontend architecture course",
          "react architecture training",
          "clean architecture frontend course",
          "frontend course spain",
        ],
        intro: [
          `As your frontend grows, shipping features without breaking existing ones gets harder. This frontend architecture course teaches your team to design a sustainable, scalable and testable React architecture. ${FORMAT_EN}`,
          `It is a 100% hands-on course: 70%+ of the time coding on realistic cases with pair and mob programming. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Teams working with React on medium or large projects who suffer from coupling, fear of refactoring or declining delivery speed.",
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
              "Intermediate: components, hooks and API consumption. No prior architecture experience required.",
          },
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
        metaTitle:
          "Curso de Código Legacy y Refactoring en España | Online y Galicia",
        metaDescription:
          "Curso para trabajar con código legacy: red de seguridad con tests, refactoring y SOLID. Online para España y presencial en Galicia. Bonificable FUNDAE.",
        keywords: [
          "curso codigo legacy",
          "curso refactoring",
          "curso codigo legacy galicia",
          "curso refactoring españa",
          "formacion legacy code empresas",
          "modernizar codigo legacy curso",
        ],
        intro: [
          `Si añadir funcionalidades, actualizar dependencias o seguir las tendencias tecnológicas es un dolor de cabeza, tu equipo necesita técnicas de trabajo con código legacy. Este curso enseña a crear una red de seguridad con tests y a eliminar el acoplamiento que impide evolucionar. ${FORMAT_ES}`,
          `Practicamos sobre código legacy realista con las técnicas de Michael Feathers, refactoring y SOLID. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos atrapados en código heredado que quieren volver a entregar con confianza. Muy habitual en empresas consolidadas de Galicia y España con productos de varios años de vida.",
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
            question: "¿Vale para cualquier lenguaje?",
            answer:
              "Sí. Las técnicas son agnósticas (las practicamos en TypeScript/JavaScript y son trasladables a Java, C#, PHP...). Adaptamos los ejercicios a vuestro stack.",
          },
          ...localFaqs(
            "curso de código legacy",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Legacy Code",
        h1: "Legacy Code and refactoring course for teams",
        metaTitle: "Legacy Code & Refactoring Course | Online Spain, Onsite Galicia",
        metaDescription:
          "Course on working with legacy code: safety nets with tests, refactoring and SOLID. Live online across Spain and onsite in Galicia.",
        keywords: [
          "legacy code course",
          "refactoring course",
          "working with legacy code training",
        ],
        intro: [
          `If adding features or updating dependencies is a headache, your team needs legacy-code techniques. This course teaches how to build a test safety net and remove the coupling that blocks evolution. ${FORMAT_EN}`,
          `We practice on realistic legacy code with Feathers-style techniques, refactoring and SOLID. ${FUNDAE_EN}`,
        ],
        idealFor:
          "Teams stuck in inherited codebases that want to ship with confidence again.",
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
            question: "Do we need existing tests?",
            answer:
              "No — the course starts with how to add tests to untested code.",
          },
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
        metaTitle:
          "Curso de Patrones de Diseño en España | Online y Presencial Galicia",
        metaDescription:
          "Curso de patrones de diseño GoF: software que evoluciona con poco esfuerzo y equipos alineados. Online para España y presencial en Galicia. FUNDAE.",
        keywords: [
          "curso patrones de diseño",
          "curso design patterns",
          "curso patrones diseño galicia",
          "curso patrones diseño online",
          "formacion patrones gof empresas",
        ],
        intro: [
          `Los patrones de diseño son el vocabulario compartido que permite crear software que evoluciona con esfuerzo razonable y unificar la forma de trabajar entre equipos. Este curso los enseña con práctica intensiva, no con diagramas UML memorizados. ${FORMAT_ES}`,
          `Cada patrón se implementa, se testea y se discute cuándo NO usarlo. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos con base de POO que quieren diseñar con criterio, hablar el mismo idioma técnico y dejar de reinventar soluciones en cada proyecto.",
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
          ...localFaqs(
            "curso de patrones de diseño",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Design Patterns",
        h1: "Design Patterns course for teams",
        metaTitle: "Design Patterns Course (GoF) | Online Spain, Onsite Galicia",
        metaDescription:
          "GoF design patterns course: evolvable software and aligned teams. Live online across Spain and onsite in Galicia.",
        keywords: ["design patterns course", "gof patterns training"],
        intro: [
          `Design patterns are the shared vocabulary for building software that evolves with reasonable effort. This course teaches them through intensive practice, not memorized UML. ${FORMAT_EN}`,
          `Every pattern is implemented, tested, and debated — including when NOT to use it. ${FUNDAE_EN}`,
        ],
        idealFor:
          "OOP teams that want principled design and a shared technical language.",
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
        faqs: [...localFaqsEn("design patterns course")],
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
        h1: "Curso de Clean Code para equipos",
        metaTitle: "Curso de Clean Code en España | Online y Presencial en Galicia",
        metaDescription:
          "Curso de clean code: código claro, autoexplicativo y fácil de mantener, con mucha práctica. Online para España y presencial en Galicia. FUNDAE.",
        keywords: [
          "curso clean code",
          "curso codigo limpio",
          "curso clean code galicia",
          "curso clean code online",
          "curso clean code españa",
          "formacion clean code empresas",
        ],
        intro: [
          `El código se lee diez veces más de lo que se escribe. Este curso de clean code enseña las técnicas definitivas para escribir código claro, autoexplicativo y fácil de mantener, con un altísimo volumen de práctica desde el primer minuto. ${FORMAT_ES}`,
          `Refactorizamos código real del equipo aplicando nombres expresivos, funciones pequeñas, las 4 reglas del diseño simple y code smells. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Cualquier equipo de desarrollo, desde junior hasta senior: es la base sobre la que se construyen TDD, refactoring y arquitectura. Perfecto como primer curso de un plan de formación en Galicia o España.",
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
          ...localFaqs(
            "curso de clean code",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Clean Code",
        h1: "Clean Code course for teams",
        metaTitle: "Clean Code Course | Online Spain, Onsite Galicia",
        metaDescription:
          "Clean Code course: clear, self-explanatory and maintainable code with heavy practice. Live online across Spain and onsite in Galicia.",
        keywords: ["clean code course", "clean code training"],
        intro: [
          `Code is read ten times more than it is written. This clean code course teaches the definitive techniques for clear, self-explanatory, maintainable code — with a very high volume of practice. ${FORMAT_EN}`,
          `${FUNDAE_EN}`,
        ],
        idealFor:
          "Any development team, junior to senior: the foundation for TDD, refactoring and architecture.",
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
        faqs: [...localFaqsEn("clean code course")],
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
        h1: "Curso de Next.js para equipos",
        metaTitle: "Curso de Next.js en España | Online y Presencial en Galicia",
        metaDescription:
          "Curso de Next.js: App Router, SSR, SSG y despliegue en producción. Online para España y presencial en Galicia. Bonificable FUNDAE.",
        keywords: [
          "curso nextjs",
          "curso next.js",
          "curso nextjs galicia",
          "curso nextjs online",
          "curso nextjs españa",
          "formacion nextjs empresas",
        ],
        intro: [
          `Next.js es el framework React con la mejor experiencia de desarrollo y todo lo necesario para producción: SSR, SSG, streaming y despliegues automáticos. Este curso lleva a tu equipo de React a producción con Next.js con criterio arquitectónico. ${FORMAT_ES}`,
          `Construimos una aplicación real de principio a fin: routing, data fetching, caché, formularios y deploy. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos con base de React que quieren adoptar Next.js (o usarlo bien) para proyectos productivos en empresas de Galicia y España.",
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
          ...localFaqs(
            "curso de Next.js",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Next.js",
        h1: "Next.js course for teams",
        metaTitle: "Next.js Course | Online Spain, Onsite Galicia",
        metaDescription:
          "Next.js course: App Router, SSR, SSG and production deployment. Live online across Spain and onsite in Galicia.",
        keywords: ["nextjs course", "next.js training"],
        intro: [
          `Next.js gives you the best React development experience with everything production needs. This course takes your team from React to production Next.js. ${FORMAT_EN}`,
          `${FUNDAE_EN}`,
        ],
        idealFor: "Teams with React foundations adopting Next.js for production projects.",
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
        faqs: [...localFaqsEn("Next.js course")],
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
        metaTitle: "Curso de DDD en España | Domain Driven Design Online y Galicia",
        metaDescription:
          "Curso de Domain Driven Design: modelar el dominio, bounded contexts y código expresivo fácil de testear. Online España y presencial Galicia. FUNDAE.",
        keywords: [
          "curso ddd",
          "curso domain driven design",
          "curso ddd galicia",
          "curso ddd online",
          "curso domain driven design españa",
        ],
        intro: [
          `¿Cuesta diseñar el dominio y escribir tests unitarios útiles? DDD hace tu código expresivo y modular. Este curso enseña lenguaje ubicuo, bounded contexts, agregados y eventos de dominio con práctica sobre vuestro propio dominio. ${FORMAT_ES}`,
          `${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos con dominios complejos (finanzas, logística, salud, e-commerce) donde el modelo de dominio es ventaja competitiva, en Galicia y toda España.",
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
          ...localFaqs(
            "curso de Domain Driven Design",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Domain Driven Design",
        h1: "Domain Driven Design (DDD) course for teams",
        metaTitle: "DDD Course (Domain Driven Design) | Online Spain, Galicia",
        metaDescription:
          "Domain Driven Design course: model your domain, bounded contexts and testable expressive code. Online Spain, onsite Galicia.",
        keywords: ["ddd course", "domain driven design training"],
        intro: [
          `Struggling to design your domain and write useful unit tests? DDD makes code expressive and modular — perfect for unit testing. ${FORMAT_EN}`,
          `${FUNDAE_EN}`,
        ],
        idealFor: "Teams with complex domains where the domain model is a competitive advantage.",
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
        faqs: [...localFaqsEn("Domain Driven Design course")],
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
        metaTitle: "Curso de TDD en España | Online y Presencial en Galicia",
        metaDescription:
          "Curso de TDD: escribir tests primero, refactoring y diseño emergente. Online para España y presencial en Galicia. Bonificable FUNDAE.",
        keywords: [
          "curso tdd",
          "curso test driven development",
          "curso tdd galicia",
          "curso tdd online",
          "curso testing españa",
          "curso tdd empresas",
        ],
        intro: [
          `TDD consiste en escribir primero los tests y después el código que los hace pasar, para terminar refactorizando. Este curso convierte TDD en hábito del equipo con katas, pair programming y las variantes clásicas (inside-out, outside-in) y TCR. ${FORMAT_ES}`,
          `El equipo sale escribiendo tests útiles que guían el diseño, no tests frágiles que lastran. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos que quieren reducir bugs, documentar con tests y diseñar mejor. Es el curso con mayor retorno para empresas de software en Galicia y España.",
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
          ...localFaqs(
            "curso de TDD",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Test-Driven Development",
        h1: "TDD (Test-Driven Development) course for teams",
        metaTitle: "TDD Course | Online Spain, Onsite Galicia",
        metaDescription:
          "TDD course: tests first, refactoring and emergent design. Live online across Spain and onsite in Galicia.",
        keywords: ["tdd course", "test driven development training"],
        intro: [
          `TDD means writing tests first, then the code that passes them, then refactoring. This course makes TDD a team habit with katas and pair programming. ${FORMAT_EN}`,
          `${FUNDAE_EN}`,
        ],
        idealFor: "Teams that want fewer bugs, living documentation and better design.",
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
        faqs: [...localFaqsEn("TDD course")],
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
        metaTitle: "Curso de React con TypeScript en España | Online y Galicia",
        metaDescription:
          "Curso de React con TypeScript: aplicaciones empresariales de calidad, hooks y buenas prácticas. Online España y presencial Galicia. FUNDAE.",
        keywords: [
          "curso react",
          "curso react typescript",
          "curso react galicia",
          "curso react online",
          "curso react españa",
          "formacion react empresas",
        ],
        intro: [
          `React es la librería frontend más usada del mundo. Este curso asegura que tu equipo adquiera las competencias profesionales para construir software de alta calidad con React y TypeScript: componentes, hooks, composición y testing. ${FORMAT_ES}`,
          `Ideal como base antes del curso de Arquitectura Frontend o Next.js. ${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos que adoptan React o quieren profesionalizar su uso en empresas de Galicia y España, incluyendo migraciones desde otras librerías.",
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
          ...localFaqs(
            "curso de React con TypeScript",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "React with TypeScript",
        h1: "React with TypeScript course for teams",
        metaTitle: "React with TypeScript Course | Online Spain, Onsite Galicia",
        metaDescription:
          "React with TypeScript course: quality enterprise apps, hooks and best practices. Online Spain, onsite Galicia.",
        keywords: ["react course", "react typescript training"],
        intro: [
          `React is the world's most used frontend library. This course gives your team professional-grade React and TypeScript skills. ${FORMAT_EN}`,
          `${FUNDAE_EN}`,
        ],
        idealFor: "Teams adopting React or professionalizing its use.",
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
        faqs: [...localFaqsEn("React with TypeScript course")],
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
        metaTitle: "Curso de POO y SOLID en España | Online y Presencial Galicia",
        metaDescription:
          "Curso de diseño orientado a objetos: SOLID, GRASP y modelado con mucha práctica. Online para España y presencial en Galicia. FUNDAE.",
        keywords: [
          "curso programacion orientada a objetos",
          "curso poo",
          "curso solid",
          "curso oop galicia",
          "curso diseño orientado a objetos online",
        ],
        intro: [
          `Dominar la programación orientada a objetos es la base de todo lo demás: patrones, SOLID, DDD y arquitectura. Este curso explica de forma clara y con muchísima práctica cómo diseñar con objetos: encapsulación, polimorfismo, composición y los principios SOLID y GRASP. ${FORMAT_ES}`,
          `${FUNDAE_ES}`,
        ],
        idealFor:
          "Equipos con desarrolladores junior o perfiles de otros paradigmas que necesitan una base sólida de diseño OO antes de avanzar a patrones, TDD o DDD.",
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
          ...localFaqs(
            "curso de diseño orientado a objetos",
            "Santiago de Compostela, A Coruña o Vigo",
          ),
        ],
      },
      en: {
        name: "Object-Oriented Design",
        h1: "Object-Oriented Design course for teams",
        metaTitle: "OOP & SOLID Course | Online Spain, Onsite Galicia",
        metaDescription:
          "Object-oriented design course: SOLID, GRASP and modeling with heavy practice. Online Spain, onsite Galicia.",
        keywords: ["oop course", "solid principles training"],
        intro: [
          `Mastering OOP is the foundation of patterns, SOLID, DDD and architecture. This hands-on course covers encapsulation, polymorphism, composition and SOLID/GRASP. ${FORMAT_EN}`,
          `${FUNDAE_EN}`,
        ],
        idealFor:
          "Teams with junior developers or other-paradigm backgrounds needing solid OO foundations.",
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
        faqs: [...localFaqsEn("object-oriented design course")],
      },
    },
  },
};

export const courseSlugs = (): CourseSlug[] =>
  COURSE_SLUGS.filter((slug) => Boolean(COURSES[slug]));

export const getCourse = (slug: string): CourseDefinition | undefined =>
  (COURSES as Record<string, CourseDefinition>)[slug];
