import { JsonLd } from "@/components/JsonLd";
import BlogPosts from "@/components/sections/BlogPosts";
import { LocaleProps } from "@/i18n";
import { routing } from "@/i18n/routing";
import { getPostsFromLang } from "@/lib/blog";
import { blogsSchema, generateBlogListMeta } from "@/lib/meta";
import { Metadata } from "next";

const Page = async ({ params }: LocaleProps) => {
  const { locale } = await params;

  const posts = getPostsFromLang(locale);

  return (
    <>
      <JsonLd data={blogsSchema(locale)} />
      <BlogPosts blogPosts={posts} />
    </>
  );
};

export default Page;

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateBlogListMeta(locale);
}
