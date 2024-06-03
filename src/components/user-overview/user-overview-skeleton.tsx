import { Box, Group, Skeleton, Stack, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { OverviewTabSkeleton } from "./overview-tab/overview-tab-skeleton";

export const UserOverviewSkeleton = () => {
  return (
    <Stack gap={0}>
      <Group h={42} gap={32} wrap="nowrap" style={{ overflowX: "hidden" }}>
        {Array.from({ length: 6 }).map((_item, i) => (
          <Skeleton key={`tab-item-${i}`} h={14} miw={100} w={100} />
        ))}
      </Group>
      <UserOverviewHeaderSkeleton />
      <OverviewTabSkeleton />
    </Stack>
  );
};

const UserOverviewHeaderSkeleton = () => {
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(`(max-width: ${em(800)})`);

  return (
    <Box mih={120} py={32}>
      {isMobileMD ? (
        <Stack>
          <Group align="center" justify="space-between" gap={8}>
            <Skeleton h={42} w={180} />
            {isMobileSM ? (
              <Skeleton h={36} w={36} />
            ) : (
              <Skeleton h={36} w={168} />
            )}
          </Group>
          <Group grow justify={isMobileSM ? "flex-start" : "flex-end"}>
            <Skeleton h={20} maw={200} />
          </Group>
        </Stack>
      ) : (
        <Group justify="space-between" align="center">
          <Skeleton h={42} w={250} />
          <Group gap={16}>
            <Skeleton h={20} w={250} />
            <Skeleton h={36} w={168} />
          </Group>
        </Group>
      )}
    </Box>
  );
};
