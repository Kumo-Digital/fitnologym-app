import * as Yup from "yup";
import { IMeasurement } from "@/db/interfaces/IMeasurement";
import { MeasurementFormValues } from "@/types/admin";
import { generateId } from "lucia";
import { Metrics } from "@/types/measurements";

export const prepareMeasurementForInsert = (
  payload: MeasurementFormValues
): IMeasurement => {
  const measurementId = generateId(18);
  const preparedMeasurement = {
    _id: measurementId,
    user_id: payload.user_id,
    date: payload.date,
    report_url: payload.report_url ?? "",
    metrics: {
      weight: {
        measure_uom: "kg",
        measure_value: payload.weight ?? 0,
        measure_status: parseInt(payload.weightStatus) ?? 2,
      },
      bmi: {
        measure_uom: "u",
        measure_value: payload.bmi ?? 0,
        measure_status: parseInt(payload.bmiStatus) ?? 2,
      },
      body_fat: {
        measure_uom: "%",
        measure_value: payload.bodyFat ?? 0,
        measure_status: parseInt(payload.bodyFatStatus) ?? 2,
      },
      visc_fat: {
        measure_uom: "u",
        measure_value: payload.viscFat ?? 0,
        measure_status: parseInt(payload.viscFatStatus) ?? 2,
      },
      muscle_mass: {
        measure_uom: "kg",
        measure_value: payload.muscleMass ?? 0,
        measure_status: parseInt(payload.muscleMassStatus) ?? 2,
      },
      muscle_quality: {
        measure_uom: "u",
        measure_value: payload.muscleQuality ?? 0,
        measure_status: parseInt(payload.muscleQualityStatus) ?? 2,
      },
      bone_mass: {
        measure_uom: "kg",
        measure_value: payload.boneMass ?? 0,
        measure_status: parseInt(payload.boneMassStatus) ?? 2,
      },
      bmr: {
        measure_uom: "kcal",
        measure_value: payload.bmr ?? 0,
        measure_status: parseInt(payload.bmrStatus) ?? 2,
      },
      metab_age: {
        measure_uom: "u",
        measure_value: payload.metabAge ?? 0,
        measure_status: parseInt(payload.metabAgeStatus) ?? 2,
      },
      body_water: {
        measure_uom: "%",
        measure_value: payload.bodyWater ?? 0,
        measure_status: parseInt(payload.bodyWaterStatus) ?? 2,
      },
      physique_rating: {
        measure_uom: "u",
        measure_value: payload.physiqueRating ?? 0,
        measure_status: parseInt(payload.physiqueRatingStatus) ?? 2,
      },
      left_arm: {
        muscle_mass: {
          measure_uom: "kg",
          measure_value: payload.armLeftMuscleMass ?? 0,
          measure_status: parseInt(payload.armLeftMuscleMassStatus) ?? 2,
        },
        body_fat: {
          measure_uom: "%",
          measure_value: payload.armLeftBodyFat ?? 0,
          measure_status: parseInt(payload.armLeftBodyFatStatus) ?? 2,
        },
        muscle_quality: {
          measure_uom: "u",
          measure_value: payload.armLeftMuscleQuality ?? 0,
          measure_status: parseInt(payload.armLeftMuscleQualityStatus) ?? 2,
        },
      },
      right_arm: {
        muscle_mass: {
          measure_uom: "kg",
          measure_value: payload.armRightMuscleMass ?? 0,
          measure_status: parseInt(payload.armRightMuscleMassStatus) ?? 2,
        },
        body_fat: {
          measure_uom: "%",
          measure_value: payload.armRightBodyFat ?? 0,
          measure_status: parseInt(payload.armRightBodyFatStatus) ?? 2,
        },
        muscle_quality: {
          measure_uom: "u",
          measure_value: payload.armRightMuscleQuality ?? 0,
          measure_status: parseInt(payload.armRightMuscleQualityStatus) ?? 2,
        },
      },
      left_leg: {
        muscle_mass: {
          measure_uom: "kg",
          measure_value: payload.legLeftMuscleMass ?? 0,
          measure_status: parseInt(payload.legLeftMuscleMassStatus) ?? 2,
        },
        body_fat: {
          measure_uom: "%",
          measure_value: payload.legLeftBodyFat ?? 0,
          measure_status: parseInt(payload.legLeftBodyFatStatus) ?? 2,
        },
        muscle_quality: {
          measure_uom: "u",
          measure_value: payload.legLeftMuscleQuality ?? 0,
          measure_status: parseInt(payload.legLeftMuscleQualityStatus) ?? 2,
        },
      },
      right_leg: {
        muscle_mass: {
          measure_uom: "kg",
          measure_value: payload.legRightMuscleMass ?? 0,
          measure_status: parseInt(payload.legRightMuscleMassStatus) ?? 2,
        },
        body_fat: {
          measure_uom: "%",
          measure_value: payload.legRightBodyFat ?? 0,
          measure_status: parseInt(payload.legRightBodyFatStatus) ?? 2,
        },
        muscle_quality: {
          measure_uom: "u",
          measure_value: payload.legRightMuscleQuality ?? 0,
          measure_status: parseInt(payload.legRightMuscleQualityStatus) ?? 2,
        },
      },
      trunk: {
        muscle_mass: {
          measure_uom: "kg",
          measure_value: payload.trunkMuscleMass ?? 0,
          measure_status: parseInt(payload.trunkMuscleMassStatus) ?? 2,
        },
        body_fat: {
          measure_uom: "%",
          measure_value: payload.trunkBodyFat ?? 0,
          measure_status: parseInt(payload.trunkBodyFatStatus) ?? 2,
        },
        muscle_quality: {
          measure_uom: "u",
          measure_value: payload.trunkMuscleQuality ?? 0,
          measure_status: parseInt(payload.trunkMuscleQualityStatus) ?? 2,
        },
      },
      circumferenceNeck: {
        measure_uom: "cm",
        measure_value: payload.circumferenceNeck ?? 0,
      },
      circumferenceChest: {
        measure_uom: "cm",
        measure_value: payload.circumferenceChest ?? 0,
      },
      circumferenceShoulders: {
        measure_uom: "cm",
        measure_value: payload.circumferenceShoulders ?? 0,
      },
      circumferenceArms: {
        measure_uom: "cm",
        measure_value: payload.circumferenceArms ?? 0,
      },
      circumferenceWaist: {
        measure_uom: "cm",
        measure_value: payload.circumferenceWaist ?? 0,
      },
      circumferenceHips: {
        measure_uom: "cm",
        measure_value: payload.circumferenceHips ?? 0,
      },
      circumferenceGlutes: {
        measure_uom: "cm",
        measure_value: payload.circumferenceGlutes ?? 0,
      },
      circumferenceQuads: {
        measure_uom: "cm",
        measure_value: payload.circumferenceQuads ?? 0,
      },
      circumferenceCalf: {
        measure_uom: "cm",
        measure_value: payload.circumferenceCalf ?? 0,
      },
    },
  };

  return preparedMeasurement;
};

