'use client';

import { usePackageManager, type PackageManagerKey } from "./use-package-manager";

import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/shadcn/ui/button";
import { ButtonCopyToClipboard } from "@/components/mine/button-copy-to-clipboard";


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
        <ButtonCopyToClipboard
          text={activeOption.command}
          className="ml-auto text-muted-foreground"
        />
      </div>
      <p className="mt-4 px-3 pb-4 text-sm text-muted-foreground">
        <code>{activeOption.command}</code>
      </p>
    </div>
  );
};