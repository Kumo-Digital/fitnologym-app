import { withRootLayout } from '@/utils/layouts';
import { Text, Paper, Title, Divider, useMantineTheme } from '@mantine/core';
import Link from "next/link";
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

const ContactPage: NextPageWithLayout<{ user: User }> = ({ user }) => {
    const { push } = useRouter();
    const theme = useMantineTheme();

    return (
      <>
        <Head>
          <title>Fitnologym App | Contacto</title>
        </Head>
        <Paper shadow="xs" p="md">
          <Title tt="uppercase" order={1} mb={4} c={theme.colors.lime[5]}>Contacto</Title>
          <Divider my="md" />
          <Text mb={16}>¿Tenés alguna inquietud, duda, sugerencia o consulta? Podés ponerte en contacto con nosotros enviándonos un e-mail a <Link title="Enviar e-mail a contacto@fitnologym.com.ar" href="mailto:contacto@fitnologym.com.ar"><Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text></Link> o contactándonos en nuestro Instagram.</Text>
        </Paper>
      </>
    );
}

withRootLayout(ContactPage);

export default ContactPage;