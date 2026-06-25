"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { Highlight } from "@/components/ui/highlight";

const BlogPosts = ({ blogPosts }: { blogPosts: BlogPost[] }) => {
  const t = useTranslations();
  const locale = useLocale();

  const posts = blogPosts
    .filter((post) => post.lang === locale || !post.lang)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
              {t("common.blog")}
            </span>
            <Highlight highlight={["desarrolladores", "developers"]}>
              {t("blog.title")}
            </Highlight>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("blog.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-6 md:py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/${locale}/blog/${post.slug}`}>
                  <Card className="h-full group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm overflow-hidden">
                    {post.coverImage && (
                      <div className="flex justify-center items-center aspect-auto overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="h-[200px] w-[200px] p-2 object-contain object-center grayscale contrast-110 brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {post.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} min
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="line-clamp-3">
                        {post.summary}
                      </CardDescription>
                      {post.author && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-primary/5 border border-primary/10 rounded text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                        {t("common.readMore")}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPosts;
