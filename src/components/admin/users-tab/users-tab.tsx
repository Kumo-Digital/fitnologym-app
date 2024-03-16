import { useUsers } from "@/hooks/users";
import { Container, SimpleGrid, Skeleton, Stack } from "@mantine/core";

const UsersTab = () => {
  const { users, isLoading } = useUsers({ but: "admins" });

  console.log("users", users);

  if (isLoading) return <p>loading ...</p>;
  return (
    <Container size={1024}>
      <Stack gap={24}>
        <Skeleton h={40} />
        <SimpleGrid cols={3} spacing={24} verticalSpacing={24}></SimpleGrid>
      </Stack>
    </Container>
  );
};

export default UsersTab;
