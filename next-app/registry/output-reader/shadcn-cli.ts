import { OUTPUT_FILE_PATHS } from '../output-static-generator/config';

import { calculateRegistryForShadcnCli, type RegistryForShadcnCli } from '../output-deriver/shadcn-cli/registry/derive';

import { getFileData } from '@/lib/utils/file';
import { createPerformanceTimer } from '@/lib/utils/performance-timer';

// exposed

export {
  type RegistryForShadcnCli,
};

export const shadcnCliData = {
  getRegistry: async ({ readMode = 'compute' }: { readMode?: 'compute' | 'static'; }): Promise<RegistryForShadcnCli> => {
    if (readMode === 'compute') {
      const perfTimer = createPerformanceTimer();
      const data = await calculateRegistryForShadcnCli();
      console.log(`🔥 [shadcnCliData.getRegistry] (compute): calculated in ${perfTimer.getElapsedTime()} ms`);
      return data;
    }

    if (readMode === 'static') {
      const perfTimer = createPerformanceTimer();
      const fileData = await getFileData(OUTPUT_FILE_PATHS.REGISTRY_FOR_SHADCN_CLI.REGISTRY);
      const jsObject = JSON.parse(fileData.fileContent) as RegistryForShadcnCli;
      console.log(`🔥 [shadcnCliData.getRegistry] (static): calculated in ${perfTimer.getElapsedTime()} ms`);
      return jsObject;
    }

    throw new Error(`[shadcnCliData.getRegistry]: readMode "${readMode}" not supported.`);
  },
};