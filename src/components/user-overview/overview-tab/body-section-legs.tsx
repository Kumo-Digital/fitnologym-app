import { CircumferenceCard } from "@/components/ui/card/circumference-card/circumference-card";
import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import { legsBodyMetrics } from "@/utils/measurement";
import { Group, Stack, Title } from "@mantine/core";

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
      measure_uom: "kg",
      measure_value: 58,
      measure_status: 2,
    },
    bmi: {
      measure_uom: "u",
      measure_value: 23.6,
      measure_status: 2,
    },
    body_fat: {
      measure_uom: "%",
      measure_value: 30,
      measure_status: 2,
    },
    visc_fat: {
      measure_uom: "u",
      measure_value: 18,
      measure_status: 2,
    },
    muscle_mass: {
      measure_uom: "kg",
      measure_value: 25,
      measure_status: 2,
    },
    muscle_quality: {
      measure_uom: "u",
      measure_value: 0,
      measure_status: 2,
    },
    bone_mass: {
      measure_uom: "kg",
      measure_value: 7,
      measure_status: 2,
    },
    bmr: {
      measure_uom: "kcal",
      measure_value: 0,
      measure_status: 2,
    },
    metab_age: {
      measure_uom: "u",
      measure_value: 0,
      measure_status: 2,
    },
    body_water: {
      measure_uom: "%",
      measure_value: 0,
      measure_status: 2,
    },
    physique_rating: {
      measure_uom: "u",
      measure_value: 0,
      measure_status: 2,
    },
    left_arm: {
      muscle_mass: {
        measure_uom: "kg",
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: "%",
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: "u",
        measure_value: 0,
        measure_status: 2,
      },
    },
    right_arm: {
      muscle_mass: {
        measure_uom: "kg",
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: "%",
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: "u",
        measure_value: 0,
        measure_status: 2,
      },
    },
    left_leg: {
      muscle_mass: {
        measure_uom: "kg",
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: "%",
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: "u",
        measure_value: 0,
        measure_status: 2,
      },
    },
    right_leg: {
      muscle_mass: {
        measure_uom: "kg",
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: "%",
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: "u",
        measure_value: 0,
        measure_status: 2,
      },
    },
    trunk: {
      muscle_mass: {
        measure_uom: "kg",
        measure_value: 0,
        measure_status: 2,
      },
      body_fat: {
        measure_uom: "%",
        measure_value: 0,
        measure_status: 2,
      },
      muscle_quality: {
        measure_uom: "u",
        measure_value: 0,
        measure_status: 2,
      },
    },
    circumferenceNeck: {
      measure_uom: "cm",
      measure_value: 80,
    },
    circumferenceChest: {
      measure_uom: "cm",
      measure_value: 50,
    },
    circumferenceShoulders: {
      measure_uom: "cm",
      measure_value: 30,
    },
    circumferenceArms: {
      measure_uom: "cm",
      measure_value: 25,
    },
    circumferenceWaist: {
      measure_uom: "cm",
      measure_value: 60,
    },
    circumferenceHips: {
      measure_uom: "cm",
      measure_value: 0,
    },
    circumferenceGlutes: {
      measure_uom: "cm",
      measure_value: 0,
    },
    circumferenceQuads: {
      measure_uom: "cm",
      measure_value: 0,
    },
    circumferenceCalf: {
      measure_uom: "cm",
      measure_value: 0,
    },
  },
};

type Measure = { [key: string]: any };
type legMeasures = {
  left_leg: { [key: string]: any }[];
  right_leg: { [key: string]: any }[];
  circumferences: { [key: string]: any }[];
};

export const BodySectionLegs = ({ lastMeasure }: any) => {
  const legMeasures: legMeasures = Object.entries(mockMeasures.measures).reduce(
    (measures, [metricName, value]) => {
      if (!legsBodyMetrics.includes(metricName)) return measures;

      if (metricName === "left_leg") {
        const leftLegMetric = Object.entries(value).map((metric) => ({
          metricName: metric[0],
          ...metric[1],
        }));
        return {
          ...measures,
          left_leg: leftLegMetric,
        };
      } else if (metricName === "right_leg") {
        const rightLegMetric = Object.entries(value).map((metric) => ({
          metricName: metric[0],
          ...metric[1],
        }));
        return {
          ...measures,
          right_leg: rightLegMetric,
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
              evolutionValue={12}
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
              evolutionValue={12}
            />
          ))}
        </Stack>
      </Group>
      <Stack>
        <Title order={4}>Circumferencias</Title>
        {legMeasures.circumferences.map((value: Measure, index: number) => (
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
