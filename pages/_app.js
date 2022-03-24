import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Layout from '../components/layout/layout';
import Script from 'next/script';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import * as ga from '../lib/google-analytics';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <Head>
        <title>giroq</title>
        <meta
          name="description"
          content="eventi, attivitá e cose da fare vicino a te"
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TP4VYN38MN"
        strategy="afterInteractive"
      />
      <Script id="google-analytics-script" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-TP4VYN38MN');
          `}
      </Script>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
