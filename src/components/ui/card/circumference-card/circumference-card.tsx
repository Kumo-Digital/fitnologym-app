import { EvolutionValue } from "@/types/measurements";
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
  evolutionValue: EvolutionValue;
  isEvolutionFromFirstToLast: boolean;
}

export const CircumferenceCard = ({
  measureTitle,
  measureValue,
  measureUnit,
  evolutionValue,
  isEvolutionFromFirstToLast,
}: CircumferenceCardProps) => {
  const theme = useMantineTheme();

  const evolutionMessage: string = isEvolutionFromFirstToLast
    ? "Crecimiento entre la primera y la última medida"
    : "Crecimiento respecto a la última medida";

  return (
    <Card radius="md" withBorder p={0}>
      <Group gap={16} p={16} align="stretch">
        <Box miw={8} bg="gray.5" style={{ borderRadius: 9999 }}></Box>
        <Stack flex={"1 0 0"} align="flex-start" justify="center">
          <Text size="xl" fw={600} c="gray.0">
            {getMeasureName(measureTitle)}
          </Text>
        </Stack>
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
              {Object.keys(evolutionValue).length === 0 ||
                evolutionValue.percentage === 0 ||
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
              {Object.keys(evolutionValue).length === 0 ||
                (evolutionValue === null && (
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
              {evolutionValue.percentage < 0 && (
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
              {evolutionValue.percentage > 0 && (
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
                label={evolutionMessage}
                position="bottom"
                multiline
                withArrow
                w={160}
              >
                {Object.keys(evolutionValue).length === 0 ||
                evolutionValue.percentage === 0 ||
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
                      {Math.abs(evolutionValue.percentage).toFixed(1)}
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
