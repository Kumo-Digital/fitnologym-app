import { FFMI_STATUS_VALUES_COLORS } from "@/utils/admin";
import { FFMIStatus } from "@/utils/measurement";
import { Card, Divider, Group, Stack, Text, Title, em } from "@mantine/core";
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

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
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

  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  if (isMobile || isMobileMD || isMobileLG)
    return (
      <FfmiTargetMeasureCardMobile
        ffmiCurrentValue={ffmiCurrentValue}
        ffmiTargetValue={ffmiTargetValue}
      />
    );
  return (
    <Card
      radius="md"
      withBorder
      p={0}
      h={120}
      bg={getColor(ffmiTargetValue.toString())}
    >
      <Group gap={16} p={16} align="center" justify="center">
        <Stack
          justify="center"
          align="center"
          w={64}
          h={64}
          style={{ borderRadius: 8 }}
          bg="white"
        >
          <IconMan size={32} color="black" fill="black" />
        </Stack>
        <Group justify="space-between" flex="1 0 0">
          <Stack gap={4}>
            <Text size="md" fw={600} c="black">
              Score FFMI
            </Text>
            <Group gap={4} align="baseline">
              <Title order={2} c="black">
                {ffmiCurrentValue}
              </Title>
            </Group>
          </Stack>

          <Stack gap={4} h={100} justify="center">
            <Text size="md" fw={600} c="black">
              Tipo de Cuerpo
            </Text>
            <Group gap={4}>
              <Title order={2} c="black">
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
  return (
    <Card
      radius="md"
      withBorder
      p={16}
      bg={getColor(ffmiTargetValue.toString())}
    >
      <Stack gap={16} h={200}>
        <Group gap={8} flex={"1 0 0"} justify="space-between">
          <Stack
            justify="center"
            align="center"
            w={64}
            h={64}
            style={{ borderRadius: 8 }}
            bg="white"
          >
            <IconMan size={32} color="black" fill="black" />
          </Stack>
          <Group gap={6} flex={"1 0 0"} justify="space-between">
            <Stack gap={4}>
              <Text size="md" fw={600} c="black">
                Score FFMI
              </Text>
              <Group align="baseline">
                <Title order={3} c="black">
                  {ffmiCurrentValue}
                </Title>
              </Group>
            </Stack>
            <Divider orientation="vertical" />
            <Stack gap={4}>
              <Text size="md" fw={600} c="black">
                Tipo de Cuerpo
              </Text>
              <Group>
                <Title order={3} c="black">
                  {getNameStatus(ffmiTargetValue.toString())}
                </Title>
              </Group>
            </Stack>
          </Group>
        </Group>

        <Group gap={16} flex={"1 0 0"} justify="space-between">
          <Stack gap={4}>
            <Text size="md" fw={600} c="black">
              FFMI
            </Text>
            <Group gap={4} align="baseline">
              <Text size="md" c="black">
                Es el índice de masa libre de grasa que indica la cantidad de
                masa corporal magra compuesta por músculos, huesos y otros
                tejidos magros, excluyendo la grasa.
              </Text>
            </Group>
          </Stack>
          <Stack gap={4}></Stack>
        </Group>
      </Stack>
    </Card>
  );
};
