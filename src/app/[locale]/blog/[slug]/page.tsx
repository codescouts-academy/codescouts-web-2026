import { redirect } from "next/navigation";
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
  howToEnrollSchema,
} from "@/lib/meta";
import { LocaleProps } from "@/i18n";
import { JsonLd } from "@/components/JsonLd";

type PageProps = LocaleProps & {
  params: Promise<{ slug: string }>;
};

/** Detect a YouTube embed URL in markdown content. */
function extractYouTubeUrl(content: string): string | undefined {
  const match = content.match(
    /(?:youtube\.com\/embed\/|youtube\.com\/v\/|youtu\.be\/|iframe.*src="?[^"]*youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  );
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  return undefined;
}

const Page = async ({ params }: PageProps) => {
  const { locale, slug } = await params;

  const post = getBlogPost(slug || "", locale || "en");

  if (!post) {
    redirect(`/${locale}/blog`);
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
    url: `/${locale}/courses/${slug}`,
  }));

  const videoUrl = extractYouTubeUrl(post.content);

  return (
    <>
      <JsonLd data={blogPostSchema(post, locale, slug, relatedCourses.map((c) => c.url), videoUrl)} />
      {videoUrl && (
        <JsonLd data={videoObjectSchema(post.title, videoUrl)} />
      )}
      <JsonLd data={howToEnrollSchema(locale)} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          {
            name: locale === "es" ? "Blog" : "Blog",
            url: `/${locale}/blog`,
          },
          {
            name: post.title,
            url: `/${locale}/blog/${slug}`,
          },
        ])}
      />
      <Post post={post} relatedPosts={relatedPosts} relatedCourses={relatedCourses} />
    </>
  );
};

export default Page;

export const dynamic = "force-static";

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
    return { title: "Post not found" };
  }

  const relatedCourseSlugs = getRelatedCourses(post.tags ?? []);
  const videoUrl = extractYouTubeUrl(post.content);

  return generateBlogPostMeta(
    post,
    locale,
    slug,
    relatedCourseSlugs.map((s) => `/${locale}/courses/${s}`),
    videoUrl,
  );
}
