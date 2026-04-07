---
title: 4 Rules of Simple Design
date: 2022-04-30T00:00:00.000Z
summary: 4 simple design rules are a set of guidelines that help us write clean, well-designed code. These rules were proposed by Kent Beck, one of the pioneers of Extreme Programming, and are based on the idea that a design is simple when it follows these rules in order of importance.
image: /images/blog/simple-design.png
tags: [4rules, diseño, 4reglas, design, codescouts]
---

# 4 Rules of Simple Design

Kent Beck came up with [four rules of simple design](https://www.martinfowler.com/bliki/BeckDesignRules.html) while developing Extreme Programming in the late 1990s. To this day, many developers find these rules very helpful for creating software that is simple yet well-designed, and they also help keep code clean. According to Kent, a design is "simple" when it follows these rules, **_in order of importance_**:

![https://miro.medium.com/max/1400/0*mmKu9oV-Cca0Tuib.png](https://miro.medium.com/max/1400/0*mmKu9oV-Cca0Tuib.png)

- Passes the tests (Works) 🧪
- Reveals intent 🤌
- No duplication 👎
- Fewer elements 👍

The rules are ordered by priority, so "passes the tests" takes precedence over "reveals intent." 

Without further ado, let’s dive into each rule and talk about what it means in depth:

# **First Rule: Pass All the Tests (It Works!)**

![https://blogs.egu.eu/divisions/gd/files/2019/07/Untitled-4-e1560239780934-1400x800.png](https://blogs.egu.eu/divisions/gd/files/2019/07/Untitled-4-e1560239780934-1400x800.png)

First and foremost, we need to deliver a working application, which is why this is the number one priority. One of the many things that can ensure our application works well (and help us know exactly why it works) is having tests for the code we write. Writing tests (thorough tests) can actually push us toward better designs. The more tests we write, the more we keep moving toward things that are easier to test, which encourages us to make our classes small and single-purpose.

*Once the tests pass, we are empowered to keep our code clean. We do this by refactoring the code, and it is best to do this frequently and incrementally after every few lines of code we add. After making a feature work and passing all the tests, take time to review your code. Did others not understand what I really wrote here? Am I degrading it? If the answers are yes, we clean it and run tests again. **The fact that we have these tests removes the fear that cleaning the code will break it!***

_The next three rules can help you check the quality of your code._

# **Second Rule: Reveal Intent**

![https://miro.medium.com/max/1400/0*ojPe9FFyQfew1TuB.jpeg](https://miro.medium.com/max/1400/0*ojPe9FFyQfew1TuB.jpeg)

When we communicate with other people, we need to make sure others understand what we’re trying to convey. The same is true for code. As coders, we work as a team on a project, and many other developers will see, touch, or even need to modify the existing code, so it is very important that they understand what you wrote.

To make our code reveal our intent, we need to be expressive, and the most important way to be expressive is to try. Too often we make our code work and then move on to the next problem without thinking twice about whether the code is easy to read. Put yourself in the shoes of the next person who will read your code. Care is a valuable resource.

Some things we can do to make our code more expressive are:

- **Choose a good name that represents things.** Use predictable names so when others read class, function, or variable names, they don’t get the wrong idea or are surprised by the responsibilities.
- **Keep your functions and classes small.** It is easier to name, write, and understand them.
- **Challenge yourself to write code that reads like documentation.** Well-written unit tests are expressive and act as documentation by example. Someone reading the tests should quickly understand the purpose of a class.

# **Rule 3: No Duplication**

![https://miro.medium.com/max/700/0*vqPi_IxbpwnqNV4S.jpg](https://miro.medium.com/max/700/0*vqPi_IxbpwnqNV4S.jpg)

If you can reuse code that already exists, why bother writing the same thing again? Lines of code that look exactly alike are duplication. This rule is related to [DRY]({{< ref "principios-de-la-buena-programacion.md#dry-dont-repeat-yourself" >}}), where we should ensure that a method has a single responsibility and does not repeat itself. But this rule is more about duplication of knowledge than duplication of code. Kent’s way of putting it is: everything should be said **_once and only once_**.

Many developers have observed that the act of removing duplication is a powerful way to create good designs.

The order of the second and third rules may vary in some places. In Robert C. Martin’s book [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), *No Duplication* comes first and *Reveal Intent* comes later, while in [Martin Fowler’s article](https://www.martinfowler.com/bliki/BeckDesignRules.html), *Reveal Intent* comes first and *No Duplication* comes later.

From my personal experience, I keep *Reveal Intent* first and then consider *No Duplication*, because it is crucial that others can understand what I code first, and often this is related to duplication as well. But some people also say the order of these two rules does not matter. When you reveal intent, duplication in your code becomes clearer, and when you reduce duplication, it reveals your intent better.

Among these two rules, one thing must remain: **consistency.** It should be understandable for another person reading it, and they should be able to predict that similar rules will be applied when adding code.

# **Rule 4: Fewer Elements**

![https://miro.medium.com/max/1360/0*sd4aiV6y-sMV1Gz7.jpg](https://miro.medium.com/max/1360/0*sd4aiV6y-sMV1Gz7.jpg)

After applying the previous rules—code expressiveness and eliminating duplication—we can sometimes go too far. This rule helps us verify and stay aware of keeping our code with the fewest possible elements.

These questions can be asked when you step back after writing some code:

- **Do I have dead code?** Sometimes while building a system, we create things that aren’t definitive, and sometimes we simply don’t need them in the final product. If that happens, remove it.
- **Have I extracted too much?** Sometimes we over-extract in an attempt to make intent clearer, for example by extracting methods to improve readability, but we do it so much that each method gets its own class.

# **Conclusions**

These 4 rules are ordered by priority and complement each other. When you get confused because they seem to conflict, go back to the order of the rules.

Studying, understanding, and applying these rules can help you become a better programmer who writes higher-quality code. After all, you need experience and practice to fully understand and implement all these rules in your code. With experience, you will better appreciate the benefits of applying these 4 rules.

Finally, you can read Robert C. Martin’s book [Clean Code](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) as the original source, and another book, [Understanding the Four Rules of Simple Design](https://www.goodreads.com/book/show/21841698-understanding-the-four-rules-of-simple-design), which provides real examples of applying the rules in Game of Life.
