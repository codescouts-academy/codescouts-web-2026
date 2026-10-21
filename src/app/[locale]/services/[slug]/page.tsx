import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { Language, LocaleProps } from "@/i18n";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import ServiceDetail from "@/components/sections/ServiceDetail";
import {
  breadcrumbSchema,
  generateServiceDetailMeta,
  SERVICE_PAGE_SLUGS,
  serviceName,
  singleServiceSchema,
} from "@/lib/meta";

type Props = LocaleProps & {
  params: Promise<{ slug: string }>;
};

type ServicePageSlug = (typeof SERVICE_PAGE_SLUGS)[number];

const isServicePage = (slug: string): slug is ServicePageSlug =>
  (SERVICE_PAGE_SLUGS as readonly string[]).includes(slug);

// `training` is not prerendered: it 308s to /courses/ (see next.config.ts).
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_PAGE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

const Page = async ({ params }: Props) => {
  const { locale, slug } = await params;

  if (slug === "training") {
    redirect(`/${locale}/courses/`);
  }

  if (!isServicePage(slug)) {
    notFound();
  }

  return (
    <>
      <JsonLd data={singleServiceSchema(slug, locale as Language)} />
      <JsonLd
        data={breadcrumbSchema(locale as Language, [
          { name: locale === "es" ? "Servicios" : "Services", path: ["services"] },
          { name: serviceName(slug, locale as Language), path: ["services", slug] },
        ])}
      />
      <ServiceDetail locale={locale as Language} slug={slug} />
    </>
  );
};

export default Page;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isServicePage(slug)) {
    return {};
  }

  return generateServiceDetailMeta(slug, locale as Language);
}
