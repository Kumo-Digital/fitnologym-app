import React from "react";
import {
  Card,
  ActionIcon,
  Text,
  Group,
  Stack,
  useMantineTheme,
  Menu,
  rem,
  em,
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { modals } from "@mantine/modals";
import { deleteUser } from "@/services/users";
import { until } from "@open-draft/until";
import { notifications } from "@mantine/notifications";
import EditUserModal from "@/components/admin/users-tab/edit-user-modal";
import { useMediaQuery } from "@mantine/hooks";

interface UserCardProps {
  title: string;
  subtitle: string;
  description: string;
  color?: string;
  userId: string;
  link?: string;
  refetch: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  title,
  subtitle,
  description,
  userId,
  link,
  refetch,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${em(475)})`);

  return (
    <Card bg="dark.7" radius="md" p={0} withBorder>
      <Stack p={12} gap={12}>
        <Group gap={8} align="flex-start" wrap="nowrap">
          <Stack
            style={{
              flexGrow: 1,
            }}
            gap={0}
          >
            <Link href={link as string} style={{ textDecoration: "none" }}>
              <Group gap={4} wrap="nowrap" align="flex-start">
                <Text size="md" c="gray.0" lineClamp={1}>
                  {title}
                </Text>
                <IconArrowUpRight color={theme.colors.gray[5]} size={14} />
              </Group>
            </Link>
            <Text size="sm" c="gray.5">
              {subtitle}
            </Text>
          </Stack>
          {link && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon title="Ver Usuario" variant="subtle">
                  <IconDotsVertical
                    color={theme.colors.gray[6]}
                    aria-label="Options"
                    size={16}
                  />
                </ActionIcon>
              </Menu.Target>
              <UserMenuDropdown userId={userId} refetch={refetch} />
            </Menu>
          )}
        </Group>
        <Text size="xs" c="gray.5">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};

export const UserMenuDropdown = ({
  userId,
  refetch,
}: {
  userId: string;
  refetch: () => void;
}) => {
  const userEditModal = () =>
    modals.open({
      title: "Editar Usuario",
      centered: true,
      children: (
        <EditUserModal
          userId={userId}
          refetch={refetch}
          close={modals.closeAll}
        />
      ),
    });

  const userDeleteModal = () =>
    modals.openConfirmModal({
      title: "Eliminar Usuario",
      labels: { confirm: "Eliminar", cancel: "Cancel" },
      confirmProps: { color: "red" },
      centered: true,
      children: (
        <Text size="sm">
          Estás seguro que quieres borrar este usuario? Esta acción no tiene
          recuperación.
        </Text>
      ),
      onConfirm: async () => {
        const { error } = await until(() => deleteUser(userId));

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
        onClick={() => userEditModal()}
      >
        Editar Usuario
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item
        color="red"
        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        onClick={() => userDeleteModal()}
      >
        Borrar Usuario
      </Menu.Item>
    </Menu.Dropdown>
  );
};
