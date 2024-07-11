import { appUrls } from "@/lib/appUrls";
import { validateRequest } from "@/lib/auth";
import { loginUser } from "@/services/auth";
import { User } from "@/types/user";
import { APP_VERSION } from "@/utils/constants";
import { withAuthLayout } from "@/utils/layouts";
import {
  Button,
  em,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { until } from "@open-draft/until";
import { Formik } from "formik";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Yup from "yup";
import classes from "./index.module.css";

interface InitialValues {
  email: string;
  password: string;
  // remember: boolean;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    sessionUser: User;
  }>
> {
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

const Login = () => {
  const { push } = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(425)})`);

  return (
    <>
      <Head>
        <title>Fitnologym App | Ingreso</title>
      </Head>
      <div className={classes.wrapper}>
        <Formik
          initialValues={{ email: "", password: "" } as InitialValues}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Dirección de correo electrónico inválida")
              .required("Correo electrónico es requerido"),
            password: Yup.string().required("Contraseña es requerida"),
            // remember: Yup.boolean(),
          })}
          onSubmit={async (values, actions) => {
            const { data, error } = await until(() =>
              loginUser({
                ...values,
                email: values.email.toLowerCase(),
              })
            );

            if (data) {
              actions.setSubmitting(false);
              if (!data.data.last_logged_in && data.data.role === "user") {
                push(appUrls.changePassword);
              } else {
                push(appUrls.admin);
              }
            }

            if (error) {
              actions.setSubmitting(false);
              notifications.show({
                title: "Error al logearse",
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
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
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
                <Stack mb={8}>
                  <form onSubmit={handleSubmit}>
                    <TextInput
                      name="email"
                      label="Correo Electrónico"
                      placeholder="usuario@email.com"
                      size="md"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                    />
                    <PasswordInput
                      name="password"
                      label="Contraseña"
                      description="Para el primer ingreso de usuarios, la contraseña es el número de D.N.I."
                      placeholder="Contraseña"
                      mt="md"
                      size="md"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}
                    />
                    {/* <Checkbox
                      name="remember"
                      label="Mantener el inicio de sesión"
                      mt="xl"
                      size="md"
                      checked={values.remember}
                      onChange={(e) => setFieldValue("remember", e.target.checked)}
                    /> */}
                    <Button
                      fullWidth
                      mt="xl"
                      size="md"
                      c="black"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Ingresar
                    </Button>
                  </form>
                </Stack>
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
                {/* <Text ta="center" mt="md">
                  No estás registrado?{" "}
                  <Anchor<"a">
                    href="#"
                    fw={700}
                    onClick={(event) => event.preventDefault()}
                  >
                    Registrarse
                  </Anchor>
                </Text> */}
              </Stack>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

withAuthLayout(Login);

export default Login;
