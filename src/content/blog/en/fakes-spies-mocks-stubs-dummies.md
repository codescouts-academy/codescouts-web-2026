---
title: Fakes Spies Mocks Stubs Dummies
date: 2022-11-19T00:00:00.000Z
summary: Whenever I ask the difference between these test doubles, no one can answer clearly. This time I'll make sure you understand them once and for all.
image: /images/blog/dummy-stub-spy-mock-fake.png
tags: [testdoubles, tdd, dobles-de-test, codescouts]
---

# Test Doubles 🧪

Test doubles are named after Hollywood doubles: when an actor must perform a risky scene, they hire a double to do it. In testing, we have the same idea.
These test doubles allow us to change their implementation depending on the scenario we need to test, and each one has a different shape and purpose.
Every time we ask in our sessions if people know the difference, they always confuse these concepts, so in this post I’ll try to make it clear once and for all. Let’s go! 🚀

## Dummy 🦆

### What is a dummy?

A dummy is an **implementation that does nothing**. Each method of an **interface** is implemented to do nothing. If a method returns a value, it returns something closest to null or zero.

Suppose we have this **interface**:

```typescript
export interface Authenticator {
  authenticate(userName: string, password: string): boolean;
}
```

Our dummy implementation would be 👇

```typescript
class AuthenticatorDummy implements Authenticator {
  public authenticate(userName: string, password: string): boolean {
    throw new Error("Not implemented");
  }
}
```

And we use it like this 👇

```typescript
test("get exception if username is empty", () => {
  const authenticatorDummy = new AuthenticatorDummy();
  const login = new Login(authenticatorDummy);

  const authorize = () => login.authorize("", "Some password");

  expect(authorize).toThrow("Username can not be empty");
});
```

### When do we use a dummy?

A **dummy** is a test double that implements an **interface** but does nothing, and it is used when the function we are testing takes an object as an argument, but the logic we are testing does not use or require that object.
In other words, we implement the abstraction only so we can instantiate the class under test, but we don’t use that dependency in the test.

Personally, I do not use dummies too much for two reasons:

1. I don’t like functions where parts of the code don’t use their arguments.
2. I don’t like objects with chains of dependencies.

But sometimes I prefer to use dummies rather than fight with complicated application objects when working with legacy code.

## Stub 🪑

### What is a stub?

A **stub is also a dummy object** implemented to do nothing, but unlike dummies, stub functions return values that can change depending on the test scenario.

Suppose we have this test:

```typescript
test("authentication is rejected when username or password are incorrect", () => {
  const rejectAuthorizer = new RejectAuthorizer();
  const login = new Login(rejectAuthorizer);

  const success = login.authorize("Wrong username", "Wrong password");

  expect(success).toBeFalsy();
});
```

Then our stub would look like this 🤔

```typescript
class RejectAuthorizer implements Authenticator {
  public authenticate(userName: string, password: string): boolean {
    return false;
  }
}
```

But if we want a test where login is successful, we can create a stub that allows that:

```typescript
class SuccessAuthorizer implements Authenticator {
  public authenticate(userName: string, password: string): boolean {
    return true;
  }
}
```

And now in our test:

```typescript
test("authentication is success when user name and password are correct", () => {
  const successAuthorizer = new SuccessAuthorizer();
  const login = new Login(successAuthorizer);

  const success = login.authorize("Wrong username", "Wrong password");

  expect(success).toBeTruthy();
});
```

### When do we use a stub?

We use stubs when we want different implementations of our dummy so we can control the returned value for each case we test.

## Spy 🕵️

### What is a spy?

A **spy is a stub** that can **change its return value whenever we want** depending on the path we are testing. Additionally, spies can **remember how many times a method was called** or even the values with which it was used.

For example, let’s implement a spy for the scenario we have been looking at:

```typescript
export class AuthenticationSpy implements Authenticator {
  private count: number = 0;
  private result: boolean = false;

  private lastUserName: string = "";
  private lastPassword: string = "";

  public authenticate(userName: string, password: string): boolean {
    this.count++;
    this.lastUserName = userName;
    this.lastPassword = password;

    return this.result;
  }

  public get times(): number {
    return this.count;
  }

  public changeResult(newResult: boolean) {
    this.result = newResult;
  }

  public get lastUserNameUsed() {
    return this.lastUserName;
  }

  public get lastPasswordUsed() {
    return this.lastPassword;
  }
}
```

