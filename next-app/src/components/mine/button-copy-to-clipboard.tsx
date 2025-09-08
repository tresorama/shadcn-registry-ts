'use client';

import { CheckIcon, CopyIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/shadcn/ui/button";
import { useCopyToClipboard } from "@/components/mine/hooks/use-copy-to-clipboard";


export const ButtonCopyToClipboard = ({
  text,
  variant,
  className,
}: {
  text: string,
  className?: React.ComponentProps<'button'>['className'],
  variant?: React.ComponentProps<typeof Button>['variant'],
}) => {
  // util - copy
  const copyToClipboard = useCopyToClipboard();

  return (
    <Button
      onClick={() => copyToClipboard.copyText(text)}
      size="icon"
      variant={variant ?? "outline"}
      className={cn(
        copyToClipboard.status === 'success' && "pointer-events-none",
        className,
      )}
    >
      {
        copyToClipboard.status === 'success' ? <CheckIcon className="text-green-400" />
          : copyToClipboard.status === 'error' ? <XIcon className="text-red-400" />
            : <CopyIcon />
      }
    </Button>
  );
};