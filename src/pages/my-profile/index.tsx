import AnalysisTab from "@/components/user-overview/analysis-tab/analysis-tab";
import OverviewTab from "@/components/user-overview/overview-tab/overview-tab";
import ReportTab from "@/components/user-overview/report-tab/report-tab";
import ResourcesTab from "@/components/user-overview/resources-tab/resources-tab";
import UserOverviewEmpty from "@/components/user-overview/user-overview-empty";
import UserOverviewHeader from "@/components/user-overview/user-overview-header";
import { UserOverviewSkeleton } from "@/components/user-overview/user-overview-skeleton";
import { useCalculateEvolution, useUniqueLastMeasure } from "@/hooks/measurements";
import { useUniqueUser } from "@/hooks/users";
import { validateRequest } from "@/lib/auth";
import { User } from "@/types/user";
import { User as LuciaUser } from "lucia";
import { withRootLayout } from "@/utils/layouts";
import { Badge, Group, Stack, Tabs, Tooltip } from "@mantine/core";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { NextPageWithLayout } from "../_app";

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<
	GetServerSidePropsResult<{
		sessionUser: User;
	}>
> {
  console.log(context.req.cookies);
	const { user } = await validateRequest(context.req, context.res);
	console.log(user);
	if (!user) {
		return {
			redirect: {
				permanent: false,
				destination: "/login"
			}
		};
	}
	return {
		props: {
			sessionUser: user
		}
	} as any;
}

const UserOverview: NextPageWithLayout<{ sessionUser: LuciaUser }> = ({ sessionUser }) => {

  const { user, isLoading } = useUniqueUser({ id: sessionUser.id as string });
  const { lastMeasure, isLoading: isLoadingLastMeasure } = useUniqueLastMeasure(sessionUser.id as string);
  const { evolution, isLoading: isLoadingEvolution } = useCalculateEvolution(
    sessionUser.id as string
  );

  if (sessionUser.id === "undefined") return <UserOverviewEmpty />;
  if (isLoading || isLoadingLastMeasure || isLoadingEvolution) return <UserOverviewSkeleton />;
  return (
    <Stack gap={16} style={{ flexGrow: 1 }}>
      {/* TAB LIST */}
      <Tabs defaultValue="overview" keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tooltip
            label={"El análisis estará disponible una vez que tenga más de 1 medida cargada en el sistema"}
            multiline
            withArrow
            disabled={evolution}
          >
            <Tabs.Tab value="analysis" disabled={!lastMeasure || !evolution}>Análisis</Tabs.Tab>
          </Tooltip>
          <Tabs.Tab value="report" disabled={!lastMeasure}>Diagnóstico</Tabs.Tab>
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
          <Tabs.Tab value="resources">Beneficios</Tabs.Tab>
        </Tabs.List>

        {/* USER HEADER */}
        <UserOverviewHeader user={user} sessionUser={user} />

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
