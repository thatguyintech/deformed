import { v4 as uuidv4 } from "uuid";
import { Web3Storage, File } from "web3.storage";

import { Env } from "./env";
import { ClientError, InternalServerError } from "./error";
import { apiLogger } from "./logger";

const web3StorageClient = new Web3Storage({
  token: Env.getWeb3StorageApiToken(),
});

export async function store(item: any) {
  const buffer = Buffer.from(JSON.stringify(item));

  apiLogger.debug(item, "Storing item in web3.storage...");
  const fileName = uuidv4();
  const cid = await web3StorageClient.put([new File([buffer], fileName)]);
  return `${cid}/${fileName}`;
}

export async function retrieve(cid: string, fileName: string) {
  const res = await web3StorageClient.get(cid);

  if (!res) {
    throw new InternalServerError(
      `Failed to get response when retrieving cid ${cid}.`,
    );
  }

  if (!res.ok) {
    throw new InternalServerError(
      `Failed to get cid ${cid} - [${res.status}] ${res.statusText}`,
    );
  }

  apiLogger.debug(
    res,
    `Response from web3.storage retrieval [${res.status}] ${res.statusText}`,
  );

  // unpack File objects from the response
  const files = await res.files();
  for (const file of files) {
    if (fileName === file.name) {
      const fileStr = new TextDecoder().decode(await file.arrayBuffer());
      return fileStr;
    }
  }
  throw new ClientError(`File ${fileName}, cid ${cid} not found`);
}
