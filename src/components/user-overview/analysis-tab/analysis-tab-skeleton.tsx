import { Group, Skeleton, Stack } from "@mantine/core";

const AnalysisTabSkeleton = () => {
  return (
    <Stack mt={32} gap={32}>
      <Group align="flex-end">
        <Stack gap={4} miw={200} flex={"1 0 0"}>
          <Skeleton height={21} w={100} radius="sm" />
          <Skeleton height={36} radius="sm" />
        </Stack>
        <Stack gap={4} miw={200} flex={"1 0 0"}>
          <Skeleton height={21} w={100} radius="sm" />
          <Skeleton height={36} radius="sm" />
        </Stack>
        <Skeleton height={36} w={200} radius="sm" miw={200} flex={"1 0 0"} />
      </Group>
      <Group gap={4} justify="flex-end">
        <Skeleton height={28} w={95} radius="sm" />
        <Skeleton height={28} w={95} radius="sm" />
        <Skeleton height={28} w={95} radius="sm" />
        <Skeleton height={28} w={95} radius="sm" />
        <Skeleton height={28} w={95} radius="sm" />
      </Group>
      <Skeleton h={500}></Skeleton>
    </Stack>
  );
};

export default AnalysisTabSkeleton;
