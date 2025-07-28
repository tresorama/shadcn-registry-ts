'use client';

import Link from "next/link";

import { useSidebarNavData } from "./use-sidebar-nav-data";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/shadcn/ui/sidebar";

// component



export const SidebarNav = () => {
  const { pagesGroups } = useSidebarNavData();
  const sidebar = useSidebar();

  return (
    pagesGroups.map((group) => (
      <SidebarGroup key={group.label}>
        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {group.pages.map((page) => (
              <SidebarMenuItem key={page.label}>
                <SidebarMenuButton
                  asChild
                  isActive={page.isActive}
                  onClick={() => {
                    if (sidebar.isMobile) {
                      sidebar.setOpen(false);
                    }
                  }}
                >
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

