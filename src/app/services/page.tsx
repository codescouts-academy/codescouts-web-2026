import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Users,
  Rocket,
  Briefcase,
  Code,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: "technical-coaching",
      icon: Users,
      title: t("services.technicalCoaching.title"),
      description: t("services.technicalCoaching.fullDescription"),
      quote: t("services.technicalCoaching.quote"),
      benefits: [
        "Mejora en la calidad del código",
        "Aumento de productividad del equipo",
        "Transferencia de conocimiento efectiva",
        "Desarrollo de buenas prácticas",
      ],
    },
    {
      id: "accelerated-program",
      icon: Rocket,
      title: t("services.acceleratedProgram.title"),
      description: t("services.acceleratedProgram.fullDescription"),
      quote: t("services.acceleratedProgram.quote"),
      benefits: [
        "Ramp up acelerado",
        "Programa personalizado",
        "Ejercitación práctica",
        "Coaches con +10 años de experiencia",
      ],
    },
    {
      id: "cto-as-service",
      icon: Briefcase,
      title: t("services.ctoAsService.title"),
      description: t("services.ctoAsService.description"),
      quote: t("services.ctoAsService.quote"),
      benefits: [
        "Estrategia tecnológica definida",
        "Selección de tecnologías óptimas",
        "Crecimiento sostenible",
        "Componentes tecnológicos a medida",
      ],
    },
    {
      id: "software-consulting",
      icon: Code,
      title: t("services.softwareConsulting.title"),
      description: t("services.softwareConsulting.description"),
      quote: t("services.softwareConsulting.quote"),
      benefits: [
        "Análisis de puntos de mejora",
        "Revisión de metodología",
        "Plan iterativo de evolución",
        "Optimización del producto",
      ],
    },
    {
      id: "training",
      icon: GraduationCap,
      title: t("services.training.title"),
      description: t("services.training.description"),
      quote: "",
      benefits: [
        "Cursos a medida",
        "Aprendizaje práctico",
        "Metodología proactiva",
        "Aplicación inmediata",
      ],
      linkTo: "/courses",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
              {t("services.title")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("services.subtitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Nos especializamos en desarrollar equipos de alto rendimiento a
              través de prácticas de eXtreme Programming
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <div className="section-container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>

                  {service.quote && (
                    <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/80">
                      "{service.quote}"
                    </blockquote>
                  )}

                  {service.linkTo ? (
                    <Button asChild className="glow">
                      <Link href={service.linkTo}>
                        Ver cursos disponibles
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="glow">
                      <Link href="/contact">
                        {t("common.contact")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Benefits Card */}
                <div className="bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                  <h3 className="text-lg font-semibold mb-6 text-primary">
                    Beneficios
                  </h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para llevar a tu equipo al siguiente nivel?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Agenda una llamada con nosotros y descubre cómo podemos ayudarte
            </p>
            <Button asChild size="lg" className="glow">
              <Link href="/contact">
                {t("contact.subtitle")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
