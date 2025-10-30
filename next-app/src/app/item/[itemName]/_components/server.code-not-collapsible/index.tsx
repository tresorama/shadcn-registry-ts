import { ButtonCopyToClipboard } from "@/components/mine/button-copy-to-clipboard";
import { MarkdownRendererServer } from "@/components/mine/markdown-renderer/server-component/markdown-renderer";


export const CodeNotCollapsibleServer = ({
  codeString,
  fileTitle,
}: {
  /** code as string, used also for copy to clipboard */
  codeString: string,
  /** Title of the file, showed in the header */
  fileTitle?: string,
}) => {

  const hasHeader = Boolean(fileTitle);

  return (
    <div
      data-name="CODE-NOT-COLLAPSIBLE"
      className="relative border rounded-xl overflow-hidden"
    >
      {/* HEADER */}
      {hasHeader ? (
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
            text={codeString}
            className="text-muted-foreground"
          />
        </div>
      ) : (
        <ButtonCopyToClipboard
          text={codeString}
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