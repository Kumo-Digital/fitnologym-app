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
import { Form, Formik, FormikHelpers } from "formik";
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

const renderSelectOption: SelectProps['renderOption'] = ({ option }) => (
  <Group flex="1" gap="xs">
    <Box 
      w={8}
      h={8}
      bg={SuscriptionColors[Number(option.value)-1]}
      style={{
        borderRadius: "100%"
      }}
    >
    </Box>
    <Text size="sm">
      {option.label}
    </Text>
  </Group> 
);

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
    subscription: "1",
    gym: "",
    gender: "male",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("El nombre completo es obligatorio"),
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
          onSubmit={(
            values: UserForm,
            { setSubmitting }: FormikHelpers<UserForm>
          ) => {
            console.log(values);
            close();
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, setFieldValue, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Stack gap={8}>
                <Group grow>
                  <TextInput
                    name="fullName"
                    label="Nombre completo"
                    placeholder="Nombre completo"
                    error={touched.fullName && errors.fullName}
                    onChange={(e) => setFieldValue("fullName", e.target.value)}
                    value={values.fullName}
                  />
                </Group>

                <Group grow justify="space-between">
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
                </Group>

                  <Select
                    label="Gimnasio"
                    name="gym"
                    placeholder="Gimnasio"
                    error={touched.gym && errors.gym}
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
