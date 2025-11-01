
import { convertHtmlStringToReactJsx } from "../utils/convert-html-string-to-react-jsx";
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

  // get html string (single string)
  const htmlString = await convertMarkdownToHTMLString({
    markdown: markdownString,
    addTOC: false
  });

  // get react jsx
  // while converting, replace some html tags to custom react components
  const reactJsxTree = convertHtmlStringToReactJsx(htmlString);

  return (
    <div
      data-name="MARKDOWN-RENDERER"
      className={cn(
        "prose dark:prose-invert",
        "prose-h3:font-medium prose-h3:tracking-tight [&_h3>a[data-kind=heading-autolink]]:[font:inherit]",
        className)}
    >
      {reactJsxTree}
    </div>
  );
};




