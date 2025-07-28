import {
  calculateRegistryForShadcnCli,
} from "./calculate-registry-data";
import { getFilePathFromRoot, writeFileJson } from "@/lib/utils/file";

const OUTPUT_FILE_PATHS = {
  FOR_SHADCN_CLI: getFilePathFromRoot('registry/output/static-registry.for-shadcn-cli.json'),
};

/** generate the registry used as input by shadcn cli */
export async function generateStaticRegistryForShadcnCli() {
  const registryForShadcnCli = await calculateRegistryForShadcnCli();
  await writeFileJson(OUTPUT_FILE_PATHS.FOR_SHADCN_CLI, registryForShadcnCli);
  return registryForShadcnCli;
}
