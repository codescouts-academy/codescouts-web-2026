import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "..", "src", "content", "blog");
const publicDir = path.join(__dirname, "..", "public");
const siteUrl = "https://www.codescouts.academy";

// One feed per locale: feed.xml (es, default locale) and feed-en.xml.
// Mixing languages in a single <channel language="es"> confuses readers
// and crawlers alike.
const FEEDS = {
  es: {
    file: "feed.xml",
    title: "Blog de CodeScouts",
    description:
      "Artículos sobre TDD, Clean Code, arquitectura de software y technical coaching para equipos de desarrollo.",
  },
  en: {
    file: "feed-en.xml",
    title: "CodeScouts Blog",
    description:
      "Articles on TDD, Clean Code, software architecture and technical coaching for development teams.",
  },
};

// Must match the canonical URLs (`trailingSlash: true` in next.config.ts).
const postUrl = (lang, slug) => `${siteUrl}/${lang}/blog/${slug}/`;

function getPosts(lang) {
  const langDir = path.join(blogDir, lang);
  if (!fs.existsSync(langDir)) return [];

  return fs
    .readdirSync(langDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      // gray-matter handles folded/multi-line values (`summary: >`) and
      // parses dates, which a line-by-line parser cannot.
      const { data } = matter(fs.readFileSync(path.join(langDir, file), "utf-8"));
      return { slug: file.replace(/\.md$/, ""), data };
    })
    .filter(({ data }) => data.draft !== true)
    .map(({ slug, data }) => ({
      slug,
      title: data.title || slug,
      summary: String(data.summary ?? "").trim(),
      date: new Date(data.date ?? 0),
      author: data.author || "CodeScouts",
      tags: Array.isArray(data.tags) ? data.tags : [],
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateFeed(lang) {
  const { file, title, description } = FEEDS[lang];
  const posts = getPosts(lang);

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(title)}</title>
    <description>${escapeXml(description)}</description>
    <link>${siteUrl}/${lang}/blog/</link>
    <language>${lang}</language>
    <lastBuildDate>${(posts[0]?.date ?? new Date()).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/${file}" rel="self" type="application/rss+xml"/>
    ${posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.summary)}</description>
      <link>${postUrl(lang, post.slug)}</link>
      <guid isPermaLink="true">${postUrl(lang, post.slug)}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`).join("")}
  </channel>
</rss>`;

  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, file), feed, "utf-8");
  console.log(`✓ RSS feed generated (${lang}): ${posts.length} posts → public/${file}`);
}

Object.keys(FEEDS).forEach(generateFeed);
