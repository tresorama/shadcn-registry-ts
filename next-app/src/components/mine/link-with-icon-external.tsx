import { ExternalLinkIcon } from "lucide-react";

export const LinkWithIconExternal = ({ href, children }: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      className="p-[0.15em_0.35em_0.2em] inline-flex items-center gap-1 text-[1em]/none rounded bg-muted hover:bg-foreground/20"
    >
      {children}
      <ExternalLinkIcon className="size-[0.8em]" />
    </a>
  );
};