import { Language } from "@/i18n";

export interface Client {
  slug: string;
  name: string;
  description: Record<Language, string>;
  logo?: string;
  website?: string;
  industry?: string;
}

export const clients: Client[] = [
  {
    slug: "cluber",
    name: "Cluber",
    description: {
      es: "Cluber es una plataforma española que digitaliza la gestión de clubes deportivos: inscripciones, pagos, comunicación, eventos y control de accesos, todo desde web y app.",
      en: "Cluber is a Spanish platform that digitizes sports club management: registrations, payments, communication, events, and access control, all via web and app.",
    },
    logo: "https://www.codescouts.academy/images/client/cluber.png",
    industry: "Sports Tech",
  },
  {
    slug: "mayoral",
    name: "Mayoral",
    description: {
      es: "Mayoral es una empresa multinacional española de diseño, fabricación, distribución y comercialización textil, especializada en el sector de la moda infantil. Tiene su sede central en Málaga, España. Mayoral opera 150 tiendas propias, con presencia comercial en 75 países del mundo, 8000 puntos de venta y 16 filiales.",
      en: "Mayoral is a Spanish multinational company specializing in the design, manufacturing, distribution, and marketing of children's fashion. Headquartered in Málaga, Spain, Mayoral operates 150 stores, has commercial presence in 75 countries, 8000 points of sale, and 16 subsidiaries.",
    },
    logo: "https://www.codescouts.academy/images/client/mayoral.png",
    industry: "Fashion",
  },
  {
    slug: "mirai",
    name: "Mirai",
    description: {
      es: "Mirai es un socio hotelero en el objetivo común de traer venta directa, su independencia comercial, la reducción de los costos de distribución y el acceso sin intermediarios al mayor número de huéspedes potenciales.",
      en: "Mirai is a hotel partner with the common goal of driving direct sales, maintaining commercial independence, reducing distribution costs, and providing direct access to the maximum number of potential guests.",
    },
    logo: "https://www.codescouts.academy/images/client/mirai.png",
    industry: "Hospitality Tech",
  },
  {
    slug: "beworklive",
    name: "BeWorkLive",
    description: {
      es: "BeWorkLive es una empresa de consultoría y formación especializada en el sector camping. En BeWorkLive diseñan, desarrollan y adaptan cursos a medida en diferentes formatos pedagógicos, presencial, aula virtual y online.",
      en: "BeWorkLive is a consulting and training company specialized in the camping sector. At BeWorkLive, they design, develop, and adapt tailor-made courses in various formats: in-person, virtual classroom, and online.",
    },
    logo: "https://www.codescouts.academy/images/client/beworklive.png",
    industry: "Consulting",
  },
  {
    slug: "innoit",
    name: "InnoIT",
    description: {
      es: "Nos dedicamos ante todo a la gestión de carreras IT. Llevamos más de seis años participando en la transformación digital de empresas punteras de todas las ramas de actividad a nivel nacional e internacional.",
      en: "We focus primarily on managing IT careers. For over six years, we have been participating in the digital transformation of leading companies across various industries, both nationally and internationally.",
    },
    logo: "https://www.codescouts.academy/images/client/innoit.png",
    industry: "IT Services",
  },
  {
    slug: "wallion",
    name: "Wallion",
    description: {
      es: "En Wallion desarrollamos un software personalizado para ofrecer soluciones personalizadas para empresas que desean transformación digital. Somos sherpas digitales.",
      en: "At Wallion, we develop custom software to provide tailored solutions for companies seeking digital transformation. We are digital sherpas.",
    },
    logo: "https://www.codescouts.academy/images/client/wallion.png",
    industry: "Software",
  },
  {
    slug: "submer",
    name: "Submer",
    description: {
      es: "Hacemos posible la próxima generación de refrigeración y automatización para entornos con gran consumo de datos y energía mediante la integración de nuestras tecnologías prístinas, altamente eficientes y sostenibles.",
      en: "We enable the next generation of cooling and automation for high-data and energy-intensive environments by integrating our pristine, highly efficient, and sustainable technologies.",
    },
    logo: "https://www.codescouts.academy/images/client/submer.png",
    industry: "Deep Tech",
  },
  {
    slug: "klagan",
    name: "K-LAGAN",
    description: {
      es: "K-LAGAN es una consultoría estratégica de servicios tecnológicos, donde el centro es la persona, comprometida con su equipo y siempre a la vanguardia de las últimas tendencias tecnológicas.",
      en: "K-LAGAN is a strategic technology services consultancy, where the focus is on people, committed to their team, and always at the forefront of the latest technological trends.",
    },
    logo: "https://www.codescouts.academy/images/client/klagan.png",
    industry: "Consulting",
  },
  {
    slug: "movicoders",
    name: "Movicoders",
    description: {
      es: "Movicoders implementa soluciones de gestión, trazabilidad, automatización e integración a través de un equipo humano cercano y altamente capacitado y motivado.",
      en: "Movicoders implements management, traceability, automation, and integration solutions through a close-knit, highly skilled, and motivated team.",
    },
    logo: "https://www.codescouts.academy/images/client/movicoders.png",
    industry: "Software",
  },
  {
    slug: "axa-partners",
    name: "AXA Partners",
    description: {
      es: "AXA Assistance, multinacional especializada en la prestación de servicios de asistencia, Con más de 50 años de trayectoria en el mercado español.",
      en: "AXA Assistance, a multinational company specialized in providing assistance services, with over 50 years of presence in the Spanish market.",
    },
    logo: "https://www.codescouts.academy/images/client/axa.png",
    industry: "Insurance",
  },
  {
    slug: "nectios",
    name: "Nectios",
    description: {
      es: "Nectios proporciona soluciones tecnológicas innovadoras para empresas que buscan transformar sus procesos digitales.",
      en: "Nectios provides innovative technological solutions for companies seeking to transform their digital processes.",
    },
    logo: "https://www.codescouts.academy/images/client/nectios_black.png",
    industry: "Technology",
  },
];
