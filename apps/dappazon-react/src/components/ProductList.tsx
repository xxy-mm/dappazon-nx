import { Item } from "@xxy/dappazon-contract/src/types";
import { FC } from "react";
import { Product } from "./Product";

type ProductsListProps = {
  products: Item[];
};
export const ProductList: FC<ProductsListProps> = ({ products }) => {
  return (
    <ul className="w-full flex justify-center gap-x-1 md:gap-x-4 sm:gap-x-2 lg:gap-x-8">
      {products.map((product) => (
        <li
          key={product.id}
          className="hover:shadow"
        >
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
};
