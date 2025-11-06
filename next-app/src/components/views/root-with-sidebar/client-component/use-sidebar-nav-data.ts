'use client';

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { useGlobalNextServerData } from "@/components/views/global-next-server-data/client-component/context";
import { type GlobalNextServerData } from "@/components/views/global-next-server-data/data";

/**
 * `React Client Hook` - that returns sidebar navigation data with runtime data
 */
export const useSidebarNavData = (): RuntimeSidebarNavData => {
  const { sidebarData } = useGlobalNextServerData();
  const pathname = usePathname();

  return useMemo(
    () => createRuntimeData(sidebarData, pathname),
    [sidebarData, pathname]
  );
};



// data mappers

type StaticSidebarNavData = GlobalNextServerData['sidebarData'];
type RuntimeSidebarNavData = ReturnType<typeof createRuntimeData>;

function createRuntimeData(sidebarData: StaticSidebarNavData, pathname: string) {
  return {
    pagesGroups: sidebarData.pagesGroups.map(group => convertStaticPagesGroupToRuntime(group, pathname)),
    activePage: calculateActivePage(sidebarData.pagesGroups, pathname)
  };
}





type StaticSidebarPageGroup = GlobalNextServerData['sidebarData']['pagesGroups'][number];
type StaticSidebarPage = StaticSidebarPageGroup['pages'][number];

type RuntimeSidebarPage = StaticSidebarPage & { isActive: boolean; };
type RuntimeSidebarPageGroup = Omit<StaticSidebarPageGroup, 'pages'> & { pages: RuntimeSidebarPage[]; };

const convertStaticPagesGroupToRuntime = (group: StaticSidebarPageGroup, pathname: string): RuntimeSidebarPageGroup => {
  return {
    ...group,
    pages: group.pages.map(page => {
      return {
        ...page,
        isActive: page.to === pathname
      };
    })
  };
};

type ActivePage = {
  parts: Array<{
    label: string,
    isActive: boolean,
    to?: string,
  }>;
};
const calculateActivePage = (groups: StaticSidebarPageGroup[], pathname: string): ActivePage | null => {
  for (const group of groups) {
    for (const page of group.pages) {
      if (page.to === pathname) {
        return {
          parts: [
            // { label: 'Home', to: '/', isActive: false },
            { label: group.label, isActive: false },
            { label: page.label, to: page.to, isActive: true },
          ]
        };
      }
    }
  }
  return null;
};


