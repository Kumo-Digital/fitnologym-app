import { validateRequest } from "@/lib/auth";
import { useRouter } from "next/router";

import { Stack, Tabs } from "@mantine/core";
import type { User } from "lucia";
import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType
} from "next";
import type { FormEvent } from "react";
import { withRootLayout } from "@/utils/layouts";
import { NextPageWithLayout } from "../_app";

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<
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
				destination: "/login"
			}
		};
	}
	if (user.role !== 'administrator') {
		console.log('NO PUEDES ESTAR AQUI!!!');
		return {
			redirect: {
				permanent: false,
				destination: "/"
			}
		};
	}
	return {
		props: {
			user
		}
	};
}

const Page: NextPageWithLayout<{ user: User }> = ({ user }) => {
  const router = useRouter();

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formElement = e.target as HTMLFormElement;
		await fetch(formElement.action, {
			method: formElement.method
		});
		router.push("/login");
	}

  return (
    <>
      <h1>Esto es una página SOLO para Administración!</h1>
      <p>Your user ID is {user.id}.</p>
      <p>
        Si estás aquí es porque eres un usuario de rol ADMINISTRADOR. Eres:{" "}
        {user.role}.
      </p>
      <form method="post" action="./api/v1/auth/logout" onSubmit={onSubmit}>
        <button>Sign out</button>
      </form>

      <Stack gap={16} style={{ flexGrow: 1 }} mt={25}>
        {/* TAB LIST */}
        <Tabs defaultValue="clients">
          <Tabs.List>
            <Tabs.Tab value="clients">Clientes</Tabs.Tab>
            <Tabs.Tab value="gyms">Gimnasios</Tabs.Tab>
            <Tabs.Tab value="measurements">Mediciones</Tabs.Tab>
          </Tabs.List>

          {/* CLIENTES */}
          <Tabs.Panel value="clients">
            <div>CLIENTES</div>
          </Tabs.Panel>
          {/* GIMNASIOS */}
          <Tabs.Panel value="gyms">
            <div>GIMNASIOS</div>
          </Tabs.Panel>
          {/* MEDICIONES */}
          <Tabs.Panel value="measurements">
            <div>MEDICCIONES</div>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </>
  );
}
