import { SimpleGrid, Stack, Title, em } from "@mantine/core";
import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import { overviewBodyMetrics } from "@/utils/measurement";
import { BodySectionProps } from "@/types/measurements";
import { TargetMeasureCard } from "@/components/ui/card/target-measure-card";
import { useMediaQuery } from "@mantine/hooks";
import { MEASUREMENT_UNITS } from "@/utils/constants";

const mockMeasures = {
  _id: "mlf0bsq283dx9h81h3",
  user_id: "lmkxvlwo474eake",
  date: "2024-03-08T18:09:08.712Z",
  report_url: "",
  createdAt: "2024-03-08T18:09:08.749Z",
  updatedAt: "2024-03-08T18:09:08.749Z",
  __v: 0,
  measures: {
    weight: {
      measure_uom: MEASUREMENT_UNITS.KG,
      measure_value: 58,
      measure_status: 2,
    },
    bmi: {
      measure_uom: MEASUREMENT_UNITS.UNIT,
      measure_value: 23.6,
      measure_status: 2,
    },
    body_fat: {
      measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
      measure_value: 30,
      measure_status: 2,
    },
    visc_fat: {
      measure_uom: MEASUREMENT_UNITS.UNIT,
      measure_value: 18,
      measure_status: 2,
    },
    muscle_mass: {
      measure_uom: MEASUREMENT_UNITS.KG,
      measure_value: 25,
      measure_status: 2,
    },
    muscle_quality: {
      measure_uom: MEASUREMENT_UNITS.UNIT,
      measure_value: 0,
      measure_status: 2,
    },
    bone_mass: {
      measure_uom: MEASUREMENT_UNITS.KG,
      measure_value: 7,
      measure_status: 2,
    },
    bmr: {
      measure_uom: MEASUREMENT_UNITS.KCAL,
      measure_value: 0,
      measure_status: 2,
    },
    metab_age: {
      measure_uom: MEASUREMENT_UNITS.UNIT,
      measure_value: 0,
      measure_status: 2,
    },
    body_water: {
      measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
      measure_value: 0,
      measure_status: 2,
    },
    physique_rating: {
      measure_uom: MEASUREMENT_UNITS.UNIT,
      measure_value: 0,
      measure_status: 2,
    },
    left_arm: {
      muscle_mass: {
        measure_uom: MEASUREMENT_UNITS.KG,
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: MEASUREMENT_UNITS.UNIT,
        measure_value: 0,
        measure_status: 2,
      },
    },
    right_arm: {
      muscle_mass: {
        measure_uom: MEASUREMENT_UNITS.KG,
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: MEASUREMENT_UNITS.UNIT,
        measure_value: 0,
        measure_status: 2,
      },
    },
    left_leg: {
      muscle_mass: {
        measure_uom: MEASUREMENT_UNITS.KG,
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: MEASUREMENT_UNITS.UNIT,
        measure_value: 0,
        measure_status: 2,
      },
    },
    right_leg: {
      muscle_mass: {
        measure_uom: MEASUREMENT_UNITS.KG,
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: MEASUREMENT_UNITS.UNIT,
        measure_value: 0,
        measure_status: 2,
      },
    },
    trunk: {
      muscle_mass: {
        measure_uom: MEASUREMENT_UNITS.KG,
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: MEASUREMENT_UNITS.UNIT,
        measure_value: 0,
        measure_status: 2,
      },
    },
    circumferenceNeck: {
      measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
      measure_value: 80,
    },
    circumferenceChest: {
      measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
      measure_value: 50,
    },
    circumferenceShoulders: {
      measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
      measure_value: 30,
    },
    circumferenceArms: {
      measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
      measure_value: 25,
    },
    circumferenceWaist: {
      measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
      measure_value: 60,
    },
    circumferenceHips: {
      measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
      measure_value: 0,
    },
    circumferenceGlutes: {
      measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
      measure_value: 0,
    },
    circumferenceQuads: {
      measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
      measure_value: 0,
    },
    circumferenceCalf: {
      measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
      measure_value: 0,
    },
  },
};

type Measure = { [key: string]: any };

export const BodySectionOverview = ({
  lastMeasure,
  evolution,
  targetMeasure,
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
          evolution: evolution?.metrics[metric].measure_evolution,
          ...values,
        },
      ];
    }
    return metricList;
  }, []);

  const currentValue = lastMeasure?.metrics.weight.measure_value;
  const targetValue = targetMeasure[0]?.target_value;
  console.log("overviewMeasures", overviewMeasures);

  return (
    <Stack>
      <Title order={4}>Generales</Title>
      <TargetMeasureCard
        currentValue={currentValue}
        targetValue={targetValue}
      />
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
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};
