import { ethers, network } from "hardhat";
import * as fs from "fs";
import contractAddresses from "../contractAddresses.json";

async function main() {
  const Deformed = await ethers.getContractFactory("Deformed");
  const deformed = await Deformed.deploy();

  await deformed.deployed();

  console.log(`deployed to ${deformed.address} on ${network.name}`);

  // Write deployed address to config file
  contractAddresses[network.name] = deformed.address;
  fs.writeFile('contractAddresses.json', JSON.stringify(contractAddresses, null, 2),
              function writeJSON(err) {
                if (err) return console.log(err);
            });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
