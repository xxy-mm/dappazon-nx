import { flatten } from "lodash";
import { useContext } from "react";
import { ProductDataContext } from "./ProductDataProvider";
import { ProductList } from "./ProductList";

export const ProductsContainer = () => {
  const productsByCategory = useContext(ProductDataContext);
  const products = flatten(Object.values(productsByCategory));
  return <ProductList products={products} />;
};
