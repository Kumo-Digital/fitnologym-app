import { useUniqueGym } from "@/hooks/gyms";
import { editGym } from "@/services/gyms";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { until } from "@open-draft/until";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import EditGymModalSkeleton from "./edit-gym-modal-skeleton";

interface GymForm {
  name: string;
  city: string;
  address: string;
}
const EditGymModal = ({
  gymId,
  close,
  refetch,
}: {
  gymId: string;
  close: () => void;
  refetch: any;
}) => {
  const { gym, isLoading, refetch: gymRefetch } = useUniqueGym(gymId);
  const editGymInitialValues: GymForm = {
    name: gym?.name || "",
    city: gym?.city || "",
    address: gym?.address || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre del gimnasio es obligatorio"),
    city: Yup.string().required("La ciudad es obligatoria"),
    address: Yup.string().required("La dirección es obligatoria"),
  });

  if (isLoading) return <EditGymModalSkeleton />;
  return (
    <Formik
      initialValues={editGymInitialValues}
      onSubmit={async (
        values: GymForm,
        { setSubmitting }: FormikHelpers<GymForm>
      ) => {
        const { data, error } = await until(() => editGym(values, gymId));

        if (error) {
          console.error(error);
          setSubmitting(false);
          notifications.show({
            color: "red",
            title: "Error",
            message: "Ha ocurrido un error al intentar editar el gimnasio.",
          });
        }

        notifications.show({
          title: "Gimnasio Editado",
          message: `El gimnasio ${data.name} ha sido editado exitosamente`,
          color: "lime",
        });
        gymRefetch();
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
              Editar
            </Button>
          </Group>
        </Form>
      )}
    </Formik>
  );
};

export default EditGymModal;
