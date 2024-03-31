import { useGyms } from "@/hooks/gyms";
import { useUniqueUser } from "@/hooks/users";
import { editUser } from "@/services/users";
import { UserType } from "@/types/user";
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
import UserModalSkeleton from "./user-modal-skeleton";

interface EditUserModalProps {
  userId: string;
  close: () => void;
  refetch: () => void;
}

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

const EditUserModal = ({ userId, refetch, close }: EditUserModalProps) => {
  const {
    user,
    isLoading,
    refetch: userRefetch,
  } = useUniqueUser({ id: userId });
  const { gyms, isLoading: isLoadingGyms } = useGyms();

  const userTypeOptions = [
    { value: UserType.BASIC, label: "Básico" },
    { value: UserType.PLUS, label: "Plus" },
    { value: UserType.PREMIUM, label: "Premium" },
  ];
  const gymOptions = gyms.map((gym) => ({ value: gym.id, label: gym.name }));

  const editUserInitialValues = {
    fullname: user?.fullname,
    email: user?.email,
    dni: user?.dni,
    user_type: user?.user_type,
    gym_id: user?.gym_id,
    gender: user?.gender,
    target_metric: user?.targets ? user?.targets[0]?.target_metric : "weight",
    target_value: user?.targets ? user?.targets[0]?.target_value : 0,
  };

  if (isLoading || isLoadingGyms) return <UserModalSkeleton />;
  return (
    <Formik
      initialValues={editUserInitialValues}
      validationSchema={newUserFormValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        const { data, error } = await until(() => editUser(values, userId));

        if (error) {
          notifications.show({
            title: "Error",
            message: "Ocurrió un error al editar el usuario",
            color: "red",
          });
          close();
          return;
        }

        notifications.show({
          title: "Usuario Editado",
          message: `El usuario ${data.fullname} ha sido editado exitosamente`,
          color: "lime",
        });
        userRefetch();
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
                miw={150}
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
                flex={"1 0 0"}
                miw={150}
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
                flex="1 0 0"
                miw={150}
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
                flex={"1 0 0"}
                miw={150}
              />
            </Group>
            <Group justify="flex-end">
              <Button variant="subtle" onClick={close}>
                Cancelar
              </Button>
              <Button type="submit" c="black">
                Editar
              </Button>
            </Group>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserModal;
