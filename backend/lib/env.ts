import dotenv from "dotenv";

dotenv.config();

const Envs = ["development", "production"] as const;

function isOfTypeEnvEnum(
  typeEnvCandidate: string,
): typeEnvCandidate is EnvEnum {
  return (Envs as readonly string[]).includes(typeEnvCandidate);
}

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

  static getWeb3StorageApiToken(): string {
    return process.env.WEB3_STORAGE_API_TOKEN as string;
  }
}
