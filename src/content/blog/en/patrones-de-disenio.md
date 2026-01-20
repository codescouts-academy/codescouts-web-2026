---
title: GOF Design patterns
date: 2025-10-29T00:00:00.000Z
summary: Complete guide about GOF design patterns, creational, behavioural and structural.
images: [images/blog/gof-feature.png]
image: images/blog/gof.png
feature_image: images/blog/gof-feature.png
with_reading_time: true
with_post_share: true
tags: [GOF, gang of four, design patterns, codescouts]
---

# Design Patterns in Software Development

## 📑 Table of Contents

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

Design patterns are proven and documented solutions to common problems in software development. They are like recipes that help us write more maintainable, scalable, and understandable code.

## 🎯 What are Design Patterns?

A design pattern is a general reusable solution to a commonly occurring problem in software design. It's not code that you can copy and paste directly, but rather a template for how to solve a problem that can be used in many different situations.

### Advantages of Using Design Patterns

- **✅ Reusability**: Proven solutions that work
- **✅ Communication**: Common vocabulary among developers
- **✅ Maintainability**: Code that's easier to understand and modify
- **✅ Scalability**: Facilitate project growth
- **✅ Best Practices**: Incorporate expert experience

## 📚 Pattern Classification

Design patterns are classified into three main categories:

### 1. Creational Patterns

Focus on how objects are created, providing flexibility in instance creation.

### 2. Structural Patterns

Deal with how classes and objects are composed to form larger structures.

### 3. Behavioral Patterns

Focus on communication between objects and how responsibilities are distributed.

---

## 🏗️ Creational Patterns

### Singleton

**Purpose**: Ensure a class has only one instance and provide a global point of access to it.

**When to use it**:

- You need exactly one instance of a class
- Database connections
- Configuration managers
- System logs

**JavaScript Example**:

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

// Usage
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true - same instance
```

**⚠️ Caution**: Singleton can make unit testing difficult and create hidden dependencies.

---

### Factory Method

**Purpose**: Defines an interface for creating objects, but lets subclasses decide which class to instantiate.

**When to use it**:

- You don't know in advance the exact type of objects you'll need
- You want to delegate creation logic
- You need to extend object creation easily

**TypeScript Example**:

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

// Factory
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

// Usage
const myDog = AnimalFactory.createAnimal("dog");
console.log(myDog.speak()); // Woof!
```

---

### Builder

**Purpose**: Separates the construction of a complex object from its representation, allowing different representations to be created with the same construction process.

**When to use it**:

- Objects with many optional parameters
- Step-by-step construction
- Immutability in construction

**JavaScript Example**:

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

// Usage
const myPizza = new PizzaBuilder("large")
  .addCheese()
  .addPepperoni()
  .addMushrooms()
  .build();
```

---

## 🏛️ Structural Patterns

### Adapter

**Purpose**: Allows incompatible interfaces to work together, acting as a bridge between two interfaces.

**When to use it**:

- Integrate third-party libraries
- Work with legacy APIs
- Compatibility between different systems

**TypeScript Example**:

```typescript
// Old interface
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

// Expected new interface
interface NewCalculator {
  add(num1: number, num2: number): number;
  subtract(num1: number, num2: number): number;
}

// Adapter
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

// Usage
const oldCalc = new OldCalculator();
const adaptedCalc = new CalculatorAdapter(oldCalc);
console.log(adaptedCalc.add(5, 3)); // 8
```

---

### Decorator

**Purpose**: Adds functionality to objects dynamically without modifying their structure.

**When to use it**:

- Add responsibilities to objects dynamically
- Avoid subclass explosion
- Composition over inheritance

**JavaScript Example**:

```javascript
class Coffee {
  cost() {
    return 5;
  }

  description() {
    return "Simple coffee";
  }
}

// Decorators
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

// Usage
let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);

console.log(myCoffee.description()); // Simple coffee, with milk, with sugar
console.log(`Price: $${myCoffee.cost()}`); // Price: $8
```

---

### Facade

**Purpose**: Provides a simplified interface to a complex subsystem.

**When to use it**:

- Simplify complex systems
- Reduce dependencies between clients and subsystems
- Create abstraction layers

**JavaScript Example**:

```javascript
// Complex subsystem
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
    console.log(`Disk: Reading sector ${sector}, size ${size}`);
    return "boot data";
  }
}

// Facade
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

