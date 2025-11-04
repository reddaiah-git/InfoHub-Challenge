import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

console.log("✅ Weather key:", process.env.OPENWEATHER_API_KEY);

const app = express();
const PORT = 3001;

// ---------------- QUOTE API ----------------
const quotes = [
  "Innovation distinguishes between a leader and a follower.",
  "The best way to predict the future is to invent it.",
  "Simplicity is the ultimate sophistication.",
  "Move fast and break things.",
  "Creativity is intelligence having fun.",
];

app.get("/api/quote", (req, res) => {
  try {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: randomQuote });
  } catch (err) {
    console.error("Quote API error:", err.message);
    res.status(500).json({ error: "Could not fetch quote." });
  }
});

// ---------------- WEATHER API ----------------
app.get("/api/weather", async (req, res) => {
  try {
    const city = "London";
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const { data } = await axios.get(url);
    const simplified = {
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
    res.json(simplified);
  } catch (err) {
    console.error("Weather API error:", err.message);
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

// ---------------- CURRENCY API ----------------
app.get("/api/currency", async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 1;
    const apiKey = process.env.CURRENCY_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;

    const { data } = await axios.get(url);
    if (!data.conversion_rates) throw new Error("Invalid currency data");

    const usdRate = data.conversion_rates.USD;
    const eurRate = data.conversion_rates.EUR;

    res.json({
      usd: (amount * usdRate).toFixed(2),
      eur: (amount * eurRate).toFixed(2),
    });
  } catch (err) {
    console.error("Currency API error:", err.message);
    res.status(500).json({ error: "Could not fetch currency data." });
  }
});

// ---------------- SERVER ----------------
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
