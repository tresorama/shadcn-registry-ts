import { generateStaticRegistryForShadcnCli } from "./registry/generate";

export async function writeShadcnCliDataToDisk() {
  await generateStaticRegistryForShadcnCli({ saveAlsoToDisk: true });
}