---
title: Production - Deployment
description: How to deploy/launch a production version of the app
---

## How to deploy/launch a production version of the app

:::danger[Important]
A production version is what is considered "the real app", deployed on a PaaS provider (Vercel, Netlify, etc)
:::

:::tip[What we use as PaaS provider]
We are using [Vercel](https://vercel.com) to deploy the app
:::

Follow the guide of the PaaS provider (Vercel, Netlify, etc), and when you need to customize env var and build script, follow the following steps:

- **Environment Variables**: read [Envirnoment Variables for Prod](./environments.md#production)
- **Build script**: `cd next-app && pnpm run prod:build`
- **Start script** `cd next-app && pnpm run prod:start`