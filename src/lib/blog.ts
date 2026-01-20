import { Language } from "@/i18n";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author?: string;
  coverImage?: string;
  tags?: string[];
  readingTime?: number;
  lang?: "es" | "en";
}

// Static blog posts - in a real app, these would be loaded from .md files
// For a static site, you can add your markdown content here
const rawPosts: BlogPost[] = [
  {
    slug: "introduccion-tdd",
    title: "Introducción a Test-Driven Development",
    excerpt:
      "Aprende los fundamentos de TDD y cómo puede transformar tu forma de escribir código más limpio y mantenible.",
    date: "2024-01-15",
    author: "CodeScouts",
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop",
    tags: ["TDD", "Testing", "Best Practices"],
    readingTime: 8,
    lang: "es",
    content: `
# ¿Qué es Test-Driven Development?

Test-Driven Development (TDD) es una práctica de desarrollo de software que consiste en escribir las pruebas antes que el código de producción. Este enfoque puede parecer contradictorio al principio, pero tiene beneficios enormes.

## El Ciclo Red-Green-Refactor

El proceso de TDD sigue un ciclo simple pero poderoso:

1. **Red**: Escribe una prueba que falle
2. **Green**: Escribe el código mínimo para pasar la prueba
3. **Refactor**: Mejora el código manteniendo las pruebas en verde

### Ejemplo Práctico

\`\`\`typescript
// Paso 1: Escribimos la prueba primero
describe('Calculator', () => {
  it('should add two numbers', () => {
    const calculator = new Calculator();
    expect(calculator.add(2, 3)).toBe(5);
  });
});
\`\`\`

\`\`\`typescript
// Paso 2: Implementamos el código mínimo
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}
\`\`\`

## Beneficios de TDD

- **Diseño emergente**: El código se diseña de forma incremental
- **Documentación viva**: Las pruebas documentan el comportamiento esperado
- **Confianza para refactorizar**: Podemos cambiar el código con seguridad
- **Menos bugs**: Los errores se detectan temprano

> "TDD no es sobre testing, es sobre diseño" - Kent Beck

## Conclusión

TDD es una herramienta poderosa que puede transformar la forma en que desarrollamos software. Requiere práctica, pero los beneficios a largo plazo son incuestionables.
    `.trim(),
  },
  {
    slug: "clean-code-principios",
    title: "Principios de Clean Code que todo desarrollador debe conocer",
    excerpt:
      "Descubre los principios fundamentales para escribir código limpio, legible y mantenible que tus compañeros de equipo agradecerán.",
    date: "2024-01-10",
    author: "CodeScouts",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    tags: ["Clean Code", "Best Practices", "Refactoring"],
    readingTime: 10,
    lang: "es",
    content: `
# Principios de Clean Code

El código limpio no es solo un lujo, es una necesidad. Un código bien escrito es más fácil de entender, mantener y extender.

## Nombres Significativos

Los nombres deben revelar la intención:

\`\`\`typescript
// ❌ Mal
const d = new Date();
const list = getUsers();

// ✅ Bien
const currentDate = new Date();
const activeUsers = getActiveUsers();
\`\`\`

## Funciones Pequeñas

Las funciones deben hacer una sola cosa y hacerla bien:

\`\`\`typescript
// ❌ Mal: función que hace demasiado
function processUser(user) {
  validateUser(user);
  saveToDatabase(user);
  sendEmail(user);
  logActivity(user);
}

// ✅ Bien: funciones separadas
function onUserRegistration(user) {
  validateUser(user);
  const savedUser = saveUser(user);
  notifyUserRegistration(savedUser);
}
\`\`\`

## Evita los Comentarios Innecesarios

El mejor comentario es un buen nombre:

\`\`\`typescript
// ❌ Mal
// Verifica si el usuario está activo
if (user.status === 1) { ... }

// ✅ Bien
if (user.isActive()) { ... }
\`\`\`

## Regla del Boy Scout

> "Deja el código más limpio de lo que lo encontraste"

Cada vez que toques un archivo, mejóralo un poco. Con el tiempo, la base de código mejorará significativamente.
    `.trim(),
  },
  {
    slug: "arquitectura-frontend-react",
    title: "Arquitectura Frontend Escalable con React",
    excerpt:
      "Aprende a estructurar proyectos React de manera que puedan crecer sin convertirse en un caos inmanejable.",
    date: "2024-01-05",
    author: "CodeScouts",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    tags: ["React", "Arquitectura", "Frontend"],
    readingTime: 12,
    lang: "es",
    content: `
# Arquitectura Frontend Escalable

Cuando un proyecto React crece, la estructura del código se vuelve crucial. Una buena arquitectura facilita el desarrollo y mantenimiento.

## Estructura de Carpetas

Una estructura recomendada:

\`\`\`
src/
├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes de UI básicos
│   └── features/    # Componentes de funcionalidades
├── hooks/           # Custom hooks
├── services/        # Lógica de negocio y API calls
├── store/           # Estado global
├── utils/           # Funciones utilitarias
└── pages/           # Páginas/rutas
\`\`\`

## Separación de Responsabilidades

Cada capa tiene su propósito:

- **Components**: Solo UI y presentación
- **Hooks**: Lógica reutilizable
- **Services**: Comunicación con APIs
- **Store**: Estado global de la aplicación

## Custom Hooks para Lógica de Negocio

\`\`\`typescript
// hooks/useUsers.ts
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getAll()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
}
\`\`\`

## Componentes Contenedores vs Presentacionales

- **Contenedores**: Manejan lógica y estado
- **Presentacionales**: Solo renderizan UI

Esta separación hace que los componentes sean más fáciles de probar y reutilizar.
    `.trim(),
  },
];

// Calculate reading time based on content length
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Process posts
export const blogPosts: BlogPost[] = rawPosts.map((post) => ({
  ...post,
  readingTime: post.readingTime || calculateReadingTime(post.content),
}));

export function getBlogPost(
  slug: string,
  lang: Language = "es",
): BlogPost | undefined {
  return blogPosts.find(
    (post) => post.slug === slug && (post.lang === lang || !post.lang),
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags?.includes(tag));
}

// Helper to parse markdown frontmatter (for future file-based blog)
export function parseMarkdown(markdown: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const { data, content } = matter(markdown);
  return { data, content };
}
