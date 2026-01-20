---
title: 4 Reglas del diseño simple
date: 2022-04-30T00:00:00.000Z
summary: Un grupo de gente brillante trabajando en lo mismo, al mismo tiempo, en el mismo lugar y en la misma computadora.
images: [images/blog/simple-design.png]
image: images/blog/simple-design.png
feature_image: images/blog/simple-design.png
with_reading_time: true
with_post_share: true
tags: [4rules, diseño, 4reglas, design, codescouts]
---

# 4 reglas del diseño simple

A Kent Beck se le ocurrieron [cuatro reglas de diseño simple](https://www.martinfowler.com/bliki/BeckDesignRules.html) mientras desarrollaba ExtremeProgramming a fines de la década de 1990. Hasta ahora, muchos desarrolladores sienten que estas reglas son de gran ayuda para crear software simple pero bien diseñado, y también ayudan a mantener el código limpio. Según Kent, un diseño es "simple" cuando sigue estas reglas, **_en orden de importancia_**:

![https://miro.medium.com/max/1400/0\*mmKu9oV-Cca0Tuib.png](https://miro.medium.com/max/1400/0*mmKu9oV-Cca0Tuib.png)

-   Pasa las pruebas (Funciona) 🧪
-   Revela intención 🤌
-   Sin duplicación 👎
-   Menos elementos 👍

Las reglas están en orden de prioridad, por lo que "pasa las pruebas" tiene prioridad sobre "revela la intención".

Sin más demora, profundicemos en cada una de las reglas y hablemos de lo que significan en toda su extensión:

# **Primera regla: Pasa todas las pruebas (¡Funciona!)**

![https://blogs.egu.eu/divisions/gd/files/2019/07/Untitled-4-e1560239780934-1400x800.png](https://blogs.egu.eu/divisions/gd/files/2019/07/Untitled-4-e1560239780934-1400x800.png)

En primer lugar, por supuesto, debemos hacer que se entregue una aplicación que funcione, por eso es la prioridad número uno. Una de las muchas cosas que podrían asegurarnos de que nuestra aplicación funciona bien (_y saber exactamente por qué funciona_) es tener pruebas para el código particular que escribimos. Las pruebas de escritura (pruebas exhaustivas) en realidad podrían conducirnos a mejores diseños. Cuantas más pruebas escribamos, más continuaremos empujando hacia cosas que son más simples de probar, lo que nos empujará a hacer que nuestras clases sean pequeñas y con un solo propósito.

\*Una vez que se pasan las pruebas, estamos facultados para mantener nuestro código limpio. Hacemos esto refactorizando el código, y es mejor hacerlo con frecuencia y de forma incremental después de cada pocas líneas de código que agregamos. Después de hacer que una sola característica funcione y pase todas las pruebas, tómese un tiempo para revisar su código. ¿Otros no entendieron lo que realmente escribo aquí? ¿Solo lo estoy degradando? Si las respuestas son afirmativas, lo limpiamos y ejecutamos nuestras pruebas. **¡El hecho de que tengamos estas pruebas elimina el temor de que limpiar el código lo rompa!\***
_Las siguientes 3 reglas podrían ayudarlo a verificar la calidad de su código._

# **Segunda Regla: Revela Intención**

![https://miro.medium.com/max/1400/0\*ojPe9FFyQfew1TuB.jpeg](https://miro.medium.com/max/1400/0*ojPe9FFyQfew1TuB.jpeg)

Cuando nos comunicamos con otras personas, debemos asegurarnos de que otras partes entiendan lo que queremos transmitir en nuestra conversación. También es lo mismo con el código. Como codificadores, estábamos trabajando en equipo en un proyecto y hay muchos otros codificadores que verán, tocarán o incluso necesitarán modificar el código existente, y es muy importante que entiendan lo que escribe allí.

Para hacer que nuestro código revele nuestras intenciones, necesitamos ser expresivos, y la forma más importante de ser expresivo es intentarlo. Con demasiada frecuencia hacemos que nuestro código funcione y luego pasamos al siguiente problema sin pensarlo dos veces para que el código sea fácil de leer. Situarnos como otras personas que se convertirán en la próxima persona en leer nuestro código. El cuidado es un recurso precioso.

Algunas cosas que podemos hacer para que nuestro código sea más expresivo son:

-   **_Elija un buen nombre que represente las cosas._** Use nombres predecibles para que cuando otras personas lean los nombres de clases, funciones o variables, no tengan una idea equivocada o se sorprendan al descubrir las responsabilidades.
-   **_Mantenga sus funciones y clases pequeñas._** Es más fácil nombrarlo, escribirlo y comprenderlo.
-   **_Desafíese y comprométase a escribir código para que se lea como documentación._** Las pruebas unitarias bien escritas son expresivas y actúan como documentación mediante el ejemplo. Alguien que lea las pruebas debería poder comprender rápidamente de qué se trata una clase.

# **Regla 3: Sin duplicación**

![https://miro.medium.com/max/700/0\*vqPi_IxbpwnqNV4S.jpg](https://miro.medium.com/max/700/0*vqPi_IxbpwnqNV4S.jpg)

Si puede reutilizar el código que ya existe, ¿por qué molestarse en escribir las mismas cosas nuevamente? Las líneas de código que se ven exactamente iguales son duplicaciones. Esta regla está relacionada con [DRY]({{< ref "principios-de-la-buena-programacion.md#dry-dont-repeat-yourself" >}}) donde debemos asegurarnos de que un método solo tenga una única responsabilidad y no se repita. Pero, esta regla se trata más de la duplicación de conocimiento, no de la duplicación de código. La forma de Kent de decirlo es 'todo debe decirse **_una vez y solo una vez_**'.

Muchos programadores han observado que el ejercicio de eliminar la duplicación es una forma poderosa de generar buenos diseños.

El orden de la segunda y tercera regla puede ser ligeramente diferente en algunos lugares, en el libro de Robert C. Martin: [Clean Code book](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), es _Sin duplicación_ primero y _Revela la intención_ el último, mientras que en [artículo de Martin Fowler](https://www.martinfowler.com/bliki/BeckDesignRules.html), es _Revela la intención_ primero y _Sin duplicación_ más tarde.

Por experiencia personal, sigo la importancia de _Revela la Intención_ primero y luego considero _Sin duplicación_ porque es crucial que otras personas puedan entender lo que codifico primero y, a menudo, está relacionado con la _duplicación_ problema también para hacer que mi código sea más expresivo. Pero algunas personas también dijeron que el orden de estas 2 reglas no importa. Al revelar la intención, la duplicación en su código será más clara y cuando se reduzca la duplicación, revelará mejor su intención.

Entre estas 2 reglas, una cosa que debe estar presente: **coherencia.** Debe ser comprensible para otra persona que lo lea y puede predecir que también implementará las mismas reglas proporcionadas en la adición del código.

# **Regla 4: Menos elementos**

![https://miro.medium.com/max/1360/0\*sd4aiV6y-sMV1Gz7.jpg](https://miro.medium.com/max/1360/0*sd4aiV6y-sMV1Gz7.jpg)

Después de hacer las reglas anteriores: expresividad del código, eliminar la duplicación, a veces podemos llevarlo demasiado lejos y esta regla nos ayuda a verificar y ser conscientes de mantener nuestro código para que tenga la menor cantidad de elementos posible.

Estas preguntas pueden hacerse a sí mismo cuando se tome un tiempo para dar un paso atrás después de escribir algo de código:

-   **_¿Tengo algún código inactivo?_** A veces, mientras trabajamos en nuestro sistema, construimos cosas que no son definitivas, y hay momentos en que al final, no lo necesitamos en absoluto en el producto final. Si ha sucedido, no hay duda, simplemente elimínelo.
-   **_¿He extraído demasiado?_** A veces, podemos extraer en exceso al tratar de expresar mejor nuestra intención, por ejemplo, cuando extraemos métodos para mejorar la legibilidad, pero lo hacemos demasiado en la medida en que cada método tiene su propio clase.

# **Conclusiones**

Estas 4 reglas están ordenadas por prioridad y se complementan entre sí. Cuando te confundes hasta cierto punto porque las reglas parecen estar en conflicto entre sí, vuelve de nuevo al orden de estas reglas.

Estudiar, comprender y aplicar estas reglas puede ayudarnos a ser un mejor programador que podría escribir mejor código con calidad. Después de todo, necesitamos experiencia y práctica para comprender completamente e implementar todas estas reglas en nuestro código. Con experiencia, nos ayudará a comprender y saborear completamente los beneficios de implementar estas 4 reglas.

Finalmente, pueden leer el libro de Robert C. Martin: [Clean Code book](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) como fuente original, y otro libro [Comprender las cuatro reglas del diseño simple](https://www.goodreads.com/book/show/21841698-understanding-the-four-rules-of-simple-design) que brinda ejemplos reales de la implementación de las reglas en Juego de vida.
