import { FC } from "react";

type CategoryTitleProps = {
  title: string;
};

export const CategoryTitle: FC<CategoryTitleProps> = ({ title }) => {
  return (
    <h2
      className="w-full py-3 border-b-2 border-b-orange-950 text-xl mb-4"
      id={title}
    >
      {title}
    </h2>
  );
};
