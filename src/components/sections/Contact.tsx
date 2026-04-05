"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Linkedin,
  Github,
  Youtube,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact/Form";

const Contact = () => {
  const t = useTranslations();

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.form.email"),
      value: t("contact.email"),
      href: `mailto:${t("contact.email")}`,
    },
    {
      icon: Phone,
      label: t("contact.form.phone"),
      value: t("contact.phone"),
      href: `tel:${t("contact.phone").replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: t("contact.form.location"),
      value: t("contact.location"),
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/codescouts-academy",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/codescouts",
      label: "LinkedIn",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@code_scouts",
      label: "YouTube",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-6 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
              {t("contact.title")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("contact.subtitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("contact.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-6 md:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                  {t("contact.contactInfo")}
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Schedule Call */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-primary/5 border border-primary/20 rounded-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold">
                      {t("contact.scheduleCall")}
                    </h3>
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

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="font-semibold">{t("contact.followUs")}</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-xl transition-colors group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
