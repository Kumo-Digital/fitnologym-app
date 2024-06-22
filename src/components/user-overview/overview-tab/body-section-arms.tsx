import { CircumferenceCard } from "@/components/ui/card/circumference-card/circumference-card";
import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import { BodySectionProps } from "@/types/measurements";
import { armsBodyMetrics } from "@/utils/measurement";
import { Flex, Group, Stack, Title, Switch, Text, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type Measure = { [key: string]: any };

type ArmMeasures = {
  left_arm: { [key: string]: any }[];
  right_arm: { [key: string]: any }[];
  circumferences: { [key: string]: any }[];
};

export const BodySectionArms = ({
  lastMeasure,
  evolution,
  isEvolutionFromFirstToLast,
  handleToggle,
}: BodySectionProps) => {
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(
    `(max-width: ${em(768)}) and (min-width: ${em(426)})`
  );
  const isMobileLG = useMediaQuery(
    `(max-width: ${em(1024)}) and (min-width: ${em(769)})`
  );
  const isMobileXL = useMediaQuery(`(min-width: ${em(1025)})`);

  const armMeasures: ArmMeasures = Object.entries(lastMeasure.metrics).reduce(
    (measures, [metricName, value]: any) => {
      if (!armsBodyMetrics.includes(metricName)) return measures;

      if (metricName === "left_arm") {
        const leftArmMetrics = Object.entries(value).map(
          (metric: [string, any]) => ({
            metricName: metric[0],
            ...metric[1],
            evolution: {
              ...evolution?.metrics[metricName][metric[0]].measure_evolution,
            },
          })
        );
        return {
          ...measures,
          left_arm: leftArmMetrics,
        };
      } else if (metricName === "right_arm") {
        const rightArmMetrics = Object.entries(value).map((metric: any) => ({
          metricName: metric[0],
          ...metric[1],
          evolution: {
            ...evolution?.metrics[metricName][metric[0]].measure_evolution,
          },
        }));
        return {
          ...measures,
          right_arm: rightArmMetrics,
        };
      } else {
        return {
          ...measures,
          circumferences: measures?.circumferences
            ? [
                ...measures?.circumferences,
                {
                  metricName,
                  metricValue: {
                    left: {
                      ...value.left,
                      measure_evolution: {
                        ...evolution?.metrics[`${metricName}Left`]
                          .measure_evolution,
                      },
                    },
                    right: {
                      ...value.right,
                      measure_evolution: {
                        ...evolution?.metrics[`${metricName}Right`]
                          .measure_evolution,
                      },
                    },
                  },
                },
              ]
            : [
                {
                  metricName,
                  metricValue: {
                    left: {
                      ...value.left,
                      measure_evolution: {
                        ...evolution?.metrics[`${metricName}Left`]
                          .measure_evolution,
                      },
                    },
                    right: {
                      ...value.right,
                      measure_evolution: {
                        ...evolution?.metrics[`${metricName}Right`]
                          .measure_evolution,
                      },
                    },
                  },
                },
              ],
        };
      }
    },
    {} as ArmMeasures
  );

  return (
    <Stack>
      <Flex
        direction={
          isMobileSM
            ? "column"
            : isMobileMD
            ? "row"
            : isMobileLG
            ? "column"
            : "row"
        }
        gap={16}
      >
        <Stack flex={"1 0 0"}>
          <Group justify="space-between" align="center" h={36}>
            <Title order={4}>Brazo Izquierdo</Title>
            {isMobileSM || isMobileLG ? (
              <Switch
                size="xl"
                checked={isEvolutionFromFirstToLast}
                onChange={() => handleToggle()}
                onLabel={
                  <Text size="xs" c="dark.7" fw={600} px={4}>
                    Completa
                  </Text>
                }
                offLabel={
                  <Text size="xs" fw={600} px={4}>
                    Actual
                  </Text>
                }
              />
            ) : null}
          </Group>
          {armMeasures.left_arm.map((value: Measure, index: number) => (
            <MeasureCard
              key={`${value.metricName}-${index}`}
              measureTitle={value.metricName}
              measureValue={value.measure_value}
              measureUnit={value.measure_uom}
              measureStatus={value.measure_status}
              evolutionValue={value.evolution}
              isEvolutionFromFirstToLast={isEvolutionFromFirstToLast}
            />
          ))}
        </Stack>
        <Stack flex={"1 0 0"}>
          <Group justify="space-between" align="center">
            <Title order={4}>Brazo Derecho</Title>
            {isMobileMD || isMobileXL ? (
              <Switch
                size="xl"
                checked={isEvolutionFromFirstToLast}
                onChange={() => handleToggle()}
                onLabel={
                  <Text size="xs" c="dark.7" fw={600} px={4}>
                    Completa
                  </Text>
                }
                offLabel={
                  <Text size="xs" fw={600} px={4}>
                    Actual
                  </Text>
                }
              />
            ) : null}
          </Group>
          {armMeasures.right_arm.map((value: Measure, index: number) => (
            <MeasureCard
              key={`${value.metricName}-${index}`}
              measureTitle={value.metricName}
              measureValue={value.measure_value}
              measureUnit={value.measure_uom}
              measureStatus={value.measure_status}
              evolutionValue={value.evolution}
              isEvolutionFromFirstToLast={isEvolutionFromFirstToLast}
            />
          ))}
        </Stack>
      </Flex>
      <Stack>
        <Title order={4}>Circunferencias</Title>
        {armMeasures.circumferences.map((value: Measure, index: number) => (
          <Stack gap={16} key={`${value.metricName}-Stack-${index}`}>
            <CircumferenceCard
              measureTitle={`${value.metricName}Left`}
              measureValue={value.metricValue.left.measure_value}
              measureUnit={value.metricValue.left.measure_uom}
              evolutionValue={value.metricValue.left.measure_evolution}
              isEvolutionFromFirstToLast={isEvolutionFromFirstToLast}
            />
            <CircumferenceCard
              measureTitle={`${value.metricName}Right`}
              measureValue={value.metricValue.right.measure_value}
              measureUnit={value.metricValue.right.measure_uom}
              evolutionValue={value.metricValue.right.measure_evolution}
              isEvolutionFromFirstToLast={isEvolutionFromFirstToLast}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
