import { useUsers } from "@/hooks/users";
import { Container, SimpleGrid, Skeleton, Stack } from "@mantine/core";
import { useState } from "react";

const sortOptions = [
  { value: "fullname", label: "Nombre" },
  { value: "gym", label: "Gimnasio" },
  { value: "date", label: "Fecha de Creación" },
];

const UsersTab = () => {
  const { users, isLoading } = useUsers({ but: "admins" });
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortInput, setSortInput] = useState<string>("date");

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  const handleSort = (value: string) => {
    setSortInput(value);
  };

  // filter and sort users based on search and sort input
  const filteredUsers = users
    ?.filter((user) => {
      const regex = new RegExp(searchInput, "i");
      return regex.test(user.fullname);
    })
    .sort((a, b) => {
      if (sortInput === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortInput === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

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
