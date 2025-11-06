'use client';

import { createContext, useContext } from "react";

import type { GlobalNextServerData } from "../data";

/** React Context (client) that holds the global next server data, received from the server */
export const ctx = createContext<GlobalNextServerData>({} as GlobalNextServerData);

/** `React Client Hook` - that returns the global next server data */
export const useGlobalNextServerData = () => {
  const data = useContext(ctx);
  if (!data) {
    throw new Error("useGlobalNextServerData must be used within a GlobalNextServerDataClientProvider.");
  }
  return data;
};
