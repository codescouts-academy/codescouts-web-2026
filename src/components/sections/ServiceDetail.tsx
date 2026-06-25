"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Users,
  Rocket,
  Briefcase,
  Code,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  Target,
  Building2,
  Lightbulb,
  BarChart3,
  Sparkles,
  Shield,
  Zap,
  LineChart,
  TrendingUp,
  Layers,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Language } from "@/i18n";
import { ServiceSlug, slugToTranslationKey } from "@/lib/services";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "technical-coaching": Users,
  "accelerated-program": Rocket,
  "cto-as-service": Briefcase,
  "software-consulting": Code,
  training: GraduationCap,
};

const benefitKeys = ["benefit1", "benefit2", "benefit3", "benefit4"];

type ServiceContent = {
  process: { icon: LucideIcon; title: string; description: string }[];
  idealFor: string;
  outcomes: string[];
};

const serviceContent: Record<ServiceSlug, Record<Language, ServiceContent>> = {
  "technical-coaching": {
    es: {
      process: [
        {
          icon: Users,
          title: "Inmersión en el equipo",
          description:
            "Tu technical coach se integra como un miembro más del equipo, participando en el día a día para entender la dinámica, los desafíos técnicos y las áreas de mejora.",
        },
        {
          icon: Lightbulb,
          title: "Transferencia en vivo",
          description:
            "A través de pair y mob programming, resolvemos problemas reales de tu producto mientras transmitimos conocimientos de TDD, Clean Code, refactoring y buenas prácticas.",
        },
        {
          icon: BarChart3,
          title: "Métricas y evolución",
          description:
            "Medimos el progreso con indicadores concretos: reducción de bugs, frecuencia de entrega, cobertura de tests y velocidad del equipo.",
        },
        {
          icon: TrendingUp,
          title: "Autonomía sostenible",
          description:
            "El objetivo final es que el equipo internalice las prácticas y pueda sostener la mejora continua sin dependencia externa.",
        },
      ],
      idealFor:
        "Equipos de desarrollo que quieren mejorar su calidad de código y velocidad de entrega sin detener la producción. Ideal para empresas que buscan una transformación real trabajando sobre su propio producto.",
      outcomes: [
        "Código más limpio y mantenible",
        "Reducción significativa de bugs en producción",
        "Entregas más frecuentes y predecibles",
        "Tests automatizados con alta cobertura",
        "Equipo empoderado y autónomo",
        "Prácticas de eXtreme Programming adoptadas",
      ],
    },
    en: {
      process: [
        {
          icon: Users,
          title: "Team immersion",
          description:
            "Your technical coach joins as a full team member, participating daily to understand dynamics, technical challenges, and improvement areas.",
        },
        {
          icon: Lightbulb,
          title: "Live knowledge transfer",
          description:
            "Through pair and mob programming, we solve real product problems while transferring knowledge of TDD, Clean Code, refactoring, and best practices.",
        },
        {
          icon: BarChart3,
          title: "Metrics & evolution",
          description:
            "We measure progress with concrete indicators: bug reduction, delivery frequency, test coverage, and team velocity.",
        },
        {
          icon: TrendingUp,
          title: "Sustainable autonomy",
          description:
            "The end goal is for the team to internalize the practices and sustain continuous improvement without external dependency.",
        },
      ],
      idealFor:
        "Development teams that want to improve code quality and delivery speed without stopping production. Ideal for companies seeking real transformation by working on their own product.",
      outcomes: [
        "Cleaner, more maintainable code",
        "Significant production bug reduction",
        "More frequent and predictable deliveries",
        "Automated tests with high coverage",
        "Empowered and autonomous team",
        "eXtreme Programming practices adopted",
      ],
    },
  },
  "accelerated-program": {
    es: {
      process: [
        {
          icon: Target,
          title: "Diagnóstico y plan a medida",
          description:
            "Evaluamos el nivel actual del equipo y diseñamos un programa intensivo adaptado a sus necesidades, tecnologías y objetivos de negocio.",
        },
        {
          icon: Layers,
          title: "Formación inmersiva",
          description:
            "Sesiones intensivas con alta carga práctica donde el equipo aprende haciendo, resolviendo ejercicios y katas diseñadas para su contexto.",
        },
        {
          icon: Zap,
          title: "Aplicación al proyecto real",
          description:
            "Transferimos lo aprendido al código y procesos del equipo, asegurando que los conceptos se apliquen inmediatamente en su día a día.",
        },
        {
          icon: Rocket,
          title: "Seguimiento y consolidación",
          description:
            "Acompañamos al equipo después del programa para asegurar que las prácticas se mantengan y evolucionen en el tiempo.",
        },
      ],
      idealFor:
        "Equipos nuevos que necesitan un ramp-up acelerado, o equipos existentes que quieren adoptar nuevas tecnologías o metodologías en tiempo récord.",
      outcomes: [
        "Ramp up acelerado (reduce semanas a días)",
        "Plan de aprendizaje personalizado",
        "Coaches con +10 años de experiencia",
        "Ejercitación práctica sobre casos reales",
        "Metodología probada con +30 equipos",
        "Seguimiento post-programa",
      ],
    },
    en: {
      process: [
        {
          icon: Target,
          title: "Diagnosis & custom plan",
          description:
            "We assess the team's current level and design an intensive program tailored to their needs, technologies, and business goals.",
        },
        {
          icon: Layers,
          title: "Immersive training",
          description:
            "Intensive sessions with high practical load where the team learns by doing, solving exercises and katas designed for their context.",
        },
        {
          icon: Zap,
          title: "Real project application",
          description:
            "We transfer learnings to the team's actual code and processes, ensuring immediate real-world application.",
        },
        {
          icon: Rocket,
          title: "Follow-up & consolidation",
          description:
            "We accompany the team post-program to ensure practices are maintained and evolve over time.",
        },
      ],
      idealFor:
        "New teams needing accelerated ramp-up, or existing teams wanting to adopt new technologies or methodologies in record time.",
      outcomes: [
        "Accelerated ramp-up (weeks reduced to days)",
        "Personalized learning plan",
        "Coaches with 10+ years experience",
        "Hands-on practice on real cases",
        "Proven methodology with 30+ teams",
        "Post-program follow-up",
      ],
    },
  },
  "cto-as-service": {
    es: {
      process: [
        {
          icon: Building2,
          title: "Auditoría tecnológica",
          description:
            "Analizamos tu stack tecnológico actual, procesos de desarrollo, equipo y objetivos de negocio para identificar fortalezas y oportunidades.",
        },
        {
          icon: Lightbulb,
          title: "Definición de estrategia",
          description:
            "Diseñamos una hoja de ruta tecnológica alineada con tus objetivos de negocio, incluyendo selección de tecnologías, arquitectura y plan de evolución.",
        },
        {
          icon: Shield,
          title: "Acompañamiento ejecutivo",
          description:
            "Actuamos como tu CTO externo en reuniones estratégicas, decisiones técnicas clave y reporting a stakeholders.",
        },
        {
          icon: LineChart,
          title: "Ejecución y revisión continua",
          description:
            "Supervisamos la implementación de la estrategia, ajustamos según resultados y aseguramos que la tecnología impulse el negocio.",
        },
      ],
      idealFor:
        "Startups y scale-ups que necesitan dirección tecnológica pero no están listas para un CTO interno a tiempo completo. También para empresas consolidadas que requieren una visión externa.",
      outcomes: [
        "Estrategia tecnológica clara y ejecutable",
        "Selección óptima de tecnologías",
        "Arquitectura escalable y mantenible",
        "Procesos de desarrollo optimizados",
        "Equipo técnico alineado con el negocio",
        "Crecimiento sostenible y predecible",
      ],
    },
    en: {
      process: [
        {
          icon: Building2,
          title: "Technology audit",
          description:
            "We analyze your current tech stack, development processes, team, and business goals to identify strengths and opportunities.",
        },
        {
          icon: Lightbulb,
          title: "Strategy definition",
          description:
            "We design a technology roadmap aligned with your business goals, including technology selection, architecture, and evolution plan.",
        },
        {
          icon: Shield,
          title: "Executive accompaniment",
          description:
            "We act as your external CTO in strategic meetings, key technical decisions, and stakeholder reporting.",
        },
        {
          icon: LineChart,
          title: "Execution & continuous review",
          description:
            "We oversee strategy implementation, adjust based on results, and ensure technology drives the business forward.",
        },
      ],
      idealFor:
        "Startups and scale-ups needing technology direction but not ready for a full-time internal CTO. Also for established companies requiring an external perspective.",
      outcomes: [
        "Clear and actionable technology strategy",
        "Optimal technology selection",
        "Scalable and maintainable architecture",
        "Optimized development processes",
        "Tech team aligned with business",
        "Sustainable and predictable growth",
      ],
    },
  },
  "software-consulting": {
    es: {
      process: [
        {
          icon: Code,
          title: "Análisis profundo",
          description:
            "Realizamos una revisión exhaustiva de tu código, arquitectura, procesos y metodologías de desarrollo para identificar los puntos críticos.",
        },
        {
          icon: Target,
          title: "Diagnóstico y priorización",
          description:
            "Clasificamos los hallazgos por impacto y esfuerzo, priorizando las acciones que generen mayor valor a corto y largo plazo.",
        },
        {
          icon: Layers,
          title: "Plan de acción iterativo",
          description:
            "Diseñamos un plan de mejora continua con entregas incrementales, permitiendo ver resultados desde las primeras iteraciones.",
        },
        {
          icon: Sparkles,
          title: "Transformación guiada",
          description:
            "Acompañamos al equipo durante la ejecución del plan, asegurando que cada mejora se implemente correctamente y genere el impacto esperado.",
        },
      ],
      idealFor:
        "Empresas con código legacy que necesitan evolucionar su producto, equipos que enfrentan problemas de calidad o deuda técnica, o proyectos donde la arquitectura actual limita el crecimiento.",
      outcomes: [
        "Código legacy modernizado y sostenible",
        "Deuda técnica reducida y gestionada",
        "Arquitectura mejorada y documentada",
        "Procesos de desarrollo optimizados",
        "Calidad de software measurable",
        "Plan de evolución a largo plazo",
      ],
    },
    en: {
      process: [
        {
          icon: Code,
          title: "Deep analysis",
          description:
            "We conduct a thorough review of your code, architecture, processes, and development methodologies to identify critical points.",
        },
        {
          icon: Target,
          title: "Diagnosis & prioritization",
          description:
            "We classify findings by impact and effort, prioritizing actions that generate the most value in the short and long term.",
        },
        {
          icon: Layers,
          title: "Iterative action plan",
          description:
            "We design a continuous improvement plan with incremental deliveries, delivering results from the first iterations.",
        },
        {
          icon: Sparkles,
          title: "Guided transformation",
          description:
            "We accompany the team during plan execution, ensuring each improvement is properly implemented and generates the expected impact.",
        },
      ],
      idealFor:
        "Companies with legacy code needing product evolution, teams facing quality issues or technical debt, or projects where current architecture limits growth.",
      outcomes: [
        "Modernized and sustainable legacy code",
        "Reduced and managed technical debt",
        "Improved and documented architecture",
        "Optimized development processes",
        "Measurable software quality",
        "Long-term evolution plan",
      ],
    },
  },

  training: {
    es: {
      process: [],
      idealFor: "",
      outcomes: [],
    },
    en: {
      process: [],
      idealFor: "",
      outcomes: [],
    },
  },
};

