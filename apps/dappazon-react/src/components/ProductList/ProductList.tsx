import { Item } from "@xxy/dappazon-contract/src/types";
import { useEffect, useState } from "react";
import { useContract } from "~/hooks/useContract";
import Product from "../Product/Product";
import "./ProductList.css";
import groupBy from "lodash/groupBy";
function ProductList() {
  const contract = useContract();
  const [products, setProducts] = useState<Item[]>([]);
  useEffect(() => {
    contract && list();
    async function list() {
      if (!contract) return;
      const items = [];
      for (let i = 0; i < 9; i++) {
        const item = await contract.items(i + 1);

        items.push(item);
      }
      setProducts(items);
      console.log(groupBy(items, "category"));
    }
  }, [contract]);

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
