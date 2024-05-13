import React, { useState } from "react";
import {
  Card,
  Text,
  Group,
  Stack,
  Title,
  Box,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronsDown,
  IconChevronsUp,
  IconExclamationCircle,
  IconLineDashed,
} from "@tabler/icons-react";
import { getMeasureName, getMeasureStatusColor } from "@/utils/measurement";
import qualityMuscle from "../../../../../public/assets/images/quality-muscle.png";

interface MeasureCardProps {
  measureTitle: string;
  measureValue: number;
  measureUnit: string;
  evolutionValue: number;
  measureStatus: number;
}

export const MeasureCard: React.FC<MeasureCardProps> = ({
  measureTitle,
  measureValue,
  evolutionValue,
  measureUnit,
  measureStatus,
}) => {
  const theme = useMantineTheme();
  const [isOpen, setIsOpen] = useState(false);

  const [hovered, setHovered] = useState(false);
  /* para que funcione qualityMuscle como string  le ponemos src */
  const url = qualityMuscle.src;

  const handleHover = () => {
    setHovered(true);
  };

  const handleHoverExit = () => {
    setHovered(false);
  };

  const handleToggleTooltip = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card radius="md" withBorder p={0}>
      <Group gap={16} py={24} pl={16} pr={24} align="stretch" wrap="nowrap">
        {measureTitle === "muscle_quality" && (
          <Tooltip
            label=""
            position="top"
            withArrow
            style={{
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              width: "50vh",
              height: "30vh",
              border: "2px solid #74b816",
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
            }}
            onClick={handleToggleTooltip}
          >
            <Box
              miw={8}
              bg={getMeasureStatusColor(measureStatus ?? 1)}
              style={{
                borderRadius: 9999,
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverExit}
            ></Box>
          </Tooltip>
        )}
        {measureTitle !== "muscle_quality" && (
          <Box
            miw={8}
            bg={getMeasureStatusColor(measureStatus ?? 1)}
            style={{ borderRadius: 9999 }}
          ></Box>
        )}
        <Stack
          gap={4}
          align="flex-start"
          h="100%"
          justify="space-between"
          style={{ flexGrow: 1 }}
        >
          <Group>
            {measureTitle !== "muscle_quality" && (
              <Text size="md" c="gray.0" fw={600} maw={150}>
                {getMeasureName(measureTitle)}
              </Text>
            )}
            {measureTitle === "muscle_quality" && (
              <Tooltip
                label=""
                position="top"
                withArrow
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: "cover",
                  width: "50vh",
                  height: "30vh",
                  border: "2px solid #74b816",
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                }}
                onClick={handleToggleTooltip}
              >
                <Group gap={4}>
                  <Text size="md" c="gray.0" fw={600} maw={150}>
                    {getMeasureName(measureTitle)}
                  </Text>
                  <IconExclamationCircle
                    size={16}
                    stroke={2}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                  />
                </Group>
              </Tooltip>
            )}
          </Group>
          <Group align="baseline" gap={4}>
            <Title order={2} c="gray.0" fw={600}>
              {measureValue}
            </Title>
            <Text size="xs" c="gray.5">
              {measureUnit}
            </Text>
          </Group>
        </Stack>
        <Stack gap={4} align="flex-start" justify="space-between">
          <Text size="md" c="gray.0" fw={700} h={36} w={75}>
            Evolución
          </Text>
          <Group align="baseline" gap={8}>
            {(evolutionValue === 0 || !evolutionValue) && (
              <IconLineDashed
                color={theme.colors.gray[5]}
                aria-label="Options"
                size={20}
                style={{
                  position: "relative",
                  bottom: "-4px",
                }}
              />
            )}
            {evolutionValue === null && (
              <IconLineDashed
                color={theme.colors.gray[5]}
                aria-label="Options"
                size={20}
                style={{
                  position: "relative",
                  bottom: "-4px",
                }}
              />
            )}
            {evolutionValue < 0 && (
              <IconChevronsUp
                color={theme.colors.lime[5]}
                aria-label="Options"
                size={20}
                style={{
                  position: "relative",
                  bottom: "-4px",
                }}
              />
            )}
            {evolutionValue > 0 && (
              <IconChevronsDown
                color={theme.colors.lime[5]}
                aria-label="Options"
                size={20}
                style={{
                  position: "relative",
                  bottom: "-4px",
                }}
              />
            )}
            <Tooltip
              label={
                !evolutionValue
                  ? "Aún no hay medidas suficientes para contrastar"
                  : "Crecimiento respecto a la última medida"
              }
              position="bottom"
              multiline
              withArrow
              w={160}
            >
              {evolutionValue === 0 ||
              evolutionValue === null ||
              !evolutionValue ? (
                <Group align="baseline" gap={8}>
                  <Text size="xl" c="gray.0" fw={600}>
                    0
                  </Text>
                </Group>
              ) : (
                <Group align="baseline" gap={8}>
                  <Text size="xl" c="gray.0" fw={600}>
                    {Math.abs(evolutionValue).toFixed(1)}
                  </Text>
                  <Text size="sm" c="gray.5">
                    %
                  </Text>
                </Group>
              )}
            </Tooltip>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};
