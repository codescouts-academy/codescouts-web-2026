import { JsonLd } from "@/components/JsonLd";
import { generateContactMeta, breadcrumbSchema } from "@/lib/meta";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LocaleProps } from "@/i18n";
import Contact from "@/components/sections/Contact";

const Page = async ({ params }: LocaleProps) => {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          {
            name: locale === "es" ? "Contacto" : "Contact",
            url: `${process.env.SITE_URL ?? "https://www.codescouts.academy"}/${locale}/contact`,
          },
        ])}
      />
      <Contact />
    </>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateContactMeta(locale);
}
