import { Container, Group, SimpleGrid, Skeleton, Stack } from "@mantine/core";

const UsersTabSkeleton = () => {
  return (
    <Container size={1024}>
      <Stack gap={24}>
        <Group gap={16}>
          <Skeleton h={36} flex={"1 0 0"} />
          <Skeleton h={36} w={200} />
        </Group>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={24}
          verticalSpacing={24}
        >
          <Skeleton h={96} />
          <Skeleton h={96} />
          <Skeleton h={96} />
          <Skeleton h={96} />
          <Skeleton h={96} />
          <Skeleton h={96} />
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default UsersTabSkeleton;
