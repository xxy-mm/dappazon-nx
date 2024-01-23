import { BrowserProvider, Signer } from "ethers";
import { FC, PropsWithChildren, createContext } from "react";
import { useProvider } from "~/hooks/useProvider";

type IAccountContext = {
  signer: Signer | null;
  provider: BrowserProvider | null;
  getProvider: () => void;
  getSigner: () => Promise<void>;
};
export const AccountContext = createContext<IAccountContext>(
  {} as IAccountContext
);

export const AccountContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { getProvider, getSigner, signer, provider } = useProvider();
  return (
    <AccountContext.Provider
      value={{
        signer,
        provider,
        getProvider,
        getSigner,
      }}>
      {children}
    </AccountContext.Provider>
  );
};
