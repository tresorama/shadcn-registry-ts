import MAP_CATEGORY_TO_LABEL from "#root/registry/input/config/sidebar-page-groups-map.json";

import type { StaticSidebarData, StaticSidebarPageGroup } from "./types";

import { getRegistryInput } from "../../get-registry-input";

export const calculateStaticSidebarData = async (): Promise<StaticSidebarData> => {
  const regitryInput = await getRegistryInput();

  // build page groups (as js object)
  const pagesGroupsMap: Record<string, StaticSidebarPageGroup> = {};
  regitryInput.items.forEach((item) => {

    // get group key from item
    const groupKey = item.categories?.[0];
    if (!groupKey) {
      throw new Error(`Item ${item.name} has no category.`);
    }

    // derive group label
    // @ts-expect-error ts don't allow unknown properties
    const groupLabel = MAP_CATEGORY_TO_LABEL.map[groupKey];
    if (!groupLabel) {
      throw new Error(`Item ${item.name} has unknown category with key "${groupKey}". Known categories: ${Object.keys(MAP_CATEGORY_TO_LABEL.map).join(", ")}.`);
    }

    // create group if not exists
    if (!(groupKey in pagesGroupsMap)) {
      pagesGroupsMap[groupKey] = {
        label: groupLabel,
        pages: []
      };
    }

    // derive item and save in group
    if (!item.title) {
      throw new Error(`Item ${item.name} has no title.`);
    }
    pagesGroupsMap[groupKey].pages.push({
      label: item.title,
      to: `/item/${item.name}`,
    });
  });

  // derive pages groups (as js array)
  const pagesGroups: StaticSidebarPageGroup[] = Object.values(pagesGroupsMap);

  // return
  const finalJson: StaticSidebarData = {
    pagesGroups,
  };
  return finalJson;
};