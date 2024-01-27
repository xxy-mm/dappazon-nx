import "./App.css";

import Navigation from "~/components/Navigation/Navigation";

import { CategoryListContainer } from "./components/CategoryListContainer";
import { ProductsByCategoryContainer } from "./components/CategoryProductsSectionContainer";
import { ProductDataProvider } from "./components/ProductDataProvider";

function App() {
  return (
    <div>
      <Navigation />
      <ProductDataProvider>
        <CategoryListContainer />
        <ProductsByCategoryContainer />
      </ProductDataProvider>
    </div>
  );
}

export default App;
