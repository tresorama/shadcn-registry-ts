'use client';

import { CopyIcon, CheckIcon, XIcon } from "lucide-react";

import { useCopyToClipboard } from "@/components/mine/hooks/use-copy-to-clipboard";

import { usePackageManager, type PackageManagerKey } from "./use-package-manager";

import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/shadcn/ui/button";


export const InstallCommand = ({
  options
}: {
  options: {
    packageManager: PackageManagerKey,
    command: string;
  }[];
}) => {

  // global state
  const { packageManager, setPackageManager } = usePackageManager();

  // util - copy
  const copyToClipboard = useCopyToClipboard();

  // local state
  const activeOption = options.find((option) => option.packageManager === packageManager);
  if (!activeOption) {
    throw new Error(`Invalid package manager: ${packageManager}`);
  }

  return (
    <div className="rounded-xl border">
      <div className="px-2 pt-2 flex gap-1">
        {options.map(option => (
          <Button
            key={option.packageManager}
            onClick={() => setPackageManager(option.packageManager)}
            variant="ghost"
            size="sm"
            className={cn(
              activeOption.packageManager === option.packageManager && "bg-muted"
            )}
          >
            {option.packageManager}
          </Button>
        ))}

        <Button
          onClick={() => copyToClipboard.copyText(activeOption.command)}
          variant="outline"
          size="icon"
          className={cn(
            "ml-auto",
            copyToClipboard.status === 'success' && "pointer-events-none"
          )}
        >
          {
            copyToClipboard.status === 'success' ? <CheckIcon className="text-green-400" />
              : copyToClipboard.status === 'error' ? <XIcon className="text-red-400" />
                : <CopyIcon />
          }
        </Button>
      </div>
      <p className="mt-4 px-3 pb-4 text-sm text-muted-foreground">
        <code>{activeOption.command}</code>
      </p>
    </div>
  );
};