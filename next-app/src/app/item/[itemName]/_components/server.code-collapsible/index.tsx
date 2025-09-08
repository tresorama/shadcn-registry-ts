
import { CodeCollapsibleClient } from "./client";

import { MarkdownRendererServer } from "@/components/mine/markdown-renderer/server-component/markdown-renderer";


export const CodeCollapsibleServer = ({
  fileTitle,
  codeString
}: {
  fileTitle: string,
  codeString: string,
}) => {
  return (
    <CodeCollapsibleClient
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