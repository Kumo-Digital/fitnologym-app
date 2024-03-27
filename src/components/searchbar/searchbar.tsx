import React from "react";
import { Group, Select, TextInput, em } from "@mantine/core";
import { IconSearch, IconSortDescending } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

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
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);

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
        flex={1}
        // maw={isMobile ? "100%" : 200}
        allowDeselect={false}
        leftSectionPointerEvents="none"
        leftSection={<IconSortDescending size={16} />}
        placeholder={isMobile ? "" : "Ordenar por..."}
        value={sortValue}
        onChange={handleSort}
      />
    </Group>
  );
}
