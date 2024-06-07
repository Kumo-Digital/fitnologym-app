import { IMeasurement } from "@/db/interfaces/IMeasurement";
import { MeasurementFormValues } from "@/types/admin";
import { Metrics } from "@/types/measurements";
import { generateId } from "lucia";
import * as Yup from "yup";
import { MEASUREMENT_UNITS } from "./constants";

export const prepareMeasurementForInsert = (
  payload: MeasurementFormValues
): IMeasurement => {
  const measurementId =
    payload._id !== undefined ? payload._id : generateId(18);
  const preparedMeasurement = {
    _id: measurementId,
    user_id: payload.user_id,
    date: payload.date,
    report_url: payload.report_url ?? "",
    metrics: {
      weight: {
        measure_uom: MEASUREMENT_UNITS.KG,
        measure_value: payload.weight ?? null,
        measure_status: payload.weightStatus ?? 2,
      },
      bmi: {
        measure_uom: MEASUREMENT_UNITS.UNIT,
        measure_value: payload.bmi ?? null,
        measure_status: payload.bmiStatus ?? 2,
      },
      body_fat: {
        measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
        measure_value: payload.bodyFat ?? null,
        measure_status: payload.bodyFatStatus ?? 2,
      },
      visc_fat: {
        measure_uom: MEASUREMENT_UNITS.UNIT,
        measure_value: payload.viscFat ?? null,
        measure_status: payload.viscFatStatus ?? 2,
      },
      muscle_mass: {
        measure_uom: MEASUREMENT_UNITS.KG,
        measure_value: payload.muscleMass ?? null,
        measure_status: payload.muscleMassStatus ?? 2,
      },
      muscle_quality: {
        measure_uom: MEASUREMENT_UNITS.UNIT,
        measure_value: payload.muscleQuality ?? null,
        measure_status: payload.muscleQualityStatus ?? 2,
      },
      bone_mass: {
        measure_uom: MEASUREMENT_UNITS.KG,
        measure_value: payload.boneMass ?? null,
        measure_status: payload.boneMassStatus ?? 2,
      },
      bmr: {
        measure_uom: MEASUREMENT_UNITS.KCAL,
        measure_value: payload.bmr ?? null,
        measure_status: payload.bmrStatus ?? 0,
      },
      metab_age: {
        measure_uom: MEASUREMENT_UNITS.AGE,
        measure_value: payload.metabAge ?? null,
        measure_status: payload.metabAgeStatus ?? 0,
      },
      body_water: {
        measure_uom: MEASUREMENT_UNITS.LITERS,
        measure_value: payload.bodyWater ?? null,
        measure_status: payload.bodyWaterStatus ?? 2,
      },
      physique_rating: {
        measure_uom: MEASUREMENT_UNITS.UNIT,
        measure_value: payload.physiqueRating ?? null,
        measure_status: payload.physiqueRatingStatus ?? 2,
      },
      left_arm: {
        muscle_mass: {
          measure_uom: MEASUREMENT_UNITS.KG,
          measure_value: payload.armLeftMuscleMass ?? null,
          measure_status: payload.armLeftMuscleMassStatus ?? 2,
        },
        body_fat: {
          measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
          measure_value: payload.armLeftBodyFat ?? null,
          measure_status: payload.armLeftBodyFatStatus ?? 2,
        },
        muscle_quality: {
          measure_uom: MEASUREMENT_UNITS.UNIT,
          measure_value: payload.armLeftMuscleQuality ?? null,
          measure_status: payload.armLeftMuscleQualityStatus ?? 2,
        },
      },
      right_arm: {
        muscle_mass: {
          measure_uom: MEASUREMENT_UNITS.KG,
          measure_value: payload.armRightMuscleMass ?? null,
          measure_status: payload.armRightMuscleMassStatus ?? 2,
        },
        body_fat: {
          measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
          measure_value: payload.armRightBodyFat ?? null,
          measure_status: payload.armRightBodyFatStatus ?? 2,
        },
        muscle_quality: {
          measure_uom: MEASUREMENT_UNITS.UNIT,
          measure_value: payload.armRightMuscleQuality ?? null,
          measure_status: payload.armRightMuscleQualityStatus ?? 2,
        },
      },
      left_leg: {
        muscle_mass: {
          measure_uom: MEASUREMENT_UNITS.KG,
          measure_value: payload.legLeftMuscleMass ?? null,
          measure_status: payload.legLeftMuscleMassStatus ?? 2,
        },
        body_fat: {
          measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
          measure_value: payload.legLeftBodyFat ?? null,
          measure_status: payload.legLeftBodyFatStatus ?? 2,
        },
        muscle_quality: {
          measure_uom: MEASUREMENT_UNITS.UNIT,
          measure_value: payload.legLeftMuscleQuality ?? null,
          measure_status: payload.legLeftMuscleQualityStatus ?? 2,
        },
      },
      right_leg: {
        muscle_mass: {
          measure_uom: MEASUREMENT_UNITS.KG,
          measure_value: payload.legRightMuscleMass ?? null,
          measure_status: payload.legRightMuscleMassStatus ?? 2,
        },
        body_fat: {
          measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
          measure_value: payload.legRightBodyFat ?? null,
          measure_status: payload.legRightBodyFatStatus ?? 2,
        },
        muscle_quality: {
          measure_uom: MEASUREMENT_UNITS.UNIT,
          measure_value: payload.legRightMuscleQuality ?? null,
          measure_status: payload.legRightMuscleQualityStatus ?? 2,
        },
      },
      trunk: {
        muscle_mass: {
          measure_uom: MEASUREMENT_UNITS.KG,
          measure_value: payload.trunkMuscleMass ?? null,
          measure_status: payload.trunkMuscleMassStatus ?? 2,
        },
        body_fat: {
          measure_uom: MEASUREMENT_UNITS.PERCENTAGE,
          measure_value: payload.trunkBodyFat ?? null,
          measure_status: payload.trunkBodyFatStatus ?? 2,
        },
        muscle_quality: {
          measure_uom: MEASUREMENT_UNITS.UNIT,
          measure_value: payload.trunkMuscleQuality ?? null,
          measure_status: payload.trunkMuscleQualityStatus ?? 2,
        },
      },
      circumferenceNeck: {
        measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
        measure_value: payload.circumferenceNeck ?? null,
      },
      circumferenceChest: {
        measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
        measure_value: payload.circumferenceChest ?? null,
      },
      circumferenceWaist: {
        measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
        measure_value: payload.circumferenceWaist ?? null,
      },
      circumferenceHips: {
        measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
        measure_value: payload.circumferenceHips ?? null,
      },
      circumferenceGlutes: {
        measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
        measure_value: payload.circumferenceGlutes ?? null,
      },
      circumferenceShoulders: {
        left: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceShouldersLeft ?? null,
        },
        right: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceShouldersRight ?? null,
        },
      },
      circumferenceArms: {
        left: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceArmsLeft ?? null,
        },
        right: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceArmsRight ?? null,
        },
      },
      circumferenceFlexedArms: {
        left: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceFlexedArmsLeft ?? null,
        },
        right: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceFlexedArmsRight ?? null,
        },
      },
      circumferenceQuads: {
        left: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceQuadsLeft ?? null,
        },
        right: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceQuadsRight ?? null,
        },
      },
      circumferenceCalf: {
        left: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceCalfLeft ?? null,
        },
        right: {
          measure_uom: MEASUREMENT_UNITS.CENTIMETERS,
          measure_value: payload.circumferenceCalfRight ?? null,
        },
      },
    },
  };

  return preparedMeasurement;
};

