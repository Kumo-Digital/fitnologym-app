import { validateRequest } from "@/lib/auth";
import { useRouter } from "next/router";

import GymTab from "@/components/admin/gym-tab/gym-tab";
import { withRootLayout } from "@/utils/layouts";
import { Stack, Tabs } from "@mantine/core";
import type { User } from "lucia";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { FormEvent } from "react";
import { NextPageWithLayout } from "../_app";
import UsersTab from "@/components/admin/users-tab/users-tab";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    user: User;
  }>
> {
  console.log(context.req.cookies);
  const { user } = await validateRequest(context.req, context.res);
  console.log(user);
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
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    await fetch(formElement.action, {
      method: formElement.method,
    });
    router.push("/login");
  }

  return (
    <Stack gap={24} style={{ flexGrow: 1 }}>
      <Tabs defaultValue="users">
        <Tabs.List mb={24}>
          <Tabs.Tab value="users">Usuarios</Tabs.Tab>
          <Tabs.Tab value="gyms">Gimnasios</Tabs.Tab>
          <Tabs.Tab value="measurements">Mediciones</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users">
          <UsersTab />
        </Tabs.Panel>
        <Tabs.Panel value="gyms">
          <GymTab />
        </Tabs.Panel>
        <Tabs.Panel value="measurements">
          <div>MEDICIONES</div>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

withRootLayout(Page);
export default Page;
