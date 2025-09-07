import { generateStaticRegistryForNext } from "./registry/generate";
import { generateStaticSidebarData } from "./sidebar/generate";

export async function writeNextDataToDisk() {
  await generateStaticRegistryForNext({ saveAlsoToDisk: true });
  await generateStaticSidebarData({ saveAlsoToDisk: true });
}