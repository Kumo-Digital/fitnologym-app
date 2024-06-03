import { Form, Formik } from "formik";
import { Box, Button, Group, Select, SelectProps, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  getCategoryColoBySection,
  metricsSelectOptions,
} from "@/utils/measurement";
import { AnalysisTableFiltersProps } from "@/types/analysis";
import { analysisFilterFormValidationSchema } from "@/utils/analysis";

const renderSelectOption: SelectProps["renderOption"] = ({
  option,
}: {
  option: any;
}) => (
  <Group flex="1" gap="xs" grow>
    <Text size="sm">{option.label}</Text>
    <Group>
      {option.sections.map((section: string, index: number) => (
        <Box
          key={`${section}-${index}`}
          w={8}
          h={8}
          bg={getCategoryColoBySection(section)}
          style={{
            borderRadius: "100%",
          }}
        ></Box>
      ))}
    </Group>
  </Group>
);

const AnalysisTableFilters = ({
  filters,
  handleFiltersChange,
  firstMeasure,
  lastMeasure,
}: AnalysisTableFiltersProps) => {
  return (
    <Formik
      initialValues={filters}
      validationSchema={analysisFilterFormValidationSchema}
      onSubmit={(values): void => {
        handleFiltersChange(values);
      }}
    >
      {({
        values,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
        handleBlur,
        touched,
        errors,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Group align="stretch">
              <Select
                name="metric"
                data={metricsSelectOptions}
                onBlur={handleBlur}
                allowDeselect={false}
                label="Métrica"
                value={values.metric}
                renderOption={renderSelectOption}
                error={touched.metric && errors.metric}
                onChange={(value) => {
                  setFieldValue("metric", value);
                  setFieldTouched("metric", true);
                }}
                miw={300}
              />
              <MonthPickerInput
                name="dateRange"
                type="range"
                allowSingleDateInRange={false}
                label="Periodo"
                value={values.dateRange}
                onBlur={() => setFieldTouched("dateRange", true)}
                error={
                  touched.dateRange &&
                  errors.dateRange !== undefined &&
                  "Debe seleccionar 2 meses"
                }
                minDate={
                  firstMeasure?.date ? new Date(firstMeasure.date) : undefined
                }
                maxDate={lastMeasure.date}
                onChange={(e) => {
                  setFieldValue("dateRange", e);
                }}
                miw={300}
              />
              <Button c="black" type="submit" mt={24}>
                Filtrar
              </Button>
            </Group>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AnalysisTableFilters;
