import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface GymForm {
  name: string;
  city: string;
  address: string;
}
const GymModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const initialValues: GymForm = {
    name: "",
    city: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre del gimnasio es obligatorio"),
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
            values: GymForm,
            { setSubmitting }: FormikHelpers<GymForm>
          ) => {
            console.log("YEAH BOY");
            console.log(values);
            close();
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Stack gap={16}>
                <TextInput
                  label="Nombre"
                  placeholder="Nombre del gimnasio"
                  name="name"
                  error={touched.name && errors.name}
                  onBlur={() => setFieldTouched("name", true)}
                  onChange={(e) => setFieldValue("name", e.target.value)}
                  value={values.name}
                />

                <TextInput
                  label="Ciudad"
                  placeholder="Ciudad del gimnasio"
                  name="city"
                  error={touched.city && errors.city}
                  onBlur={() => setFieldTouched("city", true)}
                  onChange={(e) => setFieldValue("city", e.target.value)}
                  value={values.city}
                />

                <TextInput
                  label="Dirección"
                  placeholder="Dirección del gimnasio"
                  name="address"
                  onBlur={() => setFieldTouched("address", true)}
                  error={touched.address && errors.address}
                  onChange={(e) => setFieldValue("address", e.target.value)}
                  value={values.address}
                />
              </Stack>

              <Group justify="flex-end" mt={20}>
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

      <Button
        onClick={open}
        size="sm"
        variant="filled"
        c="black"
        rightSection={<IconPlus size={15} />}
        w={150}
      >
        Agregar
      </Button>
    </>
  );
};

export default GymModal;
