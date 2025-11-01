### getInferredDeployUrl

```ts
// constants.ts

import { getInferredDeployUrl } from './infer-deploy-url';

export const APP_BASE_URL = getInferredDeployUrl(process.env);
// ⏬ when browser
// ""

// ⏬ when server + no recognized deploy service
// http://localhost:3000

// ⏬ when server + production deploy on vercel
// https://my-project.vercel.app

// ⏬ when server + deploy preview on vercel
// https://my-project-4567g34536d.vercel.app

// ⏬ when server + production deploy on netlify
// https://my-project.netlify.app

// ⏬ when server + deploy preview on netlify
// https://deploy-preview-1--petsof.netlify.app

```