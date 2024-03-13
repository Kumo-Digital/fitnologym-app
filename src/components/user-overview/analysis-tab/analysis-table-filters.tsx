import { Formik } from "formik";
import { Box, Group, Select, SelectProps, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  getLabelColoBySection,
  metricsSelectOptions,
} from "@/utils/measurement";
import { AnalysisTableFiltersProps } from "@/types/analysis";

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
          bg={getLabelColoBySection(section)}
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
}: AnalysisTableFiltersProps) => {
  return (
    <Formik
      initialValues={filters}
      onSubmit={(values): void => {
        handleFiltersChange(values);
      }}
    >
      {({ values, setFieldValue, setFieldTouched, submitForm }) => (
        <Group>
          <Select
            name="metric"
            data={metricsSelectOptions}
            label="Métrica"
            value={values.metric}
            renderOption={renderSelectOption}
            onChange={(value) => {
              setFieldValue("metric", value);
              setFieldTouched("metric", true);
              submitForm();
            }}
            miw={300}
          />
          <MonthPickerInput
            type="range"
            label="Periodo"
            value={values.dateRange}
            maxDate={new Date()}
            onChange={(e) => {
              setFieldValue("dateRange", e);
              setFieldTouched("dateRange", true);
              submitForm();
            }}
            miw={300}
          />
        </Group>
      )}
    </Formik>
  );
};

export default AnalysisTableFilters;
