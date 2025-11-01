## How we transform markdown to react code

Before a list of features taht you can use in markdown, let's see how markdown is transformed into react code.

The pipeline is:
```bash
input (markdown string)

↓

convertMarkdownToHtmlString(markdownString: string)
  remarkParse -> Markdown -> mdast
  ↓
  remarkRehype -> mdast -> hast
  ↓
  rehypeStringify -> hast -> html string

↓

convertHtmlStringToReactJsx(htmlString: string)
  parseHtmlToReactAndReplaceComponents -> html string -> react jsx

↓

output (react jsx)
```

## Which feature we added to markdown

### CodeNotCollapsible
```md
This is a paragraph followed by a code block.

```ts title=file.ts
const a = 1;
\`\`\`

```

### CodeCollapsible
```md
This is a paragraph followed by a code block.

```ts title=file.ts isCollapsible=true
const a = 1;
\`\`\`

```

### Tip
```md
This is a paragraph followed by a tip block.

:::tip
This is a tip
:::
```