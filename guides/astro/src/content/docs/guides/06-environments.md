---
title: Environments
description: Which envs we used and which Environment Variables are used in this project?
---


## Environments

### Development

Alias: `development`  
This env is used to code the app.  
This env run on your local developer machine.  
To have Environment Variables for this env, you must copy `.env.development.local.example` to `.env.development.local`, then set env vars.  

### Simulate Production

Alias: `prod-simulate`  
This env is used to simulate production on your machine before deploy.  
This env run on your local developer machine.  
To have Environment Variables for this env, you must copy `.env.prod-simulate.local.example` to `.env.prod-simulate.local`, then set env vars.

### Production

:::danger[Important]
This is the app that the world will see.
:::

:::tip[What we use as PaaS provider]
Now we use [Vercel](https://vercel.com) to deploy the app.
:::

Alias: `prod`  
This env is the real app deployed on a PaaS provider (Vercel, Netlify, etc).  
This env run on a PaaS provider.  
To have Environment Variables for this env, you must set them in the PaaS provider. Use the same env vars as `prod-simulate` as a guide.

## Environment Variables

To know what each env var does, you must read `.env.*.example` files



