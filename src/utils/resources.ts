import { IconBarbell, IconSalad, IconScaleOutline } from "@tabler/icons-react";

interface UserResource {
  id: string;
  title: string;
  description: string[];
  icon: React.FC;
  color: string;
  resource_link: string;
}

export const userResources: UserResource[] = [
  {
    id: "calories-table",
    title: "Calorías de los alimentos",
    description: [
      "La tabla de calorías de alimentos proporciona una lista completa de alimentos junto con sus respectivos conteos de calorías por porción.",
      "Un recurso valioso para las personas que buscan gestionar su ingesta de calorías y mantener una dieta equilibrada.",
    ],
    icon: IconScaleOutline,
    color: "lime-5", // Write the color with kebab-case, this is intended to be used with the useMantineTheme hook as a css variable
    resource_link: "https://www.google.com",
  },
  {
    id: "weekly-meal-plan",
    title: "Planning Menu Semanal",
    description: [
      "Tabla de planificación de comidas semanal para organizar y estructurar las comidas de la semana de manera anticipada.",
      "Permite establecer un menú equilibrado, gestionar mejor los ingredientes, ahorrar tiempo en la preparación de alimentos y facilitar el seguimiento de una alimentación saludable y variada.",
    ],
    icon: IconSalad,
    color: "lime-5", // Write the color with kebab-case, this is intended to be used with the useMantineTheme hook as a css variable
    resource_link: "https://www.google.com",
  },
  {
    id: "gym-routine",
    title: "Plantilla Rutina de Gimnasio",
    description: [
      "Utiliza la plantilla para diseñar y organizar un programa de ejercicios específico y estructurado.",
      "Te ayuda a establecer objetivos de entrenamiento, distribuir los ejercicios de manera adecuada, hacer un seguimiento del progreso y mantener la consistencia en la práctica del ejercicio físico.",
    ],
    icon: IconBarbell,
    color: "violet-5", // Write the color with kebab-case, this is intended to be used with the useMantineTheme hook as a css variable
    resource_link: "https://www.google.com",
  },
];
