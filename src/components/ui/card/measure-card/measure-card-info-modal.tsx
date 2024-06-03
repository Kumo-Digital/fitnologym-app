import {
  BMI_STATUS_DESCRIPTION,
  BMR_STATUS_DESCRIPTION,
  BODY_FAT_DESCRIPTION,
  BODY_WATER_STATUS_COLORS,
  BODY_WATER_STATUS_DESCRIPTION,
  BODY_WATER_STATUS_VALUES,
  BONE_MASS_STATUS_COLORS,
  BONE_MASS_STATUS_DESCRIPTION,
  BONE_MASS_STATUS_VALUES,
  METABOLIC_AGE_STATUS_COLORS,
  METABOLIC_AGE_STATUS_DESCRIPTION,
  METABOLIC_AGE_STATUS_VALUES,
  METABOLIC_BASAL_RATE_STATUS_COLORS,
  METABOLIC_BASAL_RATE_STATUS_VALUES,
  MUSCLE_MASS_STATUS_COLORS,
  MUSCLE_MASS_STATUS_DESCRIPTION,
  MUSCLE_MASS_STATUS_VALUES,
  PHISYQUE_RATING_STATUS_COLORS,
  PHISYQUE_RATING_STATUS_DESCRIPTION,
  PHISYQUE_RATING_STATUS_VALUES,
  SEGMENTED_STATUS_COLORS,
  SEGMENTED_STATUS_DESCRIPTION,
  SEGMENTED_STATUS_VALUES,
  STATUS_COLORS,
  STATUS_VALUES,
  STATUS_VALUES_WITHOUT_OBESITY,
  VISC_FAT_STATUS_COLORS,
  VISC_FAT_STATUS_DESCRIPTION,
  VISC_FAT_STATUS_VALUES,
  WEIGHT_STATUS_COLORS,
  WEIGHT_STATUS_DESCRIPTION,
  WEIGHT_STATUS_VALUES,
} from "@/utils/admin";
import { Box, Text, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import qualityMuscle from "../../../../../public/assets/images/quality-muscle.png";

interface MeasureCardInfoProps {
  measureTitle: string;
}

export const MeasureCardInfoModal: React.FC<MeasureCardInfoProps> = ({
  measureTitle,
}) => {
  const theme = useMantineTheme();

  const isCircumferenceMeasure =
    measureTitle === "circumferenceNeck" ||
    measureTitle === "circumferenceChest" ||
    measureTitle === "circumferenceWaist" ||
    measureTitle === "circumferenceHip" ||
    measureTitle === "circumferenceShoulders" ||
    measureTitle === "circumferenceArms" ||
    measureTitle === "circumferenceGlutes";
  measureTitle === "circumferenceQuads" || measureTitle === "circumferenceCalf";

  return isCircumferenceMeasure ? (
    <Box>
      <Text mb={10}>{SEGMENTED_STATUS_DESCRIPTION}</Text>
      {SEGMENTED_STATUS_VALUES.map((item, index) => (
        <Box key={index} display="flex" mb={5}>
          <Box
            bg={theme.colors[SEGMENTED_STATUS_COLORS[index]][6]}
            w={20}
            h={20}
            mr={10}
            style={{
              borderRadius: "50%",
            }}
          />
          <Text>{item.label}</Text>
        </Box>
      ))}
    </Box>
  ) : (
    (measureTitle === "physique_rating" && (
      <Box
        style={{
          position: "relative",
          width: "100%",
          height: "247px",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <Image
          src={qualityMuscle}
          alt="Tabla de calidad muscular"
          fill
          sizes="(max-width: 420px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw"
          style={{ objectFit: "contain" }}
        />
      </Box>
    )) ||
      (measureTitle === "weight" && (
        <Box>
          <Text mb={10}>{WEIGHT_STATUS_DESCRIPTION}</Text>
          {WEIGHT_STATUS_VALUES.map((item, index) => (
            <Box key={index} display="flex" mb={5}>
              <Box
                bg={theme.colors[WEIGHT_STATUS_COLORS[index]][6]}
                w={20}
                h={20}
                mr={10}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Text>{item.label}</Text>
            </Box>
          ))}
        </Box>
      )) ||
      (measureTitle === "visc_fat" && (
        <Box>
          <Text mb={10}>{VISC_FAT_STATUS_DESCRIPTION}</Text>
          {VISC_FAT_STATUS_VALUES.map((item, index) => (
            <Box key={index} display="flex" mb={5}>
              <Box
                bg={theme.colors[VISC_FAT_STATUS_COLORS[index]][6]}
                w={20}
                h={20}
                mr={10}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Text>{item.label}</Text>
            </Box>
          ))}
        </Box>
      )) ||
      (measureTitle === "bone_mass" && (
        <Box>
          <Text mb={10}>{BONE_MASS_STATUS_DESCRIPTION}</Text>
          {BONE_MASS_STATUS_VALUES.map((item, index) => (
            <Box key={index} display="flex" mb={5}>
              <Box
                bg={theme.colors[BONE_MASS_STATUS_COLORS[index]][6]}
                w={20}
                h={20}
                mr={10}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Text>{item.label}</Text>
            </Box>
          ))}
        </Box>
      )) ||
      (measureTitle === "metab_age" && (
        <Box>
          <Text mb={10}>{METABOLIC_AGE_STATUS_DESCRIPTION}</Text>
          Normalmente, la edad metabólica es igual o menor a la edad
          cronológica.
        </Box>
      )) ||
      (measureTitle === "muscle_mass" && (
        <Box>
          <Text mb={10}>{MUSCLE_MASS_STATUS_DESCRIPTION}</Text>
          {MUSCLE_MASS_STATUS_VALUES.map((item, index) => (
            <Box key={index} display="flex" mb={5}>
              <Box
                bg={theme.colors[MUSCLE_MASS_STATUS_COLORS[index]][6]}
                w={20}
                h={20}
                mr={10}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Text>{item.label}</Text>
            </Box>
          ))}
        </Box>
      )) ||
      (measureTitle === "bmi" && (
        <Box>
          <Text mb={10}>{BMI_STATUS_DESCRIPTION}</Text>
          {STATUS_VALUES.map((item, index) => (
            <Box key={index} display="flex" mb={5}>
              <Box
                bg={theme.colors[STATUS_COLORS[index]][6]}
                w={20}
                h={20}
                mr={10}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Text>{item.label}</Text>
            </Box>
          ))}
        </Box>
      )) ||
      (measureTitle === "body_fat" && (
        <Box>
          <Text mb={10}>{BODY_FAT_DESCRIPTION}</Text>
          {STATUS_VALUES_WITHOUT_OBESITY.map((item, index) => (
            <Box key={index} display="flex" mb={5}>
              <Box
                bg={theme.colors[STATUS_COLORS[index]][6]}
                w={20}
                h={20}
                mr={10}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Text>{item.label}</Text>
            </Box>
          ))}
        </Box>
      )) ||
      (measureTitle === "bmr" && (
        <Box>
          <Text mb={10}>{BMR_STATUS_DESCRIPTION}</Text>
          {METABOLIC_BASAL_RATE_STATUS_VALUES.map((item, index) => (
            <Box key={index} display="flex" mb={5}>
              <Box
                bg={theme.colors[METABOLIC_BASAL_RATE_STATUS_COLORS[index]][6]}
                w={20}
                h={20}
                mr={10}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Text>{item.label}</Text>
            </Box>
          ))}
        </Box>
      )) ||
      (measureTitle === "body_water" && (
        <Box>
          <Text mb={10}>{BODY_WATER_STATUS_DESCRIPTION}</Text>
          {BODY_WATER_STATUS_VALUES.map((item, index) => (
            <Box key={index} display="flex" mb={5}>
              <Box
                bg={theme.colors[BODY_WATER_STATUS_COLORS[index]][6]}
                w={20}
                h={20}
                mr={10}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Text>{item.label}</Text>
            </Box>
          ))}
        </Box>
      )) ||
      (measureTitle === "muscle_quality" && (
        <Box>
          <Text mb={10}>{PHISYQUE_RATING_STATUS_DESCRIPTION}</Text>
          {PHISYQUE_RATING_STATUS_VALUES.map((item, index) => (
            <Box key={index} display="flex" mb={5}>
              <Box
                bg={theme.colors[PHISYQUE_RATING_STATUS_COLORS[index]][6]}
                w={20}
                h={20}
                mr={10}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Text>{item.label}</Text>
            </Box>
          ))}
        </Box>
      ))
  );
};
