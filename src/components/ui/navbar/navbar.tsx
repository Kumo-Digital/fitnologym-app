import { Group, em } from "@mantine/core";
import { NavLinks } from "./navlinks/navlinks";
import { FitnologymBreadcrumb } from "./breadcrumb/fitnologym-breadcrumb";
import { useMediaQuery } from "@mantine/hooks";

export const Navbar = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(1024)})`);

  return (
    <nav style={{ height: "64px" }}>
      <Group justify="space-between" gap={16} h="100%" grow>
        <FitnologymBreadcrumb />
        {!isMobile && <NavLinks />}
      </Group>
    </nav>
  );
};
