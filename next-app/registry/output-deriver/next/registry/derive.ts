import {
  // type Registry as ShadcnRegistry,
  type RegistryItem as ShadcnRegistryItem,
} from 'shadcn/registry';

import type { RegistryForNext, RegistryForNextItem } from './types.registry';
import { getRegistryInput } from '../../get-registry-input';

import { APP_BASE_URL } from '@/constants/server';
import { getFileData, getFilePathFromRoot } from "@/lib/utils/file";


/**
 * Create a version of registry ready for rendering in the `next app`.  
 * This functions return {@link RegistryForNext}
 */
export async function calculateRegistryForNext(): Promise<RegistryForNext> {
  const registryInput = await getRegistryInput();

  // 1. create augmented items
  const items = await Promise.all(
    registryInput.items.map(async (item) => calculateRegistryForNextItem(item))
  );

  return {
    items,
  };

};

/**
 * Create a version of registry item ready for rendering in the `next app.  
 * This functions return {@link RegistryForNextItem}
 * @param item registry item as it comes from the `registry.input.json`
 */
async function calculateRegistryForNextItem(item: ShadcnRegistryItem): Promise<RegistryForNextItem> {

  // ensure that at least one "file" is present
  if (!item.files?.length) {
    throw new Error("Item has no files.");
  }

  // get file with content of every "files" of the item
  const filesWithContent: RegistryForNextItem['filesWithContent'] = await Promise.all(
    (item.files ?? []).map(async (file) => {
      const fileData = await getFileData(getFilePathFromRoot(file.path));
      return {
        ...file,
        fileName: fileData.fileName,
        fileContent: fileData.fileContent,
      } satisfies RegistryForNextItem['filesWithContent'][number];
    })
  );

  // get file example
  const fileExamplePath = item.files[0].path.replace('.ts', '.example.md');
  const fileExample: RegistryForNextItem['fileExample'] = await getFileData(getFilePathFromRoot(fileExamplePath))
    .then(fileData => ({
      fileName: fileData.fileName,
      fileContent: fileData.fileContent,
    }));

  // get (if present) file test
  const fileTestPath = item.files[0].path.replace('.ts', '.test.ts');
  let fileTest: RegistryForNextItem['fileTest'] | undefined;
  try {
    const fileData = await getFileData(getFilePathFromRoot(fileTestPath));
    fileTest = {
      fileName: fileData.fileName,
      fileContent: fileData.fileContent,
    };
  } catch (error) {
    // fail silently because test file is optional

  }

  // calculate all dependencies in a single list
  const allDependencies: RegistryForNextItem['allDependencies'] = [
    ...(item.registryDependencies ?? []).map((dep) => ({ label: dep, type: 'registry' } as const)),
    ...(item.dependencies ?? []).map((dep) => ({ label: dep, type: 'npm' } as const)),
  ].map((dep) => ({ ...dep, label: dep.label.replace('{{THIS_REGISTRY}}', `${APP_BASE_URL}/r`) }));

  // calculate install commands
  // NOTE: 
  // A template string, where {{ITEM_NAME}} will be replaced with the name of the registry item. 
  // This is the URL of the registry item for the shadcn cli install command."
  const itemRegistryUrlTemplate = `${APP_BASE_URL}/r/{{ITEM_NAME}}.json`;
  const installCommands: RegistryForNextItem['installCommands'] = [
    { packageManager: "npm", command: `npx shadcn@latest add ${itemRegistryUrlTemplate.replace('{{ITEM_NAME}}', item.name)}` },
    { packageManager: "yarn", command: `yarn shadcn@latest add ${itemRegistryUrlTemplate.replace('{{ITEM_NAME}}', item.name)}` },
    { packageManager: "pnpm", command: `pnpm dlx shadcn@latest add ${itemRegistryUrlTemplate.replace('{{ITEM_NAME}}', item.name)}` },
    { packageManager: "bun", command: `bunx --bun shadcn@latest add ${itemRegistryUrlTemplate.replace('{{ITEM_NAME}}', item.name)}` },
  ];

  // return
  return {
    name: item.name,
    description: item.description,
    title: item.title,
    filesWithContent,
    fileExample,
    fileTest,
    allDependencies,
    installCommands,
  };
}

