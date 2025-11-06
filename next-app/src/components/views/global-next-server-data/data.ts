import "@/lib/utils/server-only";

import { getSidebarData } from "@/lib/registry/get-next-data";

/** 
 * Global next server data, used in all pages.  
 * This data is fetched in server component, and make available in all client component via react context 
 * */
export type GlobalNextServerData = Awaited<ReturnType<typeof createGlobalNextServerData>>;



export async function createGlobalNextServerData() {
  return {
    sidebarData: await getSidebarData(),
  };
}
