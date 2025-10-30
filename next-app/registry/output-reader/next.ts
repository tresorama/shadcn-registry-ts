import { OUTPUT_FILE_PATHS } from '../output-static-generator/config';

import type { RegistryForNext, RegistryForNextItem } from '../output-deriver/next/registry/types.registry';
import { calculateRegistryForNext } from "../output-deriver/next/registry/derive";
import type { StaticSidebarData } from "../output-deriver/next/sidebar/types";
import { calculateStaticSidebarData } from "../output-deriver/next/sidebar/derive";

import { getFileData } from "@/lib/utils/file";
import { createPerformanceTimer } from '@/lib/utils/performance-timer';

// exposed

export {
  type RegistryForNext,
  type RegistryForNextItem,
  type StaticSidebarData,
};


export const nextData = {
  getRegistry: async ({ readMode = 'compute' }: { readMode?: 'compute' | 'static'; }): Promise<RegistryForNext> => {
    if (readMode === 'compute') {
      const perfTimer = createPerformanceTimer();
      const data = await calculateRegistryForNext();
      console.log(`🔥 [nextData.getRegistry] (compute): calculated in ${perfTimer.getElapsedTime()} ms`);
      return data;
    }

    if (readMode === 'static') {
      const perfTimer = createPerformanceTimer();
      const fileData = await getFileData(OUTPUT_FILE_PATHS.REGISTRY_FOR_NEXT.REGISTRY);
      const jsObject = JSON.parse(fileData.fileContent) as RegistryForNext;
      console.log(`🔥 [nextData.getRegistry] (static): calculated in ${perfTimer.getElapsedTime()} ms`);
      return jsObject;
    }

    throw new Error(`getRegistry: readMode "${readMode}" not supported.`);
  },
  getSidebarData: async ({ readMode = 'compute' }: { readMode?: 'compute' | 'static'; }): Promise<StaticSidebarData> => {
    if (readMode === 'compute') {
      const perfTimer = createPerformanceTimer();
      const data = await calculateStaticSidebarData();
      console.log(`🔥 [nextData.getSidebarData] (compute): calculated in ${perfTimer.getElapsedTime()} ms`);
      return data;
    }

    if (readMode === 'static') {
      const perfTimer = createPerformanceTimer();
      const fileData = await getFileData(OUTPUT_FILE_PATHS.REGISTRY_FOR_NEXT.SIDEBAR);
      const jsObject = JSON.parse(fileData.fileContent) as StaticSidebarData;
      console.log(`🔥 [nextData.getSidebarData] (static): calculated in ${perfTimer.getElapsedTime()} ms`);
      return jsObject;
    }

    throw new Error(`[nextData.getSidebarData]: readMode "${readMode}" not supported.`);
  }
};