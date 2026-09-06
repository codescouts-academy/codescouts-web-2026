---
title: Clean Code
date: 2022-05-03T00:00:00.000Z
summary: Principios de Clean Code para escribir código legible, understandable y mantenible. Directrices esenciales para el craftsmanship y equipos de desarrollo profesional.
image: /images/blog/clean-code.png
tags: [cleancode, codigolimpio, codescouts]
---

## ¿Qué es Clean Code? 🧹

El clean code no es un conjunto de reglas estrictas, sino una serie de principios que ayudan a producir código intuitivo y fácil de modificar. En este contexto, intuitivo significa que cualquier desarrollador profesional pueda entenderlo de inmediato. Un código fácilmente adaptable tiene las siguientes características:

    1. Es legible
    2. Es fácil de modificar
    3. Es fácil de mantener
    4. Es fácil de compartir

## Reglas generales ⚖️

1.  Siga las convenciones estándar de cada lenguaje y del equipo.
2.  Mantenlo simple, estúpido. Más simple siempre es mejor. Reducir la complejidad tanto como sea posible [KISS](/es/blog/principios-de-la-buena-programacion/#kiss-keep-it-simple-stupid-but-i-prefer-use-keep-it-stupidly-simple).
3.  Regla de los boy scouts. Deje el campamento más limpio de lo que lo encontró. [Boy scouts rule](/es/blog/principios-de-la-buena-programacion/#boy-scout-rule)
4.  Siempre busca el problema base.

## Reglas de diseño 🏗️

1.  Mantenga los datos configurables en niveles altos.
2.  Use el polimorfismo en lugar de if/else o switch/case.
3.  Evite la configuración excesiva.
4.  Utilice la inyección de dependencia.
5.  Seguir la Ley de Demeter. Una clase debe conocer solo sus dependencias directas [Ley de demeter](/es/blog/object-calisthenics/#un-punto-por-línea-o-_utilizar-la-ley-de-demeter_).

## Consejos para el código limpio 🧽

1.  Sea consistente. Si haces algo de cierta manera, haz todas las cosas similares de la misma manera.
2.  Utilice variables explicativas.
3.  Encapsular las condiciones _corner cases_. Las condiciones de _corner cases_ son difíciles de seguir. Ponga el procesamiento para ellos en un solo lugar.
4.  Utilice value objects en lugar tipo primitivo [Envuelve en tipos primitivos](/es/blog/object-calisthenics/#envuelve-primitivos).
5.  Evite la dependencia lógica. No escriba métodos que funcionen correctamente dependiendo de otra cosa en la misma clase.
6.  Evita los condicionales negativos.

## Reglas de nombres 🤢

1.  Elija nombres descriptivos e inequívocos.
2.  Hacer una distinción significativa.
3.  Use nombres pronunciables.
4.  Use nombres buscables.
5.  Reemplace números mágicos con constantes con nombre.

## Reglas de funciones 😡

1.  Pequeñas.
2.  Haz una cosa.
3.  Use nombres descriptivos.
4.  Utilice la menor cantidad posible de argumentos.
5.  Que no tenga efectos secundarios.
6.  No use _flags arguments_. Divida el método en varios métodos independientes que se puedan llamar desde el cliente sin esos _flags_.

## Reglas de comentarios 🤬

1.  Intenta siempre explicarte en código.
2.  No sea redundante.
3.  No agregue ruido obvio.
4.  No comente el código. Si no se usa, elimínalo.
5.  Usar como explicación de la intención.
6.  Utilizar como aclaración de código.
7.  Usar como advertencia de consecuencias.

## Estructura del código fuente 📁

1.  Separar conceptos verticalmente.
2.  El código relacionado debe aparecer verticalmente denso.
3.  Declarar variables cercanas a su uso.
4.  Las funciones dependientes deben estar cerca.
5.  Las funciones similares deben estar cerca.
6.  Coloque las funciones en la dirección hacia abajo.
7.  Mantenga las líneas cortas.
8.  Usa espacios en blanco para asociar cosas relacionadas y desasociar las que están débilmente relacionadas.
9.  No rompa la sangría.

## Objetos y estructuras de datos 🧼

1.  Ocultar estructura interna.
2.  Use estructuras de datos.
3.  Evita estructuras híbridas (mitad objeto y mitad datos).
4.  Debe ser pequeño.
5.  Que haga solo una cosa [Single responsability](/es/blog/solid/#s-----single-responsibility).
6.  Pequeño número de variables de instancia [Evita más de 2 atributos de instancia](/es/blog/object-calisthenics/#evita-más-de-dos-atributos-de-instancia).
7.  La clase base no debe saber nada acerca de sus derivados.
8.  Use métodos no estáticos a métodos estáticos [Evita métidos estáticos](/es/blog/object-calisthenics/#clases-con-estado-evita-métodos-estáticos).

## Pruebas 🧪

1.  Una aserción por prueba.
2.  Legible.
3.  Rápido.
4.  Independiente.
5.  Repetible.

## Code smells 💩

1.  Rigidez. El software es difícil de cambiar. Un pequeño cambio provoca una cascada de cambios posteriores.
2.  Fragilidad. El software se rompe en muchos lugares debido a un solo cambio.
3.  Inmovilidad. No puede reutilizar partes del código en otros proyectos debido a los riesgos involucrados y al gran esfuerzo.
4.  Complejidad innecesaria.
5.  Repetición innecesaria.
6.  Opacidad. El código es difícil de entender.
