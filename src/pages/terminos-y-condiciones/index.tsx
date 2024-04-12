import { withRootLayout } from '@/utils/layouts';
import { Text, Paper, Title, List, Divider, useMantineTheme } from '@mantine/core';
import { useRouter } from "next/router";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { User } from "lucia";
import { validateRequest } from "@/lib/auth";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";


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
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
}

const TermsAndConditions: NextPageWithLayout<{ user: User }> = ({ user }) => {
    const { push } = useRouter();
    const theme = useMantineTheme();

    return (
      <>
        <Head>
          <title>Fitnologym App | Términos y Condiciones</title>
        </Head>
        <Paper shadow="xs" p="md">
          <Title tt="uppercase" order={1} mb={4} c={theme.colors.lime[5]}>Términos y Condiciones</Title>
          <Title order={3}>Última actualización: 15/04/24</Title>
          <Divider my="md" />
          <Text mb={16}>Estos Términos y Condiciones rigen su uso de la aplicación <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>. Al utilizar <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>, usted acepta estos términos en su totalidad. Si no está de acuerdo con estos términos, por favor, no utilice <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>.</Text>
          <Title order={2} mb={8} tt="uppercase">Uso de la Aplicación:</Title>
          <List mb={32}>
              <List.Item>Al utilizar <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>, usted acepta cumplir con estos Términos y Condiciones, así como con todas las leyes y regulaciones aplicables.</List.Item>
              <List.Item>Usted es responsable de mantener la seguridad de su cuenta y contraseña, y de todas las actividades que ocurran bajo su cuenta.</List.Item>
          </List>
          <Title order={2} mb={8} tt="uppercase">Propiedad Intelectual:</Title>
          <Text mb={16}>Todos los contenidos incluidos en <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>, como texto, gráficos, logotipos, imágenes, videos, audio y software, son propiedad de <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text> o de sus proveedores de contenido y están protegidos por las leyes de propiedad intelectual.</Text>
          <Title order={2} mb={8} tt="uppercase">Limitación de Responsabilidad:</Title>
          <Text mb={16}><Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text> no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de utilizar <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>.</Text>
          <Title order={2} mb={8} tt="uppercase">Cambios en los Términos:</Title>
          <Text mb={8}>Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigencia inmediatamente después de su publicación en <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>. Es su responsabilidad revisar periódicamente estos Términos y Condiciones para estar al tanto de las modificaciones.</Text>
          <Text mb={16}>Si tiene alguna pregunta sobre estos Términos y Condiciones, no dude en ponerse en contacto con nosotros.</Text>
        </Paper>
      </>
    );
}

withRootLayout(TermsAndConditions);

export default TermsAndConditions;