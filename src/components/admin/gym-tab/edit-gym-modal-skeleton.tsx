import { InputFieldSkeleton } from "@/components/ui/loading-skeletons/input-fields";
import { Stack } from "@mantine/core";
import React from "react";

const EditGymModalSkeleton = () => {
  return (
    <Stack gap={16}>
      <InputFieldSkeleton />
      <InputFieldSkeleton />
      <InputFieldSkeleton />
    </Stack>
  );
};

export default EditGymModalSkeleton;
