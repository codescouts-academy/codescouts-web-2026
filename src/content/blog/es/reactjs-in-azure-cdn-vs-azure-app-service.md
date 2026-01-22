---
title: ReactJs Azure CDN o Azure App service
date: 2023-01-20T00:00:00.000Z
summary: Hay varias ventajas en alojar una aplicación React JS en un Azure CDN en lugar de un Azure App Service.
image: /images/blog/azure-cdn-vs-azure-app-service.png
tags: [azure, cdn, app service, codescouts]
---

¿Estás pensando en alojar una aplicación React JS? Si es así, es posible que te estés preguntando cuál es la mejor opción para alojarla: ¿un Azure CDN o un Azure App Service? Aunque ambos servicios son opciones viables para alojar aplicaciones, hay algunas ventajas clave en alojar una aplicación React JS en un Azure CDN en lugar de un Azure App Service.

Hay varias ventajas en alojar una aplicación React JS en un Azure CDN en lugar de un Azure App Service:

## Mejora del rendimiento

Uno de los mayores beneficios de alojar una aplicación React JS en un Azure CDN es la mejora del rendimiento. Cuando alojas una aplicación en un Azure CDN, los archivos estáticos, como HTML, CSS, JavaScript, etc., se pueden distribuir a través de la red global de servidores de Azure. Esto significa que los usuarios pueden acceder a los archivos de la aplicación desde el servidor más cercano a su ubicación, lo que reduce el tiempo de carga de la página y mejora el rendimiento de la aplicación. Además, un Azure CDN puede proporcionar una mayor velocidad y capacidad de carga para tus archivos, lo que significa que tus usuarios pueden acceder a la aplicación de manera más rápida y eficiente.

## Ahorro de costos

Otro beneficio de alojar una aplicación React JS en un Azure CDN es el ahorro de costos. Al distribuir los archivos estáticos a través de una red de servidores, se puede reducir la carga en el servidor principal, lo que significa que se necesitará menos capacidad de servidor para manejar el tráfico. Esto puede reducir los costos de alojamiento y mantenimiento de la aplicación. Además, Azure CDN ofrece precios flexibles basados en el tráfico, lo que significa que solo pagarás por los datos que se transfieren a través del CDN, lo que puede ser más económico que utilizar un Azure App Service.

Aquí vemos una tabla extraida de la web de Azure.
<br />
Estos son los precios para un Azure App Service
![Untitled](/images/blog/azure-app-service-prices.png)

Vemos que los precios están estipulados en horas, es decir tiempo de procesamiento.

Mientras que en una Azure CDN
![Untitled](/images/blog/azure-cdn-prices.png)
Los precios están definidos por GB de transferencia.

## Escalabilidad

Alojar una aplicación React JS en un Azure CDN permite una mayor escalabilidad. Debido a que los archivos estáticos se pueden distribuir a través de múltiples servidores, es posible manejar picos de tráfico sin afectar el rendimiento de la aplicación. Esto significa que la aplicación puede crecer a medida que aumenta el tráfico sin preocuparse por la capacidad del servidor. Además, el Azure CDN también puede ajustar automáticamente la capacidad del servidor en función de la demanda, lo que significa que no tendrás que preocuparte por escalar manualmente la aplicación.

## Seguridad

Un Azure CDN puede ayudar a proteger la aplicación React JS de ataques de denegación de servicio distribuido (DDoS). Al distribuir los archivos estáticos a través de una red de servidores, se puede reducir la carga en el servidor principal y evitar la congestión de la red, lo que reduce la posibilidad de un ataque DDoS exitoso. Además, el Azure CDN también proporciona opciones de seguridad adicionales, como la protección contra botnets y la autenticación de usuarios, lo que puede ayudar a proteger tu aplicación contra amenazas de seguridad.

En resumen, cuando necesites alojar una aplicación React JS, o incluso cualquier aplicación web que contenga archivos estáticos o client side rendering, en un Azure CDN puede mejorar el rendimiento, reducir costos, permitir una mayor escalabilidad y mejorar la seguridad de la aplicación en comparación con un Azure App Service.

Si estás buscando alojar una aplicación React JS, un Azure CDN es una opción que deberías considerar seriamente.

## Referencias

- <https://azure.microsoft.com/es-es/pricing/details/app-service/linux/>
- <https://azure.microsoft.com/es-es/pricing/details/cdn/>

Si te gustó compártelo que nos ayudaría mucho a que les llegue a todo el mundo 👇

Un saludo 👋
