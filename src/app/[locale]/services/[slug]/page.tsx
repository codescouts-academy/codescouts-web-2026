import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { LocaleProps } from "@/i18n";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { SERVICE_SLUGS, ServiceSlug } from "@/lib/services";
import {
  breadcrumbSchema,
  generateServiceDetailMeta,
  singleServiceSchema,
} from "@/lib/meta";

type Props = LocaleProps & {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

const Page = async ({ params }: Props) => {
  const { locale, slug } = await params;

  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) {
    notFound();
  }

  return (
    <>
      <JsonLd data={singleServiceSchema(slug as ServiceSlug, locale as any)} />
      <JsonLd
        data={breadcrumbSchema(locale as any, [
          {
            name:
              locale === "es" ? "Servicios" : "Services",
            url: `${process.env.SITE_URL ?? "https://www.codescouts.academy"
              }/${locale}/services`,
          },
          {
            name: slug,
            url: `${process.env.SITE_URL ?? "https://www.codescouts.academy"
              }/${locale}/services/${slug}`,
          },
        ])}
      />
      <ServiceDetail locale={locale as any} slug={slug as ServiceSlug} />
    </>
  );
};

export default Page;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) {
    return {};
  }

  return generateServiceDetailMeta(slug as ServiceSlug, locale as any);
}
