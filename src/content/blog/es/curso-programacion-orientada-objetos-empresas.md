---
title: "Curso de programación orientada a objetos para empresas: la base del buen diseño"
date: "2026-10-21"
summary: "Qué debe cubrir un curso de programación orientada a objetos para empresas: los 4 pilares, SOLID, GRASP y composición, como base para patrones, TDD y DDD."
image: /images/blog/oop-feature.png
tags: [poo, programacion orientada a objetos, solid, oop]
draft: true
---

Muchos de los problemas de diseño que vemos en los equipos no vienen de la arquitectura ni del framework, sino de algo más básico: cómo se reparten las responsabilidades entre objetos. Un **curso de programación orientada a objetos** para el equipo construye esa base, sobre la que después se apoyan los patrones de diseño, TDD, DDD y la arquitectura.

En este artículo explicamos qué problema resuelve esta formación desde el punto de vista de la empresa, qué debe cubrir un buen curso de diseño orientado a objetos y cómo evaluar a un proveedor.

## El problema que siente la empresa

Cuando el equipo no tiene una base sólida de diseño orientado a objetos, aparecen síntomas como estos:

- **Clases enormes** que hacen de todo y que nadie quiere tocar.
- **Herencia usada para reutilizar código**, que acaba en jerarquías frágiles.
- **Lógica duplicada** porque no está claro dónde debería vivir cada responsabilidad.
- **Código difícil de testear**, con dependencias creadas dentro de los propios objetos.
- **Conversaciones de diseño sin vocabulario común**, en las que cada persona usa los términos a su manera.

Es especialmente habitual en equipos con perfiles junior o con personas que vienen de otros paradigmas y necesitan una base de diseño OO antes de avanzar.

## Qué debe cubrir un curso de programación orientada a objetos

En nuestro [curso de diseño orientado a objetos](/es/courses/diseno-orientado-objetos/) explicamos de forma clara y con mucha práctica cómo diseñar con objetos. Estos son los bloques:

### Los 4 pilares

Abstracción, encapsulación, herencia y polimorfismo bien entendidos, y cuándo conviene evitar la herencia.

### Principios SOLID

Los 5 principios con ejemplos y contraejemplos sobre código real del equipo. Tenemos un artículo introductorio sobre los [principios SOLID](/es/blog/solid/).

### Principios GRASP

Asignar responsabilidades: experto en información, creador, bajo acoplamiento y alta cohesión. Lo explicamos también en nuestro artículo sobre [GRASP](/es/blog/grasp/).

### Composición sobre herencia

Diseñar con composición, inyección de dependencias y objetos pequeños.

### Object Calisthenics

Reglas de estilo que fuerzan el buen diseño mediante restricciones deliberadas. Si te interesa, tenemos un artículo sobre [Object Calisthenics](/es/blog/object-calisthenics/).

## Qué resultados esperar

El objetivo es que el equipo termine con:

- Capacidad de diseñar con objetos con criterio.
- SOLID y GRASP aplicados en su código.
- Menos herencia frágil.
- Objetos pequeños y cohesivos.
- Una base para avanzar a patrones de diseño y DDD.
- Un lenguaje de diseño compartido.

## Qué nivel necesita el equipo

Es un curso de nivel básico, de 16 horas. Está pensado precisamente como punto de partida: para equipos con desarrolladores junior, para personas que vienen de otros paradigmas y también para equipos con experiencia que quieren consolidar un vocabulario común.

Una vez el equipo tiene esta base, los siguientes pasos naturales son el [curso de patrones de diseño](/es/courses/patrones-de-diseno/), el [curso de TDD](/es/courses/test-driven-development/) o, en dominios complejos, el [curso de Domain Driven Design](/es/courses/domain-driven-design/).

## Cómo evaluar a un proveedor de formación en POO

Antes de contratar, conviene preguntar:

### ¿En qué lenguaje se imparte?

Los principios son los mismos en cualquier lenguaje orientado a objetos. Nosotros lo impartimos normalmente en TypeScript, y es adaptable a Java, C# o PHP según el stack del equipo.

### ¿Se trabaja sobre código real?

Los ejemplos de "animales" y "figuras geométricas" sirven para explicar conceptos, pero no para cambiar hábitos. En nuestro curso, los principios SOLID se trabajan con ejemplos y contraejemplos en código real del equipo.

### ¿Se enseña cuándo no aplicar un principio?

Aplicar principios de forma dogmática lleva al sobrediseño. Un buen curso debería dar criterio, no solo reglas.

### ¿Cuánta práctica hay?

El diseño orientado a objetos se aprende diseñando. Pregunta qué parte del tiempo se dedica a programar y a refactorizar.

<!-- TODO equipo: confirmar el porcentaje de práctica de este curso si queremos mencionarlo (en otros cursos indicamos más del 70%). -->

### ¿Qué tamaño tienen los grupos?

Trabajamos con grupos reducidos, de un máximo de 12 personas, para garantizar atención personalizada.

## Cómo saber si la formación ha funcionado

El diseño orientado a objetos se nota en el código y en las conversaciones del equipo. Algunos indicadores cualitativos que conviene observar después del curso:

- **Las clases nuevas son más pequeñas** y tienen una responsabilidad clara.
- **Se recurre menos a la herencia** para reutilizar código, y más a la composición.
- **Las dependencias se inyectan** en lugar de crearse dentro de los objetos, lo que hace el código más fácil de testear.
- **Las *code reviews* usan un vocabulario común**: "esto rompe el principio de responsabilidad única", "este objeto tiene envidia de características".
- **Las decisiones de diseño se discuten con argumentos**, no por preferencias personales.

### Por qué es una inversión de base

Invertir en diseño orientado a objetos tiene un efecto multiplicador: cuando el equipo comparte esta base, la formación posterior en patrones, TDD o DDD avanza más rápido y se aplica con más criterio. Por eso es una buena opción como primer curso para equipos que están creciendo o incorporando perfiles junior.

## Formato: online o presencial

El curso se imparte **online en directo** para toda España y **presencial en Galicia**, en vuestras oficinas de Santiago de Compostela, A Coruña o Vigo. La carga práctica es la misma en ambos formatos.

## Bonificación FUNDAE

El curso de diseño orientado a objetos es bonificable por FUNDAE, por lo que las empresas en España pueden recuperar total o parcialmente su coste. Os ayudamos con la gestión de la bonificación.

## Próximo paso

Si quieres que tu equipo tenga una base sólida de diseño sobre la que construir todo lo demás, revisa el temario completo del [curso de diseño orientado a objetos para equipos](/es/courses/diseno-orientado-objetos/) o [escríbenos](/es/contact/) contándonos cómo es vuestro equipo y vuestro stack. Os proponemos un enfoque adaptado a vuestro contexto.
