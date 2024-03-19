export interface Measurement {
  _id: string;
  user_id: string;
  date: string;
  report_url?: string;
  createdAt: string;
  updatedAt: string;
  metrics: any;
}

export interface ReportEntry {
  name: string;
  date: string;
  report_url: string | null;
}

export interface Metrics {
  uom: string;
  filtered_metrics: Record<string, number | string>[];
}
