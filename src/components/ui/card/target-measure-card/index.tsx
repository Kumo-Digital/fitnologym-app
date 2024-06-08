import { getRemainingPercentage } from "@/utils/measurement";
import {
  Card,
  Group,
  RingProgress,
  Stack,
  Text,
  Title,
  alpha,
  em,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(
    `(min-width: ${em(426)}) and (max-width: ${em(572)})`
  );
  const isMobileLG = useMediaQuery(
    `(min-width: ${em(769)}) and (max-width: ${em(1054)})`
  );

  const evolutionValue = getRemainingPercentage(currentValue, targetValue);

  if (isMobile || isMobileMD || isMobileLG)
    return (
      <TargetMeasureCardMobile
        currentValue={currentValue}
        targetValue={targetValue}
      />
    );
  return (
    <Card radius="md" withBorder p={0}>
      <Group gap={16} px={16} align="center" justify="center">
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
                {targetValue ? targetValue : "Sin objetivo"}
              </Title>
              <Text size="xs" c="gray.5">
                {targetValue ? "kg" : ""}
              </Text>
            </Group>
          </Stack>
          <RingProgress
            sections={[{ value: Math.round(evolutionValue), color: "lime" }]}
            label={
              <Text c="lime.5" fw={700} ta="center" size="xl">
                {evolutionValue ? Math.round(evolutionValue) : "-"}
              </Text>
            }
            roundCaps
          />
        </Group>
      </Group>
    </Card>
  );
};

const TargetMeasureCardMobile = ({
  currentValue,
  targetValue,
}: TargetMeasureCardProps) => {
  const theme = useMantineTheme();
  const evolutionValue = getRemainingPercentage(currentValue, targetValue);

  return (
    <Card radius="md" withBorder p={16}>
      <Stack gap={16}>
        <Group gap={16} flex={"1 0 0"} justify="space-between">
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
        <Group gap={16} flex={"1 0 0"} justify="space-between">
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
        </Group>
      </Stack>
    </Card>
  );
};
