"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FlightDestination } from "@/types/FlightDestination";
import { format } from "date-fns";
import { parseDate } from "@/utils/formatters";
import { createBookingFormSchema } from "@/types/BookingFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

/*
 * Custom hook to manage the airline booking form state
 */
export const useAirlineForm = (
  destinations: FlightDestination[],
  onDestinationChange?: (code: string) => void,
) => {
  //Get the initial values from the URL query params if they are set
  const searchParams = useSearchParams();
  const initialFrom = searchParams.get("origin") || "";
  const initialTo = searchParams.get("destination") || "";
  const initialTripType = searchParams.get("type") || "one-way";
  const initialDepartureDate = parseDate(searchParams.get("departureDate"));
  const initialReturnDate = parseDate(searchParams.get("returnDate"));

  const flightFormSchema = createBookingFormSchema(destinations);
  const form = useForm({
    resolver: zodResolver(flightFormSchema),
    defaultValues: {
      from: initialFrom,
      to: initialTo,
      tripType: initialTripType as "one-way" | "round-trip",
      departureDate: initialDepartureDate,
      returnDate: initialReturnDate,
      departureDay: initialDepartureDate?.getDay(),
      returnDay: initialReturnDate?.getDay(),
    },
  });

  const { watch } = form;
  const from = watch("from");
  const to = watch("to");
  const tripType = watch("tripType");
  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");

  useEffect(() => {
    //pass data to parent component
    onDestinationChange?.(to);
  }, [to, onDestinationChange]);

  //watch changes to the formand update the url query params
  useEffect(() => {
    const params = new URLSearchParams();
    if (from) params.set("origin", from);
    if (to) params.set("destination", to);
    params.set("type", tripType);
    if (departureDate) {
      params.set("departureDate", format(departureDate, "yyyy-MM-dd"));
    }
    if (tripType === "round-trip" && returnDate) {
      params.set("returnDate", format(returnDate, "yyyy-MM-dd"));
    } else {
      params.delete("returnDate");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [from, to, tripType, departureDate, returnDate, form]);

  return form;
};
