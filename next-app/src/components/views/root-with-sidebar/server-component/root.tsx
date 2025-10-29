import { SidebarHeaderContent } from "./sidebar-header-content";
import { SidebarNav } from "../client-component/sidebar-nav";
import { SidebarInsetHeader } from "../client-component/sidebar-inset-header";

import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/shadcn/ui/sidebar";

/**
 * `React Server Component` - A component that render the sidebar and the main content
 */
export async function RootWithSidebar({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarHeaderContent />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <SidebarInset className="h-dvh overflow-hidden">
        <div className="w-full h-full flex flex-col">
          <SidebarInsetHeader />
          <div className="flex-1 min-h-0">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
