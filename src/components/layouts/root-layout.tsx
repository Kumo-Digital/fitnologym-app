import { Container, Stack, em } from "@mantine/core";
import { Navbar } from "../ui/navbar/navbar";
import { Footer } from "../ui/footer/footer";
import { useMediaQuery } from "@mantine/hooks";

export const RootLayout = ({ children }: any) => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  return (
    <Container size={1440} p={0}>
      <Stack px={isMobile ? 16 : 32} gap={16}>
        <Navbar />
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            // 64px is the height of the navbar, 46px is the height of the footer, 32px is both gaps
            minHeight: "calc(100vh - 64px - 46px - 32px)",
            width: "100%",
          }}
        >
          {children}
        </main>
        <Footer />
      </Stack>
    </Container>
  );
};
