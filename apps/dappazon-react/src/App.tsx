import "./App.css";

import Navigation from "~/components/Navigation/Navigation";

import { CategoryListContainer } from "./components/CategoryListContainer";
import { ProductDataProvider } from "./components/ProductDataProvider";
import { ProductsContainer } from "./components/ProductsContainer";

function App() {
  return (
    <div>
      <Navigation />
      <ProductDataProvider>
        <CategoryListContainer />
        <ProductsContainer />
      </ProductDataProvider>
    </div>
  );
}

export default App;
