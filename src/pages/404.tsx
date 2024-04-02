import { Stack, Title, Text, Button, em, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const { push } = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  return (
    <Container size={1024} h={"100vh"}>
      <Stack justify="center" align="center" h="100%" gap={32}>
        <Title order={1}>Aquí no hay nada que ver.</Title>
        <Stack justify="center" align="center" gap={16} maw={500}>
          <Text c="gray.0">
            La página que estás intentando abrir no existe. Puede que hayas
            escrito mal la dirección, o la página se haya movido a otra URL.
          </Text>
          <Text c="gray.0">
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

export default ErrorPage;