<br />

```typescript
test("the user try to authenticate the authorizer authentication call once time", () => {
  const authenticationSpy = new AuthenticationSpy();
  authenticationSpy.changeResult(true);

  const login = new Login(authenticationSpy);

  const success = login.authorize("Wrong username", "Wrong password");

  expect(success).toBeTruthy();
  expect(authenticationSpy.times).toBe(1);
});
```

Spies can be simple and return a single value, or complex, storing a full history of every input and output from each call.

### When do we use spies?

If we need to ensure that a particular function is called with certain arguments at a specific time, we use spies, because they can remember those values, how many times a function was called, and what it returned.

## Mocks 🔎

### What are mocks?

**Mocks are spies** that return specific values for each test and remember how many times and with what arguments a function was called. However, mocks **also know whether the test should fail or not depending on how they are configured**.
In other words, the test assertions are written inside the mock.

For example, let’s look at this mock implementation.

```typescript
class AuthenticatorMock extends AuthenticationSpy /* 👈 Extends previous Spy created */ {
  constructor(
    private readonly expectedUsername: string,
    private readonly expectedPassword: string,
    private readonly authenticateCalling: number,
  ) {
    super();
  }

  public validate(): boolean {
    return (
      this.authenticateCalling === this.times &&
      this.expectedUsername === this.lastUserNameUsed &&
      this.expectedPassword === this.lastPasswordUsed
    );
  }
}
```

Then in our test we can do something like this:

```typescript
test("the login is correct when user and password are correct", () => {
  const authenticationMock = new AuthenticatorMock("Code", "Scouts", 1);
  authenticationMock.changeResult(true);
  const login = new Login(authenticationMock);

  const success = login.authorize("Code", "Scouts");

  expect(success).toBeTruthy();
  expect(authenticationMock.validate()).toBeTruthy();
});
```

### When do we use mocks?

We can use mocks not just for the same reason as a spy, but also to concentrate acceptance criteria inside a specific object, especially when the acceptance criteria are a bit more complex or when we want to verify the internal state of a spy that carries some intelligence.

## Fake 🪞

### What is a fake?

Among test doubles, we still need to explain **fakes**. They are not dummies, not stubs, not spies, and not mocks. Fakes are simulators: **fakes define fake business rules to test more complex scenarios**.

Let’s look at an example that is easier to understand 👇

```typescript
class AuthorizationFake implements Authenticator {
  public authenticate(userName: string, password: string): boolean {
    return userName === "Code" && password === "Scouts";
  }
}
```

```typescript
test("authentication is rejected when username or password are incorrect", () => {
  const authorizationFake = new AuthorizationFake();
  const login = new Login(authorizationFake);

  const success = login.authorize("Wrong username", "Wrong password");

  expect(success).toBeFalsy();
});
```

```typescript
test("authentication is success when username and password correct", () => {
  const authorizationFake = new AuthorizationFake();
  const login = new Login(authorizationFake);

  const success = login.authorize("Code", "Scouts");

  expect(success).toBeTruthy();
});
```

### When do we use fakes?

Fakes are helpful when we have more complex scenarios or want to reduce test setup. We can create specific fakes for repetitive setups in our tests so the fake can condition the test behavior based on the values it receives.

I hope this makes each of these test doubles clear.
But before I go, here is a small summary:

- Dummy: an implementation that does nothing.
- Stub: a dummy that returns specific values for each scenario.
- Spy: a stub that can change its return value whenever we want.
- Mock: a spy with assertion logic inside.
- Fake: a simulator with a specific failure or state-dependent scenario.

I hope this theoretical and practical explanation helps. Here is the repository with the code so you can review it in detail.
👉 [Repo](https://github.com/codescouts-academy/fake-stub-mock-spy-dummy)

If you liked it, share it to help it reach everyone 👇

Best regards 👋
