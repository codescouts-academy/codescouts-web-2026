---
title: React 18, What’s New
date: 2022-05-01T00:00:00.000Z
summary: The new version of React is out. If you want to know the new features, we explain them in one minute!
image: /images/blog/react.png
tags: [react, codescouts]
---

## Concurrent Mode

> Now React can interrupt rendering if it sees that it is not important. This ensures the UI remains responsive to user interaction.

## Before

```jsx
import ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("root"));
```

## Now

```jsx
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(<App />);
```

## Batching updates

> It avoids unnecessary renders by grouping more than one state update and applying them automatically.

## Before React 18

```jsx
setTimeout(() => {
  setCount((c = c + 1));
  setFlag((f) => !f);
}, 1000);
```

> renders the component twice

## Now with React 18

```jsx
setTimeout(() => {
  setCount((c = c + 1));
  setFlag((f) => !f);
}, 1000);
```

> The component renders once

## Transitions

> You can mark state updates as lower priority.

```jsx
import { startTransition } from 'react';

// Normal update with high priority
setInputValue(input);

// Lower-priority updates that can be interrupted
startTransition(() => {
  setSearchQuery(input);
});
```

## Suspense on the server

Now Suspense works on the server and supports waiting for data.

```jsx
<Layout>
  <Navbar />
  <Sidebar />
  <Suspense fallback={<Spinner />}>
    <Comments />
  </Suspense>
</Layout>
```

## New hooks: useId and useDeferredValue

## useId

> It allows you to create a unique identifier on the client and server.

```jsx
function Checkbox() {
  const id = useId();
  return (
    <div>
      <input id={id} type="checkbox" name="useId" />
    </div>
  );
}
```

## useDeferredValue

> It allows values to update later so the UI updates immediately and the rest of the values update when ready.

```jsx
function App() {
  const [text, setText] = useState("hola");
  const deferredText = useDeferredValue(text, { timeoutMs: 2000 });

  return (
    <div>
      <MyFirstList />
      <MySecondList text={deferredText} />
    </div>
  );
}
```
