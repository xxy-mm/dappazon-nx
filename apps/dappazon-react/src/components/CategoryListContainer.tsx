import { useContext } from "react";
import { ProductDataContext } from "./ProductDataProvider";
import CategoryList from "./CategoryList";

/**
 * ! a container is a component consumes the data provider's data directly, converting it into a form suitable for the pure component.
 * ! like data providers, containers should not have any styles
 */
export const CategoryListContainer = () => {
  const productsByCategory = useContext(ProductDataContext);
  const categories = Object.keys(productsByCategory);
  return <CategoryList categories={categories} />;
};
