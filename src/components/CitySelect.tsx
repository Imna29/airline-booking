import { FlightDestination } from "@/types/FlightDestination";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const CitySelect = ({
  control,
  name,
  label,
  placeholder,
  excludedCode,
  destinations,
}: {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  excludedCode?: string;
  destinations: FlightDestination[];
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {destinations
              .filter((d) => d.code !== excludedCode)
              .map((d) => (
                <SelectItem key={d.code} value={d.code}>
                  {d.city} ({d.code}) - {d.airportName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
