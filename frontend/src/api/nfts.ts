import { CredentialNFT } from "@/views/Answer/Answer";
import { Network, Alchemy } from "alchemy-sdk";

export const checkOwner = async (contractAddress: string, tokenId: string) => {
  // TODO replace with configs from .env
  const settings = {
    apiKey: "lIoQpeV-gUJNIM4SgQHI1spwAmZcGTzh",
    network: Network.MATIC_MUMBAI,
  };
  const alchemy = new Alchemy(settings);

  // Print all NFTs returned in the response:
  const resp = await alchemy.nft.getOwnersForNft(contractAddress, tokenId);

  return resp.owners.map((owner) => owner.toLowerCase());

}

export const fetchNFTMetadata = async (contractAddress: string, tokenId: string): Promise<CredentialNFT> => {
  // TODO replace with configs from .env
  const settings = {
    apiKey: "lIoQpeV-gUJNIM4SgQHI1spwAmZcGTzh",
    network: Network.MATIC_MUMBAI,
  };
  const alchemy = new Alchemy(settings);

  // Fetch NFT Metadata
  const resp = await alchemy.nft.getNftMetadata(contractAddress, tokenId);

  // Convert into CredentialNFT shape
  return {
    contractAddress: resp.contract.address,
    tokenId: resp.tokenId,
    mediaType: resp.media[0]?.format,
    mediaUrl: resp.media[0]!.gateway,
    name: resp.title,
    description: resp.description,
  }
}