"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import "./index.css";
import { Mouse } from "@/components/ui/mouse";

const translations = {
  es: {
    errorBadge: "Error 404",
    title: "Página",
    titleHighlight: "No Encontrada",
    description:
      "Parece que esta ruta no existe en nuestro código. No te preocupes, podemos ayudarte a encontrar el camino correcto.",
    backHome: "Volver al Inicio",
    contact: "Contactar",
    errorMessage: "Error",
    routeNotFound: "RouteNotFound",
    comment1: "// 🔍 No route matched this path",
    comment2: "// 💡 Tip: Check the URL or go back home",
  },
  en: {
    errorBadge: "Error 404",
    title: "Page",
    titleHighlight: "Not Found",
    description:
      "It seems this route doesn't exist in our code. Don't worry, we can help you find the right path.",
    backHome: "Back to Home",
    contact: "Contact",
    errorMessage: "Error",
    routeNotFound: "RouteNotFound",
    comment1: "// 🔍 No route matched this path",
    comment2: "// 💡 Tip: Check the URL or go back home",
  },
};

type Locale = keyof typeof translations;

const NotFound = () => {
  const [locale, setLocale] = useState<Locale>("es");
  const [currentPath, setCurrentPath] = useState("/unknown");

  useEffect(() => {
    // Detect locale from URL
    const path = window.location.pathname;
    setCurrentPath(path);

    const detectedLocale = path.split("/")[1] as Locale;
    if (translations[detectedLocale]) {
      setLocale(detectedLocale);
    } else {
      // Fallback to browser language
      const browserLang = navigator.language.split("-")[0] as Locale;
      setLocale(translations[browserLang] ? browserLang : "es");
    }
  }, []);

  const t = translations[locale];

  return (
    <html lang={locale}>
      <body>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-pattern">
          <Mouse />
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

          <div className="section-container relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* Error Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  {t.errorBadge}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              >
                <span className="text-foreground">{t.title}</span>
                <br />
                <span className="gradient-text">{t.titleHighlight}</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                {t.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" className="glow group">
                  <a href={`/${locale}`}>
                    <Home className="mr-2 h-4 w-4" />
                    {t.backHome}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="group">
                  <a href={`/${locale}/contact`}>
                    {t.contact}
                    <ArrowLeft className="ml-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </a>
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
                    <span className="ml-2 text-muted-foreground text-xs flex items-center gap-1">
                      <Terminal className="h-3 w-3" />
                      error.log
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <span className="text-destructive">{t.errorMessage}</span>
                      <span className="text-muted-foreground">:</span>{" "}
                      <span className="text-foreground">{t.routeNotFound}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">{"  at "}</span>
                      <span className="text-primary">navigator</span>
                      <span className="text-muted-foreground">.</span>
                      <span className="text-green-400">findPath</span>
                      <span className="text-muted-foreground">(</span>
                      <span className="text-orange-400">{`"${currentPath}"`}</span>
                      <span className="text-muted-foreground">)</span>
                    </p>
                    <p className="text-muted-foreground pt-2">{t.comment1}</p>
                    <p className="text-muted-foreground">{t.comment2}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
};

export default NotFound;
