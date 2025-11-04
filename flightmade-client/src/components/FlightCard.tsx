

// // "use client";

// // import { Sacramento } from "next/font/google";
// // import { useState } from "react";

// // // Reusable Button
// // function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
// //   return (
// //     <button
// //       {...props}
// //       className={`px-5 py-2 rounded-xl font-semibold transition-colors duration-200 ${
// //         props.className || "bg-blue-600 text-white hover:bg-blue-700"
// //       }`}
// //     />
// //   );
// // }

// // type FlightCardProps = {
// //   aircraft: string;
// //   from: string;
// //   to: string;
// //   date: string;
// //   price: number;
// //   dealQuality: "good" | "ok" | "bad";
// // };

// // export default function FlightCard({
// //   aircraft,
// //   from,
// //   to,
// //   date,
// //   price,
// //   dealQuality,
// // }: FlightCardProps) {
// //   const [showModal, setShowModal] = useState(false);
// //   const [concierge, setConcierge] = useState(false);

// //   // Pet states
// //   const [petsNumber, setPetsNumber] = useState("");
// //   const [petsSize, setPetsSize] = useState("");
// //   const [petsSpecial, setPetsSpecial] = useState("");

// //   // Notes states
// //   const [mealNotes, setMealNotes] = useState("");
// //   const [crewNotes, setCrewNotes] = useState("");

// //   const color =
// //     dealQuality === "good"
// //       ? "bg-green-500"
// //       : dealQuality === "ok"
// //       ? "bg-yellow-500"
// //       : "bg-red-500";

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();

// //     // ✅ Alert with thank you note
// //     alert(
// //       `✅ Thank you for booking!\n\n` +
// //         `✈️ Flight: ${aircraft} from ${from} → ${to} on ${date}\n` +
// //         `💷 Price: £${price}\n\n` +
// //         `Our team will contact you soon!`
// //     );

// //     // close modal after booking
// //     setShowModal(false);

// //     // reset form
// //     setConcierge(false);
// //     setPetsNumber("");
// //     setPetsSize("");
// //     setPetsSpecial("");
// //     setMealNotes("");
// //     setCrewNotes("");
// //   };

// //   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
// //     if (e.target === e.currentTarget) setShowModal(false);
// //   };

// //   return (
// //     <>
// //       <div className="bg-white shadow-lg space-y-6 rounded-3xl p-5 flex flex-col gap-3 transition-transform hover:scale-105">
// //         <h3 className="text-xl font-bold text-gray-900">{aircraft}</h3>
// //         <p className="text-gray-600">
// //           {from} <span className="mx-2">→</span> {to}
// //         </p>
// //         <p className="text-sm text-gray-400">{date}</p>
// //         <p className="text-2xl font-bold text-gray-900">£{price}</p>

// //         <div className="flex items-center gap-2">
// //           <span className={`w-4 h-4 rounded-full ${color}`} />
// //           <span className="text-sm text-gray-600">Deal quality</span>
// //         </div>

// //         <Button className="mt-3" onClick={() => setShowModal(true)}>
// //           Book Now
// //         </Button>
// //       </div>

// //       {showModal && (
// //         <div
// //           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
// //           onClick={handleOverlayClick}
// //         >
// //           <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-md w-full p-8 relative animate-fade-in">
// //             <button
// //               className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-2xl"
// //               onClick={() => setShowModal(false)}
// //               aria-label="Close"
// //             >
// //               &times;
// //             </button>

// //             <h2 className="text-3xl font-bold mb-4 text-gray-900">Book Flight</h2>

// //             <div className="mb-6 text-sm text-gray-700 space-y-1">
// //               <div>
// //                 <strong>{aircraft}</strong>
// //               </div>
// //               <div>
// //                 {from} <span className="mx-2 text-gray-300">→</span> {to}
// //               </div>
// //               <div>{date}</div>
// //               <div className="font-bold text-gray-900">£{price}</div>
// //             </div>

// //             {/* Booking Form */}
// //             <form className="space-y-3" onSubmit={handleSubmit}>
// //               {/* Concierge Option */}
// //               <label className="flex items-center gap-2 font-medium text-gray-900">
// //                 <input
// //                   type="checkbox"
// //                   checked={concierge}
// //                   onChange={() => setConcierge(!concierge)}
// //                   className="accent-blue-600"
// //                 />
// //                 Add Concierge Service (10% of flight cost)
// //               </label>

