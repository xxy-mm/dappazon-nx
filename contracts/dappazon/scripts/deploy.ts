import { ethers } from "hardhat";
import { items } from "../src/items.json";
async function main() {
  const [deployer] = await ethers.getSigners();
  const dappazon = await ethers.deployContract("Dappazon");
  await dappazon.waitForDeployment();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const tx = await dappazon
      .connect(deployer)
      .addItem(
        item.id,
        item.name,
        item.image,
        item.category,
        ethers.parseEther(item.price),
        item.rating,
        item.stock
      );
    await tx.wait();
    console.log("item added:", item);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
