'use client';

import { ctx, type GlobalServerNextData } from "./context";


/**
 * `React Client Component` - that holds the global next server data in a react context provider.
 */
export const GlobalNextServerDataClientProvider = ({
  globalNextServerData,
  children,
}: {
  globalNextServerData: GlobalServerNextData;
  children: React.ReactNode;
}) => {
  return (
    <ctx.Provider value={globalNextServerData}>
      {children}
    </ctx.Provider>
  );
};