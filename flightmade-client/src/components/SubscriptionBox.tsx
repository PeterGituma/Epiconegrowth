// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// // Reusable Button
// function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
//   return (
//     <button
//       {...props}
//       className={`px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
//       text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 
//       transition-transform duration-200 ${props.className || ""}`}
//     />
//   );
// }

// // Reusable Input
// function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
//   return (
//     <input
//       {...props}
//       className={`border border-gray-300 rounded-xl px-4 py-2.5 w-72
//       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//       transition duration-200 ${props.className || ""}`}
//     />
//   );
// }

// export default function SubscriptionBox() {
//   const [email, setEmail] = useState("");

//   const handleSubscribe = () => {
//     console.log("Subscribed:", email);
//     setEmail("");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//       className="bg-white/70 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl max-w-lg mx-auto mt-12"
//     >
//       <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
//         ✈ Stay Updated
//       </h2>
//       <p className="text-sm text-gray-600 mb-6">
//         Be the first to hear about exclusive flight deals and updates.
//       </p>
//       <div className="flex gap-2 justify-center text-gray-800 mb-2">
//         <Input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Button onClick={handleSubscribe}>Subscribe</Button>
//       </div>
//     </motion.div>
//   );
// }
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
      text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 
      transition-transform duration-200 ${props.className || ""}`}
    />
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-xl px-4 py-2.5 w-72
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition duration-200 ${props.className || ""}`}
    />
  );
}

export default function SubscriptionBox() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    setLoading(true);

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("Subscribed successfully!");
      setEmail("");
    } else {
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white/70 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl max-w-lg mx-auto mt-12"
    >
      <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
        ✈ Stay Updated
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Be the first to hear about exclusive flight deals and updates.
      </p>
      <div className="flex gap-2 justify-center text-gray-800 mb-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSubscribe} disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </motion.div>
  );
}
