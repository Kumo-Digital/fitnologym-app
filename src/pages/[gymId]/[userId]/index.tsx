import AnalysisTab from "@/components/user-overview/analysis-tab/analysis-tab";
import OverviewTab from "@/components/user-overview/overview-tab/overview-tab";
import ReportTab from "@/components/user-overview/report-tab/report-tab";
import ResourcesTab from "@/components/user-overview/resources-tab/resources-tab";
import UserOverviewEmpty from "@/components/user-overview/user-overview-empty";
import UserOverviewHeader from "@/components/user-overview/user-overview-header";
import { UserOverviewSkeleton } from "@/components/user-overview/user-overview-skeleton";
import { useUniqueUser } from "@/hooks/users";
import { validateRequest } from "@/lib/auth";
import { User } from "@/types/user";
import { withRootLayout } from "@/utils/layouts";
import { Badge, Group, Stack, Tabs } from "@mantine/core";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";

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

const UserOverview = ({sessionUser}: {sessionUser: User}) => {
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
        <UserOverviewHeader user={user} sessionUser={sessionUser} />

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
