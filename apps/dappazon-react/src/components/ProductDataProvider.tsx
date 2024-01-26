import { Item } from "@xxy/dappazon-contract/src/types";
import { groupBy } from "lodash";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useContract } from "~/hooks/useContract";

type ProductsByCategory = {
  [prop: string]: Item[];
};
/**
 * context for product data
 * ! we should keep react components pure(only receive props and render the UI) and leave the logic of fetching data to `data providers`
 * ! for this project I'll try to follow this rule, and makes the components as pure as possible.
 */
export const ProductDataContext = createContext<ProductsByCategory>({});

/**
 * a provider to wrap components which consume product/category data.
 * ! avoid using context provider multiple times in the same page.
 * ! a data provider shouldn't have any styles.
 */
export const ProductDataProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const contract = useContract();
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory>({});

  useEffect(() => {
    contract && list();
    async function list() {
      if (!contract) return;

      const items: Item[] = [];
      for (let i = 0; i < 9; i++) {
        const item = await contract.items(i + 1);
        items.push(item);
      }

      const grouped = groupBy(items, "category");
      setProductsByCategory(grouped);
    }
  }, [contract]);
  return (
    <ProductDataContext.Provider value={productsByCategory}>
      {children}
    </ProductDataContext.Provider>
  );
};
