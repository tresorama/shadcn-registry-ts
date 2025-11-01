import { ButtonCopyToClipboard } from "@/components/mine/button-copy-to-clipboard";
import { cn } from "@/lib/shadcn/utils";


export type CodeNotCollapsibleProps = {
  /** Title of the file, showed in the header */
  fileTitle?: string;
  /** Code JSX */
  codeJsx: React.ReactNode;
  /** text that will be copied to clipboard when clicking the copy button */
  codeStringForClipboard?: string;

  className?: React.ComponentProps<'div'>['className'];
};

export const CodeNotCollapsibleServer = ({
  fileTitle,
  codeJsx,
  codeStringForClipboard,
  className,
}: CodeNotCollapsibleProps) => {
  return (
    <Wrapper className={className}>
      {fileTitle ? (
        <Header
          fileTitle={fileTitle}
          codeStringForClipboard={codeStringForClipboard}
        />
      ) : codeStringForClipboard ? (
        <ButtonCopyToClipboard
          text={codeStringForClipboard}
          className="absolute top-2 right-2 text-muted-foreground"
        />
      ) : null}
      <Code codeJsx={codeJsx} />
    </Wrapper>
  );
};


const Wrapper = ({ children, className }: Pick<CodeNotCollapsibleProps, "className"> & { children: React.ReactNode; }) => (
  <div
    data-name="CODE-NOT-COLLAPSIBLE"
    className={cn("relative border rounded-xl overflow-hidden", className)}
  >
    {children}
  </div>
);

const Header = ({ fileTitle, codeStringForClipboard }: Pick<CodeNotCollapsibleProps, "fileTitle" | "codeStringForClipboard">) => (
  <div
    data-name="CODE-NOT-COLLAPSIBLE--HEADER"
    className="pl-3 pr-2 py-2 flex justify-between items-center gap-2 border-b"
  >
    {/* FILE TITLE */}
    <span className="text-sm text-muted-foreground">
      {fileTitle}
    </span>
    {/* BUTTON - COPY TO CLIPBOARD */}
    {codeStringForClipboard && (
      <ButtonCopyToClipboard
        text={codeStringForClipboard}
        className="text-muted-foreground"
      />
    )}
  </div>
);

const Code = ({ codeJsx }: Pick<CodeNotCollapsibleProps, "codeJsx">) => (
  <div data-name="CODE-NOT-COLLAPSIBLE--CODE">
    {codeJsx}
  </div>
);