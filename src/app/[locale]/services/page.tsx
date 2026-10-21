import { JsonLd } from "@/components/JsonLd";
import Services from "@/components/sections/Services";
import { Language, LocaleProps } from "@/i18n";
import {
  breadcrumbSchema,
  generateServicesMeta,
  serviceSchema,
} from "@/lib/meta";
import { Metadata } from "next";

const Page = async ({ params }: LocaleProps) => {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={serviceSchema(locale)} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "es" ? "Servicios" : "Services", path: ["services"] },
        ])}
      />
      <Services locale={locale as Language} />
    </>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateServicesMeta(locale);
}
