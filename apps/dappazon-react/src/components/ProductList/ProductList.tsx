import { Item } from "@xxy/dappazon-contract/src/types";
import { FC } from "react";
import Product from "../Product/Product";

type ProductsListProps = {
  products: Item[];
};
export const ProductList: FC<ProductsListProps> = ({ products }) => {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
};
