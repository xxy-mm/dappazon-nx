import { AbstractProvider, ethers } from "ethers";
import { useEffect, useState } from "react";

export function useProvider() {
  const [provider, setProvider] = useState<AbstractProvider | null>(null);

  useEffect(() => {
    // TODO: what about there is another object rather than ethereum can also be used to create a provider?
    if (!window.ethereum) {
      const _provider = ethers.getDefaultProvider(
        import.meta.env.VITE_JSON_RPC
      );
      setProvider(_provider);
      return;
    }
    const _provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(_provider);
  }, []);

  return provider;
}
