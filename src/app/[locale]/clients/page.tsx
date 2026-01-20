"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { clients } from "@/lib/clients";

const Clients = () => {
  const t = useTranslations();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
              {t("clients.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("clients.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("clients.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-20 md:py-32">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <motion.article
                key={client.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                {/* Logo Header */}
                <div className="h-40 bg-card flex items-center justify-center p-6 border-b border-border/50 group-hover:bg-primary/5 transition-colors">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="max-h-24 max-w-[180px] object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-10 h-10 text-primary" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {client.name}
                      </h2>
                      {client.industry && (
                        <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          {client.industry}
                        </span>
                      )}
                    </div>
                    {client.website && (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-card border border-border/50 hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                    {client.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {clients.length}+
              </div>
              <div className="text-muted-foreground">
                {t("clients.stats.clients")}
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                6+
              </div>
              <div className="text-muted-foreground">
                {t("clients.stats.years")}
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                50+
              </div>
              <div className="text-muted-foreground">
                {t("clients.stats.teams")}
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                100%
              </div>
              <div className="text-muted-foreground">
                {t("clients.stats.satisfaction")}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Clients;
