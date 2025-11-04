"use client";

import { useEffect, useState } from "react";

const currencies = ["USD", "EUR", "GBP", "CAD"];

export default function CurrencySwitcher({ amountUSD = 0 }: { amountUSD?: number }) {
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("https://api.exchangerate.host/latest?base=USD");
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.error("Failed to fetch exchange rates:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  function convert(priceUSD: number) {
    if (!rates || !rates[currency]) return priceUSD; // 👈 guard clause
    return priceUSD * rates[currency];
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-semibold">Currency:</label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border rounded-lg px-2 py-1"
      >
        {currencies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Example usage */}
      {!loading && rates && (
        <p className="ml-4 text-sm">
          ${amountUSD} → {convert(amountUSD).toFixed(2)} {currency}
        </p>
      )}
    </div>
  );
}
