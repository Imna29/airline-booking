import { z } from "zod";
import { FlightDestination } from "./FlightDestination";

export const createBookingFormSchema = (destinations: FlightDestination[]) => {
  // Helper functions
  const isValidAirportCode = (code: string) =>
    destinations.some((d) => d.code === code);

  const isFutureOrToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(date, today);
    return date >= today;
  };

  const isAirportAvailable = (date: Date, airportCode: string): boolean => {
    const airport = destinations.find((d) => d.code === airportCode);
    return airport?.availableWeekdays.includes(date.getDay()) ?? false;
  };

  // Base schema
  const baseSchema = z.object({
    from: z
      .string()
      .nonempty("Origin is required")
      .refine(isValidAirportCode, "Invalid origin code"),

    to: z
      .string()
      .nonempty("Destination is required")
      .refine(isValidAirportCode, "Invalid destination code"),

    tripType: z.enum(["one-way", "round-trip"]),

    departureDate: z.coerce
      .date({
        invalid_type_error: "Invalid departure date",
        required_error: "Departure date is required",
      })
      .refine(isFutureOrToday, "Departure date must be today or in the future"),

    returnDate: z.coerce
      .date()
      .optional()
      .refine((value) => {
        if (!value) return true;
        return isFutureOrToday(value);
      }, "Return date must be today or in the future"),
  });

  // Additional validation rules
  return baseSchema.superRefine((data, ctx) => {
    // Validate different destinations
    if (data.from === data.to) {
      ctx.addIssue({
        message: "Destinations must be different",
        code: z.ZodIssueCode.custom,
        path: ["from"],
      });
    }

    // Validate departure airport availability
    if (!isAirportAvailable(data.departureDate, data.from)) {
      ctx.addIssue({
        message: "Airport is not available on this day",
        code: "invalid_date",
        path: ["departureDate"],
      });
    }

    // Round-trip specific validations
    if (data.tripType === "round-trip") {
      // Validate return date existence
      if (!data.returnDate) {
        ctx.addIssue({
          message: "Return date is required for round-trip flights",
          code: "invalid_date",
          path: ["returnDate"],
        });
        return;
      }

      // Validate return date is after departure
      if (data.returnDate && data.returnDate < data.departureDate) {
        ctx.addIssue({
          message: "Return date must be after departure date",
          code: "invalid_date",
          path: ["returnDate"],
        });
      }

      // Validate return airport availability
      if (data.returnDate && !isAirportAvailable(data.returnDate, data.to)) {
        ctx.addIssue({
          message: "Airport is not available on this day",
          code: "invalid_date",
          path: ["returnDate"],
        });
      }
    }
  });
};

export type BookingFormValues = z.infer<
  ReturnType<typeof createBookingFormSchema>
>;
