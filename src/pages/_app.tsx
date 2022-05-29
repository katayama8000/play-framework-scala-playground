import "src/lib/tailwind.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Life Is Short</title>
      </Head>
      <main className="m-auto max-w-4xl">
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider position="bottom-right" zIndex={2077}>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </main>
    </>
  );
}

export default MyApp;
