import { useGyms, useUsers } from "@/hooks/mock";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Breadcrumbs,
  Group,
  Text,
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";
import { FitnologymBreadcrumbSkeleton } from "../navbar/breadcrumb/fitnologym-breadcrum-skeleton";
import { useState } from "react";

export const FitBreadcrumb = () => {
  const { users, isLoading: isLoadingUsers } = useUsers();
  const { gyms, isLoading: isLoadingGyms } = useGyms();
  const [items, setItems] = useState([
    { title: "Fitnologym", icon: "💪", href: "#", action: null },
    { title: "ENBOX Fitness", href: "#", action: "menu-gyms" },
    { title: "LeanBeefPatty", href: "#", action: "menu-users" },
  ]);

  const breadCrumbLinks = items.map((item, index) => (
    <Group>
      {item.icon && <Avatar>{item.icon}</Avatar>}
      <Anchor href={item.href} key={index}>
        <Text
          c="gray.0"
          size={index === 0 ? "xl" : "md"}
          fw={index === 0 ? 600 : 400}
        >
          {item.title}
        </Text>
      </Anchor>
      {item.action === "menu-gyms" && (
        <ActionIcon variant="subtle" c="gray.5" size="sm">
          <IconSelector />
        </ActionIcon>
      )}
      {item.action === "menu-users" && (
        <ActionIcon variant="subtle" c="gray.5" size="sm">
          <IconSelector />
        </ActionIcon>
      )}
    </Group>
  ));

  if (isLoadingUsers || isLoadingGyms) return <FitnologymBreadcrumbSkeleton />;
  return (
    <Breadcrumbs separatorMargin="md" mt="xs">
      {breadCrumbLinks}
    </Breadcrumbs>
  );
};
