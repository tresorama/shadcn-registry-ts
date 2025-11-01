'use client';


import { ButtonCopyToClipboard } from "@/components/mine/button-copy-to-clipboard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/shadcn/ui/collapsible";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/shadcn/utils";

export type CodeCollapsibleClientProps = {
  /** Title of the file, showed in the header */
  fileTitle?: string;
  /** Code JSX */
  codeJsx: React.ReactNode;
  /** text that will be copied to clipboard when clicking the copy button */
  codeStringForClipboard?: string;

  className?: React.ComponentProps<'div'>['className'];
};


export const CodeCollapsibleClient = ({
  fileTitle,
  codeStringForClipboard,
  codeJsx,
  className,
}: CodeCollapsibleClientProps) => {

  return (
    <Collapsible
      className={cn("relative border rounded-xl overflow-hidden", className)}
    >
      {/* HEADER */}
      <div
        data-name="CODE-COLLAPSIBLE--HEADER"
        className="pl-3 pr-2 py-2 flex justify-start items-center gap-2 border-b"
      >
        {/* FILE TITLE */}
        {fileTitle && (
          <span className="text-sm text-muted-foreground">
            {fileTitle}
          </span>
        )}
        <div className="ml-auto flex items-center gap-[inherit]">
          {/* BUTTON COLLAPSE */}
          <CollapsibleTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="data-[state=closed]:hidden text-muted-foreground"
            >
              Collapse
            </Button>
          </CollapsibleTrigger>
          {/* BUTTON - COPY TO CLIPBOARD */}
          {codeStringForClipboard && (
            <ButtonCopyToClipboard
              text={codeStringForClipboard}
              className="text-muted-foreground"
            />
          )}
        </div>
      </div>
      {/* CODE */}
      <CollapsibleContent
        forceMount
        className="relative overflow-hidden data-[state=closed]:max-h-60 bg-code"
      >
        <div
          data-name="CODE-COLLAPSIBLE--CODE"
          className="[&>*]:prose-pre:mt-0"
        >
          {codeJsx}
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger
        className="cursor-pointer data-[state=open]:hidden absolute left-0 right-0 bottom-[-2px] h-16 flex justify-center items-center bg-gradient-to-b from-code/5 from-0% to-code to-50%"
      >
        <span className="text-sm">Expand</span>
      </CollapsibleTrigger>
    </Collapsible>
  );
};