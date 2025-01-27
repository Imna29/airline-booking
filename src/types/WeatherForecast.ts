interface WeatherForecast {
  temperature: number;
  unit: "C";
  condition: "Sunny" | "Cloudy" | "Raining" | "Snowing";
  description: string;
  humidity: number;
  windSpeed: number;
}
