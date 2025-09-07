import { calculateRegistryForShadcnCli } from "./derive";

import { getFilePathFromRoot, writeFileJson } from "@/lib/utils/file";

const OUTPUT_FILE_PATHS = {
  REGISTRY: getFilePathFromRoot('registry/output/shadcn-cli/static-registry.json'),
};

/**
 * Generate and return the regitry used as input by shadcn cli to generate registry.  
 * If you pass `saveAlsoToDisk: true`, internally also save it to disk.
 */
export async function generateStaticRegistryForShadcnCli({
  saveAlsoToDisk = false,
}: {
  saveAlsoToDisk?: boolean;
}) {
  const registryForShadcnCli = await calculateRegistryForShadcnCli();
  if (saveAlsoToDisk) {
    await writeFileJson(OUTPUT_FILE_PATHS.REGISTRY, registryForShadcnCli);
  }
  return registryForShadcnCli;
}
