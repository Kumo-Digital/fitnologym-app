import SpeedMeter from "@/components/ui/speed-meter";
import { withRootLayout } from "@/utils/layouts";
import { Container, Group, Stack, Title } from "@mantine/core";
import React from "react";

const SpeedMeterPage = () => {
  return (
    // <Container>
    <Stack gap={32}>
      <Title>SpeedMeterPage</Title>
      <Group wrap="nowrap" w={500} h={500}>
        <SpeedMeter name="Brazos" value={0} />
        <SpeedMeter name="Piernas" value={0} />
      </Group>
    </Stack>
    // </Container>
  );
};

withRootLayout(SpeedMeterPage);
export default SpeedMeterPage;
