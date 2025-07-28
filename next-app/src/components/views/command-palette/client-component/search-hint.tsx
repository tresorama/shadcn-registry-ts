'use client';

import { useSetAtom } from "jotai";
import { SearchIcon } from "lucide-react";

import { atomIsCommandPaletteOpen } from "./state";

import { Badge } from "@/components/shadcn/ui/badge";
import { CommandShortcut } from "@/components/shadcn/ui/command";

/**
 * `React Client Component` - Component that shows a dummy search input, when clicked opens `CommandPalette`
 */
export const SearchHint = () => {
  // global state
  const setIsCommandPaletteOpen = useSetAtom(atomIsCommandPaletteOpen);

  return (
    <div
      onClick={() => setIsCommandPaletteOpen(prev => !prev)}
      className="min-h-8 px-2 pr-1 py-1.5 flex justify-between items-center gap-1 bg-muted text-muted-foreground/70 rounded-md"
    >
      <div className="inline-flex items-center gap-1.5">
        <SearchIcon className="size-4" />
        <span className="max-md:min-w-[7ch] text-xs/none min-w-[16ch]">Search</span>
      </div>
      <Badge variant="outline" className="max-md:hidden px-1.5 py-1 bg-background">
        <CommandShortcut className="text-[0.7rem]/none">⌘K</CommandShortcut>
      </Badge>
    </div>
  );
};