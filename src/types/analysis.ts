import { IMeasurement } from "@/db/interfaces/IMeasurement";

export type Filters = { metric: string; dateRange: [Date, Date] };

export interface AnalysisTableFiltersProps {
  filters: Filters;
  handleFiltersChange: (filterValues: any) => void;
  firstMeasure: IMeasurement;
  lastMeasure: IMeasurement;
}
