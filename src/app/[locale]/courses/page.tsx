"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Code,
  Layers,
  Puzzle,
  Sparkles,
  Rocket,
  Box,
  TestTube,
  FileCode,
  Shapes,
  MessageSquarePlus,
  ArrowRight,
  Clock,
  Users,
  Target,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Courses = () => {
  const locale = useLocale();
  const t = useTranslations();

  const courses = [
    {
      id: "legacy-code",
      icon: Code,
      title: t("courses.legacyCode.title"),
      description: t("courses.legacyCode.description"),
      duration: "16-24",
      level: "Avanzado",
      tags: ["Refactoring", "Testing", "SOLID"],
    },
    {
      id: "frontend-architecture",
      icon: Layers,
      title: t("courses.frontendArchitecture.title"),
      description: t("courses.frontendArchitecture.description"),
      duration: "16-20",
      level: "Intermedio",
      tags: ["React", "Arquitectura", "Escalabilidad"],
    },
    {
      id: "design-patterns",
      icon: Puzzle,
      title: t("courses.designPatterns.title"),
      description: t("courses.designPatterns.description"),
      duration: "12-16",
      level: "Intermedio",
      tags: ["GoF Patterns", "OOP", "Diseño"],
    },
    {
      id: "clean-code",
      icon: Sparkles,
      title: t("courses.cleanCode.title"),
      description: t("courses.cleanCode.description"),
      duration: "8-12",
      level: "Básico",
      tags: ["Best Practices", "Legibilidad", "Mantenibilidad"],
    },
    {
      id: "nextjs",
      icon: Rocket,
      title: t("courses.nextJs.title"),
      description: t("courses.nextJs.description"),
      duration: "16-24",
      level: "Intermedio",
      tags: ["Next.js", "SSR", "Vercel"],
    },
    {
      id: "ddd",
      icon: Box,
      title: t("courses.ddd.title"),
      description: t("courses.ddd.description"),
      duration: "20-24",
      level: "Avanzado",
      tags: ["Dominio", "Bounded Context", "Agregados"],
    },
    {
      id: "tdd",
      icon: TestTube,
      title: t("courses.tdd.title"),
      description: t("courses.tdd.description"),
      duration: "12-16",
      level: "Intermedio",
      tags: ["Testing", "Red-Green-Refactor", "Unit Tests"],
    },
    {
      id: "react",
      icon: FileCode,
      title: t("courses.react.title"),
      description: t("courses.react.description"),
      duration: "24-32",
      level: "Básico a Intermedio",
      tags: ["React", "TypeScript", "Hooks"],
    },
    {
      id: "oop",
      icon: Shapes,
      title: t("courses.oop.title"),
      description: t("courses.oop.description"),
      duration: "12-16",
      level: "Básico",
      tags: ["OOP", "SOLID", "Abstracción"],
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "Flexibilidad horaria",
      description: "Adaptamos los horarios a las necesidades de tu equipo",
    },
    {
      icon: Users,
      title: "Grupos reducidos",
      description: "Máximo 12 personas para garantizar atención personalizada",
    },
    {
      icon: Target,
      title: "Enfoque práctico",
      description: "Más del 70% del curso es práctica sobre casos reales",
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
              {t("courses.title")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Cursos diseñados para equipos que buscan la{" "}
              <span className="text-primary">excelencia</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("courses.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-border/50 bg-secondary/20">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 md:py-32">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <course.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                        {course.level}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {course.duration} {t("common.hours")}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow gap-2">
                    <CardDescription className="text-sm leading-relaxed">
                      {course.description}
                    </CardDescription>

                    {/* Tags pegados al bottom */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-primary/5 border border-primary/10 rounded text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Custom Course Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: courses.length * 0.05 }}
            >
              <Card className="h-full border-dashed border-2 border-primary/30 bg-primary/5 hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                    <MessageSquarePlus className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t("courses.customCourse.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {t("courses.customCourse.description")}
                  </CardDescription>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/${locale}/contact`}>
                      {t("common.contact")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
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
              ¿Necesitas formación personalizada?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Diseñamos programas a medida adaptados a las necesidades
              específicas de tu equipo y tecnologías
            </p>
            <Button asChild size="lg" className="glow">
              <Link href={`/${locale}/contact`}>
                Solicitar información
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
