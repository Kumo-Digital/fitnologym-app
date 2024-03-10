import OverviewTab from "@/components/user-overview/overview-tab/overview-tab";
import { useUniqueUser } from "@/hooks/users";
import {
  Badge,
  Group,
  Stack,
  Text,
  Tabs,
  Title,
  Button,
  Divider,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

const UserOverview = () => {
  const { query } = useRouter();
  const { user, isLoading } = useUniqueUser({ id: query.userId as string });

  if (isLoading) return <div>Loading...</div>;
  return (
    <Stack gap={16} style={{ flexGrow: 1 }}>
      {/* TAB LIST */}
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="analysis">Análisis</Tabs.Tab>
          <Tabs.Tab value="report">Diagnóstico</Tabs.Tab>
          <Tabs.Tab value="exercise-plan" disabled>
            <Group align="center" gap={8}>
              Mi Rutina
              <Badge variant="outline" color="lime">
                Plus
              </Badge>
            </Group>
          </Tabs.Tab>
          <Tabs.Tab value="diet-plan" disabled>
            <Group align="center" gap={8}>
              Plan Nutricional
              <Badge variant="outline" color="lime">
                Premium
              </Badge>
            </Group>
          </Tabs.Tab>
        </Tabs.List>

        {/* USER HEADER */}
        <Stack gap={0}>
          <Group justify="space-between" h={120}>
            <Title order={1} size={32} c="gray.0">
              JohnDoe
            </Title>
            <Group>
              <Text size="sm" c="gray.5">
                La última medición fue realizada hoy
              </Text>

              <Button c="black" leftSection={<IconPlus />}>
                Nueva Medición
              </Button>
            </Group>
          </Group>
          <Divider size="sm" />
        </Stack>

        {/* PANELS */}
        <Tabs.Panel value="overview">
          <OverviewTab user={user} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default UserOverview;
