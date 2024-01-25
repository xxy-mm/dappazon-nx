import { Item } from "@xxy/dappazon-contract/src/types";
import { FC, PropsWithChildren } from "react";

type ProductProps = PropsWithChildren<{ product: Item }>;
const Product: FC<ProductProps> = ({ product }) => {
  return (
    <div>
      <span>{product.id + ""}</span>
      <span>{product.name}</span>
      <span>{product.category}</span>
      <img src={product.image} />
      <span>{product.price + ""}</span>
      <span>{product.rating + ""}</span>
      <span>{product.stock + ""}</span>
      <span>{product.id + ""}</span>
    </div>
  );
};

export default Product;
