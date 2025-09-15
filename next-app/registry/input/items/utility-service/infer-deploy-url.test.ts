import { describe, it, expect } from 'vitest';

import { getInferredDeployUrl } from './infer-deploy-url';

describe('getInferredDeployUrl', () => {

  it('do it - browser', () => {
    // @ts-ignore
    global.window = {};

    expect(getInferredDeployUrl({
      NODE_ENV: 'production',
    })).toBe("");
    expect(getInferredDeployUrl({
      NODE_ENV: 'development',
    })).toBe("");

    // @ts-ignore
    delete global.window;
  });

  it('do it - server + no recognized deploy service', () => {
    expect(getInferredDeployUrl({
      NODE_ENV: 'production',
    })).toBe("http://localhost:3000");
    expect(getInferredDeployUrl({
      NODE_ENV: 'development',
    })).toBe("http://localhost:3000");
  });

  it('do it - server + vercel', () => {
    // production
    expect(getInferredDeployUrl({
      NODE_ENV: 'production',
      VERCEL: '1',
      VERCEL_GIT_COMMIT_REF: 'main',
      VERCEL_PROJECT_PRODUCTION_URL: 'my-project.vercel.app',
      VERCEL_URL: 'my-project-4535c432342x4234.vercel.app',
    })).toBe('https://my-project.vercel.app');

    // deploy preview
    expect(getInferredDeployUrl({
      NODE_ENV: 'production',
      VERCEL: '1',
      VERCEL_GIT_COMMIT_REF: 'feature-1',
      VERCEL_PROJECT_PRODUCTION_URL: 'my-project.vercel.app',
      VERCEL_URL: 'my-project-4567g34536d.vercel.app',
    })).toBe('https://my-project-4567g34536d.vercel.app');

  });

  it('do it - server + netlify', () => {
    // production
    expect(getInferredDeployUrl({
      NODE_ENV: 'production',
      NETLIFY: 'true',
      BRANCH: 'main',
      URL: 'https://my-project.netlify.app',
      DEPLOY_URL: 'https://5b243e66dd6a547b4fee73ae--petsof.netlify.app',
      DEPLOY_PRIME_URL: 'https://deploy-preview-1--petsof.netlify.app',
    })).toBe('https://my-project.netlify.app');

    // deploy preview
    expect(getInferredDeployUrl({
      NODE_ENV: 'production',
      NETLIFY: 'true',
      BRANCH: 'feature-1',
      URL: 'https://my-project.netlify.app',
      DEPLOY_URL: 'https://5b243e66dd6a547b4fee73ae--petsof.netlify.app',
      DEPLOY_PRIME_URL: 'https://deploy-preview-1--petsof.netlify.app',
    })).toBe('https://deploy-preview-1--petsof.netlify.app');

  });

});