// //               {/* Pet Details */}
// //               <div className="space-y-2">
// //                 <p className="font-semibold text-gray-800 text-sm">Pet Details</p>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   <input
// //                     type="number"
// //                     min={0}
// //                     placeholder="Number of pets"
// //                     className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
// //                     value={petsNumber}
// //                     onChange={(e) => setPetsNumber(e.target.value)}
// //                   />
// //                   <input
// //                     placeholder="Size (S / M / L)"
// //                     className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
// //                     value={petsSize}
// //                     onChange={(e) => setPetsSize(e.target.value)}
// //                   />
// //                 </div>
// //                 <textarea
// //                   placeholder="Special requirements for pets"
// //                   className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
// //                   value={petsSpecial}
// //                   onChange={(e) => setPetsSpecial(e.target.value)}
// //                   rows={2}
// //                 />
// //               </div>

// //               {/* Meals & Crew Notes */}
// //               <div className="space-y-2">
// //                 <textarea
// //                   placeholder="Special meal/drink requests"
// //                   className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
// //                   value={mealNotes}
// //                   onChange={(e) => setMealNotes(e.target.value)}
// //                   rows={2}
// //                 />
// //                 <textarea
// //                   placeholder="Notes for crew"
// //                   className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
// //                   value={crewNotes}
// //                   onChange={(e) => setCrewNotes(e.target.value)}
// //                   rows={2}
// //                 />
// //               </div>

// //               {/* Confirm Button */}
// //               <Button
// //                 type="submit"
// //                 className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
// //               >
// //                 Confirm Booking
// //               </Button>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       <style jsx global>{`
// //         @keyframes fade-in {
// //           from {
// //             opacity: 0;
// //             transform: scale(0.95);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: scale(1);
// //           }
// //         }
// //         .animate-fade-in {
// //           animation: fade-in 0.25s ease;
// //         }
// //       `}</style>
// //     </>
// //   );
// // }



// "use client";

// import { useState } from "react";

// // Reusable Button
// function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
//   return (
//     <button
//       {...props}
//       className={`px-5 py-2 rounded-xl font-semibold transition-colors duration-200 ${
//         props.className || "bg-blue-600 text-white hover:bg-blue-700"
//       }`}
//     />
//   );
// }

// type FlightCardProps = {
//   id: string; // Add id to identify flight
//   aircraft: string;
//   from: string;
//   to: string;
//   date: string;
//   price: number;
//   dealQuality: "good" | "ok" | "bad";
// };

// export default function FlightCard({
//   id,
//   aircraft,
//   from,
//   to,
//   date,
//   price,
//   dealQuality,
// }: FlightCardProps) {
//   const [showModal, setShowModal] = useState(false);
//   const [concierge, setConcierge] = useState(false);
//   const [petsNumber, setPetsNumber] = useState("");
//   const [petsSize, setPetsSize] = useState("");
//   const [petsSpecial, setPetsSpecial] = useState("");
//   const [mealNotes, setMealNotes] = useState("");
//   const [crewNotes, setCrewNotes] = useState("");

//   const color =
//     dealQuality === "good"
//       ? "bg-green-500"
//       : dealQuality === "ok"
//       ? "bg-yellow-500"
//       : "bg-red-500";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // Send booking data to your API
//       const res = await fetch("/api/inquiries", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           flightId: id,
//           concierge,
//           petsNumber,
//           petsSize,
//           petsSpecial,
//           mealNotes,
//           crewNotes,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert(
//           `✅ Thank you for booking!\n\n` +
//             `✈️ Flight: ${aircraft} from ${from} → ${to} on ${date}\n` +
//             `💷 Price: £${price}\n\nOur team will contact you soon!`
//         );

//         // Reset form
//         setShowModal(false);
//         setConcierge(false);
//         setPetsNumber("");
//         setPetsSize("");
//         setPetsSpecial("");
//         setMealNotes("");
//         setCrewNotes("");
//       } else {
//         alert("❌ Error submitting booking: " + JSON.stringify(data.error));
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Something went wrong. Please try again.");
//     }
//   };

