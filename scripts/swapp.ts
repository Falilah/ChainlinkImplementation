// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://speedy-nodes-nyc.moralis.io/745b8dae0ac5f3d9d783f043/eth/kovan/archive"
  );
  const deploy = await ethers.getContractFactory("SwapToken");
  const contractDeploy = await deploy.deploy();

  await contractDeploy.deployed();

  console.log("Greeter deployed to:", contractDeploy.address);

  const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "getLatestPrice",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountin",
          type: "uint256",
        },
      ],
      name: "swapToken",
      outputs: [
        {
          internalType: "uint256",
          name: "amountout",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331";
  const priceFeeder = new ethers.Contract(
    addr,
    aggregatorV3InterfaceABI,
    provider
  );
  const tx = await priceFeeder.latestRoundData();
  console.log(tx.answer / 10 ** 8);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
