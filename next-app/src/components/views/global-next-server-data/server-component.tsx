import { createGlobalNextServerData } from "./data";
import { GlobalNextServerDataClientProvider } from "./client-component/provider";

/**
 * `React Server Component` - That fetches the global next app data (on the server) and render a client context provider.  
 * This global data is used in all pages, and doesn't change between page.
 */
export async function GlobalNextServerDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await createGlobalNextServerData();

  return (
    <GlobalNextServerDataClientProvider globalNextServerData={data}>
      {children}
    </GlobalNextServerDataClientProvider>
  );
}