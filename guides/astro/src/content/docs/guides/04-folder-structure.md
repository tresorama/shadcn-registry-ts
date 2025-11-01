---
title: Folder Structure
description: Folder structure of the project
---

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
        - this folder is used to:
          - define input files of the registry (add/create/edit items), more info in [Registry Items Development](./dev--common-workflow.md#registry-items)
          - generating derived version of these input files
          - read generated derived version of these input files in nextjs and shadcn cli
    - `public` dir:
        - ℹ️ *static files served by next.js*
        - This folder is used to serve static files like icons, maniafest...
        - This folder is used to serve registry items (that are static files). Registry items are served as `public/r/[name].json`.  More info in [Registry Items Development](./dev--common-workflow.md#registry-items)
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

