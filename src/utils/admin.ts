import * as Yup from "yup";

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
  viscFatStatus: "2",
  muscleMass: 0,
  muscleMassStatus: "2",
  boneMass: 0,
  boneMassStatus: "2",
  bmr: 0,
  bmrStatus: "2",
  metabAge: 0,
  metabAgeStatus: "2",
  bodyWater: 0,
  bodyWaterStatus: "2",
  muscleQuality: 0,
  muscleQualityStatus: "2",
  physiqueRating: 0,
  physiqueRatingStatus: "2",
  trunkMuscleMass: 0,
  trunkMuscleMassStatus: "2",
  trunkMuscleQuality: 0,
  trunkMuscleQualityStatus: "2",
  trunkBodyFat: 0,
  trunkBodyFatStatus: "2",
  armLeftMuscleMass: 0,
  armLeftMuscleMassStatus: "2",
  armLeftMuscleQuality: 0,
  armLeftMuscleQualityStatus: "2",
  armLeftBodyFat: 0,
  armLeftBodyFatStatus: "2",
  armRightMuscleMass: 0,
  armRightMuscleMassStatus: "2",
  armRightMuscleQuality: 0,
  armRightMuscleQualityStatus: "2",
  armRightBodyFat: 0,
  armRightBodyFatStatus: "2",
  legLeftMuscleMass: 0,
  legLeftMuscleMassStatus: "2",
  legLeftMuscleQuality: 0,
  legLeftMuscleQualityStatus: "2",
  legLeftBodyFat: 0,
  legLeftBodyFatStatus: "2",
  legRightMuscleMass: 0,
  legRightMuscleMassStatus: "2",
  legRightMuscleQuality: 0,
  legRightMuscleQualityStatus: "2",
  legRightBodyFat: 0,
  legRightBodyFatStatus: "2",
  circumferenceNeck: 0,
  circumferenceChest: 0,
  circumferenceWaist: 0,
  circumferenceHips: 0,
  circumferenceGlutes: 0,
  circumferenceShouldersLeft: 0,
  circumferenceShouldersRight: 0,
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
    label: "Alto",
  },
];
export const STATUS_VALUES_WITHOUT_OBESITY_COLORS = ["blue", "lime", "red"];
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

export const WEIGHT_STATUS_DESCRIPTION = "El peso es un indicador de salud :";

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
  "La grasa visceral es la grasa que rodea los órganos internos :";

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
  "La masa muscular es el peso de los músculos :";

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
  "La masa ósea es parte de la composición corporal :";

export const METABOLIC_BASAL_RATE_STATUS_VALUES = [
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

export const METABOLIC_BASAL_RATE_STATUS_COLORS = ["blue", "lime", "red"];

export const METABOLIC_AGE_STATUS_VALUES = [
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

export const METABOLIC_AGE_STATUS_COLORS = ["blue", "lime", "red"];

export const METABOLIC_AGE_STATUS_DESCRIPTION =
  "La edad metabólica es la edad de su metabolismo :";

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

export const BODY_WATER_STATUS_COLORS = ["red", "lime", "red"];

export const BODY_WATER_STATUS_DESCRIPTION =
  "El agua corporal es la hidratación que tiene su cuerpo :";

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

export const BONE_MASS_BODY_WATER_STATUS_COLORS = ["red", "lime", "blue"];

export const MUSCLE_QUALITY_STATUS_VALUES = [
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

export const MUSCLE_QUALITY_STATUS_COLORS = ["yellow", "lime", "blue"];

export const BMI_STATUS_DESCRIPTION =
  "El IMC es un indicador de sus niveles de grasa, músculo y hueso :";

export const BODY_FAT_DESCRIPTION =
  "La grasa corporal es la cantidad de grasa en su cuerpo :";

export const BMR_STATUS_DESCRIPTION =
  "La Tasa Metabólica Basal es el indicador de su metabolismo en reposo :";

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

export const PHISYQUE_RATING_STATUS_COLORS = ["blue", "lime", "red"];

export const PHISYQUE_RATING_STATUS_DESCRIPTION =
  "La calificación física se hace en base a la composición corporal :";

export const SEGMENTED_STATUS_DESCRIPTION =
  "La segmentación es la distribución de la masa muscular en su cuerpo :";
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
