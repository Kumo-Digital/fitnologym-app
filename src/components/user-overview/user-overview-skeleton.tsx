import { Group, Skeleton, Stack } from "@mantine/core";

export const UserOverviewSkeleton = () => {
  return (
    <Stack>
      <Skeleton height={42} radius="sm" />
      <Group h={120} justify="space-between" align="center">
        <Skeleton w={200} h={42} radius="sm" />
        <Skeleton w={250} h={20} radius="sm" />
      </Group>
    </Stack>
  );
};
