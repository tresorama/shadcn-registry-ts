import { cache } from 'react';

import { APP_DATA_MODE } from '@/constants/server';

import { generateStaticRegistryForNext, type RegistryForNext } from '#root/registry/output-generator/generate.static-registry-derivates';
import { generateStaticSidebarData, type StaticSidebarData } from '#root/registry/output-generator/generate.static-sidebar-data';

//  input

const getData = {
  registryForNext: async () => {
    if (APP_DATA_MODE === 'static') {
      return await import('#root/registry/output/static-registry.for-next-app.json').then((m) => m.default as RegistryForNext);
    }
    if (APP_DATA_MODE === 'compute') {
      return await generateStaticRegistryForNext();
    }
    throw new Error(`Invalid APP_DATA_MODE: ${APP_DATA_MODE}`);
  },
  sidebarData: async () => {
    if (APP_DATA_MODE === 'static') {
      return await import('#root/registry/output/static-sidebar-data.json').then((m) => m.default as StaticSidebarData);
    }
    if (APP_DATA_MODE === 'compute') {
      return await generateStaticSidebarData();
    }
    throw new Error(`Invalid APP_DATA_MODE: ${APP_DATA_MODE}`);
  },
};


// output 

export type NextData = {
  registryItemNames: Awaited<ReturnType<typeof getRegistryItemNames>>,
  registryItem: Awaited<ReturnType<typeof getRegistryItemByName>>,
  sidebarData: Awaited<ReturnType<typeof getSidebarData>>,
};


/**
 * Get all registry item names.  
 * Read from registry for next app.
 */
export const getRegistryItemNames = cache(
  async () => {
    const registry = await getData.registryForNext();
    return registry.items.map((item) => item.name);
  }
);

/**
 * Get registry item data by name.  
 * Read from registry for next app.
 */
export const getRegistryItemByName = cache(
  async (itemName: string) => {
    const registry = await getData.registryForNext();
    const item = registry.items.find((item) => item.name === itemName);
    if (!item) return null;
    return item;
  },
);

export const getSidebarData = cache(
  async () => {
    const data = await getData.sidebarData();
    return data;
  }
);
