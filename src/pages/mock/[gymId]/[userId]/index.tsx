import { useUsers } from "@/hooks/mock";
import { Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";

const UserDetails = () => {
  const { query } = useRouter();

  const { users, isLoading } = useUsers();

  const user = users?.find(
    (user: any) => user.id === parseInt(query.userId as string)
  );

  if (isLoading) return <>loading</>;
  return (
    <Stack>
      <Text>{JSON.stringify(user)}</Text>
    </Stack>
  );
};

export default UserDetails;
