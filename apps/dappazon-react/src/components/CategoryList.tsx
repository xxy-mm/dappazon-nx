import { PropsWithChildren } from "react";

type CategoryListProps = PropsWithChildren<{
  categories: string[];
}>;
function CategoryList(props: CategoryListProps) {
  return (
    <div className="w-full flex">
      {props.categories.map((category) => (
        <li key={category}>{category}</li>
      ))}
    </div>
  );
}

export default CategoryList;
