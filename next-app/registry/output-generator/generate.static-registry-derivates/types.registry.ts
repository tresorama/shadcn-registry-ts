import {
  // type Registry as ShadcnRegistry,
  type RegistryItem as ShadcnRegistryItem,
} from 'shadcn/registry';
import type { PackageManagerKey } from './types.package-manager';


// for shadcn cli

/// TODO


// for next

/**
 * Registry item used for rendering purpose in the `next app`.
 */
export type RegistryForNextItem = {
  /** direct copy from `registry.input.json` */
  name: ShadcnRegistryItem['name'],
  /** direct copy from `registry.input.json` */
  description: ShadcnRegistryItem['description'],
  /** direct copy from `registry.input.json` */
  title: ShadcnRegistryItem['title'],
  /** get file with content of file example (XXX.example.md) */
  fileExample: {
    /** File name. i.e. util-hello.example.md */
    fileName: string,
    /** content of file as markdown string */
    fileContent: string,
  },
  /** get file with content of file test (XXX.test.ts) */
  fileTest?: {
    /** File name. i.e. util-hello.test.ts */
    fileName: string,
    /** content of file as string */
    fileContent: string,
  },
  /** get file with content for every item `files` */
  filesWithContent: Array<NonNullable<ShadcnRegistryItem['files']>[number] & {
    /** File name. i.e. util-hello.ts */
    fileName: string,
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
};


/**
 * Regitry used for rendering purpose in the `next app`.  
 * This contains derived data ready for rendering.
 */
export type RegistryForNext = {
  items: Array<RegistryForNextItem>;
};