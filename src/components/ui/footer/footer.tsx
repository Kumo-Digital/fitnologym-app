import { Group, Text } from "@mantine/core";

export const Footer = () => {
  return (
    <footer style={{ height: "46px" }}>
      <Group align="center" justify="center" h="100%">
        <Text size="xs" c="gray.5">
          © 2024 Fitnology 💚 Todos los derechos reservados. | Política de
          privacidad | Términos y condiciones | Contáctanos
        </Text>
      </Group>
    </footer>
  );
};
