# Production deployment

> Need somethig else? Go to [Getting Started](./01-getting-started.md)

## How to deploy/launch a production version of the app

**IMPORTANT**: *A production version is what is considered "the real app", deployed on a PaaS provider (Vercel, Netlify, etc)*

Follow the guide of the PaaS provider (Vercel, Netlify, etc), and when you need to customize env var and build script, follow the following steps:
- next.js (backend + frontend)
  - **Environment Variables**: read [Env Varas](./environments.md)
  - **Build script**: `cd next-app && pnpm run build`
  - **Start script** `cd next-app && pnpm run next:start`