import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocaleProps, Language } from "@/i18n";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import CourseDetail from "@/components/sections/CourseDetail";
import { COURSE_SLUGS, CourseSlug, getCourse } from "@/lib/courses";
import {
  breadcrumbSchema,
  courseDetailSchema,
  faqSchema,
  generateCourseDetailMeta,
} from "@/lib/meta";

type Props = LocaleProps & {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COURSE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

const Page = async ({ params }: Props) => {
  const { locale, slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const content = course.content[locale as "es" | "en"];
  const siteUrl =
    process.env.SITE_URL ?? "https://www.codescouts.academy";

  return (
    <>
      <JsonLd data={courseDetailSchema(slug as CourseSlug, locale as Language)} />
      <JsonLd data={faqSchema(content.faqs)} />
      <JsonLd
        data={breadcrumbSchema(locale as Language, [
          {
            name: locale === "es" ? "Formación" : "Training",
            url: `${siteUrl}/${locale}/courses`,
          },
          {
            name: content.name,
            url: `${siteUrl}/${locale}/courses/${slug}`,
          },
        ])}
      />
      <CourseDetail locale={locale as Language} slug={slug as CourseSlug} />
    </>
  );
};

export default Page;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return {};
  }

  return generateCourseDetailMeta(
    slug as CourseSlug,
    locale as "es" | "en",
  );
}
