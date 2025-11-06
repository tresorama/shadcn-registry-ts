'use client';

import { ctx } from "./context";
import type { GlobalNextServerData } from "../data";

/**
 * `React Client Component` - that holds the global next server data in a react context provider.
 */
export const GlobalNextServerDataClientProvider = ({
  globalNextServerData,
  children,
}: {
  globalNextServerData: GlobalNextServerData;
  children: React.ReactNode;
}) => {
  return (
    <ctx.Provider value={globalNextServerData}>
      {children}
    </ctx.Provider>
  );
};