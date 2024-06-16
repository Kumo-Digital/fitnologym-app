import SpeedMeter from "@/components/ui/speed-meter";
import { Text, Card, Stack, Group, Flex, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

interface BodySectionBalanceProps {
  name: string;
  description?: string;
  armsValue: number;
  legsValue: number;
}

const BodySectionBalance = ({
  name,
  description,
  armsValue,
  legsValue,
}: BodySectionBalanceProps) => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);

  return (
    <Card radius="md" withBorder p={16}>
      <Stack align="center">
        <Stack align="center" gap={2}>
          <Text size="md" fw={500} c="white" ta="center">
            {name}
          </Text>
          {description && (
            <Text size="sm" fw={400} ta="center">
              {description}
            </Text>
          )}
        </Stack>
        <Flex direction={isMobile ? "column" : "row"} wrap="nowrap" gap={32}>
          <SpeedMeter name="Brazos" value={armsValue} />
          <SpeedMeter name="Piernas" value={legsValue} />
        </Flex>
      </Stack>
    </Card>
  );
};

export default BodySectionBalance;
