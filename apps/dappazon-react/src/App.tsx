import "./App.css";

import { Navigation } from "~/components/Navigation";

import { CategoryListContainer } from "./components/CategoryListContainer";
import { ProductsByCategoryContainer } from "./components/CategoryProductsSectionContainer";
import { ProductDataProvider } from "./components/ProductDataProvider";

function App() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <ProductDataProvider>
        <div className="sticky top-12 z-10">
          <CategoryListContainer />
        </div>
        <ProductsByCategoryContainer />
      </ProductDataProvider>
    </>
  );
}

export default App;
