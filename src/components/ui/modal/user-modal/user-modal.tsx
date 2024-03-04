import {
  Box,
  Button,
  Group,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

export const SuscriptionColors = ["lime", "blue", "yellow"];

export const SuscriptionValues = [
  {
    value: "1",
    label: "Básico",
  },
  {
    value: "2",
    label: "Plus",
  },
  {
    value: "3",
    label: "Premium",
  },
];

interface UserForm {
  fullName: string;
  dni: string;
  subscription: string;
  gym: string;
  gender: string;
}
const UserModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const initialValues: UserForm = {
    fullName: "",
    dni: "",
    subscription: "",
    gym: "",
    gender: "male",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("El nombre completo es obligatorio"),
    dni: Yup.string()
      .required("El DNI es obligatorio")
      .min(8, "El DNI debe tener 8 dígitos")
      .max(8, "El DNI debe tener 8 dígitos"),
    subscription: Yup.string().required("Selecciona una suscripción"),
    gym: Yup.string().required("Selecciona un gimnasio"),
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Agregar Nuevo Usuario"
        size="md"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(
            values: UserForm,
            { setSubmitting }: FormikHelpers<UserForm>
          ) => {
            console.log("YEAH BOY");
            console.log(values);
            close();
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, setFieldValue, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Text>Nombre completo</Text>
              <Field name="fullName">
                {(field: any) => (
                  <Input
                    style={{ marginBottom: 20 }}
                    {...field}
                    label="Nombre completo"
                    placeholder="Nombre completo"
                    error={touched.fullName && errors.fullName}
                    onChange={(e) => setFieldValue("fullName", e.target.value)}
                    value={values.fullName}
                  />
                )}
              </Field>

              <Group grow style={{ marginBottom: 20 }} justify="space-between">
                <Field name="dni">
                  {(field: any) => (
                    <TextInput
                      {...field}
                      maw="100%"
                      label="DNI"
                      required
                      placeholder="Documento Nacional de Identidad"
                      error={touched.dni && errors.dni}
                      onChange={(e) => setFieldValue("dni", e.target.value)}
                      value={values.dni}
                    />
                  )}
                </Field>
                <Field name="subscription">
                  {(field: any) => (
                    <Select
                      maw={150}
                      {...field}
                      label="Suscripción"
                      placeholder="Suscripción"
                      error={touched.subscription && errors.subscription}
                      onChange={(e) => setFieldValue("subscription", e)}
                      value={values.subscription}
                      leftSection={
                        <Box
                          w={8}
                          h={8}
                          bg={
                            SuscriptionColors[Number(values.subscription) - 1]
                          }
                          style={{
                            borderRadius: "100%",
                          }}
                        ></Box>
                      }
                      data={SuscriptionValues}
                    />
                  )}
                </Field>
              </Group>

              <Field name="gym">
                {(field: any) => (
                  <Select
                    {...field}
                    label="Gimnasio"
                    placeholder="Gimnasio"
                    error={touched.gym && errors.gym}
                    onChange={(e) => setFieldValue("gym", e)}
                    value={values.gym}
                    data={[
                      { value: "gym1", label: "Gym 1" },
                      { value: "gym2", label: "Gym 2" },
                    ]}
                  />
                )}
              </Field>

              <Field name="gender" style={{ marginBottom: 20 }}>
                {(field: any) => (
                  <RadioGroup
                    {...field}
                    label="Género"
                    style={{ marginTop: 20 }}
                    onChange={(e) => {
                      setFieldValue("gender", e);
                    }}
                    value={values.gender}
                  >
                    <Group style={{ marginTop: 20 }}>
                      <Radio value="male" label="Hombre" />
                      <Radio value="female" label="Mujer" />
                    </Group>
                  </RadioGroup>
                )}
              </Field>

              <Group justify="flex-end">
                <Button variant="subtle" color="gray" onClick={close}>
                  Cancelar
                </Button>
                <Button variant="filled" c="black" type="submit">
                  Agregar
                </Button>
              </Group>
            </Form>
          )}
        </Formik>
      </Modal>

      <Button onClick={open} size="sm" variant="filled" c="black">
        Agregar
      </Button>
    </>
  );
};

export default UserModal;
