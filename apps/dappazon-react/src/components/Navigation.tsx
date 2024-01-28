import { useEffect, useState } from "react";
import { useSigner } from "~/hooks/useSigner";

export const Navigation = () => {
  const [address, setAddress] = useState<string | null>(null);
  const { signer, getSigner } = useSigner();
  /**
   * * I have to separate the functionality of getting address into two parts:
   * 1. get signer by event handler
   * 2. get address by useEffect hook
   * ? Can I group the logic together in one place?
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

  const buttonText = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "connect";

  useEffect(() => {
    async function getAddress() {
      if (!signer) return;
      const address = await signer.getAddress();
      setAddress(address);
    }
    getAddress();
  }, [signer]);
  return (
    <div className="grid h-12 grid-cols-4 items-center justify-items-center bg-black">
      <h1 className="basis-1/4 text-center text-lg text-white">Dappazon</h1>
      <input
        type="text"
        className="col-span-2 justify-self-stretch outline-none px-2 py-1"
      />

      <button
        className="hover:bg-yellow-400 active:bg-yellow-500 bg-yellow-300 text-white rounded px-2 py-1 w-28 max-w-[85%] overflow-hidden text-ellipsis"
        role="button"
        onClick={() => login()}
      >
        {buttonText}
      </button>
    </div>
  );
};
