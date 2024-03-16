import { Button, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

const UserOverviewEmpty = () => {
  const theme = useMantineTheme();
  const { push } = useRouter();
  return (
    <Stack
      justify="center"
      align="center"
      gap={48}
      h="100%"
      flex={"1 0 0"}
      style={{ border: `2px dashed ${theme.colors.gray[7]}`, borderRadius: 12 }}
    >
      <Stack gap={8} justify="center" align="center">
        <Title order={1} c="gray.5">
          Sin usuarios asignados
        </Title>
        <Text c="gray.0" maw={500} ta="center">
          Actualmente no hay usuarios asignados a este gimnasio. Para comenzar a
          registrar clientes y administrar sus datos, por favor, haz clic en el
          botón "Agregar Usuario" a continuación.
        </Text>
      </Stack>
      <Button
        leftSection={<IconPlus size={14} />}
        c="black"
        onClick={() => push("/admin?tab=users)")}
      >
        Agregar Usuario
      </Button>
    </Stack>
  );
};

export default UserOverviewEmpty;
