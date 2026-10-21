import { JsonLd } from "@/components/JsonLd";
import Courses from "@/components/sections/Courses";
import { Language, LocaleProps } from "@/i18n";
import {
  breadcrumbSchema,
  coursesSchema,
  generateCoursesMeta,
  faqSchema,
} from "@/lib/meta";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

const courseFaqs: Record<Language, { question: string; answer: string }[]> = {
  es: [
    {
      question: "¿Los cursos son online o presenciales?",
      answer:
        "Ambos. Los cursos se imparten online en directo para equipos de toda España y de forma presencial en Galicia (Santiago de Compostela, A Coruña y Vigo).",
    },
    {
      question: "¿Los cursos son bonificables por FUNDAE?",
      answer:
        "Sí. Todos nuestros cursos son bonificables por FUNDAE, lo que permite a las empresas en España recuperar total o parcialmente su coste.",
    },
    {
      question: "¿Qué nivel se necesita para cada curso?",
      answer:
        "Cada curso indica su nivel (Básico, Intermedio o Avanzado). Consulta el temario de cada curso para conocer los requisitos previos específicos.",
    },
    {
      question: "¿Cuántas personas forman cada grupo?",
      answer:
        "Grupos reducidos de máximo 12 personas para garantizar atención personalizada y una experiencia de aprendizaje efectiva.",
    },
  ],
  en: [
    {
      question: "Are the courses online or onsite?",
      answer:
        "Both. Courses are taught live online for teams anywhere in Spain and onsite in Galicia (Santiago de Compostela, A Coruña and Vigo).",
    },
    {
      question: "Can the courses be subsidised through FUNDAE?",
      answer:
        "Yes. All our courses can be subsidised through FUNDAE, so companies in Spain can recover all or part of the cost.",
    },
    {
      question: "What level is required for each course?",
      answer:
        "Each course states its level (Beginner, Intermediate or Advanced). Check each course syllabus for its specific prerequisites.",
    },
    {
      question: "How many people are in each group?",
      answer:
        "Small groups of up to 12 people to ensure personal attention and an effective learning experience.",
    },
  ],
};

const Page = async ({ params }: LocaleProps) => {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={coursesSchema(locale)} />
      <JsonLd data={faqSchema(courseFaqs[locale])} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: locale === "es" ? "Cursos" : "Courses", path: ["courses"] },
        ])}
      />
      <Courses locale={locale} />
    </>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateCoursesMeta(locale);
}
