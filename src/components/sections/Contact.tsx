"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Linkedin,
  Twitter,
  Github,
  Youtube,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
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

  const formToHubSpot = (formData: FormData) => {
    let fieldArray = [];
    for (let [name, value] of formData.entries()) {
      fieldArray.push({
        objectTypeId: "0-1",
        name: name,
        value: value,
      });
    }
    return fieldArray;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const fields = formToHubSpot(formData);

    const payload = {
      fields: fields,
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const response = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/25900557/9cd94ae9-df87-4df2-a6cb-b1ade33504aa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("HubSpot error:", errorData);
        throw new Error("Network response was not ok");
      }

      form.reset();

      toast({
        title: t("contact.successMessage"),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: t("contact.errorMessage"),
        variant: "destructive",
      });
    }
  };

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
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">
                        {t("contact.form.name")}
                      </Label>
                      <Input
                        id="firstname"
                        name="firstname"
                        type="text"
                        placeholder={t("contact.form.namePlaceholder")}
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">
                        {t("contact.form.lastname")}
                      </Label>
                      <Input
                        id="lastname"
                        name="lastname"
                        type="text"
                        placeholder={t("contact.form.lastnamePlaceholder")}
                        required
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.form.email")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("contact.form.emailPlaceholder")}
                        required
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">
                        {t("contact.form.company")}
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder={t("contact.form.companyPlaceholder")}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {t("contact.form.message")}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t("contact.form.messagePlaceholder")}
                        rows={5}
                        required
                        className="bg-background/50 resize-none"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full glow">
                      {t("contact.form.send")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
