import { calculateStaticSidebarData } from "./calculate-sidebar-data";
import { getFilePathFromRoot, writeFileJson } from "@/lib/utils/file";

const OUTPUT_FILE_PATH = getFilePathFromRoot('registry/output/static-sidebar-data.json');

export async function generateStaticSidebarData() {
  const finalJson = calculateStaticSidebarData();
  await writeFileJson(OUTPUT_FILE_PATH, finalJson);
  return finalJson;
}