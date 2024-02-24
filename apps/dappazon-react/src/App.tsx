import "./App.css";

import { Navigation } from "~/components/Navigation";

import groupBy from "lodash/groupBy";
import { useMemo } from "react";
import { CategoryList } from "./components/CategoryList";
import { ProductsByCategorySection } from "./components/ProductsByCategorySection";
import { useProducts } from "./hooks/useProducts";

function App() {
  const products = useProducts();
  const productsByCategory = useMemo(
    () => groupBy(products, "category"),
    [products]
  );
  const categories = useMemo(
    () => Object.keys(productsByCategory),
    [productsByCategory]
  );
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>

      <div className="sticky top-12 z-10">
        <CategoryList categories={categories} />
      </div>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <ProductsByCategorySection
          key={category}
          category={category}
          products={products}
        />
      ))}
    </>
  );
}

export default App;
