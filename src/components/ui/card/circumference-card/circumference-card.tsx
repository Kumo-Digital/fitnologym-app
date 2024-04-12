import { getMeasureName } from "@/utils/measurement";
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronsDown,
  IconChevronsUp,
  IconLineDashed,
} from "@tabler/icons-react";

interface CircumferenceCardProps {
  measureTitle: string;
  measureUnit: string;
  measureValue: number;
  evolutionValue: number;
}

export const CircumferenceCard = ({
  measureTitle,
  measureValue,
  measureUnit,
  evolutionValue,
}: CircumferenceCardProps) => {
  const theme = useMantineTheme();
  return (
    <Card radius="md" withBorder p={0}>
      <Group gap={16} p={16} align="stretch">
        <Box miw={8} bg="lime.5" style={{ borderRadius: 9999 }}></Box>
        <Text size="xl" fw={600} c="gray.0" my="auto" style={{ flexGrow: 1 }}>
          {getMeasureName(measureTitle)}
        </Text>
        <Group gap={32}>
          <Stack align="flex-end" justify="space-between">
            <Text size="md" fw={600} c="gray.5">
              Medición
            </Text>
            <Group gap={8} align="baseline">
              <Text size="xl" fw={600} c="gray.0">
                {measureValue}
              </Text>
              <Text size="sm" c="gray.5">
                {measureUnit}
              </Text>
            </Group>
          </Stack>
          <Stack align="flex-end" justify="space-between">
            <Text size="md" fw={600} c="gray.5">
              Evolución
            </Text>
            <Group align="baseline" gap={8}>
              {evolutionValue === 0 ||
                (!evolutionValue && (
                  <IconLineDashed
                    color={theme.colors.gray[5]}
                    aria-label="Options"
                    size={20}
                    style={{
                      position: "relative",
                      bottom: "-4px",
                    }}
                  />
                ))}
              {evolutionValue === null && (
                <IconLineDashed
                  color={theme.colors.gray[5]}
                  aria-label="Options"
                  size={20}
                  style={{
                    position: "relative",
                    bottom: "-4px",
                  }}
                />
              )}
              {evolutionValue < 0 && (
                <IconChevronsUp
                  color={theme.colors.lime[5]}
                  aria-label="Options"
                  size={20}
                  style={{
                    position: "relative",
                    bottom: "-4px",
                  }}
                />
              )}
              {evolutionValue > 0 && (
                <IconChevronsDown
                  color={theme.colors.lime[5]}
                  aria-label="Options"
                  size={20}
                  style={{
                    position: "relative",
                    bottom: "-4px",
                  }}
                />
              )}
              <Tooltip
                label={"Crecimiento respecto a la última medida"}
                position="bottom"
                multiline
                withArrow
                w={160}
              >
                {evolutionValue === 0 ||
                evolutionValue === null ||
                !evolutionValue ? (
                  <Group align="baseline" gap={8}>
                    <Text size="xl" c="gray.0" fw={600}>
                      0
                    </Text>
                  </Group>
                ) : (
                  <Group align="baseline" gap={8}>
                    <Text size="xl" c="gray.0" fw={600}>
                      {Math.abs(evolutionValue).toFixed(1)}
                    </Text>
                    <Text size="sm" c="gray.5">
                      %
                    </Text>
                  </Group>
                )}
              </Tooltip>
            </Group>
          </Stack>
        </Group>
      </Group>
    </Card>
  );
};
