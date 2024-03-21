import React from "react";
import { Card, Text, Group, Stack, Title, Box, Tooltip, useMantineTheme } from "@mantine/core";
import { IconChevronsDown, IconChevronsUp, IconLineDashed } from "@tabler/icons-react";
import { getMeasureName, getMeasureStatusColor } from "@/utils/measurement";

interface MeasureCardProps {
  measureTitle: string;
  measureValue: number;
  measureUnit: string;
  evolutionValue: number;
  measureStatus: number;
}

export const MeasureCard: React.FC<MeasureCardProps> = ({
  measureTitle,
  measureValue,
  evolutionValue,
  measureUnit,
  measureStatus,
}) => {
  const theme = useMantineTheme();

  return (
    <Card radius="md" withBorder p={0}>
      <Group gap={16} py={24} pl={16} pr={24} align="stretch" wrap="nowrap">
        <Box
          miw={8}
          bg={getMeasureStatusColor(measureStatus ?? 1)}
          style={{ borderRadius: 9999 }}
        ></Box>
        <Stack
          gap={4}
          align="flex-start"
          h="100%"
          justify="space-between"
          style={{ flexGrow: 1 }}
        >
          <Text size="md" c="gray.0" fw={600} maw={150}>
            {getMeasureName(measureTitle)}
          </Text>
          <Group align="baseline" gap={4}>
            <Title order={2} c="gray.0" fw={600}>
              {measureValue}
            </Title>
            <Text size="xs" c="gray.5">
              {measureUnit}
            </Text>
          </Group>
        </Stack>
        <Stack gap={4} align="flex-start" justify="space-between">
          <Text size="md" c="gray.0" fw={700} h={36} w={75}>
            Evolución
          </Text>
          <Group align="baseline" gap={8}>
            {evolutionValue === 0 &&
            <IconLineDashed
            color={theme.colors.gray[5]}
            aria-label="Options"
            size={20}
            style={{
              position: "relative",
              bottom: "-4px",
            }}
            />
            }
            {evolutionValue === null &&
            <IconLineDashed
            color={theme.colors.gray[5]}
            aria-label="Options"
            size={20}
            style={{
              position: "relative",
              bottom: "-4px",
            }}
            />
            }
            {evolutionValue < 0 &&
            <IconChevronsUp
            color={theme.colors.lime[5]}
            aria-label="Options"
            size={20}
            style={{
              position: "relative",
              bottom: "-4px",
            }}
            />
            }
            {evolutionValue > 0 &&
            <IconChevronsDown
            color={theme.colors.lime[5]}
            aria-label="Options"
            size={20}
            style={{
              position: "relative",
              bottom: "-4px",
            }}
            />
            }
            <Tooltip
              label={"Crecimiento respecto a la última medida"}
              position="bottom"
              multiline
              withArrow
              w={160}
            >
              {evolutionValue === 0 || evolutionValue === null ?
              <Group align="baseline" gap={8}>
                <Text size="xl" c="gray.0" fw={600}>
                  0
                </Text>
              </Group>
              :
              <Group align="baseline" gap={8}>
                <Text size="xl" c="gray.0" fw={600}>
                  {Math.abs(evolutionValue).toFixed(1)}
                </Text>
                <Text size="sm" c="gray.5">
                  %
                </Text>
              </Group>
              }
            </Tooltip>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};
