import { CircumferenceCard } from "@/components/ui/card/circumference-card/circumference-card";
import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import { BodySectionProps } from "@/types/measurements";
import { legsBodyMetrics } from "@/utils/measurement";
import { Group, Stack, Title } from "@mantine/core";

type Measure = { [key: string]: any };
type legMeasures = {
  left_leg: { [key: string]: any }[];
  right_leg: { [key: string]: any }[];
  circumferences: { [key: string]: any }[];
};

export const BodySectionLegs = ({
  lastMeasure,
  evolution
}: BodySectionProps) => {
  const legMeasures: legMeasures = Object.entries(lastMeasure.metrics).reduce(
    (measures, [metricName, value]: any) => {
      if (!legsBodyMetrics.includes(metricName)) return measures;

      if (metricName === "left_leg") {
        const leftLegMetric = Object.entries(value).map((metric: any) => ({
          metricName: metric[0],
          ...metric[1],
          evolution: evolution?.metrics[metricName][metric[0]].measure_evolution,
        }));
        return {
          ...measures,
          left_leg: leftLegMetric,
        };
      } else if (metricName === "right_leg") {
        const rightLegMetric = Object.entries(value).map((metric: any) => ({
          metricName: metric[0],
          ...metric[1],
          evolution: evolution?.metrics[metricName][metric[0]].measure_evolution,
        }));
        return {
          ...measures,
          right_leg: rightLegMetric,
        };
      } else {
        return {
          ...measures,
          circumferences: measures?.circumferences
            ? [
                ...measures?.circumferences,
                {
                  metricName,
                  evolution: evolution?.metrics[metricName].measure_evolution,
                  ...value,
                },
              ]
            : [
                {
                  metricName,
                  ...value,
                  evolution: evolution?.metrics[metricName].measure_evolution,
                },
              ],
        };
      }
    },
    {} as legMeasures
  );

  return (
    <Stack>
      <Group grow gap={16}>
        <Stack>
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
        <Stack>
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
      </Group>
      <Stack>
        <Title order={4}>Circunferencias</Title>
        {legMeasures.circumferences.map((value: Measure, index: number) => (
          <CircumferenceCard
            key={`${value.metricName}-${index}`}
            measureTitle={value.metricName}
            measureValue={value.measure_value}
            measureUnit={value.measure_uom}
            evolutionValue={value.evolution}
          />
        ))}
      </Stack>
    </Stack>
  );
};
