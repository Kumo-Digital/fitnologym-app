import { CircumferenceCard } from "@/components/ui/card/circumference-card/circumference-card";
import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import { BodySectionProps } from "@/types/measurements";
import { legsBodyMetrics } from "@/utils/measurement";
import { Flex, Group, Stack, Title, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type Measure = { [key: string]: any };
type legMeasures = {
  left_leg: { [key: string]: any }[];
  right_leg: { [key: string]: any }[];
  circumferences: { [key: string]: any }[];
};

export const BodySectionLegs = ({
  lastMeasure,
  evolution,
}: BodySectionProps) => {
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(`(max-width: ${em(768)})`);
  const isMobileLG = useMediaQuery(`(max-width: ${em(1024)})`);
  const legMeasures: legMeasures = Object.entries(lastMeasure.metrics).reduce(
    (measures, [metricName, value]: any) => {
      if (!legsBodyMetrics.includes(metricName)) return measures;

      if (metricName === "left_leg") {
        const leftLegMetric = Object.entries(value).map((metric: any) => ({
          metricName: metric[0],
          ...metric[1],
          evolution:
            evolution?.metrics[metricName][metric[0]].measure_evolution,
        }));
        return {
          ...measures,
          left_leg: leftLegMetric,
        };
      } else if (metricName === "right_leg") {
        const rightLegMetric = Object.entries(value).map((metric: any) => ({
          metricName: metric[0],
          ...metric[1],
          evolution:
            evolution?.metrics[metricName][metric[0]].measure_evolution,
        }));
        return {
          ...measures,
          right_leg: rightLegMetric,
        };
      } else if (metricName === "circumferenceGlutes") {
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
                        evolution?.metrics[metricName].measure_evolution,
                    },
                    right: {
                      ...value.right,
                      measure_evolution:
                        evolution?.metrics[metricName].measure_evolution,
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
                        evolution?.metrics[metricName].measure_evolution,
                    },
                    right: {
                      ...value.right,
                      measure_evolution:
                        evolution?.metrics[metricName].measure_evolution,
                    },
                  },
                },
              ],
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
    {} as legMeasures
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
          <Title order={4}>Pierna Izquierda</Title>
          {legMeasures.left_leg.map((value: Measure, index: number) => (
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
          <Title order={4}>Pierna Derecha</Title>
          {legMeasures.right_leg.map((value: Measure, index: number) => (
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
        {legMeasures.circumferences.map((value: Measure, index: number) => {
          console.log("legs values", value);
          if (value.metricName === "circumferenceGlutes") {
            return (
              <CircumferenceCard
                key={`${value.metricName}-${index}`}
                measureTitle={`${value.metricName}`}
                measureValue={value.measure_value}
                measureUnit={value.measure_uom}
                evolutionValue={value.evolution}
              />
            );
          } else {
            return (
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
            );
          }
        })}
      </Stack>
    </Stack>
  );
};
