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
  const overviewMeasures: Measure[] = Object.entries(
    lastMeasure.metrics
  ).reduce((metricList: Measure[], [metric, values]: any) => {
    if (overviewBodyMetrics.includes(metric)) {
      metricList = [
        ...metricList,
        {
          metricName: metric,
          evolution: { ...evolution?.metrics[metric].measure_evolution },
          ...values,
        },
      ];
    }
    return metricList;
  }, []);

  const currentValue = lastMeasure?.metrics.weight.measure_value;
  const targetValue = targetMeasure[0]?.target_value;
  const ffmiCurrentValue = lastMeasure?.metrics.ffmi.measure_value;
  const ffmiTargetValue = lastMeasure?.metrics.ffmi.measure_status;

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={4}>Generales</Title>
        {(showSwitch) ?
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
      /> :
      null
      }
      </Group>
      <Box>
        <TransitionCard
          currentValue={currentValue}
          targetValue={targetValue}
          ffmiCurrentValue={ffmiCurrentValue}
          ffmiTargetValue={ffmiTargetValue}
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
