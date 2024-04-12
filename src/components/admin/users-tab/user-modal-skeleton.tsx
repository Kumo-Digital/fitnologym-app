import { Divider, Flex, Skeleton, Stack, em } from "@mantine/core";
import {
  ButtonGroupSkeleton,
  InputFieldSkeleton,
  InputRadioSkeleton,
} from "@/components/ui/loading-skeletons/input-fields";
import { useMediaQuery } from "@mantine/hooks";

const UserModalSkeleton = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  return (
    <Stack gap={16}>
      <InputFieldSkeleton />
      <InputFieldSkeleton />
      <Flex gap={16} align="stretch" direction={isMobile ? "column" : "row"}>
        <InputFieldSkeleton />
        <InputFieldSkeleton />
      </Flex>
      <InputFieldSkeleton />
      <InputRadioSkeleton count={2} />
      <Divider />
      <Skeleton w={150} h={25} />
      <Skeleton h={60} />
      <Flex gap={16} align="stretch" direction={isMobile ? "column" : "row"}>
        <InputFieldSkeleton />
        <InputFieldSkeleton />
      </Flex>
      <ButtonGroupSkeleton count={2} />
    </Stack>
  );
};

export default UserModalSkeleton;
