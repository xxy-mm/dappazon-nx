/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
import { ethers } from "ethers";
declare global {
  interface Window {
    readonly ethereum: ethers.Eip1193Provider;
  }

  interface ImportMetaEnv {
    readonly VITE_CONTRACT_ADDRESS: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