// Usage - much simpler
const computer = new ComputerFacade();
computer.start();
```

---

## 🎭 Behavioral Patterns

### Observer

**Purpose**: Defines a one-to-many dependency between objects, so that when one object changes state, all its dependents are notified automatically.

**When to use it**:

- Event systems
- View updates (MVC, MVVM)
- Real-time notifications

**JavaScript Example**:

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

// Usage
const youtubeChannel = new Subject();

const subscriber1 = new Observer("John");
const subscriber2 = new Observer("Mary");

youtubeChannel.subscribe(subscriber1);
youtubeChannel.subscribe(subscriber2);

youtubeChannel.notify("New video available!");
// John received: New video available!
// Mary received: New video available!
```

---

### Strategy

**Purpose**: Defines a family of algorithms, encapsulates them, and makes them interchangeable.

**When to use it**:

- Multiple related algorithms
- Avoid complex conditionals
- Change behavior at runtime

**TypeScript Example**:

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
      `Paying $${amount} with card ending in ${this.cardNumber.slice(-4)}`
    );
  }
}

class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  pay(amount: number): void {
    console.log(`Paying $${amount} with PayPal (${this.email})`);
  }
}

class BitcoinPayment implements PaymentStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  pay(amount: number): void {
    console.log(`Paying $${amount} with Bitcoin (${this.walletAddress})`);
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

// Usage
const cart = new ShoppingCart();
cart.setAmount(100);

// Pay with card
cart.setPaymentStrategy(new CreditCardPayment("1234567890123456"));
cart.checkout();

// Pay with PayPal
cart.setPaymentStrategy(new PayPalPayment("user@email.com"));
cart.checkout();
```

---

### Command

**Purpose**: Encapsulates a request as an object, allowing you to parameterize clients with different requests, queue requests, and support undoable operations.

**When to use it**:

- Undo/redo system
- Task queues
- Transactions and logs

**JavaScript Example**:

```javascript
// Receiver
class Light {
  turnOn() {
    console.log("💡 Light on");
  }

  turnOff() {
    console.log("🌑 Light off");
  }
}

// Commands
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

// Invoker
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

// Usage
const light = new Light();
const remote = new RemoteControl();

remote.execute(new TurnOnCommand(light)); // 💡 Light on
remote.execute(new TurnOffCommand(light)); // 🌑 Light off
remote.undo(); // 💡 Light on
remote.undo(); // 🌑 Light off
```

---

## 🎨 Patterns in React

Design patterns also apply in modern frameworks like React:

### Container/Presentational Pattern

Separates business logic from presentation:

```jsx
// Presentational Component
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

// Container Component
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

// Usage
<MouseTracker
  render={({ x, y }) => (
    <h1>
      Mouse position: ({x}, {y})
    </h1>
  )}
/>;
```

### Custom Hooks Pattern

Logic reusability with hooks:

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

// Usage
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
- **Document why you used a specific pattern**
- **Refactor towards patterns gradually**

### ❌ Avoid

- **Don't use patterns just for the sake of using them**
- **Don't over-engineer simple solutions**
- **Don't apply all patterns in a single project**
- **Don't ignore your project's specific needs**
- **Don't sacrifice simplicity for complex patterns**

---

## 📖 Additional Resources

### Recommended Books

- **"Design Patterns: Elements of Reusable Object-Oriented Software"** - Gang of Four (GoF)
- **"Head First Design Patterns"** - Freeman & Robson
- **"Refactoring: Improving the Design of Existing Code"** - Martin Fowler
- **"Clean Code"** - Robert C. Martin

### Websites

- [Refactoring Guru](https://refactoring.guru/design-patterns) - Excellent visualizations and examples
- [Patterns.dev](https://www.patterns.dev/) - Patterns for JavaScript and React
- [Source Making](https://sourcemaking.com/design_patterns) - Complete pattern tutorial

---

## 🎯 Conclusion

Design patterns are powerful tools that, when used correctly, can significantly improve the quality of your code. However, remember:

> "There are no good or bad patterns, only well or poorly applied patterns."

The key is to:

- **Know** the available patterns
- **Understand** when to apply them
- **Know** when not to apply them
- **Adapt** patterns to your specific needs

The ultimate goal is to write code that is easy to maintain, understand, and extend. Design patterns are means to achieve that goal, not the goal itself.

---

_Do you have experience with any design pattern? Which is your favorite? Share your experience in the comments!_ 💬
