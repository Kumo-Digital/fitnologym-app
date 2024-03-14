import { IMeasurement } from "@/db/interfaces/IMeasurement";
import { apiClient } from "@/lib/apiClient";
import { API_URL_V1, apiUrls } from "@/lib/apiUrls";
import { MeasurementFormValues } from "@/types/admin";
import { UserItem } from "@/types/user";
import {
  StatusColors,
  StatusValues,
  measurementFormInitialValues,
} from "@/utils/admin";
import {
  Box,
  Button,
  Divider,
  Group,
  NumberInput,
  Select,
  SelectProps,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Formik, Form, FormikHelpers } from "formik";
import { until } from "@open-draft/until";
import { useRouter } from "next/router";
import { appUrls } from "@/lib/appUrls";
import { measurementFormValidationSchema } from "@/utils/measurement";

const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
  <Group flex="1" gap="xs">
    <Box
      w={8}
      h={8}
      bg={StatusColors[Number(option.value) - 1]}
      style={{
        borderRadius: "100%",
      }}
    ></Box>
    <Text size="sm">{option.label}</Text>
  </Group>
);

export default function MeasurementForm({ users }: { users: UserItem[] }) {
  const { push } = useRouter();

  async function createMeasurement(values: MeasurementFormValues) {
    try {
      console.log(values);
      const res = await apiClient.post(apiUrls.measurements.create, values);
      console.log("la response es:", res);

      if (res.status === 201) {
        console.log("Hemos añadido una nueva medida!");
      } else {
        console.log("ERROR!");
        console.error(res.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Formik
        initialValues={measurementFormInitialValues}
        validationSchema={measurementFormValidationSchema}
        validateOnChange={false}
        onSubmit={async (
          values: any,
          { setSubmitting }: FormikHelpers<any>
        ) => {
          const { data, error } = await until(() => createMeasurement(values));
          if (error) {
            console.log("error");
            return;
          }

          push({
            pathname: appUrls.admin,
            query: { tab: "measurements" },
          });
        }}
      >
        {({
          values,
          handleBlur,
          handleSubmit,
          handleChange,
          setFieldValue,
          touched,
          errors,
        }) => {
          console.log("errors", errors);
          return (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Group h={120} align="center" justify="space-between">
                  <Title order={1} c="white">
                    Medidas
                  </Title>
                  <Text size="sm">La ultima medición...</Text>
                </Group>

                <Stack mb={32}>
                  <Group id="report" grow align="start" gap={24}>
                    <Stack
                      style={{
                        position: "sticky",
                        top: "32px",
                      }}
                    >
                      <Group wrap="nowrap">
                        <Title order={4}>Reporte</Title>
                        <Divider w="100%" />
                      </Group>
                      <Text size="sm" w="100%">
                        Lorem ipsum dolor sit amet consectetur. Amet arcu
                        gravida vitae varius posuere. Sit molestie proin mi
                        accumsan viverra tempus sed turpis felis. Tellus sed
                        nulla morbi facilisis euismod. Arcu ligula egestas eu
                        nisl nibh amet mauris quis urna. Etiam viverra leo risus
                        pretium dictum ultrices neque nunc et.
                      </Text>
                    </Stack>
                    <Stack id="value-user">
                      <Select
                        name="user_id"
                        label="Cliente"
                        placeholder="Nombre del cliente"
                        searchable
                        withCheckIcon={false}
                        data={users}
                        value={values.user_id}
                        onChange={(e) => setFieldValue("user_id", e)}
                        onBlur={handleBlur}
                        error={touched.user_id && errors.user_id}
                      />
                      <TextInput
                        name="report_url"
                        label="Devolución"
                        description="Link al reporte en Google Drive o Google Docs/Excel, etc..."
                        placeholder="Enlace al reporte..."
                        value={values.report_url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.report_url && errors.report_url}
                      />
                    </Stack>
                  </Group>
                </Stack>

                <Stack mb={32}>
                  <Group id="general" grow align="start" gap={24}>
                    <Stack
                      style={{
                        position: "sticky",
                        top: "32px",
                      }}
                    >
                      <Group wrap="nowrap">
                        <Title order={4}>Generales</Title>
                        <Divider w="100%" />
                      </Group>
                      <Text size="sm" w="100%">
                        Lorem ipsum dolor sit amet consectetur. Amet arcu
                        gravida vitae varius posuere. Sit molestie proin mi
                        accumsan viverra tempus sed turpis felis. Tellus sed
                        nulla morbi facilisis euismod. Arcu ligula egestas eu
                        nisl nibh amet mauris quis urna. Etiam viverra leo risus
                        pretium dictum ultrices neque nunc et.
                      </Text>
                    </Stack>
                    <Stack>
                      <Group grow id="value-weight">
                        <NumberInput
                          label="Peso"
                          value={values.weight}
                          name="weight"
                          maw="100%"
                          min={0}
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("weight", e)}
                          onBlur={handleBlur}
                          error={touched.weight && errors.weight}
                        />
                        <Select
                          name="weightStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={StatusColors[Number(values.weightStatus) - 1]}
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.weightStatus}
                          onChange={(e) => setFieldValue("weightStatus", e)}
                          onBlur={handleBlur}
                          error={touched.weightStatus && errors.weightStatus}
                        />
                      </Group>
                      <Group grow id="value-bmi">
                        <NumberInput
                          label="Indice de Masa Corporal"
                          value={values.bmi}
                          name="bmi"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("bmi", e)}
                          onBlur={handleBlur}
                          error={touched.bmi && errors.bmi}
                        />
                        <Select
                          name="bmiStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={StatusColors[Number(values.bmiStatus) - 1]}
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.bmiStatus}
                          onChange={(e) => setFieldValue("bmiStatus", e)}
                          onBlur={handleBlur}
                          error={touched.bmiStatus && errors.bmiStatus}
                        />
                      </Group>
                      <Group grow id="value-bodyFat">
                        <NumberInput
                          label="Grasa Corporal"
                          value={values.bodyFat}
                          name="bodyFat"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("bodyFat", e)}
                          onBlur={handleBlur}
                          error={touched.bodyFat && errors.bodyFat}
                        />
                        <Select
                          name="bodyFatStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[Number(values.bodyFatStatus) - 1]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.bodyFatStatus}
                          onChange={(e) => setFieldValue("bodyFatStatus", e)}
                          onBlur={handleBlur}
                          error={touched.bodyFatStatus && errors.bodyFatStatus}
                        />
                      </Group>
                      <Group grow id="value-viscFat">
                        <NumberInput
                          label="Grasa Visceral"
                          value={values.viscFat}
                          name="viscFat"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("viscFat", e)}
                          onBlur={handleBlur}
                          error={touched.viscFat && errors.viscFat}
                        />
                        <Select
                          name="viscFatStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[Number(values.viscFatStatus) - 1]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.viscFatStatus}
                          onChange={(e) => setFieldValue("viscFatStatus", e)}
                          onBlur={handleBlur}
                          error={touched.viscFatStatus && errors.viscFatStatus}
                        />
                      </Group>
                      <Group grow id="value-muscleMass">
                        <NumberInput
                          label="Masa Muscular"
                          value={values.muscleMass}
                          name="muscleMass"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("muscleMass", e)}
                          onBlur={handleBlur}
                          error={touched.muscleMass && errors.muscleMass}
                        />
                        <Select
                          name="muscleMassStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.muscleMassStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.muscleMassStatus}
                          onChange={(e) => setFieldValue("muscleMassStatus", e)}
                          onBlur={handleBlur}
                          error={touched.report_url && errors.report_url}
                        />
                      </Group>
                      <Group grow id="value-boneMass">
                        <NumberInput
                          label="Masa Osea"
                          value={values.boneMass}
                          name="boneMass"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("boneMass", e)}
                          onBlur={handleBlur}
                          error={touched.boneMass && errors.boneMass}
                        />
                        <Select
                          name="boneMassStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[Number(values.boneMassStatus) - 1]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.boneMassStatus}
                          onChange={(e) => setFieldValue("boneMassStatus", e)}
                          onBlur={handleBlur}
                          error={
                            touched.boneMassStatus && errors.boneMassStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-bmr">
                        <NumberInput
                          label="Tasa Metabólica Basal"
                          value={values.bmr}
                          name="bmr"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("bmr", e)}
                          onBlur={handleBlur}
                          error={touched.bmr && errors.bmr}
                        />
                        <Select
                          name="bmrStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={StatusColors[Number(values.bmrStatus) - 1]}
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.bmrStatus}
                          onChange={(e) => setFieldValue("bmrStatus", e)}
                          onBlur={handleBlur}
                          error={touched.bmrStatus && errors.bmrStatus}
                        />
                      </Group>
                      <Group grow id="value-metabAge">
                        <NumberInput
                          label="Edad Metabólica"
                          value={values.metabAge}
                          name="metabAge"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Años
                            </Text>
                          }
                          onChange={(e) => setFieldValue("metabAge", e)}
                          onBlur={handleBlur}
                          error={touched.metabAge && errors.metabAge}
                        />
                        <Select
                          name="metabAgeStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[Number(values.metabAgeStatus) - 1]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.metabAgeStatus}
                          onChange={(e) => setFieldValue("metabAgeStatus", e)}
                          onBlur={handleBlur}
                          error={
                            touched.metabAgeStatus && errors.metabAgeStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-bodyWater">
                        <NumberInput
                          label="Agua Corporal"
                          value={values.bodyWater}
                          name="bodyWater"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("bodyWater", e)}
                          onBlur={handleBlur}
                          error={touched.bodyWater && errors.bodyWater}
                        />
                        <Select
                          name="bodyWaterStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[Number(values.bodyWaterStatus) - 1]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.bodyWaterStatus}
                          onChange={(e) => setFieldValue("bodyWaterStatus", e)}
                          onBlur={handleBlur}
                          error={
                            touched.bodyWaterStatus && errors.bodyWaterStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-muscleQuality">
                        <NumberInput
                          label="Calidad del Músculo"
                          value={values.muscleQuality}
                          name="muscleQuality"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("muscleQuality", e)}
                          onBlur={handleBlur}
                          error={touched.muscleQuality && errors.muscleQuality}
                        />
                        <Select
                          name="muscleQualityStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.muscleQualityStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.muscleQualityStatus}
                          onChange={(e) =>
                            setFieldValue("muscleQualityStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.muscleQualityStatus &&
                            errors.muscleQualityStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-physiqueRating">
                        <NumberInput
                          label="Rating Físico"
                          value={values.physiqueRating}
                          name="physiqueRating"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("physiqueRating", e)}
                          onBlur={handleBlur}
                          error={
                            touched.physiqueRating && errors.physiqueRating
                          }
                        />
                        <Select
                          name="physiqueRatingStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.physiqueRatingStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.physiqueRatingStatus}
                          onChange={(e) =>
                            setFieldValue("physiqueRatingStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.physiqueRatingStatus &&
                            errors.physiqueRatingStatus
                          }
                        />
                      </Group>
                    </Stack>
                  </Group>
                </Stack>

                <Stack mb={32}>
                  <Group id="trunk" grow align="start" gap={24}>
                    <Stack
                      style={{
                        position: "sticky",
                        top: "32px",
                      }}
                    >
                      <Group wrap="nowrap">
                        <Title order={4}>Torso</Title>
                        <Divider w="100%" />
                      </Group>
                      <Text size="sm" w="100%">
                        Lorem ipsum dolor sit amet consectetur. Amet arcu
                        gravida vitae varius posuere. Sit molestie proin mi
                        accumsan viverra tempus sed turpis felis. Tellus sed
                        nulla morbi facilisis euismod. Arcu ligula egestas eu
                        nisl nibh amet mauris quis urna. Etiam viverra leo risus
                        pretium dictum ultrices neque nunc et.
                      </Text>
                    </Stack>
                    <Stack>
                      <Group grow id="value-trunkMuscleMass">
                        <NumberInput
                          label="Masa Muscular"
                          value={values.trunkMuscleMass}
                          name="trunkMuscleMass"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("trunkMuscleMass", e)}
                          onBlur={handleBlur}
                          error={
                            touched.trunkMuscleMass && errors.trunkMuscleMass
                          }
                        />
                        <Select
                          name="trunkMuscleMassStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.trunkMuscleMassStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.trunkMuscleMassStatus}
                          onChange={(e) =>
                            setFieldValue("trunkMuscleMassStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.trunkMuscleMassStatus &&
                            errors.trunkMuscleMassStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-trunkMuscleQuality">
                        <NumberInput
                          label="Calidad del Músculo"
                          value={values.trunkMuscleQuality}
                          name="trunkMuscleQuality"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("trunkMuscleQuality", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.trunkMuscleQuality &&
                            errors.trunkMuscleQuality
                          }
                        />
                        <Select
                          name="trunkMuscleQualityStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.trunkMuscleQualityStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.trunkMuscleQualityStatus}
                          onChange={(e) =>
                            setFieldValue("trunkMuscleQualityStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.trunkMuscleQualityStatus &&
                            errors.trunkMuscleQualityStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-trunkBodyFat">
                        <NumberInput
                          label="Grasa Corporal"
                          value={values.trunkBodyFat}
                          name="trunkBodyFat"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("trunkBodyFat", e)}
                          onBlur={handleBlur}
                          error={touched.trunkBodyFat && errors.trunkBodyFat}
                        />
                        <Select
                          name="trunkBodyFatStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.trunkBodyFatStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.trunkBodyFatStatus}
                          onChange={(e) =>
                            setFieldValue("trunkBodyFatStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.trunkBodyFatStatus &&
                            errors.trunkBodyFatStatus
                          }
                        />
                      </Group>
                    </Stack>
                  </Group>
                </Stack>

                <Stack mb={32}>
                  <Group id="arms" grow align="start" gap={24}>
                    <Stack
                      style={{
                        position: "sticky",
                        top: "32px",
                      }}
                    >
                      <Group wrap="nowrap">
                        <Title order={4}>Brazos</Title>
                        <Divider w="100%" />
                      </Group>
                      <Text size="sm" w="100%">
                        Lorem ipsum dolor sit amet consectetur. Amet arcu
                        gravida vitae varius posuere. Sit molestie proin mi
                        accumsan viverra tempus sed turpis felis. Tellus sed
                        nulla morbi facilisis euismod. Arcu ligula egestas eu
                        nisl nibh amet mauris quis urna. Etiam viverra leo risus
                        pretium dictum ultrices neque nunc et.
                      </Text>
                    </Stack>
                    <Stack gap={8}>
                      <Text size="sm" c="gray.6" fw="600">
                        Brazo Derecho
                      </Text>
                      <Group grow id="value-armRightMuscleMass">
                        <NumberInput
                          label="Masa Muscular"
                          value={values.armRightMuscleMass}
                          name="armRightMuscleMass"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("armRightMuscleMass", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armRightMuscleMass &&
                            errors.armRightMuscleMass
                          }
                        />
                        <Select
                          name="armRightMuscleMassStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.armRightMuscleMassStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.armRightMuscleMassStatus}
                          onChange={(e) =>
                            setFieldValue("armRightMuscleMassStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armRightMuscleMassStatus &&
                            errors.armRightMuscleMassStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-armRightMuscleQuality">
                        <NumberInput
                          label="Calidad del Músculo"
                          value={values.armRightMuscleQuality}
                          name="armRightMuscleQuality"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("armRightMuscleQuality", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armRightMuscleQuality &&
                            errors.armRightMuscleQuality
                          }
                        />
                        <Select
                          name="armRightMuscleQualityStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.armRightMuscleQualityStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.armRightMuscleQualityStatus}
                          onChange={(e) =>
                            setFieldValue("armRightMuscleQualityStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armRightMuscleQualityStatus &&
                            errors.armRightMuscleQualityStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-armRightBodyFat">
                        <NumberInput
                          label="Grasa Corporal"
                          value={values.armRightBodyFat}
                          name="armRightBodyFat"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("armRightBodyFat", e)}
                          onBlur={handleBlur}
                          error={
                            touched.armRightBodyFat && errors.armRightBodyFat
                          }
                        />
                        <Select
                          name="armRightBodyFatStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.armRightBodyFatStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.armRightBodyFatStatus}
                          onChange={(e) =>
                            setFieldValue("armRightBodyFatStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armRightBodyFatStatus &&
                            errors.armRightBodyFatStatus
                          }
                        />
                      </Group>

                      <Text size="sm" mt={24} c="gray.6" fw="600">
                        Brazo Izquierdo
                      </Text>
                      <Group grow id="value-armLeftMuscleMass">
                        <NumberInput
                          label="Masa Muscular"
                          value={values.armLeftMuscleMass}
                          name="armLeftMuscleMass"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("armLeftMuscleMass", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armLeftMuscleMass &&
                            errors.armLeftMuscleMass
                          }
                        />
                        <Select
                          name="armLeftMuscleMassStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.armLeftMuscleMassStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.armLeftMuscleMassStatus}
                          onChange={(e) =>
                            setFieldValue("armLeftMuscleMassStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armLeftMuscleMassStatus &&
                            errors.armLeftMuscleMassStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-armLeftMuscleQuality">
                        <NumberInput
                          label="Calidad del Músculo"
                          value={values.armLeftMuscleQuality}
                          name="armLeftMuscleQuality"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("armLeftMuscleQuality", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armLeftMuscleQuality &&
                            errors.armLeftMuscleQuality
                          }
                        />
                        <Select
                          name="armLeftMuscleQualityStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.armLeftMuscleQualityStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.armLeftMuscleQualityStatus}
                          onChange={(e) =>
                            setFieldValue("armLeftMuscleQualityStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armLeftMuscleQualityStatus &&
                            errors.armLeftMuscleQualityStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-armLeftBodyFat">
                        <NumberInput
                          label="Grasa Corporal"
                          value={values.armLeftBodyFat}
                          name="armLeftBodyFat"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("armLeftBodyFat", e)}
                          onBlur={handleBlur}
                          error={
                            touched.armLeftBodyFat && errors.armLeftBodyFat
                          }
                        />
                        <Select
                          name="armLeftBodyFatStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.armLeftBodyFatStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.armLeftBodyFatStatus}
                          onChange={(e) =>
                            setFieldValue("armLeftBodyFatStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.armLeftBodyFatStatus &&
                            errors.armLeftBodyFatStatus
                          }
                        />
                      </Group>
                    </Stack>
                  </Group>
                </Stack>

                <Stack mb={32}>
                  <Group id="legs" grow align="start" gap={24}>
                    <Stack
                      style={{
                        position: "sticky",
                        top: "32px",
                      }}
                    >
                      <Group wrap="nowrap">
                        <Title order={4}>Piernas</Title>
                        <Divider w="100%" />
                      </Group>
                      <Text size="sm" w="100%">
                        Lorem ipsum dolor sit amet consectetur. Amet arcu
                        gravida vitae varius posuere. Sit molestie proin mi
                        accumsan viverra tempus sed turpis felis. Tellus sed
                        nulla morbi facilisis euismod. Arcu ligula egestas eu
                        nisl nibh amet mauris quis urna. Etiam viverra leo risus
                        pretium dictum ultrices neque nunc et.
                      </Text>
                    </Stack>
                    <Stack gap={8}>
                      <Text size="sm" c="gray.6" fw="600">
                        Pierna Derecha
                      </Text>
                      <Group grow id="value-legRightMuscleMass">
                        <NumberInput
                          label="Masa Muscular"
                          value={values.legRightMuscleMass}
                          name="legRightMuscleMass"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("legRightMuscleMass", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legRightMuscleMass &&
                            errors.legRightMuscleMass
                          }
                        />
                        <Select
                          name="legRightMuscleMassStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.legRightMuscleMassStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.legRightMuscleMassStatus}
                          onChange={(e) =>
                            setFieldValue("legRightMuscleMassStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legRightMuscleMassStatus &&
                            errors.legRightMuscleMassStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-legRightMuscleQuality">
                        <NumberInput
                          label="Calidad del Músculo"
                          value={values.legRightMuscleQuality}
                          name="legRightMuscleQuality"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("legRightMuscleQuality", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legRightMuscleQuality &&
                            errors.legRightMuscleQuality
                          }
                        />
                        <Select
                          name="legRightMuscleQualityStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.legRightMuscleQualityStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.legRightMuscleQualityStatus}
                          onChange={(e) =>
                            setFieldValue("legRightMuscleQualityStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legRightMuscleQualityStatus &&
                            errors.legRightMuscleQualityStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-legRightBodyFat">
                        <NumberInput
                          label="Grasa Corporal"
                          value={values.legRightBodyFat}
                          name="legRightBodyFat"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("legRightBodyFat", e)}
                          onBlur={handleBlur}
                          error={
                            touched.legRightBodyFat && errors.legRightBodyFat
                          }
                        />
                        <Select
                          name="legRightBodyFatStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.legRightBodyFatStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.legRightBodyFatStatus}
                          onChange={(e) =>
                            setFieldValue("legRightBodyFatStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legRightBodyFatStatus &&
                            errors.legRightBodyFatStatus
                          }
                        />
                      </Group>

                      <Text size="sm" mt={24} c="gray.6" fw="600">
                        Pierna Izquierda
                      </Text>
                      <Group grow id="value-legLeftMuscleMass">
                        <NumberInput
                          label="Masa Muscular"
                          value={values.legLeftMuscleMass}
                          name="legLeftMuscleMass"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("legLeftMuscleMass", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legLeftMuscleMass &&
                            errors.legLeftMuscleMass
                          }
                        />
                        <Select
                          name="legLeftMuscleMassStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.legLeftMuscleMassStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.legLeftMuscleMassStatus}
                          onChange={(e) =>
                            setFieldValue("legLeftMuscleMassStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legLeftMuscleMassStatus &&
                            errors.legLeftMuscleMassStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-legLeftMuscleQuality">
                        <NumberInput
                          label="Calidad del Músculo"
                          value={values.legLeftMuscleQuality}
                          name="legLeftMuscleQuality"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("legLeftMuscleQuality", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legLeftMuscleQuality &&
                            errors.legLeftMuscleQuality
                          }
                        />
                        <Select
                          name="legLeftMuscleQualityStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.legLeftMuscleQualityStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.legLeftMuscleQualityStatus}
                          onChange={(e) =>
                            setFieldValue("legLeftMuscleQualityStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legLeftMuscleQualityStatus &&
                            errors.legLeftMuscleQualityStatus
                          }
                        />
                      </Group>
                      <Group grow id="value-legLeftBodyFat">
                        <NumberInput
                          label="Grasa Corporal"
                          value={values.legLeftBodyFat}
                          name="legLeftBodyFat"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={12}>
                              Kgs
                            </Text>
                          }
                          onChange={(e) => setFieldValue("legLeftBodyFat", e)}
                          onBlur={handleBlur}
                          error={
                            touched.legLeftBodyFat && errors.legLeftBodyFat
                          }
                        />
                        <Select
                          name="legLeftBodyFatStatus"
                          label="Estado"
                          withCheckIcon={false}
                          maw={150}
                          leftSection={
                            <Box
                              w={8}
                              h={8}
                              bg={
                                StatusColors[
                                  Number(values.legLeftBodyFatStatus) - 1
                                ]
                              }
                              style={{
                                borderRadius: "100%",
                              }}
                            ></Box>
                          }
                          renderOption={renderSelectOption}
                          data={StatusValues}
                          value={values.legLeftBodyFatStatus}
                          onChange={(e) =>
                            setFieldValue("legLeftBodyFatStatus", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.legLeftBodyFatStatus &&
                            errors.legLeftBodyFatStatus
                          }
                        />
                      </Group>
                    </Stack>
                  </Group>
                </Stack>

                <Stack mb={32}>
                  <Group id="circumferences" grow align="start" gap={24}>
                    <Stack
                      style={{
                        position: "sticky",
                        top: "32px",
                      }}
                    >
                      <Group wrap="nowrap">
                        <Title order={4}>Circunferencias</Title>
                        <Divider w="100%" />
                      </Group>
                      <Text size="sm" w="100%">
                        Lorem ipsum dolor sit amet consectetur. Amet arcu
                        gravida vitae varius posuere. Sit molestie proin mi
                        accumsan viverra tempus sed turpis felis. Tellus sed
                        nulla morbi facilisis euismod. Arcu ligula egestas eu
                        nisl nibh amet mauris quis urna. Etiam viverra leo risus
                        pretium dictum ultrices neque nunc et.
                      </Text>
                    </Stack>
                    <Stack gap={8}>
                      <Group grow id="value-circumferenceNeck">
                        <NumberInput
                          label="Cuello"
                          value={values.circumferenceNeck}
                          name="circumferenceNeck"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Cms
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("circumferenceNeck", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.circumferenceNeck &&
                            errors.circumferenceNeck
                          }
                        />
                      </Group>
                      <Group grow id="value-circumferenceChest">
                        <NumberInput
                          label="Pecho"
                          value={values.circumferenceChest}
                          name="circumferenceChest"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Cms
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("circumferenceChest", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.circumferenceChest &&
                            errors.circumferenceChest
                          }
                        />
                      </Group>
                      <Group grow id="value-circumferenceShoulders">
                        <NumberInput
                          label="Hombros"
                          value={values.circumferenceShoulders}
                          name="circumferenceShoulders"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Cms
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("circumferenceShoulders", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.circumferenceShoulders &&
                            errors.circumferenceShoulders
                          }
                        />
                      </Group>
                      <Group grow id="value-circumferenceArms">
                        <NumberInput
                          label="Brazo"
                          value={values.circumferenceArms}
                          name="circumferenceArms"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Cms
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("circumferenceArms", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.circumferenceArms &&
                            errors.circumferenceArms
                          }
                        />
                      </Group>
                      <Group grow id="value-circumferenceWaist">
                        <NumberInput
                          label="Cintura"
                          value={values.circumferenceWaist}
                          name="circumferenceWaist"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Cms
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("circumferenceWaist", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.circumferenceWaist &&
                            errors.circumferenceWaist
                          }
                        />
                      </Group>
                      <Group grow id="value-circumferenceHips">
                        <NumberInput
                          label="Cadera"
                          value={values.circumferenceHips}
                          name="circumferenceHips"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Cms
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("circumferenceHips", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.circumferenceHips &&
                            errors.circumferenceHips
                          }
                        />
                      </Group>
                      <Group grow id="value-circumferenceGlutes">
                        <NumberInput
                          label="Gluteos"
                          value={values.circumferenceGlutes}
                          name="circumferenceGlutes"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Cms
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("circumferenceGlutes", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.circumferenceGlutes &&
                            errors.circumferenceGlutes
                          }
                        />
                      </Group>
                      <Group grow id="value-circumferenceQuads">
                        <NumberInput
                          label="Cuadriceps"
                          value={values.circumferenceQuads}
                          name="circumferenceQuads"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Cms
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("circumferenceQuads", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.circumferenceQuads &&
                            errors.circumferenceQuads
                          }
                        />
                      </Group>
                      <Group grow id="value-circumferenceCalf">
                        <NumberInput
                          label="Pantorrilla"
                          value={values.circumferenceCalf}
                          name="circumferenceCalf"
                          maw="100%"
                          rightSection={
                            <Text c="gray.6" size="sm" fw={500} pr={18}>
                              Cms
                            </Text>
                          }
                          onChange={(e) =>
                            setFieldValue("circumferenceCalf", e)
                          }
                          onBlur={handleBlur}
                          error={
                            touched.circumferenceCalf &&
                            errors.circumferenceCalf
                          }
                        />
                      </Group>
                    </Stack>
                  </Group>
                </Stack>

                <Group justify="flex-end">
                  <Button variant="subtle" color="gray">
                    Volver
                  </Button>
                  <Button variant="filled" c="black" type="submit">
                    Agregar
                  </Button>
                </Group>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
