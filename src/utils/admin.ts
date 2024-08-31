import * as Yup from "yup";
import { FFMIStatus, ForceRatingStatus } from "./measurement";

const getKeyByValue = (
  object: { [key: string]: string },
  value: string
): string | undefined =>
  Object.keys(object).find((key) => object[key] === value);

export const measurementFormInitialValues = {
  user_id: "",
  report_url: "",
  date: "",
  weight: 0,
  weightStatus: "2",
  bmi: 0,
  bmiStatus: "2",
  bodyFat: 0,
  bodyFatStatus: "2",
  viscFat: 0,
  viscFatStatus: "1",
  muscleMass: 0,
  muscleMassStatus: "2",
  boneMass: 0,
  boneMassStatus: "2",
  bmr: 0,
  bmrStatus: "0",
  metabAge: 0,
  metabAgeStatus: "0",
  bodyWater: 0,
  bodyWaterStatus: "2",
  muscleQuality: 0,
  muscleQualityStatus: "2",
  physiqueRating: 0,
  physiqueRatingStatus: "2",
  ffmi: 17,
  forceRating: 0,
  forceRatingStatus: "2",
  fatFreeMass: 0,
  fatFreeMassStatus: "2",
  BTA: 0,
  dryProtein: 0,
  ffmiStatus: getKeyByValue(FFMIStatus, FFMIStatus.AVERAGE),
  trunkMuscleMass: 0,
  trunkMuscleMassStatus: "2",
  trunkMuscleQuality: 0,
  trunkMuscleQualityStatus: "1",
  trunkBodyFat: 0,
  trunkBodyFatStatus: "1",
  armLeftMuscleMass: 0,
  armLeftMuscleMassStatus: "1",
  armLeftMuscleQuality: 0,
  armLeftMuscleQualityStatus: "2",
  armLeftBodyFat: 0,
  armLeftBodyFatStatus: "1",
  armRightMuscleMass: 0,
  armRightMuscleMassStatus: "1",
  armRightMuscleQuality: 0,
  armRightMuscleQualityStatus: "2",
  armRightBodyFat: 0,
  armRightBodyFatStatus: "1",
  legLeftMuscleMass: 0,
  legLeftMuscleMassStatus: "1",
  legLeftMuscleQuality: 0,
  legLeftMuscleQualityStatus: "2",
  legLeftBodyFat: 0,
  legLeftBodyFatStatus: "1",
  legRightMuscleMass: 0,
  legRightMuscleMassStatus: "1",
  legRightMuscleQuality: 0,
  legRightMuscleQualityStatus: "2",
  legRightBodyFat: 0,
  legRightBodyFatStatus: "1",
  circumferenceNeck: 0,
  circumferenceChest: 0,
  circumferenceWaist: 0,
  circumferenceAbdomen: 0,
  circumferenceHips: 0,
  circumferenceGlutes: 0,
  circumferenceShoulders: 0,
  circumferenceArmsLeft: 0,
  circumferenceArmsRight: 0,
  circumferenceFlexedArmsLeft: 0,
  circumferenceFlexedArmsRight: 0,
  circumferenceQuadsLeft: 0,
  circumferenceQuadsRight: 0,
  circumferenceCalfLeft: 0,
  circumferenceCalfRight: 0,
};

// Status Values & Colors
export const STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo Peso",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Sobrepeso",
  },
  {
    value: "4",
    label: "Obeso",
  },
];

export const STATUS_VALUES_WITHOUT_OBESITY = [
  {
    value: "1",
    label: "Bajo",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Sobrepeso",
  },
  {
    value: "4",
    label: "Obeso",
  },
];
export const STATUS_VALUES_WITHOUT_OBESITY_COLORS = [
  "blue",
  "lime",
  "yellow",
  "red",
];
export const STATUS_COLORS = ["blue", "lime", "yellow", "red"];

export const WEIGHT_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo Peso",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Sobrepeso",
  },
];
export const WEIGHT_STATUS_COLORS = ["blue", "lime", "yellow"];

export const WEIGHT_STATUS_DESCRIPTION = "El peso es un indicador de salud:";

export const BODY_FAT_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Alto",
  },
];

export const BODY_FAT_STATUS_COLORS = ["blue", "lime", "yellow"];

export const VISC_FAT_STATUS_VALUES = [
  {
    value: "1",
    label: "Normal",
  },
  {
    value: "2",
    label: "Alto",
  },
];
export const VISC_FAT_STATUS_COLORS = ["lime", "red"];

export const VISC_FAT_STATUS_DESCRIPTION =
  "La grasa visceral es la grasa que rodea los órganos internos:";

export const MUSCLE_MASS_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Muscular",
  },
];

export const MUSCLE_MASS_STATUS_DESCRIPTION =
  "La masa muscular es el peso de los músculos:";

export const MUSCLE_MASS_STATUS_COLORS = ["red", "lime", "violet"];

export const BONE_MASS_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Alto",
  },
];

export const BONE_MASS_STATUS_COLORS = ["blue", "lime", "red"];

export const BONE_MASS_STATUS_DESCRIPTION =
  "La masa ósea es parte de la composición corporal:";

