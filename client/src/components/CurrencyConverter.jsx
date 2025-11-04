import { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrency = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch("/api/currency?amount=100");
        if (!res.ok) throw new Error("Failed to fetch currency data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  if (isLoading) return <p>Loading currency data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return null;

  return (
    <div>
      <h2>Currency Converter</h2>
      <p>100 INR = {data.usd} USD</p>
      <p>100 INR = {data.eur} EUR</p>
    </div>
  );
}
