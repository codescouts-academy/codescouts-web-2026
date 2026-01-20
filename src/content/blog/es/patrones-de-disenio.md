---
title: GOF Design patterns
date: 2025-10-29T00:00:00.000Z
summary: Guia completa acerca de los patrones de diseño de GOF, creacionales, comportamiento y estructurales.
images: [images/blog/gof-feature.png]
image: images/blog/gof.png
feature_image: images/blog/gof-feature.png
with_reading_time: true
with_post_share: true
tags: [GOF, gang of four, design patterns, codescouts]
---

# Patrones de Diseño en el Desarrollo de Software

## 📑 Índice

- [Patrones Creacionales](#patrones-creacionales)
  - [Singleton](#singleton)
  - [Factory Method](#factory-method)
  - [Builder](#builder)
- [Patrones Estructurales](#patrones-estructurales)
  - [Adapter](#adapter)
  - [Decorator](#decorator)
  - [Facade](#facade)
- [Patrones de Comportamiento](#patrones-de-comportamiento)
  - [Observer](#observer)
  - [Strategy](#strategy)
  - [Command](#command)
- [Patrones en React](#patrones-en-react)
  - [Patrón Container/Presentational](#patrón-containerpresentational)
  - [Patrón Render Props](#patrón-render-props)
  - [Patrón Custom Hooks](#patrón-custom-hooks)
- [Mejores Prácticas](#mejores-prácticas)
- [Recursos Adicionales](#recursos-adicionales)
- [Conclusión](#conclusión)

---

Los patrones de diseño son soluciones probadas y documentadas a problemas comunes en el desarrollo de software. Son como recetas que nos ayudan a escribir código más mantenible, escalable y comprensible.

## 🎯 ¿Qué son los Patrones de Diseño?

Un patrón de diseño es una solución general reutilizable para un problema que ocurre comúnmente en el diseño de software. No es código que puedas copiar y pegar directamente, sino una plantilla sobre cómo resolver un problema que puede usarse en muchas situaciones diferentes.

### Ventajas de usar Patrones de Diseño

- **✅ Reutilización**: Soluciones probadas que funcionan
- **✅ Comunicación**: Vocabulario común entre desarrolladores
- **✅ Mantenibilidad**: Código más fácil de entender y modificar
- **✅ Escalabilidad**: Facilitan el crecimiento del proyecto
- **✅ Mejores prácticas**: Incorporan experiencia de expertos

## 📚 Clasificación de Patrones

Los patrones de diseño se clasifican en tres categorías principales:

### 1. Patrones Creacionales

Se centran en cómo se crean los objetos, proporcionando flexibilidad en la creación de instancias.

### 2. Patrones Estructurales

Se ocupan de cómo se componen las clases y objetos para formar estructuras más grandes.

### 3. Patrones de Comportamiento

Se centran en la comunicación entre objetos y cómo se distribuyen las responsabilidades.

---

## 🏗️ Patrones Creacionales

### Singleton

**Propósito**: Garantizar que una clase tenga una única instancia y proporcionar un punto de acceso global a ella.

**Cuándo usarlo**:

- Necesitas exactamente una instancia de una clase
- Conexiones a base de datos
- Gestores de configuración
- Logs del sistema

**Ejemplo en JavaScript**:

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
      this.connection = "Conexión establecida";
      console.log("Nueva conexión creada");
    }
    return this.connection;
  }
}

// Uso
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true - misma instancia
```

**⚠️ Precaución**: El Singleton puede dificultar las pruebas unitarias y crear dependencias ocultas.

---

### Factory Method

**Propósito**: Define una interfaz para crear objetos, pero permite que las subclases decidan qué clase instanciar.

**Cuándo usarlo**:

- No conoces de antemano el tipo exacto de objetos que necesitarás
- Quieres delegar la lógica de creación
- Necesitas extender la creación de objetos fácilmente

**Ejemplo en TypeScript**:

```typescript
interface Animal {
  speak(): string;
}

class Dog implements Animal {
  speak(): string {
    return "¡Guau!";
  }
}

class Cat implements Animal {
  speak(): string {
    return "¡Miau!";
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
        throw new Error("Tipo de animal desconocido");
    }
  }
}

// Uso
const myDog = AnimalFactory.createAnimal("dog");
console.log(myDog.speak()); // ¡Guau!
```

---

### Builder

**Propósito**: Separa la construcción de un objeto complejo de su representación, permitiendo crear diferentes representaciones con el mismo proceso de construcción.

**Cuándo usarlo**:

- Objetos con muchos parámetros opcionales
- Construcción paso a paso
- Inmutabilidad en la construcción

**Ejemplo en JavaScript**:

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

// Uso
const myPizza = new PizzaBuilder("grande")
  .addCheese()
  .addPepperoni()
  .addMushrooms()
  .build();
```

---

## 🏛️ Patrones Estructurales

### Adapter

**Propósito**: Permite que interfaces incompatibles trabajen juntas, actuando como un puente entre dos interfaces.

**Cuándo usarlo**:

- Integrar bibliotecas de terceros
- Trabajar con APIs legacy
- Compatibilidad entre sistemas diferentes

**Ejemplo en TypeScript**:

```typescript
// Interfaz antigua
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

// Nueva interfaz esperada
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

// Uso
const oldCalc = new OldCalculator();
const adaptedCalc = new CalculatorAdapter(oldCalc);
console.log(adaptedCalc.add(5, 3)); // 8
```

---

### Decorator

**Propósito**: Añade funcionalidad a objetos de forma dinámica sin modificar su estructura.

**Cuándo usarlo**:

- Añadir responsabilidades a objetos dinámicamente
- Evitar la explosión de subclases
- Composición sobre herencia

**Ejemplo en JavaScript**:

```javascript
class Coffee {
  cost() {
    return 5;
  }

  description() {
    return "Café simple";
  }
}

// Decoradores
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 2;
  }

  description() {
    return this.coffee.description() + ", con leche";
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
    return this.coffee.description() + ", con azúcar";
  }
}

// Uso
let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);

console.log(myCoffee.description()); // Café simple, con leche, con azúcar
console.log(`Precio: ${myCoffee.cost()}€`); // Precio: 8€
```

---

### Facade

**Propósito**: Proporciona una interfaz simplificada para un subsistema complejo.

**Cuándo usarlo**:

- Simplificar sistemas complejos
- Reducir dependencias entre clientes y subsistemas
- Crear capas de abstracción

**Ejemplo en JavaScript**:

```javascript
// Subsistema complejo
class CPU {
  freeze() {
    console.log("CPU: Congelando...");
  }
  jump(position) {
    console.log(`CPU: Saltando a ${position}`);
  }
  execute() {
    console.log("CPU: Ejecutando...");
  }
}

class Memory {
  load(position, data) {
    console.log(`Memoria: Cargando datos en ${position}`);
  }
}

class HardDrive {
  read(sector, size) {
    console.log(`Disco: Leyendo sector ${sector}, tamaño ${size}`);
    return "datos del arranque";
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
    console.log("=== Iniciando computadora ===");
    this.cpu.freeze();
    const bootData = this.hardDrive.read(0, 1024);
    this.memory.load(0, bootData);
    this.cpu.jump(0);
    this.cpu.execute();
    console.log("=== Computadora iniciada ===");
  }
}

// Uso - mucho más simple
const computer = new ComputerFacade();
computer.start();
```

---

## 🎭 Patrones de Comportamiento

### Observer

**Propósito**: Define una dependencia uno-a-muchos entre objetos, de modo que cuando un objeto cambia de estado, todos sus dependientes son notificados automáticamente.

**Cuándo usarlo**:

- Sistemas de eventos
- Actualización de vistas (MVC, MVVM)
- Notificaciones en tiempo real

**Ejemplo en JavaScript**:

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
    console.log(`${this.name} recibió: ${data}`);
  }
}

// Uso
const youtubeChannel = new Subject();

const subscriber1 = new Observer("Juan");
const subscriber2 = new Observer("María");

youtubeChannel.subscribe(subscriber1);
youtubeChannel.subscribe(subscriber2);

youtubeChannel.notify("¡Nuevo video disponible!");
// Juan recibió: ¡Nuevo video disponible!
// María recibió: ¡Nuevo video disponible!
```

---

### Strategy

**Propósito**: Define una familia de algoritmos, los encapsula y los hace intercambiables.

**Cuándo usarlo**:

- Múltiples algoritmos relacionados
- Evitar condicionales complejos
- Cambiar comportamiento en tiempo de ejecución

**Ejemplo en TypeScript**:

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
      `Pagando ${amount}€ con tarjeta terminada en ${this.cardNumber.slice(-4)}`
    );
  }
}

class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  pay(amount: number): void {
    console.log(`Pagando ${amount}€ con PayPal (${this.email})`);
  }
}

class BitcoinPayment implements PaymentStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  pay(amount: number): void {
    console.log(`Pagando ${amount}€ con Bitcoin (${this.walletAddress})`);
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

// Uso
const cart = new ShoppingCart();
cart.setAmount(100);

// Pagar con tarjeta
cart.setPaymentStrategy(new CreditCardPayment("1234567890123456"));
cart.checkout();

// Pagar con PayPal
cart.setPaymentStrategy(new PayPalPayment("usuario@email.com"));
cart.checkout();
```

---

### Command

**Propósito**: Encapsula una petición como un objeto, permitiendo parametrizar clientes con diferentes peticiones, encolar peticiones y soportar operaciones que se pueden deshacer.

**Cuándo usarlo**:

- Sistema de deshacer/rehacer
- Colas de tareas
- Transacciones y logs

**Ejemplo en JavaScript**:

```javascript
// Receptor
class Light {
  turnOn() {
    console.log("💡 Luz encendida");
  }

  turnOff() {
    console.log("🌑 Luz apagada");
  }
}

// Comandos
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

// Invocador
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

// Uso
const light = new Light();
const remote = new RemoteControl();

remote.execute(new TurnOnCommand(light)); // 💡 Luz encendida
remote.execute(new TurnOffCommand(light)); // 🌑 Luz apagada
remote.undo(); // 💡 Luz encendida
remote.undo(); // 🌑 Luz apagada
```

---

## 🎨 Patrones en React

Los patrones de diseño también se aplican en frameworks modernos como React:

### Patrón Container/Presentational

Separa la lógica de negocio de la presentación:

```jsx
// Componente Presentacional
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

// Componente Contenedor
function UserListContainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleUserClick = (user) => {
    console.log("Usuario seleccionado:", user);
  };

  return <UserList users={users} onUserClick={handleUserClick} />;
}
```

### Patrón Render Props

Permite compartir lógica entre componentes:

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

// Uso
<MouseTracker
  render={({ x, y }) => (
    <h1>
      Posición del mouse: ({x}, {y})
    </h1>
  )}
/>;
```

### Patrón Custom Hooks

Reutilización de lógica con hooks:

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

// Uso
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.name}</div>;
}
```

---

## 🚀 Mejores Prácticas

### ✅ Hacer

- **Entender el problema antes de aplicar un patrón**
- **Usar patrones para mejorar la legibilidad**
- **Combinar patrones cuando tenga sentido**
- **Documentar por qué usaste un patrón específico**
- **Refactorizar hacia patrones gradualmente**

### ❌ Evitar

- **No uses patrones por el simple hecho de usarlos**
- **No sobreingenieres soluciones simples**
- **No apliques todos los patrones en un solo proyecto**
- **No ignores las necesidades específicas de tu proyecto**
- **No sacrifiques simplicidad por patrones complejos**

---

## 📖 Recursos Adicionales

### Libros recomendados

- **"Design Patterns: Elements of Reusable Object-Oriented Software"** - Gang of Four (GoF)
- **"Head First Design Patterns"** - Freeman & Robson
- **"Refactoring: Improving the Design of Existing Code"** - Martin Fowler
- **"Clean Code"** - Robert C. Martin

### Sitios web

- [Refactoring Guru](https://refactoring.guru/es/design-patterns) - Excelentes visualizaciones y ejemplos
- [Patterns.dev](https://www.patterns.dev/) - Patrones para JavaScript y React
- [Source Making](https://sourcemaking.com/design_patterns) - Tutorial completo de patrones

---

## 🎯 Conclusión

Los patrones de diseño son herramientas poderosas que, cuando se usan correctamente, pueden mejorar significativamente la calidad de tu código. Sin embargo, recuerda:

> "No hay patrones buenos o malos, solo patrones bien o mal aplicados."

La clave está en:

- **Conocer** los patrones disponibles
- **Entender** cuándo aplicarlos
- **Saber** cuándo no aplicarlos
- **Adaptar** los patrones a tus necesidades específicas

El objetivo final es escribir código que sea fácil de mantener, entender y extender. Los patrones de diseño son medios para lograr ese objetivo, no el objetivo en sí mismo.

---

_¿Tienes experiencia con algún patrón de diseño? ¿Cuál es tu favorito? ¡Comparte tu experiencia en los comentarios!_ 💬
