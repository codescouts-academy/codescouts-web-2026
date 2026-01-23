import Courses from "@/components/sections/Courses";
import { LocaleProps } from "@/i18n";
import { generateCoursesMeta } from "@/lib/meta";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

const Page = async ({ params }: LocaleProps) => {
  const { locale } = await params;

  return <Courses locale={locale} />;
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateCoursesMeta(locale);
}
