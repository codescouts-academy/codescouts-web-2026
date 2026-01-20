"use client";

import { Mail, Phone, Linkedin, Twitter, Github } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();

  const quickLinks = [
    { href: "/services", label: t("nav.services") },
    { href: "/courses", label: t("nav.courses") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
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
            <div className="flex gap-4 pt-2">
              <a
                href="https://linkedin.com/company/codescouts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/codescouts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/codescouts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
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
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CodeScouts. {t("footer.rights")}.
          </p>
          <p className="text-muted-foreground text-xs font-mono">
            {"// Built with ♥ and clean code"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
