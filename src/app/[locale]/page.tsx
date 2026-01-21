import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowWeWork from "@/components/sections/HowWeWork";
import HowWeHelp from "@/components/sections/HowWeHelp";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <HowWeWork />
      <HowWeHelp />
      <Services />
      <Testimonials />
      <ContactSection />
    </Layout>
  );
};

export default Index;
