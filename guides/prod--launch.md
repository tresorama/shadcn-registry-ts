## How to deploy/launch a production version of the app

**IMPORTANT**: A production version is what is considered "the real app", deployed on a PaaS provider (Vercel, Netlify, etc)

**IMPORTANT**: Follow the guide of the PaaS provider (Vercel, Netlify, etc), and when you need to customize env var and build script, follow the following steps:

- next.js (backend + frontend)
  - env var: read `guides/env-vars.md` 
  - build script: `build`
  - start script `next:start`