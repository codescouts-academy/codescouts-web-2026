---
title: Test-Driven Development
date: 2022-07-06T00:00:00.000Z
summary: También conocido como TDD (desarrollo dirigido por tests) es una práctica de programación que consiste en escribir primero los tests (generalmente unitarias) y después escribir el código fuente que pase la prueba satisfactoriamente y, por último, refactorizar el código escrito.
images: [images/blog/tdd-feature.png]
image: images/blog/tdd.png
feature_image: images/blog/tdd-feature.png
with_reading_time: true
with_post_share: true
tags: [diseño, design, tdd, test-driven-design, codescouts]
---

#### Test-Driven Development

También conocido como TDD (desarrollo dirigido por tests) es una práctica de programación que consiste en escribir primero los tests (generalmente unitarias) y después escribir el código fuente que pase la prueba satisfactoriamente y, por último, refactorizar el código escrito.

Con esta práctica se consigue, entre otras cosas: un código más robusto, más seguro, más mantenible y una mayor rapidez en el desarrollo.

#### El famoso ciclo Red-Green-Refactor de TDD 🟥 --> 🟩 --> 🟦

-   **Red**: Escribir un **test que falle** 🧪, es decir, tenemos que realizar el **test antes de escribir la implementación**. Normalmente se suelen utilizar test unitarios, aunque en algunos contextos puede tener sentido hacer TDD con test de integración.
-   **Green**: Una vez creado el test que falla, implementaremos el **mínimo código necesario para que el test pase** 👌.
-   **Refactor**: Por último, tras conseguir que nuestro código pase el test, debemos examinarlo para ver si hay alguna **mejora** que podamos realizar.

Una vez que hemos cerrado el ciclo, empezamos de nuevo con el siguiente requisito. ♾️

#### Las tres leyes del TDD 📃

-   No escribirás código de producción sin antes escribir un test que falle.
-   No escribirás más de un test unitario suficiente para fallar.
-   No escribirás más código del necesario para hacer pasar el test.

#### TDD como herramienta de diseño 🔨

Repite después de mi... TDD no es una técnica de testing...

