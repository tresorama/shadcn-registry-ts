'use client';

import { ButtonCopyToClipboard } from "@/components/mine/button-copy-to-clipboard";

export const CodeNotCollapsibleClient = ({
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
    <div
      data-name="CODE-NOT-COLLAPSIBLE"
      className="border rounded-xl overflow-hidden"
    >
      {/* HEADER */}
      <div
        data-name="CODE-NOT-COLLAPSIBLE--HEADER"
        className="pl-3 pr-1 py-1 flex justify-between items-center gap-2 border-b"
      >
        {/* FILE TITLE */}
        <span className="text-sm text-muted-foreground">
          {fileTitle}
        </span>
        {/* BUTTON - COPY TO CLIPBOARD */}
        <ButtonCopyToClipboard
          text={codeString}
          className="text-muted-foreground"
        />
      </div>
      {/* CODE */}
      <div
        data-name="CODE-NOT-COLLAPSIBLE--CODE"
        className="[&>*]:prose-pre:mt-0"
      >
        {code}
      </div>
    </div>
  );
};