import { useState } from "react";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";

export default function App() {
  const [activeTab, setActiveTab] = useState("Weather");

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>InfoHub</h1>

      {/* Tabs */}
      <div style={{ marginBottom: "1rem" }}>
        {["Weather", "Currency", "Quote"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              margin: "0 0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: activeTab === tab ? "2px solid #333" : "1px solid #ccc",
              background: activeTab === tab ? "#e0e0e0" : "#fff",
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditional Rendering */}
      {activeTab === "Weather" && <WeatherModule />}
      {activeTab === "Currency" && <CurrencyConverter />}
      {activeTab === "Quote" && <QuoteGenerator />}
    </div>
  );
}
