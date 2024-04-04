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

const PrivacyPolicy: NextPageWithLayout<{ user: User }> = ({ user }) => {
    const { push } = useRouter();
    const theme = useMantineTheme();

    return (
      <>
        <Head>
          <title>Fitnologym App | Política de Privacidad</title>
        </Head>
        <Paper shadow="xs" p="md">
          <Title tt="uppercase" order={1} mb={4} c={theme.colors.lime[5]}>Política de Privacidad</Title>
          <Divider my="md" />
          <Text mb={16}>En <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>, entendemos la importancia de proteger la privacidad y la seguridad de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que usted proporciona al utilizar nuestra aplicación web.</Text>
          <Title tt="uppercase" mb={8} order={2}>Recopilación de Información:</Title>
          <List mb={32}>
              <List.Item>Cuando te contactas y decides suscribirte a un plan, al registrarte en <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text> te solicitamos cierta información personal, como tu nombre, correo electrónico y otros datos relevantes para comenzar a monitorear tu salud y estado físico.</List.Item>
              <List.Item>Además, podemos recopilar automáticamente cierta información sobre su dispositivo y su uso de la aplicación, como la dirección IP, el tipo de navegador, la ubicación geográfica y la actividad de la aplicación.</List.Item>
          </List>
          <Title tt="uppercase" mb={8} order={2}>Uso de la Información:</Title>
          <List mb={32}>
              <List.Item>La información que recopilamos se utiliza para personalizar tu experiencia en <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>, brindarte una buena experiencia y mejorar nuestros servicios.</List.Item>
              <List.Item>Sus datos de medidas y métricas se utilizan para ayudarte a controlar y gestionar tus entrenamientos y bienestar personal de manera efectiva.</List.Item>
              <List.Item>No compartiremos tu información personal con terceros sin tu consentimiento, excepto en casos exigidos por la ley.</List.Item>
          </List>
          <Title tt="uppercase" mb={8} order={2}>Seguridad de la Información:</Title>
          <List mb={32}>
              <List.Item>Tomamos medidas para proteger tu información personal contra accesos no autorizados, alteraciones, divulgaciones o destrucciones no autorizadas.</List.Item>
              <List.Item>Utilizamos protocolos de seguridad estándar de la industria y tecnologías de cifrado para proteger tus datos durante la transmisión y el almacenamiento.</List.Item>
          </List>
          <Title tt="uppercase" mb={8} order={2}>Cambios en la Política de Privacidad:</Title>
          <List mb={32}>
              <List.Item>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Te notificaremos sobre cualquier cambio significativo mediante una notificación en la aplicación o por correo electrónico.</List.Item>
          </List>
          <Text>Al utilizar <Text c={theme.colors.lime[5]} fw="bold" span>Fitnologym</Text>, aceptás los términos de esta Política de Privacidad. Si tenés alguna pregunta o inquietud sobre nuestra recopilación o uso de tu información personal, no dude en escribirnos. Tu privacidad es nuestra máxima prioridad.</Text>
        </Paper>
      </>
    );
}

withRootLayout(PrivacyPolicy);

export default PrivacyPolicy;