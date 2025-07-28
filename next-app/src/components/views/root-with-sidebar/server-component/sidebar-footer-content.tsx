import { LinkWithIconExternal } from "@/components/mine/link-with-icon-external";

const LINKS = {
  githubRepo: "https://github.com/tresorama/shadcn-registry-ts",
};

export const SidebarFooterContent = () => {
  return (
    <div className="p-1 flex flex-col items-start gap-2 text-sm">
      <LinkWithIconExternal href={LINKS.githubRepo}>github</LinkWithIconExternal>
    </div>
  );
};