'use client';


import { ButtonCopyToClipboard } from "@/components/mine/button-copy-to-clipboard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/shadcn/ui/collapsible";
import { Button } from "@/components/shadcn/ui/button";


export const CodeCollapsibleClient = ({
  fileTitle,
  codeString,
  code,
}: {
  /** Title of the file, showedin the header */
  fileTitle: string,
  /** code as string, used for copy to clipboard */
  codeString: string,
  /** Rendered JSX of the code, rendered in the collapsible content */
  code: React.ReactNode;
}) => {

  return (
    <Collapsible
      className="relative border rounded-xl overflow-hidden"
    >
      <CollapsibleContent
        forceMount
        className="relative overflow-hidden data-[state=closed]:h-60"
      >
        {/* HEADER */}
        <div
          data-name="CODE-COLLAPSIBLE--HEADER"
          className="pl-3 pr-1 py-1 flex justify-start items-center gap-2 border-b"
        >
          {/* FILE TITLE */}
          <span className="text-sm text-muted-foreground">
            {fileTitle}
          </span>
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
            <ButtonCopyToClipboard
              text={codeString}
              className="text-muted-foreground"
            />
          </div>
        </div>
        {/* CODE */}
        <div
          data-name="CODE-COLLAPSIBLE--CODE"
          className="[&>*]:prose-pre:mt-0"
        >
          {code}
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger
        className="data-[state=open]:hidden absolute left-0 right-0 bottom-[-2px] h-16 flex justify-center items-center bg-gradient-to-b from-code/70 from-20% to-code to-90%"
      >
        <span className="text-sm">Expand</span>
      </CollapsibleTrigger>
    </Collapsible>
  );
};