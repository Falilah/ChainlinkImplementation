import { ethers } from "hardhat";

const user = "0xb8001c3ec9aa1985f6c747e25c28324e4a361ec1";
async function main() {
  const connect = await ethers.getContractAt(
    "ISwapper",
    "0x4c4e37f68008ac0b1776f41ae478CB2e130490D8"
  );

  //@ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [user],
  });

  //@ts-ignore
  await network.provider.send("hardhat_setBalance", [
    user,
    "0x10000000000000000000000",
  ]);

  const signer = await ethers.getSigner(user);
  const bal = await signer.getBalance();
  console.log(bal);

  const pest = await connect.connect(signer).getToken(bal);
  const getFeed = await connect.tokenPrice();
  console.log(pest);
  console.log(`get feed ${getFeed}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
