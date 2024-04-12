import {
  Flex,
  Input,
  MultiSelect,
  Center,
  SegmentedControl,
} from "@mantine/core";
import { IconLayoutGrid, IconListDetails } from "@tabler/icons-react";
import { useState } from "react";

export default function SearchBar({ handleSearch }: any) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <Flex align="center" gap={10}>
      <Input
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />

      <MultiSelect
        data={["Nombre del Gimnasio", "Ciudad", "Dirección"]}
        placeholder="Ordernar por..."
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
      />
    </Flex>
  );
}
