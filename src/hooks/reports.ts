import useSWR from "swr";
import { apiUrls } from "@/lib/apiUrls";
import { apiFetcher } from "@/utils/apiUtils";
import { ReportEntry } from "@/types/measurements";

const formatDateName = (date: string) => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const useUniqueReports = (id: string, name: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.measurements.getAllMeasurementsByUser(id),
    apiFetcher
  );

  const reports: ReportEntry[] = data?.map((report: any) => ({
    name: `${name}-${report.date.split("T")[0]}`,
    date: formatDateName(report.date),
    report_url: report.report_url ? report.report_url : null,
  }));

  return {
    reports,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
