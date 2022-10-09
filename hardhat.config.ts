import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import { NetworksUserConfig } from "hardhat/types";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // https://hardhat.org/metamask-issue.html
    hardhat: {
      chainId: 1337
    },
  },
  // etherscan: {},
};

const {
  MUMBAI_NETWORK_RPC_URL,
  MUMBAI_PRIVATE_KEY,
  OPT_GOERLI_NETWORK_RPC_URL,
  OPT_GOERLI_PRIVATE_KEY,
} = process.env;

if (MUMBAI_NETWORK_RPC_URL && MUMBAI_PRIVATE_KEY) {
  (config.networks as NetworksUserConfig).mumbai = {
    chainId: 80001,
    url: MUMBAI_NETWORK_RPC_URL,
    accounts: [MUMBAI_PRIVATE_KEY],
  };
}

if (OPT_GOERLI_NETWORK_RPC_URL && OPT_GOERLI_PRIVATE_KEY) {
  (config.networks as NetworksUserConfig).optgoerli = {
    chainId: 420,
    url: OPT_GOERLI_NETWORK_RPC_URL,
    accounts: [OPT_GOERLI_PRIVATE_KEY],
  };
}

export default config;
