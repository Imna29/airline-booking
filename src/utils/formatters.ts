import { format } from "date-fns";

/*
 * Formats a date object into a string
 */
export const formatFlightDate = (date?: Date): string | null => {
  return date ? format(date, "yyyy-MM-dd") : null;
};

/*
 * Formats a date object into a string for My Trips display
 */
export const formatDisplayDate = (date: Date): string =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);

/*
 * Parses a date string into a Date object
 */
export const parseDate = (dateStr: string | null): Date | undefined => {
  if (!dateStr) return undefined;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? undefined : date;
};
