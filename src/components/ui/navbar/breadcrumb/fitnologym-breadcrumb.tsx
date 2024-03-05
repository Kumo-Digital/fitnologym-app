import { useGyms, useUsers } from "@/hooks/mock";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Breadcrumbs,
  Combobox,
  Group,
  ScrollArea,
  Text,
  useCombobox,
} from "@mantine/core";
import type { ComboboxStore, UseComboboxOptions } from "@mantine/core";
import { FitnologymBreadcrumbSkeleton } from "./fitnologym-breadcrum-skeleton";
import { IconSelector } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface BreadcrumbsItem {
  title: string;
  href?: string;
  icon?: string;
  action?: string | null;
}

export const FitnologymBreadcrumb = () => {
  const { push, query } = useRouter();
  const { users, isLoading: isLoadingUsers } = useUsers();
  const { gyms, isLoading: isLoadingGyms } = useGyms();

  // GYMS COMBOBOX
  const [gymSearch, setGymSearch] = useState("");
  const [_selectedGym, setSelectedGym] = useState<string | null>(null);
  const gymsCombobox: ComboboxStore = useCombobox({
    onDropdownClose: () => {
      gymsCombobox.resetSelectedOption();
      gymsCombobox.focusTarget();
      setGymSearch("");
    },

    onDropdownOpen: () => {
      gymsCombobox.focusSearchInput();
    },
  } as UseComboboxOptions);

  const gymComboboxMenu =
    gyms
      ?.filter((gym: any) =>
        gym.name.toLowerCase().includes(gymSearch.toLowerCase().trim())
      )
      .map((gym: any) => (
        <Combobox.Option value={gym.id} key={`${gym.name}-${gym.id}`}>
          <Text py={8}>{gym.name}</Text>
        </Combobox.Option>
      )) || [];

  // USERS COMBOBOX
  const [userSearch, setUserSearch] = useState("");
  const [_selectedUser, setSelectedUser] = useState<string | null>(null);
  const usersCombobox: ComboboxStore = useCombobox({
    onDropdownClose: () => {
      usersCombobox.resetSelectedOption();
      usersCombobox.focusTarget();
      setUserSearch("");
    },

    onDropdownOpen: () => {
      usersCombobox.focusSearchInput();
    },
  } as UseComboboxOptions);

  const usersComboboxMenu =
    users
      ?.filter((user: any) => user.gym_id === parseInt(query.gymId as string))
      .filter((user: any) =>
        user.fullname.toLowerCase().includes(userSearch.toLowerCase().trim())
      )
      .map((user: any) => (
        <Combobox.Option value={user.id} key={`${user.fullname}-${user.id}`}>
          <Text py={8}>{user.fullname}</Text>
        </Combobox.Option>
      )) || [];

  const breadcrumbItems: BreadcrumbsItem[] = [
    {
      title: "Fitnologym",
      href: "/",
      icon: "💪",
      action: null,
    },
    ...(query?.gymId
      ? [
          {
            title:
              gyms?.find(
                (gym: any) => gym.id === parseInt(query.gymId as string)
              )?.name || "Gimnasio",
            // href: `/${query.gymId}/${query.userId}`,
            action: "menu-gyms",
          },
        ]
      : []),
    ...(query?.gymId && query?.userId
      ? [
          {
            title:
              users?.find(
                (user: any) => user.id === parseInt(query.userId as string)
              )?.fullname || "Usuario",
            href: `/${query.gymId}/${query.userId}`,
            action: "menu-users",
          },
        ]
      : []),
  ];

  const breadcrumbLinks = breadcrumbItems.map((item, index) => (
    <Group gap={8} key={`${item.title}-${index}`}>
      {item.icon && (
        <Avatar variant="transparent" radius="sm">
          {item.icon}
        </Avatar>
      )}
      {item.href ? (
        <Link
          href={item.href}
          key={`${item.title}-${index}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Text
            size={index === 0 ? "xl" : "md"}
            c="gray.0"
            fw={index === 0 ? 600 : 400}
          >
            {item.title}
          </Text>
        </Link>
      ) : (
        <Text
          size={index === 0 ? "xl" : "md"}
          c="gray.0"
          fw={index === 0 ? 600 : 400}
        >
          {item.title}
        </Text>
      )}
      {item.action && (
        <Combobox
          store={item.action === "menu-gyms" ? gymsCombobox : usersCombobox}
          width={250}
          position="bottom-start"
          withArrow
          withinPortal={false}
          onOptionSubmit={(val) => {
            if (item.action === "menu-gyms") {
              setSelectedGym(val);
              gymsCombobox.closeDropdown();
              gymsCombobox.closeDropdown();

              const firstGymUser =
                users?.find((user: any) => user.gym_id === parseInt(val)) || 0;

              push(`/mock/${val}/${firstGymUser.id}`);
            }
            if (item.action === "menu-users") {
              setSelectedUser(val);
              usersCombobox.closeDropdown();
              usersCombobox.closeDropdown();

              push(`/mock/${query.gymId}/${val}`);
            }
          }}
        >
          <Combobox.Target withAriaAttributes={false}>
            <ActionIcon
              variant="subtle"
              aria-label="Menu"
              c="gray.6"
              onClick={() => {
                if (item.action === "menu-gyms") gymsCombobox.toggleDropdown();
                if (item.action === "menu-users")
                  usersCombobox.toggleDropdown();
              }}
            >
              <IconSelector />
            </ActionIcon>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Search
              value={item.action === "menu-gyms" ? gymSearch : userSearch}
              onChange={(event) => {
                if (item.action === "menu-gyms")
                  setGymSearch(event.currentTarget.value);

                if (item.action === "menu-users")
                  setUserSearch(event.currentTarget.value);
              }}
              placeholder="Filtrar por búsqueda"
            />
            <Combobox.Options>
              <ScrollArea.Autosize type="scroll" mah={200}>
                {item.action === "menu-gyms" ? (
                  gymComboboxMenu.length > 0 ? (
                    gymComboboxMenu
                  ) : (
                    <Combobox.Empty>No se encontraron gimnasios</Combobox.Empty>
                  )
                ) : usersComboboxMenu.length > 0 ? (
                  usersComboboxMenu
                ) : (
                  <Combobox.Empty>No se encontraron usuarios</Combobox.Empty>
                )}
              </ScrollArea.Autosize>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      )}
    </Group>
  ));

  if (isLoadingUsers || isLoadingGyms) return <FitnologymBreadcrumbSkeleton />;
  return (
    <Breadcrumbs separator={<Text size="xl">/</Text>} separatorMargin="sm">
      {breadcrumbLinks}
    </Breadcrumbs>
  );
};
