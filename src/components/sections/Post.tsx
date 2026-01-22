"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User, Tag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { BlogPost } from "@/lib/blog";

const Post = ({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <Layout>
      <article className="py-20 md:py-32 grayscale">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href={`/${locale}/blog`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("blog.backToBlog")}
              </Link>
            </Button>

            {/* Header */}
            <header className="mb-12">
              {post.coverImage && (
                <div className="aspect-video rounded-2xl overflow-hidden flex justify-center items-center">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-fit h-fit object-contain group-hover:brightness-110 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString(locale || "en", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {post.readingTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} {t("blog.readingTime")}
                  </span>
                )}
                {post.author && (
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {post.summary && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.summary}
                </p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-sm px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Content */}
            <div className="prose-container">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border">
                <h2 className="text-2xl font-bold mb-8">
                  Artículos relacionados
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/${locale}/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <article className="p-4 bg-secondary/30 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                        <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.summary}
                        </p>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

export default Post;
