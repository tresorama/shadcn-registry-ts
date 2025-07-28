"use client";

import { Fragment, useEffect } from "react";
import { useAtom } from "jotai";

import { atomIsCommandPaletteOpen } from "./state";
import { useCommandItems } from "./use-command-items";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/shadcn/ui/command";


// keybindings

const KEYBINDING = {
  toggle: (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      return true;
    }
    return false;
  }
};

/**
 * `React Client Component` - The command palette used for search. Triggered by `⌘K` or click on `SearchHint`
 */
export const CommandPalette = () => {
  // global state
  const [isOpen, setIsOpen] = useAtom(atomIsCommandPaletteOpen);

  // local state
  const itemsGroups = useCommandItems();

  // on key press -> open dialog
  useEffect(
    () => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (KEYBINDING.toggle(e)) {
          e.preventDefault();
          setIsOpen((isOpen) => !isOpen);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    [setIsOpen]
  );

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Type an utilities name..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {itemsGroups.map((group, groupIndex) => (
          <Fragment key={group.label}>
            {groupIndex > 0 && <CommandSeparator />}
            <CommandGroup heading={group.label}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.label}
                  onSelect={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

