import {
  FFMI_STATUS_VALUES_COLORS,
  FORCE_RATING_STATUS_VALUES_COLORS,
  ForceRatingMap,
} from "@/utils/admin";
import { FFMIStatus, ForceRatingStatus } from "@/utils/measurement";
import {
  Card,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  alpha,
  em,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBarbell, IconMan } from "@tabler/icons-react";

interface CombinedMeasureCardProps {
  ffmiCurrentValue: number;
  ffmiTargetValue: number;
  forceRatingCurrentValue: number;
  forceRatingValue: number;
}

const getFFMIColor = (value: string): string => {
  const statusEnum = FFMIStatus[value as keyof typeof FFMIStatus];

  const colors = FFMI_STATUS_VALUES_COLORS;

  if (statusEnum) {
    const index = colors.findIndex((item) => item.label === statusEnum);

    if (index !== -1) {
      let color = colors[index].color;
      return color;
    }
  }
  return "gray";
};

const getForceRatingColor = (value: number): string => {
  const key = ForceRatingMap[value] || "WEAK";

  const statusEnum = ForceRatingStatus[key];

  const colors = FORCE_RATING_STATUS_VALUES_COLORS;

  if (statusEnum) {
    const index = colors.findIndex((item) => item.label === statusEnum);

    if (index !== -1) {
      return colors[index].color;
    }
  }
  return "gray";
};

const getForceRatingNameStatus = (value: number): string => {
  const key = ForceRatingMap[value] || "WEAK";

  const statusEnum: any = ForceRatingStatus[key];

  if (!statusEnum) return "Desconocido";

  const index = FORCE_RATING_STATUS_VALUES_COLORS.findIndex(
    (item) => item.label === statusEnum
  );

  if (index !== -1) {
    return FORCE_RATING_STATUS_VALUES_COLORS[index].label;
  }

  return "Desconocido";
};

const getNameStatus = (value: string, type: "ffmi" | "force"): string => {
  let statusEnum;
  if (type === "ffmi") {
    statusEnum = FFMIStatus[value as keyof typeof FFMIStatus];
  } else {
    // Convert the value to the expected label in ForceRatingStatus
    statusEnum = ForceRatingStatus[value as keyof typeof ForceRatingStatus];
  }

  const colors =
    type === "ffmi"
      ? FFMI_STATUS_VALUES_COLORS
      : FORCE_RATING_STATUS_VALUES_COLORS;

  if (!statusEnum) return "Desconocido";

  const index = colors.findIndex((item) => item.label === statusEnum);
  if (index !== -1) {
    return colors[index].label;
  }
  return "Desconocido";
};

export const CombinedMeasureCard = ({
  ffmiCurrentValue,
  ffmiTargetValue,
  forceRatingCurrentValue,
  forceRatingValue,
}: CombinedMeasureCardProps) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(
    `(min-width: ${em(426)}) and (max-width: ${em(572)})`
  );
  const isMobileLG = useMediaQuery(
    `(min-width: ${em(769)}) and (max-width: ${em(1054)})`
  );

  if (isMobile || isMobileMD || isMobileLG) {
    return (
      <CombinedMeasureCardMobile
        ffmiCurrentValue={ffmiCurrentValue}
        ffmiTargetValue={ffmiTargetValue}
        forceRatingCurrentValue={forceRatingCurrentValue}
        forceRatingValue={forceRatingValue}
      />
    );
  }

  return (
    <Card radius="md" withBorder p={0} h={240}>
      <Group gap={16} p={16} align="start" justify="center">
        <Stack
          justify="center"
          align="center"
          w={64}
          h={64}
          style={{
            borderRadius: 8,
          }}
          bg={alpha(
            `var(--mantine-color-${getFFMIColor(
              ffmiTargetValue.toString()
            )}-5)`,
            0.2
          )}
        >
          <IconMan
            size={32}
            color={theme.colors[getFFMIColor(ffmiTargetValue.toString())][5]}
          />
        </Stack>
        <Group justify="space-between" flex="1 0 0">
          <Stack gap={4}>
            <Text size="md" fw={600} c="white">
              Score Free Fat Mass Index
            </Text>
            <Group gap={4} align="baseline">
              <Title order={2} c="white">
                {ffmiCurrentValue}
              </Title>
            </Group>
          </Stack>

          <Stack gap={4} h={100} justify="center">
            <Text size="md" fw={600} c="white">
              Valor de Free Fat Mass Index
            </Text>
            <Group gap={4}>
              <Title order={2} c={getFFMIColor(ffmiTargetValue.toString())}>
                {getNameStatus(ffmiTargetValue.toString(), "ffmi")}
              </Title>
            </Group>
          </Stack>
        </Group>
        <Divider orientation="vertical" m={10} />

        <Stack
          justify="center"
          align="center"
          w={64}
          h={64}
          style={{
            borderRadius: 8,
          }}
          bg={alpha(
            `var(--mantine-color-${getForceRatingColor(forceRatingValue)}-5)`,
            0.2
          )}
        >
          <IconBarbell
            size={32}
            color={theme.colors[getForceRatingColor(forceRatingValue)][5]}
          />
        </Stack>
        <Group justify="space-between" flex="1 0 0">
          <Stack gap={4}>
            <Text size="md" fw={600} c="white">
              Score Fuerza
            </Text>
            <Group gap={4} align="baseline">
              <Title order={2} c="white">
                {forceRatingCurrentValue}
              </Title>
            </Group>
          </Stack>

          <Stack gap={4} h={100} justify="center">
            <Text size="md" fw={600} c="white">
              Valor de Fuerza
            </Text>
            <Group gap={4}>
              <Title order={2} c={getForceRatingColor(forceRatingValue)}>
                {getForceRatingNameStatus(forceRatingValue)}
              </Title>
            </Group>
          </Stack>
        </Group>
      </Group>
    </Card>
  );
};