//   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) setShowModal(false);
//   };

//   return (
//     <>
//       <div className="bg-white shadow-lg space-y-6 rounded-3xl p-5 flex flex-col gap-3 transition-transform hover:scale-105">
//         <h3 className="text-xl font-bold text-gray-900">{aircraft}</h3>
//         <p className="text-gray-600">
//           {from} <span className="mx-2">→</span> {to}
//         </p>
//         <p className="text-sm text-gray-400">{date}</p>
//         <p className="text-2xl font-bold text-gray-900">£{price}</p>

//         <div className="flex items-center gap-2">
//           <span className={`w-4 h-4 rounded-full ${color}`} />
//           <span className="text-sm text-gray-600">Deal quality</span>
//         </div>

//         <Button className="mt-3" onClick={() => setShowModal(true)}>
//           Book Now
//         </Button>
//       </div>

//       {showModal && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//           onClick={handleOverlayClick}
//         >
//           <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-md w-full p-8 relative animate-fade-in">
//             <button
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-2xl"
//               onClick={() => setShowModal(false)}
//               aria-label="Close"
//             >
//               &times;
//             </button>

//             <h2 className="text-3xl font-bold mb-4 text-gray-900">Book Flight</h2>

//             <div className="mb-6 text-sm text-gray-700 space-y-1">
//               <div>
//                 <strong>{aircraft}</strong>
//               </div>
//               <div>
//                 {from} <span className="mx-2 text-gray-300">→</span> {to}
//               </div>
//               <div>{date}</div>
//               <div className="font-bold text-gray-900">£{price}</div>
//             </div>

//             {/* Booking Form */}
//             <form className="space-y-3" onSubmit={handleSubmit}>
//               {/* Concierge Option */}
//               <label className="flex items-center gap-2 font-medium text-gray-900">
//                 <input
//                   type="checkbox"
//                   checked={concierge}
//                   onChange={() => setConcierge(!concierge)}
//                   className="accent-blue-600"
//                 />
//                 Add Concierge Service (10% of flight cost)
//               </label>

//               {/* Pet Details */}
//               <div className="space-y-2">
//                 <p className="font-semibold text-gray-800 text-sm">Pet Details</p>
//                 <div className="grid grid-cols-2 gap-3">
//                   <input
//                     type="number"
//                     min={0}
//                     placeholder="Number of pets"
//                     className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     value={petsNumber}
//                     onChange={(e) => setPetsNumber(e.target.value)}
//                   />
//                   <input
//                     placeholder="Size (S / M / L)"
//                     className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                     value={petsSize}
//                     onChange={(e) => setPetsSize(e.target.value)}
//                   />
//                 </div>
//                 <textarea
//                   placeholder="Special requirements for pets"
//                   className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                   value={petsSpecial}
//                   onChange={(e) => setPetsSpecial(e.target.value)}
//                   rows={2}
//                 />
//               </div>

//               {/* Meals & Crew Notes */}
//               <div className="space-y-2">
//                 <textarea
//                   placeholder="Special meal/drink requests"
//                   className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                   value={mealNotes}
//                   onChange={(e) => setMealNotes(e.target.value)}
//                   rows={2}
//                 />
//                 <textarea
//                   placeholder="Notes for crew"
//                   className="border border-gray-300 rounded-lg px-3 py-1.5 w-full text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                   value={crewNotes}
//                   onChange={(e) => setCrewNotes(e.target.value)}
//                   rows={2}
//                 />
//               </div>

//               {/* Confirm Button */}
//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
//               >
//                 Confirm Booking
//               </Button>
//             </form>
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.25s ease;
//         }
//       `}</style>
//     </>
//   );
// }
"use client";

import { useState } from "react";

// Reusable Button
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-5 py-2 rounded-xl font-semibold transition-colors duration-200 ${
        props.className || "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    />
  );
}

type FlightCardProps = {
  id: string; // Flight ID for API
  aircraft: string;
  from: string;
  to: string;
  date: string;
  price: number;
  dealQuality: "good" | "ok" | "bad";
};

