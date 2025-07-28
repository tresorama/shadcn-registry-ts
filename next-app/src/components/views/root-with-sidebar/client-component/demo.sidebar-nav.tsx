'use client';

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/shadcn/ui/sidebar";

const getSidebarPages = (pathname: string) => {
  type Page = {
    label: string;
    to: string;
    isActive: boolean;
  };
  type PageGroup = {
    label: string;
    pages: Page[];
  };
  const pageGroups: PageGroup[] = [
    {
      label: 'Pages',
      pages: [
        { label: "Home", to: "/", isActive: pathname === "/" },
        { label: "Layout Red - Page A", to: "/page-a", isActive: pathname === "/page-a", },
        { label: "Layout Red - Page B", to: "/page-b", isActive: pathname === "/page-b" },
      ]
    },
  ];

  return pageGroups;
};

const useDemoSidebarPages = () => {
  const pathname = usePathname();
  return useMemo(
    () => ({
      pagesGroups: getSidebarPages(pathname),
    }),
    [pathname]
  );
};

export const DemoSidebarNav = () => {
  const { pagesGroups } = useDemoSidebarPages();

  return (
    pagesGroups.map((group) => (
      <SidebarGroup key={group.label}>
        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {group.pages.map((page) => (
              <SidebarMenuItem key={page.label}>
                <SidebarMenuButton asChild isActive={page.isActive}>
                  <Link href={page.to}>{page.label}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ))
  );
};
