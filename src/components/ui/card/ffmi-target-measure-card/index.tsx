import { FFMI_STATUS_VALUES_COLORS } from "@/utils/admin";
import { FFMIStatus } from "@/utils/measurement";
import {
  Card,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMan } from "@tabler/icons-react";

interface FfmiTargetMeasureCardProps {
  ffmiCurrentValue: number;
  ffmiTargetValue: number;
}

export const getColor = (ffmiTargetValue: string): string => {
  // Convierte ffmiTargetValue a un valor del enumerado FFMIStatus si es necesario
  const statusEnum = FFMIStatus[ffmiTargetValue as keyof typeof FFMIStatus];

  if (statusEnum) {
    const index = FFMI_STATUS_VALUES_COLORS.findIndex(
      (item) => item.label === statusEnum
    );

    if (index !== -1) {
      return FFMI_STATUS_VALUES_COLORS[index].color;
    } else {
      console.log(
        `No se encontró ninguna coincidencia para "${ffmiTargetValue}". Devolviendo color predeterminado.`
      );
      return "gray"; // Color predeterminado si no se encuentra ninguna coincidencia
    }
  } else {
    console.log(
      `Valor no válido para FFMIStatus: "${ffmiTargetValue}". Devolviendo color predeterminado.`
    );
    return "gray"; // Color predeterminado si ffmiTargetValue no es un valor válido de FFMIStatus
  }
};

export const getNameStatus = (ffmiTargetValue: string): string => {
  // Convierte ffmiTargetValue a un valor del enumerado FFMIStatus si es necesario
  const statusEnum = FFMIStatus[ffmiTargetValue as keyof typeof FFMIStatus];

  if (statusEnum) {
    const index = FFMI_STATUS_VALUES_COLORS.findIndex(
      (item) => item.label === statusEnum
    );

    if (index !== -1) {
      return FFMI_STATUS_VALUES_COLORS[index].label;
    } else {
      console.log(
        `No se encontró ninguna coincidencia para "${ffmiTargetValue}". Devolviendo color predeterminado.`
      );
      return "Desconocido"; // Valor predeterminado si no se encuentra ninguna coincidencia
    }
  } else {
    console.log(
      `Valor no válido para FFMIStatus: "${ffmiTargetValue}". Devolviendo color predeterminado.`
    );
    return "Desconocido"; // Valor predeterminado si ffmiTargetValue no es un valor válido de FFMIStatus
  }
};

export const FfmiTargetMeasureCard = ({
  ffmiCurrentValue,
  ffmiTargetValue,
}: FfmiTargetMeasureCardProps) => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(
    `(min-width: ${em(426)}) and (max-width: ${em(572)})`
  );
  const isMobileLG = useMediaQuery(
    `(min-width: ${em(769)}) and (max-width: ${em(1054)})`
  );

  if (isMobile || isMobileMD || isMobileLG)
    return (
      <FfmiTargetMeasureCardMobile
        ffmiCurrentValue={ffmiCurrentValue}
        ffmiTargetValue={ffmiTargetValue}
      />
    );
  return (
    <Card radius="md" withBorder p={0} h={120}>
      <Group gap={16} p={16} align="center" justify="center">
        <Stack
          justify="center"
          align="center"
          w={64}
          h={64}
          style={{ borderRadius: 8 }}
          bg={getColor(ffmiTargetValue.toString())}
        >
          <IconMan size={32} color="white" fill="white" />
        </Stack>
        <Group justify="space-between" flex="1 0 0">
          <Stack gap={4}>
            <Text size="md" fw={600} c="white">
              Score FFMI
            </Text>
            <Group gap={4} align="baseline">
              <Title order={2} c="white">
                {ffmiCurrentValue}
              </Title>
            </Group>
          </Stack>

          <Stack gap={4} h={100} justify="center">
            <Text size="md" fw={600} c="white">
              Tipo de Cuerpo
            </Text>
            <Group gap={4}>
              <Title order={2} c={getColor(ffmiTargetValue.toString())}>
                {getNameStatus(ffmiTargetValue.toString())}
              </Title>
            </Group>
          </Stack>
          <Stack gap={4} h={100} justify="center"></Stack>
        </Group>
      </Group>
    </Card>
  );
};

const FfmiTargetMeasureCardMobile = ({
  ffmiCurrentValue,
  ffmiTargetValue,
}: FfmiTargetMeasureCardProps) => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);

  return (
    <Card radius="md" withBorder p={16}>
      <Stack gap={16}>
        <Group gap={16} align={isMobile ? "flex-start" : "center"}>
          <Stack
            justify="center"
            align="center"
            w={64}
            h={64}
            style={{ borderRadius: 8 }}
            bg={getColor(ffmiTargetValue.toString())}
          >
            <IconMan size={32} color="white" fill="white" />
          </Stack>
          <Flex direction={isMobile ? "column" : "row"} gap={6}>
            <Stack gap={4}>
              <Text size="md" fw={600} c="white">
                Score FFMI
              </Text>
              <Group align="baseline">
                <Title order={3} c="white">
                  {ffmiCurrentValue}
                </Title>
              </Group>
            </Stack>
            <Divider orientation={isMobile ? "horizontal" : "vertical"} />
            <Stack gap={4}>
              <Text size="md" fw={600} c="white">
                Tipo de Cuerpo
              </Text>
              <Title order={3} c={getColor(ffmiTargetValue.toString())}>
                {getNameStatus(ffmiTargetValue.toString())}
              </Title>
            </Stack>
          </Flex>
        </Group>

        <Group>
          <Stack gap={4}>
            <Text size="md" fw={600} c="white">
              FFMI
            </Text>
            <Text size="md" c="white">
              Es el índice de masa libre de grasa que indica la cantidad de masa
              corporal magra compuesta por músculos, huesos y otros tejidos
              magros, excluyendo la grasa.
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};
