# Checklist SEO fuera del código

Lo que el repo no puede hacer por sí solo. Ordenado por impacto para que una **Empresa** que busca un **Curso** o un **Servicio** encuentre CodeScouts (ver `CONTEXT.md`).

## 1. Google Search Console (hacer ya)

- [ ] Verificar la propiedad de dominio `codescouts.academy` (DNS). Si se prefiere la etiqueta HTML, definir `GOOGLE_SITE_VERIFICATION` en Vercel: el layout raíz la emite sola.
- [ ] Enviar `https://www.codescouts.academy/sitemap.xml` (Sitemaps → Añadir).
- [ ] **URL Inspection → Solicitar indexación** de las páginas de dinero, empezando por:
  - `/es/courses/arquitectura-frontend/`
  - el resto de `/es/courses/<slug>/` y `/es/services/<slug>/`
- [ ] Revisar *Páginas → Por qué no se indexan*: "Descubierta, no indexada" = falta autoridad/enlaces; "Rastreada, no indexada" = contenido percibido como poco valioso o duplicado.
- [ ] Revisar *Rendimiento* filtrando por la página del curso: impresiones y posición media para "curso de arquitectura frontend". Repetir cada 2 semanas.
- [ ] *Mejoras*: comprobar que aparecen "Cursos", "Breadcrumbs" y "FAQ" sin errores.
- [ ] Tras el deploy, probar 2–3 URLs en el [Rich Results Test](https://search.google.com/test/rich-results).

## 2. Google Business Profile (SEO local, Galicia)

- [ ] Crear o reclamar la ficha de CodeScouts en Santiago de Compostela (categoría: *Consultor de software* / *Centro de formación*).
- [ ] Mismo nombre, teléfono (+34 664 109 973) y email que el sitio (deben coincidir con el JSON-LD `Organization`).
- [ ] Enlace a `https://www.codescouts.academy/es/`, horario L–V 9–18, zona de servicio: Galicia + España.
- [ ] Pedir reseñas a Empresas clientes tras cada Curso.

## 3. Enlaces y autoridad (lo que más pesa para un sitio recién migrado)

- [ ] Pedir a Empresas clientes (las de `/clients/`) un enlace desde su web, blog de ingeniería o post de LinkedIn al Curso o Servicio que contrataron.
- [ ] Darse de alta en directorios de formación bonificable / entidades organizadoras FUNDAE y en catálogos de formación para empresas en Galicia.
- [ ] Perfiles con enlace al sitio: LinkedIn de la empresa, GitHub, YouTube, meetups (GDG, comunidades frontend/React de Galicia).
- [ ] Cada charla, podcast o artículo invitado: enlazar a la página del Curso relacionado, no solo a la home.
- [ ] Actualizar enlaces antiguos que apunten a URLs del sitio Hugo (redirigen con 301, pero un enlace directo transmite más).

## 4. Contenido (borradores ya preparados)

- [ ] Revisar y publicar los 9 borradores en `src/content/blog/es/` (`draft: true`): un artículo pilar por Curso orientado a Empresas. Resolver los `<!-- TODO equipo -->` y quitar `draft: true`.
- [ ] Publicar a ritmo de 1 cada 1–2 semanas (mejor que todos el mismo día) y compartir cada uno en LinkedIn.
- [ ] Al publicar o actualizar un post, añadir `updated: "AAAA-MM-DD"` en el frontmatter si el cambio es relevante (alimenta `dateModified` y el sitemap).

## 5. Medición

- [ ] Activar **Vercel Analytics** en el proyecto de Vercel (Analytics → Enable). El componente ya está en el layout; sin cookies, no requiere banner.
- [ ] Definir qué es un lead (envío del formulario de contacto, clic en email/teléfono) y revisarlo mensualmente junto a Search Console.

## Pendiente para más adelante

- Slugs en inglés para `/en/` (hoy usan el slug en español). Requiere redirects nuevos; retomar cuando el inglés sea prioridad.
- Página de autor y schema `Person` para los posts (E-E-A-T).
