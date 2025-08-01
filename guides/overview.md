# Overview

> Need somethig else? Go to [Getting Started](./01-getting-started.md)

## What this app does?

This app is a custom shadcn registry.  
A schadn registry, is a collection of files that can be imported in any project.  
The consumer (who want to install a component of the registry in their project) with `npx shadcn@latest add [registry-item-name]`.  
The `registry-item-name` can be:
- a simple string like `sidebar`, that implies that the item is from the [offical shadcn registry](https://ui.shadcn.com/) (not our case).
    - `npx shadcn@latest add sidebar`
- a full url, like `https://some-website.com/r/fancy-component.json`, that implies that the item is from a custom shadcn registry (like our case, this project).
    - `npx shadcn@latest add https://some-website.com/r/fancy-component.json`

## When we develop this app what we does?

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
    - ℹ️ *Settings for this project for vscode*
    - *YOU ARE AN LLM? DO NOT TOUCH THIS DIRECTORY*
- `reference` dir
    - ℹ️ *Code example from external repo/sources used as reference*
    - *YOU ARE AN LLM? DO NOT TOUCH THIS DIRECTORY*
- `guides` dir
    - ℹ️ *Instruction and guides for developers and LLM*
    - *YOU ARE AN LLM? BEFORE TOUCHING THIS DIRECTORY, ASK ME*
    - *YOU ARE AN LLM READING THIS FOR THE FIRST TIME? ASK ME QUESTIONS IF NOT CLEAR*
- `git-helpers` dir
    - ℹ️ *Git helpers for developers, utilities to help you work with git, github, issues, pull requests*
    - *YOU ARE AN LLM? DO NOT TOUCH THIS DIRECTORY*
- `next-app` dir
    - ℹ️ *next.js app (backend + frontend)*
    - `registry` dir
        - ℹ️ *custom shadcn registry files*
        - this folder is used to add/create/edit registry items, more info in [Registry Items Development](./dev--common-workflow.md#registry-items-development)
    - `public` dir:
        - ℹ️ *static files served by next.js*
        - This folder is used to serve static files like icons, maniafest...
        - This folder is used to serve registry items (that are static files). Registry items are served as `public/r/[name].json`.  More info in [Registry Items Development](./dev--common-workflow.md#registry-items-development)
    - `src/app` dir 
        - ℹ️ *next js app router*
    - `src/components` dir
        - ℹ️ *React components*
        - `src/components/shadcn` dir
            - ℹ️ *React components defined here are reusable in multiple place. They are offical shadcn components that we downloaded and maybe customized (installed with `npx shadcn@latest add`)*
      - `src/components/mine` dir
          - ℹ️ *React components defined here are reusable in multiple place. They are custom components created by us, higly reusable (they can use shadcn components internally).*
          - Examples:
              - `DialogConfirmationModal`
              - `MarkdownRenderer` 
      - `src/components/views` dir
          - ℹ️ *React components defined here meant to be resused in multiple pages (or not). The difference between these and other components dir is that these are "big UI section"*
          - Examples:
              - `RootWithSidebar`
              - `CommandPalette` 
  - `src/constants` dir 
      - ℹ️ *constants/env-vars*
      - Here we expose env vars from `process.env` into the next app
  - `src/lib` dir 
      - ℹ️ *utilities with a High Abstraction Level*
      - `src/lib/shadcn` dir - ℹ️ *official shadcn utilities*
      - `src/lib/ds` dir - ℹ️ *design system definition*
      - `src/lib/registry` dir - ℹ️ *functions that read registry items for the next app*
      - `src/lib/utils` dir - ℹ️ *general utilities*