const ServiceDetail = ({
  locale,
  slug,
}: {
  locale: Language;
  slug: ServiceSlug;
}) => {
  const t = useTranslations();
  const serviceKey = slugToTranslationKey[slug];
  const Icon = iconMap[slug] ?? Users;
  const title = t(`services.${serviceKey}.title`);
  const description =
    t(`services.${serviceKey}.fullDescription`) ||
    t(`services.${serviceKey}.description`);
  const quote = t(`services.${serviceKey}.quote`);
  const hasQuote = quote && quote !== serviceKey;
  const content = serviceContent[slug][locale];

  return (
    <Layout>
      <section className="py-6 md:py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href={`/${locale}/services`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("services.title")}
              </Link>
            </Button>

            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {title}
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {description}
              </p>

              {hasQuote && (
                <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/80 text-lg mb-8">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              )}
            </motion.div>

            {/* Ideal for */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  {locale === "es" ? "¿Para quién es?" : "Who is it for?"}
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {content.idealFor}
              </p>
            </motion.div>

            {/* How it works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {locale === "es" ? "¿Cómo funciona?" : "How it works"}
              </h2>
              <div className="space-y-6">
                {content.process.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      {i < content.process.length - 1 && (
                        <div className="w-px h-full min-h-[2rem] bg-primary/20 mt-2" />
                      )}
                    </div>
                    <div className="pt-2 pb-8">
                      <h3 className="text-lg font-semibold mb-2">
                        {i + 1}. {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-12"
            >
              <h2 className="text-xl font-semibold mb-6 text-primary">
                {t("services.benefitsIncluded")}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {benefitKeys.map((benefitKey, i) => (
                  <motion.li
                    key={benefitKey}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      {t(`services.${serviceKey}.${benefitKey}`)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {locale === "es"
                  ? "¿Qué resultados puedes esperar?"
                  : "What results can you expect?"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {content.outcomes.map((outcome, i) => (
                  <motion.div
                    key={outcome}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl border border-border/40"
                  >
                    <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{outcome}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("services.ctaTitle")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                {t("services.ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="glow">
                  <Link href={`/${locale}/contact`}>
                    {t("common.contact")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${locale}/services`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {locale === "es"
                      ? "Ver otros servicios"
                      : "View other services"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
