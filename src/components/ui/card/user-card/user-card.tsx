import React from "react";
import {
  Card,
  ActionIcon,
  Text,
  Group,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronRight, IconDotsVertical } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Link from "next/link";

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
        <Group gap={8} align="center">
          <Stack
            style={{
              flexGrow: 1,
            }}
            gap={0}
          >
            <Link href={"#"}>
              <Text size="md" c="gray.0">
                {title}
              </Text>
            </Link>
            <Text size="sm" c="gray.5">
              {subtitle}
            </Text>
          </Stack>
          {link && (
            <ActionIcon
              title="Ver Usuario"
              variant="subtle"
              onClick={() => push(link)}
            >
              <IconChevronRight
                color={theme.colors.gray[6]}
                aria-label="Options"
                size={16}
              />
            </ActionIcon>
          )}
        </Group>
        <Text size="xs" c="gray.5">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};
