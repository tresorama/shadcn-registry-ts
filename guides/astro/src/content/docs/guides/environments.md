---
title: Environments
description: Which envs we used and which Environment Variables are used in this project?
---

<!-- # Env Vars -->

> Need somethig else? Go to [Getting Started](./01-getting-started.md)


## Environments

**`dev` - Development**

Development is done on local.  
You must copy `.env.example` to `.env`, then set env vars.

**`simulate-prod` - Simulate Production**

Simulate production is done on local.  
You must copy `.env.example` to `.env`, then set env vars.

**`prod` - Production**

Production is done on Vercel.  
You must set env var on Vercel.  

## ENV Files

- `next-app/.env.example`
  - this file is version controlled
  - It's the guide that explain what each env var is used for
- `netx-app/.env`
  - this file is not version controlled, and you should create it by copying `.env.example`
  - this file is used in these envs:
      - `dev` development on local (next.js automatcially reads this file)
      - `simulate-prod`, production build on local (next.js automatcially reads this file)

## What each env vars does?

Read `next-app/.env.example`


