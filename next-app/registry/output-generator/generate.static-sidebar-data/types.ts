export type StaticSidebarPage = {
  label: string;
  to: string;
};
export type StaticSidebarPageGroup = {
  label: string;
  pages: StaticSidebarPage[];
};

export type StaticSidebarData = {
  pagesGroups: StaticSidebarPageGroup[];
};