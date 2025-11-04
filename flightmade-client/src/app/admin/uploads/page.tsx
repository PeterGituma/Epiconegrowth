"use client";
import { useState } from "react";

export default function UploadPage() {
  const [flights, setFlights] = useState<any[]>([]);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/emails", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.flights) {
      setFlights(data.flights);
    }
  };

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">Upload Operator Email</h1>
      <form onSubmit={handleUpload} className="mb-6">
        <input type="file" name="file" className="mb-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload & Parse
        </button>
      </form>

      {flights.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Parsed Flights</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(flights, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
