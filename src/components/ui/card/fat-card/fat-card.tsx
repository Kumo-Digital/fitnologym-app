import {
  alpha,
  Card,
  Container,
  Divider,
  em,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowRight, IconScale } from "@tabler/icons-react";

interface FatCardProps {
  bodyFatPercentage: number;
  weight: number;
  fatFreeMass: number;
}

const bodyFatInKg = (bodyFatPercentage: number, weight: number) => {
  return (bodyFatPercentage * weight) / 100;
};

export const FatCard: React.FC<FatCardProps> = ({
  bodyFatPercentage,
  weight,
  fatFreeMass,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);

  return (
    <Card radius="md" withBorder p={16}>
      <Group
        gap={isMobile ? 10 : 20}
        align="center"
        justify={isMobile ? "center" : "start"}
      >
        <Stack
          justify="center"
          align="center"
          w={70}
          h={70}
          style={{ borderRadius: 8 }}
          bg={alpha(theme.colors.lime[5], 0.2)}
        >
          <IconScale size={32} color={theme.colors.lime[5]} />
        </Stack>

        {isMobile ? (
          <Container>
            <Group
              gap={10}
              align="center"
              justify="center"
              style={{ width: "100%" }}
            >
              <Stack align="center" justify="baseline">
                <Group gap={5} align="baseline">
                  <Text size="md" fw={600} c="gray.0">
                    Grasa Corporal
                  </Text>
                  <IconArrowRight size={20} />

                  <Title order={2} c="gray.0">
                    {bodyFatPercentage}
                  </Title>
                  <Text size="xs" c="gray.5">
                    %
                  </Text>
                </Group>
              </Stack>

              <Stack align="center" justify="baseline">
                <Group gap={5} align="center">
                  <Text size="md" fw={600} c="gray.0">
                    Masa Libre de Grasa (FFM)
                  </Text>
                  <IconArrowRight size={20} />

                  <Title order={2} c="gray.0">
                    {fatFreeMass}
                  </Title>
                  <Text size="xs" c="gray.5">
                    kg
                  </Text>
                </Group>
              </Stack>
              <Stack align="center" justify="baseline">
                <Group gap={5} align="center">
                  <Text size="md" fw={600} c="gray.0">
                    Grasa Corporal en kg
                  </Text>
                  <IconArrowRight size={20} />
                  <Title order={2} c="gray.0">
                    {bodyFatInKg(bodyFatPercentage, weight).toFixed(2)}
                  </Title>
                  <Text size="xs" c="gray.5">
                    kg
                  </Text>
                </Group>
              </Stack>
            </Group>
          </Container>
        ) : (
          <Group gap={20}>
            <Stack gap={10} align="flex-start">
              <Text size="md" fw={600} c="gray.0">
                Grasa Corporal
              </Text>
              <Group gap={2} align="baseline">
                <Title order={2} c="gray.0">
                  {bodyFatPercentage}
                </Title>
                <Text size="xs" c="gray.5">
                  %
                </Text>
              </Group>
            </Stack>
            <Divider orientation="vertical" />
            <Stack gap={10} align="flex-start">
              <Text size="sm" fw={600} c="gray.0">
                Masa Libre de Grasa (FFM)
              </Text>
              <Group gap={2} align="baseline">
                <Title order={2} c="gray.0">
                  {fatFreeMass}
                </Title>
                <Text size="xs" c="gray.5">
                  kg
                </Text>
              </Group>
            </Stack>

            <Divider orientation="vertical" />
            <Stack gap={10} align="flex-start">
              <Text size="sm" fw={600} c="gray.0">
                Grasa Corporal en kg
              </Text>
              <Group gap={2} align="baseline">
                <Title order={2} c="gray.0">
                  {bodyFatInKg(bodyFatPercentage, weight).toFixed(2)}
                </Title>
                <Text size="xs" c="gray.5">
                  kg
                </Text>
              </Group>
            </Stack>
          </Group>
        )}
      </Group>
    </Card>
  );
};
