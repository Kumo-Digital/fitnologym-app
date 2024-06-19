import {
  useUniqueFirstMeasure,
  useUniqueLastMeasure,
} from "@/hooks/measurements";
import { useMetrics } from "@/hooks/metrics";
import { Filters } from "@/types/analysis";
import {
  getLabelColoBySection,
  metricsSelectOptions,
  prepareMeasurementForDisplay,
} from "@/utils/measurement";
import { AreaChart } from "@mantine/charts";
import { Stack, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AnalysisTabSkeleton from "./analysis-tab-skeleton";
import AnalysisTableFilters from "./analysis-table-filters";

const twoMonthsAgo = new Date();
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

const AnalysisTab = () => {
  const { query } = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  const { firstMeasure, isLoading: isFirstMeasureLoading } =
    useUniqueFirstMeasure(query.userId as string);

  const { lastMeasure, isLoading: isLastMeasureLoading } = useUniqueLastMeasure(
    query.userId as string
  );

  const [filters, setFilters] = useState({
    metric: metricsSelectOptions[0].value,
    dateRange: [
      firstMeasure ? new Date(firstMeasure.date) : twoMonthsAgo,
      lastMeasure ? new Date(lastMeasure.date) : new Date(),
    ] as [Date, Date],
  });

  useEffect(() => {
    if (firstMeasure && lastMeasure) {
      setFilters({
        ...filters,
        dateRange: [
          new Date(firstMeasure.date),
          new Date(lastMeasure.date),
        ] as [Date, Date],
      });
    }
  }, [firstMeasure, lastMeasure]);

  const searchParams: Record<string, string> = {
    userId: query.userId as string,
    metric: filters.metric,
    startMonth: filters.dateRange[0]?.toISOString(),
    endMonth: filters.dateRange[1]?.toISOString(),
  };
  const { metrics, isLoading } = useMetrics(new URLSearchParams(searchParams));

  const handleFiltersChange = (filterValues: Filters) => {
    setFilters(filterValues);
  };

  const filteredMetrics = prepareMeasurementForDisplay(metrics);

  if (
    isLoading ||
    isFirstMeasureLoading ||
    isLastMeasureLoading ||
    filteredMetrics.length === 0
  ) {
    return <AnalysisTabSkeleton />;
  }
  return (
    <Stack mt={32} gap={32}>
      <AnalysisTableFilters
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        firstMeasure={firstMeasure}
        lastMeasure={lastMeasure}
      />
      <AreaChart
        h={500}
        data={filteredMetrics}
        dataKey="date"
        unit={metrics?.uom}
        curveType="natural"
        tooltipAnimationDuration={200}
        withLegend
        withGradient={false}
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
