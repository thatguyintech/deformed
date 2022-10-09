import dotenv from "dotenv";

dotenv.config();

const Envs = ["development", "production"] as const;
import contractAddresses from "../../contractAddresses.json";

function isOfTypeEnvEnum(
  typeEnvCandidate: string,
): typeEnvCandidate is EnvEnum {
  return (Envs as readonly string[]).includes(typeEnvCandidate);
}
interface ChainConfig {
  chainID: number;
  rpcURL: string;
}

const CHAIN_CONFIGS: { [name: string]: ChainConfig } = {
  mumbai: {
    // The Polygon Mumbai test net
    chainID: 80001,
    rpcURL: process?.env?.RPC_URL!, // eslint-disable-line
  },
  localhost: {
    // Development (using hardhat - npx hardhat node)
    chainID: 1337,
    rpcURL: "http://127.0.0.1:8545",
  },
};

export type EnvEnum = typeof Envs[number];

export class Env {
  static getEnvironment(): EnvEnum {
    // eslint-disable-next-line
    if (isOfTypeEnvEnum(process.env.NODE_ENV!)) {
      return process.env.NODE_ENV as EnvEnum;
    } else {
      return "development";
    }
  }

  static getCurrentChainConfig(): ChainConfig {
    const environment = this.getEnvironment();
    if (environment === "production") {
      return CHAIN_CONFIGS.mumbai;
    } else {
      return CHAIN_CONFIGS.localhost;
    }
  }

  static getContractAddress(): string {
    const environment = this.getEnvironment();
    if (environment === "production") {
      return contractAddresses.mumbai;
    } else {
      return contractAddresses.localhost;
    }
  }

  static getWeb3StorageApiToken(): string {
    return process.env.WEB3_STORAGE_API_TOKEN as string;
  }

  static getAlchemyApiKey(): string {
    return process.env.ALCHEMY_API_KEY as string;
  }
}
