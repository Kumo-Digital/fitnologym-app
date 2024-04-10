import { InputFieldSkeleton } from "@/components/ui/loading-skeletons/input-fields";
import { Flex, Group, Skeleton, Stack, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

const MeasurementFormSkeleton = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)}`);

  return (
    <Stack>
      <Flex direction={isMobile ? "column" : "row" } h={120} align="center" justify="space-between">
        <Skeleton w={130} h={44} />
      </Flex>
      <Stack mb={32}>
        <Flex direction={isMobile ? "column" : "row" } align="start" gap={24}>
          <Stack>
            <Flex direction={isMobile ? "column" : "row" } wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Flex>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 3 }).map((_, index) => (
              <InputFieldSkeleton
                key={`field-${Math.random() * (index + 1)}`}
              />
            ))}
          </Stack>
        </Flex>
      </Stack>
      <Stack mb={32}>
        <Flex direction={isMobile ? "column" : "row" } align="start" gap={24}>
          <Stack>
            <Flex direction={isMobile ? "column" : "row" } wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Flex>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 11 }).map((_, index) => (
              <Flex direction={isMobile ? "column" : "row" } gap={16} key={`field-${Math.random() * (index + 1)}`}>
                <InputFieldSkeleton />
                <InputFieldSkeleton />
              </Flex>
            ))}
          </Stack>
        </Flex>
      </Stack>
      <Stack mb={32}>
        <Flex direction={isMobile ? "column" : "row" } align="start" gap={24}>
          <Stack>
            <Flex direction={isMobile ? "column" : "row" } wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Flex>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 6 }).map((_, index) => (
              <Flex direction={isMobile ? "column" : "row" } gap={16} key={`field-${Math.random() * (index + 1)}`}>
                <InputFieldSkeleton />
                <InputFieldSkeleton />
              </Flex>
            ))}
          </Stack>
        </Flex>
      </Stack>
      <Stack mb={32}>
        <Flex direction={isMobile ? "column" : "row" } align="start" gap={24}>
          <Stack>
            <Flex direction={isMobile ? "column" : "row" } wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Flex>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 6 }).map((_, index) => (
              <Flex direction={isMobile ? "column" : "row" } gap={16} key={`field-${Math.random() * (index + 1)}`}>
                <InputFieldSkeleton />
                <InputFieldSkeleton />
              </Flex>
            ))}
          </Stack>
        </Flex>
      </Stack>
      <Stack mb={32}>
        <Flex direction={isMobile ? "column" : "row" } align="start" gap={24}>
          <Stack>
            <Flex direction={isMobile ? "column" : "row" } wrap="nowrap">
              <Skeleton w={65} h={26} />
            </Flex>
            <Skeleton h={80} />
          </Stack>
          <Stack>
            {Array.from({ length: 9 }).map((_, index) => (
              <Flex direction={isMobile ? "column" : "row" } gap={16} key={`field-${Math.random() * (index + 1)}`}>
                <InputFieldSkeleton />
                <InputFieldSkeleton />
              </Flex>
            ))}
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default MeasurementFormSkeleton;
