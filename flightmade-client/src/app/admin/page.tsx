"use client";

import { useEffect, useState } from "react";

type Stats = {
  flights: number;
  inquiries: number;
  bookings: number;
  subscriptions: number;
  messages: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
        {stats &&
          Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white shadow rounded-xl p-6 text-center text-black"
            >
              <h2 className="text-xl font-semibold capitalize">{key}</h2>
              <p className="text-3xl font-bold">{value}</p>
            </div>
          ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/flights"
          className="bg-white shadow rounded-xl p-6 hover:bg-gray-50 text-black"
        >
          ✈️ Manage Flights
        </a>
        <a
          href="/admin/inquiries"
          className="bg-white shadow rounded-xl p-6 hover:bg-gray-50 text-black"
        >
          📩 View Inquiries
        </a>
        <a
          href="/admin/bookings"
          className="bg-white shadow rounded-xl p-6 hover:bg-gray-50 text-black"
        >
          📝 Bookings
        </a>
        <a
          href="/admin/subscriptions"
          className="bg-white shadow rounded-xl p-6 hover:bg-gray-50 text-black"
        >
          📧 Subscriptions
        </a>
        <a
          href="/admin/messages"
          className="bg-white shadow rounded-xl p-6 hover:bg-gray-50 text-black"
        >
          💬 Contact Messages
        </a>
      </div>
    </div>
  );
}
