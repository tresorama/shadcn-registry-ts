import { registrySchema } from "shadcn/registry";
import registryInputJson from '#root/registry/input/registry.input.json';

/** 
 * Get the content of JSON file `registry.input.json` .  
 * This file is not ready for direct usage with `shadcn cli` or in the `next app` (for rendering).  
 * It needs to be manipulated first with `calculateRegistryForXXX` functions and saving the output to new JSON files
 * */
export const getRegistryInput = () => {

  const parsed = registrySchema.safeParse(registryInputJson);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};