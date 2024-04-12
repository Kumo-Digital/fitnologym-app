import AnalysisTab from "@/components/user-overview/analysis-tab/analysis-tab";
import OverviewTab from "@/components/user-overview/overview-tab/overview-tab";
import ReportTab from "@/components/user-overview/report-tab/report-tab";
import ResourcesTab from "@/components/user-overview/resources-tab/resources-tab";
import UserOverviewEmpty from "@/components/user-overview/user-overview-empty";
import UserOverviewHeader from "@/components/user-overview/user-overview-header";
import { UserOverviewSkeleton } from "@/components/user-overview/user-overview-skeleton";
import {
  useCalculateEvolution,
  useUniqueLastMeasure,
} from "@/hooks/measurements";
import { useUniqueUser } from "@/hooks/users";
import { validateRequest } from "@/lib/auth";
import { User } from "@/types/user";
import { withRootLayout } from "@/utils/layouts";
import { Badge, Group, Stack, Tabs, Tooltip } from "@mantine/core";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    sessionUser: User;
  }>
> {
  const { user } = await validateRequest(context.req, context.res);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  if (user.role !== "administrator") {
    return {
      redirect: {
        permanent: false,
        destination: "/my-profile",
      },
    };
  }
  return {
    props: {
      sessionUser: JSON.parse(JSON.stringify(user)),
    },
  } as any;
}

const UserOverview = ({ sessionUser }: { sessionUser: User }) => {
  const { query } = useRouter();
  const { user, isLoading } = useUniqueUser({ id: query.userId as string });
  const { lastMeasure, isLoading: isLoadingLastMeasure } = useUniqueLastMeasure(
    query.userId as string
  );
  const { evolution, isLoading: isLoadingEvolution } = useCalculateEvolution(
    query.userId as string
  );

  if (query.userId === "undefined") return <UserOverviewEmpty />;
  if (isLoading || isLoadingLastMeasure || isLoadingEvolution)
    return <UserOverviewSkeleton />;
  return (
    <Stack gap={16} flex={"1 0 0"}>
      {/* TAB LIST */}
      <Tabs
        defaultValue="overview"
        keepMounted={false}
        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Tabs.List
          style={{
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tooltip
            label={
              "El análisis estará disponible una vez que tenga más de 1 medida cargada en el sistema"
            }
            multiline
            withArrow
            disabled={evolution}
          >
            <Tabs.Tab value="analysis" disabled={!lastMeasure || !evolution}>
              Análisis
            </Tabs.Tab>
          </Tooltip>
          <Tabs.Tab value="report" disabled={!lastMeasure}>
            Diagnóstico
          </Tabs.Tab>
          <Tabs.Tab value="exercise-plan" disabled>
            <Group align="center" gap={8} wrap="nowrap">
              Mi Rutina
              <Badge variant="outline" color="lime">
                Plus
              </Badge>
            </Group>
          </Tabs.Tab>
          <Tabs.Tab value="diet-plan" disabled>
            <Group align="center" gap={8} wrap="nowrap">
              Plan Nutricional
              <Badge variant="outline" color="lime">
                Premium
              </Badge>
            </Group>
          </Tabs.Tab>
          <Tabs.Tab value="resources">Beneficios</Tabs.Tab>
        </Tabs.List>

        {/* USER HEADER */}
        <UserOverviewHeader user={user} sessionUser={sessionUser} />

        {/* PANELS */}
        <Tabs.Panel
          value="overview"
          style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <OverviewTab user={user} />
        </Tabs.Panel>
        <Tabs.Panel value="analysis">
          <AnalysisTab />
        </Tabs.Panel>
        <Tabs.Panel value="report" h="90%">
          <ReportTab user={user} />
        </Tabs.Panel>
        <Tabs.Panel value="resources" h="90%">
          <ResourcesTab />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

withRootLayout(UserOverview);

export default UserOverview;
