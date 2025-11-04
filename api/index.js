import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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
  } catch {
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

// same for currency + quote routes...

export default app;
