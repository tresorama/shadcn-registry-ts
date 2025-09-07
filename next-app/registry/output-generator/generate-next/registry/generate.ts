import { calculateRegistryForNext } from "./derive";

import { getFilePathFromRoot, writeFileJson } from "@/lib/utils/file";

const OUTPUT_FILE_PATHS = {
  REGISTRY: getFilePathFromRoot('registry/output/next/static-registry.json'),
};

export type { RegistryForNext, RegistryForNextItem } from './types.registry';

/** 
 * Generate and return {@link RegistryForNext}, the Registry used as input by Next.js app to render stuff.  
 * If you pass `saveAlsoToDisk: true`, internally also save it to disk the generated registry.
 */
export async function generateStaticRegistryForNext({
  saveAlsoToDisk = false,
}: {
  saveAlsoToDisk?: boolean;
}) {
  const registryForNext = await calculateRegistryForNext();
  if (saveAlsoToDisk) {
    await writeFileJson(OUTPUT_FILE_PATHS.REGISTRY, registryForNext);
  }
  return registryForNext;
}
