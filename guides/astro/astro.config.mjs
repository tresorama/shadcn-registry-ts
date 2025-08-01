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
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', slug: 'guides/01-getting-started' },
            { label: 'Overview', slug: 'guides/overview' },
            { label: 'Environments', slug: 'guides/environments' },
            { label: 'Git and Github Workflow', slug: 'guides/git-and-github--workflow' },
            { label: 'Development - Common Workflow', slug: 'guides/dev--common-workflow' },
            { label: 'Production - Deploy', slug: 'guides/prod--launch' },
            { label: 'LLM Guide', slug: 'guides/llm-guide' },
          ],
        },
      ],
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
