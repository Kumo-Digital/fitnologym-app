import { Stack, Text, Title, useMantineTheme } from "@mantine/core";

const OverviewTabEmpty = () => {
  const theme = useMantineTheme();

  return (
    <Stack
      justify="center"
      align="center"
      gap={48}
      h="60vh"
      flex={"1 0 0"}
      style={{ border: `2px dashed ${theme.colors.gray[7]}`, borderRadius: 12 }}
      mt={24}
    >
      <Stack gap={8} justify="center" align="center" p={8}>
        <Title order={1} c="gray.5" ta="center">
          Aún no hay medidas cargadas
        </Title>
        <Text c="gray.0" maw={500} ta="center">
          Actualmente no existe una medida en el sistema para este usuario.
        </Text>
      </Stack>
    </Stack>
  );
};

export default OverviewTabEmpty;
