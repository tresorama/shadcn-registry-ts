import { registrySchema } from "shadcn/registry";

import { getFileData, getFilePathFromRoot } from "@/lib/utils/file";

const FILE_PATHS = {
  REGISTRY_INPUT: getFilePathFromRoot('registry/input/registry.input.json'),
};

/** 
 * Get the content of JSON file `registry.input.json` .  
 * This file is not ready for direct usage with `shadcn cli` or in the `next app` (for rendering).  
 * It needs to be manipulated first with `calculateRegistryForXXX` functions and saving the output to new JSON files
 * */
export const getRegistryInput = async () => {

  const registryInputJson = await getFileData(FILE_PATHS.REGISTRY_INPUT)
    .then(fileData => JSON.parse(fileData.fileContent));

  const parsed = registrySchema.safeParse(registryInputJson);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};