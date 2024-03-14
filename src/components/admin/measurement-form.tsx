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
import { Formik, Form, FormikHelpers, FastField } from "formik";
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
        // validateOnChange={false}
        onSubmit={async (
          values: any,
          { setSubmitting }: FormikHelpers<any>
        ) => {
          console.log("values", values);
          return;

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
                      <FastField
                        name="user_id"
                        placeholder="Nombre del cliente"
                      >
                        {({ field, form, meta }: any) => (
                          <Select
                            {...field}
                            // name="user_id"
                            label="Cliente"
                            // placeholder="Nombre del cliente"
                            searchable
                            withCheckIcon={false}
                            data={users}
                            value={meta.value}
                            onChange={(e) => form.setFieldValue("user_id", e)}
                            onBlur={form.handleBlur}
                            error={meta.touched && meta.error}
                          />
                        )}
                      </FastField>

                      <FastField
                        name="report_url"
                        placeholder="Enlace al reporte..."
                      >
                        {({ field, form, meta }: any) => (
                          <TextInput
                            {...field}
                            // name="report_url"
                            label="Devolución"
                            description="Link al reporte en Google Drive o Google Docs/Excel, etc..."
                            // placeholder="Enlace al reporte..."
                            value={meta.value}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={meta.touched && meta.error}
                          />
                        )}
                      </FastField>
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
                        <FastField name="weight" placeholder="Peso">
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="weight"
                              label="Peso"
                              // placeholder="Peso"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) => form.setFieldValue("weight", e)}
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField name="weightStatus" placeholder="Estado">
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="weightStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("weightStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-bmi">
                        <FastField name="bmi" placeholder="BMI">
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="bmi"
                              label="BMI"
                              // placeholder="BMI"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              onChange={(e) => form.setFieldValue("bmi", e)}
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField name="bmiStatus" placeholder="Estado">
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="bmiStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("bmiStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-bodyFat">
                        <FastField name="bodyFat" placeholder="Grasa Corporal">
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="bodyFat"
                              label="Grasa Corporal"
                              // placeholder="Grasa Corporal"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) => form.setFieldValue("bodyFat", e)}
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField name="bodyFatStatus" placeholder="Estado">
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="bodyFatStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("bodyFatStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-viscFat">
                        <FastField name="viscFat" placeholder="Grasa Visceral">
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="viscFat"
                              label="Grasa Visceral"
                              // placeholder="Grasa Visceral"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              onChange={(e) => form.setFieldValue("viscFat", e)}
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField name="viscFatStatus" placeholder="Estado">
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="viscFatStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("viscFatStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-muscleMass">
                        <FastField
                          name="muscleMass"
                          placeholder="Masa Muscular"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="muscleMass"
                              label="Masa Muscular"
                              // placeholder="Masa Muscular"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("muscleMass", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField name="muscleMassStatus" placeholder="Estado">
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="muscleMassStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("muscleMassStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-boneMass">
                        <FastField name="boneMass" placeholder="Masa Ósea">
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="boneMass"
                              label="Masa Ósea"
                              // placeholder="Masa Ósea"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("boneMass", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField name="boneMassStatus" placeholder="Estado">
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="boneMassStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("boneMassStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-bmr">
                        <FastField
                          name="bmr"
                          placeholder="Tasa Metabólica Basal"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="bmr"
                              label="Tasa Metabólica Basal"
                              // placeholder="Tasa Metabólica Basal"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kcal
                                </Text>
                              }
                              onChange={(e) => form.setFieldValue("bmr", e)}
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField name="bmrStatus" placeholder="Estado">
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="bmrStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("bmrStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-metabAge">
                        <FastField
                          name="metabAge"
                          placeholder="Edad Metabólica"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="metabAge"
                              label="Edad Metabólica"
                              // placeholder="Edad Metabólica"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              onChange={(e) =>
                                form.setFieldValue("metabAge", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField name="metabAgeStatus" placeholder="Estado">
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="metabAgeStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("metabAgeStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-bodyWater">
                        <FastField name="bodyWater" placeholder="Agua Corporal">
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="bodyWater"
                              label="Agua Corporal"
                              // placeholder="Agua Corporal"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Lts
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("bodyWater", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField name="bodyWaterStatus" placeholder="Estado">
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="bodyWaterStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("bodyWaterStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-muscleQuality">
                        <FastField
                          name="muscleQuality"
                          placeholder="Calidad del Músculo"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="muscleQuality"
                              label="Calidad del Músculo"
                              // placeholder="Calidad del Músculo"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("muscleQuality", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="muscleQualityStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="muscleQualityStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("muscleQualityStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-physiqueRating">
                        <FastField
                          name="physiqueRating"
                          placeholder="Rating Físico"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="physiqueRating"
                              label="Rating Físico"
                              // placeholder="Rating Físico"
                              value={meta.value}
                              maw="100%"
                              min={0}
                              onChange={(e) =>
                                form.setFieldValue("physiqueRating", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="physiqueRatingStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="physiqueRatingStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("physiqueRatingStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
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
                        <FastField
                          name="trunkMuscleMass"
                          placeholder="Masa Muscular"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="trunkMuscleMass"
                              label="Masa Muscular"
                              // placeholder="Masa Muscular"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("trunkMuscleMass", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="trunkMuscleMassStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="trunkMuscleMassStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("trunkMuscleMassStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-trunkMuscleQuality">
                        <FastField
                          name="trunkMuscleQuality"
                          placeholder="Calidad del Músculo"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="trunkMuscleQuality"
                              label="Calidad del Músculo"
                              // placeholder="Calidad del Músculo"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("trunkMuscleQuality", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="trunkMuscleQualityStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="trunkMuscleQualityStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  "trunkMuscleQualityStatus",
                                  e
                                )
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-trunkBodyFat">
                        <FastField
                          name="trunkBodyFat"
                          placeholder="Grasa Corporal"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="trunkBodyFat"
                              label="Grasa Corporal"
                              // placeholder="Grasa Corporal"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("trunkBodyFat", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="trunkBodyFatStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="trunkBodyFatStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("trunkBodyFatStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
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
                        <FastField
                          name="armRightMuscleMass"
                          placeholder="Masa Muscular"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="armRightMuscleMass"
                              label="Masa Muscular"
                              // placeholder="Masa Muscular"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("armRightMuscleMass", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="armRightMuscleMassStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="armRightMuscleMassStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  "armRightMuscleMassStatus",
                                  e
                                )
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-armRightMuscleQuality">
                        <FastField
                          name="armRightMuscleQuality"
                          placeholder="Calidad del Músculo"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="armRightMuscleQuality"
                              label="Calidad del Músculo"
                              // placeholder="Calidad del Músculo"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("armRightMuscleQuality", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="armRightMuscleQualityStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="armRightMuscleQualityStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  "armRightMuscleQualityStatus",
                                  e
                                )
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-armRightBodyFat">
                        <FastField
                          name="armRightBodyFat"
                          placeholder="Grasa Corporal"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="armRightBodyFat"
                              label="Grasa Corporal"
                              // placeholder="Grasa Corporal"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("armRightBodyFat", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="armRightBodyFatStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="armRightBodyFatStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("armRightBodyFatStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>

                      <Text size="sm" mt={24} c="gray.6" fw="600">
                        Brazo Izquierdo
                      </Text>
                      <Group grow id="value-armLeftMuscleMass">
                        <FastField
                          name="armLeftMuscleMass"
                          placeholder="Masa Muscular"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="armLeftMuscleMass"
                              label="Masa Muscular"
                              // placeholder="Masa Muscular"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("armLeftMuscleMass", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="armLeftMuscleMassStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="armLeftMuscleMassStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("armLeftMuscleMassStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-armLeftMuscleQuality">
                        <FastField
                          name="armLeftMuscleQuality"
                          placeholder="Calidad del Músculo"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="armLeftMuscleQuality"
                              label="Calidad del Músculo"
                              // placeholder="Calidad del Músculo"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("armLeftMuscleQuality", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="armLeftMuscleQualityStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="armLeftMuscleQualityStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  "armLeftMuscleQualityStatus",
                                  e
                                )
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-armLeftBodyFat">
                        <FastField
                          name="armLeftBodyFat"
                          placeholder="Grasa Corporal"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="armLeftBodyFat"
                              label="Grasa Corporal"
                              // placeholder="Grasa Corporal"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("armLeftBodyFat", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="armLeftBodyFatStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="armLeftBodyFatStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("armLeftBodyFatStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
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
                        <FastField
                          name="legRightMuscleMass"
                          placeholder="Masa Muscular"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="legRightMuscleMass"
                              label="Masa Muscular"
                              // placeholder="Masa Muscular"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("legRightMuscleMass", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="legRightMuscleMassStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="legRightMuscleMassStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  "legRightMuscleMassStatus",
                                  e
                                )
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-legRightMuscleQuality">
                        <FastField
                          name="legRightMuscleQuality"
                          placeholder="Calidad del Músculo"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="legRightMuscleQuality"
                              label="Calidad del Músculo"
                              // placeholder="Calidad del Músculo"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("legRightMuscleQuality", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="legRightMuscleQualityStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="legRightMuscleQualityStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  "legRightMuscleQualityStatus",
                                  e
                                )
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-legRightBodyFat">
                        <FastField
                          name="legRightBodyFat"
                          placeholder="Grasa Corporal"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="legRightBodyFat"
                              label="Grasa Corporal"
                              // placeholder="Grasa Corporal"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("legRightBodyFat", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="legRightBodyFatStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="legRightBodyFatStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("legRightBodyFatStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>

                      <Text size="sm" mt={24} c="gray.6" fw="600">
                        Pierna Izquierda
                      </Text>
                      <Group grow id="value-legLeftMuscleMass">
                        <FastField
                          name="legLeftMuscleMass"
                          placeholder="Masa Muscular"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="legLeftMuscleMass"
                              label="Masa Muscular"
                              // placeholder="Masa Muscular"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("legLeftMuscleMass", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="legLeftMuscleMassStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="legLeftMuscleMassStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("legLeftMuscleMassStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-legLeftMuscleQuality">
                        <FastField
                          name="legLeftMuscleQuality"
                          placeholder="Calidad del Músculo"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="legLeftMuscleQuality"
                              label="Calidad del Músculo"
                              // placeholder="Calidad del Músculo"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("legLeftMuscleQuality", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="legLeftMuscleQualityStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="legLeftMuscleQualityStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  "legLeftMuscleQualityStatus",
                                  e
                                )
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-legLeftBodyFat">
                        <FastField
                          name="legLeftBodyFat"
                          placeholder="Grasa Corporal"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="legLeftBodyFat"
                              label="Grasa Corporal"
                              // placeholder="Grasa Corporal"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={12}>
                                  Kgs
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("legLeftBodyFat", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                        <FastField
                          name="legLeftBodyFatStatus"
                          placeholder="Estado"
                        >
                          {({ field, form, meta }: any) => (
                            <Select
                              {...field}
                              // name="legLeftBodyFatStatus"
                              label="Estado"
                              // placeholder="Estado"
                              withCheckIcon={false}
                              maw={150}
                              leftSection={
                                <Box
                                  w={8}
                                  h={8}
                                  bg={StatusColors[Number(meta.value) - 1]}
                                  style={{
                                    borderRadius: "100%",
                                  }}
                                ></Box>
                              }
                              renderOption={renderSelectOption}
                              data={StatusValues}
                              value={meta.value}
                              onChange={(e) =>
                                form.setFieldValue("legLeftBodyFatStatus", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
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
                        <FastField
                          name="circumferenceNeck"
                          placeholder="Cuello"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="circumferenceNeck"
                              label="Cuello"
                              // placeholder="Cuello"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={18}>
                                  Cms
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("circumferenceNeck", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-circumferenceChest">
                        <FastField
                          name="circumferenceChest"
                          placeholder="Pecho"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="circumferenceChest"
                              label="Pecho"
                              // placeholder="Pecho"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={18}>
                                  Cms
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("circumferenceChest", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-circumferenceShoulders">
                        <FastField
                          name="circumferenceShoulders"
                          placeholder="Hombros"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="circumferenceShoulders"
                              label="Hombros"
                              // placeholder="Hombros"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={18}>
                                  Cms
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("circumferenceShoulders", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-circumferenceArms">
                        <FastField
                          name="circumferenceArms"
                          placeholder="Brazos"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="circumferenceArms"
                              label="Brazos"
                              // placeholder="Brazos"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={18}>
                                  Cms
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("circumferenceArms", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-circumferenceWaist">
                        <FastField
                          name="circumferenceWaist"
                          placeholder="Cintura"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="circumferenceWaist"
                              label="Cintura"
                              // placeholder="Cintura"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={18}>
                                  Cms
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("circumferenceWaist", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-circumferenceHips">
                        <FastField
                          name="circumferenceHips"
                          placeholder="Cadera"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="circumferenceHips"
                              label="Cadera"
                              // placeholder="Cadera"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={18}>
                                  Cms
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("circumferenceHips", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-circumferenceGlutes">
                        <FastField
                          name="circumferenceGlutes"
                          placeholder="Glúteos"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="circumferenceGlutes"
                              label="Glúteos"
                              // placeholder="Glúteos"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={18}>
                                  Cms
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("circumferenceGlutes", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-circumferenceQuads">
                        <FastField
                          name="circumferenceQuads"
                          placeholder="Cuádriceps"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="circumferenceQuads"
                              label="Cuádriceps"
                              // placeholder="Cuádriceps"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={18}>
                                  Cms
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("circumferenceQuads", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
                      </Group>
                      <Group grow id="value-circumferenceCalf">
                        <FastField
                          name="circumferenceCalf"
                          placeholder="Pantorrillas"
                        >
                          {({ field, form, meta }: any) => (
                            <NumberInput
                              {...field}
                              // name="circumferenceCalf"
                              label="Pantorrillas"
                              // placeholder="Pantorrillas"
                              value={meta.value}
                              maw="100%"
                              rightSection={
                                <Text c="gray.6" size="sm" fw={500} pr={18}>
                                  Cms
                                </Text>
                              }
                              onChange={(e) =>
                                form.setFieldValue("circumferenceCalf", e)
                              }
                              onBlur={form.handleBlur}
                              error={meta.touched && meta.error}
                            />
                          )}
                        </FastField>
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
