import {
  ActionIcon,
  Avatar,
  Breadcrumbs,
  Combobox,
  Group,
  ScrollArea,
  Text,
  em,
  useCombobox,
} from "@mantine/core";
import type { ComboboxStore, UseComboboxOptions } from "@mantine/core";
import { FitnologymBreadcrumbSkeleton } from "./fitnologym-breadcrum-skeleton";
import { IconSelector } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUsers } from "@/hooks/users";
import { useGyms } from "@/hooks/gyms";
import { useMediaQuery } from "@mantine/hooks";
import { getFirstName, parseNameToInitials } from "@/utils/utils";

interface BreadcrumbsItem {
  title: string;
  href?: string;
  icon?: string;
  action?: string | null;
  isVisible?: boolean;
}

export const FitnologymBreadcrumb = () => {
  const { push, query } = useRouter();
  const isMobileSM = useMediaQuery(`(max-width: ${em(425)})`);
  const isMobileMD = useMediaQuery(`(max-width: ${em(768)})`);
  const { users, isLoading: isLoadingUsers } = useUsers({ but: "admins" });
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
      ?.filter((user: any) => user.gym_id === query.gymId)
      .filter((user: any) =>
        user.fullname.toLowerCase().includes(userSearch.toLowerCase().trim())
      )
      .map((user: any) => (
        <Combobox.Option value={user._id} key={`${user.fullname}-${user.id}`}>
          <Text py={8}>{user.fullname}</Text>
        </Combobox.Option>
      )) || [];

  const breadcrumbItems: BreadcrumbsItem[] = [
    {
      title: "Fitnologym",
      href: "/",
      icon: "💪",
      action: null,
      isVisible: !isMobileMD,
    },
    ...(query?.gymId
      ? [
          {
            title:
              gyms?.find((gym: any) => gym.id === query.gymId)?.name ||
              "Gimnasio",
            action: "menu-gyms",
            isVisible: true,
          },
        ]
      : []),
    ...(query?.gymId && query?.userId
      ? [
          {
            title:
              users?.find((user: any) => user._id === query.userId)?.fullname ||
              "Sin Usuarios",
            href: `/${query.gymId}/${query.userId}`,
            action: "menu-users",
            isVisible: true,
          },
        ]
      : []),
  ];

  const breadcrumbLinks = breadcrumbItems.map((item, index) => (
    <Group gap={8} key={`${item.title}-${index}`} wrap="nowrap">
      {item.icon && (
        <Link
          href={"/"}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Avatar
            src={"/assets/images/logo/svg/logo-brand.svg"}
            size={20}
            variant="transparent"
            radius="sm"
          />
        </Link>
      )}
      {item.isVisible ? (
        item.href ? (
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
              {isMobileSM ? getFirstName(item.title) : item.title}
            </Text>
          </Link>
        ) : (
          <Text
            size={index === 0 ? "xl" : "md"}
            c="gray.0"
            fw={index === 0 ? 600 : 400}
          >
            {item.action === "menu-gyms" && isMobileSM
              ? parseNameToInitials(item.title)
              : item.title}
          </Text>
        )
      ) : (
        <></>
      )}
      {item.action && (
        <Combobox
          store={item.action === "menu-gyms" ? gymsCombobox : usersCombobox}
          width={250}
          position="bottom-end"
          withArrow
          withinPortal={false}
          onOptionSubmit={(val) => {
            if (item.action === "menu-gyms") {
              setSelectedGym(val);
              gymsCombobox.closeDropdown();
              gymsCombobox.closeDropdown();

              const firstGymUser =
                users?.find((user: any) => user.gym_id === val) || "";

              if (firstGymUser === "") {
                push(`/${val}/undefined`);
              }

              if (firstGymUser) {
                push(`/${val}/${firstGymUser._id}`);
              }
            }
            if (item.action === "menu-users") {
              setSelectedUser(val);
              usersCombobox.closeDropdown();
              usersCombobox.closeDropdown();

              push(`/${query.gymId}/${val}`);
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
