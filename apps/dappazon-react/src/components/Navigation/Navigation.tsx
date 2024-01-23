import truncate from "lodash/truncate";
import "./Navigation.css";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../AccountContextProvider";

function Navigation() {
  const [address, setAddress] = useState<string | null>(null);
  const { signer, getSigner, getProvider } = useContext(AccountContext);

  const login = async () => {
    if (!signer) return await getSigner();
  };
  useEffect(() => {
    getProvider();
  }, [getProvider]);

  useEffect(() => {
    async function getAddress() {
      if (!signer) return;
      const address = await signer.getAddress();
      setAddress(address);
    }
    getAddress();
  }, [signer]);
  return (
    <div className="navigation">
      <h1 className="navigation__brand">Dappazon</h1>
      <input
        type="text"
        className="navigation__search"
      />
      <button
        className="navigation__connect"
        onClick={() => login()}>
        {address ? truncate(address, { length: 8, omission: "" }) : "connect"}
      </button>
    </div>
  );
}

export default Navigation;