const metricLabels = [
  { key: "Generales", value: "overview" },
  { key: "Torso", value: "trunk" },
  { key: "Brazo Izquierdo", value: "left_arm" },
  { key: "Brazo Derecho", value: "right_arm" },
  { key: "Pierna Izquierda", value: "left_leg" },
  { key: "Pierna Derecha", value: "right_leg" },
  { key: "Cuello", value: "circumferenceNeck" },
  { key: "Pecho", value: "circumferenceChest" },
  { key: "Hombros", value: "circumferenceShoulders" },
  { key: "Brasos", value: "circumferenceArms" },
  { key: "Cintura", value: "circumferenceWaist" },
  { key: "Cadera", value: "circumferenceHips" },
  { key: "Glúteos", value: "circumferenceGlutes" },
  { key: "Cuádriceps", value: "circumferenceQuads" },
  { key: "Pantorrillas", value: "circumferenceCalf" },
];

export const prepareMeasurementForDisplay = (
  payload: Metrics
): Record<string, any>[] => {
  if (!payload.filtered_metrics) return [];
  const preparedMeasurement = payload.filtered_metrics.map((entry) => {
    return metricLabels.reduce(
      (acc: any, curr) => {
        if (entry[curr.value] !== undefined) {
          acc[curr.key] = entry[curr.value];
        }
        return acc;
      },
      {
        date: new Date(entry.date).toLocaleDateString("es-AR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }
    );
  });

  return preparedMeasurement;
};

export const getMeasureStatusColor = (status: number): string => {
  switch (status) {
    case 0:
      return "blue.5";
    case 1:
      return "lime.5";
    case 2:
      return "orange.5";
    case 3:
      return "violet.5";
    default:
      return "gray.5";
  }
};

export const getMeasureName = (measure: string): string => {
  switch (measure) {
    case "weight":
      return "Peso";
    case "bmi":
      return "IMC";
    case "body_fat":
      return "Grasa Corporal";
    case "visc_fat":
      return "Grasa Visceral";
    case "muscle_mass":
      return "Masa Muscular";
    case "muscle_quality":
      return "Calidad Muscular";
    case "bone_mass":
      return "Masa Ósea";
    case "bmr":
      return "TMB";
    case "metab_age":
      return "Edad Metabólica";
    case "body_water":
      return "Agua Corporal";
    case "physique_rating":
      return "Rating Físico";
    case "overview":
      return "General";
    case "left_arm":
      return "Brazo Izquierdo";
    case "right_arm":
      return "Brazo Derecho";
    case "left_leg":
      return "Pierna Izquierda";
    case "right_leg":
      return "Pierna Derecha";
    case "trunk":
      return "Torso";
    case "circumferenceNeck":
      return "Cuello";
    case "circumferenceChest":
      return "Pecho";
    case "circumferenceShoulders":
      return "Hombros";
    case "circumferenceArms":
      return "Brazos";
    case "circumferenceWaist":
      return "Cintura";
    case "circumferenceHips":
      return "Cadera";
    case "circumferenceGlutes":
      return "Glúteos";
    case "circumferenceQuads":
      return "Cuádriceps";
    case "circumferenceCalf":
      return "Pantorrillas";
    default:
      return "";
  }
};

export const overviewBodyMetrics = [
  "weight",
  "bmi",
  "body_fat",
  "visc_fat",
  "muscle_mass",
  "muscle_quality",
  "bone_mass",
  "bmr",
  "metab_age",
  "body_water",
  "physique_rating",
];

export const torsoBodyMetrics = [
  "trunk",
  "circumferenceNeck",
  "circumferenceChest",
  "circumferenceWaist",
  "circumferenceHips",
];

export const armsBodyMetrics = [
  "left_arm",
  "right_arm",
  "circumferenceShoulders",
  "circumferenceArms",
];

export const legsBodyMetrics = [
  "left_leg",
  "right_leg",
  "circumferenceGlutes",
  "circumferenceQuads",
  "circumferenceCalf",
];

export const metricsSelectOptions = [
  { value: "weight", label: "Peso", sections: ["overview"] },
  { value: "bmi", label: "IMC", sections: ["overview"] },
  {
    value: "body_fat",
    label: "Grasa Corporal",
    sections: [
      "overview",
      "trunk",
      "left_leg",
      "right_leg",
      "left_arm",
      "right_arm",
    ],
  },
  {
    value: "muscle_mass",
    label: "Masa Muscular",
    sections: [
      "overview",
      "trunk",
      "left_leg",
      "right_leg",
      "left_arm",
      "right_arm",
    ],
  },
  {
    value: "muscle_quality",
    label: "Calidad Muscular",
    sections: [
      "overview",
      "trunk",
      "left_leg",
      "right_leg",
      "left_arm",
      "right_arm",
    ],
  },
  { value: "visc_fat", label: "Grasa Visceral", sections: ["overview"] },
  { value: "bone_mass", label: "Masa Ósea", sections: ["overview"] },
  { value: "bmr", label: "TMB", sections: ["overview"] },
  { value: "metab_age", label: "Edad Metabólica", sections: ["overview"] },
  { value: "body_water", label: "Agua Corporal", sections: ["overview"] },
  { value: "physique_rating", label: "Rating Físico", sections: ["overview"] },
  {
    value: "circumference",
    label: "Circunferencias",
    sections: ["circumferences"],
  },
];

export const getLabelColoBySection = (section: string): string => {
  switch (section) {
    case "Generales":
      return "orange.5";
    case "Torso":
      return "red.6";
    case "Pierna Izquierda":
      return "grape.5";
    case "Pierna Derecha":
      return "violet.5";
    case "Brazo Izquierdo":
      return "cyan.5";
    case "Brazo Derecho":
      return "teal.5";
    case "Circunferencias":
      return "gray.5";
    default:
      return "gray.5";
  }
};

export const getCategoryColoBySection = (section: string): string => {
  switch (section) {
    case "overview":
      return "orange.5";
    case "trunk":
      return "red.6";
    case "left_leg":
      return "grape.5";
    case "right_leg":
      return "violet.5";
    case "left_arm":
      return "cyan.5";
    case "right_arm":
      return "teal.5";
    case "circumferences":
      return "gray.5";
    default:
      return "gray.5";
  }
};

export const measurementFormValidationSchema = Yup.object().shape({
  user_id: Yup.string().required("El nombre del cliente es obligatorio"),
  report_url: Yup.string(),
  date: Yup.date().required("La fecha de la medida es obligatoria"),
  weight: Yup.number().min(0, "El peso no puede ser negativo"),
  weightStatus: Yup.string(),
  bmi: Yup.number().min(0, "El IMC no puede ser negativo"),
  bmiStatus: Yup.string(),
  bodyFat: Yup.number().min(0, "La grasa corporal no puede ser negativa"),
  bodyFatStatus: Yup.string(),
  viscFat: Yup.number().min(0, "La grasa visceral no puede ser negativa"),
  viscFatStatus: Yup.string(),
  muscleMass: Yup.number().min(0, "La masa muscular no puede ser negativa"),
  muscleMassStatus: Yup.string(),
  muscleQuality: Yup.number().min(
    0,
    "La calidad muscular no puede ser negativa"
  ),
  muscleQualityStatus: Yup.string(),
  boneMass: Yup.number().min(0, "La masa ósea no puede ser negativa"),
  boneMassStatus: Yup.string(),
  bmr: Yup.number().min(0, "El TMB no puede ser negativo"),
  bmrStatus: Yup.string(),
  metabAge: Yup.number().min(0, "La edad metabólica no puede ser negativa"),
  metabAgeStatus: Yup.string(),
  bodyWater: Yup.number().min(0, "El agua corporal no puede ser negativa"),
  bodyWaterStatus: Yup.string(),
  physiqueRating: Yup.number().min(0, "El rating físico no puede ser negativo"),
  physiqueRatingStatus: Yup.string(),
  armLeftMuscleMass: Yup.number().min(
    0,
    "La masa muscular no puede ser negativa"
  ),
  armLeftMuscleMassStatus: Yup.string(),
  armLeftBodyFat: Yup.number().min(
    0,
    "La grasa corporal no puede ser negativa"
  ),
  armLeftBodyFatStatus: Yup.string(),
  armLeftMuscleQuality: Yup.number().min(
    0,
    "La calidad muscular no puede ser negativa"
  ),
  armLeftMuscleQualityStatus: Yup.string(),
  armRightMuscleMass: Yup.number().min(
    0,
    "La masa muscular no puede ser negativa"
  ),
  armRightMuscleMassStatus: Yup.string(),
  armRightBodyFat: Yup.number().min(
    0,
    "La grasa corporal no puede ser negativa"
  ),
  armRightBodyFatStatus: Yup.string(),
  armRightMuscleQuality: Yup.number().min(
    0,
    "La calidad muscular no puede ser negativa"
  ),
  armRightMuscleQualityStatus: Yup.string(),
  legLeftMuscleMass: Yup.number().min(
    0,
    "La masa muscular no puede ser negativa"
  ),
  legLeftMuscleMassStatus: Yup.string(),
  legLeftBodyFat: Yup.number().min(
    0,
    "La grasa corporal no puede ser negativa"
  ),
  legLeftBodyFatStatus: Yup.string(),
  legLeftMuscleQuality: Yup.number().min(
    0,
    "La calidad muscular no puede ser negativa"
  ),
  legLeftMuscleQualityStatus: Yup.string(),
  legRightMuscleMass: Yup.number().min(
    0,
    "La masa muscular no puede ser negativa"
  ),
  legRightMuscleMassStatus: Yup.string(),
  legRightBodyFat: Yup.number().min(
    0,
    "La grasa corporal no puede ser negativa"
  ),
  legRightBodyFatStatus: Yup.string(),
  legRightMuscleQuality: Yup.number().min(
    0,
    "La calidad muscular no puede ser negativa"
  ),
  legRightMuscleQualityStatus: Yup.string(),
  trunkMuscleMass: Yup.number().min(
    0,
    "La masa muscular no puede ser negativa"
  ),
  trunkMuscleMassStatus: Yup.string(),
  trunkBodyFat: Yup.number().min(0, "La grasa corporal no puede ser negativa"),
  trunkBodyFatStatus: Yup.string(),
  circumferenceNeck: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceChest: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceShoulders: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceArms: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceWaist: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceHips: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceGlutes: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceQuads: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceCalf: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
});
