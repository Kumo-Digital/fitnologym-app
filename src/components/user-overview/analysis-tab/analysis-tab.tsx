import { Stack } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { useState } from "react";
import {
  getLabelColoBySection,
  metricsSelectOptions,
} from "@/utils/measurement";
import AnalysisTableFilters from "./analysis-table-filters";
import AnalysisTabSkeleton from "./analysis-tab-skeleton";
import { useMetrics } from "@/hooks/metrics";
import { useRouter } from "next/router";
import { Filters } from "@/types/analysis";

const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

const AnalysisTab = ({ user }: any) => {
  const { query } = useRouter();
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

  const { metrics, isLoading } = useMetrics(new URLSearchParams(searchParams));

  const handleFiltersChange = (filterValues: Filters) => {
    setFilters(filterValues);
  };

  if (isLoading) return <AnalysisTabSkeleton />;
  return (
    <Stack mt={32} gap={32}>
      <AnalysisTableFilters
        filters={filters}
        handleFiltersChange={handleFiltersChange}
      />
      <LineChart
        h={500}
        data={metrics.filtered_metrics}
        dataKey="date"
        unit={metrics.uom}
        curveType="natural"
        withLegend
        tooltipAnimationDuration={200}
        series={Object.keys(metrics.filtered_metrics[0])
          .filter((section) => section !== "date")
          .map((section) => ({
            name: section,
            color: getLabelColoBySection(section),
          }))}
      />
    </Stack>
  );
};

export default AnalysisTab;
