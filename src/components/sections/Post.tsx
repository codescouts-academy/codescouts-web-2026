"use client";

import Image from "next/image";
import { Calendar, Clock, ArrowLeft, User, Tag, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { BlogPost } from "@/lib/blog";

const Post = ({
  post,
  relatedPosts,
  relatedCourses = [],
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
  relatedCourses?: { slug: string; name: string; url: string }[];
}) => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <Layout>
      <article className="py-6 md:py-20">
        <div className="section-container">
          {/* No entrance animation here: an `opacity: 0` start hides the
              cover and H1 (the LCP candidates) until JS hydrates. */}
          <div className="max-w-4xl mx-auto">
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
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  {/* Above the fold: this is the page's LCP image. */}
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    preload
                    fetchPriority="high"
                    sizes="(min-width: 896px) 896px, 100vw"
                    className="object-contain"
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

            {/* Team CTA: the bridge from a technical post to a company lead. */}
            {relatedCourses.length > 0 && (
              <aside className="mt-16 p-8 rounded-2xl bg-primary/10 border border-primary/20">
                <h2 className="text-2xl font-bold mb-3">
                  {t("blog.teamCtaTitle")}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t("blog.teamCtaText")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={relatedCourses[0].url}>
                      {t("blog.teamCtaCourse")}: {relatedCourses[0].name}
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/${locale}/contact/`}>
                      {t("blog.teamCtaContact")}
                    </Link>
                  </Button>
                </div>
              </aside>
            )}

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border">
                <h2 className="text-2xl font-bold mb-8">
                  {t("blog.relatedCourses")}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedCourses.map((course) => (
                    <Link
                      key={course.slug}
                      href={course.url}
                      className="group"
                    >
                      <article className="p-4 bg-primary/5 border border-primary/10 rounded-xl hover:border-primary/30 transition-colors">
                        <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {course.name}
                        </h3>
                        <span className="text-sm text-primary inline-flex items-center gap-1">
                          {t("blog.viewCourse")}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border">
                <h2 className="text-2xl font-bold mb-8">
                  {t("blog.relatedPosts")}
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
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Post;
