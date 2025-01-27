/*
 * Imna's super accurate weather forecast generator
 */
export const generateWeatherForecast = (): WeatherForecast => {
  const temperature = Math.floor(Math.random() * 50 - 10);

  const weatherConditions = [
    {
      type: "Sunny",
      template: `Bright sunshine will dominate the day with a high of ${temperature}°C.
                 UV levels will be moderate, making it ideal for outdoor activities.`,
    },
    {
      type: "Cloudy",
      template: `Overcast skies will persist throughout the day at ${temperature}°C.
                 While rain isn't expected, brief light drizzle might occur in the afternoon.`,
    },
    {
      type: "Raining",
      template: `Steady rainfall is forecast with temperatures around ${temperature}°C.
                 Umbrellas are recommended as precipitation may continue into the evening.`,
    },
    {
      type: "Snowing",
      template: `Heavy snowfall is expected today with temperatures near ${temperature}°C.
                 Roads may become slippery, and visibility could be reduced at times.`,
    },
  ];

  const randomCondition =
    weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

  const humidity = Math.floor(Math.random() * 81) + 20;

  const windSpeed = Math.floor(Math.random() * 51);

  return {
    condition: randomCondition.type as
      | "Sunny"
      | "Cloudy"
      | "Raining"
      | "Snowing",
    temperature,
    unit: "C",
    description: randomCondition.template,
    humidity,
    windSpeed,
  };
};
