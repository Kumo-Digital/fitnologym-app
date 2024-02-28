import { ActionIcon, Avatar, Group, Text } from "@mantine/core";
import Link from "next/link";

export const NavLinks = () => {
  return (
    <Group gap={16}>
      <Link href="#">
        <Text size="sm" c="gray.5" px={16}>
          Contacto
        </Text>
      </Link>
      <Link href="#">
        <Text size="sm" c="gray.5" px={16}>
          Admin
        </Text>
      </Link>
      <ActionIcon variant="transparent" aria-label="Settings" size="xl">
        <Avatar radius="md" />
      </ActionIcon>
    </Group>
  );
};
