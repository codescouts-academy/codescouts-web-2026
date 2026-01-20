import { redirect } from "next/navigation";
import { getBlogPost, getPostsFromLang } from "@/lib/blog";
import Post from "@/components/sections/Post";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const BlogPost = async ({ params }: Props) => {
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

export default BlogPost;

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