Cuando [Kent Beck](https://en.wikipedia.org/wiki/Kent_Beck) desarrolló esta metodología lo hizo centrándose en el segundo de los beneficios que describimos en el apartado anterior, es decir, en **TDD como una herramienta de diseño de software** que nos ayuda a obtener mejor código, no a obtener más test.
Para ello, una vez que tenemos una lista con los primeros requisitos que debe satisfacer el producto, debemos seguir los siguientes pasos:

-   Escogemos un requisito.
-   Escribimos un test que falla.
-   Creamos la implementación mínima para que el test pase.
-   Ejecutamos todos los tests.
-   Refactorizamos.
-   Actualizamos la lista de requisitos.

En resumen... TDD nos regala los tests como resultado de haber utilizado la técnica, pero TDD **_NO_** es una técnica de testing.

En el último paso, cuando actualizamos la lista de requisitos, además de marcar como completado el requisito implementado, debemos añadir los nuevos requisitos que hayan podido aparecer.

#### Consejos hacer TDD y no morir en el intento 💀

Una vez que tenemos el test fallando, la forma más rápida de obtener la primera implementación es creando un fake que devuelva una constante.
Esto nos ayudará a ir progresando poco a poco en la resolución del problema, ya que al tener la prueba pasando estamos listos para afrontar el siguiente caso.

Es muy importante, extremadamente importante, entender el flujo **Red-Greem-Refactor** de TDD

-   Cuando estamos en la etapa **Red** es donde debemos ser estratégicos con el test fallido que vamos a escribir, debemos pensar en el algoritmo o la lógica que estamos trabajando.
-   Cuando estamos en la etapa **Green** solo debemos concentrarnos en poner ese test en verde, **solo en eso** y nada más!.
-   Cuando estamos en la etapa de **Refactor** tenemos que aprovechar para diseñar nuestro software, esta es la etapa más importante, donde aprovechamos para comenzar poco a poco a generalizar nuestra lógica de negocio.

#### Baby steps 🍼

Es muy importante que al trabajar con TDD utilicemos la técnica de **Baby Steps** (en un próximo artículo habremos acerca de esta técnica), pero resumiendo... consiste en avanzar poco a poco, poner en verde el test con el código más sencillo más predecible, más tonto que encontremos.

Mientras avanzamos con los tests de TDD aprovechamos la etapa de **Refactor** para comenzar a quitar esos fakes (que mencionamos arriba), constantes, hardcodes, etc y empezamos a generar un código desde lo específico a lo genérico.

#### Ejemplo práctico de TDD 📚

Hagamos con TDD la sucesión de Fibonacci

> **0 1 1 2 3 5 8 13 21 ...**

```ts
    //Fibonacci, primer test.
    describe('Fibonacci should', () => {
        it('return zero if receive zero', () => {
            expect(fibonacci(0)).toBe(0);
        });
    });
```

La implementación fake más obvia que permite que el test pase es hacer que la función fibonacci devuelva 0 como una constante:

```ts
    //Código productivo
    function fibonacci(n) {
        return  0;
    }
```

Una vez que tenemos el primer test pasando, la idea es transformar gradualmente la constante en una expresión. 

Veámoslo en el ejemplo, para ello primero debemos crear un test para el siguiente caso obvio, n = 1;

```ts
    it('return one if receive one', () => {
        expect(fibonacci(1)).toBe(1);
    });
```

Ya tenemos el siguiente test fallando. El siguiente paso obvio es escribir una pequeña expresión con un condicional para una entrada con n = 0 devuelva 0 y para n = 1 devuelva 1:

```ts
    function fibonacci(n) {
        if(n ==0)
            return  0;
        return  1;
    }
```

Como puedes observar, la técnica de la implementación falsa nos ayuda a progresar poco a poco. Principalmente, tienes dos ventajas inherentes, la primera es a nivel psicológico, ya que se hace más llevadero tener algunos test en verde, en vez de en rojo, que nos permitan ir dando pasos pequeños hacia la solución. La segunda tiene que ver con el control del alcance, ya que esta práctica nos permite mantener el foco en el problema real, evitando caer en optimizaciones prematuras.

#### Triangular 📐

Triangular, o la técnica de la **triangulación**, es el paso natural que sigue a la técnica de la implementación falsa. Es más, en la mayoría de los contextos, forma parte de la triangulación, basándose en lo siguiente:

-   Escoger el caso más simple que debe resolver el algoritmo.
-   Aplicar Red-Green-Refactor.
-   Repetir los pasos anteriores cubriendo las diferentes casuísticas.

Para comprender cómo funciona la triangulación, vamos a continuar desarrollando el ejemplo de Fibonacci, el cual, en parte, ya hemos empezado a triangular. El siguiente caso que podríamos cubrir es para n = 2.

```ts
    it('return one if receive two', () => {
        expect(fibonacci(2)).toBe(1);
    });
```

En esta ocasión el test pasa, por lo tanto, nuestro algoritmo también funciona para n = 2. El siguiente paso sería comprobar qué ocurre para n = 3.

```ts
    it('returns two if receive three', () => {
        expect(fibonacci(3)).toBe(2);
    });
```

Como suponíamos, el test falla. Este paso nos ayudará a aproximarnos a la implementación de una solución más genérica. Ya que podríamos crear una implementación falsa para n = 3 y añadir otro condicional que devuelva 1 para n = 1 y n = 2.

```ts
    function fibonacci(n) {
        if(n == 0)
            return  0;

        if(n == 1 || n == 2)
            return  1;

        return  2;
    }
```

Ahora que tenemos los test pasando, vamos a comprobar qué sucede para n = 4:

```ts
    it('returns three if receive four', () => {
        expect(fibonacci(4)).toBe(3);
    });
```

Al llegar a este punto, ya te habrás dado cuenta de que sería más fácil escribir la implementación obvia que seguir haciendo ramas de decisión:

```ts
    function fibonacci(n) {
        if(n == 0)
            return 0;

        if(n == 1 || n == 2)
            return 1;

        return fibonacci(n - 1) + fibonacci(n - 2);
    }
```

#### Implementación obvia 🥴

Cuando la solución parece muy sencilla, lo ideal es escribir la implementación obvia en las primeras iteraciones del ciclo **Red-Green-Refactor**.

La problemática con esto surge cuando nos precipitamos, creyendo que se trata de un problema sencillo, cuando en realidad no lo es, porque tiene, por poner un ejemplo, algún corner case sobre el que no habíamos reflexionado.

#### Limitaciones del TDD 🤕

Por muchos beneficios inherentes que tenga (o que nos prometan), la técnica del TDD no debe entenderse como una religión ni como una fórmula mágica que vale para todo. Seguir TDD a rajatabla y en todos los contextos no garantiza que tu código vaya a ser más tolerante al cambio, robusto o seguro, ni siquiera te asegura que vayas a ser más productivo a la hora de diseñar software.

Desde mi punto de vista, aplicar TDD no encaja bien en todos los contextos. Por ejemplo, si existe una implementación obvia para un caso de uso, directamente la escribo y luego hago las pruebas. En el caso de estar trabajando en el frontend tampoco me planteo hacer TDD para diseñar componentes de la UI. Incluso es discutible si se deberían hacer test unitarios para probar elementos de la UI, de hecho la UI suele cambiar mucho más que la lógica de nuesto backend por ejemplo, con lo cual, suele ser muy desgastante hacer TDD en la UI.

Mi consejo es que pruebes, trates de aplicarlo en tu día a día durante un tiempo y luego decidas por ti mismo.

Un saludo 👋
