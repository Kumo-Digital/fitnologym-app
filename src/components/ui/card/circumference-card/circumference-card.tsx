import { getMeasureName } from "@/utils/measurement";
import { Box, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

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
            <Group gap={8} align="baseline">
              {evolutionValue > 0 ? (
                <IconTrendingUp
                  color="green"
                  aria-label="Options"
                  size={14}
                  style={{
                    position: "relative",
                    bottom: "-4px",
                  }}
                />
              ) : (
                <IconTrendingDown
                  color="red"
                  aria-label="Options"
                  size={16}
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
                <Group align="baseline" gap={8}>
                  <Text size="xl" c="gray.0" fw={600}>
                    {evolutionValue}
                  </Text>
                  <Text size="sm" c="gray.5">
                    %
                  </Text>
                </Group>
              </Tooltip>
            </Group>
          </Stack>
        </Group>
      </Group>
    </Card>
  );
};
