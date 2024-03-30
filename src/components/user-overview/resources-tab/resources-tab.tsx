import SearchBar from "@/components/searchbar/searchbar";
import { userResources } from "@/utils/resources";
import {
  Button,
  Card,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  alpha,
  em,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const sortOptions = [
  { value: "category", label: "Categoria" },
  { value: "title", label: "Titulo" },
];

const ResourcesTab = () => {
  const theme = useMantineTheme();
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(`(max-width: ${em(768)})`);
  const getThemeColor = (cssVariable: string) => {
    const [color, shade] = cssVariable.split("-");
    return theme.colors[color][parseInt(shade)];
  };

  const [searchInput, setSearchInput] = useState<string>("");
  const [sortInput, setSortInput] = useState<string>("title");
  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  const handleSort = (value: string) => {
    setSortInput(value);
  };

  const filteredResources = userResources
    ?.filter((resource) => {
      const regex = new RegExp(searchInput, "i");
      const valuesToTest = [resource.title, resource.category];

      return valuesToTest.some((value) => regex.test(value));
    })
    .sort((a: any, b: any) => {
      if (sortInput === "category") {
        return a.category.localeCompare(b.category);
      }
      if (sortInput === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const dietCategory = filteredResources.filter(
    (resource) => resource.category === "diet"
  );
  const exerciseCategory = filteredResources.filter(
    (resource) => resource.category === "exercise"
  );

  return (
    <Stack gap={24} mt={24}>
      <SearchBar
        searchValue={searchInput}
        sortValue={sortInput}
        sortOptions={sortOptions}
        handleSearch={handleSearch}
        handleSort={handleSort}
        searchPlaceholder="Buscaar recursos gratuitos . . ."
      />
      <Stack gap={32}>
        {dietCategory.length > 0 && (
          <Stack gap={16}>
            <Text size="xl" fw={500}>
              Nutrición
            </Text>
            <SimpleGrid
              cols={isMobileSM ? 1 : isMobileMD ? 2 : 3}
              spacing={24}
              verticalSpacing={24}
            >
              {dietCategory.map((resource) => {
                const Icon: any = resource.icon;

                return (
                  <Card withBorder key={resource.id}>
                    <Stack style={{ flexGrow: 1 }}>
                      <Group gap={8}>
                        <Flex
                          w={48}
                          h={48}
                          bg={alpha(
                            `var(--mantine-color-${resource.color})`,
                            0.2
                          )}
                          justify="center"
                          align="center"
                          style={{ borderRadius: 8 }}
                        >
                          <Icon
                            size={32}
                            color={getThemeColor(resource.color)}
                          />
                        </Flex>
                        <Text size="xl" fw={600} c="gray.0" maw={200} lh={1.3}>
                          {resource.title}
                        </Text>
                      </Group>
                      <Stack h="100%" style={{ flexGrow: 1 }}>
                        {resource.description.map((line, index) => (
                          <Text size="sm" c="gray.5" key={`${line}-${index}`}>
                            {line}
                          </Text>
                        ))}
                      </Stack>
                      <Link
                        href={resource.resource_link}
                        target="_blank"
                        rel="noreferrer"
                        passHref
                      >
                        <Button
                          c="black"
                          fullWidth
                          rightSection={<IconExternalLink size={14} />}
                        >
                          Abrir
                        </Button>
                      </Link>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Stack>
        )}

        {exerciseCategory.length > 0 && (
          <Stack gap={16}>
            <Text size="xl" fw={500}>
              Ejercicios
            </Text>

            <SimpleGrid
              spacing={24}
              verticalSpacing={24}
              cols={isMobileSM ? 1 : isMobileMD ? 2 : 3}
            >
              {exerciseCategory.map((resource) => {
                const Icon: any = resource.icon;

                return (
                  <Card withBorder key={resource.id}>
                    <Stack style={{ flexGrow: 1 }}>
                      <Group gap={8}>
                        <Flex
                          w={48}
                          h={48}
                          bg={alpha(
                            `var(--mantine-color-${resource.color})`,
                            0.2
                          )}
                          justify="center"
                          align="center"
                          style={{ borderRadius: 8 }}
                        >
                          <Icon
                            size={32}
                            color={getThemeColor(resource.color)}
                          />
                        </Flex>
                        <Text size="xl" fw={600} c="gray.0" maw={200} lh={1.3}>
                          {resource.title}
                        </Text>
                      </Group>
                      <Stack h="100%" style={{ flexGrow: 1 }}>
                        {resource.description.map((line, index) => (
                          <Text size="sm" c="gray.5" key={`${line}-${index}`}>
                            {line}
                          </Text>
                        ))}
                      </Stack>
                      <Link
                        href={resource.resource_link}
                        target="_blank"
                        rel="noreferrer"
                        passHref
                      >
                        <Button
                          c="black"
                          fullWidth
                          rightSection={<IconExternalLink size={14} />}
                        >
                          Abrir
                        </Button>
                      </Link>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default ResourcesTab;
