import { FC } from "react";

type CategoryListProps = {
  categories: string[];
};

export const CategoryList: FC<CategoryListProps> = ({ categories }) => {
  console.log(categories);
  return (
    <ul className="w-full flex bg-slate-800 text-white justify-center gap-x-12 py-1">
      {categories.map((category) => (
        <li key={category}>{category}</li>
      ))}
    </ul>
  );
};
