import * as Yup from "yup";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./index.module.css";
import { withAuthLayout } from "@/utils/layouts";
import { Formik } from "formik";
import { until } from "@open-draft/until";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/router";

interface InitialValues {
  email: string;
  password: string;
  // remember: boolean;
}

const Login = () => {
  const { push } = useRouter();

  return (
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
            push("/admin");
          }

          if (error) {
            actions.setSubmitting(false);
            console.log("Error al logearse", error);
            // show the error with a toast
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
                Bienvenidos a Fitnologym!
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
              <Text ta="center" mt="md">
                No estás registrado?{" "}
                <Anchor<"a">
                  href="#"
                  fw={700}
                  onClick={(event) => event.preventDefault()}
                >
                  Registrarse
                </Anchor>
              </Text>
            </Paper>
          );
        }}
      </Formik>
    </div>
  );
};

withAuthLayout(Login);

export default Login;
