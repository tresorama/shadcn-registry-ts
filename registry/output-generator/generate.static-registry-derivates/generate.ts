import {
  calculateRegistryForShadcnCli,
  calculateRegistryForNext,
} from "./calculate-registry-data";
import { getFilePathFromRoot, writeFileJson } from "@/lib/utils/file";

const OUTPUT_FILE_PATHS = {
  FOR_SHADCN_CLI: getFilePathFromRoot('registry/output/static-registry.for-shadcn-cli.json'),
  FOR_NEXT_APP: getFilePathFromRoot('registry/output/static-registry.for-next-app.json'),
};

/** generate the registry used as input by shadcn cli */
export async function generateStaticRegistryForShadcnCli() {
  const registryForShadcnCli = await calculateRegistryForShadcnCli();
  await writeFileJson(OUTPUT_FILE_PATHS.FOR_SHADCN_CLI, registryForShadcnCli);
  return registryForShadcnCli;
}

/** generate the regitry used as input by next js app to render stuff */
export async function generateStaticRegistryForNext() {
  const registryForNext = await calculateRegistryForNext();
  await writeFileJson(OUTPUT_FILE_PATHS.FOR_NEXT_APP, registryForNext);
  return registryForNext;
}