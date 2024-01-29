import { useEffect, useRef } from "react";
import { useProvider } from "~/hooks/useProvider";
import { useScroll } from "~/hooks/useScroll";

export const TestOutput = () => {
  const provider = useProvider();
  const ref = useRef<HTMLDivElement>(null);
  useScroll(ref.current);
  useEffect(() => {
    if (provider) {
      provider
        .getBlockNumber()
        .then((blocknumber) => provider.getBlock(blocknumber))
        .then((block) => console.log(block));
    }
  }, [provider]);
  return (
    <div ref={ref}>
      <h1>TestOutput</h1>
      <a href="#">test anchor</a>
    </div>
  );
};
