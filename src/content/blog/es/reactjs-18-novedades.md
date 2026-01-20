---
title: 'React 18: Novedades'
summary: Salió la nueva versión de React js, si quieres saber más acerca de las novedades que trae esta versión, te lo explicamos en 1 minuto!
date: 2022-05-01T00:00:00.000Z
images: [images/blog/react-feature.png]
image: images/blog/react.png
feature_image: images/blog/react-feature.png
with_reading_time: true
with_post_share: true
tags: [react, codescouts]
---

## Modo concurrencia

> Ahora React puede interrumpir un renderizado si ve que no es importante. Así se asegura de dejar la UI siempre disponible para la interacción del usuario.

## Antes

```jsx
    import ReactDOM from 'react-dom';

    ReactDOM.render(
    <App />,
    document.getElementById('root'))
```

## Ahora

```jsx
    import {createRoot} from 'react-dom/client'

    createRoot(
        document.getElementById('root')
    ).render(<App />)
```

## Actualización por lotes

> Evita renderizados innecesarios al encontrar más de una actualización del estado y los apila automaticamente.

## Antes de React 18

```jsx
    setTimeout(() => {
        setCount(c = c + 1)
        setFlag(f => !f)
    }, 1000)
```

> renderiza dos veces el componente

## Ahora con React 18

```jsx
    setTimeout(() => {
        setCount(c = c + 1)
        setFlag(f => !f)
    }, 1000)
```

> El componente se renderiza una vez

## Transiciones

> Puedes indicar actualizaciones de estado que tienen menos prioridad.

```jsx
    import {startTransition} from 'react';

    //Actualización normal y prioridad alta
    setInputValue(input)

    //Actualizaciones no prioritarios y pueden interruptirse
    startTransition(() => {
        seSearchQuery(input)
    }
```

## Suspense en el servidor

Ahora Suspense funciona en el servidor y soporta esperar datos.

```jsx
    <Layout>
        <Navbar />
        <Sidebar />
        <Suspense fallback={<Spinner />}>
        <Comments />
        </Suspense>
    </Layout>
```

## Nuevos hooks: useId y useDeferredValue

## useID

> Te permite crear un identificador único en el cliente y en el servidor.

```jsx
    function Checkbox() {
        const id = useId();
        return(
        <div>
            <input id={id} type="checkbox" name="useId" />
        </div>
    )}
```

## useDeferredValue

> Permite que los valores se actualicen más tarde de manera que la UI se actualiza al momento y el resto de valores cuando queramos.

```jsx
    function App() {
        const [text, setText] = useState("hola");
        const deferredText = useDeferredValue(text, {timeoutMs: 2000})

        return (
        <div>
            <MyFirstList />
            <MySecondList text={deferredText} />
        </div>
    )
```
