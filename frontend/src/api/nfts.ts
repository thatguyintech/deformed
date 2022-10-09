import { Network, Alchemy } from "alchemy-sdk";

export const checkOwner = async (contractAddress: string, tokenId: string) => {
  // TODO replace with configs from .env
  const settings = {
    apiKey: "demo",
    network: Network.MATIC_MUMBAI,
  };
  const alchemy = new Alchemy(settings);

  // Print all NFTs returned in the response:
  const resp = await alchemy.nft.getOwnersForNft(contractAddress, tokenId);

  return resp.owners.map((owner) => owner.toLowerCase());

}
