import { getMeasureName } from "@/utils/measurement";
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconChevronsDown,
  IconChevronsUp,
  IconExclamationCircle,
  IconLineDashed,
} from "@tabler/icons-react";
import { BoxColorCard } from "./box-color-card";
import { MeasureCardInfoModal } from "./measure-card-info-modal";
import { useEffect, useState } from "react";
import { EvolutionValue } from "@/types/measurements";

interface MeasureCardProps {
  measureTitle: string;
  measureValue: number;
  measureUnit: string;
  evolutionValue: EvolutionValue;
  measureStatus: number;
  isEvolutionFromFirstToLast?: boolean;
}

const dontShowEvolution = ["body_water", "bmr", "physique_rating", "bone_mass"];

function openCheckModal(measure: string) {
  modals.open({
    children: <MeasureCardInfoModal measureTitle={measure} />,
    title: getMeasureName(measure),
    size: "md",
    withCloseButton: true,
    centered: true,
  });
}

export const MeasureCard: React.FC<MeasureCardProps> = ({
  measureTitle,
  measureValue,
  evolutionValue,
  measureUnit,
  measureStatus,
  isEvolutionFromFirstToLast,
}) => {
  const theme = useMantineTheme();
  const [isUnitToggled, setIsUnitToggled] = useState<boolean>(true);

  useEffect(() => {
    if (measureUnit !== "kg") return;

    const timer = setInterval(() => {
      setIsUnitToggled((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const notShowEvolution = dontShowEvolution.includes(measureTitle);

  const evolutionMessage: string = isEvolutionFromFirstToLast
    ? "Crecimiento entre la primera y la última medida"
    : "Crecimiento respecto a la última medida";

  return (
    <Card
      radius="md"
      withBorder
      p={0}
      onClick={() => {
        openCheckModal(measureTitle);
      }}
      style={{ cursor: "pointer" }}
    >
      <Group gap={16} py={24} pl={16} pr={24} align="stretch" wrap="nowrap">
        <BoxColorCard
          measureTitle={measureTitle}
          measureValue={measureValue}
          measureStatus={measureStatus}
        />
        <Stack
          gap={4}
          align="flex-start"
          h="100%"
          justify="space-between"
          style={{ flexGrow: 1 }}
        >
          <Group>
            <Group gap={4} wrap="nowrap">
              <Text size="md" c="gray.0" fw={600} maw={150}>
                {getMeasureName(measureTitle)}
              </Text>
              <IconExclamationCircle size={16} stroke={2} />
            </Group>
          </Group>
          <Group align="baseline" gap={4}>
            <Title order={2} c="gray.0" fw={600}>
              {measureValue}
            </Title>
            <Text size="xs" c="gray.5">
              {measureUnit}
            </Text>
          </Group>
        </Stack>

        {notShowEvolution || !evolutionValue ? null : (
          <Stack gap={4} align="flex-start" justify="space-between">
            <Text size="md" c="gray.0" fw={700} h={"auto"} w={75}>
              Evolución
            </Text>
            <Group align="baseline" pb={4} gap={8} wrap="nowrap">
              {(evolutionValue.percentage === 0 || !evolutionValue) && (
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
              {evolutionValue === null ||
                (Object.keys(evolutionValue).length === 0 && (
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
                label={
                  !evolutionValue
                    ? "Aún no hay medidas suficientes para contrastar"
                    : evolutionMessage
                }
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
                  <Box pos="relative">
                    <Transition
                      mounted={isUnitToggled}
                      duration={200}
                      transition="slide-down"
                      timingFunction="ease-in-out"
                      keepMounted
                    >
                      {(styles) => (
                        <Group
                          align="baseline"
                          gap={2}
                          style={styles}
                          wrap="nowrap"
                          pos="absolute"
                          bottom={-10}
                          left={0}
                        >
                          <Text size="xl" c="gray.0" fw={600}>
                            {Math.abs(evolutionValue.percentage).toFixed(1)}
                          </Text>
                          <Text size="sm" c="gray.5">
                            %
                          </Text>
                        </Group>
                      )}
                    </Transition>
                    <Transition
                      mounted={!isUnitToggled}
                      duration={200}
                      transition="slide-down"
                      timingFunction="ease-in-out"
                      keepMounted
                    >
                      {(styles) => (
                        <Group
                          align="baseline"
                          gap={2}
                          style={styles}
                          wrap="nowrap"
                          pos="absolute"
                          bottom={-10}
                          left={0}
                        >
                          <Text size="xl" c="gray.0" fw={600}>
                            {(evolutionValue.specific &&
                              Math.abs(evolutionValue.specific).toFixed(2)) ??
                              0}
                          </Text>
                          <Text size="sm" c="gray.5">
                            kg
                          </Text>
                        </Group>
                      )}
                    </Transition>
                  </Box>
                )}
              </Tooltip>
            </Group>
          </Stack>
        )}
      </Group>
    </Card>
  );
};
