import { Item } from "@xxy/dappazon-contract/src/types";
import { ethers } from "ethers";
import { FC, PropsWithChildren } from "react";
import { Rating } from "./Rating";
type ProductProps = PropsWithChildren<{ product: Item }>;
export const Product: FC<ProductProps> = ({ product }) => {
  return (
    <div className="group cursor-pointer flex flex-col gap-2 overflow-hidden text-ellipsis text-sm p-2">
      <div className="overflow-hidden">
        <img
          src={product.image}
          className="group-hover:scale-105 transition-transform duration-1000"
        />
      </div>
      <span className="">{product.name}</span>
      <div className="max-w-20 flex">
        <Rating value={Number(product.rating)} />
      </div>
      <span>{ethers.formatEther(product.price)} ETH</span>
    </div>
  );
};
