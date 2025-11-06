import "@/lib/utils/server-only";

import { cache } from 'react';

import { APP_DATA_MODE } from '@/constants/server';

import { nextData } from '#root/registry/output-reader/next';
import type { PackageManagerKey } from '#root/registry/output-deriver/next/registry/types.package-manager';

//  input

const getInputData = {
  registryForNext: cache(async () => nextData.getRegistry({ readMode: APP_DATA_MODE })),
  sidebarData: cache(async () => nextData.getSidebarData({ readMode: APP_DATA_MODE })),
};


// output 

export type NextData = {
  registryItemNames: Awaited<ReturnType<typeof getRegistryItemNames>>,
  registryItem: Awaited<ReturnType<typeof getRegistryItemByName>>,
  sidebarData: Awaited<ReturnType<typeof getSidebarData>>,
};

export {
  type PackageManagerKey,
};


/**
 * Get all registry item names.  
 * Read from registry for next app.
 */
export const getRegistryItemNames = cache(
  async () => {
    const registry = await getInputData.registryForNext();
    return registry.items.map((item) => item.name);
  }
);

/**
 * Get registry item data by name.  
 * Read from registry for next app.
 */
export const getRegistryItemByName = cache(
  async (itemName: string) => {
    const registry = await getInputData.registryForNext();
    const item = registry.items.find((item) => item.name === itemName);
    if (!item) return null;
    return item;
  },
);

export const getSidebarData = cache(
  async () => getInputData.sidebarData()
);
