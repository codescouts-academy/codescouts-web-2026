---
title: "Curso de código legacy y refactoring para empresas: cómo modernizar sin reescribir"
date: "2026-10-21"
summary: "Qué debe cubrir un curso de código legacy para empresas: tests de caracterización, refactoring seguro y un plan de modernización sin big-bang ni reescrituras."
image: /images/blog/legacy-code.png
tags: [legacy, codigo legacy, refactoring, testing]
draft: true
---

Casi todas las empresas con un producto de varios años de vida acaban teniendo el mismo problema: el código que sostiene el negocio es también el que más cuesta cambiar. Contratar un **curso de código legacy** para el equipo es una forma de recuperar la capacidad de evolucionar ese producto sin apostar todo a una reescritura que nadie sabe cuándo terminará.

En este artículo repasamos los síntomas que llevan a una empresa a buscar formación en código legacy y refactoring, qué debe cubrir un buen curso y cómo evaluar a un proveedor.

## El problema que siente la empresa

El código legacy no es solo "código antiguo". Es código que el equipo no se atreve a cambiar con confianza. Desde la dirección técnica se nota así:

- **Añadir funcionalidades es lento y arriesgado**, porque cualquier cambio puede romper algo en otra parte.
- **Actualizar dependencias o frameworks** se pospone una y otra vez.
- **No hay tests**, o los que hay no dan confianza real.
- **El conocimiento está concentrado** en pocas personas, que se convierten en cuello de botella.
- **La conversación sobre "reescribirlo todo"** aparece con frecuencia, pero nunca hay un momento bueno para hacerlo.

La reescritura completa es tentadora, pero suele ser la opción más cara y arriesgada. Lo que necesita el equipo son técnicas para cambiar el código existente con seguridad.

## Qué debe cubrir un curso de código legacy

En nuestro [curso de código legacy y refactoring](/es/courses/codigo-legacy/) trabajamos con las técnicas de Michael Feathers, refactoring y SOLID, organizadas en estos bloques:

### Anatomía del código legacy

Qué es realmente el legacy, qué es deuda técnica y cómo priorizar por riesgo e impacto en negocio. Este bloque ayuda a que las conversaciones entre equipo técnico y negocio dejen de ser abstractas.

### Red de seguridad con tests

*Characterization tests*, *golden master* y *seams*: cómo testear código que no fue diseñado para ser testeado. Es el primer paso imprescindible antes de cambiar nada.

### Técnicas de refactoring

*Sprout*, *wrap*, *extract* y otras técnicas para cambiar comportamiento con seguridad en código acoplado.

### Romper dependencias

Inversión de dependencias, puertos y adaptadores para aislar lo que es difícil de testear. Aquí los [principios SOLID](/es/blog/solid/) dejan de ser teoría y se convierten en herramientas.

### Estrategia de modernización

*Strangler fig*, *branch by abstraction* y un plan iterativo para modernizar sin *big-bang*. Es el bloque que conecta la técnica con la planificación del producto.

## Qué resultados esperar

El objetivo es que el equipo termine con:

- Una red de tests de caracterización sobre código que antes no tenía tests.
- Técnicas de refactoring seguro en código acoplado.
- Dependencias rotas y módulos aislados.
- Criterios para priorizar la deuda técnica.
- Un plan de modernización iterativo que no obliga a parar el negocio.
- Confianza para volver a tocar el legacy.

## ¿Hace falta tener tests para empezar?

No, al contrario. El curso empieza precisamente por cómo añadir tests a código que no los tiene. Si ya tenéis tests, se aprovechan como base.

Es un curso de nivel avanzado y dura 20 horas. Encaja especialmente bien en equipos que ya tienen una base de buenas prácticas; si no es así, puede tener sentido combinarlo antes con un [curso de Clean Code](/es/courses/clean-code/) o de [TDD](/es/courses/test-driven-development/).

## Cómo evaluar a un proveedor de formación en código legacy

Antes de contratar, conviene preguntar:

### ¿Se practica sobre código legacy realista?

Las técnicas de legacy no se aprenden con ejemplos de juguete. Necesitan código acoplado, sin tests y con dependencias difíciles, que es justo lo que el equipo se encuentra en su día a día.

### ¿Se adapta al stack del equipo?

Las técnicas son agnósticas del lenguaje. Nosotros las practicamos en TypeScript/JavaScript y son trasladables a Java, C#, PHP y otros lenguajes; adaptamos los ejercicios a vuestro stack.

### ¿Incluye una estrategia, no solo técnicas?

Saber refactorizar un método no basta. El equipo necesita un plan para decidir por dónde empezar y cómo avanzar sin bloquear la entrega.

### ¿Qué tamaño tienen los grupos?

Trabajamos con grupos reducidos, de un máximo de 12 personas, para garantizar atención personalizada.

<!-- TODO equipo: valorar si mencionar que, tras el curso, se puede continuar con un Servicio de coaching técnico sobre el propio legacy (sin mezclarlo con el Curso). -->

## Cómo saber si la formación ha funcionado

En código legacy, el progreso es gradual, pero hay indicadores cualitativos que conviene observar en las semanas siguientes al curso:

- **Los cambios en zonas críticas vienen acompañados de tests**, aunque esas zonas no tuvieran ninguno antes.
- **El equipo propone refactors pequeños** dentro de las tareas habituales, en lugar de pedir grandes bloques de tiempo para "limpiar".
- **La conversación sobre la reescritura completa pierde fuerza**, porque existe un plan iterativo creíble.
- **El conocimiento se reparte**: más personas se atreven a tocar las partes que antes dependían de una sola.
- **La deuda técnica se prioriza con criterios** de riesgo e impacto, no por intuición.

Estos cambios son los que, con el tiempo, devuelven al equipo la capacidad de entregar con confianza.

## Formato: online o presencial

El curso se imparte **online en directo** para toda España y **presencial en Galicia**, en Santiago de Compostela, A Coruña o Vigo. Es un caso muy habitual en empresas consolidadas con productos de varios años de vida, y la carga práctica es la misma en ambos formatos.

## Bonificación FUNDAE

El curso de código legacy es bonificable por FUNDAE, por lo que las empresas en España pueden recuperar total o parcialmente su coste. Os ayudamos con la gestión de la bonificación.

## Próximo paso

Si tu equipo está atrapado en código heredado y quieres que vuelva a entregar con confianza, revisa el temario completo del [curso de código legacy y refactoring](/es/courses/codigo-legacy/) o [contacta con nosotros](/es/contact/) contándonos cómo es vuestro sistema. Con esa información podemos proponer un enfoque adaptado a vuestro producto.
