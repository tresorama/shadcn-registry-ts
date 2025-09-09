import { LinkWithIconExternal } from '@/components/mine/link-with-icon-external';

export default function Page() {
  return (
    <div className="w-full h-full px-6 py-10 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl lg:text-6xl font-normal tracking-tight">Typescript Utilities</h1>
      <p className="mt-4 text-lg/relaxed text-muted-foreground">
        Collection of typescript utilities, served as a shadcn registry.
        <br />
        <span className="text-sm">
          By <LinkWithIconExternal href="https://github.com/tresorama">tresorama</LinkWithIconExternal>
        </span>
      </p>
      <p className="mt-6 text-sm/loose text-muted-foreground">
        Big thanks to <LinkWithIconExternal href="https://ui.shadcn.com/">shadcn</LinkWithIconExternal> and <LinkWithIconExternal href="https://nextjs.org/">next.js</LinkWithIconExternal>.
      </p>
    </div>
  );
}



