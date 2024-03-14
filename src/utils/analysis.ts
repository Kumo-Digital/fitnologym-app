export function getLastDayOfMonth(year: any, month: any) {
  const date = new Date(year, month + 1, 0);
  
  return date.getDate();
}