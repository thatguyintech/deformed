import { Network, Alchemy } from "alchemy-sdk";

import { Env } from "./env";
import { apiLogger } from "./logger";

const settings = {
  apiKey: Env.getAlchemyApiKey(),
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

interface TokenPointer {
  [contractAddress: string]: string[];
}

export async function getOwnedCredentials(
  address: string,
  tokenPointers: TokenPointer,
) {
  apiLogger.debug(
    { contractAddresses: Object.keys(tokenPointers) },
    `Getting nfts for owner ${address}`,
  );
  if (Object.keys(tokenPointers).length === 0) {
    return [];
  }
  const nftsForOwner = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: Object.keys(tokenPointers),
  });
  apiLogger.debug(nftsForOwner, `Found nfts for owner ${address}`);
  const ownedTokens = [];
  for (const nft of nftsForOwner.ownedNfts) {
    if (
      tokenPointers[nft.contract.address.toLowerCase()].includes(nft.tokenId)
    ) {
      ownedTokens.push({
        contractAddress: nft.contract.address,
        tokenId: nft.tokenId,
      });
    }
  }
  return ownedTokens;
}
