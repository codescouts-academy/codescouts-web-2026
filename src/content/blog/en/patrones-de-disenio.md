---
title: GOF Design Patterns
date: 2025-10-29T00:00:00.000Z
summary: A complete guide to GOF design patterns, creational, structural, and behavioral.
image: /images/blog/gof.png
tags: [GOF, gang of four, design patterns, codescouts]
---

# Design Patterns in Software Development

## 📑 Table of contents

- [Creational Patterns](#creational-patterns)
  - [Singleton](#singleton)
  - [Factory Method](#factory-method)
  - [Builder](#builder)
- [Structural Patterns](#structural-patterns)
  - [Adapter](#adapter)
  - [Decorator](#decorator)
  - [Facade](#facade)
- [Behavioral Patterns](#behavioral-patterns)
  - [Observer](#observer)
  - [Strategy](#strategy)
  - [Command](#command)
- [Patterns in React](#patterns-in-react)
  - [Container/Presentational Pattern](#containerpresentational-pattern)
  - [Render Props Pattern](#render-props-pattern)
  - [Custom Hooks Pattern](#custom-hooks-pattern)
- [Best Practices](#best-practices)
- [Additional Resources](#additional-resources)
- [Conclusion](#conclusion)

---

Design patterns are proven, documented solutions to common problems in software development. They are like recipes that help us write code that is more maintainable, scalable, and understandable.

## 🎯 What are Design Patterns?

A design pattern is a reusable general solution to a problem that commonly occurs in software design. It is not code to copy and paste directly, but a template for solving a problem that can be applied in many different situations.

### Advantages of using Design Patterns

- **✅ Reuse**: Proven solutions that work
- **✅ Communication**: Shared vocabulary among developers
- **✅ Maintainability**: Easier to understand and modify code
- **✅ Scalability**: Makes project growth easier
- **✅ Best practices**: Incorporates expert experience

## 📚 Pattern classification

Design patterns are classified into three main categories:

### 1. Creational Patterns

They focus on how objects are created, providing flexibility in instance creation.

### 2. Structural Patterns

They deal with how classes and objects are composed to form larger structures.

### 3. Behavioral Patterns

They focus on communication between objects and how responsibilities are distributed.

---

## 🏗️ Creational Patterns

### Singleton

**Purpose**: Ensure a class has only one instance and provide a global access point to it.

**When to use it**:

- You need exactly one instance of a class
- Database connections
- Configuration managers
- System logging

**Example in JavaScript**:

```javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = null;
    Database.instance = this;
  }

  connect() {
    if (!this.connection) {
      this.connection = "Connection established";
      console.log("New connection created");
    }
    return this.connection;
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true - same instance
```

**⚠️ Warning**: Singleton can make unit testing harder and create hidden dependencies.

---

### Factory Method

**Purpose**: Define an interface for creating objects, but allow subclasses to decide which class to instantiate.

**When to use it**:

- You don’t know ahead of time the exact types of objects you will need
- You want to delegate creation logic
- You need to extend object creation easily

**Example in TypeScript**:

```typescript
interface Animal {
  speak(): string;
}

class Dog implements Animal {
  speak(): string {
    return "Woof!";
  }
}

class Cat implements Animal {
  speak(): string {
    return "Meow!";
  }
}

class AnimalFactory {
  static createAnimal(type: string): Animal {
    switch (type) {
      case "dog":
        return new Dog();
      case "cat":
        return new Cat();
      default:
        throw new Error("Unknown animal type");
    }
  }
}

const myDog = AnimalFactory.createAnimal("dog");
console.log(myDog.speak()); // Woof!
```

---

### Builder

**Purpose**: Separate the construction of a complex object from its representation, allowing different representations to be created with the same construction process.

**When to use it**:

- Objects with many optional parameters
- Step-by-step construction
- Immutable object building

**Example in JavaScript**:

```javascript
class Pizza {
  constructor(builder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.bacon = builder.bacon;
    this.mushrooms = builder.mushrooms;
  }
}

class PizzaBuilder {
  constructor(size) {
    this.size = size;
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addPepperoni() {
    this.pepperoni = true;
    return this;
  }

  addBacon() {
    this.bacon = true;
    return this;
  }

  addMushrooms() {
    this.mushrooms = true;
    return this;
  }

  build() {
    return new Pizza(this);
  }
}

const myPizza = new PizzaBuilder("large")
  .addCheese()
  .addPepperoni()
  .addMushrooms()
  .build();
```

---

## 🏛️ Structural Patterns

### Adapter

**Purpose**: Allow incompatible interfaces to work together by acting as a bridge between them.

**When to use it**:

- Integrating third-party libraries
- Working with legacy APIs
- Achieving compatibility between different systems

**Example in TypeScript**:

```typescript
class OldCalculator {
  operation(num1: number, num2: number, operation: string): number {
    switch (operation) {
      case "add":
        return num1 + num2;
      case "sub":
        return num1 - num2;
      default:
        return 0;
    }
  }
}

interface NewCalculator {
  add(num1: number, num2: number): number;
  subtract(num1: number, num2: number): number;
}

class CalculatorAdapter implements NewCalculator {
  private oldCalc: OldCalculator;

  constructor(oldCalc: OldCalculator) {
    this.oldCalc = oldCalc;
  }

  add(num1: number, num2: number): number {
    return this.oldCalc.operation(num1, num2, "add");
  }

  subtract(num1: number, num2: number): number {
    return this.oldCalc.operation(num1, num2, "sub");
  }
}

const oldCalc = new OldCalculator();
const adaptedCalc = new CalculatorAdapter(oldCalc);
console.log(adaptedCalc.add(5, 3)); // 8
```

---

### Decorator

**Purpose**: Add functionality to objects dynamically without modifying their structure.

**When to use it**:

- Add responsibilities to objects dynamically
- Avoid class explosion
- Prefer composition over inheritance

**Example in JavaScript**:

```javascript
class Coffee {
  cost() {
    return 5;
  }

  description() {
    return "Simple coffee";
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 2;
  }

  description() {
    return this.coffee.description() + ", with milk";
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }

  description() {
    return this.coffee.description() + ", with sugar";
  }
}

let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);

console.log(myCoffee.description()); // Simple coffee, with milk, with sugar
console.log(`Price: ${myCoffee.cost()}€`); // Price: 8€
```

---

### Facade

**Purpose**: Provide a simplified interface to a complex subsystem.

**When to use it**:

- Simplify complex systems
- Reduce dependencies between clients and subsystems
- Create abstraction layers

**Example in JavaScript**:

```javascript
class CPU {
  freeze() {
    console.log("CPU: Freezing...");
  }
  jump(position) {
    console.log(`CPU: Jumping to ${position}`);
  }
  execute() {
    console.log("CPU: Executing...");
  }
}

class Memory {
  load(position, data) {
    console.log(`Memory: Loading data at ${position}`);
  }
}

class HardDrive {
  read(sector, size) {
    console.log(`Hard drive: Reading sector ${sector}, size ${size}`);
    return "boot data";
  }
}

class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    console.log("=== Starting computer ===");
    this.cpu.freeze();
    const bootData = this.hardDrive.read(0, 1024);
    this.memory.load(0, bootData);
    this.cpu.jump(0);
    this.cpu.execute();
    console.log("=== Computer started ===");
  }
}

const computer = new ComputerFacade();
computer.start();
```

---

## 🎭 Behavioral Patterns

### Observer

**Purpose**: Define a one-to-many dependency so that when one object changes state, all its dependents are notified automatically.

**When to use it**:

- Event systems
- View updates (MVC, MVVM)
- Real-time notifications

**Example in JavaScript**:

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} received: ${data}`);
  }
}

const youtubeChannel = new Subject();
const subscriber1 = new Observer("Juan");
const subscriber2 = new Observer("María");

youtubeChannel.subscribe(subscriber1);
youtubeChannel.subscribe(subscriber2);

youtubeChannel.notify("New video available!");
// Juan received: New video available!
// María received: New video available!
```

---

### Strategy

**Purpose**: Define a family of algorithms, encapsulate them, and make them interchangeable.

**When to use it**:

- Multiple related algorithms
- Avoid complex conditionals
- Change behavior at runtime

**Example in TypeScript**:

```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  pay(amount: number): void {
    console.log(
      `Paying ${amount}€ with card ending in ${this.cardNumber.slice(-4)}`,
    );
  }
}

class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  pay(amount: number): void {
    console.log(`Paying ${amount}€ with PayPal (${this.email})`);
  }
}

class BitcoinPayment implements PaymentStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  pay(amount: number): void {
    console.log(`Paying ${amount}€ with Bitcoin (${this.walletAddress})`);
  }
}

class ShoppingCart {
  private amount: number = 0;
  private paymentStrategy: PaymentStrategy;

  setAmount(amount: number): void {
    this.amount = amount;
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  checkout(): void {
    this.paymentStrategy.pay(this.amount);
  }
}

const cart = new ShoppingCart();
cart.setAmount(100);

cart.setPaymentStrategy(new CreditCardPayment("1234567890123456"));
cart.checkout();

cart.setPaymentStrategy(new PayPalPayment("user@email.com"));
cart.checkout();
```

---

### Command

**Purpose**: Encapsulate a request as an object, allowing clients to be parameterized with different requests, enqueue requests, and support undoable operations.

**When to use it**:

- Undo/redo systems
- Task queues
- Transactions and logging

**Example in JavaScript**:

```javascript
class Light {
  turnOn() {
    console.log("💡 Light turned on");
  }

  turnOff() {
    console.log("🌑 Light turned off");
  }
}

class TurnOnCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}

class TurnOffCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }

  undo() {
    this.light.turnOn();
  }
}

class RemoteControl {
  constructor() {
    this.history = [];
  }

  execute(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

const light = new Light();
const remote = new RemoteControl();

remote.execute(new TurnOnCommand(light)); // 💡 Light turned on
remote.execute(new TurnOffCommand(light)); // 🌑 Light turned off
remote.undo(); // 💡 Light turned on
remote.undo(); // 🌑 Light turned off
```

---

## 🎨 Patterns in React

Design patterns also apply in modern frameworks like React:

### Container/Presentational Pattern

Separate business logic from presentation:

```jsx
function UserList({ users, onUserClick }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => onUserClick(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

function UserListContainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleUserClick = (user) => {
    console.log("Selected user:", user);
  };

  return <UserList users={users} onUserClick={handleUserClick} />;
}
```

### Render Props Pattern

Allows sharing logic between components:

```jsx
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

<MouseTracker
  render={({ x, y }) => (
    <h1>
      Mouse position: ({x}, {y})
    </h1>
  )}
/>
```

### Custom Hooks Pattern

Reuse logic with hooks:

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.name}</div>;
}
```

---

## 🚀 Best Practices

### ✅ Do

- **Understand the problem before applying a pattern**
- **Use patterns to improve readability**
- **Combine patterns when it makes sense**
- **Document why you chose a specific pattern**
- **Refactor toward patterns gradually**

### ❌ Avoid

- **Don’t use patterns just for the sake of using them**
- **Don’t overengineer simple solutions**
- **Don’t apply all patterns in a single project**
- **Don’t ignore the project’s specific needs**
- **Don’t sacrifice simplicity for complex patterns**

---

## 📖 Additional Resources

### Recommended books

- **"Design Patterns: Elements of Reusable Object-Oriented Software"** - Gang of Four (GoF)
- **"Head First Design Patterns"** - Freeman & Robson
- **"Refactoring: Improving the Design of Existing Code"** - Martin Fowler
- **"Clean Code"** - Robert C. Martin

### Websites

- [Refactoring Guru](https://refactoring.guru/es/design-patterns) - Great visualizations and examples
- [Patterns.dev](https://www.patterns.dev/) - Patterns for JavaScript and React
- [Source Making](https://sourcemaking.com/design_patterns) - Comprehensive design pattern tutorial

---

## 🎯 Conclusion

Design patterns are powerful tools that, when used correctly, can significantly improve code quality. However, remember:

> "There are no good or bad patterns, only patterns well or poorly applied."

The key is to:

- **Know** the available patterns
- **Understand** when to apply them
- **Know** when not to apply them
- **Adapt** patterns to your specific needs

The ultimate goal is to write code that is easy to maintain, understand, and extend. Design patterns are a means to that goal, not the goal itself.

---

_Do you have experience with a design pattern? Which is your favorite? Share your thoughts in the comments!_ 💬
