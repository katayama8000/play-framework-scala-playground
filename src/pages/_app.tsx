import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import "src/lib/tailwind.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useMoveTask } from "@hooks/useMoveTask";
import { useComplete } from "@hooks/useComplete";

function MyApp({ Component, pageProps }: AppProps) {
  useMoveTask();
  //useComplete();
  return (
    <>
      <Head>
        <title>Life Is Short</title>
      </Head>
      <main className="m-auto max-w-3xl">
        <Link href="/">
          <a className="mx-2">today</a>
        </Link>
        <Link href="/tomorrowtask">
          <a className="mx-2">tomorrow</a>
        </Link>
        <Link href="/dashboard" className="mx-2">
          <a className="mx-2">dashboard</a>
        </Link>
        <MantineProvider
          theme={{ colorScheme: "dark" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider position="bottom-right" zIndex={2077}>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </main>
    </>
  );
}

export default MyApp;
