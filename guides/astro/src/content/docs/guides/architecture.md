---
title: Architecture
description: Which stack is used
---

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

