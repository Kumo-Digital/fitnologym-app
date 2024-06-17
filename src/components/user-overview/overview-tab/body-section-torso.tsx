import { CircumferenceCard } from "@/components/ui/card/circumference-card/circumference-card";
import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import { BodySectionProps } from "@/types/measurements";
import { torsoBodyMetrics } from "@/utils/measurement";
import { Stack, Title } from "@mantine/core";

type Measure = { [key: string]: any };
type TorsoMeasures = {
  trunk: { [key: string]: any }[];
  circumferences: { [key: string]: any }[];
};

export const BodySectionTorso = ({
  lastMeasure,
  evolution,
  isEvolutionFromFirstToLast,
}: BodySectionProps) => {
  const torsoMeasures: TorsoMeasures = Object.entries(
    lastMeasure.metrics
  ).reduce((measures, [metricName, value]: any) => {
    if (!torsoBodyMetrics.includes(metricName)) return measures;

    if (metricName === "trunk") {
      const torsoMetrics = Object.entries(value).map((metric: any) => ({
        ...metric[1],
        metricName: metric[0],
        evolution: evolution?.metrics[metricName][metric[0]].measure_evolution,
      }));
      return {
        ...measures,
        trunk: torsoMetrics,
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
  }, {} as TorsoMeasures);

  return (
    <Stack>
      <Title order={4}>Torso</Title>
      <Stack gap={16}>
        {torsoMeasures.trunk.map((value: Measure, index: number) => (
          <MeasureCard
            key={`${value.metricName}-${index}`}
            measureTitle={value.metricName}
            measureValue={value.measure_value}
            measureUnit={value.measure_uom}
            evolutionValue={value.evolution}
            measureStatus={value.measure_status}
            isEvolutionFromFirstToLast={isEvolutionFromFirstToLast}
          />
        ))}
      </Stack>
      <Title order={4}>Circunferencias</Title>
      <Stack gap={16}>
        {torsoMeasures.circumferences.map((value: Measure, index: number) => (
          <CircumferenceCard
            key={`${value.metricName}-${index}`}
            measureTitle={value.metricName}
            measureValue={value.measure_value}
            measureUnit={value.measure_uom}
            evolutionValue={value.evolution}
            isEvolutionFromFirstToLast={isEvolutionFromFirstToLast}
          />
        ))}
      </Stack>
    </Stack>
  );
};
