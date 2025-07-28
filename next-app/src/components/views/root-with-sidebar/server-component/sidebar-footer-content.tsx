import { LinkWithIconExternal } from "@/components/mine/link-with-icon-external";

// TODO: update link
const LINKS = {
  githubRepo: "https://github.com/tresorama/tresorama-ts-utils",
};

export const SidebarFooterContent = () => {
  return (
    <div className="p-1 flex flex-col items-start gap-2 text-sm">
      <LinkWithIconExternal href={LINKS.githubRepo}>github</LinkWithIconExternal>
    </div>
  );
};