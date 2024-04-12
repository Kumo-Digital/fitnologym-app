import React from "react";
import {
  Card,
  Text,
  Group,
  Stack,
  ActionIcon,
  useMantineTheme,
  Menu,
  rem,
} from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { until } from "@open-draft/until";
import EditGymModal from "@/components/admin/gym-tab/edit-gym-modal";
import { deleteGym } from "@/services/gyms";
import { notifications } from "@mantine/notifications";

interface GymCardProps {
  title: string;
  subtitle: string;
  description: string;
  gymId: string;
  refetch: () => void;
  color?: string;
}

export const GymCard: React.FC<GymCardProps> = ({
  title,
  subtitle,
  description,
  refetch,
  gymId,
}) => {
  const theme = useMantineTheme();

  return (
    <Card bg="dark.7" radius="md" withBorder p={0}>
      <Stack p={12} gap={12}>
        <Group gap={8} align="center" wrap="nowrap">
          <Stack
            style={{
              flexGrow: 1,
            }}
            gap={0}
          >
            <Text size="md" c="gray.0" lineClamp={1}>
              {title}
            </Text>
            <Text size="sm" c="gray.5">
              {subtitle}
            </Text>
          </Stack>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon
                title="Ver Gimnasio"
                variant="subtle"
                onClick={() => {}}
              >
                <IconDotsVertical
                  color={theme.colors.gray[6]}
                  aria-label="Options"
                  size={16}
                />
              </ActionIcon>
            </Menu.Target>
            <GymMenuDropdown gymId={gymId} refetch={refetch} />
          </Menu>
        </Group>
        <Text size="xs" c="gray.5">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};

export const GymMenuDropdown = ({
  gymId,
  refetch,
}: {
  gymId: string;
  refetch: () => void;
}) => {
  const gymEditModal = () =>
    modals.open({
      title: "Editar Gimnasio",
      centered: true,
      children: (
        <EditGymModal gymId={gymId} refetch={refetch} close={modals.closeAll} />
      ),
    });

  const gymDeleteModal = () =>
    modals.openConfirmModal({
      title: "Eliminar Gimnasio",
      labels: { confirm: "Eliminar", cancel: "Cancel" },
      confirmProps: { color: "red" },
      centered: true,
      children: (
        <Text size="sm">
          Estás seguro que quieres borrar este gimnasio? Esta acción no tiene
          recuperación.
        </Text>
      ),
      onConfirm: async () => {
        const { error } = await until(() => deleteGym(gymId));

        if (error)
          notifications.show({
            title: "Eliminar Usuario",
            message:
              "Hubo un error borrando el usuario, por favor intente de nuevo.",
            color: "red",
          });

        refetch();
      },
      onCancel: () => modals.closeAll(),
    });
  return (
    <Menu.Dropdown>
      <Menu.Item
        leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
        onClick={() => gymEditModal()}
      >
        Editar Gimnasio
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        color="red"
        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        onClick={() => gymDeleteModal()}
      >
        Borrar Gimnasio
      </Menu.Item>
    </Menu.Dropdown>
  );
};
