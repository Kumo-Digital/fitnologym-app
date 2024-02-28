import { Group } from "@mantine/core";
import { FitnologymBreadcrumbSkeleton } from "./breadcrumb/fitnologym-breadcrum-skeleton";
import { NavLinks } from "./navlinks/navlinks";

export const Navbar = () => {
  return (
    <nav style={{ height: "64px" }}>
      <Group justify="space-between" gap={16} h="100%">
        <FitnologymBreadcrumbSkeleton />
        <NavLinks />
      </Group>
    </nav>
  );
};
