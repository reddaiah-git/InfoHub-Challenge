import { useEffect, useState } from "react";

export default function WeatherModule() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch("/api/weather");
        if (!res.ok) throw new Error("Failed to fetch weather data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (isLoading) return <p>Loading weather...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return null;

  return (
    <div>
      <h2>Weather</h2>
      <p>Location: {data.location}</p>
      <p>Temperature: {data.temperature}°C</p>
      <p>Condition: {data.description}</p>
    </div>
  );
}
