"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Scale,
  Shield,
  FileText,
  AlertCircle,
  BookOpen,
  Gavel,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";

type LocalizedString = {
  es: string;
  en: string;
};

type LegalSection = {
  icon: LucideIcon;
  title: LocalizedString;
  content: LocalizedString;
  details?: Array<{
    label: LocalizedString;
    value: string;
  }>;
  items?: Array<LocalizedString>;
};

const AvisoLegal = () => {
  const locale = useLocale() as keyof LocalizedString;
  const t = useTranslations();

  const legalSections: LegalSection[] = [
    {
      icon: FileText,
      title: {
        es: "Datos Identificativos",
        en: "Identifying Information",
      },
      content: {
        es: "En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa a los usuarios del sitio web de los datos del titular.",
        en: "In compliance with article 10 of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce (LSSI-CE), website users are informed of the owner's data.",
      },
      details: [
        {
          label: { es: "Titular", en: "Owner" },
          value: "WEARESCOUTS, SL",
        },
        { label: { es: "NIF/CIF", en: "Tax ID" }, value: "ESB26606152" },
        {
          label: { es: "Correo Electrónico", en: "Email" },
          value: t("contact.email"),
        },
      ],
    },
    {
      icon: Scale,
      title: {
        es: "Objeto",
        en: "Purpose",
      },
      content: {
        es: "El presente aviso legal regula el uso y utilización del sitio web, del que es titular la empresa mencionada. La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.",
        en: "This legal notice regulates the use of the website, owned by the aforementioned company. Browsing the website grants the status of user and implies full and unreserved acceptance of each and every provision included in this Legal Notice.",
      },
    },
    {
      icon: Shield,
      title: {
        es: "Condiciones de Uso",
        en: "Terms of Use",
      },
      content: {
        es: "El usuario se compromete a utilizar el sitio web, sus servicios y contenidos de forma diligente, correcta y lícita y, en particular, se compromete a:",
        en: "The user agrees to use the website, its services and contents in a diligent, correct and lawful manner and, in particular, agrees to:",
      },
      items: [
        {
          es: "No utilizar el sitio web con fines ilícitos o contrarios a lo establecido en el presente aviso legal",
          en: "Not use the website for unlawful purposes or contrary to what is established in this legal notice",
        },
        {
          es: "No acceder o intentar acceder a recursos restringidos del sitio web sin cumplir las condiciones exigidas",
          en: "Not access or attempt to access restricted resources of the website without meeting the required conditions",
        },
        {
          es: "No provocar daños en los sistemas físicos o lógicos del sitio web, de sus proveedores o de terceros",
          en: "Not cause damage to the physical or logical systems of the website, its suppliers or third parties",
        },
        {
          es: "No introducir o difundir virus informáticos o cualquier otro sistema que pueda causar daños",
          en: "Not introduce or spread computer viruses or any other system that may cause damage",
        },
        {
          es: "Respetar los derechos de propiedad intelectual e industrial del sitio web y de terceros",
          en: "Respect the intellectual and industrial property rights of the website and third parties",
        },
      ],
    },
    {
      icon: BookOpen,
      title: {
        es: "Propiedad Intelectual e Industrial",
        en: "Intellectual and Industrial Property",
      },
      content: {
        es: "Todos los contenidos del sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece al titular, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación sobre los mismos más allá de lo estrictamente necesario para el correcto uso del sitio web.",
        en: "All contents of the website, including texts, photographs, graphics, images, icons, technology, software, as well as its graphic design and source codes, constitute a work whose ownership belongs to the owner, without any exploitation rights being transferred to the user beyond what is strictly necessary for the correct use of the website.",
      },
    },
    {
      icon: AlertCircle,
      title: {
        es: "Responsabilidades",
        en: "Responsibilities",
      },
      content: {
        es: "El titular no se hace responsable de los daños y perjuicios de cualquier naturaleza derivados de: la falta de disponibilidad, continuidad o calidad del funcionamiento del sitio web y de los servicios; la existencia de virus, programas maliciosos o lesivos en los contenidos; el uso ilícito, negligente, fraudulento o contrario a este aviso legal; o la falta de licitud, calidad, fiabilidad, utilidad y disponibilidad de los servicios prestados por terceros.",
        en: "The owner is not responsible for damages of any kind arising from: lack of availability, continuity or quality of operation of the website and services; existence of viruses, malicious or harmful programs in the contents; unlawful, negligent, fraudulent use or contrary to this legal notice; or lack of legality, quality, reliability, usefulness and availability of services provided by third parties.",
      },
    },
    {
      icon: Gavel,
      title: {
        es: "Legislación Aplicable y Jurisdicción",
        en: "Applicable Law and Jurisdiction",
      },
      content: {
        es: "La relación entre el titular y el usuario se regirá por la normativa española vigente. En caso de controversia, las partes podrán someter sus conflictos a arbitraje o acudir a la jurisdicción ordinaria, correspondiendo a los Juzgados y Tribunales del domicilio del usuario la resolución de los conflictos.",
        en: "The relationship between the owner and the user will be governed by current Spanish regulations. In case of controversy, the parties may submit their conflicts to arbitration or resort to ordinary jurisdiction, with the Courts and Tribunals of the user's domicile being responsible for resolving conflicts.",
      },
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
              {locale === "es" ? "Información Legal" : "Legal Information"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {locale === "es" ? "Aviso Legal" : "Legal Notice"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {locale === "es"
                ? "Términos y condiciones de uso del sitio web"
                : "Terms and conditions of use of the website"}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              {locale === "es"
                ? "Última actualización: 21 de enero de 2026"
                : "Last updated: January 21, 2026"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legal Sections */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid gap-8 max-w-5xl mx-auto">
            {legalSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="bg-card border-b border-border/50 p-6 group-hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {section.title[locale]}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content[locale]}
                    </p>

                    {/* Details List */}
                    {section.details && (
                      <div className="space-y-3 bg-card/50 rounded-xl p-4 border border-border/30">
                        {section.details.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center gap-2"
                          >
                            <span className="font-semibold text-sm min-w-[160px]">
                              {detail.label[locale]}:
                            </span>
                            <span className="text-muted-foreground text-sm">
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Items List */}
                    {section.items && (
                      <ul className="space-y-3">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="text-primary mt-1 flex-shrink-0">
                              •
                            </span>
                            <span className="text-muted-foreground text-sm leading-relaxed">
                              {item[locale]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AvisoLegal;
