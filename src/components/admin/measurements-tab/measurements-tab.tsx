import SearchBar from "@/components/searchbar/searchbar";
import { useGyms } from "@/hooks/gyms";
import { useMeasurements } from "@/hooks/measurements";
import { useUsers } from "@/hooks/users";
import { Measurement } from "@/types/measurements";
import { parseDate } from "@/utils/utils";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Menu,
  Stack,
  Table,
  Text,
  em,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconClipboardList,
  IconDotsVertical,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import MeasurementTabSkeleton from "./measurement-tab-skeleton";
import { useRouter } from "next/router";
import { appUrls } from "@/lib/appUrls";
import { useMediaQuery } from "@mantine/hooks";
import Empty from "@/components/ui/empty/empty";
import { modals } from "@mantine/modals";
import { until } from "@open-draft/until";
import { notifications } from "@mantine/notifications";
import { deleteMeasurement } from "@/services/measurements";

const getRows = (
  measurements: Measurement[],
  users: any,
  gyms: any,
  refetch?: any
) => {
  const theme = useMantineTheme();

  return measurements.map((measure, index) => {
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
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon title="Opciones de Medida" variant="subtle">
                <IconDotsVertical
                  color={theme.colors.gray[6]}
                  aria-label="Options"
                  size={16}
                />
              </ActionIcon>
            </Menu.Target>
            <MeasurementMenuDropdown
              measureId={measure._id}
              refetch={refetch}
            />
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  });
};

const MeasurementMenuDropdown = ({
  measureId,
  refetch,
}: {
  measureId: string;
  refetch: () => void;
}) => {
  const { push } = useRouter();

  const measurementDeleteModal = () =>
    modals.openConfirmModal({
      title: "Eliminar Medida",
      labels: { confirm: "Eliminar", cancel: "Cancel" },
      confirmProps: { color: "red" },
      centered: true,
      children: (
        <Text size="sm">
          Estás seguro que quieres borrar esta medida? Esta acción no tiene
          recuperación.
        </Text>
      ),
      onConfirm: async () => {
        const { error } = await until(() => deleteMeasurement(measureId));

        if (error) {
          notifications.show({
            title: "Eliminar Medida",
            message:
              "Hubo un error borrando la medida, por favor intente de nuevo.",
            color: "red",
          });
          return;
        }

        notifications.show({
          title: "Eliminar Medida",
          message: "La medida ha sido borrada exitosamente.",
          color: "green",
        });
        refetch();
      },
      onCancel: () => modals.closeAll(),
    });

  return (
    <Menu.Dropdown>
      <Menu.Item
        leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
        onClick={() => push(appUrls.measurements.edit(measureId))}
      >
        Editar Medición
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item
        color="red"
        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        onClick={() => measurementDeleteModal()}
      >
        Borrar Medida
      </Menu.Item>
    </Menu.Dropdown>
  );
};

const sortOptions = [
  { value: "name", label: "Nombre de Usuario" },
  { value: "gym", label: "Gimnasio" },
  { value: "date", label: "Fecha de Medición" },
];

const MeasurementsTab = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  const { push } = useRouter();
  const { users, isLoading } = useUsers({ but: "admins" });
  const { gyms, isLoading: isLoadingGyms } = useGyms();
  const {
    measurements,
    isLoading: isLoadingMeasurements,
    refetch,
  } = useMeasurements();

  const [searchInput, setSearchInput] = useState<string>("");
  const [sortInput, setSortInput] = useState<string>("date");

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  const handleSort = (value: string) => {
    setSortInput(value);
  };

  const filteredMeasurements = measurements
    ?.map((measure) => {
      const user = users?.find((user: any) => user._id === measure.user_id);
      const gym = gyms?.find((gym: any) => gym.id === user?.gym_id);

      return {
        ...measure,
        gym_name: gym?.name,
        user_name: user?.fullname,
      };
    })
    .filter((measure) => {
      const regex = new RegExp(searchInput, "i");

      const valuesToTest = [
        measure.gym_name,
        measure.user_name,
        parseDate(measure.date),
      ];
      return valuesToTest.some((value) => regex.test(value as string));
    })
    .sort((a: any, b: any) => {
      if (sortInput === "name") {
        return a.user_name.localeCompare(b.user_name);
      }
      if (sortInput === "gym") {
        return a.gym_name.localeCompare(b.gym_name);
      }
      if (sortInput === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  if (isLoading || isLoadingGyms || isLoadingMeasurements)
    return <MeasurementTabSkeleton />;
  return (
    <Container size={1024} h="100%">
      <Stack gap={24} h="90%">
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
            flex={isMobile ? "1 0 0" : "0 0 auto"}
          >
            Agregar
          </Button>
        </Group>
        {filteredMeasurements.length === 0 ? (
          <Empty
            title="No hay Mediciones"
            description="Parece que no hay mediciones registradas en el sistema."
          />
        ) : (
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
                {getRows(filteredMeasurements, users, gyms, refetch)}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </Stack>
    </Container>
  );
};

export default MeasurementsTab;
