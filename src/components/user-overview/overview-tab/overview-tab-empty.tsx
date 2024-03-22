import { Button, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

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
    >
      <Stack gap={8} justify="center" align="center">
        <Title order={1} c="gray.5">
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
