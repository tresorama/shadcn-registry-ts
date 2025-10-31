
import { CodeCollapsibleClient } from "./client";

import { MarkdownRendererServer } from "@/components/mine/markdown-renderer/server-component/markdown-renderer";


export const CodeCollapsibleServer = ({
  fileTitle,
  codeString,
  codeStringForClipboard,
}: {
  /** Title of the file, showedin the header */
  fileTitle: string,
  /** mardkdown string that contains the code */
  codeString: string,
  /** text that will be copied to clipboard when clicking the copy button */
  codeStringForClipboard: string,
}) => {
  return (
    <CodeCollapsibleClient
      fileTitle={fileTitle}
      codeStringForClipboard={codeStringForClipboard}
      code={(
        <MarkdownRendererServer
          markdownString={codeString}
          className="prose dark:prose-invert max-w-full prose-pre:p-4 prose-pre:rounded-none"
        />
      )}
    />
  );
};