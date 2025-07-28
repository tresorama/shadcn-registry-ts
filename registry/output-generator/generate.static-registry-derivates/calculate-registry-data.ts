import { getRegistryInput } from '../utils/get-registry-input';

import { APP_BASE_URL } from '@/constants/server';


// for shadcn cli

/**
 * Create a version of registry input, ready to be used as input for `shadcn cli` usage.  
 * This functions does the following:
 * - replace all occurrency of {{THIS_REGISTRY}} in with the url of the next app.
 */
export async function calculateRegistryForShadcnCli() {
  const registryInput = getRegistryInput();
  return {
    ...registryInput,
    items: registryInput.items.map((item) => {
      return {
        ...item,
        registryDependencies: item.registryDependencies?.map((dep) => {
          return dep.replace("{{THIS_REGISTRY}}", `${APP_BASE_URL}/r`);
        })
      };
    })
  };
}

