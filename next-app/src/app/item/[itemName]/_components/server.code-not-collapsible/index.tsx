
import { CodeNotCollapsibleClient } from "./client";

import { MarkdownRendererServer } from "@/components/mine/markdown-renderer/server-component/markdown-renderer";


export const CodeNotCollapsibleServer = ({
  fileTitle,
  codeString
}: {
  fileTitle: string,
  codeString: string,
}) => {
  return (
    <CodeNotCollapsibleClient
      fileTitle={fileTitle}
      codeString={codeString}
      code={(
        <MarkdownRendererServer
          markdownString={codeString}
          className="prose dark:prose-invert max-w-full prose-pre:p-4 prose-pre:rounded-none"
        />
      )}
    />
  );
};