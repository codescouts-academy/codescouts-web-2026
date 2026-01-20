import { Language } from "@/i18n";

export interface Client {
  slug: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  industry?: string;
  lang?: Language;
}

// Static clients - loaded from Markdown-style data
// To add a new client, simply add a new entry here with the content
export const clients: Client[] = [
  {
    slug: "cluber",
    name: "Cluber",
    description:
      "Cluber es una plataforma española que digitaliza la gestión de clubes deportivos: inscripciones, pagos, comunicación, eventos y control de accesos, todo desde web y app.",
    logo: "https://www.codescouts.academy/images/client/cluber.png",
    industry: "Sports Tech",
    lang: "es",
  },
  {
    slug: "mayoral",
    name: "Mayoral",
    description:
      "Mayoral es una empresa multinacional española de diseño, fabricación, distribución y comercialización textil, especializada en el sector de la moda infantil. Tiene su sede central en Málaga, España. Mayoral opera 150 tiendas propias, con presencia comercial en 75 países del mundo, 8000 puntos de venta y 16 filiales.",
    logo: "https://www.codescouts.academy/images/client/mayoral.png",
    industry: "Fashion",
    lang: "es",
  },
  {
    slug: "mirai",
    name: "Mirai",
    description:
      "Mirai es un socio hotelero en el objetivo común de traer venta directa, su independencia comercial, la reducción de los costos de distribución y el acceso sin intermediarios al mayor número de huéspedes potenciales.",
    logo: "https://www.codescouts.academy/images/client/mirai.png",
    industry: "Hospitality Tech",
    lang: "es",
  },
  {
    slug: "beworklive",
    name: "BeWorkLive",
    description:
      "BeWorkLive es una empresa de consultoría y formación especializada en el sector camping. En BeWorkLive diseñan, desarrollan y adaptan cursos a medida en diferentes formatos pedagógicos, presencial, aula virtual y online.",
    logo: "https://www.codescouts.academy/images/client/beworklive.png",
    industry: "Consulting",
    lang: "es",
  },
  {
    slug: "innoit",
    name: "InnoIT",
    description:
      "Nos dedicamos ante todo a la gestión de carreras IT. Llevamos más de seis años participando en la transformación digital de empresas punteras de todas las ramas de actividad a nivel nacional e internacional.",
    logo: "https://www.codescouts.academy/images/client/innoit.png",
    industry: "IT Services",
    lang: "es",
  },
  {
    slug: "wallion",
    name: "Wallion",
    description:
      "En Wallion desarrollamos un software personalizado para ofrecer soluciones personalizadas para empresas que desean transformación digital. Somos sherpas digitales.",
    logo: "https://www.codescouts.academy/images/client/wallion.png",
    industry: "Software",
    lang: "es",
  },
  {
    slug: "submer",
    name: "Submer",
    description:
      "Hacemos posible la próxima generación de refrigeración y automatización para entornos con gran consumo de datos y energía mediante la integración de nuestras tecnologías prístinas, altamente eficientes y sostenibles.",
    logo: "https://www.codescouts.academy/images/client/submer.png",
    industry: "Deep Tech",
    lang: "es",
  },
  {
    slug: "klagan",
    name: "K-LAGAN",
    description:
      "K-LAGAN es una consultoría estratégica de servicios tecnológicos, donde el centro es la persona, comprometida con su equipo y siempre a la vanguardia de las últimas tendencias tecnológicas.",
    logo: "https://www.codescouts.academy/images/client/klagan.png",
    industry: "Consulting",
    lang: "es",
  },
  {
    slug: "movicoders",
    name: "Movicoders",
    description:
      "Movicoders implementa soluciones de gestión, trazabilidad, automatización e integración a través de un equipo humano cercano y altamente capacitado y motivado.",
    logo: "https://www.codescouts.academy/images/client/movicoders.png",
    industry: "Software",
    lang: "es",
  },
  {
    slug: "axa-partners",
    name: "AXA Partners",
    description:
      "AXA Assistance, multinacional especializada en la prestación de servicios de asistencia, Con más de 50 años de trayectoria en el mercado español.",
    logo: "https://www.codescouts.academy/images/client/axa.png",
    industry: "Insurance",
    lang: "es",
  },
  {
    slug: "nectios",
    name: "Nectios",
    description:
      "Nectios proporciona soluciones tecnológicas innovadoras para empresas que buscan transformar sus procesos digitales.",
    logo: "https://www.codescouts.academy/images/client/nectios_black.png",
    industry: "Technology",
    lang: "es",
  },
];

export function getClient(slug: string): Client | undefined {
  return clients.find((client) => client.slug === slug);
}
