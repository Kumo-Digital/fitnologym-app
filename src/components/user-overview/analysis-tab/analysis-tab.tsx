import { Stack, em } from "@mantine/core";
import { AreaChart, LineChart } from "@mantine/charts";
import { use, useState } from "react";
import {
  getLabelColoBySection,
  metricsSelectOptions,
  prepareMeasurementForDisplay,
} from "@/utils/measurement";
import AnalysisTableFilters from "./analysis-table-filters";
import AnalysisTabSkeleton from "./analysis-tab-skeleton";
import { useMetrics } from "@/hooks/metrics";
import { useRouter } from "next/router";
import { Filters } from "@/types/analysis";
import { useUniqueFirstMeasure } from "@/hooks/measurements";
import { useMediaQuery } from "@mantine/hooks";

const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

const AnalysisTab = ({ user }: any) => {
  const { query } = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);
  const [filters, setFilters] = useState({
    metric: metricsSelectOptions[0].value,
    dateRange: [oneMonthAgo, new Date()] as [Date, Date],
  });

  const searchParams: any = {
    userId: query.userId || undefined,
    metric: filters.metric || undefined,
    startMonth: filters.dateRange[0]?.toISOString() || undefined,
    endMonth: filters.dateRange[1]?.toISOString() || undefined,
  };

  const { firstMeasure, isLoading: isFirstMeasureLoading } =
    useUniqueFirstMeasure(query.userId as string);
  const { metrics, isLoading } = useMetrics(new URLSearchParams(searchParams));

  const handleFiltersChange = (filterValues: Filters) => {
    setFilters(filterValues);
  };

  console.log(metrics, "metrics");

  const filteredMetrics = prepareMeasurementForDisplay(metrics);

  if (isLoading || isFirstMeasureLoading) return <AnalysisTabSkeleton />;
  return (
    <Stack mt={32} gap={32}>
      <AnalysisTableFilters
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        firstMeasure={firstMeasure}
      />
      <AreaChart
        h={500}
        data={filteredMetrics}
        dataKey="date"
        unit={metrics.uom}
        curveType="natural"
        tooltipAnimationDuration={200}
        withLegend
        legendProps={{ height: isMobile ? 100 : 50 }}
        series={
          filteredMetrics
            ? Object.keys(filteredMetrics[0])
                .filter((section) => section !== "date")
                .map((section) => ({
                  name: section,
                  color: getLabelColoBySection(section),
                }))
            : []
        }
      />
    </Stack>
  );
};

export default AnalysisTab;
