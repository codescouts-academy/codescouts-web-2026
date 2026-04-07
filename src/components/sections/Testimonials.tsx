"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/testimonials";

const Testimonials = () => {
  const locale = useLocale();
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isSpanish = locale === "es";

  const blobCache = useRef<Map<string, string>>(new Map());
  const [cachedSrcs, setCachedSrcs] = useState<Map<string, string>>(new Map());

  const fetchAndCache = useRef(async (url: string) => {
    if (blobCache.current.has(url)) return;
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      blobCache.current.set(url, blobUrl);
      setCachedSrcs(new Map(blobCache.current));
    } catch (_) { }
  });

  useEffect(() => {
    [0, 1, 2].forEach((idx) => {
      fetchAndCache.current(testimonials[idx % testimonials.length].image);
    });
  }, []);

  useEffect(() => {
    [1, 2].forEach((offset) => {
      const idx = (currentIndex + offset) % testimonials.length;
      fetchAndCache.current(testimonials[idx].image);
    });
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      blobCache.current.forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
    };
  }, []);

  const getImageSrc = (url: string) => cachedSrcs.get(url) ?? url;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 10000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentTestimonial = testimonials[currentIndex];
  const previousLabel = isSpanish
    ? "Ver testimonio anterior"
    : "View previous testimonial";
  const nextLabel = isSpanish
    ? "Ver testimonio siguiente"
    : "View next testimonial";

  return (
    <section className="py-6 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div
            className="glass-card p-8 md:p-12 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <p className="text-lg md:text-xl leading-relaxed mb-8 text-foreground/90">
                  "{currentTestimonial.text[locale]}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={getImageSrc(currentTestimonial.image)}
                    alt={currentTestimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=random`;
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial.role}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    aria-label={
                      isSpanish
                        ? `Ir al testimonio ${index + 1}`
                        : `Go to testimonial ${index + 1}`
                    }
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="h-10 w-10"
                  aria-label={previousLabel}
                  title={previousLabel}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="h-10 w-10"
                  aria-label={nextLabel}
                  title={nextLabel}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
