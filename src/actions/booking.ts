"use server";
import { DESTINATIONS } from "@/config/destinations";
import {
  BookingFormValues,
  createBookingFormSchema,
} from "@/types/BookingFormSchema";

export const submitBookingForm = async (data: BookingFormValues) => {
  const API_URL = process.env.API_URL;
  const AUTH_KEY = process.env.AUTH_KEY;

  if (API_URL === undefined || AUTH_KEY === undefined) {
    throw new Error("API_URL or AUTH_KEY not defined");
  }
  console.log(data.returnDate?.getDate());
  console.log(data.returnDate?.getDay());

  //Server-side data validation
  const bookingSchema = createBookingFormSchema(DESTINATIONS);
  const dataToSend = bookingSchema.parse(data);

  if (dataToSend === undefined) {
    throw new Error("Data validation failed");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-key": AUTH_KEY,
    },
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    throw new Error("Failed to submit booking form");
  }

  return response.json();
};
