import { BrowserProvider, ethers } from "ethers";
import { useEffect, useState } from "react";

export function useProvider() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    // todo: what about there is another object rather than ethereum can also used to create a provider?
    // Can a provider be created without such a project?
    // Is there a default provider user can use without install metamask or other wallets?
    if (!window.ethereum) {
      return console.error(
        "getProvider failed: please install metamask first."
      );
    }
    const _provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(_provider);
  }, []);

  return provider;
}
