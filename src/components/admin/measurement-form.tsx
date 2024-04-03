import { User, UserItem } from "@/types/user";
import {
  StatusColors,
  StatusValues,
  measurementFormInitialValues,
} from "@/utils/admin";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  NumberInput,
  Select,
  SelectProps,
  Stack,
  Text,
  TextInput,
  Title,
  em,
} from "@mantine/core";
import { Formik, Form, FormikHelpers, FastField } from "formik";
import { until } from "@open-draft/until";
import { useRouter } from "next/router";
import { appUrls } from "@/lib/appUrls";
import {
  measurementFormValidationSchema,
  prepareMeasurementForEditForm,
} from "@/utils/measurement";
import { notifications } from "@mantine/notifications";
import { createMeasurement, updateMeasurement } from "@/services/measurements";
import { DateInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";

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

export default function MeasurementForm({
  user,
  users,
  measurement,
}: {
  user?: User | undefined;
  users?: UserItem[] | undefined;
  measurement?: any;
}) {
  const { push, query } = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);
  const initialValuesForEdit = prepareMeasurementForEditForm(measurement);

  const userSelectData = [
    {
      value: user?._id,
      label: user?.fullname,
    },
  ];

  return (
    <Formik
      initialValues={initialValuesForEdit ?? measurementFormInitialValues}
      enableReinitialize={true}
      validationSchema={measurementFormValidationSchema}
      onSubmit={async (values: any, { setSubmitting }: FormikHelpers<any>) => {
        const { error } = await until(() =>
          !measurement
            ? createMeasurement(values)
            : updateMeasurement({ ...values, _id: measurement?._id })
        );

        if (error) {
          console.error(error);
          setSubmitting(false);
          notifications.show({
            color: "red",
            title: "Error",
            message: "Ha ocurrido un error al intentar añadir la medida.",
          });
          return;
        }

        push({
          pathname: appUrls.admin,
          query: { tab: "measurements" },
        });
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
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
                <Flex
                  id="report"
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "stretch" : "start"}
                  gap={24}
                >
                  <Stack
                    style={{
                      position: "sticky",
                      top: "32px",
                      zIndex: 100,
                    }}
                    bg={"dark.7"}
                    flex={"1 0 0"}
                  >
                    <Group wrap="nowrap">
                      <Title order={4}>Reporte</Title>
                      <Divider w="100%" />
                    </Group>
                    <Text size="sm" w="100%">
                      Lorem ipsum dolor sit amet consectetur. Amet arcu gravida
                      vitae varius posuere. Sit molestie proin mi accumsan
                      viverra tempus sed turpis felis. Tellus sed nulla morbi
                      facilisis euismod. Arcu ligula egestas eu nisl nibh amet
                      mauris quis urna. Etiam viverra leo risus pretium dictum
                      ultrices neque nunc et.
                    </Text>
                  </Stack>
                  <Stack id="value-user" flex={"1 0 0"}>
                    <FastField name="user_id" placeholder="Nombre del cliente">
                      {({ field, form, meta }: any) => (
                        <Select
                          {...field}
                          label="Cliente"
                          searchable
                          withCheckIcon={false}
                          allowDeselect={false}
                          data={!measurement ? users : userSelectData}
                          value={!query.userId ? meta.value : query.userId}
                          onChange={(e) => form.setFieldValue("user_id", e)}
                          onBlur={form.handleBlur}
                          error={meta.touched && meta.error}
                          disabled={measurement || query.userId}
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
                          label="Devolución"
                          description="Link al reporte en Google Drive o Google Docs/Excel, etc..."
                          value={meta.value}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          error={meta.touched && meta.error}
                        />
                      )}
                    </FastField>

                    <FastField name="date">
                      {({ field, form, meta }: any) => (
                        <DateInput
                          {...field}
                          value={meta.value}
                          onChange={(e) => form.setFieldValue("date", e)}
                          onBlur={form.handleBlur}
                          error={meta.touched && meta.error}
                          label="Fecha de Medición"
                          maxDate={new Date()}
                          valueFormat="DD, MMM YYYY"
                          placeholder="Fecha de medición"
                        />
                      )}
                    </FastField>
                  </Stack>
                </Flex>
              </Stack>

              <Stack mb={32}>
                <Flex
                  id="general"
                  gap={24}
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "stretch" : "start"}
                >
                  <Stack
                    style={{
                      position: "sticky",
                      top: "32px",
                      zIndex: 100,
                    }}
                    bg={"dark.7"}
                    flex={"1 0 0"}
                  >
                    <Group wrap="nowrap">
                      <Title order={4}>Generales</Title>
                      <Divider w="100%" />
                    </Group>
                    <Text size="sm" w="100%">
                      Lorem ipsum dolor sit amet consectetur. Amet arcu gravida
                      vitae varius posuere. Sit molestie proin mi accumsan
                      viverra tempus sed turpis felis. Tellus sed nulla morbi
                      facilisis euismod. Arcu ligula egestas eu nisl nibh amet
                      mauris quis urna. Etiam viverra leo risus pretium dictum
                      ultrices neque nunc et.
                    </Text>
                  </Stack>
                  <Stack flex={"1 0 0"}>
                    <Group grow id="value-weight">
                      <FastField name="weight" placeholder="Peso">
                        {({ field, form, meta }: any) => (
                          <NumberInput
                            {...field}
                            label="Peso"
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="BMI"
                            value={meta.value}
                            maw="100%"
                            min={0}
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                u
                              </Text>
                            }
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            onChange={(e) => form.setFieldValue("bmiStatus", e)}
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
                            label="Grasa Corporal"
                            value={meta.value}
                            maw="100%"
                            min={0}
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                %
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Grasa Visceral"
                            value={meta.value}
                            maw="100%"
                            min={0}
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                u
                              </Text>
                            }
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                      <FastField name="muscleMass" placeholder="Masa Muscular">
                        {({ field, form, meta }: any) => (
                          <NumberInput
                            {...field}
                            label="Masa Muscular"
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Masa Ósea"
                            value={meta.value}
                            maw="100%"
                            min={0}
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                Kgs
                              </Text>
                            }
                            onChange={(e) => form.setFieldValue("boneMass", e)}
                            onBlur={form.handleBlur}
                            error={meta.touched && meta.error}
                          />
                        )}
                      </FastField>
                      <FastField name="boneMassStatus" placeholder="Estado">
                        {({ field, form, meta }: any) => (
                          <Select
                            {...field}
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                      <FastField name="bmr" placeholder="Tasa Metabólica Basal">
                        {({ field, form, meta }: any) => (
                          <NumberInput
                            {...field}
                            label="Tasa Metabólica Basal"
                            value={meta.value}
                            maw="100%"
                            min={0}
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                Kcals
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            onChange={(e) => form.setFieldValue("bmrStatus", e)}
                            onBlur={form.handleBlur}
                            error={meta.touched && meta.error}
                          />
                        )}
                      </FastField>
                    </Group>
                    <Group grow id="value-metabAge">
                      <FastField name="metabAge" placeholder="Edad Metabólica">
                        {({ field, form, meta }: any) => (
                          <NumberInput
                            {...field}
                            label="Edad Metabólica"
                            value={meta.value}
                            maw="100%"
                            min={0}
                            onChange={(e) => form.setFieldValue("metabAge", e)}
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                Años
                              </Text>
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Agua Corporal"
                            value={meta.value}
                            maw="100%"
                            min={0}
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                Lts
                              </Text>
                            }
                            onChange={(e) => form.setFieldValue("bodyWater", e)}
                            onBlur={form.handleBlur}
                            error={meta.touched && meta.error}
                          />
                        )}
                      </FastField>
                      <FastField name="bodyWaterStatus" placeholder="Estado">
                        {({ field, form, meta }: any) => (
                          <Select
                            {...field}
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Calidad del Músculo"
                            value={meta.value}
                            maw="100%"
                            min={0}
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                u
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Rating Físico"
                            value={meta.value}
                            maw="100%"
                            min={0}
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                u
                              </Text>
                            }
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                </Flex>
              </Stack>

              <Stack mb={32}>
                <Flex
                  id="trunk"
                  gap={24}
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "stretch" : "start"}
                >
                  <Stack
                    style={{
                      position: "sticky",
                      top: "32px",
                      zIndex: 100,
                    }}
                    bg={"dark.7"}
                    flex={"1 0 0"}
                  >
                    <Group wrap="nowrap">
                      <Title order={4}>Torso</Title>
                      <Divider w="100%" />
                    </Group>
                    <Text size="sm" w="100%">
                      Lorem ipsum dolor sit amet consectetur. Amet arcu gravida
                      vitae varius posuere. Sit molestie proin mi accumsan
                      viverra tempus sed turpis felis. Tellus sed nulla morbi
                      facilisis euismod. Arcu ligula egestas eu nisl nibh amet
                      mauris quis urna. Etiam viverra leo risus pretium dictum
                      ultrices neque nunc et.
                    </Text>
                  </Stack>
                  <Stack flex={"1 0 0"}>
                    <Group grow id="value-trunkMuscleMass">
                      <FastField
                        name="trunkMuscleMass"
                        placeholder="Masa Muscular"
                      >
                        {({ field, form, meta }: any) => (
                          <NumberInput
                            {...field}
                            label="Masa Muscular"
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Calidad del Músculo"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                u
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                              form.setFieldValue("trunkMuscleQualityStatus", e)
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
                            label="Grasa Corporal"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                %
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
                      <FastField name="trunkBodyFatStatus" placeholder="Estado">
                        {({ field, form, meta }: any) => (
                          <Select
                            {...field}
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                </Flex>
              </Stack>

              <Stack mb={32}>
                <Flex
                  id="arms"
                  gap={24}
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "stretch" : "start"}
                >
                  <Stack
                    style={{
                      position: "sticky",
                      top: "32px",
                      zIndex: 100,
                    }}
                    bg={"dark.7"}
                    flex={"1 0 0"}
                  >
                    <Group wrap="nowrap">
                      <Title order={4}>Brazos</Title>
                      <Divider w="100%" />
                    </Group>
                    <Text size="sm" w="100%">
                      Lorem ipsum dolor sit amet consectetur. Amet arcu gravida
                      vitae varius posuere. Sit molestie proin mi accumsan
                      viverra tempus sed turpis felis. Tellus sed nulla morbi
                      facilisis euismod. Arcu ligula egestas eu nisl nibh amet
                      mauris quis urna. Etiam viverra leo risus pretium dictum
                      ultrices neque nunc et.
                    </Text>
                  </Stack>
                  <Stack gap={8} flex={"1 0 0"}>
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
                            label="Masa Muscular"
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                              form.setFieldValue("armRightMuscleMassStatus", e)
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
                            label="Calidad del Músculo"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                u
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Grasa Corporal"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                %
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Masa Muscular"
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Calidad del Músculo"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                u
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Grasa Corporal"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                %
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                </Flex>
              </Stack>

              <Stack mb={32}>
                <Flex
                  id="legs"
                  gap={24}
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "stretch" : "start"}
                >
                  <Stack
                    style={{
                      position: "sticky",
                      top: "32px",
                      zIndex: 100,
                    }}
                    bg={"dark.7"}
                    flex={"1 0 0"}
                  >
                    <Group wrap="nowrap">
                      <Title order={4}>Piernas</Title>
                      <Divider w="100%" />
                    </Group>
                    <Text size="sm" w="100%">
                      Lorem ipsum dolor sit amet consectetur. Amet arcu gravida
                      vitae varius posuere. Sit molestie proin mi accumsan
                      viverra tempus sed turpis felis. Tellus sed nulla morbi
                      facilisis euismod. Arcu ligula egestas eu nisl nibh amet
                      mauris quis urna. Etiam viverra leo risus pretium dictum
                      ultrices neque nunc et.
                    </Text>
                  </Stack>
                  <Stack gap={8} flex={"1 0 0"}>
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
                            label="Masa Muscular"
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                              form.setFieldValue("legRightMuscleMassStatus", e)
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
                            label="Calidad del Músculo"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                u
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Grasa Corporal"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                %
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Masa Muscular"
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Calidad del Músculo"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                u
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                            label="Grasa Corporal"
                            value={meta.value}
                            maw="100%"
                            rightSection={
                              <Text c="gray.6" size="sm" fw={500} pr={12}>
                                %
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
                            label="Estado"
                            withCheckIcon={false}
                            maw={150}
                            allowDeselect={false}
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
                </Flex>
              </Stack>

              <Stack mb={32}>
                <Flex
                  id="circumferences"
                  gap={24}
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "stretch" : "start"}
                >
                  <Stack
                    style={{
                      position: "sticky",
                      top: "32px",
                      zIndex: 100,
                    }}
                    bg={"dark.7"}
                    flex={"1 0 0"}
                  >
                    <Group wrap="nowrap">
                      <Title order={4}>Circunferencias</Title>
                      <Divider w="100%" />
                    </Group>
                    <Text size="sm" w="100%">
                      Lorem ipsum dolor sit amet consectetur. Amet arcu gravida
                      vitae varius posuere. Sit molestie proin mi accumsan
                      viverra tempus sed turpis felis. Tellus sed nulla morbi
                      facilisis euismod. Arcu ligula egestas eu nisl nibh amet
                      mauris quis urna. Etiam viverra leo risus pretium dictum
                      ultrices neque nunc et.
                    </Text>
                  </Stack>
                  <Stack gap={8} flex={"1 0 0"}>
                    <Group grow id="value-circumferenceNeck">
                      <FastField name="circumferenceNeck" placeholder="Cuello">
                        {({ field, form, meta }: any) => (
                          <NumberInput
                            {...field}
                            label="Cuello"
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
                      <FastField name="circumferenceChest" placeholder="Pecho">
                        {({ field, form, meta }: any) => (
                          <NumberInput
                            {...field}
                            label="Pecho"
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
                            label="Hombros"
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
                      <FastField name="circumferenceArms" placeholder="Brazos">
                        {({ field, form, meta }: any) => (
                          <NumberInput
                            {...field}
                            label="Brazos"
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
                            label="Cintura"
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
                      <FastField name="circumferenceHips" placeholder="Cadera">
                        {({ field, form, meta }: any) => (
                          <NumberInput
                            {...field}
                            label="Cadera"
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
                            label="Glúteos"
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
                            label="Cuádriceps"
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
                            label="Pantorrillas"
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
                </Flex>
              </Stack>

              <Group justify="flex-end">
                <Button variant="subtle" color="gray" disabled={isSubmitting}>
                  Volver
                </Button>
                <Button
                  variant="filled"
                  c="black"
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {!measurement ? "Agregar" : "Editar"}
                </Button>
              </Group>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}
