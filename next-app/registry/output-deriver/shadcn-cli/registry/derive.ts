import { getRegistryInput } from '../../get-registry-input';
import { registrySchema } from './schema';

import { APP_BASE_URL } from '@/constants/server';

/**
 * Create a version of registry input, ready to be used as input for `shadcn cli` usage.  
 * This functions does the following:
 * - replace all occurrency of {{THIS_REGISTRY}} in with the url of the next app.
 */
export async function calculateRegistryForShadcnCli() {
  const registryInput = await getRegistryInput();

  const parsed = registrySchema.safeParse(registryInput);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return {
    ...parsed.data,
    items: parsed.data.items.map((item) => {
      return {
        ...item,
        registryDependencies: item.registryDependencies?.map((dep) => {
          return dep.replace("{{THIS_REGISTRY}}", `${APP_BASE_URL}/r`);
        })
      };
    })
  };
}


export type RegistryForShadcnCli = Awaited<ReturnType<typeof calculateRegistryForShadcnCli>>;