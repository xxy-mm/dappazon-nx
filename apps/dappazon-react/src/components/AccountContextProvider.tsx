import { AbstractProvider, Signer } from "ethers";
import { FC, PropsWithChildren, createContext } from "react";
import { useProvider } from "~/hooks/useProvider";
import { useSigner } from "~/hooks/useSigner";

type IAccountContext = {
  provider: AbstractProvider | null;
  signer: Signer | null;
  getSigner: () => Promise<void>;
};
export const AccountContext = createContext<IAccountContext>(
  {} as IAccountContext
);
/**
 * ! DEPRECATED: whenever we need the provider or signer, we can use the useSigner/useProvider hooks!
 */
export const AccountContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const provider = useProvider();
  const { signer, getSigner } = useSigner();
  return (
    <AccountContext.Provider
      value={{
        provider,
        signer,
        getSigner,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
