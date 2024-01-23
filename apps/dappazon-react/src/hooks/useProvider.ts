import { BrowserProvider, Signer, ethers } from "ethers";
import { useCallback, useState } from "react";

export function useProvider() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);

  const getSigner = useCallback(async () => {
    if (signer) {
      return;
    }
    if (provider) {
      const signer = await provider.getSigner();
      return setSigner(signer);
    }
    console.error(
      "getSigner failed: no provider found, do you have Metamask installed?"
    );
  }, [provider, signer]);

  const getProvider = useCallback(() => {
    if (provider) {
      return provider;
    }
    if (!window.ethereum) {
      return console.error(
        "getProvider failed: please install metamask first."
      );
    }

    const _provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(_provider);
  }, [provider]);

  return {
    signer,
    provider,
    getSigner,
    getProvider,
  };
}
