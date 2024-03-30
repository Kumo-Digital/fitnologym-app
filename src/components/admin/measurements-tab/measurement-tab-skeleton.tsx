import { Container, Group, Skeleton, Stack } from "@mantine/core";
import React from "react";

const MeasurementTabSkeleton = () => {
  return (
    <Container size={1024} mt={24}>
      <Stack gap={24}>
        <Group>
          <Skeleton height={36} miw={200} radius="sm" flex={"1 0 0"} />
          <Skeleton height={36} miw={200} flex={"1 0 0"} radius="sm" />
          <Skeleton height={36} miw={200} flex={"1 0 0"} radius="sm" />
        </Group>
        <Skeleton height={500} radius="sm" />
      </Stack>
    </Container>
  );
};

export default MeasurementTabSkeleton;
