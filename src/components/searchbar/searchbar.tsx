import React from "react";
import { Group, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface SearchBar {
  searchValue: string;
  sortValue: string;
  handleSearch: (event: any) => void;
  handleSort: (event: any) => void;
  searchPlaceholder?: string;
  sortOptions: string[] | { value: string; label: string }[];
}

export default function SearchBar({
  searchValue,
  sortValue,
  handleSearch,
  handleSort,
  searchPlaceholder = "Buscar Clientes o Gimnasios...",
  sortOptions,
}: SearchBar) {
  return (
    <Group gap={16} align="center" style={{ flexGrow: 1 }}>
      <TextInput
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value.toLowerCase())}
        leftSection={<IconSearch size={16} />}
        style={{ flexGrow: 1 }}
      />

      <Select
        data={sortOptions}
        searchable
        maw={200}
        allowDeselect={false}
        placeholder="Ordenar por..."
        value={sortValue}
        onChange={handleSort}
      />
    </Group>
  );
}
