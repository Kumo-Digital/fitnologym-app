import GymTab from "@/components/admin/gym-tab/gym-tab";
import { Stack, Tabs } from "@mantine/core";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { useRouter } from "next/router";
import { FormEvent } from "react";

export default function Page({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
    <>
      <h1>Esto es una página SOLO para Administración!</h1>
      <p>Your user ID is .</p>
      <p>
        Si estás aquí es porque eres un usuario de rol ADMINISTRADOR. Eres:{" "}
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
            <GymTab />
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
