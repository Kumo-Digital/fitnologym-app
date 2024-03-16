import SearchBar from "@/components/searchbar/searchbar";
import { UserCard } from "@/components/ui/card/user-card/user-card";
import { useGyms } from "@/hooks/gyms";
import { useUsers } from "@/hooks/users";
import { Container, SimpleGrid, Skeleton, Stack } from "@mantine/core";
import { useState } from "react";
import UsersTabSkeleton from "./users-tab-skeleton";

const sortOptions = [
  { value: "fullname", label: "Nombre" },
  { value: "gym", label: "Gimnasio" },
  { value: "date", label: "Fecha de Creación" },
];

const UsersTab = () => {
  const { users, isLoading } = useUsers({ but: "admins" });
  const { gyms, isLoading: isLoadingGyms } = useGyms();
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortInput, setSortInput] = useState<string>("date");

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  const handleSort = (value: string) => {
    setSortInput(value);
  };

  const filteredUsers = users
    ?.filter((user) => {
      const regex = new RegExp(searchInput, "i");
      return regex.test(user.fullname);
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
    <Container size={1024}>
      <Stack gap={24}>
        <SearchBar
          searchValue={searchInput}
          sortValue={sortInput}
          sortOptions={sortOptions}
          handleSearch={handleSearch}
          handleSort={handleSort}
          searchPlaceholder="Buscar Usuarios..."
        />
        <SimpleGrid cols={3} spacing={24} verticalSpacing={24}>
          {filteredUsers.map((user) => {
            const userGym = gyms.find((gym: any) => gym.id === user.gym_id);
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
                link={`${userGym!.id}/${user._id}`}
              />
            );
          })}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default UsersTab;
