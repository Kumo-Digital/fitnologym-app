import { createUser } from "@/services/users";
import { Gym } from "@/types/gym";
import { UserForm, UserType } from "@/types/user";
import {
  getSubscriptionColor,
  newUserFormValidationSchema,
} from "@/utils/admin";
import {
  Box,
  Button,
  Divider,
  Group,
  NumberInput,
  Radio,
  Select,
  SelectProps,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { until } from "@open-draft/until";
import { Form, Formik } from "formik";

interface NewUserModalProps {
  close: () => void;
  gyms: Gym[];
  refetch: () => void;
}

const newUserInitialValues: UserForm = {
  fullname: "",
  email: "",
  dni: "",
  user_type: UserType.BASIC,
  gym_id: "",
  gender: "male",
  target_metric: "weight",
  target_value: 0,
};

const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
  <Group flex="1" gap="xs">
    <Box
      w={8}
      h={8}
      bg={getSubscriptionColor(option.value)}
      style={{
        borderRadius: "100%",
      }}
    ></Box>
    <Text size="sm">{option.label}</Text>
  </Group>
);

const NewUserModal = ({ close, gyms, refetch }: NewUserModalProps) => {
  const gymOptions = gyms.map((gym) => ({ value: gym.id, label: gym.name }));
  const userTypeOptions = [
    { value: UserType.BASIC, label: "Básico" },
    { value: UserType.PLUS, label: "Plus" },
    { value: UserType.PREMIUM, label: "Premium" },
  ];
  return (
    <Formik
      initialValues={newUserInitialValues}
      validationSchema={newUserFormValidationSchema}
      onSubmit={async (values) => {
        const { data, error } = await until(() => createUser(values));

        if (error) {
          notifications.show({
            title: "Error",
            message: "Ocurrió un error al crear el usuario",
            color: "red",
          });
          close();
          return;
        }

        notifications.show({
          title: "Usuario Creado",
          message: `El usuario ${data.fullname} ha sido creado exitosamente`,
          color: "lime",
        });
        refetch();
        close();
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Stack gap={16}>
            <TextInput
              name="fullname"
              label="Nombre Completo"
              placeholder="Nombre y Apellido"
              value={values.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullname && errors.fullname}
            />
            <TextInput
              name="email"
              label="Correo Electrónico"
              placeholder="Dirección de Correo Electrónico"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <Group gap={16} align="stretch">
              <TextInput
                name="dni"
                label="DNI"
                placeholder="Documento Nacional de Identidad"
                value={values.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dni && errors.dni}
                flex={"1 0 0"}
              />
              <Select
                name="user_type"
                label="Suscripción"
                placeholder="Seleccionar Suscripción"
                data={userTypeOptions}
                renderOption={renderSelectOption}
                leftSection={
                  <Box
                    w={8}
                    h={8}
                    bg={getSubscriptionColor(values.user_type)}
                    style={{
                      borderRadius: "100%",
                    }}
                  ></Box>
                }
                value={values.user_type}
                onChange={(e) => setFieldValue("user_type", e)}
                onBlur={() => setFieldTouched("user_type", true)}
                error={touched.user_type && errors.user_type}
                allowDeselect={false}
                withCheckIcon={false}
              />
            </Group>
            <Select
              name="gym_id"
              label="Gimnasio"
              placeholder="Seleccionar Gimnasio"
              data={gymOptions}
              value={values.gym_id}
              onChange={(e) => setFieldValue("gym_id", e)}
              onBlur={() => setFieldTouched("gym_id", true)}
              error={touched.gym_id && errors.gym_id}
            />
            <Radio.Group
              name="gender"
              label="Género"
              value={values.gender}
              onChange={(value) => setFieldValue("gender", value)}
            >
              <Group gap={32} mt="xs">
                <Radio value="male" label="Hombre" />
                <Radio value="female" label="Mujer" />
              </Group>
            </Radio.Group>
            <Divider />
            <Stack gap={4}>
              <Text>Objetivos del Usuario</Text>
              <Text size="sm" c="gray.5">
                Define metas específicas y medibles adaptadas a tu trayectoria
                fitness. Haz un seguimiento del progreso, mantente motivado y
                conquista tus aspiraciones fitness con precisión y claridad.
              </Text>
            </Stack>
            <Group gap={16} align="stretch">
              <Select
                name="target_metric"
                label="Métrica Objetivo"
                placeholder="Seleccionar una Métrica"
                disabled
                data={[{ label: "Peso", value: "weight" }]}
                value={values.target_metric}
                onChange={(e) => setFieldValue("target_metric", e)}
                onBlur={() => setFieldTouched("target_metric", true)}
                error={touched.target_metric && errors.target_metric}
                flex="1"
              />
              <NumberInput
                name="target_value"
                label="Objetivo"
                placeholder="Kgs"
                value={values.target_value}
                onChange={(e) => setFieldValue("target_value", e)}
                onBlur={() => setFieldTouched("target_value", true)}
                error={touched.target_value && errors.target_value}
                min={0}
                rightSection={
                  <Text size="sm" mr={4}>
                    Kg
                  </Text>
                }
                w={150}
              />
            </Group>
            <Group justify="flex-end">
              <Button variant="subtle" onClick={close}>
                Cancelar
              </Button>
              <Button type="submit" c="black">
                Agregar
              </Button>
            </Group>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default NewUserModal;
