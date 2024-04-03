import { validateRequest } from "@/lib/auth";
import { useRouter } from "next/router";

import GymTab from "@/components/admin/gym-tab/gym-tab";
import { withRootLayout } from "@/utils/layouts";
import { Stack, Tabs, em } from "@mantine/core";
import type { User } from "lucia";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { FormEvent } from "react";
import { NextPageWithLayout } from "../_app";
import MeasurementsTab from "@/components/admin/measurements-tab/measurements-tab";
import UsersTab from "@/components/admin/users-tab/users-tab";
import { IconBarbell, IconRuler, IconUsers } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    user: User;
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
    console.log("NO PUEDES ESTAR AQUI!!!");
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      user,
    },
  };
}

const Page: NextPageWithLayout<{ user: User }> = ({ user }) => {
  const isMobile = useMediaQuery(`(max-width: ${em(475)})`);

  return (
    <Stack gap={24} flex={"1 0 0"}>
      <Tabs defaultValue="users" flex={"1 0 0"}>
        <Tabs.List mb={24} grow={isMobile ? true : false}>
          <Tabs.Tab value="users" leftSection={isMobile ? <IconUsers /> : null}>
            {isMobile ? "" : "Usuarios"}
          </Tabs.Tab>
          <Tabs.Tab
            value="gyms"
            leftSection={isMobile ? <IconBarbell /> : null}
          >
            {isMobile ? "" : "Gimnasios"}
          </Tabs.Tab>
          <Tabs.Tab
            value="measurements"
            leftSection={isMobile ? <IconRuler /> : null}
          >
            {isMobile ? "" : "Mediciones"}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users" h="100%">
          <UsersTab />
        </Tabs.Panel>
        <Tabs.Panel value="gyms" h="100%">
          <GymTab />
        </Tabs.Panel>
        <Tabs.Panel value="measurements" h="100%">
          <MeasurementsTab />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

withRootLayout(Page);
export default Page;
