'use client';

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxeIcon } from "lucide-react";

import { useGlobalNextServerData } from "@/components/views/global-next-server-data/client-component/context";
import { type GlobalNextServerData } from "@/components/views/global-next-server-data/data";


/**
 * `React Client Hook` - that returns command palette items
 */
export const useCommandItems = () => {
  // global data
  const { sidebarData } = useGlobalNextServerData();

  // router
  const router = useRouter();

  // data
  return useMemo(
    () => createRuntimeData(sidebarData, router),
    [sidebarData, router]
  );
};

// data mapper

type RuntimeData = {
  groups: CommandItemGroup[];
};

function createRuntimeData(
  staticSidebarData: GlobalNextServerData['sidebarData'],
  appRouter: AppRouterInstance
): RuntimeData {
  return {
    groups: createCommandItemsFromStaticData(staticSidebarData, appRouter),
  };
}

type CommandItemGroup = {
  label: string,
  items: Array<{
    icon: React.ReactNode,
    label: string,
    onClick: () => void,
  }>;
};

const createCommandItemsFromStaticData = (
  sidebarData: GlobalNextServerData['sidebarData'],
  appRouter: AppRouterInstance
): CommandItemGroup[] => {
  const groups: CommandItemGroup[] = sidebarData.pagesGroups.map(group => {
    return {
      label: group.label,
      items: group.pages.map(page => ({
        icon: <AxeIcon />,
        label: `${page.label}`,
        onClick: () => {
          appRouter.push(page.to);
        },
      }))
    };
  });
  return groups;
};
