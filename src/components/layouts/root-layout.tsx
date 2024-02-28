import { Container, Stack } from "@mantine/core";
import { Navbar } from "../ui/navbar/navbar";
import { Footer } from "../ui/footer/footer";

export const RootLayout = ({ children }: any) => {
  return (
    <Container size={1440}>
      <Stack px={32} gap={16}>
        <Navbar />
        <main
          style={{
            // 64px is the height of the navbar, 46px is the height of the footer, 32px is both gaps
            minHeight: "calc(100vh - 64px - 46px - 32px)",
          }}
        >
          {children}
        </main>
        <Footer />
      </Stack>
    </Container>
  );
};
