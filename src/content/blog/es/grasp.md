---
title: Patrones GRASP, el viejo SOLID
date: 2022-07-03T00:00:00.000Z
summary: Hoy en día se habla mucho de los principios SOLID, pero unos cuantos años antes, Craig Larman introdujo unos patrones muy interesantes, veámoslos!
image: /images/blog/grasp.png
feature_iage: images/blog/grasp-feature.png
tags: [diseño, design, objectcalisthenics, codescouts]
---

Hoy en día se habla mucho de los principios SOLID, pero unos años antes, Craig Larman introdujo unos patrones muy interesantes, estos son los patrones de **GRASP**, el acrónimo de **General Responsibility Assignment Software Patterns**.
Desde mi opinión, muchos desarrolladores hoy en día referencian los principios [SOLID]({{< ref "solid.md" >}}) por costumbre o moda de hoy en día, y desconocen los patrones **GRASP** sin saber que estos son mucho más esenciales.

## Pero ¿Qué es un patrón? 🤔

---

Muchas veces nos encontramos con la misma problemática, una y otra vez, esto es un patrón de repetición.
Los patrones de diseño, son justamente esto, patrones que se repiten en el tiempo y que se pueden solucionar de una manera concreta.

Los patrones de diseño suelen tener una estructura común:

- Descripción
- Escenario de Uso
- Solución concreta
- La consecuencias de utilizar este patrón
- Ejemplos de implementación
- Lista de patrones relacionados

Patrones hay muchos (muchas familias)... de momento vamos a ver como nos pueden ayudar los primeros (GRASP).

## ¿Qué son los patrones GRASP?

---

Una de las cosas más complicadas en **Orientación a Objeto** consiste en elegir las clases adecuadas y decidir como estas _clases_ deben interactuar.

Incluso cuando utilizamos metodologías rápidas como **extreme programming** y centramos el proceso en el desarrollo continuo, es inevitable elegir cuidadosamente las **responsabilidades** de cada clase en la primera codificación y, fundamentalmente, en la **refactorización** constante de nuestro software.

Lo patrones de **GRASP**, no compiten con los patrones de diseño de GOF... los patrones de **GRASP**, nos guían para ayudarnos a encontrar los patrones de diseño (que son más concretos)...

Repasemos rápidamente los patrones **GRASP** Vamos a ello 👇👇

### Bajo Acoplamiento

---

Debe haber pocas dependencias entre las clases. Si todas las clases dependen de todas ¿cuanto software podemos extraer de un modo
independiente y reutilizarlo en otro proyecto?

Uno de los principales síntomas de un mal diseño y alto acoplamiento es una herencia muy profunda.
Siempre hay que considerar las ventajas de la delegación respecto de la herencia.

### Alta Cohesión

---

Cada elemento de nuestro diseño debe realizar una labor única dentro del sistema, no desempeñada por el resto de los elementos y
auto-identificable.

Ejemplos de una baja cohesión son clases que hacen demasiadas cosas.

Ejemplos de buen diseño se producen cuando se crean los denominados «paquetes de servicio» o clases agrupadas por funcionalidades que son
fácilmente reutilizables (bien por uso directo o por herencia).

### Experto en la información

---

La responsabilidad de realizar una labor es de la clase que tiene o puede tener los datos involucrados (atributos). Una clase, contiene toda la información necesaria para realizar la labor que tiene encomendada.

Hay que tener en cuenta que esto es aplicable mientras
estemos considerando los mismos aspectos del sistema:

- Lógica de negocio
- Persistencia
- Interfaz de usuario

### Creador

---

Se asigna la responsabilidad de que una clase B cree un Objeto de la clase A solamente cuando

- B contiene a A
- B es una agregación (o composición) de A
- B almacena a A
- B tiene los datos de inicialización de A (datos que requiere su constructor)
- B usa a A.

### Controlador

---

El patrón controlador es un patrón que sirve como intermediario entre una determinada interfaz y el algoritmo que la implementa, de tal forma que es la que recibe los datos del usuario y la que los envía a las distintas clases según el método llamado.

### Polimorfismo

---

El implementar comportamiento alternativos con sentencias IF-ELSE, no hace más que limitar la reutilización y crecimiento de la
aplicación. Imagine que una aplicación muestra mensajes distintos en distintos idiomas.... con IF, al aumentar en uno el número de idiomas,
nos obligaría a añadir un nuevo IF. Con polimorfismo nos limitaríamos a crear un objeto de una clase polimórfica nueva (bajo acoplamiento,
alta cohesión y potencial reutilización).

### Fabricación pura

---

Cuando los problemas se complican, construir clases que se encarguen de construir los objetos adecuados en cada momento (factorías) .

### Indirección

---

Crear clases intermedias para desacoplar clientes de servicio y servicios.

### No hables con extraños

---

Un método, solamente invocará a métodos de:

- De si mismo (this)
- De su área de parámetros
- Un objeto creado en su propio ámbito (los demás los doy por incluidos)

### Conclusiones

Como pueden ver, estos conceptos creados por **[Craig Larman](https://www.craiglarman.com/)** tienen cierta relación con los principios **[SOLID]({{< ref "solid.md" >}})** por **[Uncle Bob](https://es.wikipedia.org/wiki/Robert_C._Martin)**, ambos dos conceptos fueron pensados basándose en la **programación orientada a objetos**, sin embargo, desde mi opinión, creo que es más esencial conocer bien los patrones **GRASP** más que los principios **SOLID** ya que estos primeros plantean conceptos más básicos y de sentido común que los principios **SOLID**, en otras palabras, los patrones **GRASP** plantean conceptos bases, imprescindibles de la programación orientada a objetos.

Es decir... Los principios **SOLID** hablan más de un detalle de implementación en particular que los patrones **GRASP**.

Espero que les haya gustado el post 🖖

Un saludo 👋
