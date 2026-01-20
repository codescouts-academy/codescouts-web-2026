---
title: RabbitMQ in 5 minutes
date: 2024-05-10T00:00:00.000Z
summary: Do you want to learn the key concepts of Rabbitmq?, I explain what Rabbitmq is in 5 minutes.
images: [images/blog/rabbitmq.png]
image: images/blog/rabbitmq.png
feature_image: images/blog/rabbitmq.png
with_reading_time: true
with_post_share: true
tags: [rabbitmq, codescouts]
---

# Rabbit in 5 minutes

Rabbitmq is an open source messaging broker that allows applications to communicate with each other asynchronously.Next, I explain the key concepts of Rabbitmq in 5 minutes:

# Producing and consumption

In Rabbitmq, there are two main roles:

- Produce (producer): The application that sends a message to Rabbitmq.
- Consumer (consumer): the application that receives a message from Rabbitmq.

# Colas (Queues)

A tail is a buffer that stores messages sent by producers and wait to be prosecuted by consumers.Tails are the basic storage unit in Rabbitmq.

# Exchange

An Exchange (exchange) is the component that is responsible for receiving the messages from the producers and sending them to the right queues.Exchange are like "distribution centrals" that direct messages to the right queues.

## Types of Exchange

There are four types of exchanges in Rabbitmq:

- Direct Exchange: Send the message to the tail that coincides exactly with the Routing Key (Routing Key) key.
- Fanout Exchange: Send the message to all queues linked to the Exchange.
- Topic Exchange: Send the message to the queues that coincide with the specified routing key, using a matching pattern (for example, _.orders._).
- Headers Exchange: Send the message to the queues that coincide with the Headers (headers) of the message.

# Bindings

A binding (link) is the relationship between a tail and an exchange.Bindings define how messages are sent from the exchange to the tail.

# Routing Key

The routing key (Routing Key) is a chain that is used to determine which tail the message is sent.Producers specify the routing key when they send a message.

# Message Acknowledge

When a consumer processes a message, he must send an actknowledge (confirmation) to Rabbitmq to indicate that the message has been processed correctly.If the consumer fails before processing the message, Rabbitmq forward the message to the tail.

# Other concepts

- Virtual host: a virtual host is a logical name space that separates the applications that Rabbitmq use.
- Channel: A channel is a logical connection between an application and Rabbitmq.The channels are used to send and receive messages.
