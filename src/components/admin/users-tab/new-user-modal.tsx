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
  Group,
  Modal,
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
  isOpen: boolean;
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

const NewUserModal = ({ isOpen, close, gyms, refetch }: NewUserModalProps) => {
  const gymOptions = gyms.map((gym) => ({ value: gym.id, label: gym.name }));
  const userTypeOptions = [
    { value: UserType.BASIC, label: "Básico" },
    { value: UserType.PLUS, label: "Plus" },
    { value: UserType.PREMIUM, label: "Premium" },
  ];
  return (
    <Modal
      opened={isOpen}
      onClose={close}
      title="Agregar Nuevo Usuario"
      centered
    >
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
    </Modal>
  );
};

export default NewUserModal;
