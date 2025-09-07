import { calculateStaticSidebarData } from "./derive";
import { getFilePathFromRoot, writeFileJson } from "@/lib/utils/file";

const OUTPUT_FILE_PATH = {
  SIDEBAR: getFilePathFromRoot('registry/output/next/static-sidebar-data.json'),
};

export type { StaticSidebarData } from './types';

/**
 * Generate and return {@link StaticSidebarData}, the Sidebar data used as input by Next.js app to render stuff.  
 * If you pass `saveAlsoToDisk: true`, internally also save it to disk the generated data.
 */
export async function generateStaticSidebarData({
  saveAlsoToDisk = false,
}: {
  saveAlsoToDisk?: boolean;
}) {
  const finalJson = calculateStaticSidebarData();
  if (saveAlsoToDisk) {
    await writeFileJson(OUTPUT_FILE_PATH.SIDEBAR, finalJson);
  }
  return finalJson;
}