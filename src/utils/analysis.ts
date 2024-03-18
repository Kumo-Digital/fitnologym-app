import * as Yup from "yup";


export function getLastDayOfMonth(year: any, month: any) {
  const date = new Date(year, month + 1, 0);
  
  return date.getDate();
}

export const analysisFilterFormValidationSchema = Yup.object().shape({
  metric: Yup.string().required('La métrica es obligatoria'),
  dateRange: Yup.array()
  .of(
    Yup.string().nonNullable('Debe seleccionar 2 meses')
  )
  .min(2)
  .max(2)
  .required('Debe seleccionar 2 meses'),
});