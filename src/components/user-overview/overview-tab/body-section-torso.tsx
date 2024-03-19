import { CircumferenceCard } from "@/components/ui/card/circumference-card/circumference-card";
import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import { torsoBodyMetrics } from "@/utils/measurement";
import { Stack, Title } from "@mantine/core";

type Measure = { [key: string]: any };
type TorsoMeasures = {
  torso: { [key: string]: any }[];
  circumferences: { [key: string]: any }[];
};

export const BodySectionTorso = ({ lastMeasure }: any) => {
  const torsoMeasures: TorsoMeasures = Object.entries(
    lastMeasure.metrics
  ).reduce((measures, [metricName, value]: any) => {
    if (!torsoBodyMetrics.includes(metricName)) return measures;

    if (metricName === "trunk") {
      const torsoMetrics = Object.entries(value).map((metric: any) => ({
        metricName: metric[0],
        ...metric[1],
      }));
      return {
        ...measures,
        torso: torsoMetrics,
      };
    } else {
      return {
        ...measures,
        circumferences: measures?.circumferences
          ? [...measures?.circumferences, { metricName, ...value }]
          : [{ metricName, ...value }],
      };
    }
  }, {} as TorsoMeasures);

  return (
    <Stack>
      <Title order={4}>Torso</Title>
      <Stack gap={16}>
        {torsoMeasures.torso.map((value: Measure, index: number) => (
          <MeasureCard
            key={`${value.metricName}-${index}`}
            measureTitle={value.metricName}
            measureValue={value.measure_value}
            measureUnit={value.measure_uom}
            evolutionValue={12}
            measureStatus={value.measure_status}
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
            evolutionValue={12}
          />
        ))}
      </Stack>
    </Stack>
  );
};
