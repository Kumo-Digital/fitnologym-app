import { Flex, Group, Skeleton, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const UserOverviewSkeleton = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(475)}`);
  return (
    <Flex direction={isMobile ? "column" : "row"}>
      <Skeleton height={42} radius="sm" />
      <Group h={120} justify="space-between" align="center">
        <Skeleton w={200} h={42} radius="sm" />
        <Skeleton w={250} h={20} radius="sm" />
      </Group>
    </Flex>
  );
};
