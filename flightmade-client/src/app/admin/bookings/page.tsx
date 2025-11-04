"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/AdminTable";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();

        const formatted = data.map((b: any) => ({
          ...b,
          pets: b.pets ? JSON.stringify(b.pets) : "",
          notes: b.notes || "",
          flight: b.flight ? b.flight.title || JSON.stringify(b.flight) : "",
        }));

        setBookings(formatted);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      <AdminTable
        columns={[
          "id",
          "name",
          "email",
          "phone",
          "concierge",
          "pets",
          "notes",
          "flight",
        ]}
        rows={bookings}
      />
    </div>
  );
}
