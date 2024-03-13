import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { RootLayout } from "@/components/layouts/root-layout";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  primaryColor: "lime",
  primaryShade: {
    dark: 5,
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
}
