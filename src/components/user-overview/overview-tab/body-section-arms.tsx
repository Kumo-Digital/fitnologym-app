import { CircumferenceCard } from "@/components/ui/card/circumference-card/circumference-card";
import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import { armsBodyMetrics } from "@/utils/measurement";
import { Group, Stack, Title } from "@mantine/core";

type Measure = { [key: string]: any };
type ArmMeasures = {
  left_arm: { [key: string]: any }[];
  right_arm: { [key: string]: any }[];
  circumferences: { [key: string]: any }[];
};

export const BodySectionArms = ({ lastMeasure }: any) => {
  const armMeasures: ArmMeasures = Object.entries(lastMeasure.metrics).reduce(
    (measures, [metricName, value]: any) => {
      if (!armsBodyMetrics.includes(metricName)) return measures;

      if (metricName === "left_arm") {
        const leftArmMetrics = Object.entries(value).map((metric: any) => ({
          metricName: metric[0],
          ...metric[1],
        }));
        return {
          ...measures,
          left_arm: leftArmMetrics,
        };
      } else if (metricName === "right_arm") {
        const rightArmMetrics = Object.entries(value).map((metric: any) => ({
          metricName: metric[0],
          ...metric[1],
        }));
        return {
          ...measures,
          right_arm: rightArmMetrics,
        };
      } else {
        return {
          ...measures,
          circumferences: measures?.circumferences
            ? [...measures?.circumferences, { metricName, ...value }]
            : [{ metricName, ...value }],
        };
      }
    },
    {} as ArmMeasures
  );

  return (
    <Stack>
      <Group grow gap={16}>
        <Stack>
          <Title order={4}>Brazo Izquierdo</Title>
          {armMeasures.left_arm.map((value: Measure, index: number) => (
            <MeasureCard
              key={`${value.metricName}-${index}`}
              measureTitle={value.metricName}
              measureValue={value.measure_value}
              measureUnit={value.measure_uom}
              measureStatus={value.measure_status}
              evolutionValue={12}
            />
          ))}
        </Stack>
        <Stack>
          <Title order={4}>Brazo Derecho</Title>
          {armMeasures.right_arm.map((value: Measure, index: number) => (
            <MeasureCard
              key={`${value.metricName}-${index}`}
              measureTitle={value.metricName}
              measureValue={value.measure_value}
              measureUnit={value.measure_uom}
              measureStatus={value.measure_status}
              evolutionValue={12}
            />
          ))}
        </Stack>
      </Group>
      <Stack>
        <Title order={4}>Circunferencias</Title>
        {armMeasures.circumferences.map((value: Measure, index: number) => (
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
