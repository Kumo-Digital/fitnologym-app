import { Group, Skeleton, Stack } from "@mantine/core";

export const InputFieldSkeleton = () => (
  <Stack gap={2}>
    <Skeleton height={18} w={120} radius="sm" />
    <Skeleton height={36} radius="sm" />
  </Stack>
);

interface ButtonGroupSkeletonProps {
  count?: number;
}
export const ButtonGroupSkeleton = ({
  count = 1,
}: ButtonGroupSkeletonProps) => (
  <Group gap={16} justify="flex-end">
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton key={`button-${index}`} height={36} radius="sm" w={100} />
    ))}
  </Group>
);

interface InputRadioSkeletonProps {
  count?: number;
}
export const InputRadioSkeleton = ({ count = 1 }: InputRadioSkeletonProps) => (
  <Stack gap={2}>
    <Skeleton height={18} w={120} radius="sm" />
    <Group gap={24}>
      {Array.from({ length: count }).map((_, index) => (
        <Group gap={12} key={`group-${index}`}>
          <Skeleton height={20} circle />
          <Skeleton height={20} w={75} radius="sm" />
        </Group>
      ))}
    </Group>
  </Stack>
);
