---
title: RabbitMQ en 5 minutos
date: 2024-05-10T00:00:00.000Z
summary: ¿Quieres aprender los conceptos clave de RabbitMQ?, te explico qué es RabbitMQ en 5 minutos.
images: [images/blog/rabbitmq.png]
image: images/blog/rabbitmq.png
feature_image: images/blog/rabbitmq.png
with_reading_time: true
with_post_share: true
tags: [rabbitmq, codescouts]
---

# Rabbit en 5 minutos

RabbitMQ es un broker de mensajería de código abierto que permite a las aplicaciones comunicarse entre sí de manera asíncrona. A continuación, te explico los conceptos clave de RabbitMQ en 5 minutos:

# Producing y Consuming

En RabbitMQ, hay dos roles principales:

- Producer (Productor): La aplicación que envía un mensaje a RabbitMQ.
- Consumer (Consumidor): La aplicación que recibe un mensaje de RabbitMQ.

# Colas (Queues)

Una cola es un buffer que almacena los mensajes enviados por los productores y esperan a ser procesados por los consumidores. Las colas son la unidad básica de almacenamiento en RabbitMQ.

# Exchanges

Un exchange (intercambio) es el componente que se encarga de recibir los mensajes de los productores y enviarlos a las colas adecuadas. Los exchanges son como "centrales de distribución" que dirigen los mensajes a las colas correctas.

## Tipos de Exchanges

Hay cuatro tipos de exchanges en RabbitMQ:

- Direct Exchange: Envía el mensaje a la cola que coincide exactamente con la clave de routing (routing key) especificada.
- Fanout Exchange: Envía el mensaje a todas las colas vinculadas a la exchange.
- Topic Exchange: Envía el mensaje a las colas que coinciden con la clave de routing especificada, utilizando un patrón de matching (por ejemplo, _.orders._).
- Headers Exchange: Envía el mensaje a las colas que coinciden con los headers (encabezados) del mensaje.

# Bindings

Un binding (enlace) es la relación entre una cola y una exchange. Los bindings definen cómo se envían los mensajes desde la exchange a la cola.

# Routing Key

La clave de routing (routing key) es una cadena que se utiliza para determinar a qué cola se envía el mensaje. Los productores especifican la clave de routing cuando envían un mensaje.

# Message Acknowledgment

Cuando un consumidor procesa un mensaje, debe enviar un acknowledgment (confirmación) a RabbitMQ para indicar que el mensaje ha sido procesado correctamente. Si el consumidor falla antes de procesar el mensaje, RabbitMQ reenvía el mensaje a la cola.

# Otros conceptos

- Virtual Host: Un virtual host es un espacio de nombres lógico que separa las aplicaciones que utilizan RabbitMQ.
- Channel: Un canal es una conexión lógica entre una aplicación y RabbitMQ. Los canales se utilizan para enviar y recibir mensajes.
