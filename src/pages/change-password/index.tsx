import * as Yup from "yup";
import { withRootLayout } from "@/utils/layouts";
import {
  Text,
  Paper,
  PasswordInput,
  Stack,
  Button,
  Title,
} from "@mantine/core";
import { Form, Formik } from "formik";
import { until } from "@open-draft/until";
import { useRouter } from "next/router";
import { changePassword } from "@/services/users";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { User } from "lucia";
import { validateRequest } from "@/lib/auth";
import { NextPageWithLayout } from "../_app";
import { notifications } from "@mantine/notifications";
import Head from "next/head";

interface InitialValues {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

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

const ChangePassword: NextPageWithLayout<{ user: User }> = ({ user }) => {
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Fitnologym App | Cambiar contraseña</title>
      </Head>
      <Paper shadow="xs" p="md">
        <Title order={2}>Cambiar contraseña</Title>
        <Text>
          ¡Le recomendamos cambiar su contraseña para una mayor seguridad!
        </Text>
        <Formik
          initialValues={
            {
              current_password: "",
              new_password: "",
              confirm_new_password: "",
            } as InitialValues
          }
          validationSchema={Yup.object().shape({
            current_password: Yup.string().required(
              "La contraseña actual es requerida"
            ),
            new_password: Yup.string().required(
              "La nueva contraseña es requerida"
            ),
            confirm_new_password: Yup.string()
              .oneOf(
                [Yup.ref("new_password"), ""],
                "Las nuevas contraseñas deben coincidir"
              )
              .required("Necesita reconfirmar la nueva contraseña"),
          })}
          onSubmit={async (values, actions) => {
            const { data, error } = await until(() =>
              changePassword(user.id, values)
            );

            if (data) {
              actions.setSubmitting(false);
              push("/my-profile");
            }

            if (error) {
              actions.setSubmitting(false);
              console.error("Error al intentar cambiar la contraseña", error);
              notifications.show({
                color: "red",
                title: "Error",
                message:
                  "Ha ocurrido un error al intentar cambiar la contraseña.",
              });
              return;
            }
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <PasswordInput
                  name="current_password"
                  label="Contraseña actual"
                  placeholder="Contraseña..."
                  mt="md"
                  size="md"
                  value={values.current_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.current_password && errors.current_password}
                />
                <PasswordInput
                  name="new_password"
                  label="Nueva contraseña"
                  placeholder="Nueva contraseña..."
                  mt="md"
                  size="md"
                  value={values.new_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.new_password && errors.new_password}
                />
                <PasswordInput
                  name="confirm_new_password"
                  label="Confirma nueva contraseña"
                  description="Debe repetir su nueva contraseña"
                  placeholder="Nueva contraseña..."
                  mt="md"
                  size="md"
                  value={values.confirm_new_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirm_new_password && errors.confirm_new_password
                  }
                />
                <Button variant="filled" c="black" type="submit" mt={16}>
                  Cambiar Contraseña
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

withRootLayout(ChangePassword);

export default ChangePassword;
