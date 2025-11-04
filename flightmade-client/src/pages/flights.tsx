// "use client";

// import FlightCard from "@/components/FlightCard";

// type FlightProps = {
//   id: number;
//   aircraft: string;
//   from: string;
//   to: string;
//   datetime: string;
//   price: number; // number type now
//   status: "available" | "limited" | "soldout";
//   imageUrl: string;
// };

// const flights: (FlightProps & { date: string; dealQuality: "Excellent" | "Good" | "Fair" })[] = [
//   {
//     id: 1,
//     aircraft: "Gulfstream G650",
//     from: "London (LHR)",
//     to: "New York (JFK)",
//     datetime: "2025-09-12 14:30",
//     price: 45000,
//     status: "available",
//     imageUrl: "/aircraft1.png",
//     date: "2025-09-12",
//     dealQuality: "Excellent",
//   },
//   {
//     id: 2,
//     aircraft: "Bombardier Global 7500",
//     from: "Paris (CDG)",
//     to: "Dubai (DXB)",
//     datetime: "2025-09-14 09:00",
//     price: 52000,
//     status: "limited",
//     imageUrl: "/aircraft2.png",
//     date: "2025-09-14",
//     dealQuality: "Good",
//   },
//   {
//     id: 3,
//     aircraft: "Cessna Citation X",
//     from: "Los Angeles (LAX)",
//     to: "Miami (MIA)",
//     datetime: "2025-09-15 07:45",
//     price: 28000,
//     status: "soldout",
//     imageUrl: "/aircraft3.png",
//     date: "2025-09-15",
//     dealQuality: "Fair",
//   },
// ];

// export default function FlightsPage() {
//   return (
//     <section className="relative bg-gradient-to-b from-blue-50 via-white to-indigo-100 min-h-screen py-16">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Page Header */}
//         <div className="text-center mb-14">
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//             ✈️ Available Empty Leg Flights
//           </h1>
//           <p className="text-lg text-gray-700 max-w-2xl mx-auto">
//             Book exclusive private jet routes at unbeatable prices.{" "}
//             <span className="font-semibold text-indigo-600">Limited availability</span> — secure your seat today.
//           </p>
//         </div>

//         {/* Flight Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {flights.map((flight) => {
//             // Status color
//             const statusColor =
//               flight.status === "available"
//                 ? "bg-green-100 text-green-700"
//                 : flight.status === "limited"
//                 ? "bg-yellow-100 text-yellow-700"
//                 : "bg-red-100 text-red-700";

//             return (
//               <div
//                 key={flight.id}
//                 className="transform transition-all duration-300 hover:scale-[1.04] hover:-translate-y-2 hover:shadow-xl rounded-2xl"
//               >
//                 <div className={`rounded-2xl border-2 ${statusColor} border-opacity-50`}>
//                   <FlightCard {...flight} />
//                   <div className={`absolute top-4 right-4 px-3 py-1 rounded-full font-semibold text-sm ${statusColor}`}>
//                     {flight.status.toUpperCase()}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import FlightCard from "@/components/FlightCard";

type FlightProps = {
  id: number;
  aircraft: string;
  from: string;
  to: string;
  datetime: string;
  price: number;
  status: "available" | "limited" | "soldout";
  imageUrl: string;
};

export default function FlightsPage() {
  const [flights, setFlights] = useState<FlightProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      const res = await fetch("/api/flights");
      if (res.ok) {
        const data = await res.json();
        setFlights(data);
      }
      setLoading(false);
    };
    fetchFlights();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading flights...</p>;
  }

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-indigo-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ✈️ Available Empty Leg Flights
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Book exclusive private jet routes at unbeatable prices.{" "}
            <span className="font-semibold text-indigo-600">Limited availability</span> — secure your seat today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {flights.map((flight) => {
            const statusColor =
              flight.status === "available"
                ? "bg-green-100 text-green-700"
                : flight.status === "limited"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

            return (
              <div
                key={flight.id}
                className="transform transition-all duration-300 hover:scale-[1.04] hover:-translate-y-2 hover:shadow-xl rounded-2xl"
              >
                <div className={`rounded-2xl border-2 ${statusColor} border-opacity-50 relative`}>
                  <FlightCard {...flight} />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full font-semibold text-sm ${statusColor}`}>
                    {flight.status.toUpperCase()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
