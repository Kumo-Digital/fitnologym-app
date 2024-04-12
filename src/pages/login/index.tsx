import * as Yup from "yup";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  em,
} from "@mantine/core";
import classes from "./index.module.css";
import { withAuthLayout } from "@/utils/layouts";
import { Formik } from "formik";
import { until } from "@open-draft/until";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { validateRequest } from "@/lib/auth";
import { User } from "@/types/user";
import Head from "next/head";
import { appUrls } from "@/lib/appUrls";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";

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
            const { data, error } = await until(() => loginUser(values));

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
              <Paper className={classes.form} radius={0} p={30}>
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
              </Paper>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

withAuthLayout(Login);

export default Login;
