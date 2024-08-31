import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import TransitionCard from "@/components/ui/card/transition-card";
import { BodySectionProps } from "@/types/measurements";
import { overviewBodyMetrics } from "@/utils/measurement";
import {
  Box,
  Group,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Title,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type Measure = { [key: string]: any };

export function calculateBtaValue(bodyWater: number, weight: number) {
  return (weight * bodyWater) / 100;
}

export const BodySectionOverview = ({
  lastMeasure,
  evolution,
  targetMeasure,
  isEvolutionFromFirstToLast,
  handleToggle,
  showSwitch,
}: BodySectionProps) => {
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(`(max-width: ${em(768)})`);
  const isMobileLG = useMediaQuery(`(max-width: ${em(1024)})`);

  const weight = lastMeasure.metrics.weight.measure_value;
  const bodyWater = lastMeasure.metrics.body_water.measure_value;
  const btaValue = calculateBtaValue(bodyWater, weight);

  const overviewMeasures: Measure[] = overviewBodyMetrics
    .map((metric) => {
      const values = lastMeasure.metrics[metric];
      if (values) {
        return {
          metricName: metric,
          evolution: { ...evolution?.metrics[metric]?.measure_evolution },
          ...values,
        };
      }
      return null;
    })
    .filter(Boolean)
    .map((measure) => {
      // Sobrescribe el valor de 'BTA' si es necesario
      if (measure.metricName === "BTA") {
        return {
          ...measure,
          measure_value: btaValue,
        };
      }
      return measure;
    });

  const currentValue = lastMeasure?.metrics.weight.measure_value;
  const targetValue = targetMeasure[0]?.target_value;
  const ffmiCurrentValue = lastMeasure?.metrics.ffmi.measure_value;
  const ffmiTargetValue = lastMeasure?.metrics.ffmi.measure_status;
  const forceRatingCurrentValue =
    lastMeasure?.metrics.force_rating?.measure_value;
  const forceRatingValue = lastMeasure?.metrics.force_rating?.measure_status;
  const fatFreeMass = lastMeasure.metrics.fatFreeMass.measure_value;

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={4}>Generales</Title>
        {showSwitch ? (
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
      <Box>
        <TransitionCard
          currentValue={currentValue}
          targetValue={targetValue}
          ffmiCurrentValue={ffmiCurrentValue}
          ffmiTargetValue={ffmiTargetValue}
          forceRatingCurrentValue={forceRatingCurrentValue}
          forceRatingValue={forceRatingValue}
          bodyFatvalue={lastMeasure?.metrics.body_fat?.measure_value}
          weightValue={lastMeasure?.metrics.weight?.measure_value}
          fatFreeMass={fatFreeMass}
        />
      </Box>

      <SimpleGrid
        cols={isMobileSM ? 1 : isMobileMD ? 2 : isMobileLG ? 1 : 2}
        spacing={16}
        verticalSpacing={16}
      >
        {overviewMeasures.map((value: Measure, index: number) => (
          <MeasureCard
            measureTitle={value.metricName}
            measureValue={value.measure_value}
            evolutionValue={value.evolution}
            measureUnit={value.measure_uom}
            measureStatus={value.measure_status}
            key={`${value.metricName}-${index}`}
            isEvolutionFromFirstToLast={isEvolutionFromFirstToLast}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};
