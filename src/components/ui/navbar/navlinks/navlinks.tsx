import { logoutUser } from "@/services/auth";
import { Avatar, Button, Group } from "@mantine/core";
import { useRouter } from "next/router";

export const NavLinks = () => {
  const { push } = useRouter();
  return (
    <Group gap={32}>
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

      {/* <ActionIcon variant="transparent" aria-label="Settings" size="xl"> */}
      <Avatar radius="md" />
      {/* </ActionIcon> */}
    </Group>
  );
};
