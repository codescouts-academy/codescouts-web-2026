---
title: GRASP Patterns, the Old SOLID
date: 2022-07-03T00:00:00.000Z
summary: These days people talk a lot about SOLID principles, but a few years earlier Craig Larman introduced very interesting patterns. Let’s review them!
image: /images/blog/grasp.png
tags: [diseño, design, objectcalisthenics, codescouts]
---

These days people talk a lot about SOLID principles, but a few years earlier Craig Larman introduced very interesting patterns called **GRASP**, which stands for **General Responsibility Assignment Software Patterns**.
From my point of view, many developers today reference [SOLID]({{< ref "solid.md" >}}) by habit or fashion, and ignore **GRASP** patterns, not realizing that these are often much more fundamental.

## What is a pattern? 🤔

---

Many times we face the same problem over and over again, and that repetition is a pattern.
Design patterns are precisely that: repeated solutions over time that can be solved in a concrete way.

Design patterns typically share a common structure:

- Description
- Use case
- Concrete solution
- Consequences of using the pattern
- Implementation examples
- Related pattern list

There are many patterns (many families)… for now we will see how the first ones in GRASP can help us.

## What are GRASP patterns?

---

One of the most difficult things in object-oriented design is choosing the right classes and deciding how those classes should interact.

Even when we use fast methodologies like **Extreme Programming** and focus on continuous delivery, it is inevitable to carefully choose the **responsibilities** of each class when writing the first code, and fundamentally, constantly **refactor** our software.

GRASP patterns do not compete with GOF design patterns… GRASP patterns guide us to find the design patterns (which are more concrete).

Let’s quickly review the GRASP patterns 👇👇

### Low Coupling

---

There should be few dependencies between classes. If every class depends on every other class, how much software can we extract independently and reuse in another project?

One of the main symptoms of bad design and high coupling is deep inheritance.
You should always consider the benefits of delegation over inheritance.

### High Cohesion

---

Each element in our design should perform a unique role within the system, not shared by other elements, and should be self-identifiable.

Examples of low cohesion are classes that do too many things.

Examples of good design happen when we create so-called service bundles or classes grouped by functionality that are easily reusable (either directly or by inheritance).

### Information Expert

---

The responsibility for performing a task belongs to the class that has or can have the involved data (attributes). A class should contain all the information needed to perform the task it is assigned.

Keep in mind that this is applicable while we are considering the same aspects of the system:

- Business logic
- Persistence
- User interface

### Creator

---

A class B is assigned the responsibility to create an object of class A only when:

- B contains A
- B is an aggregation (or composition) of A
- B stores A
- B has the initialization data for A (data required by A’s constructor)
- B uses A

### Controller

---

The controller pattern is an intermediary between an interface and the algorithm that implements it. It receives user data and sends it to different classes according to the called method.

### Polymorphism

---

Implementing alternative behavior with IF-ELSE statements only limits reuse and growth of the application. Imagine an app that shows different messages in different languages… with IF, adding one more language forces you to add another IF. With polymorphism, we would simply create a new polymorphic object (low coupling, high cohesion, and potential reuse).

### Pure Fabrication

---

When problems become complex, build classes responsible for constructing the right objects at each moment (factories).

### Indirection

---

Create intermediary classes to decouple clients from services.

### Don’t Talk to Strangers

---

A method should only invoke methods of:

- Itself (this)
- Its parameter objects
- An object it creates in its own scope (others are assumed to be excluded)

### Conclusions

As you can see, these concepts created by **[Craig Larman](https://www.craiglarman.com/)** are related to the principles of **[SOLID]({{< ref "solid.md" >}})** by **[Uncle Bob](https://es.wikipedia.org/wiki/Robert_C._Martin)**. Both concepts were designed around object-oriented programming. However, in my opinion, it is more essential to know GRASP patterns well than SOLID principles, since the former propose more basic, common-sense concepts that are essential to object-oriented programming.

In other words, SOLID principles speak more about implementation details than GRASP patterns.

I hope you enjoyed the post 🖖

Best regards 👋
