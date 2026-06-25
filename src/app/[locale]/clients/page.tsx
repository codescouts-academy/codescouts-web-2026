import { JsonLd } from "@/components/JsonLd";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { breadcrumbSchema, generateClientsMeta } from "@/lib/meta";
import { LocaleProps } from "@/i18n";
import ClientsList from "@/components/sections/ClientsList";

const Page = async ({ params }: LocaleProps) => {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          {
            name: locale === "es" ? "Clientes" : "Clients",
            url: `${process.env.SITE_URL ?? "https://www.codescouts.academy"}/${locale}/clients`,
          },
        ])}
      />
      <ClientsList locale={locale} />
    </>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateClientsMeta(locale);
}
