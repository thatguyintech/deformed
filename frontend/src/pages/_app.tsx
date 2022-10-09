import "../styles/global.css";

import type { AppProps } from "next/app";

import Default from "@/layouts/Default";

import { Web3AuthProvider } from "../hooks/useWeb3Auth";
import { Meta } from "@/layouts/Meta";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Web3AuthProvider>
    <Default>
      <Meta title="Deformed" description="Decentralized forms lol" />
      <Component {...pageProps} />;
    </Default>
  </Web3AuthProvider>
);

export default MyApp;
