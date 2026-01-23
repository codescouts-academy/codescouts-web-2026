import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowWeWork from "@/components/sections/HowWeWork";
import HowWeHelp from "@/components/sections/HowWeHelp";
import ServicesSection from "@/components/sections/ServicesSection";
import Testimonials from "@/components/sections/Testimonials";
import ContactSection from "@/components/sections/ContactSection";
import { LocaleProps } from "@/i18n";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { generateHomeMeta } from "@/lib/meta";
import { routing } from "@/i18n/routing";

const Page = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <HowWeWork />
      <HowWeHelp />
      <ServicesSection />
      <Testimonials />
      <ContactSection />
    </Layout>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateHomeMeta(locale);
}
