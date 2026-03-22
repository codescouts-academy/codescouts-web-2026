"use client";

import { motion } from "framer-motion";
import { Award, Users, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations();

  const values = [
    {
      icon: Award,
      title: t("about.excellence.title"),
      description: t("about.excellence.description"),
    },
    {
      icon: Users,
      title: t("about.teamwork.title"),
      description: t("about.teamwork.description"),
    },
    {
      icon: Sparkles,
      title: t("about.environment.title"),
      description: t("about.environment.description"),
    },
  ];

  return (
    <section id="about" className="py-6 md:py-20 relative">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            {"// " + t("about.tagline")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("about.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 service-card group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <value.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
