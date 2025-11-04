"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [count, setCount] = useState<number>(0);

  // Fetch live flight "count"
  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/flights/count");
        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error("Failed to fetch flight count:", err);
      }
    }

    fetchCount();

    // Refresh every 10s
    const interval = setInterval(fetchCount, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle search form
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = `/flights?from=${encodeURIComponent(
      from
    )}&to=${encodeURIComponent(to)}`;
  }

  return (
    <section className="relative flex flex-col items-center justify-center h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/privatejet video.mp4"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          className="brightness-75"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-4">
        <Image
          src="/flightmade-logo.png"
          alt="FlightMade Logo"
          width={200}
          height={50}
          className="mb-6"
        />

        {/* Title */}
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-4 drop-shadow-lg">
          Experience Private Jet Empty Leg Marketplace
        </h1>
        <p className="text-white text-lg md:text-2xl text-center mb-8 max-w-2xl drop-shadow">
          Discover exclusive empty leg flights. Transparent pricing. Effortless booking.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mb-4"
        >
          <input
            type="text"
            placeholder="Departure"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border border-white/60 bg-white/80 rounded-lg px-4 py-2 flex-1 text-black placeholder-gray-500"
          />
          <span className="self-center text-white text-xl">→</span>
          <input
            type="text"
            placeholder="Arrival"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border border-white/60 bg-white/80 rounded-lg px-4 py-2 flex-1 text-black placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white rounded-lg px-6 py-2 font-semibold hover:from-[#334155] hover:to-[#1e293b] transition"
          >
            Search
          </button>
        </form>

        {/* View All Flights */}
        <Link href="/flights">
          <button className="bg-white/90 text-black rounded-lg px-6 py-2 font-semibold hover:bg-white/80 transition mb-2">
            View All Flights
          </button>
        </Link>

        {/* Live Flight Counter */}
        <div className="flex items-center gap-2 text-white font-semibold mt-2">
          <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
          LIVE:{" "}
          <span className="text-green-300">
            {count} {count === 1 ? "flight" : "flights"}
          </span>
        </div>
      </div>
    </section>
  );
}
