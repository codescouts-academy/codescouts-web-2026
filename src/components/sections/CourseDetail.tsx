import Link from "next/link";
import { Language } from "@/i18n";
import { COURSES, CourseSlug, COURSE_SLUGS } from "@/lib/courses";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  HelpCircle,
  ListChecks,
  MapPin,
  Monitor,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

/**
 * Server component on purpose: course landings are SEO pages, so every
 * H1/H2/paragraph/FAQ must be present in the initial HTML without JS.
 */
const CourseDetail = ({
  locale,
  slug,
}: {
  locale: Language;
  slug: CourseSlug;
}) => {
  const course = COURSES[slug];
  const content = course.content[locale];
  const isEs = locale === "es";

  const relatedCourses = COURSE_SLUGS.filter((s) => s !== slug).slice(0, 3);

  return (
    <Layout>
      <article className="py-6 md:py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            >
              <Link href={`/${locale}`} className="hover:text-foreground">
                {isEs ? "Inicio" : "Home"}
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={`/${locale}/courses`}
                className="hover:text-foreground"
              >
                {isEs ? "Formación" : "Training"}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-foreground">
                {content.name}
              </span>
            </nav>

            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href={`/${locale}/courses`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isEs ? "Ver todos los cursos" : "View all courses"}
              </Link>
            </Button>

            {/* Hero: single H1 per page with the target keyword */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {content.h1}
            </h1>

            {/* Key facts */}
            <ul className="flex flex-wrap gap-2 mb-8">
              <li className="inline-flex items-center gap-2 text-sm px-3 py-1.5 bg-secondary rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                {course.durationHours} {isEs ? "horas" : "hours"}
              </li>
              <li className="inline-flex items-center gap-2 text-sm px-3 py-1.5 bg-secondary rounded-full">
                <ListChecks className="w-4 h-4 text-primary" />
                {course.level[locale]}
              </li>
              <li className="inline-flex items-center gap-2 text-sm px-3 py-1.5 bg-secondary rounded-full">
                <Monitor className="w-4 h-4 text-primary" />
                {isEs ? "Online en directo" : "Live online"}
              </li>
              <li className="inline-flex items-center gap-2 text-sm px-3 py-1.5 bg-secondary rounded-full">
                <MapPin className="w-4 h-4 text-primary" />
                {isEs
                  ? "Presencial en Galicia"
                  : "Onsite in Galicia"}
              </li>
              <li className="inline-flex items-center gap-2 text-sm px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary">
                <Users className="w-4 h-4" />
                {isEs ? "Máx. 12 personas" : "Max. 12 people"}
              </li>
            </ul>

            {content.intro.map((paragraph, i) => (
              <p
                key={i}
                className="text-lg text-muted-foreground leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 mt-6 mb-12">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-primary/5 border border-primary/10 rounded text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Syllabus */}
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {isEs ? "Temario del curso" : "Course syllabus"}
            </h2>
            <ol className="space-y-6 mb-12">
              {content.syllabus.map((item, i) => (
                <li key={item.title} className="flex gap-4 items-start">
                  <span
                    aria-hidden="true"
                    className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Ideal for */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  {isEs ? "¿Para quién es?" : "Who is it for?"}
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {content.idealFor}
              </p>
            </div>

            {/* Outcomes */}
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {isEs
                ? "¿Qué se lleva tu equipo?"
                : "What will your team take away?"}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 mb-12">
              {content.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl border border-border/40"
                >
                  <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>

            {/* Format / location block (local SEO content) */}
            <div className="bg-secondary/30 border border-border/50 rounded-2xl p-6 md:p-8 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  {isEs
                    ? "Online para España, presencial en Galicia"
                    : "Online across Spain, onsite in Galicia"}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {isEs
                  ? "Impartimos este curso online en directo para equipos de toda España y de forma presencial en Galicia: Santiago de Compostela, A Coruña y Vigo, en vuestras oficinas o en sala externa. Todos los formatos mantienen grupos reducidos y más del 70% de práctica."
                  : "We teach this course live online for teams across Spain and onsite in Galicia: Santiago de Compostela, A Coruña and Vigo, at your offices or an external venue. Every format keeps small groups and 70%+ hands-on practice."}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {isEs
                  ? "El curso es bonificable por FUNDAE: te ayudamos con la gestión para que tu empresa recupere total o parcialmente el coste."
                  : "The course is eligible for FUNDAE subsidies: we help you with the paperwork so your company recovers all or part of the cost."}
              </p>
            </div>

            {/* FAQ */}
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">
                {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
              </h2>
            </div>
            <div className="space-y-6 mb-12">
              {content.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-border/50 rounded-xl p-5"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Internal linking: related posts + courses */}
            {(course.relatedPosts.length > 0 ||
              relatedCourses.length > 0) && (
              <nav
                aria-label={
                  isEs ? "Contenido relacionado" : "Related content"
                }
                className="border-t border-border/50 pt-8 mb-12"
              >
                <h2 className="text-xl font-semibold mb-4">
                  {isEs ? "Sigue aprendiendo" : "Keep learning"}
                </h2>
                <ul className="space-y-2">
                  {course.relatedPosts.map((postSlug) => (
                    <li key={postSlug}>
                      <Link
                        href={`/${locale}/blog/${postSlug}`}
                        className="text-primary hover:underline inline-flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {postSlug
                          .split("-")
                          .map((w) =>
                            w ? w[0].toUpperCase() + w.slice(1) : w,
                          )
                          .join(" ")}
                      </Link>
                    </li>
                  ))}
                  {relatedCourses.map((relatedSlug) => (
                    <li key={relatedSlug}>
                      <Link
                        href={`/${locale}/courses/${relatedSlug}`}
                        className="text-primary hover:underline inline-flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {COURSES[relatedSlug].content[locale].name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isEs
                  ? "¿Quieres este curso para tu equipo?"
                  : "Want this course for your team?"}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                {isEs
                  ? "Cuéntanos vuestro contexto y diseñamos la convocatoria a medida: online o presencial en Galicia."
                  : "Tell us about your context and we will design a tailored edition: online or onsite in Galicia."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href={`/${locale}/contact`}>
                    {isEs ? "Solicitar información" : "Request information"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${locale}/courses`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {isEs ? "Ver otros cursos" : "View other courses"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default CourseDetail;
