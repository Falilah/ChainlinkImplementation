import { ethers } from "hardhat";
const daiholder = "0x5d38b4e4783e34e2301a2a36c39a03c45798c4dd";
const linkholder = "0x6bfcf40b22e07109a767a063dffff77341d6acf9";

async function main() {
  const Swapper = await ethers.getContractFactory("Swapper");
  const swapper = await Swapper.deploy();

  await swapper.deployed();

  const interactwithDAi = await ethers.getContractAt(
    "IERC20",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  );

  const interactwithLink = await ethers.getContractAt(
    "IERC20",
    "0x514910771AF9Ca656af840dff83E8264EcF986CA"
  );

  console.log("swapper deployed to:", swapper.address);

  //impersonation
  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [daiholder],
  });

  const signer = await ethers.getSigner(daiholder);

  //setting bal
  //@ts-ignore
  await network.provider.send("hardhat_setBalance", [
    daiholder,
    "0x10000000000000000",
  ]);

  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [linkholder],
  });
  const signer2 = await ethers.getSigner(linkholder);

  //setting bal
  //@ts-ignore
  await network.provider.send("hardhat_setBalance", [
    linkholder,
    "0x100000000000000000",
  ]);

  const ApproveTransaction = await interactwithDAi.approve(
    swapper.address,
    "900000000000000000000000000000"
  );

  const ApproveTransaction2 = await interactwithLink.approve(
    swapper.address,
    "900000000000000000000000000000"
  );
  //transfer token to swapper contract

  const linkInContract = await interactwithLink
    .connect(signer2)
    .transfer(swapper.address, "10000000000000000");
  console.log(
    "balance of link in swapper",
    await interactwithLink.balanceOf(swapper.address)
  );

  const DaiInContract = await interactwithDAi
    .connect(signer)
    .transfer(swapper.address, "10000000000000000");
  console.log(
    "balance of dai in swapper",
    await interactwithDAi.balanceOf(swapper.address)
  );

  const feed = await swapper.tokenPrice();
  console.log("price feed", feed);
  const swap = await swapper.connect(signer).swapDAItoLink(5);
  console.log("Dai to LINk", swap);

  const swap2 = await swapper.connect(signer2).swapLinktoDAI(5);
  console.log("Link to Dai", swap2);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
