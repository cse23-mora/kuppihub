import type { AppProps } from 'next/app';
import Layout from '@/components/Layout'; // Using import alias configured
import '@/styles/globals.css'; // Import global styles

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
