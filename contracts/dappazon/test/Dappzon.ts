import { expect } from "chai";
import {
  time,
  takeSnapshot,
  SnapshotRestorer,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { Dappazon, Dappazon__factory } from "../typechain-types";

// TODO: How can I get the type from npm package?
type SignerWithAddress = Awaited<ReturnType<typeof ethers.getSigner>>;
// helper functions
const tokens = (n: number): bigint => {
  return ethers.parseUnits(n.toString(), "ether");
};
// fake item
const ID = 3;
const NAME = "LiNing Sport Shoes";
const IMAGE = "https://example.com/test-image";
const CATEGORY = "shoes";
// we must use bigint here to avoid variant bugs.
const PRICE = tokens(1);
const RATING = 4n;
const STOCK = 88n;

const AMOUNT = 1n;

describe("Dappazon", async () => {
  let deployer: SignerWithAddress;
  let buyer: SignerWithAddress;
  let Dappazon: Dappazon__factory;
  let snapshot: SnapshotRestorer;
  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();

    Dappazon = await ethers.getContractFactory("Dappazon");

    snapshot = await takeSnapshot();
  });

  afterEach(async () => {
    snapshot.restore();
  });

  describe("Deployment", async () => {
    it("should set the owner", async () => {
      const dappazon = await Dappazon.connect(deployer).deploy();
      expect(await dappazon.owner()).to.be.equal(deployer.address);
    });
  });

  describe("Add item", async () => {
    let dappazon: Dappazon;
    beforeEach(async () => {
      dappazon = await Dappazon.connect(deployer).deploy();
    });
    it("should add item with correct properties", async () => {
      const tx = await dappazon.addItem(
        ID,
        NAME,
        IMAGE,
        CATEGORY,
        PRICE,
        RATING,
        STOCK
      );
      await tx.wait();
      const item = await dappazon.items(ID);
      expect(item.id).to.be.equal(ID);
      expect(item.name).to.be.equal(NAME);
      expect(item.image).to.be.equal(IMAGE);
      expect(item.category).to.be.equal(CATEGORY);
      expect(item.price).to.be.equal(PRICE);
      expect(item.stock).to.be.equal(STOCK);
    });

    it("should emit AddItem event with correct params", async () => {
      const tx = await dappazon.addItem(
        ID,
        NAME,
        IMAGE,
        CATEGORY,
        PRICE,
        RATING,
        STOCK
      );
      await tx.wait();

      expect(tx)
        .to.emit(dappazon, "AddItem")
        .withArgs(await time.latest(), ID, NAME);
    });
  });

  describe("Buy item", async () => {
    let dappazon: Dappazon;

    beforeEach(async () => {
      dappazon = await Dappazon.connect(deployer).deploy();
      const tx = await dappazon.addItem(
        ID,
        NAME,
        IMAGE,
        CATEGORY,
        PRICE,
        RATING,
        STOCK
      );
      await tx.wait();
    });

    it("should success when provided correct params", async () => {
      const buyTx = dappazon.connect(buyer).buy(ID, 1, { value: PRICE });
      expect(buyTx).not.to.be.reverted;
    });

    it("should updates the contract balance", async () => {
      const balanceBeforeBuy = await ethers.provider.getBalance(
        dappazon.target
      );

      const buyTx = await dappazon.connect(buyer).buy(ID, 1, { value: PRICE });
      await buyTx.wait();

      const balanceAfterBuy = await ethers.provider.getBalance(dappazon.target);

      expect(balanceAfterBuy).to.be.greaterThan(balanceBeforeBuy);
    });

    it("should updates the orders", async () => {
      const ordersBeforeBuy = await dappazon.orders(buyer.address, 0);

      expect(ordersBeforeBuy.time).to.be.equal(0);

      const buyTx = await dappazon.connect(buyer).buy(ID, 1, { value: PRICE });
      await buyTx.wait();

      const ordersAfterBuy = await dappazon.orders(buyer.address, 0);

      expect(ordersAfterBuy.time).not.to.be.equal(0);
    });

    it("should updates the orderCount", async () => {
      const orderCountBeforeBuy = await dappazon.orderCount(buyer.address);

      expect(orderCountBeforeBuy).to.be.equal(0);

      const buyTx = await dappazon.connect(buyer).buy(ID, 1, { value: PRICE });
      await buyTx.wait();

      const orderCountAfterBuy = await dappazon.orderCount(buyer.address);

      expect(orderCountAfterBuy).to.be.equal(1);
    });

    it("should updates the item stock", async () => {
      const stockBeforeBuy = (await dappazon.items(ID)).stock;

      expect(stockBeforeBuy).to.be.equal(STOCK);

      const buyTx = await dappazon
        .connect(buyer)
        .buy(ID, AMOUNT, { value: PRICE });
      await buyTx.wait();

      const stockAfterBuy = (await dappazon.items(ID)).stock;

      expect(stockAfterBuy).to.be.equal(STOCK - AMOUNT);
    });

    it("should emit Buy event with correct params", async () => {
      const buyTx = await dappazon
        .connect(buyer)
        .buy(ID, AMOUNT, { value: PRICE * AMOUNT });
      await buyTx.wait();

      expect(buyTx)
        .emit(dappazon, "Buy")
        .withArgs(await time.latest(), ID, buyer.address, PRICE * AMOUNT);
    });

    it("should revert with correct message when amount < 1", async () => {
      const buyTx = dappazon.connect(buyer).buy(ID, 0, { value: PRICE });
      // note the difference: we write await before expect, not before the transaction.
      // if we await for the transaction, the error will pop up since there's a revert occurred which will not be catch by `expect`.
      await expect(buyTx).to.be.revertedWith("The minimal amount is 1.");
    });

    it("should revert with correct message when amount > item's stock", async () => {
      const buyTx = dappazon
        .connect(buyer)
        .buy(ID, STOCK + 1n, { value: PRICE * (STOCK + 1n) });

      await expect(buyTx).to.be.revertedWith(
        `Item out of stock, we currently only have ${STOCK}.`
      );
    });

    it("should revert with correct message when item does not exist", async () => {
      const buyTx = dappazon.connect(buyer).buy(ID + 1, 1, { value: PRICE });

      await expect(buyTx).to.be.revertedWith(
        "We don't have this item, please check your order."
      );
    });

    it("should revert with correct message when not enough ether received", async () => {
      const buyTx = dappazon.connect(buyer).buy(ID, 1, { value: PRICE - 1n });

      await expect(buyTx).to.be.revertedWith("Not enough ether provided.");
    });
  });

  describe("withdraw", () => {
    let dappazon: Dappazon;

    beforeEach(async () => {
      dappazon = await Dappazon.connect(deployer).deploy();
      const addTx = await dappazon
        .connect(deployer)
        .addItem(ID, NAME, IMAGE, CATEGORY, PRICE, RATING, STOCK);
      await addTx.wait();

      const buyTx = await dappazon
        .connect(buyer)
        .buy(ID, AMOUNT, { value: PRICE * AMOUNT });
      await buyTx.wait();
    });

    it("should success when called by owner", async () => {
      await expect(dappazon.connect(deployer).withdraw()).not.to.be.reverted;
    });

    it("should revert when not called by owner", async () => {
      await expect(dappazon.connect(buyer).withdraw()).to.be.revertedWith(
        "Only owner can do this."
      );
    });

    it("should update the contract balance", async () => {
      const balanceBefore = await ethers.provider.getBalance(dappazon.target);

      expect(balanceBefore).to.equal(PRICE * AMOUNT);

      const tx = await dappazon.connect(deployer).withdraw();
      await tx.wait();

      const balanceAfter = await ethers.provider.getBalance(dappazon.target);

      expect(balanceAfter).to.equal(0);
    });

    it("should update the owners balance", async () => {
      const balanceBefore = await ethers.provider.getBalance(deployer.address);

      const tx = await dappazon.withdraw();
      await tx.wait();

      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it("should emit Withdraw event with correct params", async () => {
      const contractBalance = await ethers.provider.getBalance(dappazon.target);

      const tx = await dappazon.withdraw();
      await tx.wait();

      expect(tx)
        .to.emit(dappazon, "Withdraw")
        .withArgs(await time.latest(), contractBalance);
    });
  });
});
