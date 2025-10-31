import { ButtonCopyToClipboard } from "@/components/mine/button-copy-to-clipboard";
import { MarkdownRendererServer } from "@/components/mine/markdown-renderer/server-component/markdown-renderer";


export const CodeNotCollapsibleServer = ({
  codeString,
  codeStringForClipboard,
  fileTitle,
}: {
  /** markdown string that contains the code, for rendering purpose */
  codeString: string,
  /** text that will be copied to clipboard when clicking the copy button */
  codeStringForClipboard: string,
  /** Title of the file, showed in the header */
  fileTitle?: string,
}) => {
  return (
    <div
      data-name="CODE-NOT-COLLAPSIBLE"
      className="relative border rounded-xl overflow-hidden"
    >
      {/* HEADER */}
      {fileTitle ? (
        <div
          data-name="CODE-NOT-COLLAPSIBLE--HEADER"
          className="pl-3 pr-2 py-2 flex justify-between items-center gap-2 border-b"
        >
          {/* FILE TITLE */}
          <span className="text-sm text-muted-foreground">
            {fileTitle}
          </span>
          {/* BUTTON - COPY TO CLIPBOARD */}
          <ButtonCopyToClipboard
            text={codeStringForClipboard}
            className="text-muted-foreground"
          />
        </div>
      ) : (
        <ButtonCopyToClipboard
          text={codeStringForClipboard}
          className="absolute top-2 right-2 text-muted-foreground"
        />
      )}
      {/* CODE */}
      <div
        data-name="CODE-NOT-COLLAPSIBLE--CODE"
        className="[&>*]:prose-pre:mt-0"
      >
        <MarkdownRendererServer
          markdownString={codeString}
          className="prose dark:prose-invert max-w-full prose-pre:p-4 prose-pre:rounded-none"
        />
      </div>
    </div>
  );
};