---
title: Clean Code
date: 2023-10-30T00:00:00.000Z
summary: Clean Code principles to help you write code that is readable, understandable, and maintainable. Essential guidelines for software craftsmanship and professional development teams.
image: /images/blog/clean-code.png
tags: [tcr, tdd, tests, commit]
---

## What is Clean Code? 🧹

Clean code is not a strict set of rules, but a series of principles that help produce intuitive, easy-to-change code. In this context, intuitive means any professional developer can understand it immediately. Easily adaptable code has the following characteristics:

1. It is readable
2. It is easy to modify
3. It is easy to maintain
4. It is easy to share

## General Rules ⚖️

1. Follow the standard conventions of each language and the team.
2. Keep it simple, stupid. Simpler is always better. Reduce complexity as much as possible [KISS](/en/blog/principios-de-la-buena-programacion/#kiss-keep-it-simple-stupid-but-i-prefer-use-keep-it-stupidly-simple).
3. Boy scout rule. Leave the camp cleaner than you found it. [Boy scouts rule](/en/blog/principios-de-la-buena-programacion/#boy-scout-rule)
4. Always look for the root problem.

## Design Rules 🏗️

1. Keep configuration data at high levels.
2. Use polymorphism instead of if/else or switch/case.
3. Avoid over-configuration.
4. Use dependency injection.
5. Follow the Law of Demeter. A class should know only its direct dependencies [Law of Demeter](/en/blog/object-calisthenics/#un-punto-por-línea-o-_utilizar-la-ley-de-demeter_).

## Clean Code Tips 🧽

1. Be consistent. If you do something one way, do all similar things the same way.
2. Use explanatory variables.
3. Encapsulate corner-case conditions. Corner-case conditions are hard to follow. Put their processing in one place.
4. Use value objects instead of primitive types [Wrap primitives](/en/blog/object-calisthenics/#envuelve-primitivos).
5. Avoid logical dependency. Don’t write methods that only work correctly depending on something else in the same class.
6. Avoid negative conditionals.

## Naming Rules 🤢

1. Choose descriptive, unambiguous names.
2. Make a meaningful distinction.
3. Use pronounceable names.
4. Use searchable names.
5. Replace magic numbers with named constants.

## Function Rules 😡

1. Small.
2. Do one thing.
3. Use descriptive names.
4. Use as few arguments as possible.
5. Have no side effects.
6. Don’t use flag arguments. Split the method into several independent methods that can be called by the client without flags.

## Comment Rules 🤬

1. Try to explain yourself in code whenever possible.
2. Don’t be redundant.
3. Don’t add obvious noise.
4. Don’t comment code. If it isn’t used, remove it.
5. Use comments to explain intent.
6. Use comments to clarify code.
7. Use comments to warn about consequences.

## Source Code Structure 📁

1. Separate concepts vertically.
2. Related code should appear densely in the same vertical area.
3. Declare variables close to where they are used.
4. Dependent functions should be near each other.
5. Similar functions should be near each other.
6. Place functions downward.
7. Keep lines short.
8. Use whitespace to associate related things and separate loosely related things.
9. Don’t break indentation.

## Objects and Data Structures 🧼

1. Hide internal structure.
2. Use data structures.
3. Avoid hybrid structures (half object, half data).
4. Keep them small.
5. Do one thing [Single responsibility](/en/blog/solid/#s-----single-responsibility).
6. Small number of instance variables [Avoid more than 2 instance attributes](/en/blog/object-calisthenics/#evita-más-de-dos-atributos-de-instancia).
7. The base class should know nothing about its derivatives.
8. Prefer instance methods over static methods [Avoid static methods](/en/blog/object-calisthenics/#clases-con-estado-evita-métodos-estáticos).

## Testing 🧪

1. One assertion per test.
2. Readable.
3. Fast.
4. Independent.
5. Repeatable.

## Code Smells 💩

1. Rigidity. Software is hard to change. A small change causes a cascade of further changes.
2. Fragility. Software breaks in many places because of a single change.
3. Immobility. You cannot reuse parts in other projects because of the effort and risk involved.
4. Unnecessary complexity.
5. Unnecessary repetition.
6. Opacity. Code is hard to understand.
