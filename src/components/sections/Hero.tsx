"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const Hero = () => {
  const locale = useLocale();
  const t = useTranslations();

  const scrollToContent = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero-pattern">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="section-container relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t("hero.tagline")}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-foreground">{t("hero.title")}</span>
            <br />
            <span className="gradient-text">{t("hero.titleHighlight")}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="glow group">
              <Link href={`/${locale}/services`}>
                {t("hero.ctaSecondary")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/contact`}>{t("common.contact")}</Link>
            </Button>
          </motion.div>

          {/* Code Snippet Decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 max-w-lg mx-auto"
          >
            <div className="glass-card p-4 font-mono text-sm text-left">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-primary/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-muted-foreground text-xs">
                  excellence.ts
                </span>
              </div>
              <div className="space-y-1">
                <p>
                  <span className="text-primary">const</span>{" "}
                  <span className="text-foreground">team</span>{" "}
                  <span className="text-muted-foreground">=</span>{" "}
                  <span className="text-primary">await</span>{" "}
                  <span className="text-foreground">CodeScouts</span>
                  <span className="text-muted-foreground">.</span>
                  <span className="text-green-400">coach</span>
                  <span className="text-muted-foreground">(</span>
                  <span className="text-foreground">yourTeam</span>
                  <span className="text-muted-foreground">);</span>
                </p>
                <p>
                  <span className="text-primary">const</span>{" "}
                  <span className="text-foreground">result</span>{" "}
                  <span className="text-muted-foreground">=</span>{" "}
                  <span className="text-foreground">team</span>
                  <span className="text-muted-foreground">.</span>
                  <span className="text-green-400">deliverExcellence</span>
                  <span className="text-muted-foreground">();</span>
                </p>
                <p className="text-muted-foreground">
                  {"// 🚀 Technical excellence achieved"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
