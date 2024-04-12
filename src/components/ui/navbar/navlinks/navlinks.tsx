import { logoutUser } from "@/services/auth";
import { Avatar, Button, Group, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";

export const NavLinks = () => {
  const { push } = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);

  return (
    <Group
      gap={32}
      justify={isMobile ? "space-between" : "flex-end"}
      align="center"
      wrap="nowrap"
    >
      <Button
        variant="subtle"
        color="gray"
        onClick={() => {
          logoutUser();
          push("/login");
        }}
      >
        Cerrar Sesión
      </Button>

      <Avatar radius="md" />
    </Group>
  );
};
