import FFMIBalance from "@/components/ui/ffmi-balance";
import { withRootLayout } from "@/utils/layouts";
import { Container, Stack, Title } from "@mantine/core";
import React from "react";

const FFMI = () => {
  return (
    // <Container>
    <Stack gap={32}>
      <Title>FFMI Slider</Title>
      <FFMIBalance
        label="FFMI Balance"
        description="Lorem ipsum dolor sit amet consectetur. Eget maecenas volutpat fringilla id felis. Dignissim platea eu in tempus mattis gravida purus in enim."
        value={23}
      />
    </Stack>
    // </Container>
  );
};

withRootLayout(FFMI);
export default FFMI;
