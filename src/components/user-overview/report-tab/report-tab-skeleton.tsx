import { Container, Skeleton, Stack } from "@mantine/core";

const ReportTabSkeleton = () => {
  return (
    <Container size={1024} mt={24}>
      <Stack gap={24}>
        <Skeleton height={36} radius="sm" />
        <Skeleton height={500} radius="sm" />
      </Stack>
    </Container>
  );
};

export default ReportTabSkeleton;
