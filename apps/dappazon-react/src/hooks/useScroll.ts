import { useEffect } from "react";

const defaultScrollOptions: ScrollIntoViewOptions = {
  behavior: "smooth",
  block: "start",
  inline: "start",
};

/**
 * change the behavior while clicking the anchor.
 * normally when the anchor is clicked, the page immediately jump to the target element.
 * use this hook can customize the scroll behavior.
 * @param parent the parent of the anchor elements. the anchor must have a `href` attribute.
 * @param options https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
 */
export function useScroll(
  parent: HTMLElement | null,
  options?: ScrollIntoViewOptions
) {
  useEffect(() => {
    if (!parent) return;
    const anchors = parent.querySelectorAll(`a[href^="#"]`);
    const listener = scroll({
      ...defaultScrollOptions,
      ...(options ?? {}),
    });

    anchors.forEach((ele) => ele.addEventListener("click", listener));

    return () => {
      anchors.forEach((ele) => ele.removeEventListener("click", listener));
    };
  }, [parent, options]);
}

function scroll(options?: ScrollIntoViewOptions) {
  return function (event: Event) {
    event.preventDefault();
    const anchor = event.target as HTMLAnchorElement;
    const href = anchor.getAttribute("href") || "#";
    const targetElement = document.querySelector(href);
    targetElement?.scrollIntoView(options);
  };
}
