// src/app/admin/flights/page.tsx
"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/AdminTable";

export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/flights")
      .then((res) => res.json())
      .then((data) => setFlights(data.flights || []));
  }, []);

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">Flights</h1>
      <AdminTable
        columns={[
          "id",
          "aircraft",
          "origin",
          "destination",
          "departure",
          "price",
          "currency",
        ]}
        rows={flights}
      />
    </div>
  );
}
