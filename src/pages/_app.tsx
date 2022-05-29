import "src/lib/tailwind.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Life is Short</title>
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="bottom-right" zIndex={2077}>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
