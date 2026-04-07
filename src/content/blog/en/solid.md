---
title: The SOLID Principles
date: 2022-04-29T00:00:00.000Z
summary: The SOLID principles are the foundation of object-oriented programming.
image: /images/blog/solid.png
tags: [principles, principles, solid, codescouts]
---

# **S — Single Responsibility**

### A class should have a single responsibility

![Untitled](/images/blog/single-responsability.png)

If a class has many responsibilities, the chance of errors increases because changing one responsibility may affect the others without you knowing.

```tsx
class Book {
  public title: string;
  public author: string;
  public description: string;
  public pages: number;

  public saveToFile(): void {}
}
```

**Goal**

This principle aims to separate behaviors so that if errors arise from changing one behavior, they do not affect unrelated behaviors.

```tsx
class Book {
  public title: string;
  public author: string;
  public description: string;
  public pages: number;
}

class Persistence {
  public saveToFile(book: Book): void {}
}
```

## **O — Open-Closed**

### Classes should be open for extension, but closed for modification

![Untitled](/images/blog/open-closed.png)

Changing a class’s current behavior will affect all systems that use that class.

If you want the class to do more things, the ideal approach is to add to existing behaviors, NOT change them.

```tsx
class Rectangle {
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

class Circle {
  public radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }
}

class AreaCalculator {
  public calculateRectangleArea(rectangle: Rectangle): number {
    return rectangle.width * rectangle.height;
  }

  public calculateCircleArea(circle: Circle): number {
    return Math.PI * (circle.radius * circle.radius);
  }
}
```

**Goal**

This principle aims to extend a class’s behavior without changing its existing behavior, to avoid causing errors wherever the class is used.

```tsx
interface Shape {
  calculateArea(): number;
}

class Rectangle implements Shape {
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public calculateArea(): number {
    return this.width * this.height;
  }
}

class Circle implements Shape {
  public radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public calculateArea(): number {
    return Math.PI * (this.radius * this.radius);
  }
}

class AreaCalculator {
  public calculateArea(shape: Shape): number {
    return shape.calculateArea();
  }
}
```

## **L — Liskov Substitution**

### If S is a subtype of T, objects of type T should be replaceable with objects of type S without altering desirable properties.

![Untitled](/images/blog/liskov-sustitution.png)

If you have a class and create another class from it, the original becomes the **parent** and the new class becomes the **child**. The child class should be able to do everything the parent class can do. This is called **inheritance**.

The child class should be able to handle the same requests and deliver the same type of result as the parent class.

If the child class does not meet those requirements, it means the child has changed too much and violates this principle.

```tsx
class Rectangle {
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public calculateArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(size: number) {
    super(size, size);
  }
}
```

**Goal**

This principle aims to enforce consistency so that the parent class or its child class can be used in the same way without errors.

```tsx
class Rectangle {
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public calculateArea(): number {
    return this.width * this.height;
  }

  public isSquare(): boolean {
    return this.width === this.height;
  }
}
```

## **I — Interface Segregation**

### Clients should not be forced to depend on methods they do not use.

![Untitled](/images/blog/interface-segregation.png)

When a class is required to perform actions that are not useful, it is wasteful and can produce unexpected errors if the class cannot perform those actions.

A class should perform only the actions necessary for its role. Any other actions should be removed completely or moved elsewhere if another class might use them in the future.

```tsx
interface Bird {
  fly(): void;
  walk(): void;
}

class HouseSparrow implements Bird {
  public fly() {}
  public walk() {
    throw new Error(
      "Unfortunately, House Sparrow can not walk! They jump in the real world",
    );
  }
}

class Penguin implements Bird {
  public fly() {
    throw new Error("Unfortunately, Penguin can not fly!");
  }
  public walk() {}
}
```

**Goal**

This principle aims to split a set of actions into smaller sets so a class executes ONLY the actions it needs.

```tsx
interface CanWalk {
  walk(): void;
}

interface CanFly {
  fly(): void;
}

class Nightingale implements CanFly, CanWalk {
  public fly() {}
  public walk() {}
}

class Kiwi implements CanWalk {
  public walk() {}
}
```

## **D — Dependency Inversion**

### High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

![Untitled](/images/blog/dependency-inversion.png)

First, let’s define the terms more simply.

**High-level module (or class)**: a class that executes an action using a tool.

**Low-level module (or class)**: the tool needed to perform the action.

**Abstraction**: an interface that connects the two classes.

**Details**: how the tool works.

This principle says a class should not be tightly coupled to the tool it uses to perform an action. Instead, it should depend on the interface that allows the tool to connect to the class.

It also says that neither the class nor the abstraction should know how the tool works. The tool should simply comply with the interface specification.

```tsx
interface Person {
  introduceSelf(): void;
}

class Engineer implements Person {
  public introduceSelf() {
    console.log("I am an engineer");
  }
}

class Musician implements Person {
  public introduceSelf() {
    console.log("I am a musician");
  }
}
```

**Goal**

This principle aims to reduce the dependency of a high-level class on a low-level class by introducing an interface.

```tsx
class Person {
  public introductionService: IntroductionService;

  constructor(introductionService: IntroductionService) {
    this.introductionService = introductionService;
  }

  public introduceSelf() {
    this.introductionService.introduce();
  }
}

const engineer = new Person(new EngineerIntroductionService());
const musician = new Person(new MusicianIntroductionService());
```
