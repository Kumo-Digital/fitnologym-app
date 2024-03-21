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
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconArrowsLeftRight,
  IconChevronRight,
  IconDotsVertical,
  IconEdit,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { appUrls } from "@/lib/appUrls";

interface UserCardProps {
  title: string;
  subtitle: string;
  description: string;
  color?: string;
  link?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  title,
  subtitle,
  description,
  link,
}) => {
  const theme = useMantineTheme();
  const { push } = useRouter();

  return (
    <Card bg="dark.7" radius="md" p={0} withBorder>
      <Stack p={12} gap={12}>
        <Group gap={8} align="flex-start">
          <Stack
            style={{
              flexGrow: 1,
            }}
            gap={0}
          >
            <Link href={link as string} style={{ textDecoration: "none" }}>
              <Group gap={4}>
                <Text size="md" c="gray.0">
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
              <UserMenuDropdown />
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

export const UserMenuDropdown = () => {
  return (
    <Menu.Dropdown>
      <Menu.Item
        leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
      >
        Editar Usuario
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item
        color="red"
        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
      >
        Borrar Usuario
      </Menu.Item>
    </Menu.Dropdown>
  );
};
