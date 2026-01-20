---
title: Documento de identidad - OCR/MRZ Kata
date: 2024-08-21T00:00:00.000Z
summary: Kata nivel medio/avanzado para practicar TDD y Mocks (opcional) en un algoritmo del mundo real. Esta Kata consiste en implementar un algoritmo que traduzca una imagen de un DNI a una cadena de caracteres con la información estructurada, y a partir de esta cadena parsearlo a un objeto con la información del DNI.
images: [images/blog/mrz-feature.webp]
image: images/blog/mrz-feature.webp
feature_image: images/blog/mrz-feature.webp
with_reading_time: true
with_post_share: true
tags: [tdd, ocr, mrz, kata]
---

## Documento de identidad - OCR/MRZ Kata

Kata nivel medio/avanzado para practicar TDD y Mocks (opcional) en un algoritmo del mundo real. Esta Kata consiste en implementar un algoritmo que traduzca una imagen de un DNI a una cadena de caracteres con la información estructurada, y a partir de esta cadena parsearlo a un objeto con la información del DNI.

## ¿Qué es el OCR/MRZ?

El OCR/MRZ es un sistema de reconocimiento óptico de caracteres que se utiliza para leer los datos de la zona de lectura mecánica de un documento de identidad. En el caso de los pasaportes, el MRZ es la zona de la parte inferior de la página de datos del pasaporte.

## ¿Por qué usar TDD?

- **Retroalimentación rápida**: TDD te permite obtener una retroalimentación inmediata sobre el código que estás escribiendo.

- **Código más limpio**: TDD te obliga a escribir código limpio y modular.

- **Menos errores**: TDD te ayuda a detectar errores antes de que se conviertan en problemas.

- **Documentación viva**: Los tests son una forma de documentación viva que describe cómo se espera que funcione el código.

## Recuerda las leyes de TDD

1. No escribas código de producción a menos que sea para pasar un test fallido.
2. No escribas más de un test unitario a menos que falle la compilación.
3. No escribas más código de producción del necesario para pasar el test unitario actual.

## Ejercicio

Si revisas tu DNI por un momento, verás que el Anverso del mismo tiene una foto, tu información personal, pero la distribución de la información está pensada para que un ser humano lo pueda entender rápidamente, sin embargo, la parte de atrás, tiene una zona de lectura mecánica (MRZ) que es una serie de caracteres que contienen la información de tu DNI de forma estructurada.

El objetivo de esta Kata es que escribas un algoritmo que sea capaz de leer la información de la zona de lectura mecánica de un DNI y devuelva un objeto con la información estructurada.

![DNI](/images/blog/mrz.jpg)

## Asunciones

Vamos a asumir que hemos implementado un componente que es capaz de leer la imagen y parsear la información a una cadena de caracteres, para ello puedes usar Mocks, Faces o Dummy objects, si no sabes muy bien como funcionan, te comparto un post que lo explica muy bien: [Mocks, Stubs, Spies y Fakes]({{< ref "fakes-spies-mocks-stubs-dummies.md" >}})

## Requerimientos

**MRZImageService** es el servicio que se encargará de leer la información a partir de una foto de la zona de lectura mecánica de un DNI y devolver la cadena de caracteres (un string).

## Estructura MRZ de un DNI español

Aquí tienes la estructura de la información que se encuentra en la zona de lectura mecánica de un DNI, échale un vistazo, te servirá para desarrollar el algoritmo.

![MRZ](/images/blog/mrz-1.png)

## Aclaraciones

### Input de MRZImageService

![MRZ](/images/blog/mrz-2.png)

### Output de MRZImageService

**'IDESPCAA000000499999999R<<<<<<\n8001014F3106028ESP<<<<<<<<<<<1\nESPANOLA<ESPANOLA<<CARMEN<<<<<\n'**

### Input del algoritmo

**'IDESPCAA000000499999999R<<<<<<\n8001014F3106028ESP<<<<<<<<<<<1\nESPANOLA<ESPANOLA<<CARMEN<<<<<\n'**

### Output del algoritmo

```json
{
  "type": "DNI",
  "id": "00000049",
  "dob": "01/01/1980",
  "sex": "F",
  "exp": "28/06/2031",
  "country": "ESP",
  "surname": "ESPANOLA ESPANOLA",
  "name": "CARMEN"
}
```

## Paso 1 - El Algoritmo

Implementa con TDD paso a paso la lógica necesaria para leer la información de la zona de lectura mecánica de un DNI.

- Tipo de DNI
- Número de DNI
- Fecha de nacimiento
- Sexo
- Fecha de expiración
- Nacionalidad
- Apellido
- Nombre

> No olvides los corner cases 🤗

## Paso 2 - El Servicio

Implementa un servicio que sea capaz de leer la información de la zona de lectura mecánica de un DNI y devolver una cadena de caracteres con los valores en la imagen.
Si estás usando javascript, puedo recomendarte esta librería para leer la información de la imagen: [tesseract.js](https://tesseract.projectnaptha.com/) usando la `traineddata` de `ocrb`.

Si tienes alguna duda, o te gustaría que hagamos esta kata juntos, no dudes en escribirnos.

Un saludo 👋
