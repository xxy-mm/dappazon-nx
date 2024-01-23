import { BrowserProvider, Signer, ethers } from "ethers";

// todo: create a manager to manger provider, signer, contract.
export class AccountManager {
  _provider!: Promise<BrowserProvider>;
  _signer!: Promise<Signer>;
  get signer() {
    if (!this._signer) {
      this._signer = this.provider
        .then((provider) => provider.getSigner())
        .catch((err) => {
          console.error(`get signer failed with error: ${err}`);
          throw err;
        });
    }
    return this._signer;
  }

  get provider() {
    if (!this._provider) {
      this._provider = Promise.resolve(
        new ethers.BrowserProvider(window.ethereum)
      ).catch((err) => {
        console.error(`get provider failed with error: ${err}`);
        throw err;
      });
    }
    return this._provider;
  }
}
