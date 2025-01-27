import { DESTINATIONS } from "@/config/destinations";
import { generateWeatherForecast } from "@/lib/weather";
import { Cloud, CloudRain, Snowflake, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export interface WeatherWidgetProps {
  destinationCode: string;
}
export const WeatherWidget = ({ destinationCode }: WeatherWidgetProps) => {
  const destination =
    DESTINATIONS.find((d) => d.code === destinationCode) || DESTINATIONS[0];

  const [currentWeather, setCurrentWeather] = useState<WeatherForecast>();

  useEffect(() => {
    setCurrentWeather(generateWeatherForecast());
  }, [destination.code]);

  const getWeatherIcon = (
    condition?: "Sunny" | "Cloudy" | "Raining" | "Snowing",
  ) => {
    switch (condition) {
      case "Sunny":
        return <Sun className="w-8 h-8 text-yellow-400 animate-spin" />;
      case "Cloudy":
        return <Cloud className="w-8 h-8 text-gray-200" />;
      case "Raining":
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case "Snowing":
        return <Snowflake className="w-8 h-8 text-blue-200 animate-spin" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };
  return (
    <div className="bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
      <div className="backdrop-blur-xl w-full p-8 rounded-2xl grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">
            Weather today in{" "}
            <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {destination?.city}
            </span>
          </h1>
          <p className="text-lg opacity-90">{currentWeather?.description}</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-full">
              {getWeatherIcon(currentWeather?.condition)}
            </div>
            <div className="text-4xl font-bold">
              {currentWeather?.temperature}°C
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <div className="text-sm opacity-70 mb-1">Humidity</div>
              <div className="text-xl font-semibold">
                {currentWeather?.humidity}%
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <div className="text-sm opacity-70 mb-1">Wind</div>
              <div className="text-xl font-semibold">
                {currentWeather?.windSpeed}km/h
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
