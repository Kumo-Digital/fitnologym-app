import { Button, Container, Group, SimpleGrid, Stack } from "@mantine/core";
import { useState } from "react";
import SearchBar from "../../searchbar/searchbar";
import { GymCard } from "../../ui/card/gym-card/gym-card";
import GymModal from "./gym-modal";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useGyms } from "@/hooks/gyms";
import GymTabSkeleton from "./gym-tab-skeleton";
import { modals } from "@mantine/modals";

const sortOptions = [
  { value: "date", label: "Fecha" },
  { value: "name", label: "Nombre" },
  { value: "city", label: "Ciudad" },
  { value: "address", label: "Dirección" },
];

export default function GymTab() {
  const { gyms, isLoading, refetch } = useGyms();

  const [searchInput, setSearchInput] = useState<string>("");
  const [sortInput, setSortInput] = useState<string>("date");

  const [opened, { open, close }] = useDisclosure(false);

  const gymModal = () =>
    modals.open({
      title: "Agregar Gimnasio",
      centered: true,
      children: <GymModal close={modals.closeAll} refetch={refetch} />,
    });

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  const handleSort = (value: string) => {
    setSortInput(value);
  };

  const filteredGyms = gyms
    ?.filter((gym: any) => {
      const regex = new RegExp(searchInput, "i");
      const valuesToTest = [gym.name, gym.city, gym.address];
      return valuesToTest.some((value) => regex.test(value));
    })
    .sort((a: any, b: any) => {
      if (sortInput === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortInput === "city") {
        return a.city.localeCompare(b.city);
      }
      if (sortInput === "address") {
        return a.address.localeCompare(b.address);
      }
      if (sortInput === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  if (isLoading) return <GymTabSkeleton />;
  return (
    <Container size={1024}>
      <Stack mt={24}>
        <Group gap={16}>
          <SearchBar
            searchValue={searchInput}
            sortValue={sortInput}
            sortOptions={sortOptions}
            handleSearch={handleSearch}
            handleSort={handleSort}
          />
          <Button
            onClick={() => gymModal()}
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
          {filteredGyms.map((gym: any) => (
            <GymCard
              key={gym.id}
              gymId={gym.id}
              title={gym.name}
              subtitle={gym.city}
              description={gym.address}
              refetch={refetch}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
