import { Signer } from "ethers";
import { useState, useCallback } from "react";
import { useProvider } from "./useProvider";

export function useSigner() {
  const provider = useProvider();
  const [signer, setSigner] = useState<Signer | null>(null);

  const getSigner = useCallback(async () => {
    if (signer) {
      return;
    }
    if (provider) {
      return provider
        .getSigner()
        .then((signer) => setSigner(signer))
        .catch((err) => {
          console.error(`get signer failed with error: ${err}`);
        });
    }
    return console.warn(`get signer failed: no provider provided.`);
  }, [provider, signer]);

  return { signer, getSigner };
}
