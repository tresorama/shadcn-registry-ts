import parseHtmlToReact, {
  Element,
  attributesToProps,
  domToReact,
  type HTMLReactParserOptions,
} from 'html-react-parser';

import type { HtmlDivExtraHtmlAttributes, HtmlPreExtraHtmlAttributes } from './convert-markdown-to-html-string';

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
      const prePropsChildren = domToReact(domNode.children);

      // convert `<pre>` HTML attributes to React props
      const prePropsOriginal = attributesToProps(domNode.attribs);

      // override props
      const prePropsFinal = {
        ...prePropsOriginal,
        style: {
          ...(prePropsOriginal.style ?? {}),
          margin: 0,
          paddingTop: '1rem',
          paddingBottom: '2rem',
        },
        children: prePropsChildren
      };

      // 3. render

      if (preHtmlAttributes.isCollapsible) {
        return (
          <CodeCollapsibleClient
            fileTitle={preHtmlAttributes.title}
            codeStringForClipboard={preHtmlAttributes.code}
            codeJsx={<pre {...prePropsFinal} />}
          />
        );
      }
      return (
        <CodeNotCollapsibleServer
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
          <Alert>
            <HandHelpingIcon />
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription className='[&>*]:my-1'>
              {domToReact(domNode.children)}
            </AlertDescription>
          </Alert>
        );
      }
    }
  }

};