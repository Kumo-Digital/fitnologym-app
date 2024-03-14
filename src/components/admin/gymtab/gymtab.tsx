import { Box, Button, Flex, Stack } from "@mantine/core";
import { useState } from "react";
import SearchBar from "../../searchbar/searchbar";
import { GymCard } from "../../ui/card/gym-card/gym-card";
import GymModal from "./gym-modal";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

export default function GymTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [gymCards, setGymCards] = useState([
    {
      title: "Morrison GYM",
      subtitle: "Tucumán",
      description: "Dalmiro 1240",
    },
    {
      title: "Karol GYM",
      subtitle: "Yerba Buena",
      description: "San Martín 142",
    },
    {
      title: "Tatin GYM",
      subtitle: "Concepción",
      description: "Urliziega 1230",
    },
    {
      title: "GYM Morrison",
      subtitle: "Tafi Viejo",
      description: "Av. SiempreViva 1234",
    },
  ]);
  const data = ["Nombre del Gimnasio", "Usuarios", "Fecha de Creación"];
  const [originalGymCards] = useState([...gymCards]);
  const [sortOption, setSortOption] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const handleSearchInputChange = (event: any) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const regex = new RegExp(
      query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "i"
    );

    const filteredGymCards = originalGymCards.filter(
      (card) =>
        regex.test(card.title) ||
        regex.test(card.subtitle) ||
        regex.test(card.description)
    );

    setGymCards(filteredGymCards.length > 0 ? filteredGymCards : []);
  };

  const handleSortOptionChange = (value: string) => {
    setSortOption(value);
    let sortedGymCards = [...gymCards];
    if (value === "Nombre del Gimnasio") {
      sortedGymCards.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (value === "Usuarios") {
      sortedGymCards.sort((a, b) => (a.subtitle > b.subtitle ? 1 : -1));
    } else if (value === "Fecha de Creación") {
      sortedGymCards.sort((a, b) => (a.description > b.description ? 1 : -1));
    }
    setGymCards(sortedGymCards);
  };

  return (
    <>
      <Stack mt={120} p={20}>
        <Flex gap={20} justify="space-between">
          <SearchBar
            searchQuery={searchQuery}
            handleSearchInputChange={handleSearchInputChange}
            sortOption={sortOption}
            handleSortOptionChange={handleSortOptionChange}
            data={data}
          />
          <Button
            onClick={open}
            size="sm"
            variant="filled"
            c="black"
            rightSection={<IconPlus size={15} />}
            w={150}
          >
            Agregar
          </Button>
        </Flex>

        {gymCards.length > 0 ? (
          <Flex
            mt={20}
            gap={20}
            style={{
              maxWidth: "100%",
            }}
          >
            {gymCards.map((card, index) => (
              <GymCard
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
              />
            ))}
          </Flex>
        ) : (
          <p>No se encontraron coincidencias</p>
        )}
      </Stack>

      <GymModal opened={opened} close={close} />
    </>
  );
}
