---
title: Los principios solid
date: 2022-04-29T00:00:00.000Z
summary: Los principios SOLID son la base de la programación orientada a objetos
image: /images/blog/solid.png
tags: [principles, principios, solid, codescouts]
---

# **S --- Single Responsibility**

### Una clase debe tener una única responsabilidad

![Untitled](/images/blog/single-responsability.png)

Si una clase tiene muchas responsabilidades, aumenta la posibilidad de errores porque hacer cambios en una de sus responsabilidades podría afectar a las otras sin que lo sepas.

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

Este principio tiene como objetivo separar los comportamientos para que, si surgen errores como resultado de su cambio, no afecten otros comportamientos no relacionados.

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

## **O --- Open-Closed**

### Las clases deben estar abiertas para su extensión, pero cerradas para su modificación

![Untitled](/images/blog/open-closed.png)

Cambiar el comportamiento actual de una clase afectará a todos los sistemas que utilizan esa clase.

Si desea que la clase realice más funciones, el enfoque ideal es agregar a las funciones que ya existen NO cambiarlas.

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

Este principio tiene como objetivo extender el comportamiento de una clase sin cambiar el comportamiento existente de esa clase. Esto es para evitar causar errores dondequiera que se use la clase.

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

**L** --- **Liskov Substitution**

### Si S es un subtipo de T, entonces los objetos de tipo T en un programa pueden reemplazarse con objetos de tipo S sin alterar ninguna de las propiedades deseables de ese programa.

![Untitled](/images/blog/liskov-sustitution.png)

Si tiene una clase y crea otra clase a partir de ella, se convierte en **padre** y la nueva clase se convierte en **hija** La clase **hija** debería poder hacer todo lo que la clase **padre** puede hacer. Este proceso se llama **Herencia**.

La clase **secundaria** debe poder procesar las mismas solicitudes y entregar el mismo resultado que la clase **principal** o podría entregar un resultado que sea del mismo tipo.

Si la clase **child** no cumple con estos requisitos, significa que la clase **child** ha cambiado por completo y viola este principio.

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

Este principio tiene como objetivo hacer cumplir la coherencia para que la clase principal o su clase secundaria se puedan usar de la misma manera sin errores.

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

**I** --- **Interface Segregation**

### No se debe obligar a los clientes a depender de métodos que no utilizan.

![Untitled](/images/blog/interface-segregation.png)

Cuando se requiere que una clase realice acciones que no son útiles, es un desperdicio y puede producir errores inesperados si la clase no tiene la capacidad de realizar esas acciones.

Una clase debe realizar solo las acciones necesarias para cumplir su función. Cualquier otra acción debe eliminarse por completo o moverse a otro lugar si otra clase podría usarla en el futuro.

```tsx
interface Bird {
  fly(): void;
  walk(): void;
}

class HouseSparrow implements Bird {
  public fly() {}
  public walk() {
    throw new Error(
      "Unfortunately, House Sparrow can not walk!, they jump on real world",
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

Este principio tiene como objetivo dividir un conjunto de acciones en conjuntos más pequeños para que una clase ejecute SÓLO el conjunto de acciones que requiere.

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

**D** --- **Dependency Inversion**

### Los módulos de alto nivel no deben depender de los módulos de bajo nivel. Ambos deben depender de la abstracción.- Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones.

![Untitled](/images/blog/dependency-inversion.png)

En primer lugar, definamos los términos utilizados aquí de forma más sencilla.

**Módulo (o clase) de alto nivel**: clase que ejecuta una acción con una herramienta.

**Módulo (o clase) de bajo nivel**: La herramienta que se necesita para ejecutar la acción

**Abstracción**: Representa una interfaz que conecta las dos clases.

**Detalles**: Cómo funciona la herramienta

Este principio dice que una clase no debe fusionarse con la herramienta que utiliza para ejecutar una acción. Más bien, debe fusionarse con la interfaz que permitirá que la herramienta se conecte a la dlase.

También dice que tanto la clase como la interfaz no deben saber cómo funciona la herramienta. Sin embargo, la herramienta debe cumplir con las especificaciones de la interfaz.

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

Este principio tiene como objetivo reducir la dependencia de una clase de alto nivel en la clase de bajo nivel mediante la introducción de una interfaz.

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
