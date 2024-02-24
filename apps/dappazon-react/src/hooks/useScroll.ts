import { useEffect } from "react";

/**
 * change the behavior while clicking the anchor.
 * normally when the anchor is clicked, the page immediately jump to the target element.
 * use this hook can customize the scroll behavior.
 * @param parent the parent of the anchor elements. the anchor must have a `href` attribute.
 * @param options https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
 */
export function useScroll(parent: HTMLElement | null, extraHeight = 80) {
  useEffect(() => {
    if (!parent) return;

    const listener = scroll(extraHeight);

    parent.addEventListener("click", listener);

    return () => {
      parent.removeEventListener("click", listener);
    };
  }, [parent, extraHeight]);
}

function scroll(extraHeight: number = 0) {
  return function (event: MouseEvent) {
    const ele = event.target as HTMLElement;
    if (ele.tagName === "A") {
      event.preventDefault();
      const anchor = ele as HTMLAnchorElement;
      const href = anchor.getAttribute("href") || "#";
      const targetElement = document.querySelector(href);
      if (!targetElement) return;
      const { y } = targetElement.getBoundingClientRect();
      const scrollY = window.scrollY;
      const top = scrollY + y - extraHeight;
      window.scrollTo({
        behavior: "smooth",
        top,
        left: 0,
      });
    }
  };
}
