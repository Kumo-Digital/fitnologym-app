import SpeedMeter from "@/components/ui/speed-meter";
import { Text, Card, Stack, Group } from "@mantine/core";
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
        <Group wrap="nowrap" gap={32}>
          <SpeedMeter name="Brazos" value={armsValue} />
          <SpeedMeter name="Piernas" value={legsValue} />
        </Group>
      </Stack>
    </Card>
  );
};

export default BodySectionBalance;
