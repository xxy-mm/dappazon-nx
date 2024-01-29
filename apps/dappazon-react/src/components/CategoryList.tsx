import { FC, useRef } from "react";
import { useScroll } from "~/hooks/useScroll";

type CategoryListProps = {
  categories: string[];
};

export const CategoryList: FC<CategoryListProps> = ({ categories }) => {
  const ulRef = useRef<HTMLUListElement>(null);

  useScroll(ulRef.current);

  return (
    <ul
      ref={ulRef}
      className="w-full flex bg-slate-800 text-white justify-center gap-x-12 py-1"
    >
      {categories.map((category) => (
        <li key={category}>
          <a href={`#${category}`}>{category}</a>
        </li>
      ))}
    </ul>
  );
};
