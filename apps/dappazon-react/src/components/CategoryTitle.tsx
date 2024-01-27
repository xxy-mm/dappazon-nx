import { FC } from "react";

type CategoryTitleProps = {
  title: string;
};

export const CategoryTitle: FC<CategoryTitleProps> = ({ title }) => {
  return (
    <div className="w-full py-3 border-b-2 border-b-orange-950 text-xl">
      {title}
    </div>
  );
};
