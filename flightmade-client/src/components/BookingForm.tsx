"use client";

import { useState } from "react";
import CurrencySwitcher from "@/components/CurrencySwitcher"; // 👈 currency dropdown

// Styled components
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-700 to-indigo-900 text-white font-semibold shadow-md hover:from-indigo-800 hover:to-black transition duration-300 ${
        props.className || ""
      }`}
    />
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none text-black placeholder-black ${
        props.className || ""
      }`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none text-black placeholder-black ${
        props.className || ""
      }`}
    />
  );
}

export default function BookingForm() {
  const [concierge, setConcierge] = useState(false);
  const [conciergePercent, setConciergePercent] = useState(10); // Default 10%
  const [petsNumber, setPetsNumber] = useState("");
  const [petsSize, setPetsSize] = useState("");
  const [petsSpecial, setPetsSpecial] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [meals, setMeals] = useState("");
  const [budget, setBudget] = useState(""); // 👈 budget field

  // --- Handle Submit (saves to backend) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      name,
      email,
      phone,
      budget,
      concierge,
      conciergePercent: concierge ? conciergePercent : 0,
      pets: {
        number: petsNumber,
        size: petsSize,
        specialRequirements: petsSpecial,
      },
      meals,
      notes,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();
      if (res.ok) {
        alert("✅ Booking confirmed!");
        console.log(result.booking);
      } else {
        alert("❌ " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-900">
        Future Booking Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          rows={1}
        />

        <Textarea
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          rows={1}
        />

        <Textarea
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rows={1}
        />

        {/* Budget + Currency Switcher */}
        <div>
          <label className="block text-gray-900 font-medium mb-2">
            Your Budget
          </label>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Enter amount"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-1/2"
            />
            <CurrencySwitcher /> {/* 👈 currency dropdown */}
          </div>
        </div>

        {/* Concierge Option */}
        <div>
          <label className="flex items-center gap-2 mb-1 text-gray-900 font-medium">
            <input
              type="checkbox"
              checked={concierge}
              onChange={() => setConcierge(!concierge)}
              className="accent-indigo-700"
            />
            Add Concierge Service
          </label>
          {concierge && (
            <div className="mt-2 flex items-center gap-2">
              <label className="text-gray-700 text-sm">
                Service Fee (% of flight cost):
              </label>
              <Input
                type="number"
                min={1}
                max={50}
                value={conciergePercent}
                onChange={(e) => setConciergePercent(Number(e.target.value))}
                className="w-24"
              />
            </div>
          )}
        </div>

        {/* Pet Details */}
        <div className="space-y-2">
          <label className="block text-gray-900 font-medium">Pet Details</label>
          <Input
            type="number"
            min={0}
            placeholder="Number of pets"
            value={petsNumber}
            onChange={(e) => setPetsNumber(e.target.value)}
          />
          <Input
            placeholder="Size of pets (e.g. Small, Medium, Large)"
            value={petsSize}
            onChange={(e) => setPetsSize(e.target.value)}
          />
          <Textarea
            placeholder="Special requirements for pets"
            value={petsSpecial}
            onChange={(e) => setPetsSpecial(e.target.value)}
            rows={2}
          />
        </div>

        <Textarea
          placeholder="Special requirements for meals/Drinks"
          value={meals}
          onChange={(e) => setMeals(e.target.value)}
          rows={3}
        />

        {/* Notes */}
        <Textarea
          placeholder="Notes for crew"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />

        <Button type="submit">Confirm Booking</Button>
      </form>
    </div>
  );
}
