"use client";

import { useState } from "react";

// Minimal inline Button
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${props.className || ""}`}
    />
  );
}

// Minimal inline Input
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border rounded px-3 py-2 w-full ${props.className || ""}`}
    />
  );
}

export default function FlightSearchBar() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    console.log({ from, to, date });
    // later: redirect to /flights?from=X&to=Y&date=Z
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-4 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <Input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <Button onClick={handleSearch} className="w-full mt-4">
        Search Flights
      </Button>
    </div>
  );
}
