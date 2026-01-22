---
title: Object Calisthenics
date: 2022-05-02T00:00:00.000Z
summary: Si quieres tener un buen diseño de software, seguramente tienes que seguir estas 10 reglas para garantizarlo.
image: /images/blog/objects-calisthenics.png
tags: [diseño, design, objectcalisthenics, codescouts]
---

# Objects calisthenics 🤸‍♂️

Los Objects calisthenics no son más que un conjunto de reglas para tener presentes a la hora de diseñar correctamente nuestro software

1.  **[Un nivel de indentación por método](#un-nivel-de-identación-por-método)**
2.  **[No uses la palabra clave ELSE](#no-uses-la-palabra-clave-else)**
3.  **[Envuelve primitivos](#envuelve-primitivos)**
4.  **[Colecciones como clases de primer orden](#colecciones-como-clases-de-primer-orden)**
5.  **[Un punto por línea](#un-punto-por-línea)**
6.  **[No abrevies](#no-abrevies)**
7.  **[Mantén las entidades pequeñas](#manten-las-entidades-pequeñas)**
8.  **[Evita más de dos atributos de instancia](#evita-más-de-dos-atributos-de-instancia)**
9.  **[Evita getters/setters o atributos públicos](#evita-getterssetters-o-atributos-públicos)**
10. **[Clases con estado, evita métodos estáticos](#clases-con-estado-evita-métodos-estáticos)**

## Un nivel de identación por método

Cuantas veces leiste un código que es algo así

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

La mejor solución es extraer en métodos con tu IDE preferido para lograr un solo nivel de identación en los métodos, de esa manera va a ser más facil poder leer y mantener este código en el futuro; sin contar la gran ventaja que es mantener una [única responsabilidad en cada método]({{< ref "solid.md#s-----single-responsibility" >}})

```tsx
class Board {
  public doSomething() {
    return this.collectRows();
  }

  private collectRows() {
    const rows = "";

    for (let rowNum = 0; rowNum < 10; rowNum++)
      result += this.collectRow(rowNum);

    return rows;
  }

  private collectRow(rowNum: number) {
    const row = "";

    for (let j = 0; j < 10; i++) row += data[rowNum][j];

    return row + "\n";
  }
}
```

Tal vez de esta manera parezca que tenemos más código, y probablemente si, pero el principal beneficio es que mejoramos radicalmente la legibilidad del código y la mantenibilidad

## No uses la palabra clave ELSE

Todo programador conoce de sobra la construcción if/else. Viene definido en casi cualquier lenguaje de programación, es lo suficientemente simple como para que todo el mundo lo entienda. Todos nos hemos perdido alguna vez en alguno imposible de seguir o donde cada caso se extiende hasta el infinito.
Es tan sencillo añadir un caso más en vez de mejorar el diseño... Los condicionales son una fuente frecuente de duplicidad. Los flags y el estado son dos ejemplos que llevan a este tipo de problemas

```tsx
if (type === "engineer") {
  return 300;
} else {
  return 200;
}
```

Los lenguajes Orientado a Objetos ofrecen una poderosa herramienta para manejar casos complejos, el polimorfismo. Los diseños que hacen uso del polimorfismo son más fáciles de leer y mantener, expresan su intención de una manera más clara.

```tsx
class Employee {
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

Aunque también podemos aplicar una solución mucho más sencilla en caso que no necesitemos manejar muchos casos, algo tan sencillo como esto

```tsx
if (!someCondition) {
  return;
}

doSomething();
```

Esto que vemos en el if, es la típica clausulas de guarda [_Guard clauses_](https://learningactors.com/javascript-guard-clauses-how-you-can-refactor-conditional-logic/) pero para este caso, aplica perfectamente, siempre que nos encontremos con una condición que no se puede evaluar, podemos simplemente omitir el bloque de código que no se va a ejecutar.
Y al mismo tiempo evitamos tener el típico IF-ELSE, de esta manera podemos continuar con seguridad sabiendo que ya se comprobo la condición.

## Envuelve primitivos

Esta regla es muy sencilla, lo que plantea es que siempre que puedas y tenga sentido, intentes envolver los tipos primitivos en objetos complejos, de esta manera podrás tener un objeto que tenga la responsabilidad relacionada con ese tipo primitivo, donde podrás realizar la lógica de negocio que aplique a este objeto y evitaras caer en la típica solución de generar _utils_ o _helpers_ class para tener que manipularlos en un futuro.

```tsx
class Person {
  private zipCode: string;
}
```

En este caso vemos que una persona tiene un _ZipCode_ en lugar de modelarlo como un string, podemos envolverlo en un tipo complejo.

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

        private validate {
            // ...
        }
    }
```

Donde podremos realizar la lógica de negocio relacionada con este objeto y mucho más, aunque también es super elegante el diseño que obtenemos y la mantenibilidad del mismo es muy alta.

## Colecciones como clases de primer orden

La regla es sencilla, cualquier clase que contenga una colección no debería contener más atributos. Cada colección se envuelve en su propia clase, de esta forma los comportamientos relacionados con la colección tienen un lugar. Probablemente los filtros formen parte de esta nueva clase. También, tu nueva clase puede manejar peticiones como juntar dos grupos o aplicar una regla para cada elemento del grupo.

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

## Un punto por línea

A veces es difícil saber que objeto debe tener la responsabilidad para una determinada acción. Si empiezas a buscar por las líneas con múltiples _._ _(puntos)_, empezarás a encontrar responsabilidades fuera de lugar. Si tienes más de un _._ _(punto)_ en una línea de código significa que la acción está ocurriendo en el lugar equivocado. Puede que tu objeto esté lidiando con dos objetos a la vez. Si es este el caso, tu objeto es un intermediario, sabe demasiado sobre demasiada gente. Considera el mover esa acción a alguno de los otros objetos.

Si todos esos _._ _(puntos)_ están conectados es probable que tu objeto esta profundizando demasiado en otro. Todos ellos indican que estás violando la encapsulación. Prueba a preguntar que haga algo por ti en vez de investigar dentro de él. Una gran parte de la encapsulación trata de no cruzar el límite de una clase como para saber sobre sus tipos internos.

**_La Ley de Demeter_** ("Habla solo con tus amigos") es un buen comienzo. Piensa en ello de la siguiente forma: Puedes jugar con tus juguetes, juguetes que tú haces o juguetes que alguien te dá. Nunca jamás juegues con los juguetes de tus juguetes.

```tsx
    class Piece {
        public representation: string[];
    }

    class Location {
        public currentPiece: Piece;
    }

    class Board {
        public locations: Location[];

        public  boardRepresentation() {
            const representation = '';

            foreach (const location of this.locations) {
                representation += location.currentPiece.representation[0];
            }

            return representation;
        }
    }
```

Podemos mejorarlo refactorizandolo así

```tsx
    class Piece {
        private representation : stirng[];

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
            const representation = '';

            foreach (locations of this.locations) {
                representation = location.addTo(representation);
            }

            return representation;
        }
    }
```

Tal vez entender este refactor al principio sea más complejo, pero si lo miramos de manera individual a cada método y navegamos a la responsabilidad de cada objeto, entenderemos rápidamente qué está haciendo cada una de esas clases y podremos tener un control más eficiente de cada responsabilidad.

## No abrevies

Es una tentación abreviar nombres de clases, métodos o variables. Resiste!, las abreviaciones confunden y tienden a ocultar problemas más serios.

Piensa en el porqué abrevias. ¿Es porque repites la misma palabra una y otra vez? Si es ese caso quizás tu constructor se usa demasiadas veces y estas perdiendo oportunidades de reutilizar el código. ¿Es porque tus nombres cada vez son más largos? Esto puede ser un signo de responsabilidad mal ubicada o una clase ausente.

Intenta hacer que tus métodos sean de 1 o 2 palabras. Evita los nombres que dupliquen el contexto. Si la clase es Order, el método no necesita llamarse shipOrder(). Simplemente llama al método ship() de forma que los clientes vean order.ship() una representación simple y clara de lo que está pasando.

## Mantén las entidades pequeñas

Trata de no superar las 50 líneas por clase y los 10 ficheros por paquete.

Las clases con más de 50 líneas por lo general hacen más de una cosa, lo que las convierte en algo más difícil de comprender y reutilizar. 50 líneas tienen un beneficio añadido, puedes determinar que hacen de un solo vistazo sin tener que hacer scroll.

La dificultad en crear clases tan pequeñas es que a menudo los comportamientos solo tienen sentido juntos. Es aquí donde entran en juego los paquetes. Como hemos limitado también el número de ficheros en un paquete comenzarás a verlos como pequeños grupos de clases relacionadas con un objetivo común. Los paquetes, como las clases, deberían ser cohesivos en su propósito. Hacer los paquetes pequeños les hace tener identidad propia.

## Evita más de dos atributos de instancia

La mayoría de las clases deberían ser responsables únicamente del manejo de una única variable de instancia, algunas requerirán de dos. Añadir una nueva variable de instancia a una clase, reduce de forma inmediata la cohesión de la clase. Programando de esta forma encontrarás que hay dos tipos de clases, aquellas que mantienen el estado de una única variable de instancia y aquellas que coordinan dos variables separadas. En general, no mezcles los dos tipos de responsabilidades.

```tsx
class Name {
  private first;
  private middle;
  private last;
}
```

```tsx
    class Name {
        private surname: Surname;
        private given: GivenNames;
    }

    class Surname {
        private family: string;
    }

    class GivenNames {
        private names = string[];
    }
```

Si piensas en como descomponer, la oportunidad para separar el cometido de un nombre de familia (usado para restricciones de entidad) puede ser separado y reutilizado para otro tipo de nombres. El objeto GivenName contiene una lista de nombres, permitiendo al nuevo modelo absorber personas con nombres como first, middle y otros. La descomposición de variables de instancia te ayuda a entender lo que tienen en común algunas de ellas.

## Evita getters/setters o atributos públicos

Si tus objetos no encapsulan apropiadamente el conjunto de variables de instancia y el diseño se vuelve engorroso, es el momento perfecto para examinar violaciones en la encapsulación. El comportamiento no seguirá las variables de instancia si puede preguntar por su valor en su lugar actual. La idea detrás de unas fuertes fronteras en los límites de la encapsulación es que fuerza a los programadores a trabajar con el código que has preparado. El acceso al comportamiento esta limitado a un único lugar. Esto desencadena muchos efectos, como por ejemplo una reducción dramática en la duplicidad de código, errores y una mejor localización de los cambios para implementar nuevas funcionalidades.

```tsx
class Account {
  private money = 0;

  public getMoney() {
    return this.money;
  }

  public setMoney(money) {
    this.money = money;
  }
}

//Add money to account
const newMoney = account.getMoney() + 100;
account.setMoney(newMoney);
```

En este ejemplo, la clase Account es básicamente una estructura de datos sin comportamiento alguno. Una clase anémica que favorece la proliferación de _transaction scripts_ a su alrededor para operar con ella.

Un mejor diseño podría ser

```tsx
class Account {
  private money = 0;

  public addMoney(amount: number) {
    this.money += amount;
  }
}

account.addMoney(100);
```

Una forma popular de llamar a esta regla es ["Tell, don't ask"](https://martinfowler.com/bliki/TellDontAsk.html).

## Clases con estado, evita métodos estáticos

Esta regla es quizás la más difícil de transmitir, tampoco es tan clara de visualizar como las anteriores. Las llamadas "utility classes" que simplemente operan otros objetos no tienen identidad, no tienen razón de existencia. Preguntan a los objetos por sus datos y los manipulan en favor de otros. En general, son una gran fuente de violación de encapsulación.

## Kata para practicar objects calisthenics

Para poder poner en práctica cada unas de estas reglas, recomendamos en _Codes Scouts_ hacer la kata _Bank Kata_
Para ello recomendamos que ejecutes en tu consola el siguiente código y selecciones la _Bank Kata_ dentro del código que genera encontraras un readme con las instrucciones.

```sh
npx kataclism
```

![Kataclism](/images/blog/kataclism.png)

- En caso que no funcione, necesitaras instalar [node js y npm](https://nodejs.org/es/download/)
