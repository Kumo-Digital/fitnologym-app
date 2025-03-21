import SearchBar from "@/components/searchbar/searchbar";
import { UserCard } from "@/components/ui/card/user-card/user-card";
import { useGyms } from "@/hooks/gyms";
import { useUsers } from "@/hooks/users";
import { Button, Container, Group, SimpleGrid, Stack, em } from "@mantine/core";
import { useState } from "react";
import UsersTabSkeleton from "./users-tab-skeleton";
import { IconPlus } from "@tabler/icons-react";
import NewUserModal from "./new-user-modal";
import { parseDate } from "@/utils/utils";
import { modals } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import Empty from "@/components/ui/empty/empty";

const sortOptions = [
  { value: "fullname", label: "Nombre" },
  { value: "gym", label: "Gimnasio" },
  { value: "date", label: "Fecha de Creación" },
];

const UsersTab = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  const { users, isLoading, refetch } = useUsers({ but: "admins" });
  const { gyms, isLoading: isLoadingGyms } = useGyms();
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortInput, setSortInput] = useState<string>("date");

  const newUserModal = () =>
    modals.open({
      title: "Agregar Nuevo Usuario",
      centered: true,
      children: (
        <NewUserModal gyms={gyms} close={modals.closeAll} refetch={refetch} />
      ),
    });

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const handleSort = (value: string) => {
    setSortInput(value);
  };

  const filteredUsers = users
    ?.filter((user) => {
      const regex = new RegExp(searchInput, "i");
      const gym = gyms?.find((gym) => gym.id === user.gym_id) || { name: "" };
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
    <Container size={1024} h="100%">
      <Stack gap={24} h="90%">
        <Group gap={16} align="flex-start">
          <SearchBar
            searchValue={searchInput}
            sortValue={sortInput}
            sortOptions={sortOptions}
            handleSearch={handleSearch}
            handleSort={handleSort}
            searchPlaceholder="Buscar Usuarios..."
          />
          <Button
            onClick={() => newUserModal()}
            size="sm"
            variant="filled"
            c="black"
            rightSection={<IconPlus size={14} />}
            w={150}
            flex={isMobile ? "1 0 0" : "0 0 auto"}
          >
            Agregar
          </Button>
        </Group>
        {filteredUsers.length === 0 && (
          <Empty
            title="No se encontraron usuarios"
            description="Intenta con otro término de búsqueda, o agrega un nuevo usuario."
          />
        )}
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={24}
          verticalSpacing={24}
        >
          {filteredUsers.map((user) => {
            const userGym = gyms.find((gym) => gym.id === user.gym_id);
            const userDate = parseDate(user.createdAt);
            return (
              <UserCard
                key={user._id}
                userId={user._id}
                title={user.fullname}
                subtitle={userGym?.name || "Sin Asignar"}
                description={`Se unió el ${userDate}`}
                link={`/${userGym!.id}/${user._id}`}
                refetch={refetch}
              />
            );
          })}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default UsersTab;
