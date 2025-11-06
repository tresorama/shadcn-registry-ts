export type StaticSidebarPage = {
  label: string;
  to: string;
  meta: {
    isNew: boolean;
  };
};
export type StaticSidebarPageGroup = {
  label: string;
  pages: StaticSidebarPage[];
};

export type StaticSidebarData = {
  pagesGroups: StaticSidebarPageGroup[];
};