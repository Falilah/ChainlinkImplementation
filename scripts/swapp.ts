import { ethers } from "hardhat";

async function main() {
  const swapp = await ethers.getContractFactory("Swapper");
  const swapper = await swapp.deploy();

  await swapper.deployed();

  console.log("swapper deployed to:", swapper.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x09cC1c3c20273dB71d56C1B958826f0E0a0db47e
