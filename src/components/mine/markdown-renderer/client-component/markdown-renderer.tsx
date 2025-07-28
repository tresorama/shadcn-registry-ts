'use client';

import { useEffect, useState } from 'react';
// import Markdown from 'react-markdown';

import { convertMarkdownToHTMLString } from '../utils/convert-markdown-to-html-string';

import { cn } from "@/lib/shadcn/utils";


type MarkdownRendererProps = {
  markdownString: string;
  className?: React.JSX.IntrinsicElements['div']['className'];
};

/**
 * `React Client Component` that convert markdown to html (on the client) then render it.
 * The conversion from markdown to html is done on the client side.
 */
export const MarkdownRendererClient = (props: MarkdownRendererProps) => {
  return (
    <MarkdownRenderer2 {...props} />
  );
};

// const MarkdownRenderer1 = ({ markdownString }: MarkdownRendererProps) => {
//   return (
//     <div className={cn('MARKDOWN-RENDERER', className)}>
//       <Markdown>{markdownString}</Markdown>
//     </div>
//   );
// };

const MarkdownRenderer2 = ({ markdownString, className }: MarkdownRendererProps) => {
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    convertMarkdownToHTMLString({
      markdown: markdownString,
      addTOC: false
    })
      .then((html) => setHtmlString(html));
  }, [markdownString]);

  return (
    <div
      className={cn('MARKDOWN-RENDERER', className)}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};