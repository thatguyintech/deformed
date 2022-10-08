import '../styles/global.css';

import type { AppProps } from 'next/app';

import Default from '@/layouts/Default';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Default>
    <Component {...pageProps} />;
  </Default>
);

export default MyApp;
