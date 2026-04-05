"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact/Form";

const ContactSection = () => {
  const t = useTranslations();

  return (
    <section id="contact" className="py-6 md:py-20">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-mono text-sm mb-4 block">
              {"// contact"}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("contact.subtitle")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t("contact.description")}
            </p>

            <div className="space-y-6">
              <a
                href="tel:+34664109973"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("contact.form.phone")}
                  </p>
                  <p className="font-medium">{t("contact.phone")}</p>
                </div>
              </a>

              <a
                href="mailto:hola@codescouts.academy"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("contact.form.email")}
                  </p>
                  <p className="font-medium">{t("contact.email")}</p>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <p className="font-medium text-primary">
                    {t("contact.scheduleCall")}
                  </p>
                </div>
                <Button asChild variant="outline">
                  <a
                    href="https://calendly.com/codescouts/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("contact.callUs")}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
