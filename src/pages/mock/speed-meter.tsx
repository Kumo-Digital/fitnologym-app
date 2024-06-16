import SpeedMeter from "@/components/ui/speed-meter";
import BodySectionBalance from "@/components/user-overview/overview-tab/body-section-balance";
import { withRootLayout } from "@/utils/layouts";
import { Container, Group, Stack, Title } from "@mantine/core";
import React from "react";

const SpeedMeterPage = () => {
  return (
    // <Container>
    <Stack gap={32}>
      <Title>SpeedMeterPage</Title>
      <BodySectionBalance
        name="Grasa Corporal"
        description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        armsValue={5}
        legsValue={-3}
      />
      <BodySectionBalance
        name="Masa Muscular"
        armsValue={7}
        legsValue={0}
        description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </Stack>
    // </Container>
  );
};

withRootLayout(SpeedMeterPage);
export default SpeedMeterPage;
