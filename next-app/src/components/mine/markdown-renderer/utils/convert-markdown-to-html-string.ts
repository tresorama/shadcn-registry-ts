import { unified, type Plugin } from 'unified';
import { visit } from "unist-util-visit";
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
// import remarkHeadingId, { type RemarkHeadingIdOptions } from 'remark-heading-id';
import remarkToc, { type Options as RemarkTocOptions } from 'remark-toc';
// import remarkCodeTitle from "remark-code-title";
// import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import remarkDirective from 'remark-directive';
import type { ContainerDirective } from "mdast-util-directive"; // tip fornito dal pacchetto remark-directive
import remarkRehype, { type Options as RemarkRehypeOptions } from 'remark-rehype';
// import rehypeRaw from "rehype-raw";
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
// import rehypeSanitize, { type Options as RehypeSanitizeOptions } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

type RenderMarkdownToHTMLProps = {
  markdown: string;
  addTOC?: boolean;
};

/**
 * Convert Markdown string in HTML string
 * */
export const convertMarkdownToHTMLString = async ({ markdown, addTOC = true }: RenderMarkdownToHTMLProps) => {

  const transformedMarkdown = `
  ${addTOC ? '## Contents' : ''}  
  ${markdown}
  `.trim();

  // NOTE:
  // remark plugins -> they add markdown features
  // rehype plugins -> they add html features
  // remark-rehype -> convert markdown to html

  const pipeline = unified()
    // remarkParse -> Markdown -> mdast
    .use(remarkParse)
    // remark-gfm -> Support for GitHub Flavored Markdown
    .use(remarkGfm)

    // remarkHeadingId -> add heading id attributes
    // .use(remarkHeadingId, { 
    //   defaults: true, 
    //   uniqueDefaults: true 
    // } satisfies RemarkHeadingIdOptions)

    // remarkToc -> Popoulate TOC section
    .use(remarkToc, {
      heading: 'contents',
      maxDepth: 2,
      tight: true
    } satisfies RemarkTocOptions)

    // remarkCodeTitle -> Support title in code blocks
    // .use(remarkCodeTitle)

    // remarkSqueezeParagraphs -> remove empty paragraphs
    // .use(remarkSqueezeParagraphs)

    // remarkDirective -> Support directives (:::tip, :::note)
    .use(remarkDirective)
    .use(remarkDirectiveCustomElementTip)

    // remarkRehype -> Convert Markdown to HTML
    .use(remarkRehype, { allowDangerousHtml: true } satisfies RemarkRehypeOptions)

    // rehypeShiki -> format code blocks with shiki (it style elements with inline style)
    .use(rehypeShiki, rehypeShikiOptions)

    // rehypeRaw -> keep raw HTML
    // .use(rehypeRaw)

    // rehypeSanitize -> sanitize HTML
    // .use(rehypeSanitize, {} satisfies RehypeSanitizeOptions)

    // rehypeStringify -> Serialiaze to HTML string
    .use(rehypeStringify);

  const html = (await pipeline.process(transformedMarkdown)).toString();

  // add additional html
  const finalHtml = [
    // shiki -> auto switch between light and dark themes
    // @see https://shiki.matsu.io/guide/dual-themes#class-based-dark-mode
    `
    <style>
    html.dark .shiki,
    html.dark .shiki span {
      color: var(--shiki-dark) !important;
      background-color: var(--shiki-dark-bg) !important;
      /* Optional, if you also want font styles */
      font-style: var(--shiki-dark-font-style) !important;
      font-weight: var(--shiki-dark-font-weight) !important;
      text-decoration: var(--shiki-dark-text-decoration) !important;
    }
    </style>
    `,
    // custom css
    `
    <style>
      [data-remark-code-title]:has( + pre.shiki) {
        border-radius: 10px 10px 0 0;
        font-size: 0.8em;
        padding: 0.6em 1.1em;
        line-height: 1;
        width: min-content;
        max-width: 100%;
      }
      pre.shiki:is([data-remark-code-title] + pre.shiki) {
        margin-top: 0;
        border-top-left-radius: 0;
      }
      [data-remark-code-title]:has( + pre.shiki) {
        background: hsl(0 0 97);
        color: hsl(0 0 67);
      }
      pre.shiki:is([data-remark-code-title] + pre.shiki) {
        background: hsl(0 0 97) !important;
      }
      .dark [data-remark-code-title]:has( + pre.shiki) {
        background: hsl(0 0 3);
        color: hsl(0 0 30);
      }
      .dark pre.shiki:is([data-remark-code-title] + pre.shiki) {
        background: hsl(0 0 3) !important;
      }
    </style>
    `,
    html,
  ].join('\n');

  return finalHtml;
};

// ===============================================
//     Remark Plugins
// ===============================================

// remarkDirectiveCustomElementXXX

export type HtmlDivExtraHtmlAttributes = {
  "data-kind"?: "tip";
};
const remarkDirectiveCustomElementTip: Plugin = () => {
  return (tree) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      console.log(node);
      if (node.name === "tip") {
        node.data = {
          hName: "div",
          hProperties: { "data-kind": "tip" } satisfies HtmlDivExtraHtmlAttributes,
        };
      }
    });
  };
};

// ===============================================
//     Rehype Plugins
// ===============================================

// rehypeShiki
export type HtmlPreExtraHtmlAttributes = {
  language: string;
  code: string;
  title?: string;
  isCollapsible?: 'true';
};
const rehypeShikiOptions: RehypeShikiOptions = {
  themes: {
    light: 'github-light',
    dark: 'github-dark'
  },
  // override the CSS color code used by shiki for each theme.  
  // open the Dev Tools to see the `defaultColorCode'
  // theme: {
  //   defaultColorCode: 'new value'
  // }
  colorReplacements: {
    "github-dark": {
      // shiki-dark-bg
      "#24292e": 'var(--code)',
    },
    "github-light": {
      // background-color
      "#fff": 'var(--code)',
    }
  },
  // parse header props of code blocks (```ts title="hello" oher="value") 
  // and populate `transformer.pre this.options.meta`
  parseMetaString(metaString) {
    const parsed = parseFromRawString(metaString);
    // console.log('parseMetaString', { metaString, parsed });
    return parsed;

    function parseFromRawString(str = '') {
      const entries = str
        .split(' ')
        .map(entry => {
          const key = entry.split('=')[0];
          let value = entry.split('=')[1];
          if (
            (value.startsWith('"') && value.endsWith('"'))
            ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }
          return [key, value] as const;
        });
      const obj = Object.fromEntries(entries);
      return obj;
    }
  },
  transformers: [
    {
      // add html attributes to <pre> element: language, code
      pre(node) {
        // console.dir(
        //   {
        //     meta: this.meta,
        //     options: this.options
        //   },
        //   { depth: 3 }
        // );

        // parse attributes from mdast node
        const extraAttributes: HtmlPreExtraHtmlAttributes = {
          language: this.options.lang,
          code: this.source,
        };
        if (this.options.meta) {
          if ('title' in this.options.meta && this.options.meta.title) {
            extraAttributes.title = this.options.meta.title;
          }
          if ('isCollapsible' in this.options.meta && this.options.meta.isCollapsible === 'true') {
            extraAttributes.isCollapsible = 'true';
          }
        }
        // add attributes to node
        node.properties = {
          ...node.properties,
          ...extraAttributes,
        };
      },
    }
  ],
};
