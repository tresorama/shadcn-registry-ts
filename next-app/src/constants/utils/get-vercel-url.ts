
/** Get deploy vercel url if this app is built on vercel, or null otherwise */
export const getVercelUrl = () => {

  // NOTE:
  // - VERCEL=1 if deployed on vercel
  // - VERCEL_GIT_COMMIT_REF:
  //     - i.e. `main`
  //     - is the git branch of the deployment
  // - VERCEL_URL:
  //     - i.e. `my-project-4535c432342x4234.vercel.app`
  //     - is the immutable deplyment url.
  //     - changes on each deployment
  // - VERCEL_PROJECT_PRODUCTION_URL:
  //     - i.e. `my-project.vercel.app`
  //     - is the fixed production url of the project on Vercel
  //     - does not change across deployments
  //     - if custom domain is used, this is the custom domain
  //     - if no custom domain is used, this is the auto-assigned by vercel production url

  // if we are on vercel...
  if (process.env.VERCEL === '1') {

    // ...and this git branch is main and we have a vercel production url...
    if (process.env.VERCEL_GIT_COMMIT_REF === 'main' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    // ...and this git branch is not main and we have a vercel deployment url...
    if (process.env.VERCEL_GIT_COMMIT_REF !== 'main' && process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
  }

  return null;

};