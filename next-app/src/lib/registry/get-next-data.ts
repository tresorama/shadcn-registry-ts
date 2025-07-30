import { cache } from 'react';

import { APP_DATA_MODE } from '@/constants/server';

import { generateStaticRegistryForNext, type RegistryForNext } from '#root/registry/output-generator/generate.static-registry-derivates';
import { generateStaticSidebarData, type StaticSidebarData } from '#root/registry/output-generator/generate.static-sidebar-data';

//  input

const getData = {
  registryForNext: cache(
    async () => {
      if (APP_DATA_MODE === 'compute') {
        return await generateStaticRegistryForNext();
      }
      if (APP_DATA_MODE === 'static') {
        // NOTE: 
        // Webpack/Turbopack, before the build process, statically anaylze every import, also dynamic `import()`, and :
        // - IF THE PATH IS A SINGLE STRING, like `'path/to/file'`, it check if file exists
        //   This lead to the error: "Cannot find module '#root/registry/output/static-registry.for-next-app.json'" if the file is not present.
        // - IF THE PATH IS A CONCAT STRING, like `'path/to' + 'file'`, it skips the check
        // So we "fake" the path to be dynamic splitting the string in two part (forcing resolution at build time).
        const path = '#root/registry/output/' + 'static-registry.for-next-app.json';
        return await import(path).then((m) => m.default as RegistryForNext);
      }
      throw new Error(`Invalid APP_DATA_MODE: ${APP_DATA_MODE}`);
    }
  ),
  sidebarData: cache(
    async () => {
      if (APP_DATA_MODE === 'compute') {
        return await generateStaticSidebarData();
      }
      if (APP_DATA_MODE === 'static') {
        // NOTE: 
        // Webpack/Turbopack, before the build process, statically anaylze every import, also dynamic `import()`, and :
        // - IF THE PATH IS A SINGLE STRING, like `'path/to/file'`, it check if file exists
        //   This lead to the error: "Cannot find module '#root/registry/output/static-sidebar-data.json'" if the file is not present.
        // - IF THE PATH IS A CONCAT STRING, like `'path/to' + 'file'`, it skips the check
        // So we "fake" the path to be dynamic splitting the string in two part (forcing resolution at build time).
        const path = '#root/registry/output/' + 'static-sidebar-data.json';
        return await import(path).then((m) => m.default as StaticSidebarData);
      }
      throw new Error(`Invalid APP_DATA_MODE: ${APP_DATA_MODE}`);
    }
  ),
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
