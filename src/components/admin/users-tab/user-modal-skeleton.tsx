import { Divider, Group, Skeleton, Stack } from "@mantine/core";
import {
  ButtonGroupSkeleton,
  InputFieldSkeleton,
  InputRadioSkeleton,
} from "@/components/ui/loading-skeletons/input-fields";

const UserModalSkeleton = () => {
  return (
    <Stack gap={16}>
      <InputFieldSkeleton />
      <InputFieldSkeleton />
      <Group gap={16} align="stretch" grow>
        <InputFieldSkeleton />
        <InputFieldSkeleton />
      </Group>
      <InputFieldSkeleton />
      <InputRadioSkeleton count={2} />
      <Divider />
      <Skeleton w={150} h={25} />
      <Skeleton h={60} />
      <Group gap={16} align="stretch" grow>
        <InputFieldSkeleton />
        <InputFieldSkeleton />
      </Group>
      <ButtonGroupSkeleton count={2} />
    </Stack>
  );
};

export default UserModalSkeleton;
