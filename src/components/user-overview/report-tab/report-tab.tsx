import SearchBar from "@/components/searchbar/searchbar";
import { useUniqueReports } from "@/hooks/reports";
import { ReportEntry } from "@/types/measurements";
import { Container, Stack, Table, Text, Anchor } from "@mantine/core";
import { IconClipboardList } from "@tabler/icons-react";
import ReportTabSkeleton from "./report-tab-skeleton";
import { useState } from "react";
import Empty from "@/components/ui/empty/empty";

const getRows = (reports: ReportEntry[]) =>
  reports.map((report, index) => (
    <Table.Tr key={`${report.name}-${index}`}>
      <Table.Td>
        <IconClipboardList color="gray" />
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="gray.0">
          {report.name}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="gray.0">
          {report.date}
        </Text>
      </Table.Td>
      <Table.Td>
        {report.report_url ? (
          <Anchor
            href={report.report_url}
            target="_blank"
            rel="noreferrer"
            size="sm"
            fw={600}
            c="lime.5"
          >
            Ver Reporte
          </Anchor>
        ) : (
          <Text size="sm" fw={600} c="gray.5">
            Sin Reporte
          </Text>
        )}
      </Table.Td>
    </Table.Tr>
  ));

const sortOptions = [
  { value: "name", label: "Nombre" },
  { value: "date", label: "Fecha de Medición" },
];

const ReportTab = ({ user }: any) => {
  const { reports, isLoading } = useUniqueReports(user._id, user.fullname);
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortInput, setSortInput] = useState<string>("date");

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  const handleSort = (value: string) => {
    setSortInput(value);
  };

  const filteredReports = reports
    ?.filter((report) => {
      const regex = new RegExp(searchInput, "i");
      return regex.test(report.name);
    })
    .sort((a, b) => {
      if (sortInput === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortInput === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  if (isLoading) return <ReportTabSkeleton />;
  return (
    <Container size={1024} mt={24}>
      <Stack gap={24}>
        <SearchBar
          searchValue={searchInput}
          sortValue={sortInput}
          sortOptions={sortOptions}
          handleSearch={handleSearch}
          handleSort={handleSort}
          searchPlaceholder="Buscar Reportes..."
        />
        {filteredReports.length === 0 ? (
          <Empty
            title="No se encontraron reportes"
            description="No se encontraron reportes con los criterios de búsqueda seleccionados"
          />
        ) : (
          <Table.ScrollContainer minWidth={768}>
            <Table verticalSpacing="lg" highlightOnHover stickyHeader>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th></Table.Th>
                  <Table.Th>Nombre</Table.Th>
                  <Table.Th>Fecha de Medición</Table.Th>
                  <Table.Th>Reporte</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{getRows(filteredReports)}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </Stack>
    </Container>
  );
};

export default ReportTab;
