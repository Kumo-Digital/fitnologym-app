import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { RootLayout } from "@/components/layouts/root-layout";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  primaryColor: "lime",
  primaryShade: {
    dark: 5,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </MantineProvider>
  );
}
