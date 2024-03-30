export const parseDate = (date: string) =>
  new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const parseNameToInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

export const getFirstName = (name: string) => name.split(" ")[0];
