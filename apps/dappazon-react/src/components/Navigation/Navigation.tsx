import truncate from "lodash/truncate";
import { useEffect, useState } from "react";
import { useSigner } from "~/hooks/useSigner";
import "./Navigation.css";

function Navigation() {
  const [address, setAddress] = useState<string | null>(null);
  const { signer, getSigner } = useSigner();
  /* TODO: I have to separate the functionality of getting address into two parts:
   * 1. get signer by event handler
   * 2. get address by useEffect hook
   * Can I group the logic together in one place?
   * =======================================================================================================
   * Maybe I was wrong: the button just trigger a login action. The login may success or fail but that't not
   * the things which login action should handle.
   * working flow: user click -> trigger login -> metamask popup -> what's next? user may deny or just leave the popup there
   * That is not something that click event should know about neither should it care.
   * So login success and get the signer address should not be handled here.
   */
  const login = async () => {
    await getSigner();
  };

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

      {address ? (
        <button className="navigation__connect">
          {truncate(address, { length: 8, omission: "" })}
        </button>
      ) : (
        <button
          className="navigation__connect"
          onClick={() => login()}>
          {"connect"}
        </button>
      )}
    </div>
  );
}

export default Navigation;
