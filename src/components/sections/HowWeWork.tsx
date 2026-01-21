"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp, Users, Compass, Monitor } from "lucide-react";

const HowWeWork = () => {
  const t = useTranslations();

  const features = [
    {
      icon: TrendingUp,
      title: t("howWeWork.continuousImprovement.title"),
      description: t("howWeWork.continuousImprovement.description"),
    },
    {
      icon: Compass,
      title: t("howWeWork.mentoring.title"),
      description: t("howWeWork.mentoring.description"),
    },
    {
      icon: Users,
      title: t("howWeWork.closedGroups.title"),
      description: t("howWeWork.closedGroups.description"),
    },
    {
      icon: Monitor,
      title: t("howWeWork.remoteOrOnsite.title"),
      description: t("howWeWork.remoteOrOnsite.description"),
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("howWeWork.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("howWeWork.subtitle")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
