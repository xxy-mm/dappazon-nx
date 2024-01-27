import { useContext } from "react";
import { ProductDataContext } from "./ProductDataProvider";
import { ProductsByCategorySection } from "./ProductsByCategorySection";

export const ProductsByCategoryContainer = () => {
  const productsByCategory = useContext(ProductDataContext);

  return Object.keys(productsByCategory).map((category) => (
    <ProductsByCategorySection
      key={category}
      category={category}
      products={productsByCategory[category]}
    />
  ));
};