export default function FlightCard({
  id,
  aircraft,
  from,
  to,
  date,
  price,
  dealQuality,
}: FlightCardProps) {
  const [showModal, setShowModal] = useState(false);

  // User info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [concierge, setConcierge] = useState(false);
  const [petsNumber, setPetsNumber] = useState("");
  const [petsSize, setPetsSize] = useState("");
  const [petsSpecial, setPetsSpecial] = useState("");
  const [mealNotes, setMealNotes] = useState("");
  const [crewNotes, setCrewNotes] = useState("");

  const color =
    dealQuality === "good"
      ? "bg-green-500"
      : dealQuality === "ok"
      ? "bg-yellow-500"
      : "bg-red-500";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flightId: id,
          name,
          email,
          phone,
          concierge,
          petsNumber,
          petsSize,
          petsSpecial,
          mealNotes,
          crewNotes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          `✅ Thank you for booking!\n\n` +
            `✈️ Flight: ${aircraft} from ${from} → ${to} on ${date}\n` +
            `💷 Price: £${price}\n\nOur team will contact you soon!`
        );

        // Reset form
        setShowModal(false);
        setName("");
        setEmail("");
        setPhone("");
        setConcierge(false);
        setPetsNumber("");
        setPetsSize("");
        setPetsSpecial("");
        setMealNotes("");
        setCrewNotes("");
      } else {
        alert("❌ Error submitting booking: " + JSON.stringify(data.error));
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

  return (
    <>
      <div className="bg-white shadow-lg space-y-6 rounded-3xl p-5 flex flex-col gap-3 transition-transform hover:scale-105">
        <h3 className="text-xl font-bold text-gray-900">{aircraft}</h3>
        <p className="text-gray-600">
          {from} <span className="mx-2">→</span> {to}
        </p>
        <p className="text-sm text-gray-400">{date}</p>
        <p className="text-2xl font-bold text-gray-900">£{price}</p>

        <div className="flex items-center gap-2">
          <span className={`w-4 h-4 rounded-full ${color}`} />
          <span className="text-sm text-gray-600">Deal quality</span>
        </div>

        <Button className="mt-3" onClick={() => setShowModal(true)}>
          Book Now
        </Button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-md w-full p-8 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-4 text-gray-900">Book Flight</h2>

            <div className="mb-6 text-sm text-gray-700 space-y-1">
              <div>
                <strong>{aircraft}</strong>
              </div>
              <div>
                {from} <span className="mx-2 text-gray-300">→</span> {to}
              </div>
              <div>{date}</div>
              <div className="font-bold text-gray-900">£{price}</div>
            </div>

            {/* Booking Form */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* User Info */}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full"
              />

              {/* Concierge Option */}
              <label className="flex items-center gap-2 font-medium text-gray-900">
                <input
                  type="checkbox"
                  checked={concierge}
                  onChange={() => setConcierge(!concierge)}
                  className="accent-blue-600"
                />
                Add Concierge Service (10% of flight cost)
              </label>

              {/* Pet Details */}
              <div className="space-y-2">
                <p className="font-semibold text-gray-800 text-sm">Pet Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min={0}
                    placeholder="Number of pets"
                    value={petsNumber}
                    onChange={(e) => setPetsNumber(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 w-full"
                  />
                  <input
                    placeholder="Size (S / M / L)"
                    value={petsSize}
                    onChange={(e) => setPetsSize(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 w-full"
                  />
                </div>
                <textarea
                  placeholder="Special requirements for pets"
                  value={petsSpecial}
                  onChange={(e) => setPetsSpecial(e.target.value)}
                  rows={2}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 w-full"
                />
              </div>

              {/* Meals & Crew Notes */}
              <div className="space-y-2">
                <textarea
                  placeholder="Special meal/drink requests"
                  value={mealNotes}
                  onChange={(e) => setMealNotes(e.target.value)}
                  rows={2}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 w-full"
                />
                <textarea
                  placeholder="Notes for crew"
                  value={crewNotes}
                  onChange={(e) => setCrewNotes(e.target.value)}
                  rows={2}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 w-full"
                />
              </div>

              {/* Confirm Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Confirm Booking
              </Button>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease;
        }
      `}</style>
    </>
  );
}