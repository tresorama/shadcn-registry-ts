import type { Metadata } from "next";
import { notFound } from "next/navigation";
import z from "zod";

import { getRegistryItemNames, getRegistryItemByName } from "@/lib/registry/get-next-data";
import { InstallCommand } from "./_components/client.install-command";
import { TOC } from "./_components/client.toc";

import { cn } from "@/lib/shadcn/utils";
import { Badge } from "@/components/shadcn/ui/badge";
import { MarkdownRendererServer } from "@/components/mine/markdown-renderer/server-component/markdown-renderer";

// 1. Use the registry to generate static paths

export const generateStaticParams = async () => {
  const itemsNames = await getRegistryItemNames();
  return itemsNames.map(itemName => ({ itemName }));
};

// 2. zod validation of page props

type RawPageProps = {
  params: Promise<{ itemName: string; }>;
};
const validatePageProps = async (props: RawPageProps) => {
  return z.object({
    params: z.object({
      itemName: z.string(),
    }),
  }).parse({
    params: await props.params
  });
};

// 3. For each path -> seo matedata

export async function generateMetadata(
  pageProps: RawPageProps,
): Promise<Metadata> {

  // validate page props
  const { params } = await validatePageProps(pageProps);

  // get item
  const item = await getRegistryItemByName(params.itemName);
  if (!item) {
    console.error(`generateMetadata: Item not found: ${params.itemName}`);
    notFound();
  }

  return {
    title: item.title,
    description: item.description,
  };
}

// 4. For each path -> page


const typo = {
  pageTitle: "text-3xl font-medium tracking-tight lg:text-4xl",
  sectionHeading: "text-2xl font-medium tracking-tight",
};

export default async function Page(
  pageProps: RawPageProps
) {

  // validate page props
  const { params } = await validatePageProps(pageProps);

  // get item
  const item = await getRegistryItemByName(params.itemName);
  if (!item) {
    console.error(`generatePage: Item not found: ${params.itemName}`);
    notFound();
  }

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_18rem] overflow-y-auto scroll-smooth [&_[id]]:scroll-mt-10 focus-visible:outline-0">
      {/* Content */}
      <div className="px-6 pt-10 pb-24 border-r">
        <div className="mx-auto max-w-3xl flex flex-col gap-12">

          {/* Header */}
          <section className="flex flex-col gap-4">
            <h1 className={cn(typo.pageTitle)}>{item.title}</h1>
            <p className="text-muted-foreground">{item.description}</p>
          </section>

          {/* Example Usage */}
          <section id="example" className="flex flex-col gap-4">
            <h2 className={cn(typo.sectionHeading)}>Example Usage</h2>
            <MarkdownRendererServer
              markdownString={item.fileExample.fileContent}
              className="max-w-full"
            />
          </section>

          {/* Dependencies */}
          <section id="dependencies" className="flex flex-col gap-4">
            <h2 className={cn(typo.sectionHeading)}>Dependencies</h2>
            <div className="flex flex-col gap-2">
              {item.allDependencies.length === 0 ? (
                <p className="text-sm text-muted-foreground">No dependencies</p>
              ) : item.allDependencies.map((dependency) => (
                <div key={dependency.label} className="flex gap-1 items-center">
                  <Badge variant="secondary" className="gap-2 items-baseline">
                    <span className="">{dependency.type}</span>
                  </Badge>
                  <span className="text-sm text-muted-foreground">{dependency.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Auto Install */}
          <section id="auto-install" className="flex flex-col gap-4">
            <h2 className={cn(typo.sectionHeading)}>Auto Install</h2>
            <InstallCommand options={item.installCommands} />
          </section>

          {/* Manual Install */}
          <section id="manual-install" className="flex flex-col gap-4">
            <h2 className={cn(typo.sectionHeading)}>Manual Install</h2>
            {item.filesWithContent.map((fileData) => (
              <div key={fileData.fileName} className="flex flex-col gap-0">
                <MarkdownRendererServer
                  markdownString={[
                    `\`\`\`ts title=${fileData.fileName} isCollapsible=true`,
                    fileData.fileContent,
                    "\`\`\`",
                  ].join("\n")}
                  className="max-w-full"
                />
              </div>
            ))}
          </section>

          {/* Test */}
          <section id="test" className="flex flex-col gap-4">
            <h2 className={cn(typo.sectionHeading)}>Test</h2>
            {!item.fileTest ? (
              <p className="text-sm text-muted-foreground">No test</p>
            ) : (
              <MarkdownRendererServer
                markdownString={[
                  `\`\`\`ts title=${item.fileTest.fileName}`,
                  item.fileTest.fileContent,
                  "\`\`\`",
                ].join("\n")}
                className="max-w-full"
              />
            )}
          </section>


        </div>
      </div>

      {/* TOC */}
      <aside className="max-md:hidden self-start sticky top-0 px-8 py-10">
        <TOC />
      </aside>

    </div>
  );
}