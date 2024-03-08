import React from "react";
import { Card, ActionIcon, Text, Group, Stack, useMantineTheme } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

interface UserCardProps {
  title: string;
  subtitle: string;
  description: string;
  color?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  title,
  subtitle,
  description,
}) => {
  const theme = useMantineTheme();
  
  return (
    <Card
      bg="dark.7"
      radius="md"
      withBorder
    >
      <Stack p={12} gap={12}>
        <Group gap={8} align="center">
          <Stack style={{
            flexGrow: 1
          }}
          gap={0}>
            <Text size="md" c="gray.0">
              {title}
            </Text>
            <Text size="sm" c="gray.5">
              {subtitle}
            </Text>
          </Stack>
          <ActionIcon title="Options" variant="transparent">
                <IconDotsVertical
                  color={theme.colors.gray[6]}
                  aria-label="Options"
                  size={16}
                />
          </ActionIcon>
        </Group>
        <Text size="xs" c="gray.5">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};
