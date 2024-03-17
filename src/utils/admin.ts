import * as Yup from "yup";

export const measurementFormInitialValues = {
  user_id: "",
  report_url: "",
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
  circumferenceShoulders: 0,
  circumferenceArms: 0,
  circumferenceWaist: 0,
  circumferenceHips: 0,
  circumferenceGlutes: 0,
  circumferenceQuads: 0,
  circumferenceCalf: 0,
};

export const StatusValues = [
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

export const StatusColors = ["blue", "lime", "yellow", "red"];

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
});
