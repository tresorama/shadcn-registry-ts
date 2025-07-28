'use client';

import { Fragment } from "react";
import Link from "next/link";

import { useSidebarNavData } from "./use-sidebar-nav-data";

import { useSidebar, SidebarTrigger } from "@/components/shadcn/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/shadcn/ui/breadcrumb";

export const SidebarInsetHeader = () => {
  return (
    <div className="h-16 w-full px-4 flex items-center gap-4 bg-sidebar border-b">
      <SidebarToggler />
      <PageBreadcrumb />
    </div>
  );
};


const SidebarToggler = () => {
  const sidebar = useSidebar();
  if (!sidebar.isMobile && sidebar.open) return null;
  return (
    <div className="animate-in fade-in">
      <SidebarTrigger />
    </div>
  );
};

const PageBreadcrumb = () => {
  const { activePage } = useSidebarNavData();

  if (!activePage) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activePage.parts.map((part, index) => (
          <Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {part.isActive ? (
                <BreadcrumbPage>{part.label}</BreadcrumbPage>
              ) : part.to ? (
                <BreadcrumbLink asChild>
                  <Link href={part.to}>{part.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink className="cursor-not-allowed">{part.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

