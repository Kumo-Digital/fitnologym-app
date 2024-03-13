export type Filters = { metric: string; dateRange: [Date, Date] };

export interface AnalysisTableFiltersProps {
  filters: Filters;
  handleFiltersChange: (filterValues: any) => void;
}