const CombinedMeasureCardMobile = ({
  ffmiCurrentValue,
  ffmiTargetValue,
  forceRatingCurrentValue,
  forceRatingValue,
}: CombinedMeasureCardProps) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);

  return (
    <Card radius="md" withBorder p={16} h={isMobile ? 310 : "auto"}>
      <Stack gap={16}>
        <Group gap={16} align={isMobile ? "flex-start" : "flex-start"}>
          <Stack
            justify="center"
            align="center"
            w={64}
            h={64}
            style={{ borderRadius: 8 }}
            bg={alpha(
              `var(--mantine-color-${getFFMIColor(
                ffmiTargetValue.toString()
              )}-5)`,
              0.2
            )}
          >
            <IconMan
              size={32}
              color={theme.colors[getFFMIColor(ffmiTargetValue.toString())][5]}
            />
          </Stack>
          <Flex direction={isMobile ? "column" : "row"} gap={6}>
            <Group gap={10}>
              <Text size="md" fw={600} c="white">
                Score FFMI
              </Text>
              <Group align="baseline">
                <Title order={3} c="white">
                  {ffmiCurrentValue}
                </Title>
              </Group>
            </Group>
            <Divider orientation="vertical" m={10} />

            <Stack gap={4}>
              <Text size="md" fw={600} c="white">
                Tipo de Cuerpo
              </Text>
              <Title order={3} c={getFFMIColor(ffmiTargetValue.toString())}>
                {getNameStatus(ffmiTargetValue.toString(), "ffmi")}
              </Title>
            </Stack>
          </Flex>
        </Group>

        <Divider />

        <Group gap={16} align={isMobile ? "flex-start" : "center"}>
          <Stack
            justify="center"
            align="center"
            w={64}
            h={64}
            style={{ borderRadius: 8 }}
            bg={alpha(
              `var(--mantine-color-${getForceRatingColor(forceRatingValue)}-5)`,
              0.2
            )}
          >
            <IconBarbell
              size={32}
              color={theme.colors[getForceRatingColor(forceRatingValue)][5]}
            />
          </Stack>
          <Flex direction={isMobile ? "column" : "row"} gap={6} mb={10}>
            <Group gap={10}>
              <Text size="md" fw={600} c="white">
                Score Fuerza
              </Text>
              <Group align="baseline">
                <Title order={3} c="white">
                  {forceRatingCurrentValue}
                </Title>
              </Group>
            </Group>
            <Divider orientation="vertical" m={10} />
            <Stack gap={4}>
              <Text size="md" fw={600} c="white">
                Valor de Fuerza
              </Text>
              <Title order={3} c={getForceRatingColor(forceRatingValue)}>
                {getForceRatingNameStatus(forceRatingValue)}
              </Title>
            </Stack>
          </Flex>
        </Group>
      </Stack>
    </Card>
  );
};
