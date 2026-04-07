---
title: Clean Architecture in Frontend
date: 2023-10-30T00:00:00.000Z
summary: Clean Architecture is a concept popularized by "Uncle Bob" that is based on structuring code in adjacent layers, so each layer only communicates with the layers immediately next to it.
image: /images/blog/clean-architecture.png
tags: [tcr, tdd, tests, commit]
---

## Clean Architecture in Frontend

Clean Architecture is a concept popularized by Robert Cecil Martin, known as "Uncle Bob," based on the premise of structuring code in adjacent layers, meaning each layer only communicates with the layers immediately next to it.

## Why use Clean Architecture?

- Independence: each layer has its own paradigm or architectural model, as if it were an application on its own, without affecting the other layers.
- Organization: it provides better code organization, making functionality easier to find and navigate.
- Decoupling: each layer is independent of the others, so it can be replaced or even built in different technologies. This also makes it easier to reuse a layer across different projects.
- Easier testing: we can write unit tests for each layer and integration tests for the different layers working together, using temporary objects to simulate behavior when needed.

## How to apply Clean Architecture in frontend?

<iframe  src="https://www.youtube.com/embed/FyaCai3MZg4?si=kfJW60J9ItgpUlY-" title="Clean architecture en frontend" frameborder="0"
style="width:100%;height:415px;"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

I hope you enjoyed this explanation. If you’re interested in this topic, we recommend taking a look at the frontend architecture course we have prepared: [Frontend Architecture]({{< ref "courses/arquitectura-frontend.md" >}})

Best regards 👋
