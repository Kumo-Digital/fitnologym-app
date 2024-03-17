import React from "react";
import { Card, Text, Group, Stack } from "@mantine/core";

interface GymCardProps {
  title: string;
  subtitle: string;
  description: string;
  color?: string;
  link?: string;
}

export const GymCard: React.FC<GymCardProps> = ({
  title,
  subtitle,
  description,
  link,
}) => {
  return (
    <Card bg="dark.7" radius="md" withBorder p={0}>
      <Stack p={12} gap={12}>
        <Group gap={8} align="center">
          <Stack
            style={{
              flexGrow: 1,
            }}
            gap={0}
          >
            <Text size="md" c="gray.0">
              {title}
            </Text>
            <Text size="sm" c="gray.5">
              {subtitle}
            </Text>
          </Stack>
          {/* <ActionIcon
            title="Ver Gimnasio"
            variant="subtle"
            onClick={() => push(link)}
          >
            <IconChevronRight
              color={theme.colors.gray[6]}
              aria-label="Options"
              size={16}
            />
          </ActionIcon> */}
        </Group>
        <Text size="xs" c="gray.5">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};
