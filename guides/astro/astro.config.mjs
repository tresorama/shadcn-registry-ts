// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      tableOfContents: {
        maxHeadingLevel: 4
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', slug: 'guides/01-getting-started' },
            { label: 'Overview', slug: 'guides/02-overview' },
            { label: 'Architecture', slug: 'guides/03-architecture' },
            { label: 'Folder Structure', slug: 'guides/04-folder-structure' },
            { label: 'Git and Github Workflow', slug: 'guides/05-git-and-github--workflow' },
            { label: 'Environments', slug: 'guides/06-environments' },
            { label: 'Development - Common Workflow', slug: 'guides/07-dev--common-workflow' },
            { label: 'Production - Deploy', slug: 'guides/08-prod--launch' },
          ],
        },
        {
          label: 'Other',
          items: [
            { label: 'LLM Guide', slug: 'other/01-llm-guide' },
          ],
        }
      ],
      customCss: ['./src/custom-styles.css'],
    }),
  ],
  markdown: {
    rehypePlugins: [

      // Why This?
      // we want to keep link inside markdown files as if astro was not used, like this:
      // `[read more [here](./other-sibiling-file.md)`
      // But astro requires to write links like this:
      // `[read more [here](/docs/other-sibiling-file)`
      // This plugin handle this conversion
      [rehypeAstroRelativeMarkdownLinks,
        {
          // NOTE: collectionBase: false, remove "/docs" from start of URL links
          collectionBase: false,
        }
      ]
    ],
  },
});
