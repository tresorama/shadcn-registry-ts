'use client';

import { useObserverElementsGeneric, type UseObserverElementsOptions } from "@/components/mine/hooks/use-observer-elements";

// types

type TocItemData = {
  /** Label of the TOC element */
  name: string,
  /** Link to the target element (target is not the TOC element) */
  href: string;
  /** Id of the target element (target is not the TOC element) */
  dataTargetId: string,
};
const TOC_ELEMENTS: TocItemData[] = [
  { name: "Example Usage", dataTargetId: "example" },
  { name: "Dependencies", dataTargetId: "dependencies" },
  { name: "Auto Install", dataTargetId: "auto-install" },
  { name: "Manual Install", dataTargetId: "manual-install" },
  { name: "Test", dataTargetId: "test" },
].map(item => ({
  ...item,
  href: `#${item.dataTargetId}`,
}));

// component

const observerOptions: UseObserverElementsOptions<{ elId: string; }> = {
  itemsSelector: TOC_ELEMENTS.map(({ href }) => href),
  itemDataExtractor: (el) => {
    const elId = el.getAttribute("id");
    if (!elId) throw new Error("useTocObserver: No id found on element");
    return { elId };
  },
  observerOptions: {
    root: null,
    threshold: 0.0,
    rootMargin: '-10% 0px -80% 0px',
  },
};


export const TOC = () => {
  const {
    activeItemData,
    // DebugElement 
  } = useObserverElementsGeneric(observerOptions);

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xs text-muted-foreground">On this page</h2>
        <div className="flex flex-col gap-3">
          {TOC_ELEMENTS.map((item) => (
            <a
              key={item.dataTargetId}
              href={item.href}
              data-target-id={item.dataTargetId}
              data-active={activeItemData?.elId === item.dataTargetId ? 'true' : 'false'}
              className="text-xs text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
      {/* {DebugElement} */}
    </>
  );

};