export const METABOLIC_BASAL_RATE_STATUS_VALUES = [
  {
    value: "0",
    label: "Normal",
  },
];

export const METABOLIC_BASAL_RATE_STATUS_COLORS = ["lime"];

export const METABOLIC_AGE_STATUS_VALUES = [
  {
    value: "0",
    label: "Normal",
  },
];

export const METABOLIC_AGE_STATUS_COLORS = ["lime"];

export const METABOLIC_AGE_STATUS_DESCRIPTION =
  "La edad metabólica es la edad de su metabolismo:";

export const RATING_FORCE_STATUS_VALUES = [
  {
    value: "1",
    label: "Débil",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Fuerte",
  },
];

export const RATING_FORCE_STATUS_COLORS = ["blue", "lime", "red"];

export const RATING_FORCE_STATUS_DESCRIPTION =
  "La calificación de fuerza es la capacidad de su cuerpo:";

export const FAT_FREE_MASS_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Alto",
  },
];

export const FAT_FREE_MASS_STATUS_COLORS = ["blue", "lime", "red"];

export const FAT_FREE_MASS_STATUS_DESCRIPTION =
  "La masa libre de grasa es el peso de su cuerpo sin grasa:";

export const BTA_STATUS_DESCRIPTION =
  "BTA significa Balance Total de Agua, es la cantidad de agua en su cuerpo medida en kilogramos";

export const DRY_PROTEIN_STATUS_DESCRIPTION =
  "Determina si realmente hay un aumento de masa muscular por hipertrofia";

export const BODY_WATER_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Alto",
  },
];

export const BODY_WATER_STATUS_COLORS = ["blue", "lime", "red"];

export const BODY_WATER_STATUS_DESCRIPTION =
  "El agua corporal es la hidratación que tiene su cuerpo:";

export const BONE_MASS_BODY_WATER_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Alto",
  },
];

export const BONE_MASS_BODY_WATER_STATUS_COLORS = ["blue", "lime", "red"];

export const MUSCLE_QUALITY_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo Rango",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Atletico",
  },
];

export const MUSCLE_QUALITY_STATUS_COLORS = ["red", "lime", "blue"];

export const BMI_STATUS_DESCRIPTION =
  "El IMC es un indicador de sus niveles de grasa, músculo y hueso:";

export const BODY_FAT_DESCRIPTION =
  "La grasa corporal es la cantidad de grasa en su cuerpo:";

export const BMR_STATUS_DESCRIPTION =
  "La Tasa Metabólica Basal es el indicador de su metabolismo en reposo:";

export const SEGMENTED_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo",
  },
  {
    value: "2",
    label: "Medio",
  },
  {
    value: "3",
    label: "Alto",
  },
];

export const SEGMENTED_STATUS_COLORS = ["blue", "lime", "orange"];

export const PHISYQUE_RATING_STATUS_VALUES = [
  {
    value: "1",
    label: "Bajo rango",
  },
  {
    value: "2",
    label: "Normal",
  },
  {
    value: "3",
    label: "Atletico",
  },
];

export const PHISYQUE_RATING_STATUS_COLORS = ["red", "lime", "blue"];

export const PHISYQUE_RATING_STATUS_DESCRIPTION =
  "La calificación física se hace en base a la composición corporal:";

export const FFMI_STATUS_VALUES_COLORS = [
  {
    label: FFMIStatus.SKINNY,
    color: "blue",
  },
  {
    label: FFMIStatus.AVERAGE,
    color: "lime",
  },
  {
    label: FFMIStatus.FAT,
    color: "orange",
  },
  {
    label: FFMIStatus.ADVANCED,
    color: "red",
  },
  {
    label: FFMIStatus.ATHLETE,
    color: "violet",
  },
  {
    label: FFMIStatus.BODYBUILDER,
    color: "teal",
  },
];

export const FORCE_RATING_STATUS_VALUES_COLORS = [
  { label: "Débil", color: "blue" },
  { label: "Normal", color: "lime" },
  { label: "Fuerte", color: "red" },
];

export const ForceRatingMap: { [key: number]: keyof typeof ForceRatingStatus } =
  {
    1: "WEAK",
    2: "NORMAL",
    3: "STRONG",
  };

export const FORCE_RATING_STATUS_COLORS = ["blue", "lime", "red"];
export const SEGMENTED_STATUS_DESCRIPTION =
  "La segmentación es la distribución de la masa muscular en su cuerpo";
export const getSubscriptionColor = (user_type: string) => {
  switch (user_type) {
    case "basic":
      return "lime.5";
    case "plus":
      return "cyan.5";
    case "premium":
      return "indigo.5";
    default:
      return "gray.5";
  }
};

export const newUserFormValidationSchema = Yup.object().shape({
  fullname: Yup.string().required("El nombre es requerido"),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es requerido"),
  dni: Yup.string().required("El DNI es requerido"),
  gym_id: Yup.string().required("El gimnasio es requerido"),
  user_type: Yup.string().required("La suscripción es requerida"),
  gender: Yup.string().required("El género es requerido"),
  target_metric: Yup.string().required("La métrica objetivo es requerida"),
  target_value: Yup.number().required("El valor objetivo es requerido"),
});
