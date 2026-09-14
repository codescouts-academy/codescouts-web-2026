import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Language } from "@/i18n";
import { COURSES, CourseSlug, courseSlugs } from "@/lib/courses";

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author?: string;
  coverImage?: string;
  tags?: string[];
  readingTime: number;
  lang: Language;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

/**
 * Calculate reading time based on content length
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;

  return Math.ceil(words / wordsPerMinute);
}

/**
 * Load all posts for a given language
 */
export function getPostsFromLang(lang: Language): BlogPost[] {
  const langDir = path.join(BLOG_DIR, lang);

  if (!fs.existsSync(langDir)) return [];

  return fs
    .readdirSync(langDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(langDir, file);
      const raw = fs.readFileSync(fullPath, "utf-8");

      const { data, content } = matter(raw);

      return {
        slug,
        lang,
        title: data.title,
        summary: data.summary,
        date: data.date,
        author: data.author,
        coverImage: data.image,
        tags: data.tags ?? [],
        content,
        readingTime: calculateReadingTime(content),
      } satisfies BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug and language
 */
export function getBlogPost(
  slug: string,
  lang: Language = "es",
): BlogPost | undefined {
  return getPostsFromLang(lang).find((post) => post.slug === slug);
}

/**
 * Map blog post tags to related course slugs.
 *
 * A course is "related" when at least one of its keyword strings
 * (case-insensitive) appears in the post's tags.
 * Returns slugs ordered by number of matching tags (most relevant first).
 */
export function getRelatedCourses(
  postTags: string[],
): CourseSlug[] {
  const normalized = postTags.map((t) => t.toLowerCase());

  return courseSlugs()
    .map((slug) => {
      const course = COURSES[slug];
      const allKeywords = [
        ...course.content.es.keywords,
        ...course.content.en.keywords,
        ...course.tags,
      ];
      const matches = normalized.filter((tag) =>
        allKeywords.some(
          (kw) =>
            kw.toLowerCase().includes(tag) ||
            tag.includes(kw.toLowerCase()),
        ),
      );
      return { slug, score: matches.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.slug);
}

/**
 * Helper to parse markdown frontmatter (optional utility)
 */
export function parseMarkdown(markdown: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const { data, content } = matter(markdown);
  return { data, content };
}
