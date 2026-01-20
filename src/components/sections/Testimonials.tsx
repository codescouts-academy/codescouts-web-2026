"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Juan Alvarez",
    role: "Backend developer",
    company: "Mirai",
    text: "Superasteis mis expectativas con creces. Tanto Tomas como Damian son dos grandes profesionales a nivel técnico y a nivel enseñanza (cosa mucho mas difícil de encontrar desde mi punto de vista en el mundo técnico). He hecho otras formaciones con otras empresas y puedo decir que este formato me ha gustado mas que cualquiera.",
    image:
      "https://www.codescouts.academy/images/testimonials/juan-alvarez.png",
  },
  {
    name: "Juanjo Hernandez",
    role: "Responsable del área de Nuevos Desarrollos",
    company: "Movicoders",
    text: "Durante nuestra colaboración, Damián nos ayudó a mejorar el nivel del equipo de forma significativa. Mediante dinámicas de mob-programming en sesiones técnicas y fomentando el debate, la reflexión y la participación. Nos acompañó en el proceso de definición de nuestra arquitectura, siendo una pieza clave en él.",
    image:
      "https://www.codescouts.academy/images/testimonials/juanjo-hernandez.png",
  },
  {
    name: "Marcos Broto",
    role: "Ingeniero de software",
    company: "Movicoders",
    text: "Definitivamente conseguimos dar ese salto cualitativo. Gracias a Codescouts y en concreto a Damián y su profunda experiencia con javascript y react, desarrollamos una arquitectura frontend que nos facilitase el desarrollo en términos de estructuración de los proyectos.",
    image:
      "https://www.codescouts.academy/images/testimonials/marcos-broto.png",
  },
  {
    name: "Ignacio Soler",
    role: "Tribe Lead Specialized Insurance",
    company: "AXA Partners",
    text: "Todo estuvo perfecto, la verdad. Ya teníamos unas expectativas muy altas porque conocemos la calidad del servicio. El equipo está muy contento con la formación recibida y ha servido para cambiar algunas de sus practicas.",
    image:
      "https://www.codescouts.academy/images/testimonials/ignacio-soler.png",
  },
  {
    name: "Erik Campobadal",
    role: "Senior Software Engineer",
    company: "Submer",
    text: "Nos hacia falta una mano para formar a todo el equipo en metodologías agile y dar soporte técnico. CodeScouts ha tenido mucho impacto sobre nuestra metodología de trabajo, y se ha notado el antes y el después en question de meses.",
    image:
      "https://www.codescouts.academy/images/testimonials/erik-campobadal.png",
  },
  {
    name: "Jonathan Huet",
    role: "Senior Platform Architect",
    company: "Submer",
    text: "Hemos experimentado un significativo impulso en nuestro desarrollo, tanto a nivel tecnológico como metodológico, gracias a la colaboración con Damian. Su enfoque y habilidades han acelerado nuestro progreso, permitiéndonos simplificar y aplicar buenas prácticas en el desarrollo.",
    image:
      "https://www.codescouts.academy/images/testimonials/jonathan-huet.png",
  },
  {
    name: "Manuel Valladares",
    role: "Senior Software Engineer",
    company: "Mirai",
    text: "Damián y Tomás demostraron un profundo conocimiento en desarrollo de software desde el principio. Su habilidad para simplificar conceptos complejos y ofrecer explicaciones claras hizo que cada sesión fuera accesible y entretenida para todos.",
    image:
      "https://www.codescouts.academy/images/testimonials/manuel-valladares.png",
  },
  {
    name: "Sebastián Espinoza",
    role: "Tech Lead",
    company: "AXA Partners",
    text: "Contábamos con muchos proyectos que ofrecían en cierta medida la misma solución pero con distintas estrategias y arquitectura con lo cual se hacia complejo su progreso y mantenimiento. Nos han ayudado a clarificar conceptos y a definir una estrategia que se adapte a nuestros proyectos.",
    image:
      "https://www.codescouts.academy/images/testimonials/sebastian-espinoza.png",
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const currentTestimonial = testimonials[currentIndex];

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 relative">
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
                  "{currentTestimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=random`;
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {currentTestimonial.name}
                    </h4>
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

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="h-10 w-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="h-10 w-10"
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
