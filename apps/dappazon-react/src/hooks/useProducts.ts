import { Item } from "@xxy/dappazon-contract/src/types";
import { useEffect, useState } from "react";
import { useContract } from "~/hooks/useContract";

export function useProducts() {
  const contract = useContract();
  const [products, setProducts] = useState<Item[]>([]);

  useEffect(() => {
    if (!contract) return;
    const itemPromises: Promise<Item>[] = [];
    for (let i = 0; i < 9; i++) {
      itemPromises.push(contract.items(i + 1));
    }

    Promise.all(itemPromises).then((items) => {
      setProducts(items);
    });
  }, [contract]);
  return products;
}
