import Link from "next/link";
// import { BoxIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/shadcn/ui/sidebar";
import { ModeToggle } from "@/components/shadcn/mode-toggle";

export const SidebarHeaderContent = () => {
  return (
    <>
      <SidebarMenu className="flex flex-row justify-between items-center">
        <SidebarMenuItem className="flex-1">
          <SidebarMenuButton size="lg" asChild>
            <Link href="/">
              {/* <div className="flex aspect-square size-8 items-center justify-center"> */}
              {/* <BoxIcon className="ml-1 size-4" /> */}
              {/* </div> */}
              {/* <div className="flex flex-col gap-0.5"> */}
              <span className="text-sm font-semibold leading-none">tresorama ts utils</span>
              {/* </div> */}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <ModeToggle />
        <SidebarTrigger />
      </SidebarMenu>
    </>
  );
};