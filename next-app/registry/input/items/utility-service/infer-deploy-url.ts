
/** Which git branch must be considered `production` */
const GIT_BRANCH_PRODUCTION = 'main';


/**
 * Get the server base URL by inferring the environment.  
 * 
 * If called from `browser` -> returns empty string (relative path usage).  
 * If called from `server` -> try to recognize the URL from env vars injected by the deploy service, if nothing found ->  fallback to `localhost:3000`.  
 * 
 * NOTE: recognized deploy services: `netlify.com`, `vercel.com`
 */
export function getInferredDeployUrl(processEnv: NodeJS.ProcessEnv) {
  // if browser...
  if (isBrowser()) {
    // browser should use relative path
    return '';
  }

  // if is server..
  return (
    inferDeployUrlVercel(processEnv)
    || inferDeployUrlNetlify(processEnv)
    || `http://localhost:${process.env.PORT ?? 3000}`
  );
}


type InferDeployUrl = (processEnv: NodeJS.ProcessEnv) => string | null;

/** Get deploy vercel url (`string`) if this app is built on vercel, or `null` otherwise */
const inferDeployUrlVercel: InferDeployUrl = (processEnv) => {
  // NOTE:
  // - VERCEL=1 if deployed on vercel
  // - VERCEL_GIT_COMMIT_REF:
  //     - i.e. `main`
  //     - is the git branch of the deployment
  // - VERCEL_PROJECT_PRODUCTION_URL:
  //     - i.e. `my-project.vercel.app`
  //     - is the fixed production url of the project on Vercel
  //     - does not change across deployments
  //     - if custom domain is used, this is the custom domain
  //     - if no custom domain is used, this is the auto-assigned by vercel production url
  // - VERCEL_URL:
  //     - i.e. `my-project-4535c432342x4234.vercel.app`
  //     - is the immutable deplyment url.
  //     - changes on each deployment

  // if we are on vercel...
  if (processEnv.VERCEL === '1') {

    // ...and this git branch is PRODUCTION and we have a Vercel Production Url -> return it
    if (processEnv.VERCEL_GIT_COMMIT_REF === GIT_BRANCH_PRODUCTION && processEnv.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${processEnv.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    // ...and this git branch is not PRODUCTION and we have a Vercel Deploy Preview Url or Branch Deploy Url -> return it
    if (processEnv.VERCEL_GIT_COMMIT_REF !== GIT_BRANCH_PRODUCTION && processEnv.VERCEL_URL) {
      return `https://${processEnv.VERCEL_URL}`;
    }
  }

  // if not deployed on vercel -> return null
  return null;
};

/** Get deploy netlify url if this app is built on vercel, or null otherwise */
const inferDeployUrlNetlify: InferDeployUrl = (processEnv) => {

  // NOTE: https://docs.netlify.com/build/configure-builds/environment-variables/

  // NOTE:
  // - NETLIFY=true if deployed on netlify
  // - BRANCH:
  //     - i.e. `main`
  //     - is the git branch of the deployment
  // - URL:
  //     - i.e. `https://my-project.netlify.app`
  //     - is the fixed production url of the project on Vercel
  //     - does not change across deployments
  //     - if custom domain is used, this is the custom domain
  //     - if no custom domain is used, this is the auto-assigned by netlify production url
  // - DEPLOY_URL:
  //     - i.e. `https://5b243e66dd6a547b4fee73ae--petsof.netlify.app`
  //     - is the immutable deplyment url.
  //     - changes on each deployment
  // - DEPLOY_PRIME_URL:
  //     - i.e. `https://deploy-preview-1--petsof.netlify.app`
  //     - is the deplyment url of the gruoup (deploy preview for the same PR keep the same url on new commits re-deploy, ...).
  //     - changes when the group changees

  // if we are on Netlify...
  if (processEnv.NETLIFY === 'true') {

    // ...and this git branch is PRODUCTION and we have a Netlify Production Url -> return it
    if (processEnv.BRANCH === 'main' && processEnv.URL) {
      return processEnv.URL;
    }

    // ...and this git branch is not main and we have a Netlify Deploy Preview or Branch Deploy Url -> return it
    if (processEnv.BRANCH !== 'main' && processEnv.DEPLOY_PRIME_URL) {
      return processEnv.DEPLOY_PRIME_URL;
    }
    if (processEnv.BRANCH !== 'main' && processEnv.DEPLOY_URL) {
      return processEnv.DEPLOY_URL;
    }
  }

  // if not deployed on Netlify -> return null
  return null;

};



// utils

function isBrowser() {
  return typeof window !== 'undefined';
}