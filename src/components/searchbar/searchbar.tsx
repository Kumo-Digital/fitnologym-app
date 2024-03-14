import React from "react";
import { Flex, Input, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar({
  searchQuery,
  handleSearchInputChange,
  sortOption,
  handleSortOptionChange,
  data,
}: any) {
  return (
    <Flex align="center" gap={18} w="100%">
      <Input
        placeholder="Buscar Clientes o Gimnasios..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        w="100%"
        max="100%"
        leftSection={<IconSearch size={16} />}
      />

      <Select
        data={data}
        searchable
        max="100%"
        w="25%"
        placeholder="Ordenar por..."
        value={sortOption}
        onChange={handleSortOptionChange}
      />
    </Flex>
  );
}
