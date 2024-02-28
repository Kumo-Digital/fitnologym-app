import { ActionIcon, Avatar, Group } from "@mantine/core";

export const NavLinks = () => {
  return (
    <Group>
      <ActionIcon variant="transparent" aria-label="Settings" size="xl">
        <Avatar radius="md" />
      </ActionIcon>
    </Group>
  );
};
