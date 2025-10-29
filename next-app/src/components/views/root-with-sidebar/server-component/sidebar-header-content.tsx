import Link from "next/link";
import { SiGithub as GithubIcon } from '@icons-pack/react-simple-icons';

import { SearchHint } from "@/components/views/command-palette/client-component/search-hint";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/shadcn/ui/sidebar";
import { Button } from "@/components/shadcn/ui/button";
import { ModeToggle } from "@/components/shadcn/mode-toggle";

const LINKS = {
  githubRepo: "https://github.com/tresorama/shadcn-registry-ts",
};


export const SidebarHeaderContent = () => {
  return (
    <>
      <SidebarMenu className="flex flex-row justify-between items-center">
        {/* Go To Home button */}
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
        {/* Github Link Button */}
        <GithubLink />
        {/* Color Mode Toggler Button */}
        <ModeToggle />
        {/* Sidebar Toggler Button */}
        <SidebarTrigger />
      </SidebarMenu>
      <div className="px-1 pb-2">
        <SearchHint />
      </div>
    </>
  );
};

const GithubLink = () => (
  <Button
    variant="ghost"
    size="icon-sm"
    asChild
  >
    <Link
      href={LINKS.githubRepo}
      target="_blank"
    >
      <GithubIcon />
      <span className="sr-only">Github</span>
    </Link>
  </Button>
);

