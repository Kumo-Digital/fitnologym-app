import { MantineTheme } from "@mantine/core";

export const parseDate = (date: string) =>
  new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const parseNameToInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

export const getFirstName = (name: string) => name.split(" ")[0];

export const circumferenceMeasures = [
  "circumferenceNeck",
  "circumferenceChest",
  "circumferenceWaist",
  "circumferenceHips",
  "circumferenceShouldersLeft",
  "circumferenceShouldersRight",
  "circumferenceArmsLeft",
  "circumferenceArmsRight",
  "circumferenceFlexedArmsLeft",
  "circumferenceFlexedArmsRight",
  "circumferenceGlutes",
  "circumferenceQuadsLeft",
  "circumferenceQuadsRight",
  "circumferenceCalfLeft",
  "circumferenceCalfRight",
];

export const STATUS_COLORS = {
  weight: ["blue", "lime", "yellow"],
  muscle_mass: ["red", "lime", "violet"],
  bone_mass: ["blue", "lime", "red"],
  metabolic_age: ["lime"],
  body_water: ["red", "lime", "red"],
  muscle_quality: ["yellow", "lime", "blue"],
  physique_rating: ["blue", "lime", "red"],
  segmented: ["blue", "lime", "orange"],
  visc_fat: ["lime", "red"],
  default: ["gray"],
};
