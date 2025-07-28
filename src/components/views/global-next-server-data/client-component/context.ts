'use client';

import { createContext, useContext } from "react";

import type { NextData } from "@/lib/registry/get-next-data";


/** 
 * Global next server data, used in all pages.  
 * This data is fetched in server component, and make available in all client component via react context 
 * */
export type GlobalServerNextData = {
  sidebarData: NextData['sidebarData'],
};

/** React Context (client) that holds the global next server data, received from the server */
export const ctx = createContext<GlobalServerNextData>({} as GlobalServerNextData);

/** `React Client Hook` - that returns the global next server data */
export const useGlobalNextServerData = () => {
  const data = useContext(ctx);
  if (!data) {
    throw new Error("useGlobalNextServerData must be used within a GlobalNextServerDataClientProvider.");
  }
  return data;
};
