import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ QUOTE API
app.get("/api/quote", (req, res) => {
  const quotes = [
    "Innovation distinguishes between a leader and a follower.",
    "The best way to predict the future is to create it.",
    "Ideas are easy. Implementation is hard.",
    "Change is the end result of all true learning.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

// ✅ WEATHER API
app.get("/api/weather", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    res.json({
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    });
  } catch (err) {
    console.error("Weather API error:", err.message);
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

// ✅ CURRENCY API
app.get("/api/currency", async (req, res) => {
  const amount = req.query.amount || 1;

  try {
    const { data } = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/INR`
    );

    const usd = (amount * data.conversion_rates.USD).toFixed(2);
    const eur = (amount * data.conversion_rates.EUR).toFixed(2);

    res.json({ usd, eur });
  } catch (err) {
    console.error("Currency API error:", err.message);
    res.status(500).json({ error: "Could not fetch currency data." });
  }
});

// ❌ No app.listen() — Vercel handles this automatically
export default app;
