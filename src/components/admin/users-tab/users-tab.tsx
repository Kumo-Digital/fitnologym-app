import SearchBar from "@/components/searchbar/searchbar";
import { UserCard } from "@/components/ui/card/user-card/user-card";
import { useGyms } from "@/hooks/gyms";
import { useUsers } from "@/hooks/users";
import {
  Button,
  Container,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import UsersTabSkeleton from "./users-tab-skeleton";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import NewUserModal from "./new-user-modal";

const sortOptions = [
  { value: "fullname", label: "Nombre" },
  { value: "gym", label: "Gimnasio" },
  { value: "date", label: "Fecha de Creación" },
];

const UsersTab = () => {
  const { users, isLoading, refetch } = useUsers({ but: "admins" });
  const { gyms, isLoading: isLoadingGyms } = useGyms();
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortInput, setSortInput] = useState<string>("date");
  const [opened, { open, close }] = useDisclosure(false);

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const handleSort = (value: string) => {
    setSortInput(value);
  };

  const filteredUsers = users
    ?.filter((user) => {
      const regex = new RegExp(searchInput, "i");
      const gym = gyms.find((gym) => gym.id === user.gym_id) || { name: "" };
      const valuesToTest = [user.fullname, user.email, gym.name];

      return valuesToTest.some((value) => regex.test(value));
    })
    .sort((a: any, b: any) => {
      if (sortInput === "fullname") {
        return a.fullname.localeCompare(b.fullname);
      }
      if (sortInput === "gym") {
        return a.fullname.localeCompare(b.fullname);
      }
      if (sortInput === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  if (isLoading || isLoadingGyms) return <UsersTabSkeleton />;
  return (
    <>
      <Container size={1024}>
        <Stack gap={24}>
          <Group gap={16}>
            <SearchBar
              searchValue={searchInput}
              sortValue={sortInput}
              sortOptions={sortOptions}
              handleSearch={handleSearch}
              handleSort={handleSort}
              searchPlaceholder="Buscar Usuarios..."
            />
            <Button
              onClick={open}
              size="sm"
              variant="filled"
              c="black"
              rightSection={<IconPlus size={14} />}
              w={150}
            >
              Agregar
            </Button>
          </Group>
          <SimpleGrid cols={3} spacing={24} verticalSpacing={24}>
            {filteredUsers.map((user) => {
              const userGym = gyms.find((gym) => gym.id === user.gym_id);
              const userDate = new Date(user.createdAt).toLocaleDateString(
                "es-AR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );
              return (
                <UserCard
                  key={user._id}
                  title={user.fullname}
                  subtitle={userGym?.name || "Sin Asignar"}
                  description={`Se unió el ${userDate}`}
                  // link={`${userGym!.id}/${user._id}`}
                />
              );
            })}
          </SimpleGrid>
        </Stack>
      </Container>

      <NewUserModal
        isOpen={opened}
        close={close}
        gyms={gyms}
        refetch={refetch}
      />
    </>
  );
};

export default UsersTab;
