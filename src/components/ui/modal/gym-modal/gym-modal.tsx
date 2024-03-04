import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface gymForm {
  gymName: string;
  city: string;
  address: string;
}
const UserModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("male");

  const initialValues: gymForm = {
    gymName: "",
    city: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    gymName: Yup.string().required("El nombre del gimnasio es obligatorio"),
    city: Yup.string().required("La ciudad es obligatoria"),
    address: Yup.string().required("La dirección es obligatoria"),
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Agregar Nuevo Gimnasio"
        size="md"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(
            values: gymForm,
            { setSubmitting }: FormikHelpers<gymForm>
          ) => {
            console.log("YEAH BOY");
            console.log(values);
            close();
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, setFieldValue, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Field name="gymName">
                {(field: any) => (
                  <TextInput
                    style={{ marginBottom: 20 }}
                    {...field}
                    label="Nombre"
                    placeholder="Nombre del gimnasio"
                    error={touched.gymName && errors.gymName}
                    onChange={(e) => setFieldValue("gymName", e.target.value)}
                    value={values.gymName}
                  />
                )}
              </Field>

              <Field name="city">
                {(field: any) => (
                  <TextInput
                    style={{ marginBottom: 20 }}
                    {...field}
                    label="Ciudad"
                    placeholder="Ciudad del gimnasio"
                    error={touched.city && errors.city}
                    onChange={(e) => setFieldValue("city", e.target.value)}
                    value={values.city}
                  />
                )}
              </Field>

              <Field name="address">
                {(field: any) => (
                  <TextInput
                    style={{ marginBottom: 20 }}
                    {...field}
                    label="Dirección"
                    placeholder="Dirección del gimnasio"
                    error={touched.address && errors.address}
                    onChange={(e) => setFieldValue("address", e.target.value)}
                    value={values.address}
                  />
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
