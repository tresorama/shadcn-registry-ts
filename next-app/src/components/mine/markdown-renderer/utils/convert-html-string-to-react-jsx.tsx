import Link from 'next/link';
import parseHtmlToReact, {
  Element,
  attributesToProps,
  domToReact,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import { HandHelpingIcon } from 'lucide-react';

import type { HtmlAnchorExtraHtmlAttributes, HtmlDivExtraHtmlAttributes, HtmlPreExtraHtmlAttributes } from './convert-markdown-to-html-string';

import { CodeNotCollapsibleServer } from '@/components/mine/code-not-collapsible';
import { CodeCollapsibleClient } from '@/components/mine/code-collapsible';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';


export function convertHtmlStringToReactJsx(htmlString: string) {
  const reactJsxTree = parseHtmlToReact(htmlString, options);
  return reactJsxTree;
}

const options: HTMLReactParserOptions = {
  replace: (domNode) => {

    // replace code block ```language
    if (domNode instanceof Element && domNode.tagName === 'pre') {

      // 1. get raw html attributes of `<pre>`
      const preHtmlAttributes = domNode.attribs as unknown as HtmlPreExtraHtmlAttributes;

      // 2. build react props of the `<pre>` to return

      // get react jsx of `<pre>` children
      // @ts-expect-error Childnode[] is not assignable to DOMNode[]
      const prePropsChildren = domToReact(domNode.children, options);

      // convert `<pre>` HTML attributes to React props
      const prePropsOriginal = attributesToProps(domNode.attribs);

      // override props
      const prePropsFinal = {
        ...prePropsOriginal,
        style: {
          ...(prePropsOriginal.style ?? {}),
          margin: 0,
          paddingTop: 'calc(var(--spacing) * 4)',
          paddingBottom: 'calc(var(--spacing) * 4)',
        },
        children: prePropsChildren
      };

      // 3. render

      if (preHtmlAttributes.isCollapsible) {
        return (
          <CodeCollapsibleClient
            className='w-full my-5'
            fileTitle={preHtmlAttributes.title}
            codeStringForClipboard={preHtmlAttributes.code}
            codeJsx={<pre {...prePropsFinal} />}
          />
        );
      }
      return (
        <CodeNotCollapsibleServer
          className='w-full my-5'
          fileTitle={preHtmlAttributes.title}
          codeStringForClipboard={preHtmlAttributes.code}
          codeJsx={<pre {...prePropsFinal} />}
        />
      );

    }

    // replace :::tip
    if (domNode instanceof Element && domNode.tagName === 'div') {
      const divHtmlAttributes = domNode.attribs as unknown as HtmlDivExtraHtmlAttributes;
      if (divHtmlAttributes['data-kind'] === 'tip') {
        return (
          <Alert className='my-5'>
            <HandHelpingIcon />
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription className='[&>*]:my-1'>
              {/*@ts-expect-error Childnode[] is not assignable to DOMNode[] */}
              {domToReact(domNode.children, options)}
            </AlertDescription>
          </Alert>
        );
      }
    }

    // replace links
    if (domNode instanceof Element && domNode.tagName === 'a') {
      const aHtmlAttributes = domNode.attribs as unknown as HtmlAnchorExtraHtmlAttributes;
      // replace heading with autolink
      if (aHtmlAttributes['data-kind'] === 'heading-autolink') {
        const aProps = attributesToProps(domNode.attribs);
        return (
          // @ts-expect-error next/link think that href is not present in props
          <Link
            {...aProps}
            className='group no-underline flex items-center gap-2 hover:underline hover:underline-offset-4'
          >
            {/*@ts-expect-error Childnode[] is not assignable to DOMNode[] */}
            {domToReact(domNode.children)}
          </Link>
        );
      }
      // replace other links
      return (
        // @ts-expect-error next/link think that href is not present in props
        <Link {...attributesToProps(domNode.attribs)}>
          {/*@ts-expect-error Childnode[] is not assignable to DOMNode[] */}
          {domToReact(domNode.children, options)}
        </Link>
      );
    }
  }

};