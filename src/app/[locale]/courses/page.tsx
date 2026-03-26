import { JsonLd } from "@/components/JsonLd";
import Courses from "@/components/sections/Courses";
import { LocaleProps } from "@/i18n";
import { coursesSchema, generateCoursesMeta } from "@/lib/meta";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

const Page = async ({ params }: LocaleProps) => {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={coursesSchema(locale)} />
      <Courses locale={locale} />;
    </>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateCoursesMeta(locale);
}
