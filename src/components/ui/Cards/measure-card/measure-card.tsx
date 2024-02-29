import React from "react";
import { Card, Text, Group, Stack, Title, Box } from "@mantine/core";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

interface MeasureCardProps {
  measureTitle: string;
  measure: number;
  measureType: string;
  percentTitle: string;
  percentText: number;
  color?: string;
  percent: number;
}

export const MeasureCard: React.FC<MeasureCardProps> = ({
  measureTitle,
  measure,
  percentTitle,
  percentText,
  measureType,
  color,
  percent,
}) => {
  return (
    <Card
      bg="dark.7"
      radius="md"
      withBorder
      w="25%"
      p={0}
    >
      <Group gap={16} py={24} pl={16} pr={24} align="stretch">
        <Box miw={8} bg={color} style={{borderRadius: 9999}}></Box>
        <Stack
        gap={4}
        align="flex-start"
        h="100%"
        justify="space-between"
        style={{ flexGrow: 1 }}
        >
          <Text size="md" c="gray.0" fw={600} maw={150}>
            {measureTitle}
          </Text>
          <Group align="baseline" gap={4}>
            <Title order={2} c="gray.0" fw={600}>
              {measure}
            </Title>
            <Text size="xs" c="gray.5">
              {measureType}
            </Text>
          </Group>
        </Stack>
        <Stack
          gap={4}
          align="flex-start"
          justify="space-between"
        >
          <Text size="md" c="gray.0" fw={700} h={36} w={75}>
            {percentTitle}
          </Text>
          <Group align="baseline" gap={8}>
            {percent > 0 ? (
              <IconTrendingUp
                color="green"
                aria-label="Options"
                size={14}
                style={{
                  position: 'relative',
                  bottom: '-4px',
                }}
              />
            ) : (
              <IconTrendingDown
                color="red"
                aria-label="Options"
                size={16}
                style={{
                  position: 'relative',
                  bottom: '-4px',
                }}
              />
            )}
            <Text size="xl" c="gray.0" fw={600}>
              {percentText}
            </Text>
            <Text size="sm" c="gray.5">
              %
            </Text>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};
