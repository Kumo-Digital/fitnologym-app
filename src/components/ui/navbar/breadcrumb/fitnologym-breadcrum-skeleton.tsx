import { Group, Skeleton, Text } from "@mantine/core";

export const FitnologymBreadcrumbSkeleton = () => {
  return (
    <Group gap={12} align="center" wrap="nowrap" h="100%">
      <Group gap={8} wrap="nowrap">
        <Skeleton height={24} width={24} circle />
        <Skeleton height={20} width={140} radius="xl" />
      </Group>
      <Text c="gray.6">/</Text>
      <Group gap={8} wrap="nowrap">
        <Skeleton height={24} width={24} circle />
        <Skeleton height={20} width={140} radius="xl" />
      </Group>
      <Text c="gray.6">/</Text>
      <Skeleton h={20} width={140} radius="xl" />
    </Group>
  );
};
