import { Dappazon } from "@xxy/dappazon-contract/typechain-types/contracts/Dappazon";

import { abi } from "@xxy/dappazon-contract/artifacts/contracts/Dappazon.sol/Dappazon.json";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "~/components/AccountContextProvider";
import { Contract } from "ethers";

export function useContract() {
  const [contract, setContract] = useState<Contract | null>(null);
  const { provider, getProvider } = useContext(AccountContext);

  useEffect(() => {
    if (!provider) {
      getProvider();
      console.log("get provider in useContract...");
    }
  }, [getProvider, provider]);

  useEffect(() => {
    if (!provider) return;
    const contract = new ethers.Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      abi,
      provider
    );
    setContract(contract);
  }, [provider, setContract]);

  return contract;
}
