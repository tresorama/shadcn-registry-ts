'use client';

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export type UseObserverElementsOptions<
  ActiveItemData,
> = {
  itemsSelector: string[],
  itemDataExtractor: (el: Element) => ActiveItemData,
  observerOptions: IntersectionObserverInit,
};


export const useObserverElementsGeneric = <
  ActiveItemData,
>({
  itemsSelector,
  itemDataExtractor,
  observerOptions,
}: UseObserverElementsOptions<ActiveItemData>) => {

  // local state
  const [activeItemData, setActiveItemData] = useState<null | ActiveItemData>(null);

  // debug element
  const DebugElement = useMemo(
    () => {
      if (!observerOptions.rootMargin) throw new Error("useObserverElements: No rootMargin defined!");

      const inset = convertRootMarginToInset(observerOptions.rootMargin);

      // NOTE: during server rendering document.body is undefined, so we skip it
      if (typeof window === "undefined") return null;

      return (
        createPortal(
          <div
            className="USE-OBSEVER-ELEMENTS-DEBUG-ELEMENT z-50 fixed border-4 border-red-500 pointer-events-none"
            style={{ inset: inset.inset }}
          />,
          document.body
        )
      );
    },
    [observerOptions.rootMargin]
  );

  // on mount observe when items are visible
  useEffect(() => {
    const initObserver = () => {
      // get data target elements
      const els = Array.from(document.querySelectorAll(itemsSelector.join(",")));
      if (els.length === 0) {
        console.error("useObserverElements: No items dom elements found");
        return;
      }

      // init observer
      const onIntersection: IntersectionObserverCallback = (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const itemData: ActiveItemData = itemDataExtractor(el);
            setActiveItemData(itemData);
            return; // this will stop the observer at the first match
          }
        }
      };

      // observe
      const observer = new IntersectionObserver(onIntersection, observerOptions);
      els.forEach(el => observer.observe(el));

      // return deactivate fn
      const unsubscrbe = () => {
        els.forEach(el => observer.unobserve(el));
        observer.disconnect();
      };
      return unsubscrbe;
    };

    // init
    const unsubscrbe = initObserver();

    // clean up
    return unsubscrbe;
  }, [
    itemsSelector,
    itemDataExtractor,
    observerOptions,
  ]);


  return {
    activeItemData,
    DebugElement,
  };

};







// utils

/**
 * Converts a CSS rootMargin string (of IntersectionObserver) to an object with inset values.
 * This is used to create a DebugElements that show the rootMargin area.
 * 
 * @param rootMargin - A string representing the CSS root-margin property, consisting of up to four 
 *                     length or percentage values (e.g., "10px 20px", "5% 10% 5% 10%").
 * 
 * @returns An object containing:
 *          - `inset`: A string with the converted inset values (negative of the rootMargin values).
 *          - `parts`: An object with individual inset parts: `top`, `right`, `bottom`, `left`.
 */
function convertRootMarginToInset(rootMargin: string) {
  const inset = rootMargin.split(" ")
    .map(v => {
      if (v.includes("px")) {
        const n = Number(v.replace("px", ""));
        return (n * -1) + 'px';
      }
      if (v.includes("%")) {
        const n = Number(v.replace("%", ""));
        return (n * -1) + '%';
      }
      const n = Number(v);
      return (n * -1) + 'px';
    })
    .join(" ");
  const [top, right, bottom, left] = inset.split(" ");

  return {
    inset,
    parts: {
      top,
      right,
      bottom,
      left
    }
  };
};
