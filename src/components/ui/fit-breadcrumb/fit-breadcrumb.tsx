import {
  ActionIcon,
  Anchor,
  Avatar,
  Breadcrumbs,
  Group,
  Text,
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";

export const FitBreadcrumb = () => {
  const items = [
    { title: "Fitnologym", icon: "💪", href: "#", action: null },
    { title: "ENBOX Fitness", href: "#", action: "menu-gyms" },
    { title: "LeanBeefPatty", href: "#", action: "menu-users" },
  ].map((item, index) => (
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

  return (
    <Breadcrumbs separatorMargin="md" mt="xs">
      {items}
    </Breadcrumbs>
  );
};
