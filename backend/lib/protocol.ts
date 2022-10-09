import { Deformed__factory, Deformed } from "@deformed/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";

import { Env } from "./env";

export function getJsonRpcProvider(): JsonRpcProvider {
  return new JsonRpcProvider(Env.getCurrentChainConfig().rpcURL);
}

export const deformed = Deformed__factory.connect(
  Env.getContractAddress(),
  getJsonRpcProvider(),
);
