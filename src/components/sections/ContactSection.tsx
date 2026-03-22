"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, Mail, Send, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const t = useTranslations();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    message: "",
  });

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
    setIsLoading(true);

    const form = new FormData();
    form.append("firstname", formData.firstname);
    form.append("lastname", formData.lastname);
    form.append("company", formData.company);
    form.append("email", formData.email);
    form.append("message", formData.message);
    const fields = formToHubSpot(form);

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

      setFormData({
        firstname: "",
        lastname: "",
        company: "",
        email: "",
        message: "",
      });

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

    setIsLoading(false);
  };

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
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.form.name")}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.firstname}
                    placeholder={t("contact.form.namePlaceholder")}
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                    required
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.form.lastname")}
                  </label>
                  <Input
                    id="lastname"
                    type="text"
                    value={formData.lastname}
                    placeholder={t("contact.form.lastnamePlaceholder")}
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.form.email")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    placeholder={t("contact.form.emailPlaceholder")}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.form.company")}
                  </label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    placeholder={t("contact.form.companyPlaceholder")}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.form.message")}
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    placeholder={t("contact.form.messagePlaceholder")}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="bg-background/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full glow"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {t("contact.form.send")}
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
