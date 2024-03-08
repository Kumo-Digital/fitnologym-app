import { Group } from "@mantine/core";
import { NavLinks } from "./navlinks/navlinks";
import { FitnologymBreadcrumb } from "./breadcrumb/fitnologym-breadcrumb";

export const Navbar = () => {
  return (
    <nav style={{ height: "64px" }}>
      <Group justify="space-between" gap={16} h="100%">
        <FitnologymBreadcrumb />
        <NavLinks />
      </Group>
    </nav>
  );
};
