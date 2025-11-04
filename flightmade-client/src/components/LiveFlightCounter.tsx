"use client";

import { useState, useEffect } from "react";

export default function LiveFlightCounter() {
  const [count, setCount] = useState(10); // mock starting number

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 2)); // simulate increase
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-6 - text-black">
      <h2 className="text-3xl font-bold">Flights Booked</h2>
      <p className="text-5xl font-extrabold text-blue-600 mt-2">{count}</p>
    </div>
  );
}


