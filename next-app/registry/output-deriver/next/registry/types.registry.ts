import { type RegistryInputJsonItem } from '../../get-registry-input.schema';

import type { PackageManagerKey } from './types.package-manager';

// for next

/**
 * Registry item used for rendering purpose in the `next app`.
 */
export type RegistryForNextItem = {
  /** direct copy from `registry.input.json` */
  name: RegistryInputJsonItem['name'],
  /** direct copy from `registry.input.json` */
  description: RegistryInputJsonItem['description'],
  /** direct copy from `registry.input.json` */
  title: RegistryInputJsonItem['title'],
  /** get file with content of file example (XXX.example.md) */
  fileExample: {
    /** File name. i.e. util-hello.example.md */
    fileName: string,
    /** File extension. i.e. md */
    fileExtension: string | null,
    /** content of file as markdown string */
    fileContent: string,
  },
  /** get file with content of file test (XXX.test.ts) */
  fileTest?: {
    /** File name. i.e. util-hello.test.ts */
    fileName: string,
    /** File extension. i.e. md */
    fileExtension: string | null,
    /** content of file as string */
    fileContent: string,
  },
  /** get file with content for every item `files` */
  filesWithContent: Array<NonNullable<RegistryInputJsonItem['files']>[number] & {
    /** File name. i.e. util-hello.ts */
    fileName: string,
    /** File extension. i.e. md */
    fileExtension: string | null,
    /** content of file as text */
    fileContent: string,
  }>,
  /**
   * single list with all dependencies.  
   * It is an array of items, where every item:
   * - has a `type` prop that indicate if the dep is derived from `registryDependencies` (type=`registry`) or `dependencies` (type=`npm`)
   * - has a `label` prop with the dep name. Replaced all occurrency of {{THIS_REGISTRY}} with the url of the next app.
   */
  allDependencies: Array<{
    type: 'registry' | 'npm';
    label: string;
  }>;
  /** create an array with all install commands for every package manager */
  installCommands: Array<{
    packageManager: PackageManagerKey,
    command: string;
  }>;
  /**
   * Indicate if the item is a new item
   */
  isNew: boolean;
};


/**
 * Regitry used for rendering purpose in the `next app`.  
 * This contains derived data ready for rendering.
 */
export type RegistryForNext = {
  items: Array<RegistryForNextItem>;
};