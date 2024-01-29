import { BrowserProvider, Signer } from "ethers";
import { useCallback, useState } from "react";
import { useProvider } from "./useProvider";

/**
 * TODO: preserve login state after page refreshed.
 */
export function useSigner() {
  const provider = useProvider();
  const [signer, setSigner] = useState<Signer | null>(null);

  const getSigner = useCallback(async () => {
    if (signer) {
      return;
    }
    if (provider && provider instanceof BrowserProvider) {
      return provider
        .getSigner()
        .then((signer) => setSigner(signer))
        .catch((err) => {
          console.error(`get signer failed with error: ${err}`);
        });
    }
    if (provider) {
      return console.error(`Please install a wallet first.`);
    }
    return console.warn(`get signer failed: no valid provider provided.`);
  }, [provider, signer]);

  return { signer, getSigner };
}
