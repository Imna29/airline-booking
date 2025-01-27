import { BookingFormValues } from "@/types/BookingFormSchema";
import { FlightDestination } from "@/types/FlightDestination";

/*
 * Imna's super sophisticated random booking form generator
 */
export const generateRandomBookingFormValues = (
  destinations: FlightDestination[],
): BookingFormValues => {
  if (destinations.length < 2) throw new Error("Need at least 2 destinations");

  // Pick distinct from/to
  const fromIndex = Math.floor(Math.random() * destinations.length);
  let toIndex = Math.floor(Math.random() * destinations.length);
  while (toIndex === fromIndex)
    toIndex = Math.floor(Math.random() * destinations.length);
  const from = destinations[fromIndex];
  const to = destinations[toIndex];

  // Generate departure date within next 30 days
  const departureDate = new Date();
  departureDate.setDate(
    departureDate.getDate() + Math.floor(Math.random() * 30) + 1,
  );

  const tripType = Math.random() < 0.5 ? "one-way" : ("round-trip" as const);

  // Generate return date if needed
  const returnDate =
    tripType === "round-trip"
      ? new Date(
          departureDate.getTime() +
            (Math.floor(Math.random() * 7) + 1) * 86400000,
        )
      : undefined;

  return {
    from: from.code,
    to: to.code,
    departureDate,
    tripType,
    returnDate,
    departureDay: departureDate.getDay(),
    returnDay: returnDate?.getDay(),
  };
};
