---
title: Types of Tests
date: 2022-07-05T00:00:00.000Z
summary: There are many types of testing we can use to confirm that our software continues to work correctly after introducing new changes to the source code.
image: /images/blog/test-pyramid.png
tags: [test, unit test, integration test, e2e, ui, test pyramid]
---

## Types of Tests

In this article, we will look at the different types of testing in software development.

We will learn what they are and how they differ, such as **unit testing**, **integration testing**, **functional testing**, **acceptance testing**, and more.

There are many types of testing that we can use to confirm that our software continues to work correctly after introducing new changes to our source code.

Not all tests are the same. That is why this article explains how the main types of software tests differ.

Generally, the first thing to understand is that there are **manual** tests and **automated** tests.

Manual tests are performed by people 🧑 who navigate and interact with the software (using the appropriate tools for each case).

These tests are expensive because they require a professional to set up the environment and execute the tests.

As expected, these tests are subject to human error: for example, typos can happen, or steps may be skipped during the test.

Automated tests, on the other hand, are executed by machines 🖥️ that run a prewritten test script.

These tests can vary widely in complexity 👇:

from verifying that a specific class method works correctly,
to ensuring that a complex sequence of actions in the UI executes correctly and returns expected results.

Automated tests are faster and more reliable than manual tests—but their quality depends on how well the test scripts are written.

Automated testing is a key component of continuous integration and continuous delivery, and it is an excellent way to scale QA processes as you add new features to your application.

### Unit tests 🧪 --> 🟨

Unit tests are low-level tests (close to the source code of our application).

> This type of testing verifies individual functions and/or methods (of classes, components, or modules used by our software).

Because they are so specific, unit tests are generally the least expensive to run and can **execute quickly** on a continuous integration server.

##### More details about unit tests:

Ideally, when planning and writing unit tests, we should isolate functionality until it cannot be decomposed further, and then write tests based on that. The name of this testing type refers to a **"unit of code"** that is independent of the rest.

These tests verify that the function or method name is appropriate, that parameter names and types are correct, and also the type and value returned as a result.

Because **unit tests should not have dependencies**, calls to external APIs and services are usually replaced with functionality that imitates them (so there is no interaction beyond the unit under test).

### Integration tests 🧪 --> 🔩

> Integration tests verify that the different modules and/or services used by our application work together harmoniously.

For example, they can **test interaction with one or multiple databases** or ensure that microservices behave as expected.

Integration tests are typically the next step after unit tests.

They are generally more expensive to run because they require more parts of our application to be configured and functional.

### End-to-end tests 🧪 --> 🧑 --> 🧑‍💻

> End-to-end tests replicate user behavior with the software in a complete application environment.

These tests **verify that the user flows work as expected**, and can be as simple as:

- loading a web page,
- logging in,
- or much more complex scenarios such as email notifications or online payments.

End-to-end tests are very useful, but they are expensive to perform and can be difficult to maintain when automated.

Therefore, it is recommended to have a **small set of key end-to-end tests**, and rely more on lower-level tests (such as unit tests and integration tests) to catch changes that impact the app quickly.

### Functional tests 🧪 --> 💼

> Functional tests focus on the business requirements of an application.

These tests **verify the output of an action without focusing on the intermediate system states** during execution.

There is sometimes confusion between integration tests and functional tests because both require multiple components to interact.

The difference is that 👇

an integration test may simply verify that database queries execute correctly,
while a functional test expects a specific value to be presented to a user in accordance with the product requirements.

### Regression testing 🧪 --> ⬅️

> Regression tests verify a set of scenarios that worked correctly in the past to ensure they keep working.

You should not add new features to your regression test suite until the current regression tests pass.

**A regression test failure means a new feature has affected another feature that was working correctly in the past, causing a regression.**

A regression test failure can also indicate that a bug that was fixed before has reappeared.

### Smoke testing 🧪 --> 👌👌

> Smoke tests are quick checks that verify the basic functionality of an application.

They are intended to be fast to execute 👇 and aim to **ensure the most important features of the system work as expected**.

Smoke tests can be very useful:

- right after building a new version of the application, to decide whether you are ready to run more expensive tests
- or right after deployment, to ensure the application works correctly in the new environment.

##### More about smoke tests:

They are a selected set of high-level automated tests.
They sit between integration tests and regression tests. Their goal is to verify that the core application functionality works.

If a **smoke test fails, it means there is a serious problem with your software**. You should not deploy changes until the issues are addressed. If they fail in production, their fix has the highest priority.

### Acceptance testing 🧪 --> 🧑🧔🧑‍🦱🧑‍🦳 --> 👌👌

> Acceptance tests are formal tests executed to verify whether a system meets its business requirements.

These tests require the software to be running and focus on replicating user behavior to reject changes if goals are not met. The goals can go beyond a specific response and measure system performance.

Acceptance tests:

- are usually a set of manual tests performed after a development phase has finished (so you can iterate quickly if something is wrong)
- verify that software features align with all initial specifications and acceptance criteria
- are often performed after unit or integration tests to avoid progressing too far without proper testing

For acceptance testing to work well, project stakeholders should define acceptance criteria before development starts. Any new requirements that arise during the process should also be reflected in those criteria.

### Performance testing 🧪 --> 🕜

> Performance tests verify how the system responds under high load.

These tests are non-functional and can take many forms to understand:

- reliability,
- stability,
- and availability of the platform.

For example, they can measure response times under many requests or observe system behavior under a large amount of data.

Performance tests are usually expensive to implement and execute, but they help us understand whether new changes will degrade our system (such as making it slower or more resource intensive).

Performance tests do not fail like other tests. Instead, they collect metrics and define goals to achieve.

It is generally a good idea to run these tests before major releases or significant refactorings.

### Why and how to automate tests?

A person can run all the tests above, but doing so would be costly and counterproductive.

As humans, we have limited capacity to perform many repeatable and reliable actions. A machine can easily do that, and it can test that our login form works correctly even on the 1000th attempt without complaining.

To automate tests, we first need to write them in code using a testing framework appropriate for our application.

PHPUnit, Mocha, and RSpec are examples of testing frameworks we can use for PHP, JavaScript, and Ruby, respectively. There are many options for every language.

If our tests can be launched from the terminal, they can also be executed by a continuous integration server or cloud service. These tools can monitor our repositories and run our test suite every time new changes are pushed.
