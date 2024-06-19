import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "dayjs/locale/es";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { DatesProvider } from "@mantine/dates";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  primaryColor: "lime",
  primaryShade: {
    dark: 5,
  },
});

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <DatesProvider settings={{ locale: "es" }}>
        <ModalsProvider>
          <Notifications limit={5} autoClose={7000} />
          {getLayout(<Component {...pageProps} />)}
        </ModalsProvider>
      </DatesProvider>
    </MantineProvider>
  );
}
