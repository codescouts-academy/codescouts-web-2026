"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Users,
  Rocket,
  Crown,
  Code2,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Services = () => {
  const t = useTranslations();

  const services = [
    {
      icon: Users,
      title: t("services.technicalCoaching.title"),
      description: t("services.technicalCoaching.description"),
      href: "/services/technical-coaching",
    },
    {
      icon: Rocket,
      title: t("services.acceleratedProgram.title"),
      description: t("services.acceleratedProgram.description"),
      href: "/services/accelerated-program",
    },
    {
      icon: Crown,
      title: t("services.ctoAsService.title"),
      description: t("services.ctoAsService.description"),
      href: "/services/cto-as-service",
    },
    {
      icon: Code2,
      title: t("services.softwareConsulting.title"),
      description: t("services.softwareConsulting.description"),
      href: "/services/software-consulting",
    },
    {
      icon: GraduationCap,
      title: t("services.training.title"),
      description: t("services.training.description"),
      href: "/courses",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            {"// services"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("services.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-8 service-card group ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <Button asChild variant="ghost" className="group/btn p-0 h-auto">
                <Link
                  href={service.href}
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  {t("common.learnMore")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
