import AnalysisTab from "@/components/user-overview/analysis-tab/analysis-tab";
import OverviewTab from "@/components/user-overview/overview-tab/overview-tab";
import ReportTab from "@/components/user-overview/report-tab/report-tab";
import ResourcesTab from "@/components/user-overview/resources-tab/resources-tab";
import UserOverviewEmpty from "@/components/user-overview/user-overview-empty";
import { UserOverviewSkeleton } from "@/components/user-overview/user-overview-skeleton";
import { useUniqueUser } from "@/hooks/users";
import { withRootLayout } from "@/utils/layouts";
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

  if (query.userId === "undefined") return <UserOverviewEmpty />;
  if (isLoading) return <UserOverviewSkeleton />;
  return (
    <Stack gap={16} style={{ flexGrow: 1 }}>
      {/* TAB LIST */}
      <Tabs defaultValue="overview" keepMounted={false}>
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
          <Tabs.Tab value="resources">Recursos</Tabs.Tab>{" "}
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
        <Tabs.Panel value="analysis">
          <AnalysisTab user={user} />
        </Tabs.Panel>
        <Tabs.Panel value="report">
          <ReportTab user={user} />
        </Tabs.Panel>
        <Tabs.Panel value="resources">
          <ResourcesTab />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

withRootLayout(UserOverview);

export default UserOverview;
