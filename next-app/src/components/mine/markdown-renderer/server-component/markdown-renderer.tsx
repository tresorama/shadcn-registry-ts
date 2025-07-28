import { convertMarkdownToHTMLString } from "../utils/convert-markdown-to-html-string";

import { cn } from "@/lib/shadcn/utils";

/**
 * `React Server Component` that convert markdown to html (on the server) then render it
 * The conversion from markdown to html is done on the server side
 */
export async function MarkdownRendererServer({
  markdownString,
  className,
}: {
  markdownString: string;
  className?: React.JSX.IntrinsicElements['div']['className'];
}) {

  const htmlString = await convertMarkdownToHTMLString({
    markdown: markdownString,
    addTOC: false
  });

  return (
    <div
      className={cn('MARKDOWN-RENDERER', className)}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};