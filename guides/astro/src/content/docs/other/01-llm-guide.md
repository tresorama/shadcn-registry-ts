---
title: LLM Guide
description: Convention and rules to follow for LLM.
---

<!-- # LLM Guide -->

> **YOU ARE AN LLM?**  
> Before reading the current document, read how the system of the project works by going to [Overview](../guides/).


## Coding Style you must follow

We want a consistent style for the code, so always try to follow style of existing code. If in doubt, ask me before acting.

### General rules

- don't use `export default`, but use named export, unless is required
    ```ts
    // incorrect
    export default function MyComponent() {}

    // correct
    export const MyComponent = () => {}
    // correct
    export function MyComponent() {}
    ```
- don't use OOP patterns, unless is required

### React Code

- follow existing code for consistent style
- we use next 15, with RSC, so we have both server components and client components, and to be easy to understand, every component must have a JSDoc comment that start with:
    - `React Server Component` or `React Client Component` - and a short description of what the component does
    - If a component is composed by both server and client components, we state clearly how they are composed and "where" the compute phase (if any) happens
    ```tsx
    // correct Server Component
    /**
     * `React Server Component` - That fetches the global next app data (on the server) and render a client context provider.  
     * This global data is used in all pages, and doesn't change between page.
     * */
    export async function GlobalDataServerProvider() {}

    // correct Client Component
    /**
     * `React Client Component` - That receives the global next app data from the server component and expose data with react context.  
     * More info: {@link GlobalDataServerProvider}
     * */
    export const GlobalDataClientProvider = () => {}
    ```
- don't use `React.FC` type, I don't like it. Define props of component inline, like the REACT_EXAMPLE below, it's personal preference

  ```tsx

  // correct

  /**
   * `React Client Component` - ... o.
   * */
  export const MyComponent = ({
    onClick,
  }: {
    onClick: () => void
  }) => {
    return <div>{/* ... */}</div>
  }
  ```


