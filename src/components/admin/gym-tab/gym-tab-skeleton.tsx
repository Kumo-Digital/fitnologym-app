import {
  Container,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const GymTabSkeleton = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);

  return (
    <Container size={1024}>
      <Stack gap={24}>
        <Group gap={16}>
          <Skeleton h={36} flex={"1 0 0"} />
          <Skeleton h={36} w={200} />
          <Skeleton h={36} miw={150} />
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

export default GymTabSkeleton;
