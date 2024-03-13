import {
  Container,
  Flex,
  Input,
  Select,
  Center,
  SegmentedControl,
  Box,
} from "@mantine/core";
import {
  IconLayoutGrid,
  IconListDetails,
  IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";
import GymModal from "../ui/modal/gym-modal/gym-modal";
import { GymCard } from "../ui/card/gym-card/gym-card";

export default function GymTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [gymCards, setGymCards] = useState([
    {
      title: "Morrison GYM",
      subtitle: "10 usuarios",
      description: "Se creo el Lunes 12 de Julio",
    },
    {
      title: "Karol GYM",
      subtitle: "32 usuarios",
      description: "Se creo el Martes 13 de Julio",
    },
    {
      title: "Tatin GYM",
      subtitle: "12 usuarios",
      description: "Se creo el Miercoles 14 de Julio",
    },
    {
      title: "GYM Morrison",
      subtitle: "20 usuarios",
      description: "Se creo el Jueves 15 de Julio",
    },
  ]);
  const [originalGymCards] = useState([...gymCards]);
  const [viewMode, setViewMode] = useState("preview");
  const [sortOption, setSortOption] = useState(""); // Estado para almacenar la opción de orden seleccionada

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
    setGymCards(filteredGymCards);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
  };

  const handleViewModeChange = (value: string) => {
    setViewMode(value);
  };

  const handleSortOptionChange = (value: string) => {
    setSortOption(value);
    let sortedGymCards = [...gymCards];
    if (value === GYM.TITLE) {
      sortedGymCards.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (value === GYM.SUBTITLE) {
      sortedGymCards.sort((a, b) => (a.subtitle > b.subtitle ? 1 : -1));
    } else if (value === GYM.DESCRIPTION) {
      sortedGymCards.sort((a, b) => (a.description > b.description ? 1 : -1));
    }
    setGymCards(sortedGymCards);
  };

  enum GYM {
    TITLE = "Nombre del Gimnasio",
    SUBTITLE = "Usuarios",
    DESCRIPTION = "Fecha de Creación",
  }

  return (
    <Container mt={50} style={{ maxWidth: "100%" }}>
      <Flex w="100%">
        <Flex align="center" gap={10} w="100%">
          <Input
            placeholder="Buscar Clientes o Gimnasios..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            w={720}
            leftSection={<IconSearch size={16} />}
          />

          <Select
            data={[GYM.TITLE, GYM.SUBTITLE, GYM.DESCRIPTION]}
            searchable
            placeholder="Ordenar por..."
            value={sortOption}
            onChange={handleSortOptionChange}
          />

          <SegmentedControl
            data={[
              {
                value: "preview",
                label: (
                  <Center>
                    <IconLayoutGrid size={24} />
                  </Center>
                ),
              },
              {
                value: "code",
                label: (
                  <Center>
                    <IconListDetails size={24} />
                  </Center>
                ),
              },
            ]}
            value={viewMode}
            onChange={handleViewModeChange}
          />
        </Flex>
        <GymModal
          opened={modalOpened}
          close={handleCloseModal}
          style={{ alignItems: "center" }}
        />
      </Flex>

      <Flex
        mt={20}
        gap={20}
        justify={viewMode === "code" ? "flex-start" : "space-between"}
        direction={viewMode === "code" ? "column" : "row"}
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
    </Container>
  );
}
