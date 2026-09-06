---
title: Test && Commit || Revert
date: 2022-07-02T00:00:00.000Z
summary: Flujo de trabajo Test && Commit || Revert (TCR) - ejecuta tests después de cada cambio en código productivo. Aprobar = commit, fallar = revert. Técnica adjunta a TDD para bucles de retroalimentación más rápidos.
image: /images/blog/test-commit-revert.png
tags: [tcr, tdd, tests, commit]
---

## El flujo de trabajo TCR (Test && Commit || Revert)

Este flujo consiste en que tras cada cambio en el código de producción se lanzan los tests. Si los test pasan, se ejecuta un commit con los cambios. `git commit -am "My tests passed"`

Pero si los tests NO pasan, el código se descarta, es decir, ejecutamos `git reset --hard`.

En la web existen muchos scripts que automatiza este proceso. En la versión más básica que he visto si los tests están en verde hace un commit, caso contrario hace un revert de todo el código.

Es cierto que esto puede ser un poco molesto, y mucho más si trabajamos con TDD, se imaginan... en cada flujo de TDD (Red - Green - Refactor) haríamos un revert cada vez que hagamos un nuevo test, por este motivo, esto es inviable en TDD.

Por esta razón, existen algunas versiones mejoradas que, por ejemplo, aseguran que el código compila y solo revierten los cambios del código productivo, los tests jamás los revertirá.

Trabajando con TCR puedes aprender a refactorizar en pequeños pasos, ya que favorece la parte de "make the change easy", manteniendo los tests en verde.

Si quieres jugar con TCR usando git, jest y typescript, aquí te dejo un comando que puedes agregar en tu package.json:

```js
    test-tcr : "jest && git commit -am 'Test Passed' || git checkout -- :!**/**/*.test.ts"
```

Super sencillo, si algún test falla, decartará cualquier archivo modificado que no sea un test, caso contrario hara un commit de tu código.

Un saludo 👋
