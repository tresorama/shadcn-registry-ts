---
title: Development - Common Workflow
description: How to work in this project on a daily basis? Here you will find which script to run...
---

This page explains which are the workflows that you can do to develop the app.  

## Registry Items

This includes creating, updating, removing, and testing registry items.


### Add a registry item

Adding a registry item involves creating a typescript file with utility code inside, a test file and an example file.  
Then the item must be added to the registry input file.  

:::note
In this example, we add a `logger` item.
:::

1. Create the following files:  
   
   ```bash
    # main code (required)
    next-app/registry/input/items/logger.ts

    # example file (required)
    next-app/registry/input/items/logger.example.md
    # look at one of the existing examples to know what to do

    # test file (optional)
    next-app/registry/input/items/logger.test.ts
    # look at one of the existing tests to know what to do
   ```
1. Add the item to the registry input file
   
   ```bash
   # registry input file
   next-app/registry/input/registry.input.json
   ```
    ```json
    {
      // name of the item, prefixed with util-
      "name": "util-array", 
      "categories": [
        "utility"
      ],
      "type": "registry:file",
      // page title of the item documentation page
      "title": "Array", 
      // page description of the item documentation page
      "description": "Utilities for working with arrays.", 
      "files": [
        // only code files must be added here.
        // test and example are automatically read
        {
          // where the file is located in the disk
          "path": "registry/input/items/utility/array.ts",
          "type": "registry:file",
          // where the file will placed in the consumer project
          // when he run npx shadcn@latest add [registry-item-name]
          "target": "utils/array.ts"
        }
      ]
    }
    ```
1. Then when you re-run the next.js app, the item will be added to the registry

### Update a registry item

Updating a registry itemm involves cretinf a typescript file with utility code inside, a test file, and an example file.  

1. Follow the steps of adding a registry item
1. Edit the item main-code files


### Remove an item

Removing a registry itemm involves deleting the item from the registry input file, and all item files (main-code, test, example).  

Steps:
1. Remove the item from `next-app/registry/input/registry.input.json` items array
1. Delete item files from `next-app/registry/input/items`
1. Then when you re-run the next.js app, the item will be removed from the registry

### Test Registry Items

This run each item `*.test.ts` file with Vitest.  

1. Open new terminal
1. Go to `next-app`
   
   ```bash
   cd next-app
   ```
1. Run tests
   
   ```bash
   pnpm registry:test
   ```

### Generate Registry Public Files

:::tip
This is not required if the next js dev server is running and `APP_DATA_MODE=compute`
:::

1. Open new terminal
1. Go to `next-app`  
   
   ```bash
   cd next-app
   ```
1. Run command  
   
   ```bash
   pnpm registry:generate
   ```

## Next.js Documentation Website

### Launch next js dev server


1. Open new terminal
1. Go to `next-app`  
   
   ```bash
   cd next-app
   ```
1. Create dotenv file  
   
   :::tip
   You need to do it if you don't have it
   :::

   ```bash
   # create the file
   cp .env.development.local.example .env.development.local

   # then set inside the file
   APP_DATA_MODE=compute
   ```
1. Install dependencies  
   
   ```bash
   pnpm install
   ```
1. Run dev server  
   
   ```bash
   pnpm dev:next
   ```

### Test react rerender on next js with react scan

This launch the Next.js website with [react scan](https://react-scan.com/), used to check why comoponents are re-rendering.

1. Open new terminal
1. Go to `next-app`  
   
   ```bash
   cd next-app
   ```
2. Choose if you want to use dev or prod-simulate build
    - `development` version
      
       ```bash
        pnpm dev:next:react-scan
       ```
    - `prod-simulate` version
      
       ```bash
        pnpm prod-simulate:next:react-scan
       ```

### Launch a Production Simulated version


1. Open new terminal
1. Go to `next-app`  
   
   ```bash
   cd next-app
   ```
1. Create dotenv file  
   
   :::tip
   You need to do it if you don't have it
   :::

   ```bash
   # create the file
   cp .env.prod-simulate.local.example .env.prod-simulate.local

   # then set inside the file
   APP_DATA_MODE=compute
   ```
1. Install dependencies  
   
   ```bash
   pnpm install
   ```
1. Run dev server  
   
   ```bash
   pnpm prod-simulate:next
   ```


## Astro Developer Documentation

This Astro website is the Developer Documentation, and it's the webiste you are reading now.

### Launch Astro Dev Server

1. Open a new terminal
1. Go to `guides/astro`  
   
   ```bash
   cd guides/astro
   ```
1. Install dependencies  
   
   ```bash
   npm install
   ```
1. Run dev server  
   
   ```bash
   npm dev:astro
   ```

### Update dev docs

1. [Launch astro dev server](#launch-astro-dev-server)
2. Go to `guides/astro/src/content/docs`
3. Edit markdown files. Astro will refresh on save