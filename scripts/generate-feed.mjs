import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "..", "src", "content", "blog");
const publicDir = path.join(__dirname, "..", "public");
const siteUrl = "https://www.codescouts.academy";

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return {};
  const frontmatter = {};
  match[1].split("\n").forEach((line) => {
    const sep = line.indexOf(": ");
    if (sep > 0) {
      const key = line.slice(0, sep).trim();
      let value = line.slice(sep + 2).trim();
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value.replace(/'/g, '"'));
        } catch {
          value = value.slice(1, -1).split(",").map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
        }
      } else {
        value = value.replace(/^['"]|['"]$/g, "");
      }
      frontmatter[key] = value;
    }
  });
  return frontmatter;
}

function getPosts() {
  const posts = [];

  try {
    const langs = fs.readdirSync(blogDir);
    for (const lang of langs) {
      const langDir = path.join(blogDir, lang);
      if (!fs.statSync(langDir).isDirectory()) continue;

      const files = fs.readdirSync(langDir).filter((f) => f.endsWith(".md"));
      for (const file of files) {
        const raw = fs.readFileSync(path.join(langDir, file), "utf-8");
        const data = extractFrontmatter(raw);
        const slug = file.replace(/\.md$/, "");
        posts.push({
          slug,
          lang,
          title: data.title || slug,
          summary: data.summary || "",
          date: data.date || new Date().toISOString(),
          author: data.author || "CodeScouts",
          tags: data.tags || [],
        });
      }
    }
  } catch {
    // blog dir may not exist
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateFeed() {
  const posts = getPosts();

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>CodeScouts Blog</title>
    <description>Technical coaching, TDD, Clean Code, software architecture and more.</description>
    <link>${siteUrl}/es/blog</link>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.slice(0, 20).map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.summary)}</description>
      <link>${siteUrl}/${post.lang}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/${post.lang}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`).join("")}
  </channel>
</rss>`;

  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, "feed.xml"), feed, "utf-8");
  console.log(`✓ RSS feed generated: ${posts.length} posts`);
}

generateFeed();
