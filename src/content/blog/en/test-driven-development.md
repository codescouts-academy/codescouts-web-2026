---
title: Test-Driven Development
date: 2022-07-06T00:00:00.000Z
summary: Also known as TDD (test-driven development), it is a programming practice that consists of writing tests first (usually unit tests), then writing the source code that makes the test pass, and finally refactoring the implemented code.
image: /images/blog/tdd.png
tags: [diseño, design, tdd, test-driven-design, codescouts]
---

#### Test-Driven Development

Also known as TDD (test-driven development), this practice consists of writing tests first (usually unit tests), then writing the source code that makes the test pass, and finally refactoring the implemented code.

This practice achieves, among other things: more robust code, safer code, more maintainable code, and faster development.

#### The famous Red-Green-Refactor cycle of TDD 🟥 --> 🟩 --> 🟦

- **Red**: Write a **failing test** 🧪, meaning you must write the **test before implementing** the feature. Usually unit tests are used, although in some contexts it can make sense to do TDD with integration tests.
- **Green**: Once the failing test is created, implement the **minimum code required to make the test pass** 👌.
- **Refactor**: Finally, after getting the code to pass the test, review it to see if there is any **improvement** that can be made.

Once we close the cycle, we start again with the next requirement. ♾️

#### The three laws of TDD 📃

- You shall not write production code unless it is to make a failing unit test pass.
- You shall not write more than one unit test sufficient to fail.
- You shall not write more code than necessary to make the test pass.

#### TDD as a design tool 🔨

Repeat after me... TDD is not a testing technique...

When [Kent Beck](https://en.wikipedia.org/wiki/Kent_Beck) developed this methodology, he focused on the second benefit we described earlier: **TDD as a software design tool** that helps us get better code, not more tests.

So, once we have a list of the product’s initial requirements, we should follow these steps:

- Choose a requirement.
- Write a failing test.
- Create the minimal implementation to make the test pass.
- Run all tests.
- Refactor.
- Update the requirements list.

In summary... TDD gives us tests as a result of using the technique, but TDD **_IS NOT_** a testing technique.

In the final step, when we update the requirements list, besides marking the implemented requirement as complete, we should add any new requirements that may have surfaced.

#### Tips for doing TDD and not dying trying 💀

Once we have the failing test, the fastest way to obtain the first implementation is to create a fake that returns a constant.
This helps us progress step by step toward the solution, because once the test passes we are ready to tackle the next case.

It is very important, extremely important, to understand the **Red-Green-Refactor** flow of TDD.

- In the **Red** stage, we must be strategic with the failing test we write; we should think about the algorithm or logic we are working on.
- In the **Green** stage, we should focus only on making that test green, **only that**, and nothing else.
- In the **Refactor** stage, we should use the opportunity to design our software. This is the most important stage, where we gradually generalize our business logic.

#### Baby steps 🍼

It is very important that when working with TDD we use the **Baby Steps** technique (we will cover this technique in a future article), but in short... it means advancing little by little, making the test green with the simplest, most predictable code you can find.

As we progress with TDD tests, we use the Refactor stage to begin removing those fakes, constants, hardcodes, etc., and start generating code from the specific to the generic.

#### Practical TDD example 📚

Let’s implement the Fibonacci sequence with TDD:

> **0 1 1 2 3 5 8 13 21 ...**

```ts
// Fibonacci, first test.
describe("Fibonacci should", () => {
  it("return zero if receive zero", () => {
    expect(fibonacci(0)).toBe(0);
  });
});
```

The most obvious fake implementation that makes the test pass is to have the function return 0 as a constant:

```ts
function fibonacci(n) {
  return 0;
}
```

Once we have the first test passing, the idea is to gradually transform the constant into an expression.
Let’s continue with the example by first creating a test for the next obvious case, n = 1;

```ts
it("return one if receive one", () => {
  expect(fibonacci(1)).toBe(1);
});
```

Now we have the next failing test. The next obvious step is to write a small expression using a conditional so that input n = 0 returns 0 and n = 1 returns 1:

```ts
function fibonacci(n) {
  if (n == 0) return 0;
  return 1;
}
```

As you can see, the fake implementation technique helps us progress slowly. It gives us two inherent advantages: first, psychologically, because it is easier to have some tests green rather than all red, which lets us take small steps toward the solution. Second, it helps control scope, since the practice keeps us focused on the real problem and avoids premature optimization.

#### Triangular 📐

Triangular, or the **triangulation** technique, is the natural step after the fake implementation technique. In fact, in most contexts it is part of triangulation, based on the following:

- Choose the simplest case the algorithm must solve.
- Apply Red-Green-Refactor.
- Repeat the previous steps covering the different scenarios.

To understand how triangulation works, let’s continue developing the Fibonacci example, which we have already begun to triangulate. The next case to cover is n = 2.

```ts
it("return one if receive two", () => {
  expect(fibonacci(2)).toBe(1);
});
```

This test passes, so our algorithm also works for n = 2. The next step would be to check what happens for n = 3.

```ts
it("returns two if receive three", () => {
  expect(fibonacci(3)).toBe(2);
});
```

As expected, the test fails. This step helps us move toward a more generic solution. We could create a fake implementation for n = 3 and add another conditional that returns 1 for n = 1 and n = 2.

```ts
function fibonacci(n) {
  if (n == 0) return 0;

  if (n == 1 || n == 2) return 1;

  return 2;
}
```

Now that we have the tests passing, let’s see what happens for n = 4:

```ts
it("returns three if receive four", () => {
  expect(fibonacci(4)).toBe(3);
});
```

At this point, you may already realize that it would be easier to write the obvious implementation than to keep adding decision branches:

```ts
function fibonacci(n) {
  if (n == 0) return 0;

  if (n == 1 || n == 2) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

#### Obvious implementation 🥴

When the solution seems very simple, it is ideal to write the obvious implementation in the first iterations of the **Red-Green-Refactor** cycle.

The problem with this is when we jump too quickly, assuming the problem is simple when in fact it has a corner case we didn’t consider.

#### TDD limitations 🤕

No matter how many benefits it has (or are promised), TDD should not be understood as a religion or a magic formula that works for everything. Following TDD strictly in every context does not guarantee your code will be more change-tolerant, robust, or secure, nor does it ensure you will be more productive at designing software.

From my point of view, TDD does not fit well in all contexts. For example, if there is an obvious implementation for a use case, I write it directly and then test it. In the frontend, I do not usually consider doing TDD to design UI components. It is even debatable whether unit tests should be used to test UI elements, since the UI tends to change much more than backend logic, making TDD in the UI more exhausting.

My advice is to try it, apply it in your day-to-day work for a while, and then decide for yourself.

Best regards 👋
