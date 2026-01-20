import BlogPosts from "@/components/sections/BlogPosts";
import { routing } from "@/i18n/routing";
import { getPostsFromLang } from "@/lib/blog";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;

  const posts = getPostsFromLang(locale);

  return <BlogPosts blogPosts={posts} />;
}

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
