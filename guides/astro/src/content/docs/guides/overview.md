---
title: Overview
description: Purpose of the project, stack, folder structure...
---

## What this app does?

This app is a custom shadcn registry, that contains Typescript utilities.  

## What is a shadcn registry?

A schadn registry, is a collection of files that can be imported in any project.  
After the import, the files are editable and "yours".  

The consumer – who want to install a component of the registry in their project – install a regitry item with 
```bash
npx shadcn@latest add [registry-item-name]
```  

The `registry-item-name` can be:
- a simple string:
    - like `sidebar`
    - this usage implies that the item is from the [offical shadcn registry](https://ui.shadcn.com/)
    - i.e. `npx shadcn@latest add sidebar`
    - this is not our case
- a full url:
    - like `https://some-website.com/r/fancy-component.json`
    - this implies that the item is from a custom shadcn registry.
    - i.e. `npx shadcn@latest add https://some-website.com/r/fancy-component.json`
    - this is our case

## Which parts our app has?

This app contains a single next.js website, that has two main parts:
- `documentation` 
    - html pages that explain every items of the registry.
    - This parts is made with app router of Next.js.
- `registry-files` 
    - json files that contains the items of the registry, used by the `npx shadcn@latest add` command. 
    - This section is served as static files by next (`public/r/[name].json`).

Said so, in development we focus on two things:
- add/remove/edit registry items
- curate the documentation
