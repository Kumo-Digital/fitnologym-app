import React from "react";
import { Card, Text, Group, Stack, Title } from "@mantine/core";
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
      // estilos para ver la card como en figma
      style={{ margin: "10px", width: "25%" }}
    >
      <Stack p={12} gap={12} justify="center">
        <Group gap={8}>
          <Group gap={20}>
            <div
              style={{
                width: "8px",
                height: "80px",
                backgroundColor: color,
                borderRadius: "6px",
              }}
            ></div>
            <Group gap={10} h={80}>
              <Stack
                gap={20}
                align="flex-start"
                h="100%"
                justify="space-between"
              >
                <Text size="md" c="gray.0" fw={700} h={36} w={149}>
                  {measureTitle}
                </Text>
                <Group align="baseline" gap={2}>
                  <Title order={2} c="gray.5" fw={700}>
                    {measure}
                  </Title>
                  <Text size="xs" c="gray.5">
                    {measureType}
                  </Text>
                </Group>
              </Stack>
              <Stack
                gap={32}
                align="flex-start"
                w={75}
                h="100%"
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
                      size={18}
                    />
                  ) : (
                    <IconTrendingDown
                      color="red"
                      aria-label="Options"
                      size={18}
                    />
                  )}
                  <Group align="baseline" gap={2}>
                    <Title order={3} c="gray.5" fw={700}>
                      {percentText}
                    </Title>
                    <Text size="sm" c="gray.5">
                      %
                    </Text>
                  </Group>
                </Group>
              </Stack>
            </Group>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};
