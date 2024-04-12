import {
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  Radio,
  RadioGroup,
  Select,
  SelectProps,
  Stack,
  TextInput,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
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

const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
  <Group flex="1" gap="xs">
    <Box
      w={8}
      h={8}
      bg={SuscriptionColors[Number(option.value) - 1]}
      style={{
        borderRadius: "100%",
      }}
    ></Box>
    <Text size="sm">{option.label}</Text>
  </Group>
);

interface UserForm {
  fullName: string;
  dni: string;
  email: string;
  subscription: string;
  gym: string;
  gender: string;
}
const UserModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const initialValues: UserForm = {
    fullName: "",
    email: "",
    dni: "",
    subscription: "1",
    gym: "",
    gender: "male",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("El nombre completo es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    dni: Yup.string()
      .required("El DNI es obligatorio")
      .min(6, "El DNI debe tener 6 dígitos")
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
          onSubmit={(values: UserForm) => {
            close();
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Stack gap={16}>
                <TextInput
                  name="fullName"
                  label="Nombre completo"
                  placeholder="Nombre completo"
                  error={touched.fullName && errors.fullName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                />
                <TextInput
                  name="email"
                  label="Correo Electrónico"
                  placeholder="Correo Electrónico"
                  error={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                />
                <Group grow justify="space-between" align="stretch">
                  <NumberInput
                    maw="100%"
                    label="DNI"
                    name="dni"
                    allowDecimal={false}
                    decimalSeparator=","
                    thousandSeparator="."
                    hideControls
                    placeholder="Documento Nacional de Identidad"
                    error={touched.dni && errors.dni}
                    onBlur={() => setFieldTouched("dni", true)}
                    onChange={(e) => setFieldValue("dni", e)}
                    value={values.dni}
                  />
                  <Select
                    maw={150}
                    label="Suscripción"
                    name="subscription"
                    placeholder="Suscripción"
                    withCheckIcon={false}
                    renderOption={renderSelectOption}
                    error={touched.subscription && errors.subscription}
                    onBlur={() => setFieldTouched("subscription", true)}
                    onChange={(e) => setFieldValue("subscription", e)}
                    value={values.subscription}
                    leftSection={
                      <Box
                        w={8}
                        h={8}
                        bg={SuscriptionColors[Number(values.subscription) - 1]}
                        style={{
                          borderRadius: "100%",
                        }}
                      ></Box>
                    }
                    data={SuscriptionValues}
                  />
                </Group>

                <Select
                  label="Gimnasio"
                  name="gym"
                  placeholder="Gimnasio"
                  withCheckIcon={false}
                  error={touched.gym && errors.gym}
                  onBlur={() => setFieldTouched("gym", true)}
                  onChange={(e) => setFieldValue("gym", e)}
                  value={values.gym}
                  data={[
                    { value: "1", label: "Gym 1" },
                    { value: "2", label: "Gym 2" },
                  ]}
                />

                <RadioGroup
                  name="gender"
                  label="Género"
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

                <Group justify="flex-end">
                  <Button variant="subtle" color="gray" onClick={close}>
                    Cancelar
                  </Button>
                  <Button variant="filled" c="black" type="submit">
                    Agregar
                  </Button>
                </Group>
              </Stack>
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
