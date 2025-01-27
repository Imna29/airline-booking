import { DESTINATIONS } from "@/config/destinations";
import { generateRandomBookingFormValues } from "@/lib/trips";
import { BookingFormValues } from "@/types/BookingFormSchema";
import { formatDisplayDate } from "@/utils/formatters";
import { ArrowRight, CalendarDays, Plane } from "lucide-react";
import { useEffect } from "react";

export const MyTrips = () => {
  const trips: BookingFormValues[] = [];

  for (let i = 0; i < 3; i++) {
    trips.push(generateRandomBookingFormValues(DESTINATIONS));
  }

  return (
    <div className="p-4 space-y-4 bg-background rounded-lg">
      {/* Loop through trips and display info */}
      {trips.map((trip) => (
        <div
          key={trip.departureDate.toISOString()}
          className="p-4 bg-white rounded-lg border-2 border-gray-200 shadow hover:border-blue-100 transition-colors"
        >
          {/* Route */}
          <div className="flex items-center gap-3 mb-3">
            <span className="font-medium text-gray-900">{trip.from}</span>
            <ArrowRight className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-900">{trip.to}</span>
            <span className="ml-auto text-sm px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
              {trip.tripType}
            </span>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays className="w-4 h-4" />
            <span>{formatDisplayDate(trip.departureDate)}</span>
            {trip.returnDate && (
              <>
                <span className="mx-1">–</span>
                <span>{formatDisplayDate(trip.returnDate)}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
