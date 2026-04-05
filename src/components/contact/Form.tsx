"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const HUBSPOT_ENDPOINT =
  "https://api.hsforms.com/submissions/v3/integration/submit/25900557/9cd94ae9-df87-4df2-a6cb-b1ade33504aa";

interface HubSpotField {
  objectTypeId: string;
  name: string;
  value: FormDataEntryValue;
}

const formToHubSpot = (formData: FormData): HubSpotField[] =>
  Array.from(formData.entries()).map(([name, value]) => ({
    objectTypeId: "0-1",
    name,
    value,
  }));

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

const ContactForm = ({ className, onSuccess }: ContactFormProps) => {
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

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    const payload = {
      fields: formToHubSpot(form),
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const response = await fetch(HUBSPOT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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

      toast({ title: t("contact.successMessage") });
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ title: t("contact.errorMessage"), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="glass-card p-8">
        <form
          onSubmit={handleSubmit}
          className={`space-y-6 ${className ?? ""}`}
        >
          <div className="space-y-2">
            <Label htmlFor="firstname">{t("contact.form.name")}</Label>
            <Input
              id="firstname"
              type="text"
              value={formData.firstname}
              placeholder={t("contact.form.namePlaceholder")}
              onChange={handleChange("firstname")}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastname">{t("contact.form.lastname")}</Label>
            <Input
              id="lastname"
              type="text"
              value={formData.lastname}
              placeholder={t("contact.form.lastnamePlaceholder")}
              onChange={handleChange("lastname")}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("contact.form.email")}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              placeholder={t("contact.form.emailPlaceholder")}
              onChange={handleChange("email")}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{t("contact.form.company")}</Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              placeholder={t("contact.form.companyPlaceholder")}
              onChange={handleChange("company")}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("contact.form.message")}</Label>
            <Textarea
              id="message"
              value={formData.message}
              placeholder={t("contact.form.messagePlaceholder")}
              onChange={handleChange("message")}
              required
              rows={5}
              className="bg-background/50 resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
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
      </CardContent>
    </Card>
  );
};

export default ContactForm;
