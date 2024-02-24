import { Item } from "@xxy/dappazon-contract/src/types";
import { FC } from "react";
import { CategoryTitle } from "./CategoryTitle";
import { ProductList } from "./ProductList";

type ProductsByCategorySectionProps = {
  category: string;
  products: Item[];
};

/**
 * a pure component used to display a specified category and a list of products in that category.
 */
export const ProductsByCategorySection: FC<ProductsByCategorySectionProps> = ({
  category,
  products,
}) => {
  return (
    <section className="border-red-100">
      <CategoryTitle title={category} />
      <ProductList products={products} />
    </section>
  );
};
