import { Flex, Group, Text, em } from "@mantine/core";
import { NavLinks } from "../navbar/navlinks/navlinks";
import { useMediaQuery } from "@mantine/hooks";

export const Footer = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const isMobileNavLinks = useMediaQuery(`(max-width: ${em(1024)})`);

  return (
    <footer style={{ height: "46px" }}>
      <Flex
        direction={isMobile ? "column" : "row"}
        justify={isMobileNavLinks ? "space-between" : "center"}
        align="center"
        wrap="nowrap"
        gap={32}
      >
        <Group align="center" justify="center" h="100%">
          <Text size="xs" c="gray.5" ta={isMobile ? "center" : "left"}>
            © 2024 Fitnology 💚 Todos los derechos reservados. | Política de
            privacidad | Términos y condiciones | Contáctanos
          </Text>
        </Group>
        {isMobileNavLinks && <NavLinks />}
      </Flex>
    </footer>
  );
};
