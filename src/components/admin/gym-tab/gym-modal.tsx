import { createGym } from "@/services/gyms";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { until } from "@open-draft/until";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface GymForm {
  name: string;
  city: string;
  address: string;
}
const GymModal = ({ close, refetch }: { close: () => void; refetch: any }) => {
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
    <Formik
      initialValues={initialValues}
      onSubmit={async (
        values: GymForm,
        { setSubmitting }: FormikHelpers<GymForm>
      ) => {
        const { data, error } = await until(() => createGym(values));

        if (error) {
          console.error(error);
          setSubmitting(false);
          notifications.show({
            color: "red",
            title: "Error",
            message: "Ha ocurrido un error al intentar añadir un gimnasio.",
          });
        }

        notifications.show({
          title: "Usuario Creado",
          message: `El gimnasio ${data.name} ha sido creado exitosamente`,
          color: "lime",
        });
        refetch();
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
  );
};

export default GymModal;
