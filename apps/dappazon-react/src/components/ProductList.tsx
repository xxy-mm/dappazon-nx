import { Item } from "@xxy/dappazon-contract/src/types";
import { FC } from "react";
import { Product } from "./Product";

type ProductsListProps = {
  products: Item[];
};
export const ProductList: FC<ProductsListProps> = ({ products }) => {
  return (
    <ul className="w-full flex justify-center gap-1 md:gap-4 sm:gap-2">
      {products.map((product) => (
        <li key={product.id}>
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
};
