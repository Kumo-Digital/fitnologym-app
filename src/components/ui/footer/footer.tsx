import { Anchor, Flex, Group, Text, em, useMantineTheme } from "@mantine/core";
import { NavLinks } from "../navbar/navlinks/navlinks";
import { useMediaQuery } from "@mantine/hooks";
import { appUrls } from "@/lib/appUrls";
import { APP_VERSION } from "@/utils/constants";

export const Footer = () => {
  const theme = useMantineTheme();
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
            © 2024 Fitnology 💚 Todos los derechos reservados. |{" "}
            <Text component="span" size="xs" c="gray.5">
              v. {APP_VERSION} |{" "}
            </Text>
            <Anchor
              title="Política de Privacidad"
              underline="never"
              c={theme.colors.lime[5]}
              href={appUrls.privacyPolicy}
            >
              Política de privacidad
            </Anchor>{" "}
            |{" "}
            <Anchor
              title="Términos y Condiciones"
              underline="never"
              c={theme.colors.lime[5]}
              href={appUrls.termsAndConditions}
            >
              Términos y Condiciones
            </Anchor>{" "}
            |{" "}
            <Anchor
              title="Contactanos"
              underline="never"
              c={theme.colors.lime[5]}
              href={appUrls.contact}
            >
              Contactanos
            </Anchor>{" "}
            | Desarrollo por Kumo Digital 🌧
          </Text>
        </Group>
        {isMobileNavLinks && <NavLinks />}
      </Flex>
    </footer>
  );
};
