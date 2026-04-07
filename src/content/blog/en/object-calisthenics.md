---
title: Object Calisthenics
date: 2022-05-02T00:00:00.000Z
summary: If you want a good software design, you should follow these 10 rules to ensure it.
image: /images/blog/objects-calisthenics.png
tags: [diseño, design, objectcalisthenics, codescouts]
---

# Object Calisthenics 🤸‍♂️

Object calisthenics are a set of rules to keep in mind when designing software correctly.

1. **[One indentation level per method](#one-indentation-level-per-method)**
2. **[Don’t use the ELSE keyword](#dont-use-the-else-keyword)**
3. **[Wrap primitives](#wrap-primitives)**
4. **[Collections as first-class objects](#collections-as-first-class-objects)**
5. **[One dot per line](#one-dot-per-line)**
6. **[Don’t abbreviate](#dont-abbreviate)**
7. **[Keep entities small](#keep-entities-small)**
8. **[Avoid more than two instance variables](#avoid-more-than-two-instance-variables)**
9. **[Avoid getters/setters or public attributes](#avoid-getterssetters-or-public-attributes)**
10. **[Stateful classes, avoid static methods](#stateful-classes-avoid-static-methods)**

## One indentation level per method

How many times have you read code like this?

```tsx
class Board {
  public draw() {
    const result = "";

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; i++) {
        result += data[i][j];
      }
      result += "\n";
    }

    return result;
  }
}
```

The best solution is to extract methods using your preferred IDE to achieve a single indentation level in each method. That makes the code much easier to read and maintain. It also has the great advantage of keeping [single responsibility in each method]({{< ref "solid.md#s-----single-responsibility" >}}).

```tsx
class Board {
  public doSomething() {
    return this.collectRows();
  }

  private collectRows() {
    const rows = "";

    for (let rowNum = 0; rowNum < 10; rowNum++)
      rows += this.collectRow(rowNum);

    return rows;
  }

  private collectRow(rowNum: number) {
    const row = "";

    for (let j = 0; j < 10; i++) row += data[rowNum][j];

    return row + "\n";
  }
}
```

It may seem like we have more code this way, and we probably do, but the main benefit is that readability and maintainability improve radically.

## Don’t use the ELSE keyword

Every programmer knows if/else. It is defined in almost every programming language and is simple enough for everyone to understand. We have all gotten lost in an impossible if statement at some point, where each case extends indefinitely.
It is easy to add one more case instead of improving the design. Conditionals are a common source of duplication. Flags and state are two examples that lead to these problems.

```tsx
if (type === "engineer") {
  return 300;
} else {
  return 200;
}
```

Object-oriented languages offer a powerful tool to handle complex cases: polymorphism. Designs that use polymorphism are easier to read and maintain, and they express intent more clearly.

```tsx
abstract class Employee {
  public abstract salary();
}

class Engineer extends Employee {
  public salary() {
    return 300;
  }
}

class StateAgent extends Employee {
  public salary() {
    return 200;
  }
}
```

We can also apply a much simpler solution when we don’t need to handle many cases, something like this:

```tsx
if (!someCondition) {
  return;
}

doSomething();
```

What we see in that `if` is the typical guard clause [Guard clauses](https://learningactors.com/javascript-guard-clauses-how-you-can-refactor-conditional-logic/), but in this case it applies perfectly whenever we encounter an unevaluable condition. We can simply skip the block that will not be executed.
At the same time, we avoid the typical IF-ELSE, so we can continue safely knowing the condition has already been checked.

## Wrap primitives

This rule is very simple: whenever you can and it makes sense, try to wrap primitive types in complex objects. This way you can have an object that owns the business logic related to that primitive type, and you avoid falling into the classic solution of creating `utils` or `helper` classes to manipulate them later.

```tsx
class Person {
  private zipCode: string;
}
```

In this case, a person has a `ZipCode`. Instead of modeling it as a string, we can wrap it in a complex type.

```tsx
class Person {
  private zipCode: ZipCode;
}
```

```tsx
class ZipCode {
  private code: string;

  constructor(code: string) {
    this.validate(code);
    this.code = code;
  }

  private validate(code: string) {
    // ...
  }
}
```

This allows us to put the business logic related to that object inside the object itself, and it also produces an elegant design with high maintainability.

## Collections as first-class objects

The rule is simple: any class that contains a collection should not have many other attributes. Each collection should be wrapped in its own class, so behaviors related to the collection have a proper place. Probably filters belong to that new class. Also, your new class can handle requests like merging two groups or applying a rule to each element.

```tsx
class ItemCollection {
  private items: Item[];

  public add(item: Item) {
    this.items.push(item);
  }

  public filter(filter: (item: Item) => boolean) {
    return this.items.filter(filter);
  }
}
```

## One dot per line

Sometimes it is hard to know which object should own a responsibility. If you start searching for lines with multiple `.` points, you will find misplaced responsibilities.
If you have more than one dot in a line of code, that action is happening in the wrong place. Your object may be dealing with two objects at once. In that case, your object is an intermediary: it knows too much about too many things. Consider moving the action into one of the other objects.

If all those dots are connected, it is likely your object is digging too deeply into another one. They all indicate you are violating encapsulation. Try asking another object to do something for you instead of investigating inside it. A big part of encapsulation is not crossing a class boundary to know about its internal types.

**The Law of Demeter** ("Talk only to your friends") is a good start. Think of it this way: you can play with your toys, toys that you make, or toys someone gives you. Never play with your toy’s toy.

```tsx
class Piece {
  public representation: string[];
}

class Location {
  public currentPiece: Piece;
}

class Board {
  public locations: Location[];

  public boardRepresentation() {
    let result = "";

    for (const location of this.locations) {
      result += location.currentPiece.representation[0];
    }

    return result;
  }
}
```

We can improve it by refactoring like this:

```tsx
class Piece {
  private representation: string[];

  private character() {
    return this.representation[0];
  }

  public addTo(value: string) {
    return value + this.character();
  }
}

class Location {
  public currentPiece: Piece;

  public addTo(value: string) {
    return this.currentPiece.addTo(value);
  }
}

class Board {
  public locations: Location[];

  public boardRepresentation() {
    let representation = "";

    for (const location of this.locations) {
      representation = location.addTo(representation);
    }

    return representation;
  }
}
```

Understanding this refactor may seem harder at first, but if you look at each method individually and follow each object’s responsibility, you will quickly see what each class does and gain much better control over each responsibility.

## Don’t abbreviate

It is tempting to abbreviate class, method, or variable names. Resist! Abbreviations confuse and tend to hide more serious problems.

Think about why you abbreviate. Is it because you repeat the same word again and again? If so, your constructor might be overused and you may be missing code reuse opportunities. Is it because your names are getting too long? That may signal a misplaced responsibility or a missing class.

Try to make your methods one or two words. Avoid names that duplicate context. If the class is `Order`, the method does not need to be called `shipOrder()`. Just call it `ship()` so clients see `order.ship()`, a simple and clear representation of what is happening.

## Keep entities small

Try not to exceed 50 lines per class and 10 files per package.

Classes longer than 50 lines usually do more than one thing, making them harder to understand and reuse. 50 lines have the added benefit that you can see what they do at a glance without scrolling.

The challenge of creating such small classes is that behaviors often make sense only together. That is where packages come in. By also limiting the number of files in a package, you start to see them as small groups of related classes with a common purpose. Packages, like classes, should be cohesive in their purpose. Keeping packages small gives them their own identity.
