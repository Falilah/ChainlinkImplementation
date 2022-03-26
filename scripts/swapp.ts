import { ethers } from "hardhat";
const linker = "0x71C05a4eA5E9d5b1Ac87Bf962a043f5265d4Bdc8";
async function main() {
  const swapp = await ethers.getContractFactory("Swapper");
  const swapper = await swapp.deploy();

  await swapper.deployed();

  //@ts-ignore
  await hre.network.provider.send("hardhat_setBalance", [
    linker,
    "0x1000000000000000000000",
  ]);
  // console.log("swapper balance:", await getBalance(swapper.address));

  // console.log("swapper deployed to:", swapper.address);
  // //@ts-ignore
  // await hre.network.provider.request({
  //   method: "hardhat_impersonateAccount",
  //   params: [linker],
  // });
  //@ts-ignore
  await network.provider.send("hardhat_setBalance", [
    swapper.address,
    "0x1000000000000000000000",
  ]);
  // console.log(await swapper.tokenLink.balanceOf(address(this)));

  const approveContract = await swapper.connect(linker).swapLinkToETH(20);
  console.log(approveContract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x09cC1c3c20273dB71d56C1B958826f0E0a0db47e
