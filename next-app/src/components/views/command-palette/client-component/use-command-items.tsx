'use client';

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxeIcon } from "lucide-react";

import { useGlobalNextServerData, type GlobalServerNextData } from "@/components/views/global-next-server-data/client-component/context";


/**
 * `React Client Hook` - that returns command palette items
 */
export const useCommandItems = () => {
  // global data
  const { sidebarData } = useGlobalNextServerData();

  // router
  const router = useRouter();

  // data
  const items = useMemo(() => createCommandItemsFromStaticData(sidebarData, router), [sidebarData, router]);
  return items;
};

// data mapper

type CommandItemGroup = {
  label: string,
  items: Array<{
    icon: React.ReactNode,
    label: string,
    onClick: () => void,
  }>;
};

const createCommandItemsFromStaticData = (
  sidebarData: GlobalServerNextData['sidebarData'],
  appRouter: AppRouterInstance
): CommandItemGroup[] => {
  const groups = sidebarData.pagesGroups.map(group => {
    return {
      label: group.label,
      items: group.pages.map(page => ({
        icon: <AxeIcon />,
        label: `${page.label}`,
        onClick: () => {
          appRouter.push(page.to);
        },
      }))
    } satisfies CommandItemGroup;
  });
  return groups;
};
