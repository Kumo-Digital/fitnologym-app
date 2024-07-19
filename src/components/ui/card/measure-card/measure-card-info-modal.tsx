import {
  BMI_STATUS_DESCRIPTION,
  BMR_STATUS_DESCRIPTION,
  BODY_FAT_DESCRIPTION,
  BODY_FAT_STATUS_COLORS,
  BODY_FAT_STATUS_VALUES,
  BODY_WATER_STATUS_COLORS,
  BODY_WATER_STATUS_DESCRIPTION,
  BODY_WATER_STATUS_VALUES,
  BONE_MASS_STATUS_COLORS,
  BONE_MASS_STATUS_DESCRIPTION,
  BONE_MASS_STATUS_VALUES,
  METABOLIC_AGE_STATUS_DESCRIPTION,
  METABOLIC_BASAL_RATE_STATUS_COLORS,
  METABOLIC_BASAL_RATE_STATUS_VALUES,
  MUSCLE_MASS_STATUS_COLORS,
  MUSCLE_MASS_STATUS_DESCRIPTION,
  MUSCLE_MASS_STATUS_VALUES,
  PHISYQUE_RATING_STATUS_COLORS,
  PHISYQUE_RATING_STATUS_DESCRIPTION,
  PHISYQUE_RATING_STATUS_VALUES,
  SEGMENTED_STATUS_DESCRIPTION,
  STATUS_COLORS,
  STATUS_VALUES,
  STATUS_VALUES_WITHOUT_OBESITY,
  STATUS_VALUES_WITHOUT_OBESITY_COLORS,
  VISC_FAT_STATUS_COLORS,
  VISC_FAT_STATUS_DESCRIPTION,
  VISC_FAT_STATUS_VALUES,
  WEIGHT_STATUS_COLORS,
  WEIGHT_STATUS_DESCRIPTION,
  WEIGHT_STATUS_VALUES,
} from "@/utils/admin";
import { circumferenceMeasures } from "@/utils/utils";
import {
  Box,
  em,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import qualityMuscle from "../../../../../public/assets/images/quality-muscle.png";

interface MeasureCardInfoProps {
  measureTitle: string;
}

export const MeasureCardInfoModal: React.FC<MeasureCardInfoProps> = ({
  measureTitle,
}) => {
  const theme = useMantineTheme();

  const isCircumferenceMeasure = circumferenceMeasures.includes(measureTitle);
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);
  if (isCircumferenceMeasure) {
    return (
      <Box>
        <Text mb={10}>{SEGMENTED_STATUS_DESCRIPTION}</Text>
      </Box>
    );
  }

  switch (measureTitle) {
    case "physique_rating":
      return (
        <Box
          w="100%"
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
      );

    case "weight":
      return (
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
      );

    case "visc_fat":
      return (
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
      );

    case "bone_mass":
      return (
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
      );

    case "metab_age":
      return (
        <Box>
          <Text mb={10}>{METABOLIC_AGE_STATUS_DESCRIPTION}</Text>
          Normalmente, la edad metabólica es igual o menor a la edad
          cronológica.
        </Box>
      );

    case "muscle_mass":
      return (
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
      );

    case "bmi":
      return (
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
      );

    case "body_fat":
      return (
        <Box>
          <Text mb={10}>{BODY_FAT_DESCRIPTION}</Text>
          <SimpleGrid cols={isMobile ? 1 : 2} spacing={isMobile ? "lg" : "xl"}>
            <div>
              <Title order={6} mb={25}>
                Generales
              </Title>
              {STATUS_VALUES_WITHOUT_OBESITY.map((item, index) => (
                <Box key={index} display="flex" mb={5}>
                  <Box
                    bg={
                      theme.colors[
                        STATUS_VALUES_WITHOUT_OBESITY_COLORS[index]
                      ][6]
                    }
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
            </div>
            <div>
              <Title order={6}>Segmentados</Title>
              <Title order={6} mb={5}>
                (Torso, Brazos, Piernas)
              </Title>
              {BODY_FAT_STATUS_VALUES.map((item, index) => (
                <Box key={index} display="flex" mb={5}>
                  <Box
                    bg={theme.colors[BODY_FAT_STATUS_COLORS[index]][6]}
                    w={20}
                    h={20}
                    mr={10}
                    style={{ borderRadius: "50%" }}
                  />
                  <Text>{item.label}</Text>
                </Box>
              ))}
            </div>
          </SimpleGrid>
        </Box>
      );

    case "bmr":
      return (
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
      );

    case "body_water":
      return (
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
      );

    case "muscle_quality":
      return (
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
      );

    default:
      return null;
  }
};
