import { notFound } from "next/navigation";
import {
  getBlogPost,
  getPostsFromLang,
  getRelatedCourses,
} from "@/lib/blog";
import { COURSES } from "@/lib/courses";
import Post from "@/components/sections/Post";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import {
  blogPostSchema,
  breadcrumbSchema,
  generateBlogPostMeta,
  videoObjectSchema,
} from "@/lib/meta";
import { LocaleProps } from "@/i18n";
import { JsonLd } from "@/components/JsonLd";

type PageProps = LocaleProps & {
  params: Promise<{ slug: string }>;
};

/** Detect a YouTube video ID in markdown content. */
function extractYouTubeId(content: string): string | undefined {
  const match = content.match(
    /(?:youtube\.com\/embed\/|youtube\.com\/v\/|youtu\.be\/|iframe.*src="?[^"]*youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  );
  return match?.[1];
}

const Page = async ({ params }: PageProps) => {
  const { locale, slug } = await params;

  const post = getBlogPost(slug || "", locale || "en");

  if (!post) {
    notFound();
  }

  const posts = getPostsFromLang(locale);
  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug && p.lang === locale)
    .filter((p) => p.tags?.some((tag) => post.tags?.includes(tag)))
    .slice(0, 3);

  const relatedCourseSlugs = getRelatedCourses(post.tags ?? []);
  const relatedCourses = relatedCourseSlugs.map((slug) => ({
    slug,
    name:
      locale === "es"
        ? COURSES[slug].content.es.h1
        : COURSES[slug].content.en.h1,
    url: `/${locale}/courses/${slug}/`,
  }));

  const videoId = extractYouTubeId(post.content);

  return (
    <>
      <JsonLd data={blogPostSchema(post, locale, slug)} />
      {videoId && <JsonLd data={videoObjectSchema(post, videoId)} />}
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: "Blog", path: ["blog"] },
          { name: post.title, path: ["blog", slug] },
        ])}
      />
      <Post post={post} relatedPosts={relatedPosts} relatedCourses={relatedCourses} />
    </>
  );
};

export default Page;

export const dynamic = "force-static";
// Unknown slugs must 404, not render on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }));
  const params = locales.flatMap((locale) => {
    const posts = getPostsFromLang(locale.locale);
    return posts.map((post) => ({ locale: locale.locale, slug: post.slug }));
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);

  if (!post) {
    return {};
  }

  return generateBlogPostMeta(post, locale, slug, extractYouTubeId(post.content));
}
