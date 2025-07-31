## Overviw of app

**What this app does?**  
This app is a custom shadcn registry.  
A schadn registry, is a collection of files that can be imported in any project.  
The consumer (who want to install a component of the registry in their project) with `npx shadcn@latest add [registry-item-name]`.  
The `registry-item-name` can be:
- a simple string like `sidebar`, that implies that the item is from the [offical shadcn registry](https://ui.shadcn.com/) (not our case).
    - `npx shadcn@latest add sidebar`
- a full url, like `https://some-website.com/r/fancy-component.json`, that implies that the item is from a custom shadcn registry (like our case, this project).
    - `npx shadcn@latest add https://some-website.com/r/fancy-component.json`

**When we develop this app what we does?**

This app contains a single next.js website, that has two main parts:
- `documentation` - html pages that explain every items of the registry.
- `registry-files` - json files that contains the items of the registry, used by the `npx shadcn@latest add` command. This section is served as static files by next(`public/r/[name].json`).

Said so, in development we focus on two things:
- add/remove/edit registry items
- curate the documentation

## Architecture

[ts]: https://www.typescriptlang.org/
[next15]: https://nextjs.org/
[zod4]: https://zod.dev/
[vitest]: https://vitest.dev/
[react19]: https://react.dev/
[tw4]: https://tailwindcss.com
[shadcn]: https://ui.shadcn.com/
[lucide-react]: https://lucide.dev/
[next-themes]: https://github.com/pacocoursey/next-themes
[jotai]: https://jotai.org/
[react-context]: https://react.dev/reference/react/createContext
[remark]: https://github.com/remarkjs/remark
[rehype]: https://github.com/rehypejs/rehype
[shiki]: https://shiki.matsu.io/packages/rehype

- Database:
  - Nothing
- Backend
  - No dedicated backend, but the next.js app is both frontend and backend
  - Nothing is SSR in next, everyting is SSG
- Next.js (backend + frontend) 
  - Backend:
      - [typescript][ts]: Language
      - [next.js v15][next15]: Web Framework
      - [zod v4][zod4]: validation library
      - [vitest][vitest]: testing framework for registry items
  - Frontend:
      - [typescript][ts]: Language
      - [react 19][react19]: UI Framework
      - [tailwind 4][tw4]: CSS framework
      - [shadcn (for Tailwind v4)][shadcn]: Component snippets library
      - [lucide-react][lucide-react]: Icons library
      - [next-themes][next-themes]: light/dark theme support [it]integrates with next.js and tailwind)
      - [jotai][jotai]: micro state management library
      - [react-context][react-context]: dependency injection library for exposing data computed on server components and exposed to client components
      - [remark][remark] + [rehype][rehype] + [shiki][shiki]: markdown to html converter




## Folder Structure 

- `.vscode` dir
  - Settings for this project for vscode
  - **DO NOT TOUCH THIS DIRECTORY**
- `reference` dir => Code example from external repo/sources used as reference
  - **DO NOT TOUCH THIS DIRECTORY**
- `guides` dir => Guides
  - Instruction and docuemtn for developers and LLM
  - Read this folder files and ask me question if not clear
  - **BEFORE TOUCHING THIS DIRECTORY, ASK ME**
- `git-helpers` dir => Git helpers for developers
  - Utilities to help you work with git, github, issues, pull requests
  - **DO NOT TOUCH THIS DIRECTORY**
- `next-app` dir => next.js app (backend + frontend)
  - `registry` dir => custom shadcn registry files
  - `public` dir => static files served by next.js
      - registry items are served as static files using this dir `public/r/[name].json`
      - to produce these files the script is one of these:
          - `pnpm run registry:generate`  
          - `pnpm run build`  
  - `src/app` dir - next js app router
  - `src/components` dir => React components
      - `src/components/shadcn` dir => React components defined here are reusable in multiple place. They are offical shadcn components that we downloaded and maybe customized (installed with `npx shadcn@latest add`)
      - `src/components/mine` dir => React components defined here are reusable in multiple place. They are custom components created by us, higly reusable (they can use shadcn components internally)
      - `src/components/views` dir => React components defined here meant to be resused in multiple pages (or not). The difference between these and other components dir is that these are "big UI section"
  - `src/constants` dir => constants
  - `src/lib` dir => setup utilities with a higher Abstraction Level
      - `src/lib/shadcn` dir => official shadcn utilities
      - `src/lib/ds` dir => design system definition
      - `src/lib/registry` dir => functions that read registry items for the next app
      - `src/lib/utils` dir => general utilities


## Coding Style you must follow

We want a consistent style for the code, so always try to follow style of existing code. If in doubt, ask me.

### General rules

- don't use `export default`, but use named export, unless is required
- don't use OOP patterns, unless is required

### React Code

- follow existing code for consistent style
- we use next 15, with RSC, so we have both server components and client components, and to be easy to understand, every component has a JSDoc comment that start with:
    - `React Server Component` or `React Client Component` - and a short description of what the component does
    - If a component is composed by both server and client components, we state clearly how they are composed and "where" the compute phase (if any) happens
- don't use `React.FC` type, I don't like it. Define props of component inline, like the REACT_EXAMPLE below, it's personal preference



**REACT_EXAMPLE**

```tsx

// correct

/**
 * `React Server Component` - That fetches the global next app data (on the server) and render a client context provider.  
 * This global data is used in all pages, and doesn't change between page.
 * */
export const MyComponent = ({
  onClick,
}: {
  onClick: () => void
}) => {
  return <div>{/* ... */}</div>
}
```




