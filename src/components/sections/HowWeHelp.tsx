"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Bug, Rocket, TrendingUp, Heart, Zap } from "lucide-react";

const HowWeHelp = () => {
  const { t } = useTranslation();

  const metrics = [
    {
      icon: Bug,
      label: t("howWeHelp.bugReduction"),
      number: "01",
    },
    {
      icon: Rocket,
      label: t("howWeHelp.deliveryFrequency"),
      number: "02",
    },
    {
      icon: TrendingUp,
      label: t("howWeHelp.teamPerformance"),
      number: "03",
    },
    {
      icon: Heart,
      label: t("howWeHelp.talentRetention"),
      number: "04",
    },
    {
      icon: Zap,
      label: t("howWeHelp.teamEmpowerment"),
      number: "05",
    },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("howWeHelp.title")} <span className="text-3xl">🙏</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("howWeHelp.subtitle")} 👇
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 text-center group hover:border-primary/50 transition-all"
            >
              <span className="text-primary font-mono text-sm mb-4 block opacity-60">
                {metric.number}
              </span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <metric.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp;
