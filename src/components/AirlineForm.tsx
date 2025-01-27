"use client";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FlightDestination } from "@/types/FlightDestination";
import { DatePickerField } from "./DatePickerField";
import { CitySelect } from "./CitySelect";
import { useAirlineForm } from "@/hooks/useAirlineForm";
import { Button } from "./ui/button";
import { submitBookingForm } from "@/actions/booking";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { Wind } from "lucide-react";

export interface AirlineFormProps {
  destinations: FlightDestination[];
  onDestinationChange?: (destinationCode: string) => void;
}

export const AirlineForm = ({
  destinations,
  onDestinationChange,
}: AirlineFormProps) => {
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    status: string;
    timestamp: string;
    bookingId: string;
  } | null>(null);
  const form = useAirlineForm(destinations, onDestinationChange);

  const { watch, handleSubmit, control, getValues, formState, reset } = form;
  const from = watch("from");
  const to = watch("to");
  const tripType = watch("tripType");

  const onSubmit = async (data: any) => {
    try {
      const response = await submitBookingForm(data);

      //Set data to display in success dialog
      setSubmittedData(response);
      setIsSuccessDialogOpen(true);

      //Reset url query and form in case user wants to book another flight
      window.history.replaceState({}, "", "/");
      reset();
    } catch (err) {
      setIsErrorDialogOpen(true);
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl shadow-md min-w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trip type */}
            <FormField
              control={control}
              name="tripType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="one-way" />
                      </FormControl>
                      <Label>One Way</Label>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="round-trip" />
                      </FormControl>
                      <Label>Round Trip</Label>
                    </FormItem>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>

            {/* From selector */}
            <CitySelect
              control={control}
              name="from"
              label="From"
              placeholder="Select departure"
              excludedCode={to}
              destinations={destinations}
            />

            {/* To selector */}
            <CitySelect
              control={control}
              name="to"
              label="To"
              placeholder="Select arrival"
              excludedCode={from}
              destinations={destinations}
            />

            {/* Departure date picker */}
            <DatePickerField
              control={control}
              name="departureDate"
              label="Departure Date"
              disabledDays={(date) => {
                const city = destinations.find((d) => d.code === from);
                const today = new Date();
                return (
                  !city?.availableWeekdays.includes(date.getDay()) ||
                  date < new Date(today.setHours(0, 0, 0, 0))
                );
              }}
            />
            {/* Return date picker if round trip is selected */}
            {tripType === "round-trip" && (
              <DatePickerField
                control={control}
                name="returnDate"
                label="Return Date"
                disabledDays={(date) => {
                  const city = destinations.find((d) => d.code === to);
                  const departureDate = getValues("departureDate");
                  return (
                    !city?.availableWeekdays.includes(date.getDay()) ||
                    date <= departureDate!
                  );
                }}
              />
            )}
          </div>

          <div className="flex ">
            <Button
              type="submit"
              className="mx-auto bg-blue-600 hover:bg-blue-700 text-white"
              disabled={formState.isSubmitting}
            >
              Book Flight
            </Button>
          </div>
        </form>
      </Form>
      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🎉 Booking Successful!</DialogTitle>
            <DialogDescription className="pt-4">
              {submittedData && (
                <div className="space-y-2">
                  <p>
                    <strong>Status:</strong> {submittedData.status}
                  </p>
                  <p>
                    <strong>Booking ID:</strong> {submittedData.bookingId}
                  </p>
                  <p>
                    <strong>Timestamp:</strong>{" "}
                    {format(new Date(submittedData.timestamp), "PPpp")}
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>⚠️ Booking Error</DialogTitle>
            <DialogDescription className="pt-4">
              There was an error processing your booking. Please try again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setIsErrorDialogOpen(false)}
              variant="destructive"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
