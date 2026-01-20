---
title: Clean architecture en frontend
date: 2023-10-30T00:00:00.000Z
summary: Clean Architecture es un nombre popularizado “Uncle Bob” que se basa en la premisa de estructurar el código en capas contiguas, es decir, que solo tienen comunicación con las capas que están inmediatamente a sus lados.
images: [images/blog/clean-architecture.png]
image: images/blog/clean-architecture.png
feature_image: images/blog/clean-architecture.png
with_reading_time: true
with_post_share: true
tags: [tcr, tdd, tests, commit]
---

## Clean architecture en frontend

Clean Architecture es un nombre popularizado por Robert Cecil Martin, conocido como “Uncle Bob” que se basa en la premisa de estructurar el código en capas contiguas, es decir, que solo tienen comunicación con las capas que están inmediatamente a sus lados.

## ¿Por qué usar Clean Architecture?

- Independencia: cada capa tiene su propio paradigma o modelo arquitectónico como si se tratara de una aplicación en si misma sin afectar al resto de los niveles.
- Estructuración: mejor organización del código, facilitando la búsqueda de funcionalidades y navegación por el mismo.
- Desacoplamiento: cada capa es independiente de las demás por lo que podríamos reemplazarla o incluso desarrollar en diferentes tecnologías. Además de reutilizar alguna de ellas en diferentes proyectos.
- Facilidad de testeo: podremos realizar test unitarios de cada una de las capas y test de integración de las diferentes capas entre sí, pudiendo reemplazarlas por objectos temporales que simulen su comportamiento de forma sencilla.

## ¿Cómo aplicar Clean Architecture en frontend?

<iframe  src="https://www.youtube.com/embed/FyaCai3MZg4?si=kfJW60J9ItgpUlY-" title="Clean architecture en frontend" frameborder="0"
style="width:100%;height:415px;"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Espero que hayas disfrutado de esta explicación, en caso que te interese este tema, te recomendamos que eches un vistazo a este curso que tenemos preparado de [Arquitectura frontend]({{< ref "courses/arquitectura-frontend.md" >}})

Un saludo 👋
