import { redirect } from "next/navigation";
import { getBlogPost, getPostsFromLang } from "@/lib/blog";
import Post from "@/components/sections/Post";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { generateBlogPostMeta } from "@/lib/meta";
import { LocaleProps } from "@/i18n";

type Props = LocaleProps & {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: Props) => {
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

  return <Post post={post} relatedPosts={relatedPosts} />;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return generateBlogPostMeta(post, locale, slug);
}
