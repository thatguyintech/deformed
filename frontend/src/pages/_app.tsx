import '../styles/global.css';

import type { AppProps } from 'next/app';

import Default from '@/layouts/Default';

import { Web3AuthProvider } from "../hooks/useWeb3Auth";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Web3AuthProvider>
    <Default>
      <Component {...pageProps} />;
    </Default>
  </Web3AuthProvider>
);

export default MyApp;