export const prepareMeasurementForEditForm = (
  payload: IMeasurement
): MeasurementFormValues | undefined => {
  if (!payload) return undefined;
  const preparedMeasurement = {
    user_id: payload.user_id,
    report_url: payload.report_url,
    date: new Date(payload.date),
    weight: payload.metrics.weight.measure_value || 0,
    weightStatus: payload.metrics.weight.measure_status || 2,
    bmi: payload.metrics.bmi.measure_value || 0,
    bmiStatus: payload.metrics.bmi.measure_status || 2,
    bodyFat: payload.metrics.body_fat.measure_value || 0,
    bodyFatStatus: payload.metrics.body_fat.measure_status || 2,
    viscFat: payload.metrics.visc_fat.measure_value || 0,
    viscFatStatus: payload.metrics.visc_fat.measure_status || 2,
    muscleMass: payload.metrics.muscle_mass.measure_value || 0,
    muscleMassStatus: payload.metrics.muscle_mass.measure_status || 2,
    boneMass: payload.metrics.bone_mass.measure_value || 0,
    boneMassStatus: payload.metrics.bone_mass.measure_status || 2,
    bmr: payload.metrics.bmr.measure_value || 0,
    bmrStatus: payload.metrics.bmr.measure_status || 2,
    metabAge: payload.metrics.metab_age.measure_value || 0,
    metabAgeStatus: payload.metrics.metab_age.measure_status || 0,
    bodyWater: payload.metrics.body_water.measure_value || 0,
    bodyWaterStatus: payload.metrics.body_water.measure_status || 2,
    muscleQuality: payload.metrics.muscle_quality.measure_value || 0,
    muscleQualityStatus: payload.metrics.muscle_quality.measure_status || 2,
    physiqueRating: payload.metrics.physique_rating.measure_value || 0,
    physiqueRatingStatus: payload.metrics.physique_rating.measure_status || 2,
    trunkMuscleMass: payload.metrics.trunk.muscle_mass.measure_value || 0,
    trunkMuscleMassStatus:
      payload.metrics.trunk.muscle_mass.measure_status || 2,
    trunkMuscleQuality: payload.metrics.trunk.muscle_quality.measure_value || 0,
    trunkMuscleQualityStatus:
      payload.metrics.trunk.muscle_quality.measure_status || 2,
    trunkBodyFat: payload.metrics.trunk.body_fat.measure_value || 0,
    trunkBodyFatStatus: payload.metrics.trunk.body_fat.measure_status || 2,
    armLeftMuscleMass: payload.metrics.left_arm.muscle_mass.measure_value || 0,
    armLeftMuscleMassStatus:
      payload.metrics.left_arm.muscle_mass.measure_status || 2,
    armLeftMuscleQuality:
      payload.metrics.left_arm.muscle_quality.measure_value || 0,
    armLeftMuscleQualityStatus:
      payload.metrics.left_arm.muscle_quality.measure_status || 2,
    armLeftBodyFat: payload.metrics.left_arm.body_fat.measure_value || 0,
    armLeftBodyFatStatus: payload.metrics.left_arm.body_fat.measure_status || 2,
    armRightMuscleMass:
      payload.metrics.right_arm.muscle_mass.measure_value || 0,
    armRightMuscleMassStatus:
      payload.metrics.right_arm.muscle_mass.measure_status || 2,
    armRightMuscleQuality:
      payload.metrics.right_arm.muscle_quality.measure_value || 0,
    armRightMuscleQualityStatus:
      payload.metrics.right_arm.muscle_quality.measure_status || 2,
    armRightBodyFat: payload.metrics.right_arm.body_fat.measure_value || 0,
    armRightBodyFatStatus:
      payload.metrics.right_arm.body_fat.measure_status || 2,
    legLeftMuscleMass: payload.metrics.left_leg.muscle_mass.measure_value || 0,
    legLeftMuscleMassStatus:
      payload.metrics.left_leg.muscle_mass.measure_status || 2,
    legLeftMuscleQuality:
      payload.metrics.left_leg.muscle_quality.measure_value || 0,
    legLeftMuscleQualityStatus:
      payload.metrics.left_leg.muscle_quality.measure_status || 2,
    legLeftBodyFat: payload.metrics.left_leg.body_fat.measure_value || 0,
    legLeftBodyFatStatus: payload.metrics.left_leg.body_fat.measure_status || 2,
    legRightMuscleMass:
      payload.metrics.right_leg.muscle_mass.measure_value || 0,
    legRightMuscleMassStatus:
      payload.metrics.right_leg.muscle_mass.measure_status || 2,
    legRightMuscleQuality:
      payload.metrics.right_leg.muscle_quality.measure_value || 0,
    legRightMuscleQualityStatus:
      payload.metrics.right_leg.muscle_quality.measure_status || 2,
    legRightBodyFat: payload.metrics.right_leg.body_fat.measure_value || 0,
    legRightBodyFatStatus:
      payload.metrics.right_leg.body_fat.measure_status || 2,
    circumferenceNeck: payload.metrics.circumferenceNeck?.measure_value || 0,
    circumferenceChest: payload.metrics.circumferenceChest?.measure_value || 0,
    circumferenceWaist: payload.metrics.circumferenceWaist?.measure_value || 0,
    circumferenceHips: payload.metrics.circumferenceHips?.measure_value || 0,
    circumferenceGlutes:
      payload.metrics.circumferenceGlutes?.measure_value || 0,
    circumferenceShouldersLeft:
      payload.metrics.circumferenceShoulders?.left.measure_value || 0,
    circumferenceShouldersRight:
      payload.metrics.circumferenceShoulders?.right.measure_value || 0,
    circumferenceArmsLeft:
      payload.metrics.circumferenceArms?.left.measure_value || 0,
    circumferenceArmsRight:
      payload.metrics.circumferenceArms?.right.measure_value || 0,
    circumferenceFlexedArmsLeft:
      payload.metrics.circumferenceFlexedArms?.left.measure_value || 0,
    circumferenceFlexedArmsRight:
      payload.metrics.circumferenceFlexedArms?.right.measure_value || 0,
    circumferenceQuadsLeft:
      payload.metrics.circumferenceQuads?.left.measure_value || 0,
    circumferenceQuadsRight:
      payload.metrics.circumferenceQuads?.right.measure_value || 0,
    circumferenceCalfLeft:
      payload.metrics.circumferenceCalf?.left.measure_value || 0,
    circumferenceCalfRight:
      payload.metrics.circumferenceCalf?.right.measure_value || 0,
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
  { key: "Cintura", value: "circumferenceWaist" },
  { key: "Cadera", value: "circumferenceHips" },
  { key: "Glúteos", value: "circumferenceGlutes" },
  { key: "Hombro Izquierdo", value: "circumferenceShouldersLeft" },
  { key: "Hombro Derecho", value: "circumferenceShouldersRight" },
  { key: "Brazo Izquierdo", value: "circumferenceArmsLeft" },
  { key: "Brazo Derecho", value: "circumferenceArmsRight" },
  { key: "Brazo Flexionado Izquierdo", value: "circumferenceFlexedArmsLeft" },
  { key: "Brazo Flexionado Derecho", value: "circumferenceFlexedArmsRight" },
  { key: "Cuádriceps Izquierdo", value: "circumferenceQuadsLeft" },
  { key: "Cuádriceps Derecho", value: "circumferenceQuadsRight" },
  { key: "Pantorrilla Izquierda", value: "circumferenceCalfLeft" },
  { key: "Pantorrilla Derecha", value: "circumferenceCalfRight" },
];

export const prepareMeasurementForDisplay = (
  payload: Metrics
): Record<string, any>[] => {
  if (!payload?.filtered_metrics) return [];
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
    case "circumferenceWaist":
      return "Cintura";
    case "circumferenceHips":
      return "Cadera";
    case "circumferenceGlutes":
      return "Glúteos";
    case "circumferenceShouldersLeft":
      return "Hombro Izquierdo";
    case "circumferenceShouldersRight":
      return "Hombro Derecho";
    case "circumferenceArmsLeft":
      return "Brazo Izquierdo";
    case "circumferenceArmsRight":
      return "Brazo Derecho";
    case "circumferenceFlexedArmsLeft":
      return "Brazo Flexionado Izquierdo";
    case "circumferenceFlexedArmsRight":
      return "Brazo Flexionado Derecho";
    case "circumferenceQuadsLeft":
      return "Cuádriceps Izquierdo";
    case "circumferenceQuadsRight":
      return "Cuádriceps Derecho";
    case "circumferenceCalfLeft":
      return "Pantorrilla Izquierda";
    case "circumferenceCalfRight":
      return "Pantorrilla Derecha";
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
  "circumferenceFlexedArms",
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
  circumferenceShouldersLeft: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceShouldersRight: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceArmsLeft: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceArmsRight: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceFlexedArmsLeft: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceFlexedArmsRight: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceQuadsLeft: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceQuadsRight: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceCalfLeft: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
  circumferenceCalfRight: Yup.number().min(
    0,
    "La circunferencia no puede ser negativa"
  ),
});

export const getRemainingPercentage = (
  currentValue: number,
  targetValue: number
) => {
  if (currentValue < targetValue) {
    return (currentValue / targetValue) * 100;
  } else {
    return (targetValue / currentValue) * 100;
  }
};

export const getRemainingPercentageFromMeasures = (
  previousToLastValue: number,
  lastValue: number
): number => {
  const result =
    ((previousToLastValue - lastValue) / previousToLastValue) * 100;

  return result;
};
