"use client";

import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Github,
  LucideExternalLink,
  Youtube,
  Instagram,
  MapPin,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();

  const externalLinks = [
    { href: "https://agile.codescouts.academy/", label: "Agile Hub" },
    {
      href: "https://coach.codescouts.academy/",
      label: "Need coaching?",
    },
    { href: "https://interview.codescouts.academy/", label: "Interview" },
    { href: "https://library.codescouts.academy/", label: "Library" },
  ];

  const services = [
    {
      href: "#technical-coaching",
      label: t("services.technicalCoaching.title"),
    },
    {
      href: "#accelerated-program",
      label: t("services.acceleratedProgram.title"),
    },
    {
      href: "#cto-as-service",
      label: t("services.ctoAsService.title"),
    },
    {
      href: "#software-consulting",
      label: t("services.softwareConsulting.title"),
    },
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-mono text-xl font-bold">
                <span className="text-foreground">&lt;</span>
                <span className="text-foreground">Code</span>
                <span className="text-primary">Scouts</span>
                <span className="text-foreground">/&gt;</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3 items-center">
              <a
                href="https://github.com/codescouts-academy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/codescouts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@code_scouts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                    <LucideExternalLink className="w-3 h-3 inline-block ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("nav.services")}
            </h4>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}/services/${link.href}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("contact.title")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+34664109973"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  {t("contact.phone")}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("contact.email")}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Mail className="h-4 w-4" />
                  {t("contact.email")}
                </a>
              </li>
              <li>
                <p className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <MapPin className="h-4 w-4" />
                  {t("contact.location")}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-mono">
              {`// ${new Date().getFullYear()} CodeScouts`}
            </p>
            <p className="text-muted-foreground text-xs font-mono">
              {`// ${process.env.NEXT_PUBLIC_COMMIT_MESSAGE ?? "feat: new release"}`}
            </p>
            <p className="text-muted-foreground text-xs font-mono">
              {`// ${process.env.NEXT_PUBLIC_COMMIT_SHA ?? "72f74d90a01aee6afaa4936abe00e5ac9ab8a4cb"}`}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs font-mono">
              {"// Built with ♥ from Galicia"}
            </p>
            <p className="text-muted-foreground text-xs font-mono">
              {"// +30 teams coached worldwide"}
            </p>
            <Link
              href={`/${locale}/legal`}
              className="text-muted-foreground text-xs font-mono"
            >
              {"// Legal"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
