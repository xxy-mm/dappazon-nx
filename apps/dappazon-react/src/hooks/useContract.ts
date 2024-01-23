import { abi } from "@xxy/dappazon-contract/artifacts/contracts/Dappazon.sol/Dappazon.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { useProvider } from "./useProvider";

export function useContract() {
  const [contract, setContract] = useState<Contract | null>(null);
  const provider = useProvider();

  useEffect(() => {
    if (!provider) return;
    // todo: support dynamic contract, user can select the contract, is it able to do that?
    // in order to do that, user should be possible to pass the arguments in to the application,
    // including contract address, abi, provider. The difficulty lies in the abi. Can I get the abi from contract address?
    // or there is a compatible abi I can use?
    const contract = new ethers.Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      abi,
      provider
    );
    setContract(contract);
  }, [provider, setContract]);

  return contract;
}
