import { useGyms, useUniqueGym } from "@/hooks/gyms";
import { useUniqueUser, useUsers } from "@/hooks/users";
import { Stack, Title, Text } from "@mantine/core";

const Hooks = () => {
  const { users, isLoading } = useUsers();
  const { users: usersButAdmins, isLoading: isLoadingUsersButAdmins } =
    useUsers({ but: "admins" });
  const { user: userById, isLoading: isLoadingUserById } = useUniqueUser({
    id: "4vgzp3idzi3opcc",
  });
  const { user: userByEmail, isLoading: isLoadingUserByEmail } = useUniqueUser({
    email: "nabiedma@gmail.com",
  });

  const { gyms, isLoading: isLoadingGyms } = useGyms();
  const { gym: gymById, isLoading: isLoadingGymById } =
    useUniqueGym("213213213");

  if (
    isLoading ||
    isLoadingUsersButAdmins ||
    isLoadingUserById ||
    isLoadingUserByEmail ||
    isLoadingGyms ||
    isLoadingGymById
  )
    return <>loading</>;
  return (
    <>
      <Title>Hooks</Title>
      <Stack>
        <Text fw={600}>Users Hooks</Text>
        <p>{JSON.stringify(users)}</p>
        <p>{JSON.stringify(usersButAdmins)}</p>
        <p>{JSON.stringify(userById)}</p>
        <p>{JSON.stringify(userByEmail)}</p>
      </Stack>
      <Stack fw={600}>
        <Text>Gyms Hooks</Text>
        <p>{JSON.stringify(gyms)}</p>
        <p>{JSON.stringify(gymById)}</p>
      </Stack>
    </>
  );
};

export default Hooks;
