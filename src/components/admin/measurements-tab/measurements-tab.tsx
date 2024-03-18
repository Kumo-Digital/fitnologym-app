import SearchBar from "@/components/searchbar/searchbar";
import { useGyms } from "@/hooks/gyms";
import { useMeasurements } from "@/hooks/measurements";
import { useUsers } from "@/hooks/users";
import { Measurement } from "@/types/measurements";
import { parseDate } from "@/utils/utils";
import {
  Button,
  Container,
  Group,
  Skeleton,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconClipboardList, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import MeasurementTabSkeleton from "./measurement-tab-skeleton";
import { useRouter } from "next/router";
import { appUrls } from "@/lib/appUrls";

// TODO: update users and gyms types -- already being worked on another branch
const getRows = (measurements: Measurement[], users: any, gyms: any) =>
  measurements.map((measure, index) => {
    const user = users?.find((user: any) => user._id === measure.user_id);
    const gym = gyms?.find((gym: any) => gym.id === user.gym_id);

    return (
      <Table.Tr key={`${measure.date}-${index}`}>
        <Table.Td>
          <IconClipboardList color="gray" />
        </Table.Td>
        <Table.Td>
          <Text size="sm" c="gray.0">
            {user.fullname}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" c="gray.0">
            {gym.name}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" c="gray.0">
            {parseDate(measure.date)}
          </Text>
        </Table.Td>
        <Table.Td>
          <Link href={`/admin/measurements/edit/${measure._id}`}>
            <Text c="lime.5" fw={600} size="sm">
              Editar
            </Text>
          </Link>
        </Table.Td>
      </Table.Tr>
    );
  });

const sortOptions = [
  { value: "name", label: "Nombre de Usuario" },
  { value: "gym", label: "Gimnasio" },
  { value: "date", label: "Fecha de Medición" },
];

const MeasurementsTab = () => {
  const { push } = useRouter();
  const { users, isLoading } = useUsers({ but: "admins" });
  const { gyms, isLoading: isLoadingGyms } = useGyms();
  const { measurements, isLoading: isLoadingMeasurements } = useMeasurements();

  const [searchInput, setSearchInput] = useState<string>("");
  const [sortInput, setSortInput] = useState<string>("date");

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  const handleSort = (value: string) => {
    setSortInput(value);
  };

  const filteredMeasurements = measurements
    ?.filter((measure) => {
      const regex = new RegExp(searchInput, "i");
      const user = users.find((user: any) => user._id === measure.user_id);
      const gym = gyms.find((gym: any) => gym.id === user.gym_id);

      const valuesToTest = [user.fullname, gym.name, parseDate(measure.date)];
      return valuesToTest.some((value) => regex.test(value));
    })
    .sort((a: any, b: any) => {
      if (sortInput === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortInput === "gym") {
        return a.gym.localeCompare(b.gym);
      }
      if (sortInput === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  if (isLoading || isLoadingGyms || isLoadingMeasurements)
    return <MeasurementTabSkeleton />;
  return (
    <Container size={1024}>
      <Stack gap={24}>
        <Group gap={16}>
          <SearchBar
            searchValue={searchInput}
            sortValue={sortInput}
            sortOptions={sortOptions}
            handleSearch={handleSearch}
            handleSort={handleSort}
            searchPlaceholder="Buscar Mediciones..."
          />
          <Button
            onClick={() => push(appUrls.measurements.new)}
            size="sm"
            variant="filled"
            c="black"
            rightSection={<IconPlus size={14} />}
            w={150}
          >
            Agregar
          </Button>
        </Group>
        <Table.ScrollContainer minWidth={768}>
          <Table verticalSpacing="lg" highlightOnHover stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Gimnasio</Table.Th>
                <Table.Th>Fecha de Medición</Table.Th>
                <Table.Th>Acción</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {getRows(filteredMeasurements, users, gyms)}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Stack>
    </Container>
  );
};

export default MeasurementsTab;
