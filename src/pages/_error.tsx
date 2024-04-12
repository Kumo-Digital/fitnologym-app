import {
  Button,
  Container,
  Stack,
  Title,
  em,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const { push } = useRouter();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);

  return (
    <Container size={1024} h={"100vh"} p={isMobile ? 16 : 64}>
      <Stack
        justify="center"
        align="center"
        h="100%"
        gap={32}
        style={{
          border: `2px dashed ${theme.colors.gray[8]}`,
          borderRadius: 12,
        }}
        p={16}
      >
        <Title order={1} ta="center">
          Aquí no hay nada que ver.
        </Title>
        <Stack justify="center" align="center" gap={16} maw={500}>
          <Text c="gray.0" ta="center">
            La página que estás intentando abrir no existe. Puede que hayas
            escrito mal la dirección, o la página se haya movido a otra URL.
          </Text>
          <Text c="gray.0" ta="center">
            Si crees que esto es un error, contacta con el soporte técnico.
          </Text>
        </Stack>
        <Button
          onClick={() => push("/")}
          leftSection={<IconChevronLeft />}
          c="dark.7"
        >
          {isMobile ? "Volver" : "Volver a la página principal"}
        </Button>
      </Stack>
    </Container>
  );
};

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
