import { useEffect, useState } from "react";

export default function QuoteGenerator() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch("/api/quote");
        if (!res.ok) throw new Error("Failed to fetch quote");
        const result = await res.json();
        setData(result.quote);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (isLoading) return <p>Loading quote...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return null;

  return (
    <div>
      <h2>Quote Generator</h2>
      <blockquote>"{data}"</blockquote>
    </div>
  );
}
