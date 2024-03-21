import {
  Card,
  Group,
  RingProgress,
  Stack,
  Text,
  Title,
  alpha,
  useMantineTheme,
} from "@mantine/core";
import { IconWeight } from "@tabler/icons-react";

interface TargetMeasureCardProps {
  currentValue: number;
  targetValue: number;
}

export const TargetMeasureCard = ({
  currentValue,
  targetValue,
}: TargetMeasureCardProps) => {
  const theme = useMantineTheme();

  const evolutionValue =
    ((currentValue - targetValue) / currentValue) * 100 <= 0
      ? Math.abs(((currentValue - targetValue) / currentValue) * 100) - 100
      : ((currentValue - targetValue) / currentValue) * 100;

  console.log("currentValue", currentValue);
  console.log("targetValue", targetValue);
  console.log("evolutionValue", evolutionValue);
  return (
    <Card radius="md" withBorder p={0}>
      <Group gap={16} py={24} pl={16} pr={24} align="stretch">
        <Stack
          justify="center"
          align="center"
          w={64}
          h={64}
          style={{ borderRadius: 8 }}
          bg={alpha("var(--mantine-color-lime-5)", 0.2)}
        >
          <IconWeight size={32} color={theme.colors.lime[5]} />
        </Stack>
        <Group justify="space-between" flex="1 0 0">
          <Stack gap={4}>
            <Text size="md" fw={600} c="gray.0">
              Peso Actual
            </Text>
            <Group gap={4} align="baseline">
              <Title order={2} c="gray.0">
                {currentValue}
              </Title>
              <Text size="xs" c="gray.5">
                kg
              </Text>
            </Group>
          </Stack>
          <Stack gap={4}>
            <Text size="md" fw={600} c="gray.0">
              Peso Objetivo
            </Text>
            <Group gap={4}>
              <Title order={2} c="gray.0">
                {targetValue}
              </Title>
              <Text size="xs" c="gray.5">
                kg
              </Text>
            </Group>
          </Stack>
          <RingProgress
            sections={[{ value: Math.round(evolutionValue), color: "lime" }]}
            label={
              <Text c="lime.5" fw={700} ta="center" size="xl">
                {Math.round(evolutionValue)}%
              </Text>
            }
            roundCaps
          />
        </Group>
      </Group>
    </Card>
  );
};
