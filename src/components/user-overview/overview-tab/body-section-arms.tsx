import { CircumferenceCard } from "@/components/ui/card/circumference-card/circumference-card";
import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import { BodySectionProps } from "@/types/measurements";
import { armsBodyMetrics } from "@/utils/measurement";
import { Flex, Group, Stack, Title, em } from "@mantine/core";
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
}: BodySectionProps) => {
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(`(max-width: ${em(768)})`);
  const isMobileLG = useMediaQuery(`(max-width: ${em(1024)})`);

  const armMeasures: ArmMeasures = Object.entries(lastMeasure.metrics).reduce(
    (measures, [metricName, value]: any) => {
      if (!armsBodyMetrics.includes(metricName)) return measures;

      if (metricName === "left_arm") {
        const leftArmMetrics = Object.entries(value).map(
          (metric: [string, any]) => ({
            metricName: metric[0],
            ...metric[1],
            evolution:
              evolution?.metrics[metricName][metric[0]].measure_evolution,
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
          evolution:
            evolution?.metrics[metricName][metric[0]].measure_evolution,
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
                      measure_evolution:
                        evolution?.metrics[`${metricName}Left`]
                          .measure_evolution,
                    },
                    right: {
                      ...value.right,
                      measure_evolution:
                        evolution?.metrics[`${metricName}Right`]
                          .measure_evolution,
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
                      measure_evolution:
                        evolution?.metrics[`${metricName}Left`]
                          .measure_evolution,
                    },
                    right: {
                      ...value.right,
                      measure_evolution:
                        evolution?.metrics[`${metricName}Right`]
                          .measure_evolution,
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
          <Title order={4}>Brazo Izquierdo</Title>
          {armMeasures.left_arm.map((value: Measure, index: number) => (
            <MeasureCard
              key={`${value.metricName}-${index}`}
              measureTitle={value.metricName}
              measureValue={value.measure_value}
              measureUnit={value.measure_uom}
              measureStatus={value.measure_status}
              evolutionValue={value.evolution}
            />
          ))}
        </Stack>
        <Stack flex={"1 0 0"}>
          <Title order={4}>Brazo Derecho</Title>
          {armMeasures.right_arm.map((value: Measure, index: number) => (
            <MeasureCard
              key={`${value.metricName}-${index}`}
              measureTitle={value.metricName}
              measureValue={value.measure_value}
              measureUnit={value.measure_uom}
              measureStatus={value.measure_status}
              evolutionValue={value.evolution}
            />
          ))}
        </Stack>
      </Flex>
      <Stack>
        <Title order={4}>Circunferencias</Title>
        {armMeasures.circumferences.map((value: Measure, index: number) => (
          <Stack gap={16}>
            <CircumferenceCard
              key={`${value.metricName}Left-${index}`}
              measureTitle={`${value.metricName}Left`}
              measureValue={value.metricValue.left.measure_value}
              measureUnit={value.metricValue.left.measure_uom}
              evolutionValue={value.metricValue.left.evolution}
            />
            <CircumferenceCard
              key={`${value.metricName}Right-${index}`}
              measureTitle={`${value.metricName}Right`}
              measureValue={value.metricValue.right.measure_value}
              measureUnit={value.metricValue.right.measure_uom}
              evolutionValue={value.metricValue.right.evolution}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
