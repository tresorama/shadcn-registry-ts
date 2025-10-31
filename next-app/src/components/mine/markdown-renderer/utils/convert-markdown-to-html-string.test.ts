import { describe, it, expect } from "vitest";
import { convertMarkdownToHTMLString } from "./convert-markdown-to-html-string";

const l = console.log;

const INPUT_MD = `
# Heading 1
## Heading 2
### Heading 3

\`\`\`ts hello=world title="prova"
const a = 1;
\`\`\`

- item 1
- item 2
- item 3
`;
const OUTPUT_HTML = `
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
    
<h2>Contents</h2>
<ul>
<li><a href="#heading-1">Heading 1</a>
<ul>
<li><a href="#heading-2">Heading 2</a></li>
</ul>
</li>
</ul>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:var(--code);--shiki-dark-bg:var(--code);color:#24292e;--shiki-dark:#e1e4e8" tabindex="0" hello="world" title="prova" language="ts" code="const a = 1;"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> a</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre>
<ul>
<li>item 1</li>
<li>item 2</li>
<li>item 3</li>
</ul>`;


describe('convert-markdown-to-html-string', () => {
  it('do it', { timeout: 40 * 1000 },
    async () => {
      const htmlString = await convertMarkdownToHTMLString({ markdown: INPUT_MD });
      l(htmlString);
      expect(htmlString).toBe(OUTPUT_HTML);
    }
  );
});