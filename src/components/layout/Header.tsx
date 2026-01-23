"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routing } from "@/i18n/routing";

const Header = () => {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const toggleLanguage = (locale: string) => {
    const segments = pathname?.split("/") || [];
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: t("nav.services") },
    { href: "/courses", label: t("nav.courses") },
    { href: "/clients", label: t("nav.clients") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-mono text-xl md:text-2xl font-bold">
              <span className="text-foreground">&lt;</span>
              <span className="text-foreground">Code</span>
              <span className="text-primary">Scouts</span>
              <span className="text-foreground">/&gt;</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`link-hover text-sm font-medium transition-colors ${
                  pathname.includes(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher - Simple Button */}

            {routing.locales
              .filter((l) => l !== locale)
              .map((locale) => (
                <button
                  key={locale}
                  onClick={() => toggleLanguage(locale)}
                  className="text-sm font-mono font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {locale.toUpperCase()}
                </button>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Language Switcher - Simple Button */}
            {routing.locales
              .filter((l) => l !== locale)
              .map((locale) => (
                <button
                  key={locale}
                  onClick={() => toggleLanguage(locale)}
                  className="text-sm font-mono font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {locale.toUpperCase()}
                </button>
              ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="section-container py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="w-full mt-4">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("common.contact")}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
