import { appUrls } from "@/lib/appUrls";
import { validateRequest } from "@/lib/auth";
import { recoverPassword } from "@/services/users";
import { User } from "@/types/user";
import { APP_VERSION } from "@/utils/constants";
import { Button, em, Stack, Text, TextInput, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { until } from "@open-draft/until";
import { Formik } from "formik";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import classes from "./index.module.css";

interface InitialValues {
  dni: string;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ sessionUser: User }>> {
  const { user } = await validateRequest(context.req, context.res);

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }

  return {
    props: {
      sessionUser: JSON.parse(JSON.stringify(user)),
    },
  } as any;
}

const RecoverPassword = () => {
  const { push } = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);
  const [passwordReset, setPasswordReset] = useState(false);

  return (
    <>
      <Head>
        <title>Fitnologym App | Ingreso</title>
      </Head>
      <div className={classes.wrapper}>
        <Formik
          initialValues={{ dni: "" } as InitialValues}
          validationSchema={Yup.object().shape({
            dni: Yup.string().required("DNI es requerido"),
          })}
          onSubmit={async (values, actions) => {
            const dniToUse = values.dni;

            actions.setSubmitting(true);

            const { data, error } = await until(() =>
              recoverPassword(dniToUse)
            );

            actions.setSubmitting(false);

            if (data) {
              setPasswordReset(true);
            }

            if (error) {
              notifications.show({
                title: "Error al recuperar contraseña",
                message: "Por favor, verifique los datos ingresados",
                color: "red",
              });
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
          }) => (
            <Stack className={classes.form} bg="dark.7" p={30}>
              <Title
                order={2}
                className={classes.title}
                ta="center"
                mt="md"
                mb={50}
              >
                <Image
                  priority
                  src="/assets/images/logo/png/logotype-brand.png"
                  alt="Fitnologym Logo"
                  width={isMobile ? 125 : 250}
                  height={isMobile ? 62 : 125}
                />
              </Title>
              <Title order={4} mt="md" c="white">
                Cambiar Contraseña
              </Title>
              {!passwordReset ? (
                <>
                  <form onSubmit={handleSubmit}>
                    <TextInput
                      name="dni"
                      label="D.N.I (Documento Nacional de Identidad)"
                      placeholder="Ej. 43840532"
                      c="white"
                      size="md"
                      value={values.dni}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.dni && errors.dni}
                    />
                    <Text mt="xs" c="white" size="sm">
                      Ingrese su D.N.I. para recuperar el acceso a su cuenta.
                    </Text>
                    <Button
                      fullWidth
                      mt="xl"
                      size="md"
                      c="black"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Cambiar
                    </Button>
                  </form>
                  <Stack
                    align="center"
                    style={{ flexGrow: 1 }}
                    justify="flex-end"
                  >
                    <Text size="xs">
                      versión{" "}
                      <Text style={{ fontWeight: 700 }} component="span">
                        {APP_VERSION}
                      </Text>
                    </Text>
                  </Stack>
                </>
              ) : (
                <>
                  <Text fw={600} c="white">
                    Contraseña restablecida
                  </Text>
                  <Text mb="lg">
                    Si el documento de identidad corresponde a una cuenta activa
                    va a poder ingresar a su cuenta con correo electrónico y
                    D.N.I. como contraseña.
                  </Text>
                  <Button
                    fullWidth
                    mt="xl"
                    size="md"
                    c="black"
                    onClick={() => push(appUrls.auth.login)}
                  >
                    Iniciar sesión
                  </Button>
                  <Stack
                    align="center"
                    style={{ flexGrow: 1 }}
                    justify="flex-end"
                  >
                    <Text size="xs">
                      versión{" "}
                      <Text style={{ fontWeight: 700 }} component="span">
                        {APP_VERSION}
                      </Text>
                    </Text>
                  </Stack>
                </>
              )}
            </Stack>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RecoverPassword;
