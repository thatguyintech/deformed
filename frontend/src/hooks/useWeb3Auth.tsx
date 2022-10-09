import React, { createContext, useContext, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../utils/web3RPC";

// Web3Auth ClientId -> move this to .env
const WEB3_AUTH_CLIENT_ID = "BKisNzJ-nHOLYH4ZrTvQhdbIjFBD0xm4AQIHoFxxm8-IlpWjVGSgiD8S8c7Soj0grFt0d4bi562ssZTdLXv8YXo"; // from https://dashboard.web3auth.io

interface Web3AuthContext {
  web3auth: Web3Auth | null;
  web3authProvider: SafeEventEmitterProvider | null;
  login: any;
  logout: any;
  getAccounts: any;
  sendTransaction: any;
}

const Context = createContext<Web3AuthContext>({
  web3auth: null,
  web3authProvider: null,
  login: null,
  logout: null,
  getAccounts: null,
  sendTransaction: null,
});

export const Web3AuthProvider = ({children}: any) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [web3authProvider, setWeb3authProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    if (!!web3auth && !!web3authProvider) {
      return;
    }

    const init = async () => {
      const w: Web3Auth = new Web3Auth({
        clientId: WEB3_AUTH_CLIENT_ID,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1", // TODO: support dynamic chain ID
          rpcTarget: "https://eth-mainnet.g.alchemy.com/v2/EGanVQmmBmhP5M7_tGsPEyI6YDQfngjZ", // TODO: support dynamic rpc url
        },
      });

      await w.initModal();

      setWeb3auth(w);

      if (w.provider) {
        setWeb3authProvider(w.provider);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setWeb3authProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setWeb3authProvider(null);
  };

  const getChainId = async () => {
    if (!web3authProvider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3authProvider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };

  const getAccounts = async () => {
    if (!web3authProvider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3authProvider);
    const address = await rpc.getAccounts();
    console.log(address);
    return address;
  };

  const getBalance = async () => {
    if (!web3authProvider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3authProvider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!web3authProvider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3authProvider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!web3authProvider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3authProvider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!web3authProvider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3authProvider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  return (
    <Context.Provider value={{ web3auth, web3authProvider, login, logout, getAccounts, sendTransaction}}>
      {children}
    </Context.Provider>
  ) 
};

/**
 * Consumer for Web3Auth object. Must be used within context of Web3AuthProvider.
 */
 export const useWeb3Auth = () => useContext(Context);