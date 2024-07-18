import {
  BONE_MASS_STATUS_COLORS,
  METABOLIC_AGE_STATUS_COLORS,
  MUSCLE_MASS_STATUS_COLORS,
  MUSCLE_QUALITY_STATUS_COLORS,
  PHISYQUE_RATING_STATUS_COLORS,
  SEGMENTED_STATUS_COLORS,
  STATUS_COLORS,
  STATUS_VALUES_WITHOUT_OBESITY_COLORS,
  VISC_FAT_STATUS_COLORS,
  WEIGHT_STATUS_COLORS,
} from "@/utils/admin";
import { circumferenceMeasures } from "@/utils/utils";
import { Box, MantineTheme, useMantineTheme } from "@mantine/core";
import { BODY_WATER_STATUS_COLORS } from "../../../../utils/admin";

interface MeasureCardInfoProps {
  measureTitle: string;
  measureValue: number;
  measureStatus: number;
}

const getColorByStatus = (
  colors: string[],
  status: number,
  theme: MantineTheme
) => {
  return theme.colors[colors[status]]?.[5] || theme.colors.gray[5];
};

export const getMeasureStatusColor = (
  theme: MantineTheme,
  measureTitle: string,
  measureStatus: number
): string => {
  const colors: Record<string, string[]> = {
    weight: WEIGHT_STATUS_COLORS,
    physique_rating: PHISYQUE_RATING_STATUS_COLORS,
    body_fat: STATUS_VALUES_WITHOUT_OBESITY_COLORS,
    visc_fat: VISC_FAT_STATUS_COLORS,
    metab_age: METABOLIC_AGE_STATUS_COLORS,
    bmi: STATUS_COLORS,
    bmr: STATUS_COLORS,
    bone_mass: BONE_MASS_STATUS_COLORS,
    body_water: BODY_WATER_STATUS_COLORS,
    muscle_mass: MUSCLE_MASS_STATUS_COLORS,
    muscle_quality: MUSCLE_QUALITY_STATUS_COLORS,
    segmented: SEGMENTED_STATUS_COLORS,
  };
  const key = measureTitle.toLowerCase();
  const isCircumferenceMeasure = circumferenceMeasures.includes(measureTitle);

  const statusColors = colors[key] || STATUS_COLORS;
  if (isCircumferenceMeasure) {
    return getColorByStatus(statusColors, measureStatus - 1, theme);
  }
  return getColorByStatus(statusColors, measureStatus - 1, theme);
};

export const BoxColorCard: React.FC<MeasureCardInfoProps> = ({
  measureTitle,
  measureStatus,
}) => {
  const theme = useMantineTheme();
  const color = getMeasureStatusColor(theme, measureTitle, measureStatus);

  return <Box bg={color} miw={8} style={{ borderRadius: 9999 }} />;
};
