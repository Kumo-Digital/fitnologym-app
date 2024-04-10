import { InputFieldSkeleton } from "@/components/ui/loading-skeletons/input-fields";
import { Group, Skeleton, Stack } from "@mantine/core";
import React from "react";

const MeasurementFormSkeleton = () => {
  return (
    <Stack>
      <Group h={120} align="center" justify="space-between">
        <Skeleton w={130} h={44} />
      </Group>
      <Stack mb={32}>
        <Group grow align="start" gap={24}>
          <Stack>
            <Group wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Group>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 3 }).map((_, index) => (
              <InputFieldSkeleton
                key={`field-${Math.random() * (index + 1)}`}
              />
            ))}
          </Stack>
        </Group>
      </Stack>
      <Stack mb={32}>
        <Group grow align="start" gap={24}>
          <Stack>
            <Group wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Group>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 11 }).map((_, index) => (
              <Group gap={16} grow key={`field-${Math.random() * (index + 1)}`}>
                <InputFieldSkeleton />
                <InputFieldSkeleton />
              </Group>
            ))}
          </Stack>
        </Group>
      </Stack>
      <Stack mb={32}>
        <Group grow align="start" gap={24}>
          <Stack>
            <Group wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Group>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 6 }).map((_, index) => (
              <Group gap={16} grow key={`field-${Math.random() * (index + 1)}`}>
                <InputFieldSkeleton />
                <InputFieldSkeleton />
              </Group>
            ))}
          </Stack>
        </Group>
      </Stack>
      <Stack mb={32}>
        <Group grow align="start" gap={24}>
          <Stack>
            <Group wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Group>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 6 }).map((_, index) => (
              <Group gap={16} grow key={`field-${Math.random() * (index + 1)}`}>
                <InputFieldSkeleton />
                <InputFieldSkeleton />
              </Group>
            ))}
          </Stack>
        </Group>
      </Stack>
      <Stack mb={32}>
        <Group grow align="start" gap={24}>
          <Stack>
            <Group wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Group>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 9 }).map((_, index) => (
              <Group gap={16} grow key={`field-${Math.random() * (index + 1)}`}>
                <InputFieldSkeleton />
                <InputFieldSkeleton />
              </Group>
            ))}
          </Stack>
        </Group>
      </Stack>
    </Stack>
  );
};

export default MeasurementFormSkeleton;
